import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageTransition } from "@/components/shared/PageTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <div className="min-h-screen bg-background relative">
        <main className="pb-30">
          <PageTransition>{children}</PageTransition>
        </main>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
