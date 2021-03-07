import React, { useState } from 'react'
import './Chat.scss'

const Chat = ({ imgUser, nameUser, pesanUser, date, clickImg, clickReply, nameUserReply, isiReply, bgColorIsiChat, borderLeftColumnPesan, colorDatePesan, colorNameUserReply, clickMessageReplyUser, _idMessage }) => {

    const [reply, setReply] = useState(false)

    return (
        <>
            <div className="column-isi-chat" id={_idMessage}>
                <img src={imgUser} alt="" className="img-user-chat"
                    onClick={clickImg}
                />
                <div className="column-isi-chat-user" style={{
                    backgroundColor: `${bgColorIsiChat}`
                }}
                    onMouseOver={() => setReply(true)}
                    onMouseLeave={() => setReply(false)}
                >
                    <p className="name-chat-user">
                        {nameUser}
                    </p>
                    <div className="column-pesan-reply-user" style={{
                        borderLeft: `${borderLeftColumnPesan}`
                    }}
                        onClick={clickMessageReplyUser}
                    >
                        <p className="name-user-reply" style={{
                            color: `${colorNameUserReply}`
                        }}>
                            {nameUserReply}
                        </p>
                        <p className="isi-reply-user">
                            {isiReply}
                        </p>
                    </div>
                    <p className="pesan-user">
                        {pesanUser}
                    </p>
                    <p className="date-pesan" style={{
                        color: `${colorDatePesan}`
                    }}>
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