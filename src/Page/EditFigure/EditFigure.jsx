import React, { useState, useEffect } from 'react';
import style from "./EditFigure.module.css";
import { FormControl, TextField, Button ,} from '@material-ui/core';
import { doc, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebase.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const EditFigure = (figureId) => {

    const [FormData,setFormData] = useState({});

    useEffect(() => {
        const fetchFigures = async () => {
          try {
            const docRef = doc(db, "Figure-List", figureId);
            const docSnapshot = await getDocs(docRef);
              const data = docSnapshot.data();
              const figure = {
                Id: docSnapshot.id,
                Image: data.Image || [],
                Name: data.Name,
                Price: data.Price,
                Status: data.Status,
                Stock: data.Stock,
                Tag: data.Tag,
                ReleaseDate: data.ReleaseDate,
                Description: data.Description,
              };
              setFormData(figure);
    
            }
           catch (error) {
                console.error("Error fetching figures:", error);
          }
        };
    
        if(figureId !== 'undefined') {
            fetchFigures();
        } else {
            setFormData({
                Id: "",
                Image: [],
                Name: "",
                Price: 0,
                Status: false,
                Stock: 0,
                Tag: [],
                ReleaseDate: null,
                Description: "",
            })
        }
      }, []);


    const handleSubmit = () => {
        console.log("hidden secret")
    }

  return (
    <>
    <div className={style.Formcontainer}>
    <FormControl onSubmit={handleSubmit} style={{width:"100%"}}>
        <TextField
            required 
            id="Name"
            label="Name"
            variant='outlined'
            style={{width:"20%"}}
            onChange={()=>{}}            
            /><br />
        <TextField
            required
            id='Price'
            label='Price'
            type='number' 
            variant='outlined'  
            style={{width:"20%"}} 
            onChange={()=>{}}   
        /><br />
        <TextField
            required 
            id="Stock"
            label="Stock"
            variant='outlined'
            style={{width:"20%"}}
            onChange={()=>{}}  
        /><br />
        <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            id="ReleaseDate"
            label="Release Date"
            format="DD/MM/YYYY"
            variant='outlined'
            />
    </LocalizationProvider>
        </div>
        <br />
    <TextField
        id='Description'
        label="Description"
        variant='outlined'
        multiline={true}
        rows={5}
        
        />

    </FormControl>
    </div>
    </>
  )
}

export default EditFigure