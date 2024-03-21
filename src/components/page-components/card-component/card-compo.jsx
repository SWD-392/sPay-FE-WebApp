"use client";

import {
  Box,
  Button,
  Card,
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
import React, { useCallback, useEffect, useState } from "react";
import CardItem from "./card-item";
import {
  createCard,
  getCardType,
  getCardsTypeByStoreCate,
} from "@/app/actions";
import { toast } from "react-toastify";

const CardCompo = ({ cards, storeCate, promotions }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedData, setSelectedData] = useState({});
  const [cardTypeKey, setCardTypeKey] = useState({});

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

  const handleAddInputChange = async (event) => {
    const { name, value } = event.target;

    setSelectedData((prev) => ({ ...prev, [name]: value }));
    if (name === "price") {
      setSelectedData((prev) => ({
        ...prev,
        price: selectedData.promotionPackageKey.price,
      }));
    }
    if (name === "numberDate") {
      setSelectedData((prev) => ({
        ...prev,
        numberDate: selectedData.promotionPackageKey.numberDate,
      }));
    }

    if (name === "valueUsed") {
      setSelectedData((prev) => ({
        ...prev,
        valueUsed: selectedData.promotionPackageKey.valueUsed,
      }));
    }

    if (name === "discountPercentage") {
      setSelectedData((prev) => ({
        ...prev,
        discountPercentage: selectedData.promotionPackageKey.discountPercentage,
      }));
    }
    if (name === "withdrawAllowed") {
      setSelectedData((prev) => ({
        ...prev,
        withdrawAllowed: selectedData.promotionPackageKey.withdrawAllowed,
      }));
    }
  };

  useEffect(() => {
    const fetchCardType = async () => {
      const response = await getCardsTypeByStoreCate(selectedData.storeCate);
      setCardTypeKey(response.data.items);
    };

    if (selectedData.storeCate) {
      fetchCardType();
    }
  }, [selectedData.storeCate]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 6);
    router.push(pathname + "?" + queryString);
  };

  const handleAddCard = async (formJson) => {
    console.log(formJson);

    const res = await createCard(formJson);
    if (res) {
      toast.success("Thêm thẻ thành công");
      handleClose();
    } else {
      toast.error("Có lỗi xảy ra khi thêm thẻ");
    }
  };

  const selectedPromotion = promotions
    ? promotions.items.find(
        (item) => item.promotionPackageKey === selectedData.promotionPackageKey
      )
    : null;

  return (
    <Box>
      <Button onClick={handleOpen}> Thêm thẻ mới </Button>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={cards.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
      <Box style={{ display: "flex", flexWrap: "wrap" }}>
        {cards &&
          cards.items &&
          cards.items.map((card) => (
            <Box key={card.cardKey} style={{ margin: "10px" }}>
              <CardItem
                card={card}
                storeCate={storeCate}
                promotions={promotions}
              />
            </Box>
          ))}
      </Box>
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
            if (!formJson.cardName) {
              toast.error("Vui lòng nhập tên gói");
              return;
            }

            if (!formJson.description) {
              toast.error("Vui lòng nhập mô tả ");
              return;
            }

            if (!formJson.storeCate) {
              toast.error("Vui lòng chọn loại cửa hàng ");
              return;
            }
            if (!formJson.cardTypeKey) {
              toast.error("Vui lòng chọn loại thẻ ");
              return;
            }

            if (!formJson.promotionPackageKey) {
              toast.error("Vui lòng chọn gói khuyến mãi");
              return;
            }
            delete formJson.storeCate;
            handleAddCard(formJson);
          },
        }}
      >
        <DialogTitle>Thêm thẻ mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="cardName"
            name="cardName"
            label="Tên thẻ"
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
            onChange={handleAddInputChange}
          >
            {storeCate &&
              storeCate.items.map((item) => (
                <MenuItem
                  key={item.storeCategoryKey}
                  value={item.storeCategoryKey}
                >
                  {item.categoryName}
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
            disabled={!selectedData.storeCate}
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
          >
            {Array.isArray(cardTypeKey) &&
              cardTypeKey.map((item) => (
                <MenuItem key={item.cardTypeKey} value={item.cardTypeKey}>
                  {item.cardTypeName}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            autoFocus
            required
            margin="dense"
            id="promotionPackageKey"
            name="promotionPackageKey"
            label="Gói khuyến mãi"
            fullWidth
            variant="standard"
            select
            // value={promotion.Price}
            onChange={handleAddInputChange}
          >
            {promotions &&
              promotions.items.map((item) => (
                <MenuItem
                  key={item.promotionPackageKey}
                  value={item.promotionPackageKey}
                >
                  {item.packageName}
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
            disabled
            value={selectedPromotion?.numberDate || ""}
            // onChange={handleAddInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="valueUsed"
            name="valueUsed"
            label="Giá trị gói"
            disabled
            fullWidth
            variant="standard"
            value={selectedPromotion?.valueUsed || ""}
            // onChange={handleAddInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="discountPercentage"
            name="discountPercentage"
            label="Khuyến mãi"
            fullWidth
            disabled
            variant="standard"
            value={selectedPromotion?.discountPercentage || ""}
            // onChange={handleAddInputChange}
          />

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
            value={selectedPromotion?.price || ""}
            // onChange={handleAddInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="withdrawAllowed"
            name="withdrawAllowed"
            label="Rút tiền"
            fullWidth
            disabled
            value={
              selectedPromotion?.withdrawAllowed ? "Cho phép" : "Không cho phép"
            }
            // onChange={handleAddInputChange}
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
          <Button
            type="submit"
            //   onClick={handleAddPromotion}
          >
            Thêm gói
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardCompo;
