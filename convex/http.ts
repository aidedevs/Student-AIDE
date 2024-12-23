import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter, HttpRouter } from "convex/server";

const http = httpRouter();

export const handlerClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        userId: data.id,
        name: `${data.first_name} ${data.last_name || null}`,
        email: data.email_addresses[0].email_address,
        img: data.image_url,
        role: "STUDENT",
        username: data.username,
        isApproved: false,
      });
      break;
    case "user.updated":
      // Update user logic here
      break;

    default:
      throw new Error("Unsupported type");
  }
  return new Response(null, { status: 200 });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handlerClerkWebhook,
});

// https://diligent-marlin-325.convex.site/clerk-users-webhook
export default http;
