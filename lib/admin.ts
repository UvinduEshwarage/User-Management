export const requireAdmin =(user: {role:string}) => {
    if(user.role !== "admin"){
        throw new Error ("Forbidden!");
    }
}