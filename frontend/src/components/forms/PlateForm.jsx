import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlateInput from './inputs/PlateInput.jsx';
import SearchInstruction from '../home/SearchInstruction.jsx';
import FormFooter from '../home/FormFooter.jsx';
import { validatePlate } from '../../utils/validators/plateValidator.js';
import { toast } from 'react-toastify';
import { usePlateStore } from '../../store/usePlateStore.js'

const PlateForm = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [formattedPlate, setFormattedPlate] = useState('');
  const { resetPlateData } = usePlateStore();

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
    const fixedPlate = formattedPlate.replace(/\s+/g, "");
    e.preventDefault();

    resetPlateData();

    if(!error) {
      navigate(`/${fixedPlate}`);
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <SearchInstruction />
      <PlateInput value={formattedPlate} onChange={handleChange} />
      <FormFooter
        onSubmit={submitForm}
        error={error}
        formattedPlate={formattedPlate}
      />
    </>
  );
};

export default PlateForm;