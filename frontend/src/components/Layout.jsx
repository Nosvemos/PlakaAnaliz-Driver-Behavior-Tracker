const Layout = ({ children, className = '' }) => {
  return (
    <div className='min-h-screen bg-base-100 flex flex-col'>
      <div className='flex-1 pt-25 pb-8 px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className={`bg-base-100 rounded-xl shadow-lg p-6 min-h-[calc(100vh-10rem)] overflow-y-auto ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;