import Navbar from "./_components/Navbar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows fixed top-0 flex h-screen w-full ">
      {/* overflow-y-scroll for child to show scrollbar */}
        <nav className="flex w-2/5 flex-col border-r bg-slate-100 pb-10 overflow-y-scroll">
          <Navbar/>
        </nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full overflow-y-auto">{children}</div>
    </main>
  );
}

export default DocsLayout;
