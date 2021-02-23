import React from 'react'
import './CardUser.scss'

const CardUser = ({ clickCard, img, nameCard, pesanMasuk, datePesan, displayIcon, namePesan, displayNamePesan }) => {

    return (
        <>
            <div className="group-chat" onClick={clickCard}>
                <img src={img} alt="" className="img-group-chat" />
                <div className="column-name-group">
                    <p className="name-group-chat">
                        <span class="material-icons iconGroup" style={{
                            display: `${displayIcon}`
                        }}>
                            group
                    </span> {nameCard}
                    </p>
                    <p className="pesan-masuk">
                        <p className="name-pesan-masuk" style={{
                            display: `${displayNamePesan}`
                        }}>
                            {namePesan}
                        </p>
                        {pesanMasuk}
                    </p>
                    <p className="date-pesan-masuk">
                        {datePesan}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardUser