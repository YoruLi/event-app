import { Sidebar } from "@/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function ProfilePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">
        <div className="bg-background">
          <div className="flex flex-col">
            <Sidebar className="block border-b-2 left-0" />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
