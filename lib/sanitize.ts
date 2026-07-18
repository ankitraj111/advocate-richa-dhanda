/**
 * Input Sanitization utility
 * Cleans user inputs to prevent XSS, injection attacks
 */

// Remove HTML tags
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

// Remove dangerous characters and patterns
function removeDangerousPatterns(str: string): string {
  return str
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")     // onclick=, onerror=, etc.
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/expression\s*\(/gi, "")
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/eval\s*\(/gi, "")
    .replace(/document\./gi, "")
    .replace(/window\./gi, "");
}

// Trim and limit length
function trimAndLimit(str: string, maxLength: number = 500): string {
  return str.trim().substring(0, maxLength);
}

/**
 * Sanitize a single string input
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  let cleaned = input;
  cleaned = stripHtml(cleaned);
  cleaned = removeDangerousPatterns(cleaned);
  cleaned = trimAndLimit(cleaned, maxLength);
  return cleaned;
}

/**
 * Sanitize an email
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") return "";
  const cleaned = email.trim().toLowerCase().substring(0, 254);
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned : "";
}

/**
 * Sanitize a phone number
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== "string") return "";
  // Keep only digits, +, -, spaces, and parentheses
  return phone.replace(/[^\d+\-\s()]/g, "").substring(0, 20);
}

/**
 * Sanitize booking form data
 */
export function sanitizeBookingData(data: Record<string, string>): Record<string, string> {
  return {
    name: sanitizeInput(data.name || "", 100),
    email: sanitizeEmail(data.email || ""),
    phone: sanitizePhone(data.phone || ""),
    service: sanitizeInput(data.service || "", 100),
    notes: sanitizeInput(data.notes || "", 1000),
    date: sanitizeInput(data.date || "", 10),
    time: sanitizeInput(data.time || "", 20),
  };
}

/**
 * Validate required booking fields
 */
export function validateBookingData(data: Record<string, string>): { valid: boolean; error?: string } {
  if (!data.name || data.name.length < 2) {
    return { valid: false, error: "Name is required (min 2 characters)" };
  }
  if (!data.email) {
    return { valid: false, error: "Valid email is required" };
  }
  if (!data.phone || data.phone.length < 7) {
    return { valid: false, error: "Valid phone number is required" };
  }
  if (!data.service) {
    return { valid: false, error: "Service selection is required" };
  }
  if (!data.date) {
    return { valid: false, error: "Date is required" };
  }
  if (!data.time) {
    return { valid: false, error: "Time slot is required" };
  }
  return { valid: true };
}
