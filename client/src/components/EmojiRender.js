import React from 'react';

const EmojiRender = ({ emoji }) => {
  const emojiRender = emoji
    .split('-')
    .map((codePoint) => String.fromCodePoint(`0x${codePoint}`))
    .join('');
  return (
    <div role='img' style={{ fontSize: '30px' }}>
      {emojiRender}
    </div>
  );
};

export default EmojiRender;
