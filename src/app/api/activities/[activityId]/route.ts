import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { activitiesTable, usersToActivitiesTable } from "@/db/schema";


const createActivityRequestSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(10).max(300),
  dateStart: z.string(),
  dateEnd: z.string(),
  organizerId: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type createActivityRequest = z.infer<typeof createActivityRequestSchema>;
 
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    createActivityRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Now we can safely use the data from the request body
  // the `as` keyword is a type assertion, this tells typescript
  // that we know what we're doing and that the data is of type LikeTweetRequest.
  // This is safe now because we've already validated the data with zod.
  const { title, description, dateStart, dateEnd, organizerId } = data as createActivityRequest;

  try {
    const newActivity = (await db
      .insert(activitiesTable)
      .values({
        title,
        description, 
        dateStart,
        dateEnd,
        organizer_id: organizerId,
      })
      .returning())[0];
    await db.insert(usersToActivitiesTable).values({
        userId: organizerId,
        activityId: newActivity.displayId,
    })
  } catch (error) {
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}