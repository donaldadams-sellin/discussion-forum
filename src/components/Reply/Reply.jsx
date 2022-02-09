import { useState } from 'react';
import './Reply.css';

export default function Reply({ user, reply, deleteReply, editReply }) {
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ content: reply.content });

    function handleChange(evt) {
        setEditData({ [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        setEditMode(false);
        editReply(reply._id, editData);
    }

    return (
        <div className='Reply'>
            {editMode ?
                <form onSubmit={handleSubmit}>
                    <textarea name="content" onChange={handleChange} value={editData.content} />
                    <button type="submit">EDIT</button>
                    <button onClick={()=>setEditMode(!editMode)} >Cancel</button>
                </form>
                :
                <>
                    <p style={{whiteSpace: 'pre-wrap'}}>{reply.content}</p>
                    <p>{reply.user.name}</p>
                    {user && ((user._id === reply.user._id || user.isAdmin) && 
                    <>
                    <button onClick={() => deleteReply(reply._id)} >DELETE</button>
                    <button onClick={()=>setEditMode(!editMode)} >Edit</button>
                    </>)}    
                </>
            }
        </div>
    )
}