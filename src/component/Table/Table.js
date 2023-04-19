import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "../../data";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { predict } from "../../mock/api/predict";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Table() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (row) => {
    setName(row.Name);
    setOpen(true);
  };

  const result = predict.result;

  const labels = result.map((item) => {
    return Object.keys(item);
  });

  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
          color: "black",
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 15,
        },
        color: "black",
      },
    },

    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${name}`,
        font: {
          size: 25,
          family: "Poppins, sans-serif",
        },
      },
    },
  };

  const predictdata = {
    labels,
    datasets: [
      {
        label: "actual",
        borderColor: "rgb(53, 162, 235)",
        data: result.map((item) => {
          return item[Object.keys(item)[0]].actual;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "predict",
        borderColor: "rgb(255, 99, 132)",
        data: result.map((item) => {
          return item[Object.keys(item)[0]].predict;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
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
        rows={data.map((item) => {
          return { id: item.id, Name: item.name, price: item.price };
        })}
        columns={[
          { field: "id", headerName: "ID", width: 150 },
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
      {
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Line
              style={{ width: "100%" }}
              options={options}
              data={predictdata}
            />
          </Box>
        </Modal>
      }
    </div>
  );
}
