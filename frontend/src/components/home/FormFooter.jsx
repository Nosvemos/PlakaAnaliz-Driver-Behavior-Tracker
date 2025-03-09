import React from 'react';
import { Link } from 'react-router-dom';

const FormFooter = ({ onSubmit, error, formattedPlate }) => {
  return (
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
      <button
        onClick={onSubmit}
        className="btn btn-primary btn-md rounded-lg p-4 md:p-6"
        disabled={error && formattedPlate.length > 0}
      >
        Search Plate
      </button>
    </div>
  );
};

export default FormFooter;