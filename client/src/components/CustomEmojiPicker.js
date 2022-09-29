import React from 'react';
import CustomBtn from './CustomBtn';
import Picker from 'emoji-picker-react';

const CustomEmojiPicker = ({ emoji, setEmoji }) => {
  //toggler for emoji dropdown
  const myFunction = () => {
    document.getElementById('myDropdown').classList.toggle('show');
  };

  //handles the event when emoji is selected
  const handleSelectEmoji = (event, emoji) => {
    setEmoji(emoji);
    myFunction();
  };

  return (
    <div class='dropdown'>
      {emoji ? (
        <div
          onClick={myFunction}
          style={{ fontSize: '30px', cursor: 'pointer' }}
        >
          {emoji.emoji}
        </div>
      ) : (
        <CustomBtn
          style={{
            width: '100%',
            marginTop: '20px',
          }}
          type='light'
          text='Select emoji'
          onClick={myFunction}
        />
      )}
      <div id='myDropdown' class='dropdown-content'>
        <Picker onEmojiClick={handleSelectEmoji} />
      </div>
    </div>
  );
};

export default CustomEmojiPicker;
