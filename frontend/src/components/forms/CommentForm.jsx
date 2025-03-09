import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useCommentStore } from '../../store/useCommentStore.js'
import { validatePlate } from '../../utils/plateUtils.js'
import { toast } from 'react-toastify'

const CommentForm = ({plateData}) => {
  const [formData, setFormData] = useState({
    comment: '',
    agreeChecked: false
  });

  const { plate } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const { isLoading, sendComment } = useCommentStore();

  const handleChange = (e) => {
    if (submitted) {
      setSubmitted(false);
    }

    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

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
      await sendComment(plateData.plate, formData.comment);
      setFormData({ comment: '', agreeChecked: false });
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
        <textarea
          className="textarea h-24 min-w-full"
          placeholder="Write your comment..."
          name='comment'
          value={formData.comment}
          minLength={10}
          maxLength={300}
          onChange={handleChange}
          required
        />

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
  )
}

export default CommentForm;