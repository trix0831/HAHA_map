import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { usersToActivitiesTable } from "@/db/schema";

// Define the schema for the request data
const addUserToActivityRequestSchema = z.object({
  userId: z.string().uuid(),
  activityId: z.string().uuid(),
});

// Infer the TypeScript type from the zod schema
type AddUserToActivityRequest = z.infer<typeof addUserToActivityRequestSchema>;

// POST method to handle adding a user to an activity
export async function POST(
    request: NextRequest,
    ) {
  const data = await request.json();

  // Validate the incoming request data
  let validatedData: AddUserToActivityRequest;
  try {

    // eslint-disable-next-line
    validatedData = addUserToActivityRequestSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    // Generic error fallback
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // const { userId, activityId } = validatedData;

  // Insert the association into the 'users_to_activities' table
  try {
    await db.insert(usersToActivitiesTable).values({
      userId: validatedData.userId,
      activityId: validatedData.activityId,
    });

    return NextResponse.json({ message: "User added to activity successfully" }, { status: 200 });
  } catch (error) {
    // Handle any errors during the database insert
    // Ideally, log the error and return a generic error message to the client
    console.error(error);
    return NextResponse.json({ error: "Failed to add user to activity" }, { status: 500 });
  }
}

