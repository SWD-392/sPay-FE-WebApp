import {
  deleteCard,
  getCardsTypeByStoreCate,
  getPromotionById,
  updateCard,
} from "@/app/actions";
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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CardItem = ({ card, storeCate, promotions }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedData, setSelectedData] = useState({});
  const [cardTypeKey, setCardTypeKey] = useState({});

  const handleEdit = () => {
    setSelectedData(card);
    setOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditCard = async (formJson, id) => {
    console.log(formJson);
    console.log(id);
    const res = await updateCard(formJson, id);
    if (res) {
      toast.success("Chỉnh sửa thẻ thành công");
      handleClose();
    } else {
      toast.error("Có lỗi xảy ra khi chỉnh sửa thẻ");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const res = await deleteCard(id);
    if (res) {
      toast.success("Xoá thẻ thành công");
    } else {
      toast.error("Có lỗi xảy ra khi xoá thẻ");
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

  console.log(card.cardTypeName);

  const selectedPromotion = promotions
    ? promotions.items.find(
        (item) => item.promotionPackageKey === selectedData.promotionPackageKey
      )
    : null;

  return (
    <>
      <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 450 }}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            {card.cardName}
          </Typography>
          {/* <Typography variant="h5" component="div"></Typography> */}

          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Thời hạn: {card.numberDate} ngày
          </Typography>
          <Typography variant="body2">
            Chi tiết gói khuyến mãi: {card.description}
          </Typography>
          <Typography variant="body2">
            Gói áp dụng: {card.packageName}
          </Typography>

          <Typography variant="body2">Giá bán gói: {card.price} VND</Typography>

          <Typography variant="body2">
            Giá trị gói: {card.valueUsed} VND
          </Typography>

          <Typography variant="body2">
            Phần trăm khuyến mãi: {card.discountPercentage}%
          </Typography>
          <Typography variant="body2">
            Rút tiền: {card.withdrawAllowed ? "Cho phép" : "Không cho phép"}
          </Typography>
        </CardContent>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <CardActions>
            <Button size="small" onClick={() => handleEdit()}>
              Tuỳ Chỉnh
            </Button>
          </CardActions>
          <CardActions>
            <Button
              color="error"
              size="small"
              onClick={() => handleDelete(card.cardKey)}
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

            handleEditCard(formJson, card.cardKey);
          },
        }}
      >
        <DialogTitle>Chỉnh sửa thẻ</DialogTitle>
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
            value={selectedData.cardName}
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
            value={selectedData.description}
            onChange={handleEditInputChange}
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
            value={selectedData.storeCate}
            onChange={handleEditInputChange}
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
            value={selectedData.cardTypeKey}
            onChange={handleEditInputChange}
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
            value={selectedData.promotionPackageKey || selectedData}
            onChange={handleEditInputChange}
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
            value={
              selectedPromotion?.numberDate || selectedData.numberDate || ""
            }
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
            value={selectedPromotion?.valueUsed || selectedData.valueUsed || ""}
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
            value={
              selectedPromotion?.discountPercentage ||
              selectedData.discountPercentage ||
              ""
            }
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
            value={selectedPromotion?.price || selectedData.price || ""}
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
              selectedPromotion?.withdrawAllowed ||
              selectedData?.withdrawAllowed
                ? "Cho phép"
                : "Không cho phép"
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Chỉnh sửa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardItem;
