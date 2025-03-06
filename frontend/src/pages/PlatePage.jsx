import Layout from '../components/Layout.jsx'
import PlateInput from '../components/forms/PlateInput.jsx'
import { useParams } from 'react-router-dom'
import PlateComments from '../components/PlateComments.jsx'
import { useEffect, useMemo } from 'react'
import { usePlateStore } from '../store/usePlateStore.js'
import Loading from '../components/Loading.jsx'

const PlatePage = () => {
  const { plate } = useParams();
  const { findPlate, plateData, isLoading } = usePlateStore();

  const beautifiedPlate = useMemo(() => {
    return plate
    .replace(/([A-Za-z]+)(\d+)/g, '$1 $2')
    .replace(/(\d+)([A-Za-z]+)/g, '$1 $2')
  }, [plate]);

  useEffect(() => {
    findPlate(plate);
  }, [findPlate, plate]);

  if(isLoading) return (
    <Loading></Loading>
  );

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