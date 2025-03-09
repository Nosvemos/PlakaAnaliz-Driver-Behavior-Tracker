import {
  ArrowDown01,
  ArrowDown10,
  MessageCircle,
  Trash2,
  Edit,
  Save,
  X,
  Smile,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import CommentForm from './forms/CommentForm.jsx'
import Loading from './Loading.jsx'
import { useCommentStore } from '../store/useCommentStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import EmojiPicker from 'emoji-picker-react'

const PlateComments = ({ plateData }) => {
  const { getComments, comments, isLoading, deleteComment, updateComment } = useCommentStore();
  const { user, isAuthenticated } = useAuthStore();

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

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
    setEditText(editText + emojiObject.emoji);
  };

  useEffect(() => {
    if (plateData && plateData._id) {
      getComments(plateData._id);
    }
  }, [getComments, plateData]);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.comment);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText('');
  };

  const handleSaveEdit = async (commentId) => {
    if (editText.trim() === '') return;

    const success = await updateComment(commentId, editText);
    if (success) {
      setEditingCommentId(null);
      setEditText('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(commentId);
    }
  };

  if(isLoading) return <Loading />;

  const showValidation = () => {
    return editText.length > 0 &&
      (editText.length < 10 || editText.length > 300);
  };

  return (
    <>
      <div className='flex flex-row items-stretch justify-center pb-5'>
        <div className='flex-1'>
          <div className="flex items-center gap-1 hover:opacity-80 transition-all">
            <MessageCircle className='size-5'/>
            <span className="text-md font-semibold">Comments</span>
            <span>({comments.length})</span>
          </div>
        </div>
        <div className='flex flex-row justify-center space-x-10'>
          <button className="flex items-center gap-1 hover:opacity-80 transition-all">
            <span className="hidden text-sm sm:inline">Newest</span>
            <ArrowDown10 className='size-5'/>
          </button>
          <button className="flex items-center gap-1 hover:opacity-80 transition-all">
            <span className="hidden text-sm sm:inline">Oldest</span>
            <ArrowDown01 className='size-5'/>
          </button>
        </div>
      </div>
      <CommentForm plateData={plateData}/>

      {/* Display comments */}
      <div className="mt-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-4 border border-base-content/20 rounded-lg">
              {editingCommentId === comment._id ? (
                // Edit mode
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold">{comment.writer?.username || 'Anonymous'}</div>
                    <div className="text-sm text-base-content/60">
                      {new Date(comment.createdAt) < new Date(comment.updatedAt) ? `Edited ${new Date(comment.createdAt).toLocaleDateString()}` : new Date(comment.createdAt).toLocaleDateString() }
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      className="textarea min-w-full p-2 mb-2 rounded-md text-base-content/80 pr-10 emoji-font-support"
                      value={editText}
                      minLength={10}
                      maxLength={300}
                      onChange={handleChange}
                      rows={3} required={true}
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
                    <div className="text-error text-xs">Comment must be longer than 10 and shorter than 300 characters.</div>
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
                      onClick={() => handleSaveEdit(comment._id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:opacity-80"
                    >
                      <Save className="size-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{comment.writer?.username || 'Anonymous'}</div>
                      <div className="text-sm text-base-content/60">
                        {new Date(comment.createdAt) < new Date(comment.updatedAt) ? `Edited ${new Date(comment.createdAt).toLocaleDateString()}` : new Date(comment.createdAt).toLocaleDateString() }
                      </div>
                    </div>

                    {isAuthenticated && comment.writer && user && comment.writer._id === user._id && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="p-1 text-base-content/60 rounded-full hover:opacity-80"
                          title="Edit comment"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
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
          ))
        ) : (
          <div className="text-center py-4 text-base-content/80">No comments yet. Be the first to comment!</div>
        )}
      </div>
    </>
  )
}

export default PlateComments