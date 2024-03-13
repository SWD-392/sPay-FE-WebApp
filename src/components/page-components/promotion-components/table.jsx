import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

const PromotionsTable = ({ cardTypes }) => {
  const [data, setData] = useState(cardTypes);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "cardTypeName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("cardTypeName")}
                >
                  Tên Card
                  {sortConfig.key === "cardTypeName" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "typeDescription"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("typeDescription")}
                >
                  Mô tả
                  {sortConfig.key === "typeDescription" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "withdrawalAllowed"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("withdrawalAllowed")}
                >
                  Rút tiền
                  {sortConfig.key === "withdrawalAllowed" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xoá</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.cardTypeKey}>
                <TableCell>{row.cardTypeName}</TableCell>
                <TableCell>{row.typeDescription}</TableCell>
                <TableCell>
                  {row.withdrawalAllowed ? "Được" : "Không"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRowClick(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteStore(row.storeKey)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PromotionsTable;
