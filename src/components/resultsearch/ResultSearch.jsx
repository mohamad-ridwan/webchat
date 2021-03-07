import React, { useContext, useEffect } from 'react'
import { ResultSearchUserContext } from '../../services/context/resultsearchuser/ResultSearchUser'
import CardUser from '../carduser/CardUser'
import './ResultSearch.scss'

const ResultSearch = () => {

    const [valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI] = useContext(ResultSearchUserContext)

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    useEffect(() => {
        semuaAPI();
    }, [])

    return (
        <>
            <div className="wrapp-result-search" style={{
                display: `${valueSearchHome.length > 0 ? 'flex' : 'none'}`
            }}>
                <div className="wrapp-scroll-result-search">
                    <div className="column-scroll-result-search">
                        <div className="contact-result-search">
                            <p className="total-found-contact">
                                {filterSearch.length !== 0 ? `Di temukan ${filterSearch.length} kontak` : 'Kontak tidak di temukan'}
                            </p>
                            <div className="box-card-contact">
                                {filterSearch && filterSearch.length > 0 ?
                                    filterSearch.map((e, i) => {
                                        return (
                                            <CardUser
                                                key={i}
                                                img={`${e.idUser1 === id ? e.imageUrlUser2 : e.imageUrlUser1}`}
                                                nameCard={e.idUser1 === id ? e.nameUser2 : e.nameUser1}
                                            // clickCard={() => {
                                            //     clickUserForChatt(e.idRoom)
                                            //     setIdRoomEndtoend(e.idRoom)
                                            //     setDataRoomEndtoend(e)
                                            //     setIdUserInRoomChat(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                                            // }}
                                            />
                                        )
                                    }) : (
                                        <div></div>
                                    )}

                            </div>
                        </div>
                        <div className="found-message-after-result-search">
                            <p className="total-found-result-message">
                                {filterMessage.length > 0 ? `Di temukan ${filterMessage.length} pesan` : 'Tidak di temukan pesan'}
                            </p>
                            <div className="box-card-result-message">
                                {filterMessage && filterMessage.length > 0 ?
                                    filterMessage.map((e, i) => {
                                        return (
                                            <CardUser
                                                key={i}
                                                img={`${e.imageUrl}`}
                                                nameCard={e.name}
                                                pesanMasuk={e.pesan}
                                                namePesan={e.idUser === id ? 'You:' : ''}
                                                displayNamePesan={e.idUser === id ? 'flex:' : 'none'}
                                            // clickCard={() => {
                                            //     clickUserForChatt(e.idRoom)
                                            //     setIdRoomEndtoend(e.idRoom)
                                            //     setDataRoomEndtoend(e)
                                            //     setIdUserInRoomChat(e.idUser1 === userSignin._id ? e.idUser2 : e.idUser1)
                                            // }}
                                            />
                                        )
                                    }) : (
                                        <div></div>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultSearch