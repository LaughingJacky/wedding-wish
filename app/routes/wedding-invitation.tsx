import { useEffect, useRef, useState } from 'react';
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';

import { Barrage } from '~/ui/wedding/Barrage';
import { Slides } from '~/ui/wedding/Slide';
import * as STATIC_FILES from '~/utils/weddingConfig';
import { weiboImgAntiForbidden } from '~/utils/net';

export async function loader() {
  return json({
    API_AUTH: process.env.API_AUTH,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "王晓博&张程的婚礼" },
    { name: "description", content: "欢迎参加我们的婚礼！" },
    { rel: 'preconnect', href: '//image.baidu.com' },
    { rel: 'dns-prefetch', href: '//image.baidu.com' },
    { rel: 'preconnect', href: '//images.ctfassets.net' },
    { rel: 'dns-prefetch', href: '//images.ctfassets.net' },
    { property: 'og:title', content: "王晓博&张程の婚礼" },
    { property: 'og:description', content: "欢迎参加我们的婚礼！" },
    { property: 'og:image', content: weiboImgAntiForbidden('https://tvax4.sinaimg.cn/large/6c9735b6gy1htgk0qtq71j20gp0gp0u2.jpg') },
  ];
};

const WeddingInvitation = () => {
  const data = useLoaderData<typeof loader>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import('eruda').then(eruda => {
  //       eruda.default.init();
  //       console.log('innerHeight', window.innerHeight);

  //     }).catch();
  //   }
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    handlePlay();
    // 清理函数：组件卸载时停止音频
    return () => {
      audio.pause();
      audio.currentTime = 0; // 重置播放时间
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio?.paused) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const preloadResources = async () => {
    const promises = Object.values(STATIC_FILES).map((file, index) => {
      // 检查文件名是否以 "HD" 结尾，若是则跳过
      if (file.endsWith("HD")) {
        return Promise.resolve(true); // 直接返回已解决的 Promise
      }
  
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = file;
        img.onload = () => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${file}`));
      });
    });
  
    return Promise.all(promises);
  };

  useEffect(() => {
    const loadResources = async () => {
      try {
        await preloadResources();
      } catch {
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);
  
  if (loading) {
    return <div className="bg-black w-full h-screen flex items-center justify-center">
      <i className="inline-block w-[283px] h-[221px] bg-cover bg-[url(/loading.gif)]" />
    </div>;
  }

  return (
    <>
      <audio loop ref={audioRef}>
        <source src="/wedding-music:hello-my-love.mp3" type="audio/mpeg" />
        <track kind="metadata" />
        Your browser does not support the audio element.
      </audio>
      <Barrage onClickMessage={handlePlay} auth={data.API_AUTH!} />
      <Slides onSwipe={handlePlay} />
    </>

  );
};

export default WeddingInvitation;