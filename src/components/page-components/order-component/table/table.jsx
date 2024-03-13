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
                  active={sortConfig.key === "fromCustomer"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("fromCustomer")}
                >
                  Khách hàng
                  {sortConfig.key === "fromCustomer" ? (
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
                  active={sortConfig.key === "toStore"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("toStore")}
                >
                  Cửa hàng
                  {sortConfig.key === "toStore" ? (
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
                  active={sortConfig.key === "cardName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("cardName")}
                >
                  Loại card sử dụng
                  {sortConfig.key === "cardName" ? (
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
                  active={sortConfig.key === "orderDescription"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("orderDescription")}
                >
                  Nội dung đơn
                  {sortConfig.key === "orderDescription" ? (
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
                  active={sortConfig.key === "value"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("value")}
                >
                  Số tiền
                  {sortConfig.key === "value" ? (
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
                  active={sortConfig.key === "date"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("date")}
                >
                  Ngày giao dịch
                  {sortConfig.key === "date" ? (
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
                  <TableCell>
                    {handleMapData(row.fromCustomer, "col1")}
                  </TableCell>
                  <TableCell>{handleMapData(row.toStore, "col2")}</TableCell>
                  <TableCell>{handleMapData(row.cardName, "col3")}</TableCell>
                  <TableCell>
                    {handleMapData(row.orderDescription, "col4")}
                  </TableCell>
                  <TableCell>{handleMapData(row.value, "col5")}</TableCell>
                  <TableCell>{handleMapData(row.date, "col6")}</TableCell>
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
