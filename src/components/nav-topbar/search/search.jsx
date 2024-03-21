"use client";

import { Box, IconButton, InputBase, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({ users }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (search) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    const queryString = createQueryString(input);
    const newRoute = String(pathname) + "?" + queryString;
    router.push(newRoute);
  };

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 40,
        mt: 2,
        mr: 2,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm kiếm"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleInputChange}
      />
      <IconButton
        onClick={handleSearch}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
