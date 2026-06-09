export default function PricingTable() {
  return (
    <section className="w-full py-24 bg-[#050505] px-4 md:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#C5A880] mb-12">
        Plan de Precios
      </h2>

      <div className="max-w-md mx-auto bg-[#0a0a0a] border border-[#C5A880] rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4 text-[#66FCF1]">Standard</h3>
        <p className="text-5xl font-extrabold mb-6">$15</p>
        <p className="mb-8">por mes – Facturación anual</p>
        <a
          href="/signup"
          className="inline-block bg-[#66FCF1] text-[#050505] font-semibold py-3 px-8 rounded-full hover:bg-[#55d9d5] transition-colors"
        >
          Comenzar Gratis
        </a>
      </div>
    </section>
  );
}
