// import MapComponent from "./_components/map";
import { getActivityMembers, getActivityDetial } from "./_components/actions";
import type { Activity } from "@/lib/types/db";
// import type { NextRequest } from 'next/server';
import AllPage from "./_components/Allpage";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

type Props = {
  params: { docId: string };
};

async function DocPage({params}: Props) {
  const activityId = params.docId;
  // console.log("id");
  // console.log(activityId);

  let members: memberType[] = [];
  let activity: Activity | undefined;
  if(activityId){
    members = await getActivityMembers(activityId);
    activity = await getActivityDetial(activityId);
  }

  const temp = {activity: activity, members: members};
  
  // const [participateState, setParticipateState] = useState("participate");

  //define a function that alert("clicked")
  // const a = () => {
  //   if(participateState === "participate")
  //     setParticipateState("participated");
  //   else
  //     setParticipateState("participate");
  // };

  return (

    <>
      <div className="w-full flex">
        <AllPage {...temp}/>
      </div>
    </>
  );
}

export default DocPage;
