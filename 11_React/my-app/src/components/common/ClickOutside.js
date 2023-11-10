import React, { useEffect, useRef } from 'react';

function ClickOutside(props) {
  const { onClickOutside } = props;
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const container = containerRef.current;
    const { target } = e;

    if ((container && container === target) || 
        (container && !container.contains(target))) {
      onClickOutside(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div ref={containerRef}>{props.children}</div>
  );
};

export default ClickOutside;
