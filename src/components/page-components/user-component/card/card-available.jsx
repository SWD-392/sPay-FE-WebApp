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
            Chi tiết gói khuyến mãi: {data.cardDescription}
          </Typography>
          <Typography variant="body2">
            Loại cửa hàng: {data.storeCateName}
          </Typography>
          <Typography variant="body2">Số dư: {data.balance} VND</Typography>
          <Typography variant="body2">
            Giá trị gói: {data.usaebleAmount} VND
          </Typography>
          <Typography variant="body2">
            Rút tiền: {data.withdrawAllowed ? "Có" : "Không"}
          </Typography>
          <Typography variant="body2">Hết hạn: {data.expiredDate}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => onChoose(data.userKey, data.cardKey)}
          >
            Chọn gói
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardAvailable;
