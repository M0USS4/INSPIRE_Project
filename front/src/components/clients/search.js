import { Avatar, Card } from '@mui/material';
import {React, useState, useEffect} from 'react';
import Picker from '../shared/Picker';
import professionals from '../../data/pro-data';
import './clients.css';
import woman from '../../images/michael-dam-mEZ3PoFGs_k-unsplash.jpg';
import ConfirmPopup from './ConfirmPopup';

const Search = () => {
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
  return (
    <div className="search">
      {open && <ConfirmPopup data={data} open={open} handleClose={handleClose} handleOpen={handleOpen}/>}
      {searchData.map(pro => (
        <Card key={pro.name} className="search-card">
          <div className="rdv">
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
              <button className="button1">Prendez un rdv</button>
            </div>
          </div>
          <div className="picker">
            <Picker filter={4} handleRdv={handleRdv}  id={pro}/>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Search;
