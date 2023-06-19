import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import useCustomTable from "./useCustomTable";

export default function CustomTable({ columns = null, url, maxWidth }) {
  const { tableData } = useCustomTable({ url });
  const { rows, length, isLoading, page, setPage } = tableData;
const {deleteMutate} = useCustomTable('store')
  return (
    <div style={{ height: "70vh", width: maxWidth || "100%" }}>
      <DataGrid
        // components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={[...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 110,
            renderCell: ({ row }) => (
              <Stack direction="row" spacing={2}>
                <Typography
                  color="primary.main"
                  sx={{ cursor: "pointer" }}
                  // todo : call navigate here
                  // onClick={() => setDefaultData(row)}
                >
                  Edit
                </Typography>
                <Typography
                  color="error.main"
                  sx={{ cursor: "pointer" }}
                  // todo : call on delete here
                  onClick={() =>
                    deleteMutate(row.id, {
                      onSuccess: toast.success("Deleted Successfully"),
                    })
                  }
                >
                  Delete
                </Typography>
              </Stack>
            ),
          },
        ]}
        rowCount={length || 0}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        pagination
        page={page}
        pageSize={10}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        sx={{
          "& .MuiDataGrid-cell:last-child,& .MuiDataGrid-columnHeader:last-child":
            {
              // backgroundColor: "white",
              // position: "sticky",
              // right: 0,
              // borderLeft: "1px whitesmoke solid",
            },
        }}
      />
    </div>
  );
}
