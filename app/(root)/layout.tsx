
import { Bottombar, LeftSidebar, RightSidebar, Topbar } from "@/components/index";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-4xl'>{children}</div>
        </section>
        {/* @ts-ignore */}
        <RightSidebar />
      </main>
      <Bottombar />

    </>
  );
}
