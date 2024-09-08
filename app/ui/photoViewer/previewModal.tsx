import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import styles from './previewModal.module.css';
import { getContainSize } from "~/utils/click";

interface IPreviewModal {
  imgGroup: string[];
  /** 初始 Index */
  initialIndex: number;
  /** 关闭弹窗方法 */
  close: () => void;
}

export const PreviewModal = (props: IPreviewModal) => {
  const { initialIndex, close, imgGroup } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Slider透明度
  // const [opacities, setOpacities] = useState<number[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    initial: initialIndex,
    slides: imgGroup.length,
    loop: true,
    slideChanged(slider) {
      setCurrentIndex(slider.track.details.rel);
    },
    // detailsChanged(slider) {
    //   const newOpacities = slider.track.details.slides.map(slide => slide.portion);
    //   setOpacities(newOpacities);
    // },
  });

  return (
    <div className={styles.previewModal}>
      <p className={styles.pagination}>{ `${currentIndex + 1} / ${imgGroup.length}` }</p>
      <i className={styles.closeIcon} onClick={close} />
      <ul ref={sliderRef} className={styles.previewSlider}>
        { imgGroup.map((item, index) => (
          <li
            className={styles.previewItemContainer}
            key={item}
            style={{ opacity: index === currentIndex ? 1 : 0, zIndex: currentIndex === index ? 3 : 0 }}
          >
            <div style={getContainSize()} className={styles.previewItem}>
              <img alt="preview" className={styles.previewImg} src={item} style={getContainSize()} />
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
};