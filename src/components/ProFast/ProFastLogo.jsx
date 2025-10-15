import { Link } from 'react-router';
import logo from '/src/assets/logo.png'

const ProFastLogo = () => {
    return (
       <Link to="/">
            <div className='flex items-end'>
           <img className='mb-2' src={logo} alt="" /> 
           <p className='text-3xl font-bold'>ProFast</p>
        </div>
       </Link>
    );
};

export default ProFastLogo;