import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "./utils/AxiosInstence";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, steResult } from "../Redux/ResultSlice";
import { RootState } from "../Types/ReduxType";
const HeaderResult = () => {
    const [Madrasa, setMadrasa] = useState(null);
    const [Class, setClass] = useState(null);
    const [Year, setYear] = useState(null);

    // fetch uploaded data
    const [MadrasaData, setMadrasaData] = useState(null);
    const [ClassData, setClassData] = useState(null);

    const { loading } = useSelector((state: RootState) => state.Result);

    const Dispatch = useDispatch();

    const submitHandler = () => {
        if (Madrasa == null) {
            toast(" pleas select Your Madrasa", { type: "error" });
        } else if (Year == null) {
            toast(" pleas select Year", { type: "error" });
        } else if (Class == null) {
            toast(" pleas select Your Class", { type: "error" });
        } else {
            Dispatch(setLoading(true));
            AxiosInstance.post("user/search", { Madrasa: Madrasa, Class: Class, Year: Year }).then((data) => {
                Dispatch(steResult(data.data));
                Dispatch(setLoading(false));
            });
        }
    };
    useEffect(() => {
        if (MadrasaData == null) {
            AxiosInstance.get("user/getMadrasa").then((data) => setMadrasaData(data.data));
        }
        if (ClassData == null) {
            AxiosInstance.get("user/getClass").then((data) => setClassData(data.data));
        }
        return () => {};
    }, [MadrasaData, ClassData]);

    return (
        <Container>
            <div className="flex gap-2 flex-wrap ">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={!MadrasaData}
                    options={MadrasaData}
                    // value={Madrasa}
                    sx={{ width: 200 }}
                    onSelect={(e: BaseSyntheticEvent) => setMadrasa(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Your Madrasa" />}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={YearData}
                    disabled={!YearData}
                    sx={{ width: 200 }}
                    onSelect={(e: BaseSyntheticEvent) => setYear(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Year" />}
                />
                <Autocomplete
                    disablePortal
                    // value={Class}
                    id="combo-box-demo"
                    options={ClassData}
                    disabled={!ClassData}
                    sx={{ width: 150 }}
                    onSelect={(e: BaseSyntheticEvent) => setClass(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Class" />}
                />
            </div>
            <div className="py-4">
                <LoadingButton onClick={submitHandler} size="medium" loading={loading} loadingIndicator="Loading…" variant="contained">
                    Submit
                </LoadingButton>
            </div>
        </Container>
    );
};

export default HeaderResult;

const YearData = ["2024"];
