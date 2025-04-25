export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-Grey900 text-white p-3 flex justify-around lg:hidden">
      <a href="#" className="text-sm hover:text-Grey300">Dashboard</a>
      <a href="#" className="text-sm hover:text-Grey300">Transactions</a>
      <a href="#" className="text-sm hover:text-Grey300">Settings</a>
    </nav>
  );
}