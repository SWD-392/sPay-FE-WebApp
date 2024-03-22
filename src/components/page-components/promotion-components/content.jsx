"use client";
import React, { useCallback } from "react";
import CardPromotion from "@/components/page-components/promotion-components/card-promotion";
import styles from "./content.module.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCardTypeID } from "@/app/actions/card-type";
import { toast } from "react-toastify";
import { createPromotion } from "@/app/actions";
const PromotionCompo = ({ promotions }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputsChanged, setInputsChanged] = useState(false);

  const statusMenu = [
    { value: 1, label: "Active" },
    { value: 2, label: "In Active" },
  ];
  const statusMapping = {
    1: "Active",
    2: "InActive",
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

  const [newPromotionData, setNewPromotionData] = useState({
    packageName: "",
    description: "",
    usaebleAmount: 0,
    discountPercentage: 0,
    price: 0,
    numberDate: 0,
    withdrawAllowed: true,
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    // Parse to number if the input is for 'numberDate'

    if (name === "numberDate") {
      parsedValue = parseInt(value, 10);
    }

    setNewPromotionData({
      ...newPromotionData,
      [name]: parsedValue,
    });

    if (name === "usaebleAmount" || name === "discountPercentage") {
      setInputsChanged(true);
    }
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (page, per_page) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      params.set("per_page", per_page);
      return params.toString();
    },
    [searchParams]
  );

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 6);
    router.push(pathname + "?" + queryString);
  };

  useEffect(() => {
    if (open && inputsChanged) {
      const { usaebleAmount, discountPercentage } = newPromotionData;
      const price = usaebleAmount - (usaebleAmount * discountPercentage) / 100;

      setNewPromotionData((prevState) => ({
        ...prevState,
        price,
      }));

      setInputsChanged(false);
    }
  }, [open, inputsChanged]);

  //add promotion
  const handleAddPromotion = async (formJson) => {
    console.log("formJson", formJson);
    console.log(newPromotionData);
    const promotion = {
      packageName: newPromotionData.packageName,
      description: newPromotionData.description,
      numberDate: newPromotionData.numberDate,
      usaebleAmount: newPromotionData.usaebleAmount,
      discountPercentage: newPromotionData.discountPercentage,
      price: newPromotionData.price,
      withdrawAllowed: newPromotionData.withdrawAllowed,
    };

    const res = await createPromotion(promotion);
    if (res) {
      toast.success("Thêm gói thành công");
      handleClose();
    } else {
      toast.error("Thêm gói thất bại");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}> Thêm gói mới </Button>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={promotions.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
      <div className={styles.display}>
        {promotions &&
          promotions.items.map((promotion) => (
            <CardPromotion key={promotion.cardKey} promotion={promotion} />
          ))}
      </div>

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
            if (!formJson.packageName) {
              toast.error("Vui lòng nhập tên gói");
              return;
            }

            if (!formJson.description) {
              toast.error("Vui lòng nhập mô tả ");
              return;
            }

            if (!formJson.numberDate || isNaN(formJson.numberDate)) {
              toast.error("Vui lòng nhập số ngày hết hạn ");
              return;
            }

            if (!formJson.usaebleAmount) {
              toast.error("Vui lòng chọn giá trị gói");
              return;
            }
            if (!formJson.discountPercentage) {
              toast.error("Vui lòng chọn giá trị khuyến mãi");
              return;
            }

            if (!formJson.withdrawAllowed) {
              toast.error("Vui lòng chọn trạng thái rút tiền");
            }

            handleAddPromotion(formJson);
          },
        }}
      >
        <DialogTitle>Thêm gói khuyến mãi</DialogTitle>
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
            // value={promotion.Name}
            onChange={handleAddInputChange}
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
            // value={promotion.Date}
            onChange={handleAddInputChange}
          />
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="storeCate"
            name="storeCate"
            label="Loại cửa hàng"
            fullWidth
            select
            variant="standard"
            // value={promotion.Promotion}
            onChange={handleStoreCateTypeChange}
          >
            {storeCate &&
              storeCate.items.map((item) => (
                <MenuItem
                  key={item.storeCategoryKey}
                  value={item.storeCategoryKey}
                >
                  {item.storeCategoryName}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="cardTypeKey"
            name="cardTypeKey"
            label="Loại Card"
            fullWidth
            select
            variant="standard"
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
          >
            {cardTypeKey &&
              cardTypeKey.map((item) => (
                <MenuItem key={item.cardTypeKey} value={item.cardTypeKey}>
                  {item.cardTypeName}
                </MenuItem>
              ))}
          </TextField> */}

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
            // value={promotion.Price}
            onChange={handleAddInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="usaebleAmount"
            name="usaebleAmount"
            label="Giá trị gói"
            fullWidth
            select
            variant="standard"
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
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
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
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
            value={newPromotionData.price}
            onChange={handleAddInputChange}
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
            // value={data.withdrawAllowed}
            onChange={handleAddInputChange}
          >
            <MenuItem value={true}>Được phép</MenuItem>
            <MenuItem value={false}>Không được phép</MenuItem>
          </TextField>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="status"
            name="status"
            select
            label="Trạng thái gói"
            fullWidth
            // value={
            //   promotion.status ? statusMapping[promotion.status.value] : ""
            // }
            onChange={handleAddInputChange}
          >
            <MenuItem key="true" value={"Active"}>
              Hoạt động
            </MenuItem>
            <MenuItem key="false" value={"DeActive"}>
              Ngưng hoạt động
            </MenuItem>
          </TextField> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm gói</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PromotionCompo;
