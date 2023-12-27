
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export default function useActivity(){
//     const [scheduleName, setScheduleName] = useState([]);
//     const [scheduleLocation, setScheduleLocation] = useState([]);
//     const [members, setMembers] = useState([]);
//     const [dateStart, setDateStart] = useState(0);
//     const [dateEnd, setDateEnd] = useState(0);
//     const [description, setDescription] = useState("");
//     const [title, setTitle] = useState("");
//     const [location, setLocation] = useState("");

//     const editMembers(userId:string, activityId:string){
//         const res = await fetch(`/api/activities/${activityId}`,{
//             method: "PUT",
//             headers:{
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
                
//             }),
//         })
//     }
// }