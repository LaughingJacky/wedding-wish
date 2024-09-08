import classNames from "classnames";
import { useCallback } from "react";

import styles from './Address.module.css';

interface AddressBtnProps {
  type: 'boy' | 'girl';
  className?: string;
}

export const AddressBtn = ({className, type}: AddressBtnProps) => {
  const showAddress = useCallback(() => {
    if (type === 'girl') {
      const address = encodeURIComponent("湖南省湘潭市湘潭县潭城禧宴文化中心云境厅");
      const url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:27.797295,112.972643;title:${address}&referer=myapp`;

      window.location.href = url;
      return;
    }

    const address = encodeURIComponent('辽宁省辽阳市乐日酒店锦礼厅');
    const url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:41.250679,123.195752;title:${address}&referer=myapp`;
    window.location.href = url;
  }, [type]);

  return <div onClick={showAddress} className={classNames(className, styles.addressBtn)} />
}