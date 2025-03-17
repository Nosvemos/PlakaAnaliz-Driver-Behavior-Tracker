import React, { useState, useRef } from 'react';
import { Edit, Trash2, Save, X, Smile, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useResponseStore } from '../../store/useResponseStore';
import EmojiPicker from 'emoji-picker-react';

const ResponseItem = ({ response }) => {
  const { user } = useAuthStore();
  const { updateResponse, deleteResponse, addReaction, deleteReaction } = useResponseStore();

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(response.response);

  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);
  const replyEmojiPickerRef = useRef(null);
  const handleReplyEmojiClick = (emojiObject) => {
    setEditText(editText + emojiObject.emoji);
  };

  // Reaction logic
  const userReaction = response.reactions?.find(r => r.user === user?._id);
  const likes = response.reactions?.filter(r => r.reactionType === 'like').length || 0;
  const dislikes = response.reactions?.filter(r => r.reactionType === 'dislike').length || 0;

  const handleReaction = async (type) => {
    if (userReaction?.reactionType === type) {
      await deleteReaction(response._id);
    } else {
      await addReaction(response._id, type);
    }
  };

  // Edit handling
  const handleSave = async () => {
    if (editText.length < 10 || editText.length > 300) return;
    await updateResponse(response._id, editText);
    setEditing(false);
  };

  return (
    <div className="ml-4 mt-2 pl-4 border-l-2 border-gray-200">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{response.writer?.username}</span>
          <span className="text-gray-500 text-xs">
            {new Date(response.createdAt) < new Date(response.updatedAt)
              ? `Edited ${new Date(response.updatedAt).toLocaleDateString()}`
              : new Date(response.createdAt).toLocaleDateString()}
          </span>
        </div>

        {user?._id === response.writer?._id && !editing && (
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(!editing)}
              className="p-1 text-base-content/60 rounded-full hover:opacity-80"
              title="Edit response"
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={() => deleteResponse(response._id)}
              className="p-1 text-base-content/60 rounded-full hover:opacity-80"
              title="Delete response"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="relative">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
          />
          <button
            type="button"
            className="absolute bottom-8 right-2 p-1 hover:bg-gray-100 rounded"
            onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)}
          >
            <Smile size={16} className="text-gray-400" />
          </button>

          {showReplyEmojiPicker && (
            <div className="absolute top-full right-0 z-10 mt-2" ref={replyEmojiPickerRef}>
              <EmojiPicker onEmojiClick={handleReplyEmojiClick} searchDisabled skinTonesDisabled />
            </div>
          )}
          <div className="flex gap-2 mb-4 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1 px-3 py-1 text-xs rounded-md hover:opacity-80"
            >
              <X className="size-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 text-xs rounded-md hover:opacity-80 bg-primary text-primary-content"
              disabled={editText.length < 10 || editText.length > 300}
            >
              <Save className="size-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800">{response.response}</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleReaction('like')}
              className={`flex items-center gap-1 rounded-full hover:opacity-80 ${userReaction?.reactionType === 'like' ? 'text-primary' : 'text-base-content'}`}
            >
              <ThumbsUp size={16} /> {likes}
            </button>
            <button
              onClick={() => handleReaction('dislike')}
              className={`flex items-center gap-1 rounded-full hover:opacity-80 ${userReaction?.reactionType === 'dislike' ? 'text-primary' : 'text-base-content'}`}
            >
              <ThumbsDown size={16} /> {dislikes}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResponseItem;