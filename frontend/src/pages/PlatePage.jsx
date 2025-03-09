import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import PlateComments from '../components/comment/PlateComments.jsx';
import { usePlateStore } from '../store/usePlateStore.js';
import Loading from '../components/common/Loading.jsx';
import { validatePlate } from '../utils/validators/plateValidator.js';
import { toast } from 'react-toastify';
import PlateDisplay from '../components/home/PlateDisplay.jsx';

const PlatePage = () => {
  const navigate = useNavigate();
  const { plate } = useParams();
  const [error, setError] = useState('');
  const { findPlate, plateData, isLoading } = usePlateStore();

  useEffect(() => {
    const { error: validationError } = validatePlate(plate);
    setError(validationError);

    if (!validationError) {
      findPlate(plate);
    }
  }, [plate, findPlate]);

  useEffect(() => {
    if (error) {
      navigate('/');
      toast.error('Invalid home format.');
    }
  }, [error, navigate]);

  if (isLoading && !error) return <Loading />;

  return (
    <Layout>
      <PlateDisplay plate={plate} />
      <PlateComments plateData={plateData} />
    </Layout>
  );
};

export default PlatePage;