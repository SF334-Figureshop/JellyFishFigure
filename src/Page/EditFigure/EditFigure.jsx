import React, { useState, useEffect } from 'react';
import style from "./EditFigure.module.css";
import { FormControl, TextField, Button, Paper } from '@material-ui/core';
import { doc, getDoc, Timestamp, setDoc} from 'firebase/firestore';
import { db } from '../../config/firebase.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes , getDownloadURL } from 'firebase/storage';


const EditFigure = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const storage = getStorage();
    const FigurePicRef = ref(storage,`image/${id}.jpg`)
    const [PicURL,setPicURL] = useState()
   


    const [Name,setName] = useState("");
    const [Price,setPrice] = useState("");
    const [Stock,setStock] = useState("")
    const [ReleaseDate,setReleaseDate] = useState(null)
    const [Tag,setTag] = useState([])
    const [Description,setDescription] = useState("")
    const [Image,setImage] = useState("")

    useEffect(() => {
        const fetchFigures = async () => {
          try {
            const docRef = doc(db, "Figure-List", id);
            const docSnapshot = await getDoc(docRef);
            if(docSnapshot.exists()){
              const data = docSnapshot.data();
              setImageUrl(data.Image != undefined ? data.Image : "")
              setName(data.Name);
              setPrice(data.Price)
              setStock(data.Stock)
              setReleaseDate(dayjs(new Date(data.ReleaseDate.seconds*1000)))
              setTag(data.Tag)
              setDescription(data.Description)
              setImage(data.Image)
            }
        }
           catch (error) {
                console.error("Error fetching figures:", error);
          }
        };

        fetchFigures();

      }, []);


    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);        

    }
    useEffect(()=>{
        console.log(selectedFile)
        console.log(imageUrl)            
    },[selectedFile,imageUrl]);

    const handleSubmit = async () => {
        setTag(Tag.map(d => d.trim()))
        const uploadTask =  await uploadBytes(FigurePicRef, selectedFile)
        console.log('Uploaded a blob or file!');
        const downloadURL = await getDownloadURL(FigurePicRef)
        await setDoc(doc(db, "Figure-List", id), {
                    Name: Name,
                    Image: downloadURL,
                    Price: Number(Price),
                    Status: Stock>0 ? true : false,
                    Stock: Stock>0? Number(Stock) : 0,
                    ReleaseDate: Timestamp.fromDate(ReleaseDate.toDate()),
                    Tag: Tag,
                    Description: Description,
                })
            ;
        navigate("/Admin");
    }

      

  return (
    <>
    <Paper  elevation={10} className={style.Formcontainer}>
    <div><h1>Edit Figure</h1></div>
        
    <FormControl onSubmit={handleSubmit} style={{width:"100%"}}>
        <img src={imageUrl} style={{maxHeight:"600px", maxWidth:"600px",objectFit:"contain"}} />
        <br />       
        <div style={{fontFamily:"sans-serif"}}>
        Figure Image:
        <Button
            component="label"
            variant="contained"
            color='primary'
            startIcon={<CloudUploadIcon />}
            type="file"
            onChange={handleFileChange}
            
        >
            Upload file
            <input style={{display:"none"}} type="file" />
        </Button>
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
        
        /><br />
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