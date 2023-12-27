import { Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";

import { createActivity } from "./actions";

import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { revalidatePath } from "next/cache";


async function CreateDialog() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2" variant={"outlined"}>Add Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Add another member to this trip !</DialogDescription>
        </DialogHeader>
        <form
          action={async (e) => {
            "use server";
            const title = e.get("title")?.toString();
            if (!title) return;

            const description = e.get("description")?.toString();
            if (!description) return;

            const dateStart = e.get("dateStart")?.toString();
            if (!dateStart) return;
            
            const dateEnd = e.get("dateEnd")?.toString();
            if (!dateEnd) return;

            const createData={title:title, description:description, dateStart:dateStart, dateEnd:dateEnd, organizerId:userId}


            const result = await createActivity(createData);
            if(!result){
              console.log("can't create");
            }else{
              revalidatePath("/docs");
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${result.displayId}`)
            }
          }}
          className="flex flex-row gap-4"
        >
            <div className="w-full flex flex-col gap-2 ">
                <Input placeholder="Title" name="title" />
                <Input placeholder="Description" name="description" />
                <Input placeholder="DateStart" name="dateStart" />
                <Input placeholder="DateEnd" name="dateEnd" />
                <Button type="submit">Add</Button>
            </div>           
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
