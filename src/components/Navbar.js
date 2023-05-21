
import { logo, menu, search, thirdweb,dashboard ,money,payment,profile} from '../assets';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}

function updateButton() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "Connected";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-green-70");
  ethereumButton.classList.add("bg-green-500");
}

async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x4')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
     })
    }  
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
}

  useEffect(() => {
    if(window.ethereum == undefined)
      return;
    let val = window.ethereum.isConnected();
    if(val)
    {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  });
  async function logout() {
    try {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {}
        }]
      });
      await window.ethereum.request({
        method: 'wallet_clearSession'
      });
      console.log("Logout successful");
    } catch (error) {
      console.error(error);
    }
  }
  

    return (
      <div className="">
        <nav className="w-screen">
          <ul className='ul_navbar'>
          <li className='li_logo'>
            <Link to="/">
              <img src={logo} alt="user" className="" />
            </Link>
          </li>
          <li className='li_menu'>
            <ul className=''>
              {location.pathname === "/" ? 
              <li className=''>
                <Link to="/">
                  <img src={dashboard} alt=''/>
                </Link>
              </li>
              :
              <li className=':'>
                <Link to="/">
                <img src={dashboard}  alt=''/>
                </Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className=''>
                <Link to="/sellNFT">
                  <img src={payment}  alt=''/>
                </Link>
              </li>
              :
              <li className=''>
                <Link to="/sellNFT">
                <img src={payment}  alt=''/>
                </Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className=''>
                <Link to="/profile">
                  <img  src={profile} alt=''/>
                </Link>
              </li>
              :
              <li className=''>
                <Link to="/profile">
                  <img  src={profile} alt=''/>
                </Link>
              </li>              
              }  
        
           
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm connect-wallet'>
        <button className="  enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>       
         <button onClick={logout} className='change-wallet'>Đăng nhập Ví</button>
          {currAddress !== "0x" ? "Kết nối tới":"Chưa kết nối , Vui lòng đăng nhập !"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>

       
      </div>
    );
  }

  export default Navbar;