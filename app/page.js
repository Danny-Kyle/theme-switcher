import Image from "next/image";
import HeaderPage from "./Header/HeaderPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeaderPage />

      <div>We serve God by his spirit</div>
    </main>
  );
}
