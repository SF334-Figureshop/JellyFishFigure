import React, { useState, useEffect } from 'react';
import style from "./EditFigure.module.css";
import { FormControl, TextField, Button, Paper } from '@material-ui/core';
import { doc, getDoc, Timestamp, setDoc} from 'firebase/firestore';
import { db } from '../../config/firebase.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes , getDownloadURL , deleteObject} from 'firebase/storage';
import Snackbar from '@mui/material/Snackbar';
import { Carousel } from "react-responsive-carousel";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import TagGenerator from '../ML/TagGenerator.jsx';



const EditFigure = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const storage = getStorage();

    const [open,setopen] = useState(false)

    const [Name,setName] = useState("");
    const [Price,setPrice] = useState("");
    const [Stock,setStock] = useState("")
    const [ReleaseDate,setReleaseDate] = useState(null)
    const [Tag,setTag] = useState([])
    const [Description,setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState([]);
    let [currentImageIndex,setcurrentImageIndex] = useState(0)
    

    useEffect(() => {
        const fetchFigures = async () => {
          try {
            const docRef = doc(db, "Figure-List", id);
            const docSnapshot = await getDoc(docRef);
            if(docSnapshot.exists()){
              const data = docSnapshot.data();
              setImageUrl(data.Image && Array.isArray(data.Image) && data.Image.length > 0 ? data.Image :  
              data.Image && !Array.isArray(data.Image) ? data.Image[0]: [])
              setName(data.Name);
              setPrice(data.Price)
              setStock(data.Stock)
              setReleaseDate(dayjs(new Date(data.ReleaseDate.seconds*1000)))
              setTag(data.Tag)
              setDescription(data.Description)
            }
            
        }
           catch (error) {
                console.error("Error fetching figures:", error);
          }
        };

        fetchFigures();
        

      }, []);

    const handleClose = () => {
        setopen(false)
    }

    const handleSelectFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                setImageUrl(prevImageUrl => [...prevImageUrl,file])
                event.target.value = null;

            } catch (error) {
                console.error("Error Selecting file:", error);
            }
        }
    }

    const handleDeleteFile = () => {

        if(!(imageUrl[currentImageIndex] instanceof File || imageUrl[currentImageIndex] instanceof Blob)){
            const httpsReference = ref(storage, imageUrl[currentImageIndex]); 
            deleteObject(httpsReference)
        }            
            const updatedImageUrl = imageUrl.filter((_, i) => i !== currentImageIndex);
            setImageUrl(updatedImageUrl)
            if(imageUrl.length == 1){setImageUrl([])}
    }


    const handleSubmit = async () => {
        setTag(Tag.map(d => d.trim()))

        const uploadURL = await Promise.all(imageUrl.map(async (image, index) => {
            
            if(image instanceof File || image instanceof Blob){
                const storageRef = ref(storage,`${id}/${uuidv4()}`);
            
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef)
                return downloadURL;
                
            } else {
                return image
            }
          }))
        setopen(true)
        await setDoc(doc(db, "Figure-List", id), {
                    Name: Name,
                    Image: uploadURL,
                    Price: Number(Price),
                    Status: Stock>0 ? true : false,
                    Stock: Stock>0? Number(Stock) : 0,
                    ReleaseDate: Timestamp.fromDate(ReleaseDate.toDate()),
                    Tag: Tag,
                    Description: Description,
                })
            
        navigate("/Admin");
    }

      

  return (
    <>
    <Paper  elevation={10} className={style.Formcontainer}>
    <div><h1>Edit Figure</h1></div>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
        message="Figure Data Updated"
      />
        
    <FormControl onSubmit={handleSubmit} style={{width:"100%"}}>
        <div style={{display:"inline-flex"}}>
        <Carousel className='image-carousel' onChange={(index)=>{
            setcurrentImageIndex(index);            
            }}>
            {
                imageUrl !== null && imageUrl.map((image, index) => (
                    <div key={index}>
                      <img 
                        src={typeof image === "string"?image :URL.createObjectURL(image)} 
                        alt={`$Image ${index + 1}`}
                        style={{maxHeight:"600px", maxWidth:"600px",objectFit:"contain"}}
                         />
                    </div>
                  ))
            }
            </ Carousel>
        </div>
        <br />       
        <div style={{fontFamily:"sans-serif"}}>
        Figure Image:&nbsp;
        <Button
            component="label"
            variant="contained"
            color='primary'
            type="file"
            onChange={handleSelectFile}
            
        >
            Select File
            <input style={{display:"none"}} type="file" />
        </Button>&nbsp;
        <Button
            component="label"
            variant="outlined"
            color='primary'
            startIcon={<DeleteIcon />}
            onClick={handleDeleteFile}
            
        >
            delete file
        </Button>&nbsp;
        </div>
        <br />
        <TextField
            required 
            id="Name"
            label="Name"
            variant='outlined'
            style={{width:"20%"}}
            value={Name}
            onChange={(event)=>{setName(event.target.value)}}            
            /><br />
        <TextField
            required
            id='Price'
            label='Price'
            type='number' 
            variant='outlined'  
            style={{width:"20%"}} 
            value={Price} 
            onChange={(event)=>{setPrice(event.target.value)}}   
        /><br />
        <TextField
            required 
            id="Stock"
            label="Stock"
            type='number'
            variant='outlined'
            style={{width:"20%"}}
            value={Stock}
            onChange={(event)=>{setStock(event.target.value)}}  
        /><br />
        <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            required
            id="ReleaseDate"
            label="Release Date"
            format="DD/MM/YYYY"
            variant='outlined'
            value={ReleaseDate}                        
            onChange={(newValue)=>{setReleaseDate(newValue)}}
            slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
    </LocalizationProvider>
        </div>
        <br />
    <div style={{display:'flex'}}>
    <TextField
        required
        id='Tag'
        label="Tag (use comma ',' to split tag)"
        variant='outlined'
        multiline={true}
        minRows={1}
        value={Tag.join(",")}
        onChange={(event)=>{
            setTag(event.target.value.split(","))
        }}
        style={{width:"60%"}}
        
        /><Popup trigger={<Button variant='contained' color='primary' >Tag Generator by description</Button> } position="top center"><div><TagGenerator des={Description}></TagGenerator></div></Popup>
        </div><br />
    <TextField
        required
        id='Description'
        label="Description"
        variant='outlined'
        multiline={true}
        minRows={5}
        value={Description}
        onChange={(event)=>{setDescription(event.target.value)}}
        style={{width:"60%"}}
        /><br />
    
    <Button 
        type='submit' 
        onClick={handleSubmit}
        variant='contained'
        style={{width:"30%", margin:"auto"}}
        >
            Submit
        </Button>

    </FormControl>
    </Paper>
    </>
  )
}

export default EditFigure