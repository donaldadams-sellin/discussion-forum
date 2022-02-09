import './Reply.css';

export default function Reply({user, reply, deleteReply}){
    return(
        <div className="Reply">
            <p>{reply.content}</p>
            <p>{reply.user.name}</p>
            {user &&((user._id === reply.user._id || user.isAdmin) &&<button onClick={()=>deleteReply(reply._id)} >DELETE</button>)}
        </div>
    )
}