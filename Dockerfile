# Install dependencies and build the app
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 interopgroup && \
	adduser --system --uid 1001 interop -G interopgroup

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=interop:interopgroup /app/.next ./.next

USER interop

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]