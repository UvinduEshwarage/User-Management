import jwt from 'jsonwebtoken';




export const getUserFromRequest = (req:Request) => {
    const authHeader = req.headers.get('authorization');
    if(!authHeader){
        throw new Error("Unautherized");
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        throw new Error("Unautherized");
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY!) as {
            userId:string;
            role:"user" | "admin";
        };
        return decoded;
    }catch(error){
        throw new Error("Invalid Token!");
    }
};