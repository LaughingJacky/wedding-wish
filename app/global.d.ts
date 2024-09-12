declare global {
  interface Window {
    ENV: {
      GH_TOKEN: string;
      // 你可以在这里添加更多的环境变量
    };
  }
}

export {};