import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
// import { eq } from "drizzle-orm";

import { db } from "@/db";
import { activitiesTable, usersToActivitiesTable } from "@/db/schema";
// import { editLocationSchema } from "@/validators/updateActivity";


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
    const [newActivity] = (await db
      .insert(activitiesTable)
      .values({
        title,
        description, 
        dateStart,
        dateEnd,
        organizer_id: organizerId,
      })
      .returning());
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


// Define a schema for activity update request
// const updateActivityRequestSchema = z.object({
//   activityId: z.string().uuid(), // Ensure that the activityId is a valid UUID
//   title: z.string().min(1).max(30).optional(),
//   description: z.string().min(10).max(300).optional(),
//   dateStart: z.string().optional(),
//   dateEnd: z.string().optional(),
// });

// // Infer the TypeScript type from the zod schema
// type UpdateActivityRequest = z.infer<typeof updateActivityRequestSchema>;

// // PUT method to handle updating an activity's details
// export async function PUT(request: NextRequest) {
//   const data = await request.json();

//   // Validate the incoming request data
//   let validatedData: UpdateActivityRequest;
//   try {
//     validatedData = updateActivityRequestSchema.parse(data);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ errors: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }

//   const { activityId, title, description, dateStart, dateEnd } = validatedData;

//   // Perform the update in the database
//   try {
//     const updateData: {title: string|null, description: string|null, dateStart: string|null, dateEnd: string|null} = {title: null, description: null, dateStart: null, dateEnd: null};
//     if (title) updateData.title = title;
//     if (description) updateData.description = description;
//     if (dateStart) updateData.dateStart = dateStart;
//     if (dateEnd) updateData.dateEnd = dateEnd;

//     const updatedActivity = await db
//       .update(activitiesTable)
//       .set(updateData)
//       .where(eq(activitiesTable.displayId,activityId))
//       .returning()
//       .execute();

//     if (!updatedActivity) {
//       return NextResponse.json(
//         { error: "Activity not found or no changes were made." },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ message: "Activity updated successfully" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to update activity" },
//       { status: 500 },
//     );
//   }
// }
