import React, { useState } from "react";
import RoomCard from "./RoomCard.js";
import TablePagination from "@material-ui/core/TablePagination";

function RoomForm({ rooms }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (rooms.length === 0) {
    return (
      <div>
        <p>No rooms found.</p>
      </div>
    );
  }

  return (
    <div>
      <TablePagination
        labelRowsPerPage="Rooms Per Page"
        component="div"
        count={rooms.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <br />
      {rooms
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((room) => {
          return (
            <div key={room.id}>
              <div>
                <RoomCard room={room} />
              </div>
            </div>
          );
        })}

      <TablePagination
        labelRowsPerPage="Rooms Per Page"
        component="div"
        count={rooms.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default RoomForm;
