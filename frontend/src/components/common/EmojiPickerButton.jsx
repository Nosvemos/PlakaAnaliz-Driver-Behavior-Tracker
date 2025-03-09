import React, { useEffect, useRef, useState } from 'react';
import { Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiObject) => {
    onEmojiSelect(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <button
        type="button"
        className="absolute bottom-2 right-2 p-1 hover:bg-gray-100 rounded"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <Smile size={20} className="text-gray-400" />
      </button>

      {showEmojiPicker && (
        <div
          className="absolute top-full right-0 z-10 mt-2"
          ref={emojiPickerRef}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            searchDisabled
            skinTonesDisabled
          />
        </div>
      )}
    </>
  );
};

export default EmojiPickerButton;