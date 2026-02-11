import { useState } from 'react';

export function ImageWithFallback({ src, alt, className, fallbackSrc }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Use fallback image or a placeholder
      setImgSrc(fallbackSrc || 'https://i.ytimg.com/vi/VbQ8kyIXqXM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBiux_bN-cri4Ts87ugLJjk1VBjDQ');
    }
  };

  return (
    <img
      src='https://i.ytimg.com/vi/VbQ8kyIXqXM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBiux_bN-cri4Ts87ugLJjk1VBjDQ'
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}