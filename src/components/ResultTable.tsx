import { Box, Button } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Types/ReduxType";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Result } from "../Types/StudentType";

const ResultTable = () => {
    const { value } = useSelector((state: RootState) => state.Result);

   

    //simple column definitions pointing to flat data
    const columns = useMemo<MRT_ColumnDef<Result>[]>(
        () => [
            {
                accessorKey: "Name", //simple recommended way to define a column
                header: "Name",
                muiTableHeadCellProps: { style: { color: "black" } }, //custom props
                enableHiding: true, //disable a feature for this column
            },
            {
                accessorFn: (originalRow) => parseInt(originalRow.Class), //alternate way
                id: "Class", //id required if you use accessorFn instead of accessorKey
                header: "Class",
                Header: <i style={{ color: "black" }}>Class</i>, //optional custom markup
                Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>, //optional custom cell render
            },
            {
                accessorKey: "Result", //simple recommended way to define a column
                header: "Result",
                muiTableHeadCellProps: { style: { color: "green" } }, //custom props
                enableHiding: true, //disable a feature for this column
                Cell: ({ cell }) => <i>{"Pass"}</i>, 
            },
        ],
        []
    );
    const table = useMaterialReactTable({
        columns,
        data:value, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    padding: "8px",
                    flexWrap: "wrap",
                }}>
                <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                    startIcon={<FileDownloadIcon />}>
                    Export All Rows
                </Button>
                {/* <Button
                    disabled={table.getRowModel().rows.length === 0}
                    //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}>
                    Export Page Rows
                </Button>
                <Button
                    disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                    //only export selected rows
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}>
                    Export Selected Rows
                </Button> */}
            </Box>
        ),
    });

    const handleExportRows = (rows: any[]) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => Object.values(row.original));
        const tableHeaders = columns.map((c) => c.header);
        console.log("tableData", tableData);
        console.log("tableHeaders", tableHeaders);
        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save("mrt-pdf-example.pdf");
    };
    return <MaterialReactTable table={table} />;
};

export default ResultTable;
