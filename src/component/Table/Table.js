import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { data  as dataSet} from "../../data";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PredictionChart from "../LineChart/PredictionChart";
import styles from "./styles.module.css"

export default function Table() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (row) => {
    setName(row.Name);
    setOpen(true);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5, 15, 20]}
        rows={dataSet.map((item) => {
          return { id: item.id, Name: item.name, price: item.price };
        })}
        columns={[
          { field: "id", headerName: "ID", width: 150},
          { field: "Name", headerName: "Name", width: 300 },
          { field: "price", headerName: "Price", width: 150 },
          {
            field: "action",
            headerName: "Predict",
            renderCell: (params) => {
              return (
                <Button
                  sx={{
                    color: "black",
                    backgroundColor: "#acacac3d",
                    padding: "7px",
                  }}
                  onClick={() => handleOpen(params.row)}
                >
                  Predict
                </Button>
              );
            },
          },
        ]}
        sx={{
          padding: "10px",
          width: "70%",
          margin: "auto",
        }}
      />

        <Modal open={open} onClose={handleClose}>
          <div className={styles.chart} >
            <PredictionChart name={name}/>
          </div>
        </Modal>

    </div>
  );
}
