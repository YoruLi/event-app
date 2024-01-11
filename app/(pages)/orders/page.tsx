import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
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
import { formatDate } from "@/lib/utils";
import React from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { eventId: string; pages: string };
}) {
  const { eventId } = searchParams;

  const pages = Number(searchParams?.pages) || 1;
  const { data: orderInfo, totalPages } = await getEventOrderInfo({ eventId, pages });

  return (
    <>
      <Table className="hidden md:inline-table">
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
            {orderInfo?.map((order) => (
              <>
                <TableCell>{order._id}</TableCell>
                <TableCell className="text-center">${order.totalAmount}</TableCell>
                <TableCell className="text-center">{order.eventTitle}</TableCell>
                <TableCell className="text-center">{order.buyer}</TableCell>
                <TableCell className="text-center">{order.createdAt}</TableCell>
              </>
            ))}
          </TableRow>
        </TableBody>
      </Table>

      <div className="block md:hidden mx-auto w-full space-y-3">
        {orderInfo?.map((order) => (
          <div key={order._id} className="border border-border p-4 rounded-lg *:text-start">
            <div className="flex gap-2 justify-between *:text-ellipsis">
              <p>{order._id}</p>
              <Badge className="text-center" variant={"outline"}>
                ${order.totalAmount}
              </Badge>
            </div>
            <p className="text-center">Event name: {order.eventTitle}</p>
            <p className="text-center">
              Bought by: <span className="font-bold"> {order.buyer}</span>
            </p>
            <p className="text-center text-xs pt-2">
              {formatDate(new Date(order.createdAt))?.formattedDate}
            </p>
          </div>
        ))}
      </div>

      <Pagination pages={pages} totalPages={totalPages} />
    </>
  );
}
