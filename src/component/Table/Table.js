import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {data} from '../../data'
import { Button } from '@mui/material';


export default function Table() {


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={data.map((item)=> {
            return(
                {id:item.id,Name:item.name,price:item.price}
            )
         })}
        columns={ [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'Name', headerName: 'Name', width: 130 },
            { field: 'price', headerName: 'Price', width: 90,},
            {field: 'action',headerName: 'Predict',
              renderCell: (params) => {
                 const onClick = () => {
                  console.log(params.id)
                  
                 }
          
                
                return <Button onClick={onClick}>Predict</Button>;
            }    
          }]}
        pageSize={5}
        rowsPerPageOptions={[4]}
        sx={{
            padding:'14px',
            marginRight:'20px',
        }}
      />
    </div>
  );
}