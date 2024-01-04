import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("WEBHOOK SECRET was not provided");
  }

  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_signature || !svix_timestamp) {
    return NextResponse.json("No svix headers...", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webHook = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = webHook.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    });
  } catch (error) {
    console.error("Error verifying clerk Webhook: ", error);

    return NextResponse.json("Error ocurred", {
      status: 500,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with the id of ${id} and type ${eventType}`);

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_addresses,
      username,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    // const newUser = await createUser(user)
  }
  return NextResponse.json("", { status: 200 });
}
