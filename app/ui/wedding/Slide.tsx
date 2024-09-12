import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useEffect, useState } from 'react';
import 'swiper/swiper-bundle.css';

import styles from './Slide.module.css'; 
import { PhotoViewer } from '../photoViewer';
import { SLIDE_1_BG, SLIDE_1_CLOUD, SLIDE_1_PEOPLE, SLIDE_1_TITLE,
  SLIDE_2_BG, SLIDE_2_PHOTO_1_HD, SLIDE_2_PHOTO_1_SMALL, SLIDE_2_PHOTO_2_HD, SLIDE_2_PHOTO_2_SMALL, SLIDE_2_PHOTO_3_HD,
  SLIDE_2_PHOTO_3_SMALL, SLIDE_2_PHOTO_4_HD,   SLIDE_3_PHOTO_3_HD, SLIDE_5_WAVE, SLIDE_6_BG,
  SLIDE_2_PHOTO_4_SMALL, SLIDE_2_PHOTO_5_HD, SLIDE_2_PHOTO_5_SMALL, SLIDE_2_PHOTO_6_HD, SLIDE_2_PHOTO_6_SMALL,
  SLIDE_3_BG, SLIDE_3_BOY, SLIDE_3_GIRL, SLIDE_3_PHOTO_1_HD, SLIDE_3_PHOTO_1_SMALL, SLIDE_3_PHOTO_2_HD, SLIDE_3_PHOTO_2_SMALL,
  SLIDE_3_PHOTO_3_SMALL, SLIDE_3_PHOTO_4_HD, SLIDE_3_PHOTO_4_SMALL, SLIDE_3_PHOTO_5_HD, SLIDE_3_PHOTO_5_SMALL,
  SLIDE_4_BG, SLIDE_4_IMG_1, SLIDE_4_IMG_2, SLIDE_5_BG, SLIDE_5_CLOUD, SLIDE_5_EYE,
  SLIDE_5_TITLE,
} from '~/utils/weddingConfig';
import { openModal } from '../modal';
import { PreviewModal } from '../photoViewer/previewModal';
import { AddressBtn } from './AddressBtn';

const SLIDE_2_SMALL_PHOTO_GROUP = [
  SLIDE_2_PHOTO_1_SMALL,
  SLIDE_2_PHOTO_2_SMALL,
  SLIDE_2_PHOTO_3_SMALL,
  SLIDE_2_PHOTO_4_SMALL,
  SLIDE_2_PHOTO_5_SMALL,
  SLIDE_2_PHOTO_6_SMALL,
];

const SLIDE_3_SMALL_PHOTO_GROUP = [
  SLIDE_3_PHOTO_1_SMALL,
  SLIDE_3_PHOTO_2_SMALL,
  SLIDE_3_PHOTO_3_SMALL,
  SLIDE_3_PHOTO_4_SMALL,
  SLIDE_3_PHOTO_5_SMALL,
];

const SLIDE_2_HD_PHOTO_GROUP = [
  SLIDE_2_PHOTO_1_HD,
  SLIDE_2_PHOTO_2_HD,
  SLIDE_2_PHOTO_3_HD,
  SLIDE_2_PHOTO_4_HD,
  SLIDE_2_PHOTO_5_HD,
  SLIDE_2_PHOTO_6_HD,
];

const SLIDE_3_HD_PHOTO_GROUP = [
  SLIDE_3_PHOTO_1_HD,
  SLIDE_3_PHOTO_2_HD,
  SLIDE_3_PHOTO_3_HD,
  SLIDE_3_PHOTO_4_HD,
  SLIDE_3_PHOTO_5_HD,
];

export const Slides = ({onSwipe}: {
  onSwipe?: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    // 获取 URL 的哈希值
    const hash = window.location.hash;

    const match = hash.match(/slide-(\d+)/);
    if (match && match[1]) {
      const slideNumber = parseInt(match[1], 10);
      setInitialSlide(slideNumber - 1); // Swiper 的 slide 索引从 0 开始
    }
    setLoading(false);
  }, []);

  const onClickSlideTwoPhoto = (index: number) => {
    openModal({
      Component: PreviewModal,
      componentProps: {
        imgGroup: SLIDE_2_HD_PHOTO_GROUP,
        initialIndex: index
      },
      classNameMap: { modal: styles.previewModal, content: styles.previewModalContent },
    })
  }

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex + 1; // Swiper's index is zero-based
    window.location.hash = `slide-${currentIndex}`;
  };

  const onClickSlideThreePhoto = (index: number) => {
    openModal({
      Component: PreviewModal,
      componentProps: {
        imgGroup: SLIDE_3_HD_PHOTO_GROUP,
        initialIndex: index
      },
      classNameMap: { modal: styles.previewModal, content: styles.previewModalContent },
    })
  }

  if (loading) return;

  return <Swiper
    initialSlide={initialSlide}
    direction="vertical"
    spaceBetween={0}
    slidesPerView={1}
    pagination={{ clickable: true }}
    onTouchStart={onSwipe}
    onSlideChange={handleSlideChange}
    className="h-screen"
  >
    <SwiperSlide className="text-white h-screen">
      <div className="flex flex-col justify-end w-full h-screen bg-[#b0ddb6]">
        <img
          alt="背景"
          src={SLIDE_1_BG}
        />
      </div>
      <div className="absolute z-1 w-[750px] h-[586px] top-[62px]">
        <img
          alt="云朵"
          src={SLIDE_1_CLOUD}
        />
      </div>
      <div className="absolute z-1 w-[680px] h-[212px] top-[182px] left-[35px]">
        <img
          alt="标题"
          src={SLIDE_1_TITLE}
        />
      </div>
      <img
        className="absolute z-1 w-[592px] h-[901px] top-[504px] right-[30px]"
        alt="新人"
        src={SLIDE_1_PEOPLE}
      />
      <i className={`${styles.icoCalendar} absolute z-1 bg-cover bg-no-repeat w-[175px] h-[216px] top-[550px] right-0`} />
      <i className={`${styles.birdLeft} absolute z-1 bg-cover bg-no-repeat w-[115px] h-[118px] top-[504px] left-[65px]`} />
      <i className={`${styles.birdRight} absolute z-1 bg-cover bg-no-repeat w-[117px] h-[132px] top-[78px] right-[85px]`} />
      <i className={`${styles.wave} absolute z-1 bg-cover bg-no-repeat w-[287px] h-[20px] top-[349px] right-[40px]`} />
    </SwiperSlide>
    <SwiperSlide className="flex items-center justify-center bg-[#f1e7d6] text-white">
      <img alt="小时候" className="w-full h-auto" src={SLIDE_2_BG} />
      <i className={`${styles.birdTwo} transform scale-x-[-1] absolute z-1 bg-cover bg-no-repeat w-[100px] h-[103px] top-[207px] right-[102px]`} />
      <i className={`${styles.waveTwo} absolute z-1 bg-cover bg-no-repeat w-[287px] h-[20px] bottom-[965px] right-[40px]`} />
      <PhotoViewer
        classNameMap={{
          photoViewer: styles.slideTwoPhotoViewer,
          photoViewerContent: styles.slideTwoPhotoViewerContent
        }}
        options={{
          slides: {
            perView: 2
          }
        }}
      >
        {
          SLIDE_2_SMALL_PHOTO_GROUP.map((url, index) => <div
            className={styles.photoViewItem}
            onClick={() => onClickSlideTwoPhoto(index)}
          >
            <i className={styles.icoExpand} />
            <img className={styles.slideTwoPhotoItem} src={url} />
          </div>)
        }
      </PhotoViewer>
    </SwiperSlide>
    <SwiperSlide className="flex items-center justify-center bg-[#AAD1C3] text-white">
      <img alt="长大了" className="w-full h-auto" src={SLIDE_3_BG} />
      <i className={`${styles.waveThreeBoy} absolute bg-cover bg-no-repeat w-[562px] h-[91px] top-[514px] left-[-38px]`} />
      <i className={`${styles.waveThreeGirl} transform scale-x-[-1] absolute bg-cover bg-no-repeat w-[498px] h-[50px] top-[404px] right-0`} />
      <img alt="男生" className="absolute w-[192px] h-[503px] top-[72px] left-[80px]" src={SLIDE_3_BOY} />
      <img alt="女生" className="absolute w-[235px] h-[466px] top-[135px] right-[100px]" src={SLIDE_3_GIRL} />
      <i className={`${styles.chimesThree} absolute z-1 bg-cover bg-no-repeat w-[144px] h-[360px] top-0 right-0`} />
      <PhotoViewer
        classNameMap={{
          photoViewer: styles.slideThreePhotoViewer,
          photoViewerContent: styles.slideThreePhotoViewerContent
        }}
        options={{
          slides: {
            perView: 2,
            origin: 'center'
          }
        }}
      >
        {
          SLIDE_3_SMALL_PHOTO_GROUP.map((url, index) => <div
            className={styles.photoViewItem}
            onClick={() => onClickSlideThreePhoto(index)}>
            <i className={styles.icoExpand} />
            <img className={styles.slideThreePhotoItem} src={url} />
          </div>)
        }
      </PhotoViewer>
    </SwiperSlide>
    <SwiperSlide className="flex items-center justify-center bg-[#F2E8D6] text-white">
      <img alt="背景 4" className="w-full h-auto" src={SLIDE_4_BG} />
      <img alt="邀请" className="absolute z-1 top-[820px] w-[321px] h-[478px] right-[34px] rounded-[16px]" src={SLIDE_4_IMG_1} />
      <img alt="邀请" className="absolute z-1 top-[610px] w-[337px] h-[500px] left-[38px] rounded-[16px]" src={SLIDE_4_IMG_2} />
      <i className={`${styles.popFour} absolute z-1 bg-cover bg-no-repeat w-[247px] h-[226px] top-[520px] right-0`} />
    </SwiperSlide>
    <SwiperSlide className="flex items-center justify-center bg-[#B3C7B8] text-white">
      <img alt="背景 5" className="w-full h-auto" src={SLIDE_5_BG} />
      <div className="absolute top-0 h-[130px] w-[750px] bg-[#92D8E9]" />
      <img alt="眼睛 5" className="absolute top-0 h-[383px] w-[750px]" src={SLIDE_5_EYE} />
      <img alt="标题 5" className="absolute left-[90px] top-[433px] w-[567px] h-[236px]" src={SLIDE_5_TITLE} />
      <i className={`${styles.birdRight} absolute z-1 bg-cover bg-no-repeat w-[91px] h-[102px] top-[477px] right-[30px]`} />
      <i className={`${styles.birdLeft} absolute z-1 bg-cover bg-no-repeat w-[117px] h-[121px] top-[912px] left-[78px]`} />
      <img alt="波浪 5" className="absolute left-[184px] top-[763px] w-[110px] h-[295px]" src={SLIDE_5_WAVE} />
      <img alt="云朵 5" className="absolute right-[0px] top-[720px] w-[611px] h-[564px]" src={SLIDE_5_CLOUD} />
    </SwiperSlide>
    <SwiperSlide className="h-screen text-white">
      <div className="flex flex-col justify-end w-full h-screen bg-[#B9CEBE]">
        <img alt="背景 6" src={SLIDE_6_BG} />
      </div>
      <div className={`${styles.date} absolute bg-cover bg-no-repeat top-[150px] left-[86px] w-[596px] h-[923px]`}>
        <AddressBtn type="boy" className={styles.boyAddress} />
        <AddressBtn type="girl" className={styles.girlAddress}/>
      </div>
      <i className={`${styles.thankYou} absolute bg-cover bg-no-repeat w-[360px] h-[100px] left-[198px] bottom-[96px]`} />
    </SwiperSlide>
  </Swiper>
}