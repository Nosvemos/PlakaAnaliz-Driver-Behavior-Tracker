import Layout from '../components/common/Layout.jsx'
import FormCard from '../components/common/FormCard.jsx'
import RegisterForm from '../components/forms/RegisterForm.jsx'

const RegisterPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center pt-5 md:pt-15">
        <FormCard
          Form= {<RegisterForm />}
          Title= 'Create Account'
          Span1= 'Already have an account ?'
          Link1= './login'
          LinkText1= 'Log in'
        />
      </div>
    </Layout>
  )
}

export default RegisterPage