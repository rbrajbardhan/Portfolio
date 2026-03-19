import { useEffect, useState } from "react";

const useTypewriter = (
  stringsArray = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 2000,
) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (stringsArray.length === 0) return;

    let timeout;
    const currentString = stringsArray[currentIndex];

    if (!isDeleting && displayText === currentString) {
      // Pause at end of spelling
      timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && displayText === "") {
      // Move to next word when fully deleted
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % stringsArray.length);
      timeout = setTimeout(() => {}, 500); // Tiny pause before spelling next
    } else {
      // Actively typing or deleting
      const nextChar = isDeleting
        ? currentString.substring(0, displayText.length - 1)
        : currentString.substring(0, displayText.length + 1);

      timeout = setTimeout(
        () => {
          setDisplayText(nextChar);
        },
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    stringsArray,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return displayText;
};

export default useTypewriter;
