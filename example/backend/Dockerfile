# Use a specific Node.js version (not just "22")
FROM node:22-alpine AS base

# Create and use non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies in production mode with frozen lockfile
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Change ownership of app files to non-root user
RUN chown -R nodeuser:nodejs /app

USER nodeuser

# Set environment variables
ENV NODE_ENV=production

# Expose only necessary port
EXPOSE 3000

# Health check (customize /health endpoint in your app)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Run as non-root
CMD ["npm", "start"]