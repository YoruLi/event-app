import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";

export default function Dropwdown({}) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {};

  useEffect(() => {
    const getCategories = async () => {};

    getCategories();
  }, []);

  return (
    <>
      <Select defaultValue={""}>
        <SelectTrigger className="select-field">
          <SelectValue
            placeholder="Category"
            className="!outline-none [--tw-ring-shadow:none] !ring-0 !ring-offset-0 !focus:ring-0 !focus:ring-offset-0 border-0"
          />
        </SelectTrigger>
        <SelectContent>
          {/* {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="select-item p-regular-14"
              >
                {category.name}
              </SelectItem>
            ))} */}

          <AlertDialog>
            <AlertDialogTrigger className="  w-full rounded-sm py-1 grid place-items-center  mx-auto text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              <Svg path={svgs.add.path} viewBox={svgs.add.viewBox} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                  className="bg-violet-600"
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </>
  );
}
