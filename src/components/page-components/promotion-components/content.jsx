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
const PromotionCompo = ({ promotions, storeCate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    cardTypeKey: "",
    cardNumber: "",
    numberDate: 0,
    name: "",
    description: "",
    discountPercentage: 0,
    price: 0,
    moneyValue: 0,
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotionData({
      ...newPromotionData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log("new promotiondata", newPromotionData);
  }, [newPromotionData]);

  useEffect(() => {
    const { moneyValue, discountPercentage } = newPromotionData;
    const price = moneyValue - (moneyValue * discountPercentage) / 100;

    setNewPromotionData((prevState) => ({
      ...prevState,
      price,
    }));
  }, [newPromotionData.moneyValue, newPromotionData.discountPercentage]);

  //add store
  const handleAddPromotion = async () => {
    try {
      console.log(newPromotionData);
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStoreData),
      });
      if (!response.ok) {
        throw new Error("Failed to add store");
      }
      // Xử lý thành công, đóng dialog hoặc thực hiện các thao tác khác
      handleClose();
    } catch (error) {
      console.error("Error adding store:", error);
      // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
    }
  };

  const [loading, setLoading] = useState(true); // add loading state
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

  console.log(searchParams);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 6);
    router.push(pathname + "?" + queryString);
    setLoading(true);
  };
  useEffect(() => {
    if (promotions) {
      setLoading(false);
    }
  }, [promotions]);

  const [cardTypeKey, setCardTypeKey] = useState([]);

  const handleStoreCateTypeChange = async (event) => {
    const storeCate = event.target.value;
    // call the getCardType(id)
    console.log("storecate", storeCate);
    try {
      const result = await getCardTypeID(storeCate);
      // use the result here
      const cardTypeKeyss = result.data;
      setCardTypeKey(cardTypeKeyss);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCard = async () => {
    createStore(newPromotionData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            if (!formJson.name) {
              alert("Vui lòng nhập tên gói");
              return;
            }

            if (!formJson.description) {
              alert("Vui lòng nhập mô tả ");
              return;
            }

            if (!formJson.storeCate) {
              alert("Vui lòng chọn loại cửa hàng ");
              return;
            }

            if (!formJson.cardTypeKey) {
              alert("Vui lòng chọn loại card ");
              return;
            }

            if (!formJson.numberDate || isNaN(formJson.numberDate)) {
              alert("Vui lòng nhập số ngày hết hạn ");
              return;
            }

            if (!formJson.moneyValue) {
              alert("Vui lòng chọn giá trị gói");
              return;
            }
            if (!formJson.discountPercentage) {
              alert("Vui lòng chọn giá trị khuyến mãi");
              return;
            }
            handleAddCard();
            handleClose();
          },
        }}
      >
        <DialogTitle>Thêm gói khuyến mãi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
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
          <TextField
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
            {storeCate.map((item) => (
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
            {cardTypeKey.map((item) => (
              <MenuItem key={item.cardTypeKey} value={item.cardTypeKey}>
                {item.cardTypeName}
              </MenuItem>
            ))}
          </TextField>

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
            id="moneyValue"
            name="moneyValue"
            label="Giá trị gói"
            fullWidth
            select
            variant="standard"
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
          >
            {moneyValueMapping.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}đ
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
          <Button type="submit" onClick={handleAddPromotion}>
            Thêm gói
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PromotionCompo;
