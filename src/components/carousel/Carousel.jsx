import React, { useContext, useState } from 'react'
import { StatusContext } from '../../services/context/status/status'
import './Carousel.scss'

const Carousel = ({ data, wrappDisplay, clickClose, index, show, closeStatus }) => {

    const [dataStatus, setDataStatus] = useContext(StatusContext)
    const [showBarProgress, setShowBarProgress] = useState(false)

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    var slides = document.getElementsByClassName('column-bar-progress');
    let btnPrev = document.getElementsByClassName('icon-prev');
    let btnNext = document.getElementsByClassName('icon-next');

    let slideIndex = 1;
    const firstCondition = index !== undefined ? slideIndex = index + 1 : slideIndex
    // Callback for handle async cronous
    setTimeout(() => {
        if (dataStatus.length > 0) {
            showSlides(firstCondition)
        }
        setShowBarProgress(show)
    }, 0)

    let setTime;

    function btnSlides(n) {
        showSlides(slideIndex += n)
    }

    function btnBars(n) {
        showSlides(slideIndex = n)
    }

    var promise = Promise.resolve()

    function showSlides(n) {
        var i;
        if (dataStatus && dataStatus.length > 0) {
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none'
            }

            setTimeout(() => {
                if (slides.length > 0) {
                    return slides[slideIndex - 1].style.display = 'flex';
                }
            }, 50)

            if (slides.length === 1) {
                btnPrev[0].style.display = 'none'
                btnNext[0].style.display = 'none'
            }
            if (slideIndex === 1 && btnPrev.length > 0) {
                btnPrev[0].style.display = 'none'
            }
            if (slideIndex > 1) {
                btnPrev[0].style.display = 'flex'
            }
            if (slideIndex < slides.length) {
                btnNext[0].style.display = 'flex'
            }
            if (slideIndex === slides.length) {
                btnNext[0].style.display = 'none'
            }

            let barProgress = document.getElementsByClassName('border-progress')
            let whiteBarProgress = document.getElementsByClassName('white-bar-progress')

            if (showBarProgress) {
                let valueLoop = ''
                for (let x = index; x < barProgress.length; x++) {
                    let barProgress = document.getElementsByClassName('border-progress')[x];
                    let newProgressBar = barProgress.cloneNode(true)

                    setTimeout(() => {
                        promise = promise.then((res) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (dataStatus.length > 0 && slides.length > 0) {
                                        whiteBarProgress[x].style.width = '100%'
                                        newProgressBar.classList.add('active')

                                        setTime = setTimeout(function () {
                                            resolve();
                                            btnSlides(1);
                                            valueLoop = x
                                            if (valueLoop == slides.length - 1) {
                                                clickClose();
                                                setDataStatus([]);
                                                setShowBarProgress(false)
                                                slideIndex = 1
                                            }
                                        }, 3 * 1000);
                                    };
                                }, 0);
                            });
                        });
                    }, 100);

                    for (let p = 0; p < index; p++) {
                        whiteBarProgress[p].style.transition = 'none'
                        whiteBarProgress[p].style.width = '100%'
                    }
                }
            }
        }
    }

    function stopTimeOut() {
        clearTimeout(setTime);
    }

    return (
        <>
            <div className="wrapp-carousel" style={{
                display: `${wrappDisplay}`
            }}>
                <span class="material-icons icon-back-left" onClick={() => {
                    stopTimeOut();
                    clickClose();
                    setDataStatus([])
                    setShowBarProgress(false)
                }}>
                    arrow_back
                </span>
                <span class="material-icons icon-close-carousel"
                    onClick={() => {
                        stopTimeOut();
                        clickClose();
                        closeStatus();
                        setDataStatus([]);
                        setShowBarProgress(false)
                    }}
                >
                    close
                </span>
                <div className="container-slide-carousel">
                    <div className="bar-progress">
                        <div className="wrapp-border-progress">
                            {dataStatus && dataStatus.length > 0 ?
                                dataStatus.map((e, i) => {
                                    return (
                                        <div className="border-progress" key={i}
                                            onClick={() => {
                                                btnBars(i + 1)
                                            }}
                                        >
                                            <div className="white-bar-progress" key={i}>

                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>
                    </div>
                    {dataStatus && dataStatus.length > 0 ?
                        dataStatus.map((e, i) => {
                            return (
                                <div className="column-bar-progress fade" key={i} style={{
                                    backgroundColor: `${e.bgColor}`
                                }}>
                                    <div className="column-content-status">
                                        <p className="name-status">
                                            {e.idUser !== id ? e.name : 'Anda'}
                                        </p>
                                        <p className="time-create-status">
                                            {`hari ini pukul ${e.time}`}
                                        </p>
                                        <p className="info-content-status">
                                            {e.textStatus}
                                        </p>
                                    </div>
                                </div>
                            )
                        }) : (
                            <div></div>
                        )}
                </div>
                <div className="column-btn-prev">
                    <span class="material-icons icon-prev"
                        style={{
                            display: 'flex'
                        }}
                        onClick={() => btnSlides(-1)}>
                        keyboard_arrow_left
                    </span>
                </div>

                <div className="column-btn-next">
                    <span class="material-icons icon-next"
                        style={{
                            display: 'flex'
                        }}
                        onClick={() => btnSlides(1)}>
                        keyboard_arrow_right
                    </span>
                </div>
            </div>
        </>
    )
}

export default Carousel