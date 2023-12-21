/**
 * Converts a hex color code to an RGBA color string.
 *
 * @param {string} hex - The hex color code
 * @param {number} opacity - The opacity value (between 0 and 1).
 * @returns {string} The RGBA color string
 */
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(/^#/, "");

  let r: number = 0;
  let g: number = 0;
  let b: number = 0;

  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    console.error("Invalid hex color format");
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
