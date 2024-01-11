import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventOrderInfo } from "@/lib/actions/order.actions";
import React from "react";

export default async function OrdersPage({ searchParams }: { searchParams: { eventId: string } }) {
  const { eventId } = searchParams;

  const orderInfo = await getEventOrderInfo({ eventId });

  return (
    <>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Event title</TableHead>
            <TableHead className="text-center">Buyer</TableHead>
            <TableHead className="text-center">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {orderInfo.map((order) => (
              <>
                <TableCell>{order._id}</TableCell>
                <TableCell className="text-center">{order.totalAmount}</TableCell>
                <TableCell className="text-center">{order.eventTitle}</TableCell>
                <TableCell className="text-center">{order.buyer}</TableCell>
                <TableCell className="text-center">{order.createdAt}</TableCell>
              </>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
