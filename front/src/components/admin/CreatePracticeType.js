import React, { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}));
const FormDiv = styled('div')(() => ({
  margin: '10px auto'
}));
const CreatePracticeType = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setfile] = useState({});
  const uploadSingleFile = (e) => {
    setfile( {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    });
  };

  const onSubmit = (data) =>{
    console.log(data);
    const formData = new FormData();
    console.log(file);
    formData.append('data', JSON.stringify(data));
    formData.append('files', file.data, 'medicine_image');
    axios.post('http://localhost:2021/admin/medicine/create', formData)
      .then(response => {
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Root sx={{ flexGrow: 1 }}>
      <Item>
        <FormDiv sx={{textAlign: 'center'}}>Creation of Medicine</FormDiv>
        <FormDiv className={`${errors.name ? 'invalid' : ''}`}>
          <label htmlFor="name"><b>Name of Medicine</b></label>
          <input
            className='form-control'
            type="name"
            placeholder={` ${errors.name ? 'Check name' : 'Enter name'}`}
            name="name"
            {...register('name',                         {
              required: true,
            })}
          />
        </FormDiv>
        <FormDiv className={`${errors.text1 ? 'invalid' : ''}`}>
          <label htmlFor="text1"><b>Text 1</b></label>
          <input
            className='form-control'
            type="text1"
            placeholder={` ${errors.text1 ? 'Check text 1' : 'Enter text 1'}`}
            name="text1"
            {...register('text1',                         {
              required: true,
            })}
          />
        </FormDiv>
        <FormDiv className={`${errors.text2 ? 'invalid' : ''}`}>
          <label htmlFor="text2"><b>Text 2</b></label>
          <input
            className='form-control'
            type="text2"
            placeholder={` ${errors.text2 ? 'Check text 2' : 'Enter text  2'}`}
            name="text2"
            {...register('text2',                         {
              required: true,
            })}
          />
        </FormDiv>
        <FormDiv className={`${errors.text3 ? 'invalid' : ''}`}>
          <label htmlFor="text3"><b>Text 3</b></label>
          <input
            className='form-control'
            type="text3"
            placeholder={` ${errors.text3 ? 'Check text 3' : 'Enter text 3'}`}
            name="text3"
            {...register('text3',                         {
              required: true,
            })}
          />
        </FormDiv>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) =>uploadSingleFile(e)}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Button onClick={handleSubmit(onSubmit)} variant='contained'>Create Practice</Button>
      </Item>
    </Root>
  );
};

export default CreatePracticeType;
