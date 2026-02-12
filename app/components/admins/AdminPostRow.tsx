interface Post{
    _id:string;
    title:string;
    content:string;
    userId:{
        email:string
    }
}

export default function AdminPostRow({post}:{post:Post}){
    return(
        <tr className="border-t border-gray-700  hover:bg-gray-600  transition">
            <td className="p-3 font-medium">{post.title}</td>
            <td className="p-3 text-gray-400">{post.content}</td>
            <td className="p-3 text-blue-600">{post.userId?.email}</td>
        </tr>
    )
}