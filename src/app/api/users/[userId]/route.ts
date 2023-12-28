import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersToActivitiesTable } from "@/db/schema";


// GET /api/documents/:userId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    // Get user from session

    // Get the document
		const activities_temp = await db.query.usersToActivitiesTable.findMany({
			where: eq(usersToActivitiesTable.userId, params.userId),
			with: {
				activity: {
					columns: {
						displayId: true,
						title: true,
					}
				}
			}
		})
		const activities:{title: string, displayId: string}[] = [];
		for(let i = 0; i < activities_temp.length; i++){
			activities.push(activities_temp[i].activity);
		}
	
		return activities;
    } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}