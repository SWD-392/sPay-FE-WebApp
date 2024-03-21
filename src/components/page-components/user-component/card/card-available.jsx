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
      <Card sx={{ minWidth: 250, maxWidth: 250, minHeight: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            {data.cardTypeName}
          </Typography>

          <Typography variant="body2">
            Thời hạn: {data.dateNumber} ngày
          </Typography>
          <Typography variant="body2">
            Chi tiết gói khuyến mãi: {data.description}
          </Typography>
          <Typography variant="body2">Giá bán gói: {data.price} VND</Typography>

          <Typography variant="body2">
            Số tiền khách dùng: {data.moneyValue} VND
          </Typography>

          <Typography variant="body2">
            Phần trăm khuyến mãi: {data.discountPercentage}%
          </Typography>
          <Typography variant="body2">Loại thẻ: {data.cardTypeName}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onChoose}>
            Chọn gói
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardAvailable;
