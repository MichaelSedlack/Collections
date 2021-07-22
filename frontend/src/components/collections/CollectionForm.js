import React, { useState } from "react";
import CollectionCard from "./CollectionCard.js";
import TablePagination from "@material-ui/core/TablePagination";

function CollectionForm({ collections }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (collections.length === 0) {
    return (
      <div>
        <p>No collections found.</p>
      </div>
    );
  }

  return (
    <div>
      <TablePagination
        labelRowsPerPage="Collections Per Page"
        component="div"
        count={collections.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <br />
      {collections
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((collection) => {
          return (
            <div key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          );
        })}

      <TablePagination
        labelRowsPerPage="Collections Per Page"
        component="div"
        count={collections.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default CollectionForm;
