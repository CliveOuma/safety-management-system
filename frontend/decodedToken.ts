// types/decodedToken.ts
export interface DecodedToken {
    userId: string;
    role: string;
    exp: number; // expiration timestamp in seconds
  }
  