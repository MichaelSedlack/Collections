import React, { useState } from "react";
import ItemCard from "./ItemCard.js";
import TablePagination from "@material-ui/core/TablePagination";

function ItemForm({ items }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (items.length === 0) {
    return (
      <div>
        <p>No Items found.</p>
      </div>
    );
  }

  return (
    <div>
      <TablePagination
        labelRowsPerPage="Items Per Page"
        component="div"
        count={items.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <br />
      {items
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => {
          return (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          );
        })}

      <TablePagination
        labelRowsPerPage="Items Per Page"
        component="div"
        count={items.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ItemForm;
