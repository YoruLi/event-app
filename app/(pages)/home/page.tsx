import GetAllEvents from "@/components/get-all-events";
import Search from "@/components/search";
import SelecCategory from "@/components/select-category";
import Loading from "@/components/ui/loader-image";

import React from "react";

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function HomePage({ searchParams }: SearchParamProps) {
  const q = (searchParams?.query as string) || "";
  const pages = Number(searchParams?.pages) || 1;
  const category = (searchParams?.category as string) || "";

  return (
    <div>
      <section className="flex gap-2">
        <Search placeholder="What are you searching for?" />
        <SelecCategory />
      </section>

      <section id="events" className=" my-8 flex flex-col gap-8 md:gap-12">
        <React.Suspense key={category} fallback={<Loading />}>
          <GetAllEvents pages={pages} query={q} category={category} />
        </React.Suspense>
      </section>
    </div>
  );
}
