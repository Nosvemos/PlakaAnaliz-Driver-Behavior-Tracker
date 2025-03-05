import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-25 min-h-[calc(100vh-14rem)]">
        <div className="container mx-auto px-4">
          <div className="bg-base-100 rounded-xl p-6 mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;