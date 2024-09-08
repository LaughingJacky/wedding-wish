import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react';
import classNames from 'classnames';
import React, { useState } from 'react';

import styles from './index.module.css';

interface IPhotoViewer {
  classNameMap?: Record<string, string>;
  loop?: boolean;
  options?: KeenSliderOptions;
  transformWidth?: number;
}

export const PhotoViewer: React.FC<React.PropsWithChildren<IPhotoViewer>> = ({
  loop = true,
  options,
  transformWidth,
  children,
  classNameMap
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    initial: 0,
    loop,
    drag: true,
    mode: 'snap',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    ...options,
  });

  return (
    <div className={classNames(styles.photoViewer, classNameMap?.photoViewer)}>
      <div className={classNames(styles.content, classNameMap?.photoViewerContent)}>
        <ul ref={sliderRef} className={classNames('keen-slider', styles.slider, {
          [styles.ready]: instanceRef.current
        })}>
          {React.Children.map(children, child => (
            <li
              style={{
                transform: `translate3d(-${transformWidth}px, 0px, 0px)`
              }}
              className={classNames('keen-slider__slide', 'slider__transform', styles.slide)}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
      {
        loaded && instanceRef.current && (
          <div className={styles.dots}>
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={classNames(styles.dot, {
                    [styles.active]: currentSlide === idx
                  })}
                ></button>
              )
            })}
          </div>
        )
      }
    </div>
  );
}
