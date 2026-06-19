export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function verifyOtp(input: string, expected: string): boolean {
  return input.trim() === expected.trim();
}
