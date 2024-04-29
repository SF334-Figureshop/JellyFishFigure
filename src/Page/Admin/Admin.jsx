import style from "./Admin.module.css"
import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase.jsx';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { TablePagination, Table , Paper, TableHead, TableRow, TableCell, TableBody, TableContainer} from '@material-ui/core';
import { Link } from "react-router-dom";

const Admin = () => {

  const [allItem,setallItem] = useState(0);
  const [allItemType,setallItemType] = useState(0);
  const [outOfStock,setoutOfStock] = useState(0);
  const [inStock,setInstock] = useState(0);
  const [newFigureURL,setnewFigureURL] = useState("")

  const [figures, setFigures] = useState([]);

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const collectionRef = collection(db, "Figure-List");
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFigures = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const figure = {
            id: doc.id,
            image: data.Image || [],
            name: data.Name,
            price: data.Price,
            status: data.Status,
            stock: data.Stock,
            tag: data.Tag,
          };
          fetchedFigures.push(figure);

        });
        setFigures(fetchedFigures);

      } catch (error) {
        console.error("Error fetching figures:", error);
      }
    };

    fetchFigures();
      
    
  }, []);

  useEffect(() => {
    setallItemType(figures.length);
    setInstock(figures.filter(d => d.status).length);
    setoutOfStock(figures.filter(d => !d.status).length);
    setallItem(figures.reduce((prev, curr) => prev + (typeof curr.stock ==="number"? curr.stock: 0), 0));      
        
  }, [figures]);

  useEffect(()=>{
    
    if((figures[0] && Number(figures[0].id.substring(6)) !== 1 && figures.length <=1) || (figures && figures.length ==0)){
      setnewFigureURL(`Figure00001`)
    } else if(figures[0] && Number(figures[0].id.substring(6) ) == 1 && figures.length <=1){
      setnewFigureURL(`Figure00002`)
    } else {
      for(let i = 0 ; i < figures.length-1 ; i++){
        if(Number(figures[i].id.substring(6))+1 !== Number(figures[i+1].id.substring(6))) {
          setnewFigureURL(`Figure${(Number(figures[i].id.substring(6))+1).toString().padStart(5,"0")}`);
          break;
        }
        setnewFigureURL(`Figure${(allItemType+1).toString().padStart(5,"0")}`);
      }
  }
  },[allItemType,figures])
 

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <>
    <div className={style.gridContainer}>
      <Paper elevation={10} className={style.gridItem}>
        <div style={{fontWeight:700, fontFamily: "Sans-serif",color:"grey"}}>จำนวนสินค้าทั้งหมด</div> 
        <br /> <div style={{fontWeight:800, fontSize:24, fontFamily: "Verdana , sans-serif"}}>{allItem}</div> 
      </Paper>
      <Paper elevation={10} className={style.gridItem}>
        <div style={{fontWeight:700, fontFamily: "Sans-serif",color:"grey"}}>ชนิดสินค้าทั้งหมด</div> 
        <br /> <div style={{fontWeight:800, fontSize:24, fontFamily: "Verdana , sans-serif"}}>{allItemType}</div> 
      </Paper>
      <Paper elevation={10} className={style.gridItem}>
        <div style={{fontWeight:700, fontFamily: "Sans-serif",color:"grey"}}>ชนิดสินค้าที่ไม่หมดคลังสินค้า</div>
        < br />  <div style={{fontWeight:800, fontSize:24, fontFamily: "Verdana , sans-serif"}}>{inStock} &#40;{Math.floor((inStock/allItemType)*100)}%&#41;</div>
      </Paper>
      <Paper elevation={10} className={style.gridItem}>
        <div style={{fontWeight:700, fontFamily: "Sans-serif",color:"grey"}}>ชนิดสินค้าที่หมดคลังสินค้า</div> 
        <br /> <div style={{fontWeight:800, fontSize:24, fontFamily: "Verdana , sans-serif"}}>{outOfStock} &#40;{100-Math.floor((inStock/allItemType)*100)}%&#41;</div>
      </Paper>
    </div>

    <Paper className={style.table} elevation={5}>
    <TableContainer>
    <Table>
        <TableHead>
          <TableRow>
          <TableCell align="center"><div className={style.tableHead}>ชื่อ</div></TableCell>
          <TableCell align="center"><div className={style.tableHead}>รูป</div></TableCell>
          <TableCell align="center"><div className={style.tableHead}>ราคา</div></TableCell>
          <TableCell align="center"><div className={style.tableHead}>จำนวน</div></TableCell>
          <TableCell align="center"><div className={style.tableHead}>ยังเหลือในคลัง</div></TableCell>
          <TableCell align="center"><div className={style.tableHead}>tag</div></TableCell>
          <TableCell><Link to={`/EditFigure/${newFigureURL}`}><AddIcon style={{cursor: "pointer",color:"black"}}></AddIcon></Link></TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
            {(rowsPerPage > 0
              ? figures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : figures
            ).map((figure) => (
              <TableRow key={figure.id}>
                <TableCell style={{width: '15%'}} align="center">{figure.name}</TableCell>
                <TableCell style={{width: '15%'}} align="center">{
                figure.image && Array.isArray(figure.image) && figure.image.length > 0 ? (
                <img src={figure.image[0]} alt={figure.name} width="150" height="150"/>
              ) : figure.image && !Array.isArray(figure.image) ? (
                <img src={figure.image} alt={figure.name} width="150" height="150"/>
              ) : null
              }</TableCell>
                <TableCell style={{width: '15%'}} align="center">{figure.price} $</TableCell>
                <TableCell style={{width: '15%'}} align="center">{figure.stock}</TableCell>
                <TableCell style={{width: '15%'}} align="center">{figure.status? <CheckCircleIcon style={{color:"green"}} />: <CancelIcon style={{color:"red"}}/>}</TableCell>
                <TableCell style={{width: '15%'}} align="center">{Array.isArray(figure.tag) ? figure.tag.join(', ') : figure.tag}</TableCell>
                <TableCell style={{width: '10%'}}>
                  <Link key={figure.id} to={`/EditFigure/${figure.id}`}><SettingsIcon style={{marginRight: 10, cursor: "pointer",color:"black"}}></SettingsIcon></Link>
                  <DeleteIcon style={{cursor: "pointer"}} onClick={async () => {
                    await deleteDoc(doc(db, "Figure-List", figure.id));
                    setFigures(figures.filter(fig => fig.id !== figure.id));
                    }}></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
    </Table>
    </TableContainer>
    <TablePagination className={style.pagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={figures.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}

export default Admin