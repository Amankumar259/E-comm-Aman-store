/**
 * ✅ IMAGE URL UTILITY
 * Handles image URL construction for both local and production environments
 */

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300?text=No+Image";

/**
 * Convert image path to full URL
 * @param {string} imagePath - Image path from database (e.g., "/uploads/image.jpg" or full URL)
 * @param {boolean} fallback - Return placeholder if no image provided
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath, fallback = true) => {
  // If no image path, return placeholder
  if (!imagePath) {
    return fallback ? PLACEHOLDER_IMAGE : "";
  }

  // If already a full URL (starts with http/https), return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If relative path (starts with /), prepend backend URL
  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  // Otherwise, assume it's a relative path and prepend /uploads/
  return `${BACKEND_URL}/uploads/${imagePath}`;
};

/**
 * Get image URL with error handling for broken images
 * @param {string} imagePath - Image path from database
 * @returns {string} Full image URL
 */
export const getImageUrlWithFallback = (imagePath) => {
  return getImageUrl(imagePath, true);
};

export default { getImageUrl, getImageUrlWithFallback };
