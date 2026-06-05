/*
 * HexaCoreWidget.tsx – Modal widget for SinapsiX booking.
 * Implements a lightweight, brand‑consistent modal that can be opened via
 * window.SinapsiXWidget.open() or by rendering directly.
 *
 * Dependencies: React, @tanstack/react-query, trpc, lucide-react.
 * Uses public trpc endpoints (no auth) to fetch event types and slots.
 */

'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { X, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

/**
 * Props for the widget. `serviceId` can pre‑select an EventType.
 */
export interface HexaCoreWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (bookingData: unknown) => void;
  serviceId?: string;
  theme?: 'dark' | 'light';
  buttonText?: string;
}

/**
 * HexaCoreWidget – a fully styled modal.
 */
export const HexaCoreWidget: FC<HexaCoreWidgetProps> = ({
  isOpen,
  onClose,
  onSuccess,
  serviceId,
  theme = 'dark',
}) => {
  // ---- State handling ----------------------------------------------------
  const [step, setStep] = useState<'service' | 'datetime' | 'details' | 'confirm'>('service');
  const [selectedEventType, setSelectedEventType] = useState<string | null>(serviceId ?? null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', phone: '' });

  // ---- Data fetching ----------------------------------------------------
  // Public endpoint – does not require authentication.
  const { data: eventTypes, isLoading: loadingServices } =
    trpc.public.eventTypes.list.useQuery(undefined, { enabled: !serviceId });

  const {
    data: slots,
    isLoading: loadingSlots,
  } = trpc.public.slots.getSchedule.useQuery(
    {
      eventTypeId: selectedEventType ?? '',
      startTime: new Date().toISOString(),
    },
    { enabled: !!selectedEventType }
  );

  const createBooking = trpc.public.bookings.create.useMutation({
    onSuccess: (data) => {
      setStep('confirm');
      onSuccess?.(data);
      // Auto‑close after a short delay.
      setTimeout(() => {
        onClose();
        setStep('service');
        setSelectedEventType(serviceId ?? null);
      }, 3000);
    },
  });

  // Early return when the modal is closed.
  if (!isOpen) return null;

  // ---------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------
  const renderServiceStep = () => (
    <div className="space-y-4">
      <h3 className="text-white text-lg mb-4">Selecciona un servicio</h3>
      {loadingServices ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {eventTypes?.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                setSelectedEventType(event.id);
                setStep('datetime');
              }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-left group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium group-hover:text-purple-300">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {event.description ?? 'Experiencia transformadora'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {event.length} min
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderDateTimeStep = () => (
    <div className="space-y-4">
      <button
        onClick={() => setStep('service')}
        className="text-purple-400 hover:text-purple-300 text-sm mb-4 flex items-center gap-1"
      >
        ← Volver a servicios
      </button>
      <h3 className="text-white text-lg mb-4">Elige fecha y hora</h3>
      {loadingSlots ? (
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {slots?.slots &&
            Object.values(slots.slots)
              .flat()
              .slice(0, 12)
              .map((slot: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setStep('details');
                  }}
                  className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/40 transition-all text-white text-sm"
                >
                  {new Date(slot.time).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </button>
              ))}
        </div>
      )}
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <button
        onClick={() => setStep('datetime')}
        className="text-purple-400 hover:text-purple-300 text-sm mb-4 flex items-center gap-1"
      >
        ← Volver a horarios
      </button>
      <h3 className="text-white text-lg mb-4">Tus datos</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedEventType || !selectedSlot) return;
          createBooking.mutate({
            eventTypeId: selectedEventType,
            start: selectedSlot.time,
            end: selectedSlot.time, // Assume same‑time slot length.
            responses: bookingDetails,
          });
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={bookingDetails.email}
          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="WhatsApp (opcional)"
          value={bookingDetails.phone}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={createBooking.isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:from-purple-700 hover:to-fuchsia-700 transition-all disabled:opacity-50"
        >
          {createBooking.isLoading ? 'Confirmando...' : 'Confirmar turno'}
        </button>
      </form>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="text-center py-12 space-y-4">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      <h3 className="text-white text-xl font-semibold">¡Turno confirmado!</h3>
      <p className="text-gray-400">Te enviaremos un recordatorio a tu WhatsApp/Email</p>
    </div>
  );

  // ---------------------------------------------------------------------
  // Main modal layout
  // ---------------------------------------------------------------------
  return (
    <>
      {/* Overlay – click closes */}
      <div
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 z-[10000] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-300">
        <div className="relative rounded-2xl bg-gradient-to-br from-black via-purple-950/95 to-fuchsia-950/95 border border-white/20 shadow-2xl shadow-purple-500/20">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                SinapsiX Booking
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {step === 'service' && renderServiceStep()}
            {step === 'datetime' && renderDateTimeStep()}
            {step === 'details' && renderDetailsStep()}
            {step === 'confirm' && renderConfirmStep()}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139,92,246,0.5);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};
