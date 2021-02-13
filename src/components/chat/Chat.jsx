import React from 'react'
import './Chat.scss'

const Chat = ({ imgUser, nameUser, pesanUser }) => {
    return (
        <>
            <div className="column-isi-chat">
                <img src={imgUser} alt="" className="img-user-chat" />
                <div className="column-isi-chat-user">
                    <p className="name-chat-user">
                        {nameUser}
                    </p>
                    <p className="pesan-user">
                        {pesanUser}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Chat