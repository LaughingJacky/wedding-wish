import ReactDOM from 'react-dom/client'; // 使用新 API
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

const Toast = ({ message, duration, onClose, type, status }: {
  message: string;
  duration: number;
  onClose: () => void;
  type?: string;
  status?: number;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={classNames(styles.toast, {
      [styles.syzs]: type === 'syzs',
      [styles.pcyyb]: type === 'pcyyb'
    })}>
      {type === 'syzs' && status && <i className={styles.syzsIcon} />}
      <span>{message}</span>
    </div>
  );
};

let toastContainer: HTMLDivElement | null = null;
let toastRoot: ReactDOM.Root | null = null; // 用于存储 React 18 的 Root 实例

const showToast = ({
  msg,
  dom = document.body,
  duration = 3000,
  type,
  status
}: {
  msg: string;
  dom?: HTMLElement;
  duration?: number;
  status?: number;
  type?: string;
}) => {
  // 如果当前已有 Toast 显示，则返回
  if (toastContainer) return; // 只允许同时显示一个 Toast

  toastContainer = document.createElement('div');
  toastContainer.className = styles.toastContainer;
  document.body.appendChild(toastContainer);

  if (dom) {
    const { clientWidth: maxWidth, clientHeight: maxHeight } = dom;
    toastContainer.style.width = `${maxWidth}px`;
    toastContainer.style.height = `${maxHeight + 80}px`;
  }

  // 使用 createRoot 创建一个根实例
  toastRoot = ReactDOM.createRoot(toastContainer);

  const handleClose = () => {
    // 卸载组件
    toastRoot?.unmount();
    // 重置 toastContainer，允许下一个 Toast 显示
    toastContainer = null;
  };

  // 使用 React 18 的新 API 渲染组件
  toastRoot.render(<Toast status={status} message={msg} type={type} duration={duration} onClose={handleClose} />);
};

export const toast = { message: showToast };