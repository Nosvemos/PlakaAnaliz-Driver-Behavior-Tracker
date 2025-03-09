import React, { useMemo } from 'react';
import PlateInput from '../forms/inputs/PlateInput.jsx';

const PlateDisplay = ({ plate }) => {
  const beautifiedPlate = useMemo(() => {
    return plate
    .replace(/([A-Za-z]+)(\d+)/g, '$1 $2')
    .replace(/(\d+)([A-Za-z]+)/g, '$1 $2');
  }, [plate]);

  return (
    <div className="container mx-auto md:px-4 md:pt-5 pb-20">
      <div className="text-center max-w-4xl mx-auto">
        <PlateInput value={beautifiedPlate} disabled={true} />
      </div>
    </div>
  );
};

export default PlateDisplay;