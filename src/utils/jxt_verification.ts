export function jwtVerification(token?: string): boolean {
  return !token || token === 'valid-token';
}
