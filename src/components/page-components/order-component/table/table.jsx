"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./table.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  DialogActions,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  TableSortLabel,
} from "@mui/material";
// import styles from "./table.module.css";

import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableView({ orderData }) {
  const [data, setData] = useState(orderData);
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setData(orderData); // Update data state whenever storeData changes
  }, [orderData]);

  // Handle cell editing

  const typeMenu = [
    { value: 1, label: "Chuyen tien" },
    { value: 2, label: "Rut tien" },
    { value: 3, label: "Nap tien" },
  ];
  const typeMapping = {
    1: "Chuyen tien",
    2: "Rut tien",
    3: "Nap tien",
  };

  const statusMenu = [
    { value: 1, label: "Success" },
    { value: 2, label: "Cancel" },
    { value: 3, label: "In-Progress" },
  ];
  const statusMapping = {
    1: "Success",
    2: "Cancel",
    3: "In-Progress",
  };

  const handleMapData = (value, fieldName) => {
    if (value === null || value === "null") {
      return "Không có dữ liệu";
    }

    if (fieldName === "col6") {
      // Kiểm tra nếu là categoryID
      switch (
        value // Ánh xạ giá trị categoryID sang văn bản tương ứng
      ) {
        case 1:
          return typeMenu[0].label;
        case 2:
          return typeMenu[1].label;
        case 3:
          return typeMenu[2].label;
        default:
          return value;
      }
    } else if (fieldName === "col7") {
      // Kiểm tra nếu là status
      switch (
        value // Ánh xạ giá trị status sang văn bản tương ứng
      ) {
        case 1:
          return statusMenu[0].label;
        case 2:
          return statusMenu[1].label;
        case 3:
          return statusMenu[2].label;
        default:
          return value;
      }
    }
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    return value; // Replace with your mapped value
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = Array.isArray(data) ? [...data] : [];
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
      <TableContainer sx={{ minWidth: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Define table headers based on your data structure */}
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "no"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("no")}
                >
                  No.
                  {sortConfig.key === "no" ? (
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
                  active={sortConfig.key === "sender"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("sender")}
                >
                  Người gửi
                  {sortConfig.key === "sender" ? (
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
                  active={sortConfig.key === "receiver"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("receiver")}
                >
                  Người nhận
                  {sortConfig.key === "receiver" ? (
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
                  active={sortConfig.key === "descriptionTrans"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("descriptionTrans")}
                >
                  Nội dung
                  {sortConfig.key === "descriptionTrans" ? (
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
                  active={sortConfig.key === "descriptionDetails"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("descriptionDetails")}
                >
                  Chi tiết
                  {sortConfig.key === "descriptionDetails" ? (
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
                  active={sortConfig.key === "amount"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("amount")}
                >
                  Số tiền
                  {sortConfig.key === "amount" ? (
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
                  active={sortConfig.key === "transactionDate"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("transactionDate")}
                >
                  Thời gian giao dịch
                  {sortConfig.key === "transactionDate" ? (
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
                  active={sortConfig.key === "status"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("status")}
                >
                  Trạng thái
                  {sortConfig.key === "status" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items &&
              data.items.map((row) => (
                <TableRow key={row.orderKey}>
                  <TableCell>{row.no}</TableCell>
                  {/* Use map to display data in cells */}
                  <TableCell>{handleMapData(row.sender, "col1")}</TableCell>
                  <TableCell>{handleMapData(row.receiver, "col2")}</TableCell>
                  <TableCell>
                    {handleMapData(row.descriptionTrans, "col3")}
                  </TableCell>
                  <TableCell>
                    {handleMapData(row.descriptionDetails, "col4")}
                  </TableCell>
                  <TableCell>{handleMapData(row.amount, "col5")}</TableCell>
                  <TableCell>
                    {handleMapData(row.transactionDate, "col6")}
                  </TableCell>
                  <TableCell>{handleMapData(row.status, "col7")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableView;
