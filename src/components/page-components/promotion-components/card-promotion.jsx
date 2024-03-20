"use client";

import { deletePromotion, updatePromotion } from "@/app/actions";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CardPromotion = ({ promotion }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState(promotion);
  const handleEdit = (data) => {
    setOpen(true); // Open the ButtonAdd component
  };

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const StatusEnum = {
    Active: { value: 1, label: "Hoạt động" },
    InActive: { value: 2, label: "Không hoạt động" },
  };

  const statusArray = Object.keys(StatusEnum).map((key) => ({
    key,
    ...StatusEnum[key],
  }));

  const handleChangeCateValue = (event) => {
    const value = event.target.value;
    setData({ ...data, status: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(data);
    // Call your API to save the data
    // For example:
    // api.saveData(data).then(response => {
    //   if (response.ok) {
    //     // Close the dialog
    //     handleClose();
    //   } else {
    //     // Handle the error
    //     console.error('Failed to save data');
    //   }
    // });
  };

  const moneyValueSelecting = {
    Value_100k: {
      value: 100000,
      label: "100.000",
    },
    Value_200k: {
      value: 200000,
      label: "200.000",
    },
    Value_300k: {
      value: 300000,
      label: "300.000",
    },
    Value_400k: {
      value: 400000,
      label: "400.000",
    },
    Value_500k: {
      value: 500000,
      label: "500.000",
    },
  };

  const moneyValueMapping = Object.keys(moneyValueSelecting).map((key) => ({
    key,
    ...moneyValueSelecting[key],
  }));

  const discountSelecting = {
    Discount_5: { value: 5, label: "5%" },
    Discount_7: { value: 7, label: "7%" },
    Discount_9: { value: 9, label: "9%" },
    Discount_11: { value: 11, label: "11%" },
    Discount_13: { value: 13, label: "13%" },
    Discount_15: { value: 15, label: "15%" },
  };

  const discountMapping = Object.keys(discountSelecting).map((key) => ({
    key,
    ...discountSelecting[key],
  }));

  useEffect(() => {
    const price =
      data.valueUsed - (data.valueUsed * data.discountPercentage) / 100;
    setData((prevState) => ({ ...prevState, price }));
  }, []);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...data,
      [name]: value,
    };

    if (name === "valueUsed" || name === "discountPercentage") {
      const price =
        updatedData.valueUsed -
        (updatedData.valueUsed * updatedData.discountPercentage) / 100;
      updatedData = {
        ...updatedData,
        price,
      };
    }

    setData(updatedData);
  };

  useEffect(() => {
    const { valueUsed, discountPercentage } = data;
    const price = valueUsed - (valueUsed * discountPercentage) / 100;

    setData((prevState) => ({
      ...prevState,
      price,
    }));
  }, [data.valueUsed, data.discountPercentage]);

  //update promotion package
  const handleEditPromotion = async (formJson, promotionPackageKey) => {
    const promotion = {
      packageName: data.packageName,
      description: data.description,
      numberDate: data.numberDate,
      valueUsed: data.valueUsed,
      discountPercentage: data.discountPercentage,
      price: data.price,
      withdrawAllowed: data.withdrawAllowed,
    };
    const res = await updatePromotion(promotion, promotionPackageKey);

    if (res) {
      toast.success("Update promotion success");
    } else {
      console.log("Update promotion failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletePromotion(id);
      if (res) {
        toast.success("Xoá thành công!");
      } else {
        console.log("Delete promotion failed");
      }
    } catch (error) {
      console.error("An error occurred while deleting the promotion:", error);
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 450 }}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            {promotion.packageName}
          </Typography>
          {/* <Typography variant="h5" component="div"></Typography> */}

          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Thời hạn: {promotion.numberDate} ngày
          </Typography>
          <Typography variant="body2">
            Chi tiết gói khuyến mãi: {promotion.description}
          </Typography>
          <Typography variant="body2">
            Giá bán gói: {promotion.price} VND
          </Typography>

          <Typography variant="body2">
            Giá trị gói: {promotion.valueUsed} VND
          </Typography>

          <Typography variant="body2">
            Phần trăm khuyến mãi: {promotion.discountPercentage}%
          </Typography>
          <Typography variant="body2">
            Rút tiền:{" "}
            {promotion.withdrawAllowed ? "Cho phép" : "Không cho phép"}
          </Typography>
        </CardContent>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <CardActions>
            <Button size="small" onClick={() => handleEdit(data)}>
              Tuỳ Chỉnh
            </Button>
          </CardActions>
          <CardActions>
            <Button
              color="error"
              size="small"
              onClick={() => handleDelete(promotion.promotionPackageKey)}
            >
              Xoá
            </Button>
          </CardActions>
        </Box>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            // handleSave(formJson);
            console.log(formJson);
            if (!formJson.packageName) {
              notify("Vui lòng nhập tên gói");
              return;
            }
            if (!formJson.description) {
              notify("Vui lòng nhập mô tả gói");
              return;
            }

            if (!formJson.numberDate || isNaN(formJson.numberDate)) {
              notify("Vui lòng nhập thời hạn gói");
              return;
            }

            if (!formJson.valueUsed) {
              notify("Vui lòng chọn giá trị gói");
              return;
            }
            if (!formJson.discountPercentage) {
              notify("Vui lòng chọn phần trăm khuyến mãi");
              return;
            }

            if (!formJson.withdrawAllowed) {
              notify("Vui lòng chọn quyền rút tiền");
              return;
            }
            handleEditPromotion(formJson, data.promotionPackageKey);
            handleClose();
          },
        }}
      >
        <DialogTitle>Chỉnh sửa gói khuyến mãi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="packageName"
            name="packageName"
            label="Tên gói"
            type="text"
            fullWidth
            variant="standard"
            value={data.packageName}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Mô tả gói"
            type="text"
            fullWidth
            variant="standard"
            value={data.description}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="numberDate"
            name="numberDate"
            label="Thời hạn(ngày)"
            type="number"
            fullWidth
            variant="standard"
            value={data.numberDate}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="valueUsed"
            name="valueUsed"
            label="Giá trị gói"
            type="number"
            fullWidth
            select
            variant="standard"
            value={data.valueUsed}
            onChange={handleEditInputChange}
          >
            {moneyValueMapping.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="discountPercentage"
            name="discountPercentage"
            label="Khuyến mãi"
            fullWidth
            variant="standard"
            select
            value={data.discountPercentage}
            onChange={handleEditInputChange}
          >
            {discountMapping.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Giá bán gói"
            type="number"
            fullWidth
            disabled
            variant="standard"
            value={data.price}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="withdrawAllowed"
            name="withdrawAllowed"
            select
            label="Rút tiền"
            fullWidth
            value={data.withdrawAllowed}
            onChange={handleEditInputChange}
          >
            <MenuItem value={true}>Được phép</MenuItem>
            <MenuItem value={false}>Không được phép</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Chỉnh sửa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardPromotion;
