"use client";

import PhoneInputFrame from "@/components/phone-input-frame/phone-input-frame.jsx";
import styles from "./page.module.css";
import Image from "next/image";
import Spaybanner from "@/components/banner/spay-banner";
import {
  ToastContainer,
  toast,
  useToast,
  useToastContainer,
} from "react-toastify";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formValues, setFormValues] = useState({});

  const handleSubmit = async () => {
    setLoading(true);
    const res = await login(formValues);

    // const token = res.data.accessToken;
    // if (token) {
    //   localStorage.setItem("token", token);
    // }
    // if (res.error) {
    //   toast.error(res.error);
    // } else {
    //   router.push("/");
    // }
    router.push("/");
  };

  return (
    <div className={styles.login}>
      <Spaybanner />
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
          onChange={(e) =>
            setFormValues({ ...formValues, phonenumber: e.target.value })
          }
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
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
        />

        <Button onClick={() => handleSubmit()} variant="contained">
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
