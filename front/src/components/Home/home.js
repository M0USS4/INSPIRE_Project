import {React, useEffect, useState} from 'react';
import lost from '../../images/on-the-way-animate.svg';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import osteopathy from '../../images/osteopath.jpg';
import hypnosis from '../../images/hypnose.jpg';
import aroma from '../../images/aromath.jpg';
import HomePopup from './HomePopup';
import authService from '../helpers/auth.service';
import SearchBar from '../shared/SearchBar';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';

const useStyles  = makeStyles({
  heroTitle : {
    color:'white',
    fontSize: '1.8rem',
    fontWeight: 700,
    textAlign: 'center',
    maxWidth: '700px',
  },
});
const SearchCointainer = styled('div')(({ theme }) => ({
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

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '90%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '80%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '70%',
  },
}));

const Hero = styled('div')(({ theme }) => ({
  background: `url(${theme.palette.type === 'light' ?
    process.env.PUBLIC_URL+'/bgLight.png' : process.env.PUBLIC_URL +'/bgDark.png'})`,
  backgroundRepeat: 'no-repeat' ,
  backgroundSize: 'cover',
  height: 450,
  padding: '15px',
  [theme.breakpoints.up('xs')]: {
    // width: '100%',
    backgroundSize: 'fill',
  },
  [theme.breakpoints.down('md')]: {
    backgroundSize: 'fill',
  },
  [theme.breakpoints.up('lg')]: {
  },
}));

const Div = styled('div')(() => ({
}));
const Home = () => {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if(!user){
      setopen(true);
    }
  }, []);
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
      <Hero className="">
        <SearchCointainer >
          <h1 className={classes.heroTitle}>Prenez rendez-vous avec un professionnel en medicine douce</h1>
          <div style={{maxWidth: '800px'}}>
            <SearchBar type='home'/>
          </div>
        </SearchCointainer>
      </Hero>

      <Root>
        <Div className=""
          sx={{backgroundColor: 'secondary.contrastText', padding: '20px', margin: '15px', display: {sm: 'flex'}}}>
          <div className="">
            <img className="idea" src={lost} alt="idea" />
          </div>

          <div className="">
            <p>Parmi la fioriture d’informations que l’on peut trouver sur internet, il est souvent plus facile de
            se perdre que de trouver ce qu’on était venus chercher. Mais pas de soucis, vous êtes au bon endroit !
            </p>
            <p>Les médecines douces: </p>
            <Button variant='contained' color='primary'>Que faut il retenir</Button>
          </div>

        </Div>
        <Div className=""
          sx={{backgroundColor: 'secondary.contrastText', padding: '20px', margin: '15px'}}>
          <Div sx={{display: {sm : 'flex'}, alignItems: 'center', gap: '20px', margin: '15px'}}>
            <p>Quelle solution pour vous?</p>
            <div className="">
              <Button variant='contained' color='primary'>Parcourir les pratiques</Button>
            </div>
          </Div>
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
        </Div>
      </Root>
    </section>
  );
};

export default Home;
