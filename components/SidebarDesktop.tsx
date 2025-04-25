export default function SidebarDesktop() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-Grey900 text-white p-6 fixed">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-Grey300">Dashboard</a>
        <a href="#" className="hover:text-Grey300">Transactions</a>
        <a href="#" className="hover:text-Grey300">Settings</a>
      </nav>
    </aside>
  );
}