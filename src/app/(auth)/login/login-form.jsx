"use client";

import PhoneInputFrame from "@/components/phone-input-frame/phone-input-frame.jsx";
import styles from "./page.module.css";
import Image from "next/image";
import Spaybanner from "@/components/banner/spay-banner";
import { ToastContainer, useToast, useToastContainer } from "react-toastify";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Link from "next/link";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm({});

  // 2. Define a submit handler.
  
  
  return (
    <div className={styles.login}>
      <Spaybanner />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.phoneInputFrameWrapper}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="phonenumber"
              name="phonenumber"
              label="Số điện thoại"
              type="number"
              fullWidth
              variant="standard"
              {...form.register("phonenumber")}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              fullWidth
              variant="standard"
              {...form.register("password")}
            />
            <Link href="/">
              {" "}
              <Button variant="contained">Đăng nhập</Button>{" "}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
