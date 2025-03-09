import { CircleAlert } from 'lucide-react'
import { Link } from "react-router-dom";
import Layout from '../components/common/Layout.jsx'

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(80vh-10rem)]">
        <CircleAlert className="size-14 text-error animate-bounce" />
        <h1 className="font-semibold text-3xl text-center">
          Page Not Found
        </h1>
        <Link
          to="/"
          className="btn btn-primary mt-4"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage