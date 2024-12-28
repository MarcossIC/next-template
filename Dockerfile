FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml postcss.config.cjs tsconfig.json next.config.mjs tailwind.config.cjs ./
RUN npm install -g pnpm@9.7.0 && pnpm install --prefer-frozen-lockfile --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build && pnpm prune --prod --ignore-scripts

FROM node:20-alpine AS production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID
ARG CLIENT_SECRET
ENV NEXT_PUBLIC_APP_URL=http://localhost:4002
ENV ANALYZE=false
ENV NODE_ENV=production
ENV PORT=4002

USER nextjs

EXPOSE 4002

CMD ["pnpm", "start"]
