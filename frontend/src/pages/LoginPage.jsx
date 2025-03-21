import Layout from '../components/common/Layout.jsx'
import FormCard from '../components/common/FormCard.jsx'
import LoginForm from '../components/forms/LoginForm.jsx'

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center pt-20 md:pt-30">
        <FormCard
          Form= {<LoginForm />}
          Title= 'Login Account'
          Span1= 'Do not you have an account?'
          Link1= './register'
          LinkText1= 'Register'
        />
      </div>
    </Layout>
  )
}

export default LoginPage