import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { COOKIES } from "@/constants"

import logger from "../logger"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  headers?: Record<string, string>
  body?: Record<string, string> | null
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
  }
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIES.AUTH_TOKEN)?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<{ data: T }> {
  const {
    method = "GET",
    headers = {},
    body = null,
    cache = "no-store",
    next,
  } = options

  const authHeader = await getAuthHeader()

  const start = Date.now()
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      cache,
      next,
    })

    if (!res.ok) {
      logger.error(`API error: ${res.status}`, { url, status: res.status })

      let errorMessage = `API error: ${res.status}`
      try {
        const errorData = await res.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        throw new ApiError(res.status, errorMessage)
      }

      if (res.status === 404) {
        notFound()
      }

      throw new ApiError(res.status, errorMessage)
    }

    const data = await res.json()
    const duration = Date.now() - start
    logger.logPerformance(`API call to ${url}`, duration)

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    logger.error("Fetch error", { error: error, url })
    throw new ApiError(500, "An unexpected error occurred")
  }
}

export function fetcherSSR<T>(url: string, options: FetchOptions = {}) {
  return fetcher<T>(url, { ...options })
}

export function fetcherISR<T>(
  url: string,
  revalidate: number,
  options: FetchOptions = {}
) {
  return fetcher<T>(url, { ...options, next: { revalidate } })
}
