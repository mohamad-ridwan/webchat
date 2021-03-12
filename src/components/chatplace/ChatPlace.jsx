import React, { useContext, useEffect, useState } from 'react'
import API from '../../services'
import { NotifikasiContext } from '../../services/context/notifikasi/notifikasi'
import { ResultSearchUserContext } from '../../services/context/resultsearchuser/ResultSearchUser'
import Chat from '../chat/Chat'
import './ChatPlace.scss'

const ChatPlace = ({ displayChat, background, imgProfile, clickImg, nameProfile, totalMemberNav, submitSend, value, changeTextChat, displayJoin, clickJoin, dataGroup, dataUser, dataPenerima, clickBarProfile, clickImgProfile, nameReply, pesanReply, dataReply, closeReply }) => {

    const [valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI, toShowMessageReply, conditionShowMessage, setConditionShowMessage] = useContext(ResultSearchUserContext)
    const [showReply, setShowReply] = useState(false)

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    const [amountNotif, setAmountNotif, getDataNotif] = useContext(NotifikasiContext)

    return (
        <>
            <div className="kolom-kanan" style={{
                display: `${displayChat}`,
                backgroundImage: `url(${background})`,
                paddingBottom: `${showReply ? '110px' : '55px'}`
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
                                    _idMessage={e._id}
                                    imgUser={`${e.imageUrl}`}
                                    // nameUser={e.name}
                                    nameUserReply={e.nameReply}
                                    isiReply={e.reply}
                                    pesanUser={e.pesan}
                                    date={e.date}
                                    colorNameUserReply={e.idUser === id ? '#6d9b2d' : '#0088cc'}
                                    borderLeftColumnPesan={e.idUser === id ? '2px solid #6d9b2d' : '2px solid #0088cc'}
                                    bgColorIsiChat={e.idUser === id ? '#f0fddd' : '#fff'}
                                    colorDatePesan={e.idUser === id ? '#6d9b2d' : '#aaa'}
                                    clickMessageReplyUser={() => {
                                        toShowMessageReply(e._idReply)
                                    }}
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

                    {amountNotif.length > 0 && amountNotif[0].idUser === id ? (
                        <div className="column-notif-chat" style={{
                            display: `${amountNotif.length > 0 ? 'flex' : 'none'}`
                        }}>
                            <p className="pesan-belum-terbaca">
                                {amountNotif.length > 0 ? `${amountNotif.length} Pesan yang belum dibaca` : ''}
                            </p>
                        </div>
                    ) : (
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