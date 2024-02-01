import styles from "./avatar.module.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarImage from "@public/image/avatar.png";

const AvatarComponent = () => {
  return (
    <>
      <div className={styles.avatarcontainer}>
        <div>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src="@public/image/avatar.png" />
          </Stack>
        </div>
        <div className={styles.avatarTitle}>
          <div className={styles.name}>Spay - admin</div>
          <div className={styles.role}>Admin</div>
        </div>
      </div>
    </>
  );
};

export default AvatarComponent;
