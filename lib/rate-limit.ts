// Simple in-memory rate limiter for API protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

/**
 * Rate limiter - limits requests per IP per time window
 * @param ip - Client IP address
 * @param maxRequests - Max requests allowed in the window (default: 10)
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 */
export function rateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const key = ip;

  const existing = rateLimitMap.get(key);

  if (!existing || now > existing.resetTime) {
    // First request or window expired — reset
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((existing.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxRequests - existing.count };
}
