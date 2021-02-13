import React from 'react'
import './Home.scss'
import profile from '../../images/profilgroup.jpg'
import background from '../../images/gambar.jpg'
import Chat from '../../components/chat/Chat'

const Home = () => {
    return (
        <>
            <div className="wrapp-home">
                <div className="kolom-kiri">
                    <div className="nav-profile">
                        <img src={profile} alt="" className="img-nav-profile" />
                        <p className="name-nav-profile">
                            Mohamad Ridwan Apriyadi
                        </p>
                    </div>

                    <div className="group-chat">
                        <img src={profile} alt="" className="img-group-chat" />
                        <div className="column-name-group">
                            <p className="name-group-chat">
                                Wellcome to Group Chatt 🤗
                            </p>

                            <p className="pesan-masuk">
                                Ridwan: Tes
                        </p>
                        </div>
                    </div>
                </div>

                <div className="kolom-kanan">
                    <img src={background} alt="" className="img-background-chat" />

                    <div className="nav-profil-group-chat">
                        <img src={profile} alt="" className="img-profil-group-chat" />

                        <div className="column-name-profil-group-chat">
                            <p className="name-profil-group-chat">
                                Wellcome to Group Chatt 🤗
                            </p>
                            <p className="total-members">
                                20 members
                            </p>
                        </div>
                    </div>

                    <form className="form-input-chat">
                        <input type="text" className="input-user-chat" placeholder={'Ketik pesan...'} autoFocus />
                    </form>

                    <Chat
                        imgUser={profile}
                        nameUser={'Mohamad Ridwan Apriyadi'}
                        pesanUser={'Hello!'}
                    />
                    <Chat
                        imgUser={profile}
                        nameUser={'Ranu Hermansyah'}
                        pesanUser={'Hello!'}
                    />
                </div>
            </div>
        </>
    )
}

export default Home