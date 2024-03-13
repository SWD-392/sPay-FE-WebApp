"use client";

import Link from "next/link";
import styles from "./sidebar-button.module.css";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SidebarButton = ({ title, href }) => {
  const router = useRouter();

  const pathname = usePathname();
  const isActive = pathname === href;

  // console.log("href", href);
  // console.log("pathname", pathname);
  // console.log("isActive", isActive);

  return (
    <div className={styles.buttonFrame}>
      <Link href={href}>
        <Button
          className={`${styles.button} ${isActive ? styles.activeButton : ""}`}
          variant="contained"
        >
          {title}
        </Button>
      </Link>
    </div>
  );
};
export default SidebarButton;
