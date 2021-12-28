import { Avatar, Card } from '@mui/material';
import {React, useState, useEffect} from 'react';
import Picker from '../shared/Picker';
import professionals from '../../data/pro-data';
import './clients.css';
import woman from '../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import ConfirmPopup from './ConfirmPopup';
import { useNavigate } from 'react-router';
import { Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Search = () => {
  let navigate = useNavigate();

  const [searchData, setsearchData] = useState([]);
  const [open, setopen] = useState(false);
  const [data, setdata] = useState({});
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  useEffect(() => {
    const search = professionals.filter(pro => pro.city === 'Lille' && pro.practice === 'Osteology');
    setsearchData(search);
  }, [data]);

  const handleRdv = (id,day, date, time) => {
    setdata({
      id: id,
      day: day,
      date: date,
      time: time
    });
    console.log(data);
    handleOpen();
  };

  const goToProPage = () => {
    navigate('/pro-profile/1',      { state: {
      success: true,
    }});
  };
  return (
    <div className="search">
      {open && <ConfirmPopup data={data} open={open} handleClose={handleClose} handleOpen={handleOpen}/>}
      {searchData.map(pro => (
        <Card key={pro.name} className="search-card">
          <Grid
            container
            spacing={2}
            // alignItems="stretch"
            justifyContent="center"
            sx={{ width: '70%', margin: 'auto'}}
          >
            <Grid item xs={12} sm={12} md={5} lg={3} style={{height: '100%', backgroundColor:'white' }}>
              {/* <div className="rdv">
                <div className="rdv-info">
                  <Avatar className="rdv-image" src={woman} sx={{ width: 90, height: 90 }}/>
                  <div className="rdv-info-details">
                    <h2>{pro.name}</h2>
                    <div className="rdv-info-address">
                      <Link href=""><LocationOnIcon/> {pro.address} {pro.code} {pro.city}</Link>

                      <h3></h3>
                      <h3></h3>
                    </div>
                  </div>
                </div>
                <div className="rdv-button">
                  <button className="button1" onClick={goToProPage}>Prendez un rdv</button>
                </div>
              </div> */}
              <div className="profile-header-basic">
                <Avatar className="rdv-image" src={woman} sx={{ width: 90, height: 90 }}/>
                <div className="header-basic-info">
                  <h2>Dr. Prenom Nom</h2>
                  <h3>BDS, Osteology</h3>
                  <h3>Osteopatist</h3>
                  {/* <Rating
                    className="rating"
                    name="text-feedback"
                    value={ratingValue}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  /> */}
                  <div>
                    <Link href=""><LocationOnIcon/> 89 Avenue de Bretagne 59000 Lille</Link>
                  </div>
                </div>
              </div>
              <div className="rdv-button">
                <button className="button1" onClick={goToProPage}>Prendez un rdv</button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={9}>
              <Picker filter={3} handleRdv={handleRdv}  id={pro}/>
            </Grid>

          </Grid>
          {/* <div className="rdv">
            <div className="rdv-info">
              <Avatar className="rdv-image" src={woman} sx={{ width: 90, height: 90 }}/>
              <div className="rdv-info-details">
                <h2>{pro.name}</h2>
                <div className="rdv-info-address">
                  <h3>{pro.address}</h3>
                  <h3>{pro.code} {pro.city}</h3>
                </div>
              </div>
            </div>
            <div className="rdv-button">
              <button className="button1" onClick={goToProPage}>Prendez un rdv</button>
            </div>
          </div>
          <div className="picker">
            <Picker filter={3} handleRdv={handleRdv}  id={pro}/>
          </div> */}
        </Card>
      ))}
    </div>
  );
};

export default Search;
