import { Link } from 'react-router-dom'
import React from 'react'

const FormCard = ({ Title, children, Span1, Link1, LinkText1, Span2, Link2, LinkText2, Form }) => {
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow-md px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">{Title}</h2>
        {Form}
        {(children || Link1 || Link2) && <div className='divider'></div>}
        {children}
        {Link1 && (
          <p className="text-center">
            <span>{Span1}</span>
            <Link to={`/${Link1}`} className="link link-neutral-content ml-1">
              {LinkText1}
            </Link>
          </p>
        )}
        {Link2 && (
          <p className="text-center">
            <span>{Span2}</span>
            <Link to={`/${Link2}`} className="link link-neutral-content ml-1">
              {LinkText2}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default FormCard;