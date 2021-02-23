import React, { useState } from 'react'
import Chat from '../chat/Chat'
import './ChatPlace.scss'

const ChatPlace = ({ displayChat, background, imgProfile, clickImg, nameProfile, totalMemberNav, submitSend, value, changeTextChat, displayJoin, clickJoin, dataGroup, dataUser, dataPenerima, clickBarProfile, clickImgProfile, nameReply, pesanReply, dataReply, closeReply }) => {

    const [showReply, setShowReply] = useState(false)

    return (
        <>
            <div className="kolom-kanan" style={{
                display: `${displayChat}`,
                backgroundImage: `url(${background})`,
                paddingBottom: `${showReply ? '105px' : '60px'}`
            }}>

                <div className="nav-profil-group-chat" onClick={clickBarProfile}>
                    <div className="column-name-profil-group-chat">
                        <p className="name-profil-group-chat">
                            {nameProfile}
                        </p>
                        <p className="total-members">
                            {totalMemberNav}
                        </p>
                    </div>
                    <span class="material-icons icon-search-message-user">
                        search
                    </span>
                </div>

                <form className="form-input-chat" onSubmit={(e) => {
                    e.preventDefault()
                    submitSend();
                    setShowReply(false)
                }}>
                    <input type="text" className="input-user-chat" placeholder={'Ketik pesan...'} autoFocus
                        value={value}
                        onChange={changeTextChat}
                    />
                </form>

                <div className="column-reply-chat"
                    style={{
                        display: `${showReply ? 'flex' : 'none'}`
                    }}
                >
                    <span class="material-icons iconReplyChat">
                        reply
                    </span>

                    <div className="column-name-reply-chat">
                        <p className="name-reply">
                            {nameReply}
                        </p>
                        <p className="pesan-reply">
                            {pesanReply}
                        </p>
                        <button className="btn-close-reply"
                            onClick={() => {
                                setShowReply(false)
                                closeReply();
                            }}
                        >
                            x
                        </button>
                    </div>
                </div>

                <p className="display-join-group"
                    style={{
                        display: `${displayJoin}`
                    }}
                    onClick={clickJoin}>
                    JOIN
                    </p>

                <div className="wrapp-chat">
                    {/* For chat group */}
                    {dataGroup && dataGroup.length > 0 ?
                        dataGroup.map((e, i) => {
                            return (
                                <Chat
                                    key={i}
                                    imgUser={`${e.imageUrl}`}
                                    nameUser={e.name}
                                    pesanUser={e.pesan}
                                    date={e.date}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                    {/* END For chat group */}

                    {/* For Chatt end to end user */}
                    {dataUser && dataUser.length > 0 ?
                        dataUser.map((e, i) => {
                            return (
                                <Chat
                                    key={i}
                                    imgUser={`${e.imageUrl}`}
                                    // nameUser={e.name}
                                    nameUserReply={e.nameReply}
                                    isiReply={e.reply}
                                    pesanUser={e.pesan}
                                    date={e.date}
                                    clickImg={() => {
                                        clickImgProfile(e.idUser)
                                    }}
                                    clickReply={() => {
                                        setShowReply(true)
                                        dataReply(e);
                                    }}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                    {/* END For chat end to end user */}

                    {/* For Chatt end to end user */}
                    {dataPenerima && dataPenerima.length > 0 ?
                        dataPenerima.map((e, i) => {
                            return (
                                <Chat
                                    key={i}
                                    imgUser={`${e.imageUrl}`}
                                    // nameUser={e.name}
                                    pesanUser={e.pesan}
                                    date={e.date}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                    {/* END For chat end to end user */}
                </div>

            </div>
        </>
    )
}

export default ChatPlace