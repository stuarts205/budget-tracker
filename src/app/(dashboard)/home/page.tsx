"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { HomeView } from "@/modules/home/ui/views/home-view";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    router.push("/sign-in");
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <HomeView />
    </div>
  );
}
