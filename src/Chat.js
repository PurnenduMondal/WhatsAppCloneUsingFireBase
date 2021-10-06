import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Chat.css"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [{user}, dispatch] = useStateValue()
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const { roomId } = useParams();
    const [messages, setMessages] = useState([])

    const sendMessage = async e => { 
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: new Date(new Date().toUTCString() +(3600000*+5.5)).toLocaleString(),
            received: false
        })
        // await axios.post('/messages/new', {
        //     name: "Purnendu",
        //     message: input,
        //     timestamp: new Date(new Date().toUTCString() +(3600000*+5.5)).toLocaleString(),
        //     received: false
        // })

        setInput('')
    }
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc =>(
                    doc.data()
                )))
            })
        }
    }, [roomId])

    return (
        <div className = "chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                      <h3>{ roomName }</h3>
                      <p>Last seen {messages[messages.length - 1]?.timestamp}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                  </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map( message => (
                <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message?.timestamp).toDateString()+"   "+new Date(message?.timestamp).toLocaleTimeString()}
                    </span>
                </p>
            ))}

            </div>
            <div className="chat__footer">
                <IconButton>
                <InsertEmoticonIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <form>
                    <input 
                    type="text"
                    placeholder="Type a message"
                    value = {input}
                    onChange={e => setInput(e.target.value)}
                    />
                    <button 
                    type="submit"
                    onClick = {sendMessage}
                    >
                        <SendIcon/>
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}
export default Chat;
