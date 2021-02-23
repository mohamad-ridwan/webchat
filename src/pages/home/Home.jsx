import React, { useContext, useEffect, useState } from 'react'
import './Home.scss'
import profile from '../../images/profilgroup.jpg'
import background from '../../images/gambar.jpg'
import Chat from '../../components/chat/Chat'
import CardMember from '../../components/cardmember/CardMember'
import ModalInfoGroup from '../../components/modalinfogroup/ModalInfoGroup'
import API from '../../services'
import { useHistory } from 'react-router-dom'
import CardUser from '../../components/carduser/CardUser'
import ChatPlace from '../../components/chatplace/ChatPlace'
import ModalMenu from '../../components/modalmenu/ModalMenu'
import ModalUserSignin from '../../components/modalusersignin/ModalUserSignin'
import { connect } from 'react-redux'
import { DataRoomChatContext } from '../../services/context/dataroomchat/DataRoomChat'
import { DataUserSiginContext } from '../../services/context/datausersignin/DataUserSignin'
import ResultSearch from '../../components/resultsearch/ResultSearch'
import { ResultSearchUserContext } from '../../services/context/resultsearchuser/ResultSearchUser'

const Home = () => {

    const [dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat] = useContext(DataRoomChatContext)
    const [userSigninGlobal, setUserSigninGlobal] = useContext(DataUserSiginContext)
    const [valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch] = useContext(ResultSearchUserContext)
    const [showInfoProfileUser, setShowInfoProfileUser] = useState(false)
    const [userSignin, setUserSignin] = useState({})
    const [displayChat, setDisplayChat] = useState(false)
    const [tampilanHome, setTampilanHome] = useState(true)
    const [dataGroup, setDataGroup] = useState([])
    const [chatting, setChatting] = useState([])
    const [displayJoin, setDisplayJoin] = useState(true)
    const [valueChat, setValueChat] = useState('')
    const [getLatestChat, setGetLatestChat] = useState({})
    const [getAllUserSignin, setGetAllUserSignin] = useState([])
    const [getUserToChatt, setGetUserToChatt] = useState({})
    const [displayChatToUser, setDisplayChatToUser] = useState(false)
    const [showUserInfoChatting, setShowUserInfoChatting] = useState(false)
    const [roomChatUserHome, setRoomChatUserHome] = useState([])
    const [displayWrappModalMenu, setDisplayWrappModalMenu] = useState(false)
    const [displayNavmenu, setDisplayNavmenu] = useState(true)
    const [displayAddGroup, setDisplayAddGroup] = useState(false)
    const [showAddMembersGroup, setShowAddMembersGroup] = useState(false)
    const [dataMembersGroup, setDataMembersGroup] = useState({})
    const [idGroupChatt, setIdGroupChatt] = useState('')
    const [idRoomEndtoend, setIdRoomEndtoend] = useState('')
    const [displayModalUserSignin, setDisplayModalUserSignin] = useState(false)
    const [dataRoomEndtoend, setDataRoomEndtoend] = useState({})
    const [infoUserSignin, setInfoUserSignin] = useState([])
    const [infoUserSignin2, setInfoUserSignin2] = useState([])
    const [dataInfoUserChat, setDataInfoUserChat] = useState({})
    const [idUserInRoomChat, setIdUserInRoomChat] = useState('')
    const [isSubmitSendMessage, setIsSubmitSendMessage] = useState(false)
    const [colorSearchHome, setColorSearchHome] = useState(false)
    const [valueReply, setValueReply] = useState({
        reply: '',
        nameReply: ''
    })

    const history = useHistory()

    const userId = JSON.parse(localStorage.getItem('userId'))
    const idChatt = JSON.parse(localStorage.getItem('idChatt'))

    function updateInfoOnlineUser(id, status) {
        const dataUpdate = {
            infoOnline: `${status}`
        }
        API.APIPutJoinGroup(id, dataUpdate)
    }

    function updateInfoOnlineUserSignin(id, status) {
        const dataPut = {
            infoOnline: `${status}`
        }
        API.APIPutSignin(id, dataPut)
    }

    const setAllAPI = () => {
        // Data user sign-in for check infoOnline/offline
        let dataUser = {}
        // END Data user sign-in for check infoOnline/offline
        API.APIGetSigninById(userId && userId._id)
            .then(res => {
                if (!res.data) {
                    history.push('/sign-in')
                }
                setUserSignin(res.data)
                dataUser = res.data
            }, (err) => {
                history.push('/sign-in')
                console.log(err)
                return err;
            })
        API.APIGetJoinGroup()
            .then(res => {
                const respon = res.data
                // console.log(respon)
                const userId = dataUser && dataUser._id
                for (let i = 0; i < respon.length; i++) {
                    const check = respon[i].members.filter((e) => e._id == userId)
                    if (check.length > 0) {
                        setDataGroup(respon)
                    }
                    // console.log(check)
                }
                // if (respon.length > 0) {
                //     const checkUser = respon.filter(e => e.imageUrl == userSignin.imageUrl)
                //     if (checkUser.length === 1) {
                //         setDisplayJoin(false)
                //     }
                // }
                // // CHECK USER ONLINE & OFFLINE
                // const checkUserOnline = respon.filter(e => e.imageUrl === dataUser.imageUrl)
                // const checkUserOffline = respon.filter(e => e.imageUrl !== dataUser.imageUrl)
                // if (checkUserOnline.length === 1) {
                //     updateInfoOnlineUser(checkUserOnline[0]._id, 'Online')
                // }
                // if (checkUserOffline.length > 0) {
                //     // LOOPING UPDATE USER THAT OFFLINE
                //     for (let i = 0; i < checkUserOffline.length; i++) {
                //         updateInfoOnlineUser(checkUserOffline[i]._id, ' ')
                //     }
                // }
            }, (err) => {
                console.log(err)
                return err;
            })
        API.APIGetChatting()
            .then(res => {
                const respons = res.data
                setChatting(respons)
            })
        API.APIGetChattingById(idChatt && idChatt._id)
            .then(res => {
                const respons = res.data
                setGetLatestChat(respons)
            })
        API.APIGetSignin()
            .then(res => {
                const respons = res.data
                setGetAllUserSignin(respons)
                const id = dataUser && dataUser._id
                const checkUserOnline = respons.filter(e => e._id === id)
                const checkUserOffline = respons.filter(e => e._id !== id)
                if (checkUserOnline.length === 1) {
                    updateInfoOnlineUserSignin(checkUserOnline[0]._id, 'Online')
                }
                if (checkUserOffline.length > 0) {
                    for (let i = 0; i < checkUserOffline.length; i++) {
                        updateInfoOnlineUserSignin(checkUserOffline[i]._id, ' ')
                    }
                }
                const userIdSignin = userId && userId._id
                const filterUserSignin = respons.filter((e) => e._id !== userIdSignin)
                if(infoUserSignin.length === 0){
                    for (let i = 0; i < 2; i++) {
                        const check = filterUserSignin[i]
                        if(check !== undefined){
                            infoUserSignin.push(check)
                            setInfoUserSignin(infoUserSignin)
                            setInfoUserSignin(info => [...info], infoUserSignin)
                        }
                    }
                    for(let i = 0; i < filterUserSignin.length; i++){
                        const check = filterUserSignin[i]
                        if(check !== undefined){
                            infoUserSignin2.push(check)
                            setInfoUserSignin2(infoUserSignin2)
                            setInfoUserSignin2(info => [...info], infoUserSignin2)
                        }
                    }
                }  
            })
        API.APIGetChattingUser()
            .then(res => {
                const respons = res.data
                setRoomChatUserHome(respons)
            })
    }

    const postJoinGroup = () => {
        // const dataPost = {
        //     name: userSignin.name,
        //     imageUrl: userSignin.imageUrl,
        //     infoOnline: ' '
        // }
        // const checkMember = dataMemberJoin.filter(e => e.imageUrl == userSignin.imageUrl)
        // if (dataMemberJoin.length === 0) {
        //     API.APIPostJoinGroup(dataPost)
        //         .then(res => {
        //             setDisplayJoin(false)
        //         }, (err) => {
        //             console.log(err)
        //             return err;
        //         })
        // } else if (checkMember.length === 0) {
        //     API.APIPostJoinGroup(dataPost)
        //         .then(res => {
        //             setDisplayJoin(false)
        //         }, (err) => {
        //             console.log(err)
        //             return err;
        //         })
        // }
    }

    const handleUserChatt = (e) => {
        const values = e.target.value
        setValueChat(values)
    }

    const sendChatGroup = (e) => {
        e.preventDefault()
        const hour = new Date().getHours()
        const minutes = new Date().getMinutes()
        const postChatt = {
            idGroup: idGroupChatt,
            name: userSignin.name,
            googleId: userSignin.googleId,
            imageUrl: userSignin.imageUrl,
            pesan: valueChat,
            date: `${hour}:${minutes}`
        }
        API.APIPostChatting(postChatt)
            .then(res => {
                const respons = res.data
                localStorage.setItem('idChatt', JSON.stringify({ _id: respons._id }))
                setAllAPI();
                setValueChat('')
                API.APIGetChattingById(idChatt && idChatt._id)
                    .then(res => {
                        setGetLatestChat(respons)
                    })
            })
    }

    const clickUserForChatt = (e) => {
        API.APIGetEndtoend()
            .then(res => {
                const respons = res.data
                const filterIdRoom = respons.filter(i => i.idRoom === e)
                setGetUserToChatt(filterIdRoom)
            })
        setDisplayChatToUser(true)
        setDisplayChat(false)
        setTampilanHome(false)
    }

    const clickBarChatUserToShowInfo = (e) => {
        API.APIGetSigninById(idUserInRoomChat || e)
            .then(res => {
                const respons = res.data
                setDataInfoUserChat(respons)
            })
        setShowUserInfoChatting(true)
    }

    const sendChatEndtoend = (e) => {
        // e.preventDefault()
        const {_id, name, googleId, imageUrl, email } = { ...userSignin }
        const hour = new Date().getHours()
        const minutes = new Date().getMinutes()
        const dataPost = {
            googleId: googleId,
            name: name,
            pesan: valueChat,
            imageUrl: imageUrl,
            date: `${hour}:${minutes}`,
            email: email,
            idRoom: idRoomEndtoend,
            idUser: _id,
            reply: valueReply.reply.length === 0 ? ' ' : valueReply.reply,
            nameReply : valueReply.reply.length === 0 ? ' ' : valueReply.nameReply
        }
        API.APIPostEndtoend(dataPost)
            .then(res => {
                clickUserForChatt(idRoomEndtoend);
                return res;
            })
        setValueChat('')
        setAllAPI();
    }

    function getByIdJoinGroup(_id) {
        API.APIGetByIdJoinGroup(_id)
            .then(res => {
                setDataMembersGroup(res.data)
            })
    }

    const handleLogout = () => {
        const confirm = window.confirm('yakin ingin keluar?')
        if (confirm) {
            localStorage.removeItem('userId')
            history.push('/sign-in')
        }
    }

    const filterUserSignin = getAllUserSignin.filter(e => e._id !== userId._id)
    const filterSearchMember = filterUserSignin.filter(e => e.name.toLowerCase().includes(valueChat.toLowerCase()))
    const filterIdGroupChatt = chatting.filter(e => e.idGroup === idGroupChatt)
    const filterRoomChattingUser = roomChatUserHome.filter(e => e.idUser1 === userSignin._id || e.idUser2 === userSignin._id)
    // console.log(filterRoomChattingUser)
    // const filterPenerimaChat = chatEndToEndUser.filter(e => e.idPengirim === userSignin._id && e.idPenerima !== )
    // console.log(filterPenerimaChat)
    // console.log(filterChatEndToEndUser)
    // console.log(filterChatEndToEndUser)
    // console.log(idUserChatting)

    // console.log(filterUserSignin)

    const { nameUser1, nameUser2, imageUrlUser1, imageUrlUser2 } = dataRoomEndtoend && { ...dataRoomEndtoend }

    setTimeout(() => {
        if(Object.keys(dataRoomChat).length > 0 && isSubmitSendMessage === true){
            const {idUser1, idUser2} = {...dataRoomChat.data}
            setDisplayModalUserSignin(false)
             clickUserForChatt(dataRoomChat.data.idRoom)
             setDataRoomEndtoend(dataRoomChat.data)
             setIdRoomEndtoend(dataRoomChat.data.idRoom)
             setIdUserInRoomChat(idUser1 === userSignin._id ? idUser2 : idUser1)
             setIsSubmitSendMessage(false)
         }
    }, 100);
    
    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <div className="wrapp-home">
                <ResultSearch/>
                <div className="kolom-kiri">
                    <div className="nav-profile">
                        <span class="material-icons btn-menu-nav" onClick={() => setDisplayWrappModalMenu(true)}>
                            menu
                        </span>
                        <form action="" className="form-input-search">
                            <input type="text" className="input-search" placeholder={'Search...'}
                            onChange={(e)=>setValueSearchHome(e.target.value)
                            }
                            onMouseEnter={()=>setColorSearchHome(true)}
                            onMouseLeave={()=>setColorSearchHome(false)}
                            style={{
                                backgroundColor: colorSearchHome ? 'transparent' : '#eee',
                                border : colorSearchHome ? '2px solid #37afe2' : 'none'
                            }}
                            />
                        </form>
                    </div>

                    <div className="wrapp-place-user-signin" onClick={() => setDisplayModalUserSignin(true)}>
                        {infoUserSignin && infoUserSignin.length > 0 ?
                            infoUserSignin.map((e) => {
                                return (
                                    <>
                                        <img src={`${e.imageUrl}`} alt="" className="img-place-user-signin" />
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}

                        <div className="column-kanan-place-user-signin">
                        <div className="box-name-place">
                            {infoUserSignin && infoUserSignin.length > 0 ?
                                infoUserSignin.map((e) => {
                                    return (
                                        <p className="name-place-user-signin">
                                            "{e.name}",
                                        </p>
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>

                        <div className="box-txt-lainnya">
                            <p className={'lainnya'}>
                                {infoUserSignin2.length > 2 ? `dan ${infoUserSignin2.length - 2} lainnya telah bergabung di WebChat!!` : 'Telah bergabung di WebChat!!'}
                            </p>
                            <p className="lihat-dan-cari">
                                Lihat dan mulai untuk chat baru
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* Group Chat */}
                    {dataGroup && dataGroup.length > 0 ?
                        dataGroup.map((e, i) => {
                            return (
                                <CardUser
                                    key={e._id}
                                    img={profile}
                                    nameCard={e.nameGroup}
                                    clickCard={() => {
                                        setDisplayChat(true)
                                        setDisplayChatToUser(false)
                                        setTampilanHome(false)
                                        setDisplayJoin(false)
                                        getByIdJoinGroup(e._id)
                                        setIdGroupChatt(e._id)
                                    }}
                                    displayIcon={'flex'}
                                />
                            )
                        }) : (
                            <div></div>
                        )}

                    {/* END Group Chat */}
                    {filterRoomChattingUser && filterRoomChattingUser.length > 0 ?
                        filterRoomChattingUser.map((e, i) => {
                            return (
                                <CardUser
                                    key={i}
                                    img={`${e.imageUrlUser1 === userSignin.imageUrl ? e.imageUrlUser2 : e.imageUrlUser1}`}
                                    nameCard={e.nameUser1 === userSignin.name ? e.nameUser2 : e.nameUser1}
                                    clickCard={() => {
                                        clickUserForChatt(e.idRoom)
                                        setIdRoomEndtoend(e.idRoom)
                                        setDataRoomEndtoend(e)
                                        setIdUserInRoomChat(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                                    }}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                </div>

                {/* Tampilan awal */}
                <div className="tampilan-home" style={{
                    display: `${tampilanHome ? 'flex' : 'none'}`
                }}>
                    <p className="wellcome-home">
                        Welcome Developers!
                    </p>
                </div>
                {/* end Tampilan awal */}

                {/* Chat place for group */}
                {dataMembersGroup && Object.keys(dataMembersGroup).length > 0 ? (
                    <ChatPlace
                        displayChat={displayChat ? 'flex' : 'none'}
                        background={background}
                        imgProfile={profile}
                        nameProfile={dataMembersGroup.nameGroup}
                        totalMemberNav={`${dataMembersGroup.members.length === 0 ? 'Tidak ada member' : dataMembersGroup.members.length} members`}
                        submitSend={sendChatGroup}
                        value={valueChat}
                        changeTextChat={handleUserChatt}
                        displayJoin={displayJoin ? 'flex' : 'none'}
                        clickJoin={() => {
                            postJoinGroup()
                            setAllAPI();
                        }}
                        dataGroup={filterIdGroupChatt}
                    />
                ) : (
                        <div></div>
                    )}

                {/* END Chat place for group */}

                {/* Chatting End to End User */}
                <ChatPlace
                    displayChat={displayChatToUser ? 'flex' : 'none'}
                    background={background}
                    // imgProfile={`${imageUrlUser1 === userSignin.imageUrl ? imageUrlUser2 : imageUrlUser1}`}
                    nameProfile={nameUser1 === userSignin.name ? nameUser2 : nameUser1}
                    displayJoin={'none'}
                    submitSend={()=>{
                        sendChatEndtoend();
                        setValueReply({
                            reply: ' ',
                            nameReply: ' '
                        })
                    }}
                    changeTextChat={handleUserChatt}
                    value={valueChat}
                    nameReply={valueReply.nameReply}
                    pesanReply={valueReply.reply}
                    dataPenerima={[]}
                    dataUser={getUserToChatt}
                    clickBarProfile={clickBarChatUserToShowInfo}
                    clickImgProfile={(id)=>{
                        const idSignin = userId && userId._id
                        if(id !== idSignin){
                            clickBarChatUserToShowInfo(id)
                        } else{
                            setShowInfoProfileUser(true)
                        }
                    }}
                    dataReply={(e)=>{
                        setValueReply({
                            reply: e.pesan,
                            nameReply: e.name
                        })
                    }}
                    closeReply={()=>{
                        setValueReply({
                            reply: ' ',
                            nameReply: ' '
                        })
                    }}
                />
                {/* END Chatting End to End User */}

                {/* For info User profile */}
                <ModalInfoGroup
                    displayModal={showInfoProfileUser ? 'flex' : 'none'}
                    clickClose={() => setShowInfoProfileUser(false)}
                    data={[]}
                    nonMember={'Tidak ada member'}
                    titleInfo={'Info Profile'}
                    dataInfoUserProfile={userSignin}
                    saveUpdateName={()=>{
                        setTimeout(()=>{
                            setAllAPI()
                        }, 500)
                    }}
                />
                {/* END For info user profile */}

                {/* For user info chatting */}
                <ModalInfoGroup
                    displayModal={showUserInfoChatting ? 'flex' : 'none'}
                    clickClose={() => setShowUserInfoChatting(false)}
                    data={[]}
                    titleInfo={'User Info'}
                    displayInfoStatus={'none'}
                    displayStatusUserChat={'flex'}
                    bioInfo={dataInfoUserChat && dataInfoUserChat.bio}
                    nameInfo={dataInfoUserChat && dataInfoUserChat.name}
                    imgInfo={`${dataInfoUserChat && dataInfoUserChat.imageUrl}`}
                    infoOnline={dataInfoUserChat && dataInfoUserChat.infoOnline}
                    emailInfo={dataInfoUserChat && dataInfoUserChat.email}
                />
                {/* END for user info chatting */}

                <ModalUserSignin
                    data={filterUserSignin}
                    displayModal={displayModalUserSignin ? 'flex' : 'none'}
                    clickClose={() => setDisplayModalUserSignin(false)}
                    dataUserSignin={userSignin}
                    showModalProfile={(e)=>{
                        clickBarChatUserToShowInfo(e)
                    }}
                    clickSend={() => {
                        // setDisplayModalUserSignin(false)
                        setAllAPI();
                        setIsSubmitSendMessage(true)
                    }}
                />

                {/* Modal menu */}
                <ModalMenu
                    displayWrapp={displayWrappModalMenu ? 'flex' : 'none'}
                    clickClose={() => setDisplayWrappModalMenu(false)}
                    imgProfile={`${userSignin && userSignin.imageUrl}`}
                    txtName={userSignin && userSignin.name}
                    txtEmail={userSignin && userSignin.email}
                    background={background}
                    displayNavMenu={displayNavmenu ? 'flex' : 'none'}
                    displayAddGroup={displayAddGroup ? 'flex' : 'none'}
                    displayAddMembers={showAddMembersGroup ? 'flex' : 'none'}
                    dataMember={filterSearchMember}
                    valueSearch={valueChat}
                    changeSearch={handleUserChatt}
                    clickProfile={()=>{
                        setDisplayWrappModalMenu(false)
                        setShowInfoProfileUser(true)
                    }}
                    // totalUserSignin={filterUserSignin.length}
                    closeModalAfterCreate={() => {
                        setDisplayWrappModalMenu(false)
                        setDisplayAddGroup(false)
                        setShowAddMembersGroup(false)
                        setDisplayNavmenu(true)
                        setAllAPI();
                    }}
                    clickNext={() => {
                        setDisplayAddGroup(false)
                        setShowAddMembersGroup(true)
                    }}
                    cancelAddMembers={() => {
                        setDisplayAddGroup(true)
                        setShowAddMembersGroup(false)
                    }}
                    clickLogOut={handleLogout}
                    clickAddGroup={() => {
                        setDisplayNavmenu(false)
                        setDisplayAddGroup(true)
                    }}
                    clickCancel={() => {
                        setDisplayAddGroup(false)
                        setDisplayNavmenu(true)
                        setDisplayWrappModalMenu(false)
                    }}
                />
                {/* END Modal menu */}
            </div>
        </>
    )
}

const state = (state)=>({
    dataRoomUserChat : state.dataRoomUserChat
})

export default connect(state)(Home)