

export const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
    return IPFSUrl;
};
//https://ipfs.io/ipfs/QmSDEPCfGkJjLcWKWTaeUFf9cTxwPyKVztLC95W8iFZ7D6