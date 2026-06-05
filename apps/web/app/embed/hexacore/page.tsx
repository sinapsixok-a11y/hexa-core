"use client";

import React, { useState } from "react";

const HexaCoreBooker = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("mercadopago"); // "whatsapp" or "mercadopago"

  const serviceData: Record<string, { name: string; subName: string }> = {
    wellness: { name: "Wellness /", subName: "Master/ Yoga" },
    it: { name: "IT Consulting", subName: "" },
    art: { name: "Art / Diseño", subName: "" },
  };

  const specialistData: Record<string, string> = {
    julian: "Master Julian",
    mslena: "Arte / Mslena",
    mazz: "Healthcare Mazz",
  };

  const transitionToStep = (targetStep: number) => {
    if (targetStep === 1) {
      setStep(1);
    } else if (targetStep === 2) {
      if (selectedService && selectedSpecialist) {
        setStep(2);
      }
    }
  };

  const openModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleModalProceed = () => {
    setModalOpen(false);
    const svc = serviceData[selectedService];
    const specName = specialistData[selectedSpecialist];
    if (modalType === "whatsapp") {
      const text = `Hola! Quiero confirmar mi turno de ${svc.name} ${svc.subName} con ${specName} el dia ${selectedDate} a las ${selectedSlot || "No seleccionado"}.`;
      window.open(`https://wa.me/5491111111111?text=${encodeURIComponent(text)}`, "_blank");
    } else {
      alert("¡Pasarela de Mercado Pago (Sandbox) confirmada e invocada con éxito!");
    }
  };

  return (
    <div className="bg-[#050505] flex flex-col justify-center items-center min-h-screen relative overflow-hidden font-sans select-none">
      {/* Dynamic Keyframes injected into DOM (ideally in a global css but we can do a style tag for the embed) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-counter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        .animate-orbit-cw {
          animation: orbit-clockwise 45s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbit-counter 30s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .step-clip {
          clip-path: polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%);
        }
        .step-clip-first {
          clip-path: polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%);
        }
        .step-clip-last {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%);
        }
        .fade-transition {
          transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />

      {/* Matte Carbon Hexagonal Grid Background Layer */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none z-0" 
        style={{
          backgroundImage: `
              radial-gradient(circle at center, transparent 30%, #050505 95%),
              linear-gradient(30deg, #15181f 25%, transparent 25%, transparent 75%, #15181f 75%, #15181f),
              linear-gradient(30deg, #15181f 25%, transparent 25%, transparent 75%, #15181f 75%, #15181f)
            `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 40px 70px'
        }}
      ></div>

      {/* Decorative Brand Radial Nebulas */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#66FCF1]/3 blur-[180px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#45A29E]/3 blur-[180px] rounded-full pointer-events-none z-0"></div>
      
      {/* Real-time Glowing Nebulae Core behind the Orbe */}
      <div className="absolute w-[500px] h-[500px] bg-[#E5A93C]/5 blur-[160px] rounded-full pointer-events-none z-0"></div>

      {/* Top Header */}
      <div className="text-center mb-6 z-10">
        <h1 className="text-xs font-bold tracking-[0.4em] text-[#66FCF1]/80 uppercase">SinapsiX</h1>
        <h2 className="text-2xl font-black text-white tracking-widest mt-1">HEXA<span className="text-[#C5A880]">CORE</span> OPERATIVE</h2>
      </div>

      {/* Main Booker Container Wrapper */}
      <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center relative min-h-[620px]">
        
        {/* OUTER GLOWING ORBIT SYSTEM */}
        <div className="absolute w-[620px] h-[620px] rounded-full pointer-events-none flex items-center justify-center z-0">
          
          {/* Ring 1 */}
          <div className="absolute inset-0 rounded-full border border-[#C5A880]/20 animate-orbit-cw">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#C5A880] rounded-full shadow-[0_0_15px_#C5A880] border-2 border-black"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 bg-[#C5A880] rounded-full shadow-[0_0_15px_#C5A880] border-2 border-black"></div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#C5A880]/80 rounded-full shadow-[0_0_10px_#C5A880] border border-black"></div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#C5A880]/80 rounded-full shadow-[0_0_10px_#C5A880] border border-black"></div>
          </div>

          {/* Ring 2 */}
          <div className="absolute w-[585px] h-[585px] rounded-full border border-[#66FCF1]/15 animate-orbit-ccw">
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-2.5 h-2.5 bg-[#66FCF1] rounded-full shadow-[0_0_15px_#66FCF1] border border-black"></div>
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-2.5 h-2.5 bg-[#66FCF1] rounded-full shadow-[0_0_15px_#66FCF1] border border-black"></div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#66FCF1] rounded-full shadow-[0_0_20px_#66FCF1] border-2 border-black"></div>
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#66FCF1] rounded-full shadow-[0_0_20px_#66FCF1] border-2 border-black"></div>
          </div>

          {/* Outer Glow Halo Ring */}
          <div className="absolute w-[564px] h-[564px] rounded-full border-2 border-[#C5A880]/40 shadow-[0_0_50px_rgba(197,168,128,0.15)]"></div>
        </div>

        {/* MAIN POLISHED GLASS SPHERE CONTAINER */}
        <div className="relative w-[550px] h-[550px] rounded-full backdrop-blur-3xl bg-gradient-to-b from-[#090b10]/65 to-[#030406]/75 border border-white/10 p-12 flex flex-col justify-between items-center z-10 shadow-[inset_0_4px_35px_rgba(255,255,255,0.06),0_25px_65px_rgba(0,0,0,0.85)] overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[140px] bg-gradient-to-b from-white/[0.07] to-transparent rounded-t-full pointer-events-none z-20"></div>
          
          <div className="flex flex-col items-center mt-2 z-10">
            <svg className="w-7 h-7 text-[#C5A880] filter drop-shadow-[0_0_8px_rgba(197,168,128,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 22C12 22 17 17 17 13C17 10 15 8 12 8C9 8 7 10 7 13C7 17 12 22 12 22Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M12 22C12 22 7 19 5 15C3 11 5 8 9 8C10 8 11.5 9 12 10" />
              <path d="M12 22C12 22 17 19 19 15C21 11 19 8 15 8C14 8 12.5 9 12 10" />
              <path d="M12 22C12 22 12 2 12 8" />
              <circle cx="12" cy="13" r="1" fill="currentColor" />
            </svg>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase mt-2">Real-Time Reservation Tool</h3>
            <p className="text-[9px] text-[#C5A880]/60 tracking-wider mt-0.5">ONLY TWO STEPS</p>
          </div>

          {/* STEP 1 VIEW */}
          <div className={\`grid grid-cols-2 gap-8 w-full px-2 my-auto z-10 fade-transition \${step === 1 ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none absolute'}\`}>
            
            {/* Servicios */}
            <div className="flex flex-col space-y-3">
              <div className="text-[11px] font-semibold text-[#C5A880] tracking-[0.2em] mb-1 pl-1">SERVICIOS</div>
              <div className="flex flex-col space-y-2.5">
                {[
                  { id: 'wellness', icon: <path d="M12 3C12 3 8 8 8 12C8 14.5 10 16 12 16C14 16 16 14.5 16 12C16 8 12 3 12 3Z" />, icon2: <path d="M12 16C12 16 7 14 5 11C3.5 8.5 5 6 8 7C9 7.3 11 9 12 10" />, icon3: <path d="M12 16C12 16 17 14 19 11C20.5 8.5 19 6 16 7C15 7.3 13 9 12 10" /> },
                  { id: 'it', icon: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /></> },
                  { id: 'art', icon: <><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.3444 19.4939 6.06456 19.5 6.5 19C7 18.5 7.5 17 8 17C8.5 17 9 17.5 9.5 18C10 18.5 9.77573 20.3013 10.3705 21.1927C10.7981 21.8335 11.3857 22 12 22Z" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" /><circle cx="11.5" cy="7.5" r="1" fill="currentColor" /><circle cx="16.5" cy="9.5" r="1" fill="currentColor" /></> }
                ].map((s) => {
                  const isActive = selectedService === s.id;
                  const data = serviceData[s.id];
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedService(s.id); setStep(2); }}
                      className={\`relative flex items-center p-3 rounded-xl border text-left transition-all duration-300 \${isActive ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.25),inset_0_1px_10px_rgba(197,168,128,0.1)]' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/15 text-white/80'}\`}
                    >
                      <div className={\`mr-3 \${isActive ? 'text-[#C5A880]' : 'text-white/40'}\`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          {s.icon}
                          {s.icon2}
                          {s.icon3}
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className={\`text-[12px] font-medium tracking-wide \${isActive ? 'text-white' : ''}\`}>{data.name}</span>
                        {data.subName && <span className={\`text-[10px] tracking-wide \${isActive ? 'text-[#C5A880]' : ''}\`}>{data.subName}</span>}
                      </div>
                      {isActive && <div className="absolute right-3 w-1.5 h-1.5 bg-[#C5A880] rounded-full shadow-[0_0_8px_#C5A880]"></div>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Especialistas */}
            <div className="flex flex-col space-y-3">
              <div className="text-[11px] font-semibold text-[#C5A880] tracking-[0.2em] mb-1 pl-1">ESPECIALISTAS</div>
              <div className="flex flex-col space-y-2.5">
                {[
                  { id: 'julian', name: 'Master Julian', subName: 'Wellness Expert', type: 'img', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120' },
                  { id: 'mslena', name: 'Arte / Mslena', subName: 'Creative Director', type: 'img', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120' },
                  { id: 'mazz', name: 'Healthcare Mazz', subName: 'Medical Partner', type: 'icon' }
                ].map((s) => {
                  const isActive = selectedSpecialist === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedSpecialist(s.id); setStep(2); }}
                      className={\`relative flex items-center p-2.5 rounded-xl border text-left transition-all duration-300 \${isActive ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.25),inset_0_1px_10px_rgba(197,168,128,0.1)]' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/15 text-white/80'}\`}
                    >
                      <div className="relative mr-3 w-9 h-9 rounded-lg overflow-hidden border border-[#C5A880]/40 flex-shrink-0 flex items-center justify-center bg-[#090b10]">
                        {s.type === 'img' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.src} alt={s.name} className="w-full h-full object-cover filter contrast-[1.1] grayscale-[20%]" />
                        ) : (
                          <svg className={\`w-5 h-5 \${isActive ? 'text-[#C5A880]' : 'text-white/40'}\`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19V5" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={\`text-[12px] font-medium tracking-wide \${isActive ? 'text-white' : ''}\`}>{s.name}</span>
                        <span className={\`text-[9px] tracking-wider \${isActive ? 'text-[#C5A880]' : 'text-white/40'}\`}>{s.subName}</span>
                      </div>
                      {isActive && <div className="absolute right-3 w-1.5 h-1.5 bg-[#C5A880] rounded-full shadow-[0_0_8px_#C5A880]"></div>}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* STEP 2 VIEW */}
          <div className={\`flex flex-col items-center w-full px-2 my-auto z-10 fade-transition \${step === 2 ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none absolute inset-x-12 top-[120px]'}\`}>
            
            <div className="flex justify-between items-center w-full pb-1 border-b border-[#C5A880]/15 mb-3">
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-white tracking-wide">{serviceData[selectedService]?.name} {serviceData[selectedService]?.subName}</span>
                <span className="text-[9px] text-[#C5A880]">Con {specialistData[selectedSpecialist]}</span>
              </div>
              <button 
                onClick={() => transitionToStep(1)}
                className="text-[10px] text-[#66FCF1] hover:text-white transition-colors duration-200 border border-[#66FCF1]/20 rounded-md px-2 py-0.5 bg-[#66FCF1]/5"
              >
                ← CAMBIAR
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full items-start">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-bold text-[#C5A880] tracking-[0.2em]">DÍA DE TURNO</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#090b10]/80 text-[12px] text-white border border-[#C5A880]/40 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66FCF1] hover:border-[#C5A880]/70 transition-colors"
                />
                
                <div className="flex flex-col p-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-1.5">
                  <div className="flex justify-between text-[8px] font-bold text-white/40 tracking-wider">
                    <span>DOM</span><span>LUN</span><span>MAR</span><span>MIE</span><span>JUE</span><span>VIE</span><span>SAB</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
                    <span className="text-white/20">26</span><span className="text-white/20">27</span><span className="text-white/20">28</span><span className="text-white/20">29</span><span className="text-white/20">30</span>
                    <span className="text-white/80 font-semibold border border-[#C5A880]/30 rounded bg-[#C5A880]/10">1</span>
                    <span className="text-[#66FCF1] font-semibold border border-[#66FCF1]/20 rounded bg-[#66FCF1]/5 cursor-pointer">2</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors">3</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors">4</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors">5</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors font-semibold">6</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors font-semibold">7</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors">8</span>
                    <span className="text-white/80 hover:bg-[#66FCF1]/10 rounded cursor-pointer transition-colors">9</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-bold text-[#C5A880] tracking-[0.2em]">SLOTS DISPONIBLES</label>
                <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedSlot(time)}
                      className={\`py-2 px-1 text-[11px] font-medium tracking-wide rounded-xl border text-center transition-all duration-300 \${selectedSlot === time ? 'bg-[#66FCF1]/20 border-[#66FCF1] text-white shadow-[0_0_15px_rgba(102,252,241,0.25)] font-bold' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/20 text-white/80'}\`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM CHEVRON STEP INDICATORS */}
          <div className="flex flex-col items-center w-full z-10 pb-4 mt-auto">
            <div className="flex justify-center items-center w-[300px] h-[26px] bg-black/45 rounded-lg border border-[#C5A880]/20 p-[2px] relative">
              <button 
                onClick={() => transitionToStep(1)}
                className={\`flex-1 text-[9px] font-bold tracking-widest text-center py-1 transition-all duration-300 step-clip-first \${step === 1 ? 'bg-gradient-to-r from-[#C5A880]/70 to-[#C5A880] text-black' : 'text-white/45'}\`}
              >
                STEP 1
              </button>

              <button 
                onClick={() => transitionToStep(2)}
                className={\`flex-1 text-[9px] font-bold tracking-widest text-center py-1 transition-all duration-300 step-clip \${step === 2 ? 'bg-gradient-to-r from-[#C5A880]/70 to-[#C5A880] text-black' : 'text-white/45'}\`}
              >
                STEP 2
              </button>

              <button 
                disabled
                className="flex-1 text-[9px] font-bold tracking-widest text-center py-1 text-white/25 step-clip-last cursor-not-allowed"
              >
                STEP 3
              </button>
            </div>

            <div 
              className="relative w-[300px] flex justify-start transition-all duration-500 ease-out mt-1"
              style={{
                paddingLeft: step === 1 ? '50px' : '150px',
                transform: step === 1 ? 'translateX(0px)' : 'translateX(96px)'
              }}
            >
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-[#C5A880] filter drop-shadow-[0_-2px_4px_#C5A880]"></div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={() => {
              if (step === 1) {
                transitionToStep(2);
              } else {
                if (selectedDate && selectedSlot) {
                  openModal('mercadopago');
                }
              }
            }}
            disabled={step === 2 && !selectedSlot}
            className={\`absolute bottom-[-18px] w-[340px] h-[58px] rounded-full bg-gradient-to-r from-[#C5A880] via-[#E5A93C] to-[#C5A880] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(229,169,60,0.45),inset_0_2px_8px_rgba(255,255,255,0.4)] border border-[#E5A93C] group overflow-hidden \${step === 2 && !selectedSlot ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : ''}\`}
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-full"></div>
            <span className="text-[14px] font-black text-black tracking-[0.15em] filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
              {step === 1 ? 'SELECCIONAR FECHA' : 'CONFIRMAR RESERVA'}
            </span>
            <span className="text-[9px] font-bold text-black/75 tracking-wider uppercase">
              {step === 1 ? 'Only Two Steps' : '(Pago Total/Mercado Pago)'}
            </span>
          </button>
          {/* Mercado Pago floating button */}
          <button
            onClick={() => openModal('mercadopago')}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Mercado_Pago_Logo.svg" alt="Mercado Pago" className="w-6 h-6" />
          </button>

        </div>

        {/* WHATSAPP MODULE */}
        <div className={\`mt-8 z-10 flex flex-col items-center space-y-2 transition-all duration-300 \${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95 absolute'}\`}>
          <button
            onClick={() => openModal('whatsapp')}
            className="flex items-center space-x-2.5 px-6 py-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.15)] group"
          >
            <svg className="w-4.5 h-4.5 text-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.875-6.976C16.592 1.905 14.122.88 11.5.88c-5.438 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.42 1.32 4.933l-.994 3.635 3.722-.976zM17.487 14.4c-.27-.136-1.602-.79-1.85-.88-.25-.09-.43-.136-.61.136-.18.27-.694.88-.85 1.057-.158.183-.317.204-.587.068-.27-.136-1.14-.42-2.172-1.34-1.03-.92-1.72-2.05-1.92-2.392-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.61-.09-.18-.61-1.47-.836-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.98 2.62 1.11 2.8c.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.57.66.21 1.25.18 1.73.11.53-.08 1.6-.66 1.83-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.19-.52-.33z" />
            </svg>
            <span className="text-[12px] font-semibold text-white/90 group-hover:text-white transition-colors">
              PAGAR / COORDINAR POR WHATSAPP
            </span>
          </button>
          <span className="text-[9.5px] text-[#C5A880]/60 tracking-wider">Módulos Inteligentes SinapsiX HexaCore</span>
        </div>

      </div>

      <div className="absolute bottom-6 right-6 opacity-30 pointer-events-none animate-pulse">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#66FCF1" />
        </svg>
      </div>

      {/* CONFIRMATION MODAL */}
      <div className={\`fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 \${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}\`}>
        <div className="w-[420px] rounded-2xl border border-[#C5A880]/40 bg-gradient-to-b from-[#090b10] to-[#030406] p-8 shadow-[0_0_50px_rgba(197,168,128,0.25)] flex flex-col items-center text-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-2xl pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-[#66FCF1] rounded-full shadow-[0_0_10px_#66FCF1] animate-pulse"></div>

          <div className="w-14 h-14 rounded-full border border-[#C5A880]/50 bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-5 shadow-[0_0_20px_rgba(197,168,128,0.15)]">
            {modalType === 'whatsapp' ? (
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.004 0C5.378 0 0 5.373 0 11.996c.002 2.296.649 4.51 1.868 6.438L.045 24l5.736-1.503a11.97 11.97 0 006.222 1.737c6.627 0 12.002-5.373 12.002-11.998C24.005 5.372 18.629 0 12.004 0zm0 21.94c-1.956 0-3.874-.526-5.553-1.52l-.398-.236-3.414.895.91-3.328-.26-.413c-1.092-1.74-1.668-3.765-1.667-5.842C1.626 5.82 6.282 1.164 12.004 1.164c2.772 0 5.378 1.08 7.337 3.04a10.324 10.324 0 013.037 7.334c-.004 5.728-4.66 10.402-10.374 10.402z" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
          </div>

          <h4 className="text-[18px] font-black text-white tracking-widest uppercase mb-1">
            {modalType === 'whatsapp' ? 'Módulo WhatsApp AI' : 'Pago Total Integrado'}
          </h4>
          <p className="text-[10px] text-[#C5A880] tracking-[0.2em] uppercase mb-4">
            {modalType === 'whatsapp' ? 'Redirección Modular Inteligente' : 'Invocación Pasarela de Pagos'}
          </p>

          <div className="w-full rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">SERVICIO:</span>
              <span className="text-white font-medium">{serviceData[selectedService]?.name} {serviceData[selectedService]?.subName}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">ESPECIALISTA:</span>
              <span className="text-white font-medium">{specialistData[selectedSpecialist]}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">FECHA:</span>
              <span className="text-[#66FCF1] font-mono font-semibold">{selectedDate}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">HORARIO:</span>
              <span className="text-[#66FCF1] font-mono font-semibold">{selectedSlot || 'No seleccionado'}</span>
            </div>
            <div className="border-t border-white/[0.05] pt-2 flex justify-between text-[11px] font-bold">
              <span className="text-[#C5A880]">ESTADO MÓDULO:</span>
              <span className="text-[#66FCF1] animate-pulse-slow">SANDBOX ACTIVO</span>
            </div>
          </div>

          <p className="text-[12px] text-white/70 leading-relaxed mb-6">
            {modalType === 'whatsapp' 
              ? 'Iniciando redirección segura al asistente virtual de WhatsApp para coordinar y agendar tu turno sin fricciones.'
              : 'Invocando pasarela de Mercado Pago integrada. Se simulará la pasarela en el modo Sandbox de marca blanca.'}
          </p>

          <div className="flex flex-col space-y-2.5 w-full">
            <button
              onClick={handleModalProceed}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E5A93C] text-black font-black text-[12px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(229,169,60,0.3)] border border-[#E5A93C]"
            >
              PROSEGUIR OPERACIÓN
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-semibold text-[11px] tracking-wider transition-all"
            >
              CANCELAR
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HexaCoreBooker;
