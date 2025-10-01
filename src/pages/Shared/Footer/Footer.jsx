import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logoImg from '../../../assets/logo.png'
import { FaSquareGithub } from 'react-icons/fa6';
import { Parallax } from 'react-parallax';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content  p-10">
     <div className='flex justify-center items-center'>
                 <div><img src={logoImg} alt="" /></div>
                 <div><a className="btn btn-ghost text-xl">Profast</a></div>
             </div>


           <p className='px-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, odio quis error itaque ratione vel a debitis hic inventore nobis minima ab animi? Ut earum omnis enim esse doloribus aspernatur id officia voluptates pariatur. Quis temporibus recusandae doloremque repellat? Fuga.</p>

        
           <div className="border-b-3 border-dotted border-white w-full"></div>
      <div>
        <div>
            <ul className='flex justify-between items-center gap-8'>
                <li>Home</li>
                <li>Services</li>
                <li>About Us</li>
                <li>Coverage</li>
            </ul>
        </div>
         <div className="border-b-3 border-dotted border-white w-[300px]"></div>
        <div className="grid grid-flow-col gap-4 text-4xl">
         <FaLinkedin />
         <FaFacebook />
         <FaSquareGithub />
         <FaYoutube />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
