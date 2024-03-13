"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const TestPage = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  // api.axios("url?page=${page}&pageSize=${pageSize}")

  // button click router.push(url)
  console.log(page);
  return <div>Test page</div>;
};

export default TestPage;
