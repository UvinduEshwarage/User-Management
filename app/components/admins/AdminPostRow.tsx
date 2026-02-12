interface Post{
    _id:string;
    title:string;
    content:string;
    userId:{
        email:string
    }
}

export default function AdminPostRow({post}:{post:Post}){
    async function handleDelete (){
       try {
         const token = localStorage.getItem("token");
        if(!token){
          throw new Error("Unautherized");  
        }
        const res = await fetch(`/api/admin/posts/${post._id}`,
            {
                method:"Delete",
                headers:{
                    "content-type":"application/json",
                    'Authorization': `Bearer ${token}`, 
                }
            }
        );
        const data = await res.json();

        if(!res.ok){
            alert(data.message );
            return;
        }
        alert("Post Deleted Successfully!");

        window.location.reload();
       } catch (error:any) {
        alert("Something went wrong! ");
       }

    }
    return(
        <tr className="border-t border-gray-700  hover:bg-gray-600  transition">
            <td className="p-3 font-medium">{post.title}</td>
            <td className="p-3 text-gray-400">{post.content}</td>
            <td className="p-3 text-blue-600">{post.userId?.email} </td>
            <button className="p-3" onClick={handleDelete}>❌</button>
        </tr>
    )
}