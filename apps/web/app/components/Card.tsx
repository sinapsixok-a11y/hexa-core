export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 border border-[#C5A880] rounded-lg bg-[#0a0a0a]">
      <h3 className="text-2xl font-semibold mb-3 text-[#66FCF1]">{title}</h3>
      {children}
    </div>
  );
}
