"use client";
import React, { useState } from "react";
import StateTable from "./component/StateTable";
const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-end md:items-end justify-between mb-6">
        <div>
          <h1 className="text-[#0E0F11] text-[28px] leading-[1] font-[600]">
            state wise categories
          </h1>
        </div>
      </div>{" "}
      <div>
        <StateTable />
      </div>
    </div>
  );
};

export default page;
