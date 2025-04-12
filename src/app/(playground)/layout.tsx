import Nav from "@/components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Nav />
      <div className="px-3 py-5">{children}</div>
    </main>
  );
}
