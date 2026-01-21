
import DesktopSidebar from "@/components/dashboard/DesktopDashboard";
import MobileSidebar from "@/components/dashboard/MobileDashboard";
import TopNav from "@/components/dashboard/Topnav";
import Footer from "@/components/Footer";
import { ReactNode, Suspense } from "react";
import { TbLoader2 } from "react-icons/tb";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="">
            <MobileSidebar />
            <DesktopSidebar />

            <div className="lg:pl-64">
                <TopNav />

                <main className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Suspense
                            fallback={
                                <div className="flex justify-center py-12">
                                    <TbLoader2 className="h-8 w-8 animate-spin text-blue-500" />
                                </div>
                            }
                        >
                            {children}
                        </Suspense>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    );
}