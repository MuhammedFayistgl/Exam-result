import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Box,
    Container,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from "@mui/material";
import { MaterialReactTable, MRT_EditActionButtons, useMaterialReactTable } from "material-react-table";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { AxiosInstance } from "./utils/AxiosInstence";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";


const Admin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [BTNloading, setBTNLoading] = useState(false);

    const [Name, setName] = useState("");
    const [Class, setClass] = useState(null);
    const [Madrasa, setMadrasa] = useState(null);
    // console.log("Name:", Name, "Class:", typeof Class, "Madrasa:", Madrasa);
    const fetchData = async () => {
        setLoading(true);
        const response = await AxiosInstance.post("admin/get-all-students");
        setData(response.data);
        setLoading(false);
        setBTNLoading(false);
    };

    const UploadHandler = async () => {
        if (Name.trim() == "") {
            toast("Name is Required", { type: "error" });
        } else if (Madrasa == null) {
            toast("Please select your Madrasa", { type: "error" });
        } else if (Class === null) {
            toast("Class is Required", { type: "error" });
        } else {
            setBTNLoading(true);
            const uploadData = { Name: Name, Class: Class, Madrasa: Madrasa };

            AxiosInstance.post("admin/create-user", uploadData).then(() => fetchData());
        }
    };
    const handleCreateUser = async (data) => {
        AxiosInstance.post("admin/create-user", data?.values).then(() => fetchData());
        // console.log(data?.values)
    };
    useEffect(() => {
        fetchData();

        return () => {};
    }, []);

    //simple column definitions pointing to flat data
    const columns = [
        {
            accessorKey: "Name", //simple recommended way to define a column
            header: "Student Name",
            muiTableHeadCellProps: { style: { color: "black" } }, //custom props
            enableHiding: true, //disable a feature for this column
        },
        {
            accessorKey: "Class", //simple recommended way to define a column
            header: "Class",
            muiTableHeadCellProps: { style: { color: "black" } }, //custom props
            enableHiding: true, //disable a feature for this column
            size: 30,
            editSelectOptions: AllClass,
        },

        {
            accessorFn: (originalRow: { isPass: boolean }) => originalRow?.isPass, //alternate way
            id: "isPass", //id required if you use accessorFn instead of accessorKey
            header: "Result",
            enableEditing: false,
            Header: <i style={{ color: "black" }}>Result</i>, //optional custom markup

            Cell: ({ cell }) => (cell.getValue() ? <i style={{ color: "blue" }}>{"Pass"}</i> : <i style={{ color: "red" }}>{"fail"}</i>), //optional custom cell render
        },
        {
            accessorKey: "_id", //simple recommended way to define a column
            header: "id",
            muiTableHeadCellProps: { style: { color: "black" } }, //custom props
            enableHiding: true, //disable a feature for this column
            enableEditing: false,
        },
    ];
    const openDeleteConfirmModal = (row) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(row.original._id);
        }
    };

    const deleteUser = (_id) => {
        AxiosInstance.post("admin/delete-user", { _id: _id }).then(() => fetchData());
    };
    const handleEditingUser = (row) => {
        AxiosInstance.post("admin/edit-user", row.values).then(() => fetchData());
    };

    const table = useMaterialReactTable({
        columns,
        data: data.reverse(), //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnActions: true,
        enableEditing: true,
        enableColumnFilters: true,
        enablePagination: true,
        enableSorting: true,
        enableRowSelection: true,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),

        onEditingRowSave: handleEditingUser,
        onCreatingRowSave: handleCreateUser,
        state: {
            isLoading: loading,
            // isSaving:Error,
            // showAlertBanner: Error,
            // showProgressBars:Error,
        },
    });

    return (
        <Container>
            <div className="flex flex-col gap-4">
                <div>
                    <strong className="text-rose-500 mt-6">Admin Only</strong>
                </div>
                <div className="bg-gray-100  p-3 ">
                    <div className="flex flex-rew  gap-4 flex-wrap mb-4">
                        <TextField
                            helperText={Error && "Pleas fill all Field"}
                            size="small"
                            label="Student Name"
                            variant="filled"
                            onChange={(e:BaseSyntheticEvent) => setName(e.target.value)}
                        />
                        <Autocomplete
                            onSelect={(e:BaseSyntheticEvent) => setMadrasa(e.target.value)}
                            size="small"
                            disablePortal
                            options={MADRASA}
                            onClose={() => setMadrasa(null)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="MADRASA" />}
                        />
                        <Autocomplete
                            size="small"
                            onSelect={(e:BaseSyntheticEvent) => setClass(e.target.value)}
                            disablePortal
                            options={AllClass}
                            sx={{ width: 100 }}
                            renderInput={(params) => <TextField  {...params} label="Class" />}
                        />
                    </div>
                    <span>
                        <LoadingButton
                            onClick={UploadHandler}
                            size="small"
                            loading={BTNloading}
                            loadingIndicator="Loading…"
                            variant="outlined">
                            Upload Result
                        </LoadingButton>
                    </span>
                </div>

                <br />
            </div>
            <section>
                <MaterialReactTable table={table} />
            </section>
        </Container>
    );
};

export default Admin;

const MADRASA = [
    " 1081 NOORUL ISLAM THAZHE THIRUVAMBADY ",

    " 1391 HAYATHUL ISLAM KOODARANJI ",

    " 1488 MUNAVVIRUL ISLAM THIRUVAMBADI TOWN ",

    "2494 NUSRATHUL ISLAM ANAKKAMPOYIL ",

    "2831 MASLAKUL ISLAM PUNNAKKAL ",

    "2874 MUNAVVIRUL ISLAM  KULIRAMUTTI",

    "3400 MUNAVVIRUL ISLAM   KOODARANJI",

    " 4200 MIFTHAHUL ULOOM PAMBIZHANJA PARA ",

    " 4813 MADRASSATHUL MUHAMMADIYYA MURAMBATHI ",

    "   6625 IHYAUL ULOOM  MARANCHATTI",

    " 7806 MUNAVVIRUL ISLAM PERUMBOOLA",

    " 10608 NOORUL HUDA SECONDARY MADRASA",
];

const AllClass = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
