import React from 'react';
import Layout from '../components/common/Layout.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import PlateForm from '../components/forms/PlateForm.jsx';

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto md:px-4 md:pt-5">
        <HeroSection />
        <PlateForm />
      </div>
    </Layout>
  );
};

export default HomePage;