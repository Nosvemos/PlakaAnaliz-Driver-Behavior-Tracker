import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PlateInput from './PlateInput.jsx'
import { validatePlate } from '../../utils/plateUtils.js'
import { toast } from 'react-toastify'

const PlateForm = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [formattedPlate, setFormattedPlate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const { error: validationError, formattedPlate: formatted } = validatePlate(input);
    setError(validationError);
    setFormattedPlate(formatted);
  }, [input]);

  const handleChange = (e) => {
    const raw = e.target.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
      .replace(/(\d{2})([A-Z]+)/, '$1 $2')
      .replace(/([A-Z]{3})(\d+)/, '$1 $2')
      .slice(0, 10);

    setInput(raw.replace(/ /g, ''));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if(!error) {
      navigate(`/${formattedPlate.replace(/\s+/g, "")}`)
    } else {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="text-center space-y-2 max-w-4xl mx-auto pt-10 md:pt-20">
        <p className="text-md text-base-content/80">
          Enter the licence plate below and search.
        </p>

        <PlateInput value={formattedPlate} onChange={handleChange} />
      </div>
      <div className="text-center space-y-2 max-w-4xl mx-auto pt-3 md:pt-6">
        {(error && formattedPlate.length > 0) && (
          <div className="text-error text-sm mt-4">
            ⚠️ {error}
          </div>
        )}
        <p className="text-sm text-base-content/60">
          Completely <u>free of charge.</u> No membership required.
        </p>
        <p className="text-sm text-base-content/60 mb-4">
          By searching for license plate, you agree to the <Link to="/" className="hover:opacity-80 transition-all">
          <u>terms of use.</u>
        </Link>
        </p>
        <button onClick={submitForm} className="btn btn-primary btn-md rounded-lg p-4 md:p-6">Search Plate</button>
      </div>
    </>
  )
}

export default PlateForm