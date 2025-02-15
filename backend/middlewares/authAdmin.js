import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) =>{
    try{

        const {atoken} = req.headers;
        if(!atoken){
            return res.status(401).json({success: false, message: 'Access Denied'})
        }
        const tokenDecoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(tokenDecoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({success: false, message: 'Invalid Token'})
        }
        next() 
    }catch(error){
        console.log(error)
        return res.status(500).json({success: false, message: error.message})
    }
}

export default authAdmin; 
