import React, { useContext, useEffect, useState } from 'react'
import { ResultSearchUserContext } from '../../services/context/resultsearchuser/ResultSearchUser'
import CardUser from '../carduser/CardUser'
import './ResultSearch.scss'

const ResultSearch = ({ clickCard, clickCardMessage }) => {

    const [valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI, toShowMessageReply, conditionShowMessage, setConditionShowMessage, changeBgResultSearch] = useContext(ResultSearchUserContext)
    const [idMessage, setIdMessage] = useState('')

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    setTimeout(() => {
        if (conditionShowMessage) {
            setIdMessage(idMsg => idMsg, idMessage)
            toShowMessageReply(idMessage)
            setConditionShowMessage(false)
        }
    }, 0);

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

                                        const splitName = e.currentMessage.split(':')[0]
                                        const splitMessage = e.currentMessage.split(':')[1]

                                        const name = userLogin && userLogin.name

                                        return (
                                            <CardUser
                                                key={i}
                                                img={`${e.idUser1 === id ? e.imageUrlUser2 : e.imageUrlUser1}`}
                                                nameCard={e.idUser1 === id ? e.nameUser2 : e.nameUser1}
                                                namePesan={splitName === name ? `You:` : ''}
                                                marginNamePesanMasuk={splitName === name ? '0 5px 0 0px' : '0 0px 0 0'}
                                                pesanMasuk={splitMessage}
                                                datePesan={e.timeSend}
                                                clickCard={() => {
                                                    clickCard(e)
                                                    changeBgResultSearch(null, filterMessage.length)
                                                }}
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
                                {filterMessage && filterMessage.length > 0 ? filterMessage.map((e, i) => {
                                    const nameCard = e.dataRoom.idUser1 === id ? e.dataRoom.nameUser2 : e.dataRoom.nameUser1
                                    const imgCard = e.dataRoom.idUser1 === id ? e.dataRoom.imageUrlUser2 : e.dataRoom.imageUrlUser1

                                    return (
                                        <CardUser
                                            key={i}
                                            img={`${imgCard}`}
                                            nameCard={nameCard}
                                            pesanMasuk={e.pesan}
                                            idPesan={e.idUser}
                                            namePesan={e.idUser === id ? 'You:' : ''}
                                            datePesan={e.date}
                                            marginNamePesanMasuk={e.idUser === id ? '0 5px 0 0' : '0 0px 0 0'}
                                            clickCard={async () => {
                                                clickCardMessage(e)
                                                setIdMessage(e._id)
                                                changeBgResultSearch(i, filterMessage.length)
                                            }}
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