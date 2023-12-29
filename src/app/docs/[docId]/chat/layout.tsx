
type Props = {
  children: React.ReactNode;
};

function ChatroomLayout({children}: Props){
  return (
    <div className="w-full">
      {children}
    </div>
  )
}

export default ChatroomLayout;