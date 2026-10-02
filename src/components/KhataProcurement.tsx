import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { KhataParty, PurchaseOrder } from '../types';
import { 
  Users, 
  Plus, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  Calendar, 
  Building2, 
  Phone, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  Truck,
  RotateCw
} from 'lucide-react';

export const KhataProcurement: React.FC = () => {
  const { 
    khatas, 
    purchaseOrders, 
    designs, 
    createPurchaseOrder, 
    updatePOStatus, 
    submitQCInspection, 
    role, 
    searchQuery,
    addToast 
  } = useTextile();

  const [activeTabSub, setActiveTabSub] = useState<'pos' | 'threeway' | 'khatas'>('pos');
  const [showNewPOModal, setShowNewPOModal] = useState<boolean>(false);

  // New PO State
  const [selectedKhataId, setSelectedKhataId] = useState<string>(khatas[0]?.id || '');
  const [selectedDesignCode, setSelectedDesignCode] = useState<string>('LH-101');
  const [orderQty, setOrderQty] = useState<number>(100);
  const [ratePerSet, setRatePerSet] = useState<number>(1800);
  const [advanceAmount, setAdvanceAmount] = useState<number>(50000);
  const [dueDate, setDueDate] = useState<string>('2026-10-18');
  const [tolerance, setTolerance] = useState<number>(5);

  const filteredKhatas = khatas.filter(k => 
    k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.khataType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const targetKhata = khatas.find(k => k.id === selectedKhataId);
    const targetDesign = designs.find(d => d.designCode === selectedDesignCode);

    createPurchaseOrder({
      khataId: selectedKhataId,
      khataName: targetKhata ? targetKhata.name : 'Arihant Fabrics & Weaving Mills',
      orderType: 'Finished Goods',
      deliveryDueDate: dueDate,
      advancePaid: advanceAmount,
      totalAmount: orderQty * ratePerSet,
      items: [
        {
          designCode: selectedDesignCode,
          version: targetDesign?.currentVersion || 'V2',
          skuCode: `${selectedDesignCode}-ALL`,
          color: '4 Color Assortment',
          orderedQty: orderQty,
          receivedQty: 0,
          ratePerSet: ratePerSet,
          tolerancePercent: tolerance
        }
      ]
    });

    setShowNewPOModal(false);
  };

  const handleReceiveGoods = (po: PurchaseOrder) => {
    const item = po.items[0];
    submitQCInspection({
      referencePoOrJob: `${po.poNumber} (${po.items[0]?.designCode || 'LH-101'})`,
      designCode: item?.designCode || 'LH-101',
      totalReceived: item?.orderedQty || 100,
      acceptedQty: item?.orderedQty || 100,
      reworkQty: 0,
      rejectedQty: 0,
      notes: `Goods received against official PO ${po.poNumber}. Transferred to Inward QC.`
    });

    updatePOStatus(po.id, 'Completed');
    addToast('Goods Received', `Inward GRN generated for ${po.poNumber}. Transferred to QC inspection.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Khatas & Procurement Operations
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Production khatas, fabric suppliers, Purchase Orders with technical version snapshots, and 3-Way Matching payout verification.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {(role === 'owner_admin' || role === 'purchase_production') && (
            <button onClick={() => setShowNewPOModal(true)} className="btn-primary" style={{ fontSize: '0.82rem' }}>
              <Plus size={16} />
              <span>+ Issue Purchase Order (PO)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
        <button
          onClick={() => setActiveTabSub('pos')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTabSub === 'pos' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeTabSub === 'pos' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeTabSub === 'pos' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          Purchase Orders ({purchaseOrders.length})
        </button>

        <button
          onClick={() => setActiveTabSub('threeway')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTabSub === 'threeway' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeTabSub === 'threeway' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeTabSub === 'threeway' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ShieldCheck size={15} />
          <span>3-Way Matching Payout Queue</span>
          <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Active Audit</span>
        </button>

        <button
          onClick={() => setActiveTabSub('khatas')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTabSub === 'khatas' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeTabSub === 'khatas' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeTabSub === 'khatas' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          Khata & Supplier Directory ({filteredKhatas.length})
        </button>
      </div>

      {/* PO View */}
      {activeTabSub === 'pos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {purchaseOrders.map(po => (
            <div key={po.id} className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>{po.poNumber}</span>
                    <span className="badge badge-gray">{po.orderType}</span>
                    <span className={`badge ${po.status === 'Completed' ? 'badge-emerald' : po.status === 'In Production' ? 'badge-purple' : 'badge-cyan'}`}>
                      {po.status}
                    </span>
                    {po.poNumber === 'PO-2026-1001' && (
                      <span className="badge badge-emerald">✨ Section 22 Benchmark PO</span>
                    )}
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                    {po.khataName}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Order Date: {po.orderDate} • Delivery Due Date: <strong>{po.deliveryDueDate}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Total Order Value
                  </div>
                  <div className="font-display" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ₹{po.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                    Advance Paid: ₹{po.advancePaid.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="table-container">
                <table className="luxury-table">
                  <thead>
                    <tr>
                      <th>Design Code</th>
                      <th>Version</th>
                      <th>Color / Breakup</th>
                      <th>Ordered Quantity</th>
                      <th>Received Quantity</th>
                      <th>Rate per Set</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {po.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{item.designCode}</td>
                        <td><span className="badge badge-gray">{item.version}</span></td>
                        <td>{item.color}</td>
                        <td style={{ fontWeight: 700 }}>{item.orderedQty} sets</td>
                        <td style={{ color: item.receivedQty === item.orderedQty ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 700 }}>
                          {item.receivedQty} sets
                        </td>
                        <td>₹{item.ratePerSet.toLocaleString('en-IN')}</td>
                        <td style={{ fontWeight: 800 }}>₹{(item.orderedQty * item.ratePerSet).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong>Payment Terms:</strong> {po.paymentTerms}
                </div>

                {po.status !== 'Completed' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {po.status === 'Sent' && (
                      <button 
                        onClick={() => updatePOStatus(po.id, 'In Production')}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        <RotateCw size={12} />
                        <span>Mark In Production</span>
                      </button>
                    )}
                    <button 
                      onClick={() => handleReceiveGoods(po)}
                      className="btn-emerald"
                      style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                    >
                      <Truck size={12} />
                      <span>Receive Goods & Trigger Inward QC</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3-Way Matching Queue (Master Plan Section 6, Line 76) */}
      {activeTabSub === 'threeway' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--accent-emerald)" />
              <span>3-Way Payout Verification Queue</span>
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Section 6: Triangulate Approved PO Rate/Qty vs QC Accepted Physical Stock vs Supplier Tax Bill before authorizing accounts disbursement.
            </p>
          </div>

          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>PO Reference</th>
                  <th>Supplier Khata</th>
                  <th>PO Approved Terms</th>
                  <th>QC Inward Accepted</th>
                  <th>Vendor Bill Amount</th>
                  <th>Variance Audit</th>
                  <th>Disbursement Gate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>PO-2026-1001</td>
                  <td>Arihant Fabrics & Weaving Mills</td>
                  <td>100 sets @ ₹1,800 (₹1,80,000)</td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>100 sets (GRN-2026-081)</td>
                  <td>₹1,80,000</td>
                  <td>
                    <span className="badge badge-emerald">0% Variance (100% Match)</span>
                  </td>
                  <td>
                    <button 
                      onClick={() => addToast('Payout Authorized', 'PO-2026-1001 cleared for accounts payment voucher.', 'success')}
                      className="btn-emerald" 
                      style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                    >
                      <Check size={12} />
                      <span>Authorize Payout</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>PO-2026-0988</td>
                  <td>Balaji Multihead Embroidery Works</td>
                  <td>50 sets @ ₹2,200 (₹1,10,000)</td>
                  <td style={{ color: 'var(--accent-ruby)', fontWeight: 700 }}>45 sets accepted (5 rework)</td>
                  <td>₹1,10,000 (Full Invoiced)</td>
                  <td>
                    <span className="badge badge-ruby">₹11,000 Qty Mismatch</span>
                  </td>
                  <td>
                    <button 
                      onClick={() => addToast('Debit Note Raised', 'Debit note issued for 5 rework pieces. Payment held.', 'warning')}
                      className="btn-ruby" 
                      style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                    >
                      <AlertTriangle size={12} />
                      <span>Raise Debit Note / Hold</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Khatas Directory */}
      {activeTabSub === 'khatas' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredKhatas.map(khata => (
            <div key={khata.id} className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="badge badge-gray">{khata.khataType}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent-gold)' }}>
                  <Star size={14} fill="var(--accent-gold)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>{khata.qualityRating}</span>
                </div>
              </div>

              <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>
                {khata.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                <Building2 size={13} />
                <span>{khata.city}</span>
                <span>•</span>
                <Phone size={13} />
                <span>{khata.phone}</span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {khata.gstin && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>GSTIN:</span>
                    <span style={{ fontFamily: 'monospace' }}>{khata.gstin}</span>
                  </div>
                )}
                {khata.capacityPerMonth && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Monthly Capacity:</span>
                    <span style={{ fontWeight: 700 }}>{khata.capacityPerMonth} sets/month</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Lead Time:</span>
                  <span>{khata.leadTimeDays} business days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '2px' }}>
                  <span style={{ fontWeight: 700 }}>Balance Standing:</span>
                  <span style={{ fontWeight: 800, color: khata.khataType === 'Customer' ? 'var(--accent-emerald)' : 'var(--accent-gold)' }}>
                    ₹{khata.outstandingBalance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Purchase Order Modal */}
      {showNewPOModal && (
        <div className="modal-overlay" onClick={() => setShowNewPOModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '600px' }}>
            <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px', color: 'var(--accent-gold)' }}>
              Issue Official Purchase Order
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Generate commercial PO with technical version snapshot, colour-size assortment breakup, delivery schedule, and advance payment terms.
            </p>

            <form onSubmit={handleCreatePO} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Select Supplier / Khata:</label>
                <select 
                  value={selectedKhataId} 
                  onChange={(e) => setSelectedKhataId(e.target.value)}
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {khatas.filter(k => k.khataType !== 'Customer').map(k => (
                    <option key={k.id} value={k.id}>{k.name} ({k.city})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Target Design:</label>
                <select 
                  value={selectedDesignCode} 
                  onChange={(e) => setSelectedDesignCode(e.target.value)}
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {designs.map(d => (
                    <option key={d.id} value={d.designCode}>{d.designCode} — {d.title} ({d.currentVersion})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Order Quantity (Sets):</label>
                  <input 
                    type="number" 
                    value={orderQty} 
                    onChange={(e) => setOrderQty(Number(e.target.value))} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Approved Rate per Set (₹):</label>
                  <input 
                    type="number" 
                    value={ratePerSet} 
                    onChange={(e) => setRatePerSet(Number(e.target.value))} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Advance Paid (₹):</label>
                  <input 
                    type="number" 
                    value={advanceAmount} 
                    onChange={(e) => setAdvanceAmount(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Delivery Due Date:</label>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.95rem' }}>
                  <span>Calculated Purchase Order Total:</span>
                  <span style={{ color: 'var(--accent-gold)' }}>₹{(orderQty * ratePerSet).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowNewPOModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <span>Confirm & Issue Purchase Order</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
