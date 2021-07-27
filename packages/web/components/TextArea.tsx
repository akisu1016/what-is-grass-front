import classNames from 'classnames';
import { FC } from 'react';

type Props = JSX.IntrinsicElements['textarea'] & {
  size: 'xs' | 'base' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const TextArea: FC<Props> = ({ size, resize = 'both', ...props }) => {
  const baseStyle =
    'border leading-relaxed border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-green-400';
  const styles = classNames(baseStyle, {
    'text-xs py-1 px-1': size === 'xs',
    'text-base py-2 px-2': size === 'base',
    'text-xl py-3 px-3': size === 'lg',
    'resize-none': resize === 'both',
    'resize-y': resize === 'vertical',
    'resize-x': resize === 'horizontal',
    resize: resize === 'both',
  });

  return <textarea className={styles} {...props} />;
};

export default TextArea;
