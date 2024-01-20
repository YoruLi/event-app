import EventsCollection from "@/components/events-collection";
import Loading from "@/components/ui/loader-gallery";
import { getEventByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function EventsProfilePage({ params }: { params: { pages: string } }) {
  const { sessionClaims } = auth();

  const { userId } = sessionClaims?.userId as any;
  const pages = Number(params.pages) || 1;
  const { data: eventsUser } = await getEventByUser({ organizer: userId, pages });

  return (
    <section>
      <h3 className="m-2 -tracking-tight text-center lg:text-start">Your events</h3>
      <React.Suspense fallback={<Loading />}>
        <EventsCollection data={eventsUser} pages={1} totalPages={1} userId={userId} />
      </React.Suspense>
    </section>
  );
}
