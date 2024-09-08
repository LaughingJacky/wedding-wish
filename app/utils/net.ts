export const weiboImgAntiForbidden = (url: string) => {
  if (!url.includes('sinaimg')) return url;
  return `https://image.baidu.com/search/down?url=${url}`;
}
