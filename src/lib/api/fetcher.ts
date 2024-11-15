import { cookies } from "next/headers"

import { COOKIES } from "@/constants"

import logger from "../logger"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  headers?: Record<string, string>
  body?:
    | Record<string, string | number | boolean | object>
    | Array<Record<string, string | number | boolean | object>>
    | null
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
      let errorMessage = `API error: ${res.statusText}`
      let validations: Record<string, string> = {}

      try {
        const errorData = await res.json()
        if ("validations" in errorData) {
          validations = errorData.validations
        }

        errorMessage = errorData.message || errorMessage

        logger.error(`API error: ${res.status}`, {
          url,
          status: res.status,
          errorMessage,
          validations:
            Object.keys(validations).length > 0 ? validations : undefined,
        })

        throw new ApiError(res.status, errorMessage)
      } catch (e) {
        logger.error(`API error: ${res.status}`, {
          url,
          status: res.status,
          errorMessage,
        })
        throw new ApiError(res.status, errorMessage)
      }
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
