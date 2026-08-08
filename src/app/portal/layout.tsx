export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh flex flex-col bg-gray-950 text-gray-100">{children}</div>;
}
