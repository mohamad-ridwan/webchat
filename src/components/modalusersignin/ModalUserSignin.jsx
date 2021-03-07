import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../services'
import { DataRoomChatContext } from '../../services/context/dataroomchat/DataRoomChat'
import { NotifikasiContext } from '../../services/context/notifikasi/notifikasi'
import CardMember from '../cardmember/CardMember'
import './ModalUserSignin.scss'

const ModalUserSignin = ({ data, displayModal, clickClose, dataUserSignin, clickSend, showModalProfile, goUserToChat }) => {

    const [dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat, clickCardUser] = useContext(DataRoomChatContext)
    const [amountNotif, setAmountNotif, getDataNotif, dataUserForNotif, setDataUserForNotif, getDataUserForNotif] = useContext(NotifikasiContext)
    const [displayStartPesan, setDisplayStartPesan] = useState(false)
    const [displayModal2, setDisplayModal2] = useState(false)
    const [dataUser, setDataUser] = useState({})
    const [roomChatUserHome, setRoomChatUserHome] = useState([])
    const [valueMessage, setValueMessage] = useState('')
    const [search, setSearch] = useState('')

    const idUserSignin = JSON.parse(localStorage.getItem('userId'))
    const idUser = idUserSignin && idUserSignin._id

    const { name, googleId, imageUrl, email } = { ...dataUserSignin }

    const getHours = new Date().getHours()
    const getMinutes = new Date().getMinutes()
    const idRoom = new Date().getTime()

    const dataPostRoom = {
        idRoom: idRoom,
        idUser1: idUser,
        idUser2: dataUser && dataUser._id,
        nameUser1: name,
        nameUser2: dataUser && dataUser.name,
        imageUrlUser1: imageUrl,
        imageUrlUser2: dataUser && dataUser.imageUrl,
        currentMessage: `${name}: ${valueMessage}`,
        timeSend: `${getHours}:${getMinutes}`
    }

    const dataSendMessage = {
        name: name,
        googleId: googleId,
        imageUrl: imageUrl,
        email: email,
        idRoom: idRoom,
        date: `${getHours}:${getMinutes}`,
        pesan: valueMessage,
        idUser: idUser,
        _idReply: ' ',
        idUserReply: ' ',
        reply: ' ',
        nameReply: ' '
    }

    const dataNotif = {
        idRoom: idRoom,
        idUser: dataUser && dataUser._id,
        name: dataUser && dataUser.name,
        email: dataUser && dataUser.email
    }

    async function postRoomMessageAndSendMessage() {
        if (valueMessage.length > 0) {
            // For create room
            API.APIPostChattingUser(dataPostRoom)
                .then(res => {
                    setDataRoomChat(res)
                })
            // For chatting end to end
            API.APIPostEndtoend(dataSendMessage)
                .then(res => {
                    setValueMessage('')
                    setDataProfileUserChat(res)
                    setTimeout(() => {
                        setAllAPI().then((index) => {
                            clickCardUser(index = index - 1, index)
                        })
                    }, 100);
                    setTimeout(() => {
                        setDisplayStartPesan(false)
                    }, 1000);
                    API.APIPostNotifikasi(dataNotif)
                        .then(res => {
                            getDataUserForNotif(dataUser && dataUser._id)

                            return res;
                        })
                })
        }
    }

    const filterRoomChat = roomChatUserHome.filter((e) => e.idUser1 === idUser || e.idUser2 === idUser)

    function filterIdRoomChatUser(id, data) {
        const filterRepeatId = filterRoomChat.filter((e) => e.idUser1 === id || e.idUser2 === id)

        if (filterRepeatId.length === 0) {
            setDisplayStartPesan(true)
            setDataUser(data)
            // setDataUser(dataUser => dataUser, dataUser)
        } else {
            goUserToChat(filterRepeatId[0].idRoom, filterRepeatId[0], idUser);
            clickClose()
        }
    }

    const filterSearchDataUser = data && data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))

    function setAllAPI() {
        return new Promise((resolve, reject) => {
            API.APIGetChattingUser()
                .then(res => {
                    const respons = res.data
                    const filterId = respons.filter((e) => e.idUser1 === idUser || e.idUser2 === idUser)
                    setRoomChatUserHome(respons)
                    resolve(filterId.length)
                })
        })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <div className="wrapp-modal-user-signin" style={{
                display: `${displayModal}`
            }}>
                <div className="box-white-modal-user-signin">
                    <div className="column-atas-modal-user-signin">
                        <p className="total-joined-signin">
                            You and {data.length} User Joined WebChatt
                        </p>
                        <p className="txt-pilih">
                            Pilih Seseorang dan Mulai chat baru
                        </p>

                        <div className="column-search-userSignin">
                            <span class="material-icons icon-search-userSignin">
                                search
                            </span>
                            <input type="text" className="search-userSignin"
                                placeholder={'Cari seseorang...'} autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="column-place-card-user-joined">
                        <div className="column-scroll-card-user">
                            {filterSearchDataUser && filterSearchDataUser.length > 0 ?
                                filterSearchDataUser.map((e, i) => {
                                    return (
                                        <CardMember
                                            key={i}
                                            img={`${e.imageUrl}`}
                                            nameMember={e.name}
                                            dateJoin={e.infoOnline}
                                            clickUser={() => {
                                                filterIdRoomChatUser(e._id, e)
                                            }}
                                        />
                                    )
                                }) : (
                                    <p className={'not-found-search'}>Pencarian tidak di temukan!</p>
                                )}
                        </div>
                    </div>

                    <div className="column-btn-modal-user-signin">
                        <button className="btn-close-modal-user-signin" onClick={() => {
                            clickClose();
                            setSearch('')
                        }}>
                            CLOSE
                        </button>
                    </div>
                </div>

                <div className="wrapp-start-pesan" style={{
                    display: `${displayStartPesan ? 'flex' : 'none'}`
                }}>
                    {dataUser && Object.keys(dataUser).length > 0 ? (
                        <>
                            <div className="nav-start-pesan">
                                <span class="material-icons iconBack" onClick={() => setDisplayStartPesan(false)}>
                                    keyboard_backspace
                                </span>
                                <img src={`${dataUser.imageUrl}`} alt="" className="img-profile-start-pesan"
                                    onClick={() => {
                                        showModalProfile(dataUser._id)
                                    }}
                                />
                                <p className="name-profile-start-pesan">
                                    {dataUser.name}
                                </p>
                            </div>

                            <div className="body-start-pesan">
                                <form className="form-input-start-pesan" onSubmit={(e) => {
                                    e.preventDefault();
                                    postRoomMessageAndSendMessage();
                                    clickSend();
                                }}>
                                    <input type="text" className="input-start-pesan" autoFocus placeholder={'Send first message...'}
                                        value={valueMessage}
                                        onChange={(e) => setValueMessage(e.target.value)}
                                    />
                                    <span class="material-icons iconSend" onClick={() => {
                                        postRoomMessageAndSendMessage();
                                        clickSend();
                                    }}>
                                        send
                            </span>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    )
}

export default (ModalUserSignin)