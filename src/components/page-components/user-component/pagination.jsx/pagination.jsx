"use client";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import UserTable from "../table";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createUser } from "@/app/actions";
import { toast } from "react-toastify";

const PaginationComponentUser = ({
  users,
  cardTypes,
  storeTypes,
  promotions,
  cards,
}) => {
  const [loading, setLoading] = useState(true); // add loading state
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const [form, setForm] = useState([]);

  const handleAddUser = async () => {
    const res = await createUser();

    if (res) {
      toast.success("Thêm người dùng thành công");
      setOpen(false);
    } else {
      toast.error("Thêm người dùng thất bại");
    }
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (page, per_page, search) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      params.set("per_page", per_page);
      return params.toString();
    },
    [searchParams]
  );

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  const handlePageChange = (value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 5);
    router.push(pathname + "?" + queryString);
    setLoading(true);
  };
  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
    // render loading message if loading is true
  }

  return (
    <div>
      <Box>
        <Button onClick={() => openModal()} color="primary">
          {" "}
          Thêm người dùng
        </Button>
      </Box>
      <UserTable
        data={users}
        cardTypes={cardTypes}
        storeTypes={storeTypes}
        promotions={promotions}
        cards={cards}
      />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={currentPage}
          count={users.totalPages}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Stack>

      <Dialog open={open}>
        <Box>
          <h1>Thêm người dùng</h1>
        </Box>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            id="fullname"
            label="Tên người dùng"
            placeholder="Nhập tên người dùng"
            type="text"
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            id="phoneNumber"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            type="number"
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            id="fullname"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => closeModal()}>Đóng</Button>
          <Button onClick={() => handleAddUser()}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaginationComponentUser;
