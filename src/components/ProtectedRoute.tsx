import React from "react";

const ProtectedRoute = ({ Children }) => {
    return <div>{Children}</div>;
};

export default ProtectedRoute;
