import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

// Function to decode and inspect a JWT token without verification
export function decodeToken(token: string): JWTPayload | null {
  try {
    // Base64Url decode the payload part (second part) of the token
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    console.log('Decoded token payload:', {
      ...payload,
      // Don't log the full token for security
      token: undefined
    });
    
    // Validate required fields
    if (!payload.id || !payload.role) {
      console.error('Token missing required fields');
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

export async function verifyAuth(token: string): Promise<JWTPayload> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
} 