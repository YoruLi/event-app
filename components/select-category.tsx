"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { getAllCategories } from "@/lib/actions/category.actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelecCategory() {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  //   change params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  React.useEffect(() => {
    const getCategories = async () => {
      const list = await getAllCategories();
      list && setCategories(list as ICategory[]);
    };

    getCategories();
  }, []);

  const handleSelectCategory = (c: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (c !== "ALL") {
      newSearchParams.set("category", c);
    } else {
      newSearchParams.delete("category");
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <>
      <Select onValueChange={(value) => handleSelectCategory(value)}>
        <SelectTrigger className="max-w-32">
          <SelectValue placeholder="Category..." />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="ALL">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
