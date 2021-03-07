import React, { useContext, useEffect, useState } from 'react'
import CardUser from '../carduser/CardUser'
import './Status.scss'
import profile from '../../images/profilgroup.jpg'
import API from '../../services'
import Carousel from '../carousel/Carousel'
import { StatusContext } from '../../services/context/status/status'

const Status = ({ clickClose, wrappDisplay, dataUserSignin }) => {

    const [dataStatus, setDataStatus, dataRoom, setDataRoom] = useContext(StatusContext)
    const [modalType, setModalType] = useState(false)
    const [showCarousel, setShowCarousel] = useState(false)
    const [textValue, setTextValue] = useState('')
    const [statusUserSignin, setStatusUserSignin] = useState([])
    const [allDataStatus, setAllDataStatus] = useState([])
    const [index, setIndex] = useState()
    const [bgColor, setBgColor] = useState('burlywood')

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    const color = ['burlywood', 'brown', 'darkblue', 'grey', 'darkviolet', 'darksalmon', 'indigo', 'purple']

    let promise = Promise.resolve()

    function setAllAPI() {
        API.APIGetStatus()
            .then(res => {
                const result = res.data
                if (result) {
                    // For status user signin
                    const filter = result.filter((e) => e.idUser === id)
                    setStatusUserSignin(filter)
                    const filterNonUserSignin = result.filter((e) => e.idUser !== id)

                    // Remove Unique Id
                    const uniqueId = filterNonUserSignin.filter((data, index) => {
                        const idUser = JSON.stringify(data.idUser);
                        return index === filterNonUserSignin.findIndex(obj => {
                            return JSON.stringify(obj.idUser) === idUser;
                        })
                    })

                    let newData = []
                    API.APIGetChattingUser()
                        .then(res => {
                            const respons = res.data
                            const filterToDataStatus = respons.filter(e => e.idUser1 === id || e.idUser2 === id)

                            if (filterToDataStatus.length > 0) {
                                for (let p = 0; p < filterToDataStatus.length; p++) {
                                    promise = promise.then(() => {
                                        return new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const index = filterToDataStatus[p].idUser1 === id ? filterToDataStatus[p].idUser2 : filterToDataStatus[p].idUser1

                                                const filterUniqueId = uniqueId.filter((e) => e.idUser === index)
                                                setTimeout(() => {
                                                    if (filterUniqueId.length === 1) {
                                                        newData.push(filterUniqueId[0])
                                                        setAllDataStatus(newData)
                                                    }
                                                }, 20);
                                                setTimeout(() => {
                                                    resolve();
                                                }, 100);
                                            }, 0);
                                        })
                                    })
                                }
                            }
                        })
                }
            })
    }

    function clickStatusUser(id) {
        API.APIGetStatus()
            .then(res => {
                const result = res.data
                const filterIdUser = result.filter((e) => e.idUser === id)
                setDataStatus(filterIdUser)
                return res;
            })
    }

    function changeRandomColor(lengthColor, nameColor) {
        let color = ''
        const randomColor = Math.floor(Math.random() * Math.floor(lengthColor))
        color = nameColor[randomColor]
        setBgColor(color)
    }

    function PostStatus() {
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()
        const dataPost = {
            googleId: dataUserSignin && dataUserSignin.googleId,
            email: dataUserSignin && dataUserSignin.email,
            name: dataUserSignin && dataUserSignin.name,
            givenName: dataUserSignin && dataUserSignin.givenName,
            familyName: dataUserSignin && dataUserSignin.familyName,
            imageUrl: dataUserSignin && dataUserSignin.imageUrl,
            textStatus: textValue,
            idUser: dataUserSignin && dataUserSignin._id,
            time: `${hour}:${minute}`,
            bgColor: bgColor
        }
        if (textValue.length > 0) {
            API.APIPostStatus(dataPost)
                .then(res => {
                    const result = res.data
                    if (result) {
                        setAllAPI();
                        setTimeout(() => {
                            setModalType(false)
                            setTextValue('')
                        }, 500);
                    }
                })
        }
    }

    // setTimeout(() => {
    //     for (let i = 0; i < dataRoom.length; i++) {
    //         let newData = []
    //         let idUser;

    //         promise = promise.then(() => {
    //             return new Promise((resolve, reject) => {
    //                 setTimeout(() => {
    //                     idUser = allDataStatus[i].idUser;

    //                     newData.splice(0, 0, idUser)

    //                     setTimeout(() => {
    //                         // console.log(newData)
    //                         resolve();

    //                     }, 2 * 1000);
    //                 }, 500);
    //             })
    //         })
    //     }
    // }, 100);

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <div className="wrapp-status" style={{
                display: `${wrappDisplay}`
            }}>
                <Carousel
                    wrappDisplay={showCarousel ? 'flex' : 'none'}
                    // data={dataStatus}
                    index={index}
                    clickClose={() => {
                        setShowCarousel(false)
                    }}
                    closeStatus={() => {
                        clickClose();
                    }}
                    show={true}
                />
                <div className="modal-ketik-status" style={{
                    display: `${modalType ? 'flex' : 'none'}`,
                    backgroundColor: `${bgColor}`
                }}>
                    <form className="form-input-ketik-status" onSubmit={(e) => {
                        e.preventDefault();
                        PostStatus();
                    }}>
                        <input type="text" className="input-ketik-status"
                            placeholder={'Ketik status'}
                            autoFocus
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                        />
                    </form>
                    <span class="material-icons icon-close-ketik-status"
                        onClick={() => setModalType(false)}
                    >
                        close
                    </span>
                    <div className="label-bawah-status">
                        <span class="material-icons icon-right-status">
                            chevron_right
                        </span>
                        <p className="status-khusus">
                            Status (Khusus)
                        </p>
                    </div>
                    <i className="fas fa-palette icon-paint" onClick={() => {
                        changeRandomColor(color.length, color);
                    }}></i>
                </div>
                <div className="kolom-kiri-status">
                    <div className="nav-update-status">
                        <div className="column-btn-update-status">
                            <p className="txt-update-status">
                                Update status
                            </p>
                            <span class="material-icons btn-update-status-txt"
                                onClick={() => {
                                    changeRandomColor(color.length, color);
                                    setModalType(true);
                                }}
                            >
                                create
                            </span>
                            <span class="material-icons btn-update-status-img">
                                camera_alt
                            </span>
                        </div>

                        <div className="column-status-saya">
                            <CardUser
                                img={`${dataUserSignin && dataUserSignin.imageUrl}`}
                                nameCard={'Status Saya'}
                                wrapBgColor={'transparent'}
                                colorName={'#fff'}
                                colorDate={'#777'}
                                pesanMasuk={statusUserSignin.length > 0 ? `hari ini pukul ${statusUserSignin[0].time}` : 'Tidak ada pembaruan'}
                                fontPesanMasuk={'9pt'}
                                marginNamePesanMasuk={'0'}
                                wrappPadding={'0'}
                                borderImg={statusUserSignin.length > 0 ? '2.5px solid #37afe2' : 'none'}
                                clickCard={async () => {
                                    if (statusUserSignin.length !== 0) {
                                        setDataStatus(statusUserSignin)
                                        setIndex(0)
                                        await setShowCarousel(true)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="column-scroll-status-user">
                        <div className="column-card-status-user">
                            <p className="txt-terbaru">
                                TERBARU
                            </p>
                            {allDataStatus && allDataStatus.length > 0 ?
                                allDataStatus.map((e, i) => {
                                    return (
                                        <CardUser
                                            key={i}
                                            img={`${e.imageUrl}`}
                                            nameCard={e.name}
                                            wrapBgColor={'transparent'}
                                            colorName={'#fff'}
                                            colorDate={'#777'}
                                            pesanMasuk={`hari ini pukul ${e.time}`}
                                            wrappPadding={'0'}
                                            fontPesanMasuk={'9pt'}
                                            marginNamePesanMasuk={'0'}
                                            borderImg={allDataStatus.length > 0 ? '2.5px solid #37afe2' : 'none'}
                                            clickCard={async () => {
                                                clickStatusUser(e.idUser)
                                                setIndex(0)
                                                await setShowCarousel(true)
                                            }}
                                        />
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>
                    </div>
                </div>
                <div className="kolom-kanan-status" style={{
                    display: `${statusUserSignin.length > 0 ? 'none' : 'flex'}`
                }}>
                    <span class="material-icons icon-close-status" onClick={() => {
                        clickClose();
                    }}>
                        close
                    </span>

                    <span class="material-icons icon-circle-status">
                        adjust
                    </span>
                    <p className="pembaruan-status">
                        Klik pada kontak untuk melihat pembaruan statusnya
                    </p>
                </div>
                <div className="kolom-kanan-view-status" style={{
                    display: `${statusUserSignin.length > 0 ? 'flex' : 'none'}`
                }}>
                    <span class="material-icons icon-close-status2" onClick={() => {
                        clickClose();
                    }}>
                        close
                    </span>
                    <p className="lihat-pembaruan-anda">
                        Lihat pembaruan Anda
                    </p>
                    <div className="column-card-img-status">
                        {statusUserSignin && statusUserSignin.length > 0 ?
                            statusUserSignin.map((e, i) => {
                                return (
                                    <>
                                        <div className="card-img-status" key={i}>
                                            <div className="circle-status" key={i}
                                                style={{
                                                    backgroundColor: `${e.bgColor}`
                                                }}
                                                onClick={() => {
                                                    setIndex(i)
                                                    setDataStatus(statusUserSignin)
                                                    setTimeout(() => {
                                                        setShowCarousel(true)
                                                    }, 1);
                                                }}
                                            >
                                                <p className="contents-status" style={{
                                                    fontSize: `${e.textStatus.length > 25 ? '6pt' : '9pt'}`
                                                }}>
                                                    {e.textStatus}
                                                </p>
                                            </div>
                                            <p className="time-pembaruan-status">
                                                hari ini pukul {e.time}
                                            </p>
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Status