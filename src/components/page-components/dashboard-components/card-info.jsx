import Image from "next/image";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import styles from "./card-info.module.css";

export default function CardInfo({ name, amount, icon, detail }) {
  return (
    <>
      <Card
        sx={{
          minWidth: 100,
          minHeight: 160,
          maxWidth: 240,
          maxHeight: 155,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h5" component="div">
            {amount}
          </Typography>
        </CardContent>
        <div className={styles.icon}>
          <CardActions>
            <Image src={icon} alt="Icon" />
          </CardActions>
        </div>
      </Card>
    </>
  );
}
