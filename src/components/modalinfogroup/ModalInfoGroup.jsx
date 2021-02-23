import React, { useContext, useEffect, useState } from 'react'
import API from '../../services'
import { DataUserSiginContext } from '../../services/context/datausersignin/DataUserSignin'
import CardMember from '../cardmember/CardMember'
import './ModalInfoGroup.scss'

const ModalInfoGroup = ({ img, clickClose, displayModal, data, infoLogin, nonMember, titleInfo, nameInfo, imgInfo, infoOnline, displayInfoStatus, displayStatusUserChat, dataInfoUserProfile, emailInfo, bioInfo, saveUpdateName }) => {

    const [userSigninGlobal, setUserSigninGlobal] = useContext(DataUserSiginContext)
    const [showPencil, setShowPencil] = useState(false)
    const [showEditName, setShowEditName] = useState(false)
    const [valueUpdateBio, setValueUpdateBio] = useState('')
    const [dataSignin, setDataSignin] = useState({})

    const { name, email, imageUrl, givenName, familyName, bio } = { ...dataSignin }

    const userId = JSON.parse(localStorage.getItem('userId'))

    const [values, setValues] = useState({
        familyName: ``,
        givenName: ``
    })

    function changeInputUpdate(e) {
        const value = e.target.value
        let newValue = { ...values }
        newValue[e.target.name] = value
        setValues(newValue)
    }

    function submitUpdate() {
        const dataPut = {
            givenName: values.givenName,
            familyName: values.familyName,
            name: values.givenName + ' ' + values.familyName
        }
        if (values.familyName.length > 0 && values.givenName.length > 0) {
            if (values.givenName !== givenName || values.familyName !== familyName) {
                API.APIPutName(userId && userId._id, dataPut)
                    .then(res => {
                        setShowEditName(false)
                        setAllAPI();
                        return res;
                    })
            }
        }
    }

    function updateBioProfile() {
        const dataUpdate = {
            bio: valueUpdateBio
        }
        if (valueUpdateBio !== bio) {
            API.APIPutBio(userId && userId._id, dataUpdate)
                .then(res => {
                    setAllAPI()
                    return res;
                })
        }

    }

    function setAllAPI() {
        API.APIGetSigninById(userId && userId._id)
            .then(res => {
                const result = res.data
                if (result) {
                    setValueUpdateBio(result.bio)
                    setDataSignin(result)
                    setValues({
                        givenName: result.givenName,
                        familyName: result.familyName
                    })
                }

                // console.log(res.data)
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <div className="modal-profil-group-chat" style={{
                display: `${displayModal} `
            }}>
                <div className="box-white-modal">
                    <div className="column-atas">
                        <div className="column-satu-from-column-atas">
                            <p className="group-info">
                                {titleInfo}
                            </p>
                            <button className="btn-close-modal" onClick={() => {
                                clickClose()
                                updateBioProfile()
                            }}>
                                X
                        </button>

                        </div>

                        <div className="column-dua-from-column-atas">
                            <img src={`${imgInfo || imageUrl} `} alt="" className="img-modal-profil" />
                            <div className="box-kanan-column-atas">
                                <p className="name-modal-profil">
                                    {nameInfo || name}
                                </p>
                                <p className="info-online-modal-info">
                                    {infoOnline || dataSignin.infoOnline}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="wrapp-info-status-user" style={{
                        display: `${displayInfoStatus} `
                    }}>
                        <div className="info-user-profile"
                            onMouseOver={() => setShowPencil(true)}
                            onMouseLeave={() => setShowPencil(false)}
                            onClick={() => {
                                setShowEditName(true)
                            }}
                        >
                            <span class="material-icons iconUserProfile">
                                person_outline
                            </span>
                            <div className="column-kanan-user-profile">
                                <p className="name-user-profile">
                                    {name}
                                </p>
                                <label htmlFor="label" className="label-name-user-profile">Name</label>
                            </div>
                            <span class="material-icons iconPencilUpdate"
                                style={{
                                    display: `${showPencil ? 'flex' : 'none'} `
                                }}
                            >
                                edit
                            </span>
                        </div>
                        <div className="info-user-profile">
                            <span class="material-icons iconUserProfile">
                                alternate_email
                            </span>
                            <div className="column-kanan-user-profile">
                                <p className="name-user-profile">
                                    {email}
                                </p>
                                <label htmlFor="label" className="label-name-user-profile">Email</label>
                            </div>
                        </div>
                    </div>

                    <div className="wrapp-update-status-user-profile" style={{
                        display: `${displayInfoStatus} `
                    }}>
                        <div className="form-input-update-status">
                            <input type="text" className="input-update-status" maxLength={'60'} placeholder={'Tambahkan bio...'}
                                onChange={(e) => setValueUpdateBio(e.target.value)}
                                value={valueUpdateBio}
                            />
                            <p className="total-length-input">
                                {valueUpdateBio.length}
                            </p>
                        </div>
                        <p className="max-length-character">
                            Max length character 60
                        </p>
                    </div>

                    <div className="wrapp-modal-edit-name-profile" style={{
                        display: `${showEditName ? 'flex' : 'none'} `
                    }}>
                        <div className="box-white-edit-name-profile">
                            <label htmlFor="label" className="label-edit-your-name">
                                Edit your name
                            </label>

                            <div className="form-input-edit-your-name">
                                <label htmlFor="label" className="label-input-name">
                                    First name
                                </label>
                                <input type="text" className="input-edit-your-name"
                                    value={values.givenName}
                                    name={'givenName'}
                                    onChange={changeInputUpdate}
                                />
                                <label htmlFor="label" className="label-input-name lastName">
                                    Last name
                                </label>
                                <input type="text" className="input-edit-your-name"
                                    value={values.familyName}
                                    name={'familyName'}
                                    onChange={changeInputUpdate}
                                />
                            </div>

                            <div className="column-bawah-edit-name-profile">
                                <button className="btn-edit-name-profile"
                                    onClick={() => setShowEditName(false)}
                                >
                                    CANCEL
                                </button>
                                <button className="btn-edit-name-profile"
                                    onClick={(e) => {
                                        submitUpdate()
                                        saveUpdateName();
                                    }}
                                >
                                    SAVE
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="wrapp-info-status-user-chat" style={{
                        display: `${displayStatusUserChat} `
                    }}>
                        <div className="column-status-email-user-chat">
                            <span class="material-icons iconInfo">
                                info
                            </span>

                            <div className="column-kanan-info-status-user-chat">
                                <label htmlFor="label" className="label-email-status-user-chat">
                                    {emailInfo}
                                </label>
                                <p className="provider-email">
                                    Google
                                </p>
                            </div>
                        </div>
                        <div className="column-status-bio">
                            <p className="txt-bio">
                                {bioInfo}
                            </p>
                            <label htmlFor="label" className="label-bio">
                                Bio
                            </label>
                        </div>
                        <button className="btn-send-message">SEND MESSAGE</button>
                    </div>

                    <div className="column-bawah">
                        <p className="total-info-member">
                            {data && data.length === 0 ? '' : `${data.length} MEMBERS`}
                        </p>

                        {data && data.length > 0 ?
                            data.map((e, i) => {
                                return (
                                    <CardMember
                                        key={i}
                                        img={`${e.imageUrl} `}
                                        nameMember={e.name}
                                        dateJoin={e.infoOnline}
                                    />
                                )
                            }) : (
                                <p>{nonMember}</p>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalInfoGroup