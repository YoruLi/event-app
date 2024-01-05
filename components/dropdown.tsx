"use client";
import React from "react";

import { startTransition, useEffect, useState } from "react";

import { createCategory, getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput, CommandEmpty } from "./ui/command";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
} from "./ui/alert-dialog";

import { Input } from "./ui/input";

export default function Dropwdown({
  value,
  onChange,
}: {
  value: ICategory[] | [];
  onChange: (category: string[]) => void;
}) {
  const [selected, setSelected] = React.useState<ICategory[]>(value?.length > 1 ? value : []);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (category: ICategory) => {
    setSelected(selected.filter((item) => item._id !== category._id));
  };

  const handleAddCategory = () => {
    createCategory({
      name: newCategory.trim(),
    }).then((category) => {
      setCategories((prev) => [...prev, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`flex justify-between gap-3 h-auto `}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap ">
              {selected?.length && selected.length > 0
                ? selected.map((item) => {
                    const selectedItem = categories.find((option) => option._id === item._id);
                    return (
                      <Badge
                        variant="secondary"
                        key={item._id}
                        className="mr-1 mb-1"
                        onClick={() => handleUnselect(item)}
                      >
                        {selectedItem?.name}
                        <X size={12} className="mx-1" />
                      </Badge>
                    );
                  })
                : "Seleccionar categoria.."}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 relative" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0 ">
          <Command>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>
              Not Category found
              <AlertDialog>
                <AlertDialogTrigger className=" flex justify-center bg-blue-400  rounded py-1 px-2 w-20 text-sm my-1 mx-auto text-white  *:fill-white">
                  Add
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white rounded">
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
                      className="bg-blue-600 hover:bg-blue-800"
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CommandEmpty>
            <CommandGroup className=" w-full h-full max-h-64  overflow-auto  ">
              {categories.map((option) => (
                <CommandItem
                  key={option._id}
                  onSelect={() => {
                    const newSelected = selected?.some((item) => item._id === option._id)
                      ? selected.filter((item) => item._id !== option._id)
                      : [...selected, option];

                    setSelected(newSelected);

                    const updatedSelected = newSelected.map((item) => item._id);

                    onChange(updatedSelected);
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4 opacity-0", {
                      "opacity-100": selected.some((item) => item._id === option._id),
                    })}
                  />
                  {option?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
