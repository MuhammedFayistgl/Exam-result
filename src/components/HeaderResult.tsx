import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "./utils/AxiosInstence";
import { useDispatch } from "react-redux";
import { steResult } from "../Redux/ResultSlice";
const HeaderResult = () => {
    const [Madrasa, setMadrasa] = useState(null);
    const [Class, setClass] = useState(null);
    const [Year, setYear] = useState(null);

    // fetch uploaded data
    const [MadrasaData, setMadrasaData] = useState(null);
    const [ClassData, setClassData] = useState(null);

    const Dispatch = useDispatch();

    const submitHandler = () => {
        if (Madrasa == null) {
            toast(" pleas select Your Madrasa", { type: "error" });
        } else if (Year == null) {
            toast(" pleas select Year", { type: "error" });
        } else if (Class == null) {
            toast(" pleas select Your Class", { type: "error" });
        } else {
            AxiosInstance.post("user/search", { Madrasa: Madrasa, Class: Class, Year: Year }).then((data) => {
                Dispatch(steResult(data.data));
            });
        }
    };
    useEffect(() => {
        AxiosInstance.get("user/getMadrasa").then((data) => setMadrasaData(data.data));
        AxiosInstance.get("user/getClass").then((data) => setClassData(data.data));
        return () => {};
    }, []);

    return (
        <Container>
            <div className="flex gap-2 flex-wrap ">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={MadrasaData}
                    // value={Madrasa}
                    sx={{ width: 200 }}
                    onSelect={(e) => setMadrasa(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Your Madrasa" />}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={YearData}
                    sx={{ width: 200 }}
                    onSelect={(e) => setYear(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Year" />}
                />
                <Autocomplete
                    disablePortal
                    // value={Class}
                    id="combo-box-demo"
                    options={ClassData}
                    sx={{ width: 150 }}
                    onSelect={(e) => setClass(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="Select Class" />}
                />
            </div>
            <div className="py-4">
                <LoadingButton onClick={submitHandler} size="medium" loading={false} loadingIndicator="Loading…" variant="contained">
                    Submit
                </LoadingButton>
            </div>
        </Container>
    );
};

export default HeaderResult;

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

const YearData = ["2024"];
