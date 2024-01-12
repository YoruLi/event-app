"use client";
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
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";
import { deleteEventFn, deleteAction } from "@/lib/actions/event.actions";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

export function DeleteAction({ id }: { id: string }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const handleDeleteAction = async () => {
    startTransition(async () => await deleteAction(id, pathname, deleteEventFn));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Svg path={svgs.trash.path} viewBox={svgs.trash.viewBox} className="fill-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your event and remove your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteAction()}>
            {isPending ? "Loading..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
