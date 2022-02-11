import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import * as usersAPI from '../../utilities/users-api';
import './Reply.css';

export default function Reply({ user, reply, deleteReply, editReply, idx, last, setReplyData, setShowForm }) {
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ content: reply.content });

    function handleChange(evt) {
        setEditData({ [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setEditMode(false);
        editReply(reply._id, editData);
    }

    async function banUser() {
        const user = await usersAPI.banUser(reply.user._id);
    }

    function quote (){
        setReplyData({content: `>**Quote from: ${reply.user.name}**\n ${reply.content.replace(/^/gm, ">")}\n\n`});
        setShowForm(true);
    }

    return (
        <>
            {editMode ?
                <div className='form-container thread-form'>
                    <form onSubmit={handleSubmit}>
                        <textarea className='thread-form-input' rows='10' name="content" onChange={handleChange} value={editData.content} />
                        <button type="submit">EDIT</button>
                        <button onClick={() => setEditMode(!editMode)} >Cancel</button>
                    </form>
                </div>
                :
                <div className={`Reply ${idx % 2 === 0 ? 'even' : 'odd'} ${idx === 0 ? 'top' : ``} ${idx === last ? 'bottom' : ''}`}>
                    <>
                        <ReactMarkdown className='reply-content' children={reply.content} remarkPlugins={[remarkGfm, remarkBreaks]} />
                        <div className='reply-box align-end'>
                            <div className="info">
                                <p> Poster: <span className={`${reply.user.isBanned ? 'banned-user' : ''} ${reply.user.isAdmin ? 'admin-user' : ''}`}>{reply.user.name}</span></p>
                                <p>{reply.createdAt.slice(0, 10)}</p>
                            </div>
                            {(user && !user.isBanned) && <div className='btn-group'>
                                {((user._id === reply.user._id || user.isAdmin) &&
                                    <>
                                        <button onClick={() => setEditMode(!editMode)} >EDIT</button>
                                        <button className='delete-btn' onClick={() => deleteReply(reply._id)} >DELETE</button>
                                    </>)}
                                <button onClick={quote}>QUOTE</button>
                                {(user.isAdmin && !reply.user.isAdmin) && <button className='delete-btn' onClick={banUser}>BAN</button>}
                            </div>}
                        </div>
                    </>
                </div>
            }
        </>
    )
}