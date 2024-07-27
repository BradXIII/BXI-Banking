import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-asset">
          <div>
            <Image
              src="/icons/auth-image-1"
              alt="Auth image"
              width={600}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </main>
    );
  }
  