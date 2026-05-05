/**
 * ✅ PRODUCTION-READY IMAGE COMPONENT
 * Handles image loading with fallback and error handling
 */

import { useState } from "react";
import { getImageUrl } from "../utils/imageUrl";

const ProductImage = ({
  src,
  alt = "Product Image",
  className = "",
  style = {},
  fallbackSrc = "https://via.placeholder.com/300?text=No+Image",
  onError = null,
}) => {
  const [imageSrc, setImageSrc] = useState(() => getImageUrl(src));
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.warn(`⚠️ Failed to load image: ${imageSrc}`);
    setImageError(true);
    setImageSrc(fallbackSrc);
    if (onError) onError();
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default ProductImage;
