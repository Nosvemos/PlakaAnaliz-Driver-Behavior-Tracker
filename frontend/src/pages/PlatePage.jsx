import Layout from '../components/Layout.jsx'
import PlateInput from '../components/forms/PlateInput.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import PlateComments from '../components/PlateComments.jsx'
import { useEffect, useMemo, useState } from 'react'
import { usePlateStore } from '../store/usePlateStore.js'
import Loading from '../components/Loading.jsx'
import { validatePlate } from '../utils/plateUtils.js'
import { toast } from 'react-toastify'

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
      toast.error('Invalid plate format.')
    }
  }, [error, navigate]);

  const beautifiedPlate = useMemo(() => {
    return plate
    .replace(/([A-Za-z]+)(\d+)/g, '$1 $2')
    .replace(/(\d+)([A-Za-z]+)/g, '$1 $2')
  }, [plate]);

  if (isLoading && !error) return <Loading />;

  return (
    <Layout>
      <div className="container mx-auto md:px-4 md:pt-5 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <PlateInput value={beautifiedPlate} disabled={true}/>
        </div>
      </div>
      <PlateComments plateData={plateData}/>
    </Layout>
  )
}

export default PlatePage;