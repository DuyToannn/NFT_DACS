
import './NFTTile.css';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile (data) {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
        <Link to={newTo}>
        <div className="relative">
            <img src={IPFSUrl} alt="" className="w-72 h-80 rounded-lg object-cover max-h-[170px]" crossOrigin="anonymous" />
            <div className= "card-item-title rounded-b-lg absolute bottom-[-60px] w-full z-[-1]">
                <h3 className="font-semibold text-[16px] text-white text-left" >{data.data.name}</h3>
                <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                    {data.data.description}
                </p>
                {/* <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{data.price + "ETH"}</h4> */}


            </div>
        </div>
        </Link>
    )
}

export default NFTTile;