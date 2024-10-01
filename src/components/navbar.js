import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();

  // Define an array for the navigation links
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Form", path: "/form" },
  ];

  return (
    <nav className="w-full bg-blue-500 shadow-md absolute top-0">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-10 py-4">
        {/* Logo or Brand Name */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <p
                className={`text-white text-lg font-medium hover:text-blue-300 ${
                  router.pathname === item.path ? "border-b-2 border-white" : ""
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
