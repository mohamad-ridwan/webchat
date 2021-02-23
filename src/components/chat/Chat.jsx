import React, { useState } from 'react'
import './Chat.scss'

const Chat = ({ imgUser, nameUser, pesanUser, date, clickImg, clickReply, nameUserReply, isiReply }) => {

    const [reply, setReply] = useState(false)

    return (
        <>
            <div className="column-isi-chat">
                <img src={imgUser} alt="" className="img-user-chat"
                    onClick={clickImg}
                />
                <div className="column-isi-chat-user"
                    onMouseOver={() => setReply(true)}
                    onMouseLeave={() => setReply(false)}
                >
                    <p className="name-chat-user">
                        {nameUser}
                    </p>
                    <div className="column-pesan-reply-user">
                        <p className="name-user-reply">
                            {nameUserReply}
                        </p>
                        <p className="isi-reply-user">
                            {isiReply}
                        </p>
                    </div>
                    <p className="pesan-user">
                        {pesanUser}
                    </p>
                    <p className="date-pesan">
                        {date}
                    </p>

                    <span class="material-icons iconReply" style={{
                        display: `${reply ? 'flex' : 'none'}`
                    }}
                        onClick={clickReply}
                    >
                        reply
                    </span>
                </div>
            </div>
        </>
    )
}

export default Chat