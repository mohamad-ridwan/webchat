import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../services'
import { DataRoomChatContext } from '../../services/context/dataroomchat/DataRoomChat'
import CardMember from '../cardmember/CardMember'
import './ModalUserSignin.scss'

const ModalUserSignin = ({ data, displayModal, clickClose, dataUserSignin, clickSend, showModalProfile }) => {

    const [dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat] = useContext(DataRoomChatContext)
    const [displayStartPesan, setDisplayStartPesan] = useState(false)
    const [displayModal2, setDisplayModal2] = useState(false)
    const [dataUser, setDataUser] = useState({})
    const [valueMessage, setValueMessage] = useState('')
    const [search, setSearch] = useState('')

    const idUserSignin = JSON.parse(localStorage.getItem('userId'))
    const { name, googleId, imageUrl, email } = { ...dataUserSignin }
    const idRoom = new Date().getTime()
    const dataPostRoom = {
        idRoom: idRoom,
        idUser1: idUserSignin && idUserSignin._id,
        idUser2: dataUser._id,
        nameUser1: name,
        nameUser2: dataUser.name,
        imageUrlUser1: imageUrl,
        imageUrlUser2: dataUser.imageUrl
    }
    const getHours = new Date().getHours()
    const getMinutes = new Date().getMinutes()
    const dataSendMessage = {
        name: name,
        googleId: googleId,
        imageUrl: imageUrl,
        email: email,
        idRoom: idRoom,
        date: `${getHours}:${getMinutes}`,
        pesan: valueMessage,
        idUser: idUserSignin && idUserSignin._id,
        reply: ' ',
        nameReply: ' '
    }

    function postRoomMessageAndSendMessage() {
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
                        setDisplayStartPesan(false)
                    }, 1000);
                })
        }
    }

    const filterSearchDataUser = data && data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <div className="wrapp-modal-user-signin" style={{
                display: `${displayModal}`
            }}>
                <div className="box-white-modal-user-signin">
                    <div className="column-atas-modal-user-signin">
                        <p className="total-joined-signin">
                            {data.length} User Joined WebChatt
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
                                                setDisplayStartPesan(true)
                                                setDataUser(e)
                                            }}
                                        />
                                    )
                                }) : (
                                    <p className={'not-found-search'}>Pencarian tidak di temukan!</p>
                                )}
                        </div>
                    </div>

                    <div className="column-btn-modal-user-signin">
                        <button className="btn-close-modal-user-signin" onClick={clickClose}>
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