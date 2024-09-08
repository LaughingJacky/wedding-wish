import classNames from 'classnames';

import styles from './index.module.css';
import { stopPropagationAndPreventDefault } from '~/utils/click';
import { initModal } from './initModal';

export interface IModal<T = any> {
  /** 组件 */
  Component: React.FC<T>;
  /** 组件参数 */
  componentProps?: T;
  /** 类名 */
  classNameMap?: Record<string, string>;
  /** 关闭方法 */
  close: () => void;
  setResult?: (result?: any) => void;
  /** 关闭回调 */
  onClose?: (result?: any) => void;
}

export const Modal = (props: IModal) => {
  const { Component, componentProps, classNameMap = {}, close, setResult } = props;

  return (
    <div className={classNames(styles.modal, classNameMap.modal)} onClick={close}>
      <div className={classNames(styles.content, classNameMap.content)} onClick={stopPropagationAndPreventDefault}>
        <Component {...componentProps} close={close} setResult={setResult} />
      </div>
    </div>
  );
};

export const openModal = (options: Omit<IModal, 'close'>) => {
  const { onClose } = options;
  const { render, close } = initModal();
  let result: any;
  const setResult = (data: any) => {
    result = data;
  };

  const closeFunc = () => {
    onClose?.(result);
    close();
  };

  render(<Modal {...options} close={closeFunc} setResult={setResult} />);

  return closeFunc;
};
