import { NextResponse } from "next/server";
import { verifyCreemWebhookSignature } from "@/utils/creem/verify-signature";

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());
    
    console.log("🧪 DEBUG: Webhook received at", new Date().toISOString());
    console.log("🧪 DEBUG: Headers:", JSON.stringify(headers, null, 2));
    console.log("🧪 DEBUG: Body length:", body.length);
    console.log("🧪 DEBUG: Body preview:", body.substring(0, 500));
    console.log("🧪 DEBUG: Secret set:", CREEM_WEBHOOK_SECRET ? "✅ Yes" : "❌ No");
    console.log("🧪 DEBUG: Secret value:", CREEM_WEBHOOK_SECRET);
    
    // 尝试不同的签名header名称
    const possibleSignatureHeaders = [
      "creem-signature",
      "x-creem-signature", 
      "x-signature",
      "signature",
      "authorization"
    ];
    
    for (const headerName of possibleSignatureHeaders) {
      const signature = headers[headerName];
      if (signature) {
        console.log(`🧪 DEBUG: Found signature in header '${headerName}':`, signature);
        
        if (CREEM_WEBHOOK_SECRET) {
          const isValid = verifyCreemWebhookSignature(body, signature, CREEM_WEBHOOK_SECRET);
          console.log(`🧪 DEBUG: Signature verification result:`, isValid);
        }
      }
    }
    
    return NextResponse.json({ 
      received: true,
      timestamp: new Date().toISOString(),
      headers,
      bodyLength: body.length,
      secretSet: !!CREEM_WEBHOOK_SECRET
    });
  } catch (error) {
    console.error("🧪 DEBUG: Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Debug webhook endpoint is active",
    timestamp: new Date().toISOString(),
    secretSet: !!CREEM_WEBHOOK_SECRET
  });
}