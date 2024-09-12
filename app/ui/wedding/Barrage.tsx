import { useState, MouseEvent, useRef, useEffect } from 'react';
import { Octokit } from 'octokit';

import styles from './Barrage.module.css';
import { toast } from '../toast';
import { DIALOG_BG_URL } from '~/utils/weddingConfig';

interface WishMessage {
  nickname: string;
  wish: string;
}

const InputDialog = ({ onConfirm, onCancel }: {
  onConfirm: (wishMessage: WishMessage) => Promise<void>,
  onCancel: () => void
}) => {
  const nickRef = useRef<HTMLInputElement | null>(null);
  const wishRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (nickRef.current) {
      nickRef.current.focus();
    }
  }, []);

  const confirmInput = async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (wishRef.current && nickRef.current) {
      const wishText = wishRef.current.value;
      if (!wishText) {
        toast.message({msg: '别忘了填写祝福'});
        return;
      }

      const nickText = nickRef.current.value;
      if (!nickText) {
        toast.message({msg: '别忘了填写姓名'});
        return;
      }

      await onConfirm({
        nickname: nickText,
        wish: wishText
      });
      wishRef.current.value = '';
    } else {
      toast.message({ msg: '框架初始化中...'})
    }
  }

  return (
    <div className="fixed inset-0 flex z-20 w-full h-full bg-[#ECE4DB]">
      <i
        className={`${styles.closeBtn} absolute w-[54px] h-[54px] top-[20px] right-[20px]`}
        onClick={() => onCancel()}
      />
      <div className="mt-[203px] ml-auto mr-auto text-center w-[434px]">
        <div className="flex items-center mt-[50px]">
          <div className="not-italic font-normal text-[32px] leading-[38px] ml-[28px] text-white">
            昵称&nbsp;
          </div>
          <input
            ref={nickRef}
            className="pl-[25px] w-[290px] h-[62px] bg-[#D5CBB6] rounded-[8px] outline-none resize-none"
            placeholder="称呼" />
        </div>
        <div className="mt-[40px]">
          <div className="not-italic font-normal text-[32px] leading-[38px] ml-[28px] text-white text-left">
            祝福语：
          </div>
          <textarea
            ref={wishRef}
            placeholder="祝福"
            className="pl-[25px] mt-[16px] leading-[60px] w-[364px] h-[177px] bg-[#D5CBB6] rounded-[8px] outline-none resize-none"
          />
        </div>
        <i
          onClick={confirmInput}
          className={`${styles.confirmBtn}
            w-[230px] h-[65px] mt-[54px] rounded-[90px]`}
        />
      </div>
      <img
        src={DIALOG_BG_URL}
        alt="Dialog"
        className="absolute object-cover z-[-1]" // 绝对定位，铺满整个屏幕
      />
    </div>
  );
}

export const Barrage = ({onClickMessage, token}: {
  onClickMessage: () => void,
  token: string
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wishList, setWishList] = useState<WishMessage[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0); // 用于存储当前滚动位置
  const animationRef = useRef(0);
  const fetchWishListIntervalId = useRef(0);
  const octokitRef = useRef(new Octokit({
    auth: token
  }));

  // Fetch wishlist function
  const fetchWishList = async () => {
    try {
      const issuesRes = await octokitRef.current.request('GET /repos/LaughingJacky/wedding-wish/issues', {});

      if (issuesRes.status === 200) {
        setWishList(issuesRes.data.map(({body, title}: any) => ({
          nickname: title,
          wish: body
        })));
      } else {
        throw Error('留言拉取失败');
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error instanceof Error ? error.message : 'unknown error');
      clearInterval(fetchWishListIntervalId.current); // 停止定时请求
    }
  };

  useEffect(() => {
    fetchWishList();
    fetchWishListIntervalId.current = window.setInterval(() => {
      fetchWishList();
    }, 5000);

    return () => clearInterval(fetchWishListIntervalId.current);
  }, []);

  const dialogClick = () => {
    onClickMessage();
    setIsDialogOpen(true);
  };

  const confirmCloseDialog = async ({nickname, wish}: WishMessage) => {
    try {
      const response = await octokitRef.current.request('POST /repos/LaughingJacky/wedding-wish/issues', {
        title: nickname,
        body: wish
      });

      // const response = await fetch(`https://api.shawbo.wang/blog/add-wish`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': auth
      //   },
      //   body: JSON.stringify({ nickname, wish })
      // });

      // if (!response.ok) {
      //   throw  new Error('网络错误');
      // }

      // const result = await response.json();
      setIsDialogOpen(false);

      if (response.status === 201) {
        await fetchWishList();

        toast.message({
          msg: '祝福收到了'
        });
      } else {
        throw Error('出小差了')
      }
 
    } catch (error) {
      setIsDialogOpen(false);
      toast.message({
        msg: error instanceof Error ? error.message : '未知错误',
      });
    }
  };

  const scroll = () => {
    const scrollContainer = scrollContainerRef.current;
    
    if (scrollContainer) {
      const totalHeight = scrollContainer.scrollHeight;
      const containerHeight = scrollContainer.clientHeight;

      // 每次滚动的像素数
      const scrollStep = 0.4; // 每次滚动1px

      // 更新滚动位置
      scrollPositionRef.current += scrollStep;

      // 如果滚动位置超出总高度，则重置为0
      if (scrollPositionRef.current >= totalHeight - containerHeight) {
        scrollPositionRef.current = 0;
      }

      scrollContainer.scrollTop = scrollPositionRef.current;

      // 使用 requestAnimationFrame 进行下一次更新
      animationRef.current = requestAnimationFrame(scroll);
    }
  };

  useEffect(() => {
    // 开始滚动
    scroll();

    // 清理函数
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [wishList]);

  return <div>
    {wishList.length > 0 && <div ref={scrollContainerRef} className="fixed bottom-24 left-8 right-8 z-10 overflow-hidden h-[210px] pt-[42px] pb-[168px]">
      <div className="overflow-y-auto">
        {
          wishList.map(({nickname, wish}, index) => (
            <div>
              <div key={index} className={styles.wishItem}>
                <span>{nickname}: </span>
                <span>{wish}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>}
    <div className="fixed bottom-8 left-8 z-10" onClick={dialogClick}>
      <i className={`${styles.icoDialog} w-12 h-12`} />
    </div>
    {isDialogOpen && <InputDialog onConfirm={confirmCloseDialog} onCancel={() => setIsDialogOpen(false)} />}
  </div>
}
