import MobileNav from "@/components/MobileNav";
import SiderNav from "@/components/SiderNav";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const getAuthorizedUser = await getCurrentUser();
  
  if (!(getAuthorizedUser?.role === "admin") && getAuthorizedUser?.user.$id) redirect("/admin-auth/sign-in");
  console.log(getAuthorizedUser);
  
  return (
    <main>
      <div className="bg-[#004AAD] flex min-h-screen w-full flex-col md:flex-row">
        <div className="w-4/12">
          <SiderNav adminId={getAuthorizedUser?.user.$id || ""}/>
          <MobileNav adminId={getAuthorizedUser?.user.$id || ""} />
        </div>
        <div className="w-full bg-white mt-5 rounded-l-2xl">
          {children}
        </div>
      </div>
    </main>
  );
}
