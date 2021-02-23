import React, { useEffect, useState } from 'react'
import API from '../../services'
import CardMember from '../cardmember/CardMember'
import CardUser from '../carduser/CardUser'
import './ModalMenu.scss'

const ModalMenu = ({ displayWrapp, background, imgProfile, txtName, txtEmail, clickClose, displayAddGroup, clickAddGroup, clickCancel, displayNavMenu, clickLogOut, displayAddMembers, cancelAddMembers, clickNext, dataMember, totalUserSignin, valueSearch, changeSearch, closeModalAfterCreate, clickProfile }) => {

    const [dataSelected, setDataSelected] = useState([])
    const [value, setValue] = useState('')

    function selectUser(e) {
        dataSelected.push(e)
        setDataSelected(dataSelected => [...dataSelected], dataSelected)
    }

    const dataAddMember = {
        nameGroup: value,
        imageUrlGroup: 'none',
        totalMember: dataSelected.length,
        members: [...dataSelected]
    }

    function postJoinGroup(e) {
        // e.preventDefault()
        API.APIPostJoinGroup(dataAddMember)
            .then(res => {
                alert('berhasil buat group!')
                console.log(res)
            })
        // console.log(dataAddMember)
    }

    return (
        <>
            <div className="wrapp-modal-menu" style={{
                display: `${displayWrapp}`
            }}>
                <div className="nav-menu-modal" style={{
                    display: `${displayNavMenu}`
                }}>
                    <div className="column-atas-menu" style={{
                        backgroundImage: `url(${background})`
                    }}>
                        <img src={imgProfile} alt="" className="img-profile-menu-modal"
                            onClick={clickProfile}
                        />
                        <p className="name-profile-menu-modal">
                            {txtName}
                        </p>
                        <p className="email-profile-menu-modal">
                            {txtEmail}
                        </p>
                    </div>

                    <div className="column-bawah-menu">
                        <button className="btn-nav-modal-menu" onClick={clickAddGroup}>
                            <span class="material-icons groupIcon">
                                group
                            </span> New Group
                        </button>
                        <button className="btn-nav-modal-menu" style={{
                            color: 'red'
                        }}
                            onClick={clickLogOut}
                        >
                            <span class="material-icons groupIcon">
                                logout
                            </span> Log Out
                        </button>
                    </div>

                    <div className="column-version-web-chat">
                        <p className="clone-telegram">
                            Clone Telegream Desktop
                            </p>
                        <p className="version-telegram">
                            Version 2.5.9 - About
                            </p>
                    </div>

                    <button className="btn-close-modal-menu" onClick={clickClose}>
                        Close X
                    </button>
                </div>

                <div className="modal-add-group" style={{
                    display: `${displayAddGroup}`
                }}>
                    <div className="circle-upload-img">
                        <input type="file" className="upload-img" />
                        <span class="material-icons icon-camera">
                            camera_alt
                        </span>
                    </div>

                    <form className="form-input-add-group">
                        <label htmlFor="label" className="label-group-name">
                            Group name
                        </label>
                        <input type="text" className="input-add-group" value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }} />
                    </form>

                    <button className="btn-modal-add-group" onClick={clickNext}>
                        NEXT
                    </button>
                    <button className="btn-cancel-add-group" onClick={clickCancel}>
                        CANCEL
                    </button>
                </div>

                <div className="modal-add-members" style={{
                    display: `${displayAddMembers}`
                }}>
                    <div className="title-add-members">
                        <p className="add-members">
                            Add Members
                        </p>
                        <p className="info-max-members">
                            {dataSelected.length + 1} / 20
                        </p>
                    </div>

                    <div className="column-input-search-member">
                        <span class="material-icons btn-search">
                            search
                        </span>
                        <input type="text" className="input-search-members" placeholder={'Search'}
                            value={valueSearch}
                            onChange={changeSearch}
                        />
                    </div>

                    <div className="wrapp-card-selected" style={{
                        display: `${dataSelected.length > 0 ? 'flex' : 'none'}`
                    }}>
                        {dataSelected && dataSelected.length > 0 ?
                            dataSelected.map((e, i) => {
                                return (
                                    <div className="card-selected" key={i}>
                                        <img src={`${e.imageUrl}`} alt="" className="img-card-selected" />
                                        <p className="name-card-selected">
                                            {e.name}
                                        </p>
                                        <button className="btn-remove-selected" onClick={() => {
                                            dataSelected.splice(i, 1)
                                            setDataSelected(dataSelected => [...dataSelected], dataSelected)
                                        }}>
                                            x
                                        </button>
                                    </div>
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>

                    <div className="wrapp-card-members-search">
                        <div className="column-card-members">
                            {dataMember && dataMember.length > 0 ?
                                dataMember.map((e, i) => {
                                    return (
                                        <CardMember
                                            key={i}
                                            img={`${e.imageUrl}`}
                                            nameMember={e.name}
                                            dateJoin={e.infoOnline}
                                            clickUser={() => {
                                                const checkId = dataSelected.every(i => i._id !== e._id)
                                                if (checkId) {
                                                    selectUser(e)
                                                }
                                            }}
                                        />
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>
                    </div>

                    <div className="column-btn-modal-add-members">
                        <button className="btn-modal-add-members" onClick={() => {
                            postJoinGroup()
                            closeModalAfterCreate()
                        }}>
                            CREATE
                        </button>
                        <button className="btn-modal-add-members" onClick={() => {
                            cancelAddMembers()
                            setDataSelected([])
                        }}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalMenu