import React from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core"
import db from './firebase.js'
import { Link } from 'react-router-dom'

function SidebarChat({id, name, addNewChat}) {

    const CreateChat = () => {
        const roomName= prompt("Please Enter a Name")
        if(roomName)
        {
            db.collection('rooms').add({name: roomName})
        }
    }
    return !addNewChat ? ( 
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>This is the last message in the room.</p>
                
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={CreateChat} className="sidebarChat">
            <h3>
                Add New Chat
            </h3>
        </div>
    )
}

export default SidebarChat
