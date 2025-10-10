import { Link } from 'react-router';
import logoImg from '../../../assets/logo.png'
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

const Navbar = () => {
    const nevItems =<>
           
           <li className='text-lg'><Link to='/'>Home</Link></li>
           <li className='text-lg'><Link to='/sendParcel'>Send a Parcel</Link></li>
           <li className='text-lg'><Link to='/coverage'>Coverage</Link></li>
           <li className='text-lg'><Link to='/aboutUs'>About Us</Link></li>     
  </>
  return (
    <div className="navbar mb-5 py-8 bg-amber-50 shadow-sm px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-10"
          >
           {nevItems}
          </ul>
        </div>
        <div className='flex justify-center items-center'>
            <div><img src={logoImg} alt="" /></div>
            <div><a className="btn btn-ghost text-2xl">Profast</a></div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          {nevItems}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn mr-2">Sign In</a>
        <Link to='/login' className="btn bg-[#CAEB66]">LogIn</Link>
       <p className='ml-3 text-4xl'><BsArrowUpRightCircleFill/></p>
      </div>
    </div>
  );
};

export default Navbar;
