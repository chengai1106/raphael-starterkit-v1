import { createHmac } from "crypto";

export function verifyCreemWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    // Clean the secret - remove whsec_ prefix if present
    const cleanSecret = secret.startsWith("whsec_") ? secret.substring(6) : secret;
    
    // Log signature details for debugging
    console.log("🔍 Signature verification details:", {
      receivedSignature: signature,
      originalSecret: secret,
      cleanSecretLength: cleanSecret.length,
      payloadLength: payload.length
    });

    // Create HMAC SHA256 hash with cleaned secret
    const hmac = createHmac("sha256", cleanSecret);
    const calculatedSignature = hmac.update(payload).digest("hex");
    
    console.log("🔍 Calculated signature:", calculatedSignature);

    // Handle different signature formats
    let cleanSignature = signature;
    
    // Remove sha256= prefix if present
    if (signature.startsWith("sha256=")) {
      cleanSignature = signature.substring(7);
    }
    // Remove other possible prefixes
    else if (signature.startsWith("sha256:")) {
      cleanSignature = signature.substring(7);
    }

    console.log("🔍 Clean signature:", cleanSignature);

    // Compare signatures using timing-safe comparison
    const isValid = timingSafeEqual(cleanSignature, calculatedSignature);
    console.log("🔍 Signature valid:", isValid);
    
    return isValid;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return false;
  }
}

// Timing-safe string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
