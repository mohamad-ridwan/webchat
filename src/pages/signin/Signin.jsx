import React, { useEffect, useState } from 'react'
import './Signin.scss'
import profil from '../../images/profilgroup.jpg'
import GoogleLogin from 'react-google-login'
import API from '../../services'
import { useHistory } from 'react-router-dom'

const Signin = () => {

    const [allDataUser, setAllDataUser] = useState([])

    const clientId = '904372258777-kfmajbgv8fj6u1juu05ql83ddsci4okj.apps.googleusercontent.com'

    const history = useHistory()

    const setAllAPI = () => {
        API.APIGetSignin()
            .then(res => {
                setAllDataUser(res.data)
            })
    }

    function signinUser(data) {
        API.APISigninGoogle(data)
            .then(res => {
                localStorage.setItem('userId', JSON.stringify({ _id: res.data._id }))
                history.push('/')
            }, (err) => {
                alert('terjadi kesalahan!, mohon coba beberapa saat lagi')
                return err;
            })
    }

    function postUserSignin(res) {
        const dataPost = {
            googleId: res.googleId,
            email: res.email,
            name: res.name,
            givenName: res.givenName,
            familyName: res.familyName,
            imageUrl: res.imageUrl,
            infoOnline: ' ',
            bio: `I'm joined WebChat!!`
        }
        const dataSignin = {
            googleId: res.googleId,
            email: res.email
        }
        const checkGoogleIdUser = allDataUser.filter(e => e.googleId == res.googleId)
        if (checkGoogleIdUser.length === 0) {
            API.APIPostSignin(dataPost)
                .then(res => {
                    localStorage.setItem('userId', JSON.stringify({ _id: res.data._id }))
                    history.push('/')
                })
        } else {
            signinUser(dataSignin);
        }
    }

    function responseGoogle(res) {
        const respon = res.profileObj
        postUserSignin(respon)
    }

    useEffect(() => {
        setAllAPI()
    }, [])

    return (
        <>
            <div className="wrapp-signin">
                <div className="column-kanan-signin">
                    <img src={profil} alt="" className="img-signin" />
                    <p className="name-chat-signin">
                        Welcome To WebChatt
                    </p>
                </div>

                <div className="column-kiri-signin">
                    <p className="txt-signin">
                        Silahkan Signin Untuk Bergabung
                    </p>
                    <GoogleLogin className={'btn-signin'}
                        clientId={clientId}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    >

                    </GoogleLogin>
                </div>
            </div>
        </>
    )
}

export default Signin