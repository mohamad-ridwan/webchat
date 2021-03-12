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
import Status from '../../components/status/Status'
import { StatusContext } from '../../services/context/status/status'
import { NotifikasiContext } from '../../services/context/notifikasi/notifikasi'
import avatar from '../../images/avatar.jpg'

const Home = () => {

    const [dataStatus, setDataStatus, dataRoom, setDataRoom, statusUserSignin, setStatusUserSignin, allDataStatus, setAllDataStatus, updatingStatus] = useContext(StatusContext)
    const [dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat, clickCardUser] = useContext(DataRoomChatContext)
    const [userSigninGlobal, setUserSigninGlobal] = useContext(DataUserSiginContext)
    const [valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI, toShowMessageReply, conditionShowMessage, setConditionShowMessage, changeBgResultSearch] = useContext(ResultSearchUserContext)
    const [amountNotif, setAmountNotif, getDataNotif, dataUserForNotif, setDataUserForNotif, getDataUserForNotif] = useContext(NotifikasiContext)
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
    const [showModalStatus, setShowModalStatus]= useState(false)
    const [idUpdateRoomChat, setIdUpdateRoomChat] = useState('')

    const [valueReply, setValueReply] = useState({
        _idReply: '',
        idUserReply: '',
        reply: '',
        nameReply: ''
    })

    const history = useHistory()

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id
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
        API.APIGetSigninById(id)
            .then(res => {
                if (!res.data) {
                    history.push('/sign-in')
                }
                setUserLogin(res.data)
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
        // API.APIGetChattingById(idChatt && idChatt._id)
        //     .then(res => {
        //         const respons = res.data
        //         setGetLatestChat(respons)
        //     })
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
                // Filter to data status
                // Sementara ga di gunain
                const filterToDataStatus = respons.filter(e => e.idUser1 === id || e.idUser2 === id)
                setDataRoom(filterToDataStatus)
                setDataRoom(data => [...data], dataRoom)
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

    const clickUserForChatt = (id) => {
        API.APIGetEndtoend()
            .then(res => {
                const respons = res.data
                const filterIdRoom = respons.filter(i => i.idRoom === id)
                setGetUserToChatt(filterIdRoom)
                setGetUserToChatt(data => data, getUserToChatt)
            })
        setDisplayChatToUser(true)
        setDisplayChat(false)
        setTampilanHome(false)
    }

    const clickBarChatUserToShowInfo = (id) => {
        API.APIGetSigninById(id)
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

        const dataIdUser2 = Object.keys(dataRoomChat).length > 0 ? dataRoomChat.data.idUser1 === _id ? dataRoomChat.data.idUser2 : dataRoomChat.data.idUSer1 : dataRoomEndtoend.idUser1 === _id ? dataRoomEndtoend.idUser2 : dataRoomEndtoend.idUser1
        const dataNameUser2 = Object.keys(dataRoomChat).length > 0 ? dataRoomChat.data.nameUser1 === name ? dataRoomChat.data.nameUser2 : dataRoomChat.data.nameUser1 : dataRoomEndtoend.nameUser1 === name ? dataRoomEndtoend.nameUser2 : dataRoomEndtoend.nameUser1
        const dataImageUrlUser2 = Object.keys(dataRoomChat).length > 0 ? dataRoomChat.data.imageUrlUser1 === imageUrl ? dataRoomChat.data.imageUrlUser2 : dataRoomChat.data.imageUrlUser1 : dataRoomEndtoend.imageUrlUser1 === imageUrl ? dataRoomEndtoend.imageUrlUser2 : dataRoomEndtoend.imageUrlUser1

        const dataPost = {
            googleId: googleId,
            name: name,
            pesan: valueChat,
            imageUrl: imageUrl,
            date: `${hour}:${minutes}`,
            email: email,
            idRoom: idRoomEndtoend,
            idUser: _id,
            _idReply: valueReply._idReply.length === 0 ? ' ' : valueReply._idReply,
            idUserReply: valueReply.idUserReply.length === 0 ? ' ' : valueReply.idUserReply,
            reply: valueReply.reply.length === 0 ? ' ' : valueReply.reply,
            nameReply : valueReply.nameReply.length === 0 ? ' ' : valueReply.nameReply,
            idUser1: _id,
            idUser2: dataIdUser2,
            nameUser1: name,
            nameUser2: dataNameUser2,
            imageUrlUser1: imageUrl,
            imageUrlUser2: dataImageUrlUser2
        }

        const dataNotif = {
            idRoom : idRoomEndtoend, 
            idUser: idUserInRoomChat,
            name: dataUserForNotif && dataUserForNotif.name,
            email: dataUserForNotif && dataUserForNotif.email
        }

        const dataUpdateRoom = {
            currentMessage : `${name}: ${valueChat}`,
            timeSend: `${hour}:${minutes}`
        }

        API.APIPostEndtoend(dataPost)
            .then(res => {
                getDataNotif(dataRoomEndtoend, id);
                clickUserForChatt(idRoomEndtoend);
                semuaAPI();
                return res;
            })

        API.APIPostNotifikasi(dataNotif)
        .then(res=>{
            return res;
        })

        const _idRoom = Object.keys(dataRoomChat).length > 0 ? dataRoomChat.data._id : idUpdateRoomChat
        API.APIPutChattingUser(_idRoom, dataUpdateRoom)
        .then(res=>{
            setAllAPI();
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
            setAllDataStatus([])
            localStorage.removeItem('userId')
            setValueSearchHome('')
            history.push('/sign-in')
        }
    }

    const filterUserSignin = getAllUserSignin.filter(e => e._id !== id)
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

    // For first user chatting room end to end
    setTimeout(() => {
        if(Object.keys(dataRoomChat).length > 0 && isSubmitSendMessage === true){
            const {idUser1, idUser2} = {...dataRoomChat.data}
            setDisplayModalUserSignin(false)
            const checkIdRoom = dataRoomChat.data ? dataRoomChat.data.idRoom : dataRoomChat.idRoom
            const checkDataRoom = dataRoomChat.data ? dataRoomChat.data : dataRoomChat
             clickUserForChatt(checkIdRoom)
             setDataRoomEndtoend(checkDataRoom)
             setIdRoomEndtoend(checkIdRoom)
             setIdUserInRoomChat(idUser1 === userSignin._id ? idUser2 : idUser1)
             setIsSubmitSendMessage(false)
         }
    }, 400);
    
    useEffect(() => {
        setAllAPI();
        semuaAPI();
    }, []);

    return (
        <>
            <div className="wrapp-home">
                <ResultSearch
                    clickCard={(e)=>{
                        const getIdUser = e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1
                        clickUserForChatt(e.idRoom)
                        setIdRoomEndtoend(e.idRoom)
                        setDataRoomEndtoend(e)
                        setIdUpdateRoomChat(e._id)
                        getDataUserForNotif(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                        setIdUserInRoomChat(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                        getDataNotif(e, id);
                        clickCardUser('undefined', filterRoomChattingUser.length, getIdUser);
                        setValueSearchHome('')
                    }}
                    clickCardMessage={async (i)=>{
                        const filterIdRoom = filterRoomChattingUser.filter((x)=> x.idRoom === i.idRoom)

                        function clickToCard(e){
                            const getIdUser = e[0].idUser1 === userSignin._id ? e[0].idUser2 : e[0].idUser1
                            clickUserForChatt(e[0].idRoom)
                            setIdRoomEndtoend(e[0].idRoom)
                            setDataRoomEndtoend(e[0])
                            setIdUpdateRoomChat(e[0]._id)
                            getDataUserForNotif(e[0].idUser1 === userSignin._id ? e[0].idUser2 : e[0].idUser1)
                            setIdUserInRoomChat(e[0].idUser1 === userSignin._id ? e[0].idUser2 : e[0].idUser1)
                            getDataNotif(e[0], id);
                            clickCardUser('undefined', filterRoomChattingUser.length, getIdUser);
                        }
                        await clickToCard(filterIdRoom);

                        setTimeout(() => {
                            const promiseToShowMsg = Promise.resolve(getUserToChatt)
                            
                            promiseToShowMsg.then((res=>{
                                if(res){
                                    setConditionShowMessage(true);
                                }
                            }))
                        }, 200);
                    }}
                />
                <div className="kolom-kiri">
                    <div className="nav-profile">
                        <span class="material-icons btn-menu-nav" onClick={() => setDisplayWrappModalMenu(true)}>
                            menu
                        </span>
                        <form action="" className="form-input-search">
                            <input type="text" className="input-search" placeholder={'Search'}
                            value={valueSearchHome}
                            onChange={(e)=>{
                                setValueSearchHome(e.target.value)
                                if(!e.target.value){
                                    changeBgResultSearch(null, filterMessage.length)
                                }
                            }
                            }
                            onMouseEnter={()=>setColorSearchHome(true)}
                            onMouseLeave={()=>setColorSearchHome(false)}
                            style={{
                                backgroundColor: colorSearchHome ? 'transparent' : '#eee',
                                border : colorSearchHome ? '2px solid #37afe2' : 'none'
                            }}
                            />
                            <span class="material-icons icon-close-search"
                            style={{
                                display: `${valueSearchHome.length > 0 ? 'flex' : 'none'}`
                            }}
                            onClick={()=>{
                                setValueSearchHome('')
                                changeBgResultSearch(null, filterMessage.length)
                            }}
                            >
                                close
                            </span>
                        </form>

                        <span class="material-icons circle-icon-status"
                        onClick={()=>setShowModalStatus(true)}
                        >
                            adjust
                        </span>
                    </div>

                    <div className="wrapp-place-user-signin" onClick={() => setDisplayModalUserSignin(true)}>
                        {/* jika cuma satu user yg join webchat */}
                        {infoUserSignin.length === 0 ? (
                            <img src={`${userSignin && userSignin.imageUrl || avatar}`} alt="" className="img-place-user-signin" />
                        ):(
                            null
                        )}

                        {infoUserSignin && infoUserSignin.length > 0 ?
                            infoUserSignin.map((e, i) => {
                                return (
                                    <>
                                        <img src={`${e.imageUrl}`} alt="" className="img-place-user-signin" key={i}/>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}

                        <div className="column-kanan-place-user-signin">
                        <div className="box-name-place">
                            {infoUserSignin && infoUserSignin.length > 0 ?
                                infoUserSignin.map((e, i) => {
                                    return (
                                        <p className="name-place-user-signin" key={i}>
                                            "{e.name}",
                                        </p>
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>

                        <div className="box-txt-lainnya">
                            <p className={'lainnya'}>
                                {infoUserSignin2.length > 2 ? `Anda dan ${infoUserSignin2.length - 2} lainnya telah bergabung di WebChat!!` : infoUserSignin.length === 0 ? 'Anda telah bergabung di WebChat!!' : 'dan Anda Telah bergabung di WebChat!!'}
                            </p>
                            <p className="lihat-dan-cari">
                                Lihat dan mulai untuk chat baru
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* Group Chat */}
                    {/* {dataGroup && dataGroup.length > 0 ?
                        dataGroup.map((e, i) => {
                            return (
                                <CardUser
                                    key={i}
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
                        )} */}
                    {/* END Group Chat */}

                    {filterRoomChattingUser && filterRoomChattingUser.length > 0 ?
                        filterRoomChattingUser.map((e, i) => {

                            const splitName = e.currentMessage.split(':')[0]
                            const splitMessage = e.currentMessage.split(':')[1]

                            return (
                                <CardUser
                                    key={i}
                                    idGroupChat={i}
                                    img={`${e.imageUrlUser1 === userSignin.imageUrl ? e.imageUrlUser2 : e.imageUrlUser1}`}
                                    nameCard={e.nameUser1 === userSignin.name ? e.nameUser2 : e.nameUser1}
                                    pesanMasuk={splitMessage}
                                    nameCardHome={e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1}
                                    namePesan={splitName === userSignin.name ? `You:` : ''}
                                    marginNamePesanMasuk={splitName === userSignin.name ? '0 5px 0 0px' : '0 0px 0 0'}
                                    datePesan={e.timeSend}
                                    clickCard={() => {
                                        const getIdUser = e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1
                                        clickUserForChatt(e.idRoom)
                                        setIdRoomEndtoend(e.idRoom)
                                        setDataRoomEndtoend(e)
                                        setIdUpdateRoomChat(e._id)
                                        setDataRoomChat({})
                                        getDataUserForNotif(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                                        setIdUserInRoomChat(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                                        getDataNotif(e, id);
                                        clickCardUser(i, filterRoomChattingUser.length, getIdUser);
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

                {/* {dataMembersGroup && Object.keys(dataMembersGroup).length > 0 ? (
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
                    )} */}

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
                            _idReply: ' ',
                            idUserReply: ' ',
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
                    clickBarProfile={()=>clickBarChatUserToShowInfo(idUserInRoomChat)}
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
                            _idReply: e._id,
                            idUserReply: e.idUser,
                            reply: e.pesan,
                            nameReply: e.name
                        })
                    }}
                    closeReply={()=>{
                        setValueReply({
                            _idReply: ' ',
                            idUserReply: ' ',
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
                    clickSend={async () => {
                        await setAllAPI();
                        setAmountNotif([])
                        await setIsSubmitSendMessage(true);
                    }}
                    goUserToChat={(id, data, idUser)=>{
                        const getIdUser = data.idUser1 === userSignin._id ? data.idUser2 : data.idUser1
                        clickCardUser('undefined', filterRoomChattingUser.length, getIdUser)
                        setIdUpdateRoomChat(data._id)
                        getDataNotif(data, idUser)
                        clickUserForChatt(id)
                        setIdRoomEndtoend(id)
                        setDataRoomChat({})
                        setDataRoomEndtoend(data)
                        getDataUserForNotif(data.idUser1 === userSignin._id ? data.idUser2 : data.idUser1)
                        setIdUserInRoomChat(data.idUser1 === userSignin._id ? data.idUser2 : data.idUser1)
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

                <Status
                wrappDisplay={showModalStatus ? 'flex' : 'none'}
                dataUserSignin={userSignin}
                clickClose={()=>setShowModalStatus(false)}
                />
            </div>
        </>
    )
}

const state = (state)=>({
    dataRoomUserChat : state.dataRoomUserChat
})

export default connect(state)(Home)