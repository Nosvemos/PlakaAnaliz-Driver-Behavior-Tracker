import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import LoginForm from '../components/forms/LoginForm.jsx'

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center pt-20 md:pt-30">
        <Card
          Form= {<LoginForm />}
          Title= 'Login Account'
          Link1= './forgot-password'
          LinkText1= 'Forgot password?'
          Span2= 'Have you signed up yet?'
          Link2= './signup'
          LinkText2= 'Sign up'
        />
      </div>
    </Layout>
  )
}

export default LoginPage