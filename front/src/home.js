import React from 'react';
import idea from './images/idea.png';
import osteopathy from './images/osteopath.jpg';
import hypnosis from './images/hypnose.jpg';
import aroma from './images/aromath.jpg';
import pro from './images/medical-team.png';
import schedule from './images/schedule.png';
import communication from './images/promotion.png';
import easyUse from './images/click.png';
import search from './images/search.png';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-search">
                    <h1 className="hero-title">Prenez rendez-vous avec un professionnel en medicine douce</h1>
                    <div className="hero-field">
                    <input className="hero-practitian" placeholder="Practique, Therapeute, ..."></input>
                    <input className="hero-location" placeholder="Ville"></input>
                    <a href="#" className="hero-button">Trouvez</a>
                    <a href="#" className="hero-button-mobile">  
                        <img src={search} alt="Trouvez" />
                    </a>
                    </div>
                </div>
            </section>
            <section className="info">
                <div className="info-content1">
                    <p>Parmi la fioriture d’informations que l’on peut trouver sur internet, il est souvent plus facile de se perdre que de trouver ce qu’on était venus chercher. 
                        Mais pas de soucis, vous êtes au bon endroit !
                    </p>
                    <div className="professional">
                        <img className="idea" src={idea} alt="idea" />
                        <div className="professional-content">
                            <p>Les médecines douces: </p>
                            <a href="#">Que faut il retenir</a>
                        </div>
                    </div>
                </div>
                <div className="info-services">
                    <div className="service-title">
                        <p>Quelle solution pour vous?</p>
                        <div className="service-title-buttons">
                            <a href="" className="button1">Parcourir les pratiques</a>
                            {/* <a href="" className="button2">Parcourir les pratiques</a> */}
                        </div>
                    </div>
                        
                    <ul className="service-types">
                        <li className="service">
                            <img src={osteopathy} alt="osteopatie" />
                            <p>Osteopatie</p>
                        </li>
                        <li className="service">
                            <img src={hypnosis} alt="hypnose" />
                            <p>Hypnose</p>
                        </li>
                        <li className="service">
                            <img src={aroma} alt="aromath" />
                            <p>Aroma Therapie</p>
                        </li>
                    </ul>
                    </div>
            </section>
            <section className="professional-section">
                <div className="pro-title">
                    <h4>Vous etes un professionnel?</h4>
                    <img src={pro} alt="" />
                </div>

                <ul className="pro-offers">
                    <li className="offer">
                        <img src={schedule} alt="schedule" />
                        <p>Outis de gestion</p>
                    </li>
                    <li className="offer">
                        <img src={easyUse} alt="easy use" />
                        <p>Facile d'utilisation</p>
                    </li>
                    <li className="offer">
                        <img src={communication} alt="communication" />
                        <p>Touchez un public plus large</p>
                    </li>
                </ul>

            </section>
        </div>
    )
}

export default Home;
