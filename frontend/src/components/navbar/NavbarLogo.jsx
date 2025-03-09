import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react'
import { brandName } from '../../constants/index.js'

const NavbarLogo = () => (
  <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
    <div className="rounded-lg flex items-center justify-center">
      <Car className="size-7 text-primary stroke-1" />
    </div>
    <h1 className="text-lg font-semibold">{ brandName }</h1>
    <div className="flex items-center justify-center">
      <ReactCountryFlag countryCode="TR" svg className='text-2xl rounded-lg'/>
    </div>
  </Link>
);

export default NavbarLogo;