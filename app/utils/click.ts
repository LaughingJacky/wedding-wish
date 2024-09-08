
export const stopPropagationAndPreventDefault = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation();
  event.preventDefault();
  event.nativeEvent?.stopPropagation();
  event.nativeEvent?.preventDefault();
};

export const getContainSize = () => {
  const maxArea = 0.8;
  const width = 317;
  const height = 460;

  const maxWidth = window.innerWidth * maxArea;
  const maxHeight = window.innerHeight * maxArea;

  if (width / height > maxWidth / maxHeight) {
    return { width: maxWidth, height: height / width * maxWidth };
  }

  return { height: maxHeight, width: width / height * maxHeight };
};