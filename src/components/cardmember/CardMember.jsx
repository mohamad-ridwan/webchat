import react from 'react'
import './CardMember.scss'

const CardMember = ({ img, nameMember, dateJoin, clickUser }) => {
    return (
        <>
            <div className="card-info-member-group" onClick={clickUser}>
                <img src={img} alt="" className="img-info-user-group" />
                <div className="column-name-info-user-group">
                    <p className="name-user-info-group">
                        {nameMember}
                    </p>
                    <p className="info-join-group">
                        {dateJoin}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardMember