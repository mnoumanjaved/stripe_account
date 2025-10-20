interface SlickArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  currentSlide?: number;
  slideCount?: number;
}
export function SlickNextArrow(props: SlickArrowProps) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      className={`${className} slick-next`}
      onClick={onClick}
    >
      <i className="fa-light fa-angle-right"></i>
    </button>
  );
}

export function SlickPrevArrow(props: SlickArrowProps) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      className={`${className} slick-prev`}
      onClick={onClick}
    >
      <i className="fa-light fa-angle-left"></i>
    </button>
  );
}
