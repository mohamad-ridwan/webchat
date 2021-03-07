import React from 'react'
import './CardUser.scss'

const CardUser = ({ clickCard, img, nameCard, pesanMasuk, datePesan, displayIcon, namePesan, displayNamePesan, wrapBgColor, colorName, colorDate, wrappPadding, fontPesanMasuk, marginNamePesanMasuk, borderImg, idGroupChat }) => {

    return (
        <>
            <div className="group-chat" id={idGroupChat} onClick={clickCard} style={{
                backgroundColor: `${wrapBgColor}`,
                padding: `${wrappPadding}`,
            }}>
                <img src={img} alt="" className="img-group-chat" style={{
                    border: `${borderImg}`
                }} />
                <div className="column-name-group">
                    <p className="name-group-chat" style={{
                        color: `${colorName}`
                    }}>
                        <span class="material-icons iconGroup" style={{
                            display: `${displayIcon}`
                        }}>
                            group
                    </span> {nameCard}
                    </p>
                    <p className="pesan-masuk" id={`${idGroupChat}pesanMasuk`} style={{
                        fontSize: `${fontPesanMasuk}`,
                    }}>
                        <p className="name-pesan-masuk" id={`${idGroupChat}namePesanMasuk`} style={{
                            display: `${displayNamePesan}`,
                            margin: `${marginNamePesanMasuk}`
                        }}>
                            {namePesan}
                        </p>
                        {pesanMasuk}
                    </p>
                    <p className="date-pesan-masuk" id={`${idGroupChat}datePesan`} style={{
                        color: `${colorDate}`
                    }}>
                        {datePesan}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardUser