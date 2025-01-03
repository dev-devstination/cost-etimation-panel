# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
# Install pnpm globally
RUN npm install -g pnpm
# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build app
RUN NODE_ENV=production yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.mjs if you are NOT using the default configuration
### next.config.mjs was updated to generate the standalone files >> Next.js can automatically create a standalone folder which copies only the necessary files for a production deployment
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone
COPY --from=builder --chown=nextjs:nodejs /app/public ./standalone/public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000
EXPOSE 3000

CMD ["node", "./standalone/server.js"]
# Set environment variables for PM2 monitoring
#ENV PM2_PUBLIC_KEY a7euxzxxh2dqy2h
#ENV PM2_SECRET_KEY c45ki6w33b4qsv4

# Start the Next.js app with PM2
#CMD ["pm2-runtime", "server.js"]