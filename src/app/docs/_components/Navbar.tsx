import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { createDocument, getDocuments } from "./actions";
import CreateDialog from "./CreateDialog";

import ActivityList from "./ActivityList";

async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const documents = await getDocuments(userId);

  
  return (
    <nav className="flex w-full flex-col overflow-y-scroll bg-slate-100 pb-10">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
          <svg width="30" height="30" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 661.3c-117.6 0-213.3-95.7-213.3-213.3S394.4 234.7 512 234.7 725.3 330.4 725.3 448 629.6 661.3 512 661.3z m0-341.3c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z" fill="#5F6379" />
              <path d="M837 862.9c-15.7 0-30.8-8.7-38.2-23.7C744.3 729.5 634.4 661.3 512 661.3s-232.3 68.1-286.8 177.9c-10.5 21.1-36.1 29.7-57.2 19.2s-29.7-36.1-19.2-57.2C217.8 662.3 357 576 512 576s294.2 86.3 363.2 225.2c10.5 21.1 1.9 46.7-19.2 57.2-6.1 3-12.6 4.5-19 4.5z" fill="#5F6379" />
              <path d="M512 1002.7c-270.6 0-490.7-220.1-490.7-490.7S241.4 21.3 512 21.3s490.7 220.1 490.7 490.7-220.1 490.7-490.7 490.7z m0-896c-223.5 0-405.3 181.8-405.3 405.3S288.5 917.3 512 917.3 917.3 735.5 917.3 512 735.5 106.7 512 106.7z" fill="#3688FF" />
          </svg>
            <h1 className="text-xl font-semibold">
              {session?.user?.username ?? "User"}
            </h1>
          </div>
          <Link href={`/auth/signout`}>
            <Button
              variant={"ghost"}
              type={"submit"}
              className="hover:bg-slate-200"
            >
              Sign Out
            </Button>
          </Link>
        </div>

        <form
          className="w-full hover:bg-slate-200"
          action={async () => {
            "use server";
            const newDocId = await createDocument(userId);
            revalidatePath("/docs");
            redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 px-3 py-1 text-left text-sm text-slate-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9944 10.0011L11.9944 13.9989" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M13.9932 12H9.99541" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M20.845 12V6.50968C20.845 4.48821 19.2062 2.84949 17.1848 2.84949H6.50419C4.48272 2.84949 2.84399 4.48821 2.84399 6.50968V17.4903C2.84399 19.5117 4.48272 21.1504 6.50419 21.1504H11.8445" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M20.7847 15.8827L18.8316 13.8971C18.6335 13.6957 18.3123 13.6957 18.1142 13.8971L14.3579 17.716C14.2491 17.8266 14.1956 17.9813 14.2123 18.1368L14.4272 20.1323C14.4401 20.2525 14.5334 20.3474 14.6517 20.3605L16.6145 20.5789C16.7673 20.5959 16.9196 20.5415 17.0283 20.431L20.7847 16.612C20.9828 16.4106 20.9828 16.0841 20.7847 15.8827Z" stroke="#DF1463" strokeWidth="1.69904" strokeLinecap="round"/>
            </svg>
            <p>Create Activity</p> 
          </button>
        </form>

        <form
          className="w-full hover:bg-slate-200"
          action={async () => {
            "use server";
            const newDocId = await createDocument(userId);
            revalidatePath("/docs");
            redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center mb-0 gap-2 px-3 py-1 text-left text-sm text-slate-500"
          >
            <svg width="24" height="24" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--noto" preserveAspectRatio="xMidYMid meet">
                <path d="M116.46 3.96h-104c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8v-104c0-4.42-3.58-8-8-8z" fill="#689f38"></path>
                <path d="M110.16 3.96h-98.2a7.555 7.555 0 0 0-7.5 7.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H110.06c4.14.01 7.49-3.34 7.5-7.48V11.46c.09-4.05-3.13-7.41-7.18-7.5h-.22z" fill="#7cb342"></path>
                <path d="M40.16 12.86c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z" opacity=".3" fill="#ffffff"></path>
                <path d="M43.26 109.46a8.862 8.862 0 0 1-8.7-6.2l-15.1-45.5c-1.46-4.81 1.26-9.9 6.07-11.36c4.65-1.41 9.59 1.08 11.23 5.66l9.8 29.5l47.1-59.6c3.12-3.95 8.85-4.62 12.8-1.5s4.62 8.85 1.5 12.8l-57.6 72.7a9.086 9.086 0 0 1-7.1 3.5z" fill="#fbf9f9"></path>
            </svg>
            <p>Only show my activities</p> 
          </button>
        </form>
        <CreateDialog/>
      </nav>
      <section className="flex w-full flex-col pt-3">
        <ActivityList documents={documents} />
      </section>
    </nav>
  );
}

export default Navbar;
