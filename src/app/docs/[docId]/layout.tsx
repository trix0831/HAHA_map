import ShareDialog from "./_components/ShareDialog";
import ScheduleList from "./_components/ScheduleList";
import { Button } from "@mui/material";


type Props = {
  children: React.ReactNode;
  params: { docId: string };
};

function DocEditorLayout({ children,params }: Props) {
  

  return (
    <>
        <div className="fixed right-4 top-3 z-50">
          <ShareDialog docId={params.docId} />
        </div>
        
        <div className="grid grid-cols-3">
          <div className="col-span-2">{children}</div>
        </div>
    </>
  );
}

export default DocEditorLayout;
