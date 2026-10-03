import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { DispatchPacking as DispatchType } from '../types';
import { 
  Truck, 
  PackageCheck, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Printer, 
  QrCode, 
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Box,
  X
} from 'lucide-react';

export const DispatchPacking: React.FC = () => {
  const { dispatches, salesOrders, executeDispatch, role, triggerToast } = useTextile();
  const [showNewDispatchModal, setShowNewDispatchModal] = useState<boolean>(false);
  const [viewingLabel, setViewingLabel] = useState<DispatchType | null>(null);

  // Unfulfilled orders eligible for packing and dispatch
  const unfulfilledOrders = salesOrders.filter(so => so.status !== 'Fulfilled' && so.status !== 'Cancelled');

  // New Dispatch states
  const [selectedOrderId, setSelectedOrderId] = useState<string>(unfulfilledOrders[0]?.id || '');
  const [transporter, setTransporter] = useState<string>('VRL Logistics (Surat - Mumbai Fast Track)');
  const [lrNo, setLrNo] = useState<string>('VRL-SUR-994202');

  const handleOpenDispatchModal = () => {
    if (unfulfilledOrders.length > 0 && (!selectedOrderId || !unfulfilledOrders.some(o => o.id === selectedOrderId))) {
      setSelectedOrderId(unfulfilledOrders[0].id);
    }
    setShowNewDispatchModal(true);
  };

  const handleDispatch = () => {
    if (!selectedOrderId) {
      triggerToast('Please select a valid order to dispatch', 'error');
      return;
    }
    executeDispatch(selectedOrderId, transporter, lrNo);
    setShowNewDispatchModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Packaging & Transporter Logistics
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Carton packaging, tamper-proof seal recording, transporter LR consignment notes, and tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {(role === 'owner_admin' || role === 'dispatch') && (
            <button onClick={handleOpenDispatchModal} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              <Plus size={15} />
              <span>New Dispatch</span>
            </button>
          )}
        </div>
      </div>

      {/* Dispatches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {dispatches.map(dsp => (
          <div key={dsp.id} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>{dsp.dispatchNumber}</span>
                  <span className="badge badge-gold">Order: {dsp.orderNumber}</span>
                  <span className={`badge ${dsp.deliveryStatus === 'Delivered' ? 'badge-emerald' : 'badge-cyan'}`}>
                    {dsp.deliveryStatus}
                  </span>
                  {dsp.dispatchNumber === 'DSP-2026-301' && (
                    <span className="badge badge-emerald">✨ Section 22 Proof Dispatch</span>
                  )}
                </div>
                <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '4px' }}>
                  {dsp.customerName}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} />
                  <span>{dsp.shippingAddress}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Logistics Partner & Consignment</div>
                <div style={{ fontWeight: 800, color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                  {dsp.transporterName}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#fff', fontFamily: 'monospace' }}>
                  LR: {dsp.lrNumber} ({dsp.freightType})
                </div>
              </div>
            </div>

            {/* Bales / Cartons Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
              {dsp.cartonDetails.map((bale, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
                      📦 Carton {bale.cartonId}
                    </span>
                    <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>
                      Seal #{bale.sealNumber}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                    {bale.skuSummary}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Quantity: <strong>{bale.piecesCount} Sets</strong></span>
                    <span>Gross Weight: <strong>{bale.weightKg} kg</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <div>
                Dispatched: <strong>{dsp.dispatchDate}</strong> • Estimated Delivery: <strong>{dsp.expectedDelivery}</strong>
              </div>
              <button 
                onClick={() => setViewingLabel(dsp)} 
                className="btn-secondary" 
                style={{ padding: '5px 12px', fontSize: '0.75rem' }}
              >
                <Printer size={13} />
                <span>View & Print Bale Labels</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Bale Label Modal */}
      {viewingLabel && (
        <div className="modal-overlay" onClick={() => setViewingLabel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '560px', background: '#0a0e17' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                Official Wholesale Bale Packing Slips
              </h2>
              <button onClick={() => setViewingLabel(null)} className="btn-secondary" style={{ padding: '4px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {viewingLabel.cartonDetails.map((bale, idx) => (
                <div key={idx} style={{ 
                  background: '#ffffff', 
                  color: '#000000', 
                  padding: '16px', 
                  borderRadius: '6px', 
                  border: '2px solid #000', 
                  fontFamily: 'monospace' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>TEXTILEFLOW SURAT HUB</div>
                      <div style={{ fontSize: '0.75rem' }}>Wholesale Textile Consortium • Surat, Gujarat</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>BALE {idx + 1} OF {viewingLabel.cartonDetails.length}</div>
                      <div style={{ fontSize: '0.75rem' }}>{bale.cartonId}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                    <strong>CONSIGNEE:</strong> {viewingLabel.customerName}<br />
                    <strong>DESTINATION:</strong> {viewingLabel.shippingAddress}<br />
                    <strong>TRANSPORTER:</strong> {viewingLabel.transporterName}<br />
                    <strong>LR / BILTY NO:</strong> {viewingLabel.lrNumber}
                  </div>

                  <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '6px 0', margin: '6px 0', fontSize: '0.82rem' }}>
                    <strong>CONTENTS:</strong> {bale.skuSummary}<br />
                    <strong>PIECES:</strong> {bale.piecesCount} Bridal Sets | <strong>WEIGHT:</strong> {bale.weightKg} KG<br />
                    <strong>SECURITY SEAL:</strong> {bale.sealNumber}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.7rem' }}>
                      DO NOT ACCEPT IF TAMPER-EVIDENT SEAL IS BROKEN
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                      <QrCode size={20} color="#000" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{bale.sealNumber}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
              <button onClick={() => window.print()} className="btn-primary" style={{ fontSize: '0.8rem' }}>
                <Printer size={14} />
                <span>Print Packing Labels</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Dispatch Modal */}
      {showNewDispatchModal && (
        <div className="modal-overlay" onClick={() => setShowNewDispatchModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '540px' }}>
            <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              Execute Dispatch & Generate Packing Consignment
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Pack allocated sets into numbered bales, record security seal, and assign transporter LR consignment.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Select Pending Sales Order:
                </label>
                {unfulfilledOrders.length === 0 ? (
                  <div style={{ marginTop: '6px', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', fontSize: '0.8rem' }}>
                    All current sales orders are already fulfilled and dispatched! Create a new order first from Sales Orders.
                  </div>
                ) : (
                  <select 
                    value={selectedOrderId} 
                    onChange={(e) => setSelectedOrderId(e.target.value)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    {unfulfilledOrders.map(so => (
                      <option key={so.id} value={so.id}>
                        {so.orderNumber} — {so.customerName} ({so.items.reduce((s, it) => s + it.quantity, 0)} sets)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Transporter / Logistics Partner:
                </label>
                <select 
                  value={transporter} 
                  onChange={(e) => setTransporter(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  <option>VRL Logistics (Surat - Mumbai Fast Track)</option>
                  <option>Shree Maruti Courier & Cargo Express</option>
                  <option>Patel Roadways Commercial Freight</option>
                  <option>Trackon Logistics Nationwide Service</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Transporter LR / Bilty Booking Number:
                </label>
                <input 
                  type="text" 
                  value={lrNo} 
                  onChange={(e) => setLrNo(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--accent-emerald)', fontSize: '0.78rem', color: '#34d399' }}>
                ✓ Physical stock will be deducted, reservation cleared atomically, and Tax Invoice generated automatically.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => setShowNewDispatchModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button 
                  onClick={handleDispatch} 
                  disabled={unfulfilledOrders.length === 0}
                  className="btn-emerald"
                  style={{ opacity: unfulfilledOrders.length === 0 ? 0.5 : 1, cursor: unfulfilledOrders.length === 0 ? 'not-allowed' : 'pointer' }}
                >
                  <Truck size={14} />
                  <span>Confirm Dispatch & Generate Bale Labels</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
