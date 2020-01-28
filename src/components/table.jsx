import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";


const Table = ({ columns, data }) => {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader columns={columns} />

        <TableBody columns={columns} data={data} />
      </table>
    </React.Fragment>
  );
};

export default Table;