FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 interopgroup
RUN adduser --system --uid 1001 interop

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=interop:interopgroup /app/.next/standalone ./
COPY --from=builder --chown=interop:interopgroup /app/.next/static ./.next/static


USER interop

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]