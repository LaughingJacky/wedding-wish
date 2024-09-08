import React from 'react';
import ReactDOM from 'react-dom/client';

export interface IInitModal {
  onClose?: (result?: any) => void;
}

export const initModal = () => {
  let div: HTMLDivElement;
  let reactDOMRoot: ReactDOM.Root;

  const render = (comp: React.ReactElement) => {
    const modalRoot = document.querySelector('#modal-root');

    if (!modalRoot) return;

    div = document.createElement('div');

    modalRoot.appendChild(div);

    reactDOMRoot = ReactDOM.createRoot(div);
    reactDOMRoot.render(comp);
  };

  const close = () => {
    try {
      const modalRoot = document.querySelector('#modal-root');

      if (!modalRoot) return;

      if (!reactDOMRoot) return;

      reactDOMRoot.unmount();
      modalRoot.removeChild(div);
    } catch (error) {

    }
  };

  return { render, close };
};
