import {React, useEffect, useState} from 'react';
// import { useNavigate } from 'react-router';
import lost from './images/on-the-way-animate.svg';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import { useForm } from 'react-hook-form';
import osteopathy from './images/osteopath.jpg';
import hypnosis from './images/hypnose.jpg';
import aroma from './images/aromath.jpg';
// import pro from './images/medical-team.png';
// import schedule from './images/schedule.png';
// import communication from './images/promotion.png';
// import easyUse from './images/click.png';
// import search from './images/search.png';
import HomePopup from './components/Home/HomePopup';
import authService from './auth.service';
import SearchBar from './components/shared/SearchBar';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import background from './images/Untitled design (3).png';

const useStyles  = makeStyles({
  heroTitle : {
    color:'white',
    fontSize: '1.8rem',
    fontWeight: 700,
    textAlign: 'center',
    // margin: '5px auto',
    maxWidth: '700px',
  },
});
const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
  bottom: '40%',
  margin: 'auto',
  height: '100%',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '90%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
}));

const Hero = styled('div')(({ theme }) => ({
  background: `url(${background})`,
  backgroundRepeat: 'no-repeat' ,
  backgroundSize: 'cover',
  height: 450,
  padding: '15px',
  [theme.breakpoints.up('xs')]: {
    // width: '100%',
    backgroundSize: 'fill',
  },
  [theme.breakpoints.down('md')]: {
    // width: '90%',
    backgroundSize: 'fill',
  },
  [theme.breakpoints.up('lg')]: {
    // width: '70%',
  },
}));
const Home = () => {
  // let navigate = useNavigate();
  const classes = useStyles();

  const [open, setopen] = useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  // const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if(!user){
      setopen(true);
    }
  }, []);
  // const onSubmit = (data) =>{
  //   console.log(data);
  //   const location = new String(data.location).toLowerCase();
  //   const practice = new String(data.practice).toLowerCase();
  //   navigate( {
  //     pathname: '/search',
  //     search: `?practice=${practice}&location=${location}`,
  //   });
  // };
  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1024: {
      items: 3
    }
  };
  return (
    <section className="home">
      {open && <HomePopup open={open} handleClose={handleClose} handleOpen={handleOpen}/>}
      {/* <div className="hero">
        <div className="hero-search">
          <h1 className="hero-title">Prenez rendez-vous avec un professionnel en medicine douce</h1>
          <form className="hero-field">
            <input
              className={`hero-practitian ${errors.practice ? 'invalid' : ''}`}
              placeholder="Practique, Therapeute, ..."
              type="text"
              name="practice"
              {...register('practice', { required: true, maxLength: 10, minLength: 2 })}
            />

            <input
              className={`hero-location ${errors.location ? 'invalid' : ''}`}
              placeholder="Ville"
              type="text"
              name="location"
              {...register('location', { required: true, maxLength: 10, minLength: 2 })}
            />
            <button className="hero-button" onClick={handleSubmit(onSubmit)}>Trouvez</button>
            <a href="#" className="hero-button-mobile">
              <img src={search} alt="Trouvez" />
            </a>
          </form>
        </div>
      </div> */}
      <Hero className="hero1">
        <Root >
          <h1 className={classes.heroTitle}>Prenez rendez-vous avec un professionnel en medicine douce</h1>
          <SearchBar/>
        </Root>
      </Hero>

      <section className="info">
        <div className="info-content1">
          <div className="professional">
            <img className="idea" src={lost} alt="idea" />

          </div>

          <div className="professional-content">
            <p>Parmi la fioriture d’informations que l’on peut trouver sur internet, il est souvent plus facile de
            se perdre que de trouver ce qu’on était venus chercher. Mais pas de soucis, vous êtes au bon endroit !
            </p>
            <p>Les médecines douces: </p>
            <a href="#">Que faut il retenir</a>
          </div>

        </div>
        <div className="info-services">
          <div className="service-title">
            <p>Quelle solution pour vous?</p>
            <div className="service-title-buttons">
              <a href="" className="button1">Parcourir les pratiques</a>
            </div>
          </div>
          <div className="service-items">
            <AliceCarousel
              dotsDisabled={true}
              buttonsDisabled={true}
              responsive={responsive}
            >
              <div className="service">
                <img src={osteopathy} alt="osteopatie" />
                <p>Osteopatie</p>
              </div>
              <div className="service">
                <img src={hypnosis} alt="hypnose" />
                <p>Hypnose</p>
              </div>
              <div className="service">
                <img src={aroma} alt="aromath" />
                <p>Aroma Therapie</p>
              </div>
              <div className="service">
                <img src={osteopathy} alt="osteopatie" />
                <p>Osteopatie</p>
              </div>
              <div className="service">
                <img src={hypnosis} alt="hypnose" />
                <p>Hypnose</p>
              </div>
              <div className="service">
                <img src={aroma} alt="aromath" />
                <p>Aroma Therapie</p>
              </div>
            </AliceCarousel>
          </div>
        </div>
      </section>
      {/* <section className="professional-section">
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
            <p>Facile d&apos;utilisation</p>
          </li>
          <li className="offer">
            <img src={communication} alt="communication" />
            <p>Touchez un public plus large</p>
          </li>
        </ul>

      </section> */}
    </section>
  );
};

export default Home;
