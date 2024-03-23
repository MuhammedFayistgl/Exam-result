import { Container } from "@mui/material";
import HeaderResult from "./HeaderResult";
import ResultTable from "./ResultTable";

const ResultPublic = () => {
    return (
        <Container>
            <div className="text-center bg-[#1976d2] text-white flex flex-col p-5">
                <strong className="text-center ">
                    SAMASTHA KERALA ISLAM MATHA <br /> VIDYABYASA BOARD
                </strong>
                <br />
                <span className="text-center  ">THIRUVAMBADI RANGE MADRASA RESULT </span>
            </div>
            <div className="bg-gray-200 my-5 flex flex-col">
                <div className="text-center py-5">
                    <strong>Examination Result {new Date().getFullYear()}</strong>
                </div>
                <HeaderResult />
            </div>
            <ResultTable />
        </Container>
    );
};

export default ResultPublic;


