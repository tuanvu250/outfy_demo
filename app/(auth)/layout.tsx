import { PhoneFrame } from "@/components/layout/PhoneFrame";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <PhoneFrame>{children}</PhoneFrame>;
}
