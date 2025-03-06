import Layout from '../components/Layout';
import PlateForm from '../components/forms/PlateForm.jsx'

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto md:px-4 md:pt-5">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Comment on the plates of vehicles in traffic.
          </h1>
          <p className="text-lg text-base-content/80">
            Comment on the licence plates of vehicles in traffic to make suggestions, warn or praise them.
          </p>
        </div>
        <PlateForm/>
      </div>
    </Layout>
  )
}

export default HomePage