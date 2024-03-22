import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const CardAvailable = ({ data, onChoose }) => {
  return (
    <div style={{}}>
      <Card
        sx={{ minWidth: 250, maxWidth: 250, minHeight: 400, maxHeight: 400 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            {data.cardName}
          </Typography>
          z
          <Typography variant="body2">Loại thẻ: {data.cardTypeName}</Typography>
          <Typography variant="body2">
            Chi tiết gói khuyến mãi: {data.description}
          </Typography>
          <Typography variant="body2">Giá bán gói: {data.price} VND</Typography>
          <Typography variant="body2">
            Tiền được dùng: {data.usaebleAmount} VND
          </Typography>
          <Typography variant="body2">
            Khuyến mãi: {data.discountPercentage} VND
          </Typography>
          <Typography variant="body2">
            Rút tiền: {data.withdrawAllowed ? "Có" : "Không"}
          </Typography>
          <Typography variant="body2">Thời hạn: {data.numberDate}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onChoose(data.cardKey)}>
            Chọn gói
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardAvailable;
