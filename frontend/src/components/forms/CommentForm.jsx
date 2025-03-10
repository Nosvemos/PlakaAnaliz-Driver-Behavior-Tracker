import { Link, useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react'
import { Loader, Image, X } from 'lucide-react';
import { useCommentStore } from '../../store/useCommentStore.js';
import { validatePlate } from '../../utils/validators/plateValidator.js';
import { toast } from 'react-toastify';
import EmojiPickerButton from '../common/EmojiPickerButton.jsx';

const CommentForm = ({ plateData }) => {
  const [formData, setFormData] = useState({
    comment: '',
    agreeChecked: false
  });

  const [submitted, setSubmitted] = useState(false);
  const { isLoading, sendComment } = useCommentStore();
  let { plate } = useParams();
  plate = plate.toUpperCase()

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (e) => {
    if (submitted) {
      setSubmitted(false);
    }

    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setFormData(prev => ({
      ...prev,
      comment: prev.comment + emoji
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = validatePlate(plate);
    if (validationError) {
      toast.error('Invalid plate form.');
      return;
    }

    if (!plateData) {
      toast.error('Plate not found.');
      return;
    }

    try {
      await sendComment(plateData.plate, formData.comment, imagePreview);
      setFormData({ comment: '', agreeChecked: false });
      removeImage();
    } catch (err) {
      toast.error('Failed to send comment.');
    }
  };

  const showValidation = () => {
    return !submitted &&
      formData.comment.length > 0 &&
      (formData.comment.length < 10 || formData.comment.length > 300);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700"/>
              <button onClick={removeImage}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                      type="button">
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}
        <div className="relative">
          <textarea
            className="textarea h-24 min-w-full pb-12 emoji-support"
            placeholder="Write your comment..."
            name='comment'
            value={formData.comment}
            minLength={10}
            maxLength={300}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className={`absolute bottom-2.25 right-12 btn btn-sm btn-circle ${imagePreview ? "text-primary" : "text-base-content/30"}`}
            onClick={() => fileInputRef.current?.click()} >
            <Image size={20} />
          </button>

          <div className="absolute bottom-1 right-2">
            <EmojiPickerButton onEmojiSelect={handleEmojiSelect} size={16} />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {showValidation() && (
          <div className="text-error">Comment must be longer than 10 and shorter than 300 characters.</div>
        )}

        <div className="flex justify-between items-center">
          <label className="fieldset-label flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="agreeChecked"
              title="Required"
              checked={formData.agreeChecked}
              onChange={handleChange}
              required
            />
            <span className="text-sm text-base-content/60"> I agree to the <Link to="/" className="hover:opacity-80 transition-all">
                <u>Terms of Use</u>
                </Link> and <Link to="/" className="hover:opacity-80 transition-all">
                <u>Privacy Policy.</u>
                </Link>
              </span>
          </label>
          <div className="form-control">
            <button
              className="btn btn-primary btn-outline rounded-md shadow-xl ml-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : 'Send'}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default CommentForm;