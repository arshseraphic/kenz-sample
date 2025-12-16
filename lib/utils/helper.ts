/**
 * Capitalizes the first letter of a given string.
 * Example: "hello world" → "Hello world"
 *
 * @param str - The input string
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";

  // Only capitalize if first character is a letter (A-Z or a-z)
  if (!/^[A-Za-z]/.test(str)) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
