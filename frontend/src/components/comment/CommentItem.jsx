import React, { useState, useRef, useEffect } from 'react'
import { Edit, Trash2, Save, X, Smile } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useCommentStore } from '../../store/useCommentStore.js';
import EmojiPicker from 'emoji-picker-react';

const CommentItem = ({ comment }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { updateComment, deleteComment } = useCommentStore();

  const [editingComment, setEditingComment] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Move all the editing logic and UI here

  const handleEmojiClick = (emojiObject) => {
    setEditText(editText + emojiObject.emoji);
  };

  const handleEditClick = () => {
    setEditingComment(true);
    setEditText(comment.comment);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditingComment(false);
    setEditText('');
  };

  const handleSaveEdit = async () => {
    if (editText.trim() === '') return;

    const success = await updateComment(comment._id, editText);
    if (success) {
      setEditingComment(false);
    }
  };

  const handleDeleteComment = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(comment._id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showValidation = () => {
    return editText.length > 0 && (editText.length < 10 || editText.length > 300);
  };

  return (
    <div className="p-4 border border-base-content/20 rounded-lg">
      {editingComment ? (
        // Edit mode
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-semibold">{comment.writer?.username || 'Anonymous'}</div>
            <div className="text-sm text-base-content/60">
              {new Date(comment.createdAt) < new Date(comment.updatedAt)
                ? `Edited ${new Date(comment.createdAt).toLocaleDateString()}`
                : new Date(comment.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="relative">
            <textarea
              className="textarea min-w-full p-2 mb-2 rounded-md text-base-content/80 pr-10 emoji-font-support"
              value={editText}
              minLength={10}
              maxLength={300}
              onChange={handleChange}
              rows={3}
              required={true}
            />

            <button
              type="button"
              className="absolute bottom-3 right-2 p-1 hover:bg-gray-100 rounded"
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
          </div>
          {showValidation() && (
            <div className="text-error text-xs">
              Comment must be longer than 10 and shorter than 300 characters.
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:opacity-80"
            >
              <X className="size-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:opacity-80"
              disabled={editText.length < 10 || editText.length > 300}
            >
              <Save className="size-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        // View mode
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{comment.writer?.username || 'Anonymous'}</div>
              <div className="text-sm text-base-content/60">
                {new Date(comment.createdAt) < new Date(comment.updatedAt)
                  ? `Edited ${new Date(comment.createdAt).toLocaleDateString()}`
                  : new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>

            {isAuthenticated && comment.writer && user && comment.writer._id === user._id && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEditClick}
                  className="p-1 text-base-content/60 rounded-full hover:opacity-80"
                  title="Edit comment"
                >
                  <Edit className="size-4" />
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="p-1 text-base-content/60 rounded-full hover:opacity-80"
                  title="Delete comment"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-base-content/80 emoji-font-support">{comment.comment}</p>
        </>
      )}
    </div>
  );
};

export default CommentItem;