# Use a pinned Node.js + Alpine version for reproducibility
FROM node:22.6.0-alpine3.19 AS base

# Create a non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Fix ownership for non-root user
RUN chown -R nodeuser:nodejs /app

# Run as least-privileged user
USER nodeuser

# Set production environment
ENV NODE_ENV=production

# Expose only needed port
EXPOSE 80

# Optional: Healthcheck (ensure you have a /health route or adjust accordingly)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Start app
CMD ["npm", "start"]
