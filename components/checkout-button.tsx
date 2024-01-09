"use client";
import React from "react";
import { Button } from "./ui/button";

export default function CheckOutButton() {
  React.useEffect(() => {}, []);
  return (
    <form>
      <Button variant={"link"} className="text-xs rounded-full">
        Buy Ticket
      </Button>
    </form>
  );
}
