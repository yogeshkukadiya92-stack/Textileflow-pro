import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { TaxInvoice, PaymentReceipt } from '../types';
import { 
  Receipt, 
  DollarSign, 
  PieChart, 
  Percent, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Sparkles, 
  CreditCard, 
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Plus,
  X,
  QrCode,
  ShieldCheck,
  Building
} from 'lucide-react';

export const FinanceBilling: React.FC = () => {
  const { invoices, payments, khatas, salesOrders, recordPayment, allocateAdvanceToInvoice, role, searchQuery } = useTextile();
  const [subTab, setSubTab] = useState<'invoices' | 'costing' | 'receipts' | 'aging'>('invoices');
  const [selectedInvoice, setSelectedInvoice] = useState<TaxInvoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // New Payment state
  const [payCustomerId, setPayCustomerId] = useState<string>(khatas.find(k => k.khataType === 'Customer')?.id || '');
  const [payAmount, setPayAmount] = useState<number>(33000);
  const [payMode, setPayMode] = useState<'Bank NEFT/RTGS' | 'UPI' | 'Cheque' | 'Cash'>('Bank NEFT/RTGS');
  const [payRef, setPayRef] = useState<string>('HDFC-N9928172');
  const [payInvoiceNo, setPayInvoiceNo] = useState<string>(invoices[0]?.invoiceNumber || '');

  const handleRecordPayment = () => {
    const cust = khatas.find(k => k.id === payCustomerId);
    if (!cust) return;

    recordPayment({
      customerId: cust.id,
      customerName: cust.name,
      amount: payAmount,
      paymentMode: payMode,
      bankRef: payRef,
      allocatedToInvoices: [
        {
          invoiceNumber: payInvoiceNo,
          amount: payAmount
        }
      ]
    });

    setShowPaymentModal(false);
  };

  // Calculations
  const totalBilled = invoices.reduce((s, i) => s + i.grandTotal, 0);
  const totalReceived = payments.reduce((s, p) => s + p.amount, 0);
  const totalOutstanding = invoices.reduce((s, i) => s + i.balanceDue, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Finance & GST Invoicing
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Tax invoice generation, advance settlement allocation, and landed margin analysis.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {(role === 'owner_admin' || role === 'accounts') && (
            <button onClick={() => setShowPaymentModal(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              <Plus size={15} />
              <span>Record Payment Receipt</span>
            </button>
          )}
        </div>
      </div>

      {/* Financial KPIs Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Receipt size={22} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Invoiced Billing</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>₹{totalBilled.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={22} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bank Realized Receipts</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{totalReceived.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} color="var(--accent-ruby)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Accounts Receivable Outstanding</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-ruby)' }}>₹{totalOutstanding.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Percent size={22} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Realized Gross Margin</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)' }}>25.0% Net</div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
        <button
          onClick={() => setSubTab('invoices')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: subTab === 'invoices' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: subTab === 'invoices' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: subTab === 'invoices' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          Tax Invoices ({invoices.length})
        </button>

        <button
          onClick={() => setSubTab('costing')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: subTab === 'costing' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: subTab === 'costing' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: subTab === 'costing' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <TrendingUp size={14} />
          <span>Section 16 Landed Cost & Profit Explorer</span>
          <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>25.0% Margin</span>
        </button>

        <button
          onClick={() => setSubTab('receipts')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: subTab === 'receipts' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: subTab === 'receipts' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: subTab === 'receipts' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          Bank Payment Receipts ({payments.length})
        </button>

        <button
          onClick={() => setSubTab('aging')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: subTab === 'aging' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: subTab === 'aging' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: subTab === 'aging' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          Receivables Aging Ledger
        </button>
      </div>

      {/* Invoices List */}
      {subTab === 'invoices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {invoices.map(inv => (
            <div key={inv.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>{inv.invoiceNumber}</span>
                    <span className="badge badge-gray">Order: {inv.orderNumber}</span>
                    <span className={`badge ${inv.status === 'Paid Full' ? 'badge-emerald' : 'badge-ruby'}`}>
                      {inv.status}
                    </span>
                    {inv.invoiceNumber === 'INV-2026-4401' && (
                      <span className="badge badge-emerald">✨ Section 22 Proof Invoice</span>
                    )}
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                    {inv.customerName}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    GSTIN: <strong>{inv.gstin}</strong> • Issued: {inv.invoiceDate} • Payment Due: {inv.dueDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GRAND TOTAL (INCL 5% GST)</div>
                  <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                    ₹{inv.grandTotal.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fb7185', fontWeight: 700 }}>
                    Balance Outstanding: ₹{inv.balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Financial Costing Grid (Section 16, Line 200) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                background: 'rgba(10, 13, 20, 0.7)',
                padding: '14px',
                borderRadius: '8px',
                margin: '12px 0'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NET TAXABLE SALES</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>₹{inv.subtotal.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>25 sets @ ₹2,400 wholesale</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LANDED COGS (DIRECT COST)</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-ruby)' }}>₹{inv.cogsAmount.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>25 sets @ ₹1,800 landed cost</div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 800, textTransform: 'uppercase' }}>REAL GROSS PROFIT</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399' }}>₹{inv.grossProfit.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>{inv.grossMarginPercent}% Margin</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ALLOCATED ADVANCE</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#c084fc' }}>₹{inv.allocatedAdvance.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Realized Bank NEFT</div>
                </div>
              </div>

              {/* Compliance & IRN details */}
              {inv.irnNumber && (
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    Government e-Invoice IRN: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{inv.irnNumber.slice(0, 36)}...</span>
                  </div>
                  <div>
                    National e-Way Bill: <span style={{ fontFamily: 'monospace', color: 'var(--accent-gold)' }}>{inv.eWayBillNumber}</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button 
                  onClick={() => setSelectedInvoice(inv)} 
                  className="btn-primary" 
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  <Printer size={13} />
                  <span>View Official GST Tax Invoice</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Landed Costing & Margin Explorer (Section 16, Line 196) */}
      {subTab === 'costing' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--accent-emerald)" />
              <span>Granular Landed Cost Accounting (LH-101 Bridal Lehenga)</span>
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Section 16: Multi-stage Bill of Materials (BOM) cost accounting showing exact ₹1,800 production cost and guaranteed 25.0% wholesale margin.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '20px' }}>
            
            {/* BOM Table */}
            <div className="table-container">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>Cost Element / Production Stage</th>
                    <th>Vendor / Khata Partner</th>
                    <th>Rate Basis</th>
                    <th>Cost per Set</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700 }}>1. Raw Micro Velvet 9000 (Cut Kalis)</td>
                    <td>Arihant Fabrics (Surat)</td>
                    <td>2.8 meters @ ₹250/m</td>
                    <td>₹700</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>2. Multihead Computer Zari Embroidery</td>
                    <td>Balaji Embroidery (Varachha)</td>
                    <td>16 Kalis multihead run</td>
                    <td>₹350</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>3. Hand Zardozi & Stone Setting</td>
                    <td>Jay Ambe Handwork (Navsari)</td>
                    <td>Artisan hand embellishment</td>
                    <td>₹200</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>4. Lining, Micro Can-Can & Tailoring</td>
                    <td>Radhe Krishna Stitching (Ring Road)</td>
                    <td>Flared bridal skirt tailoring</td>
                    <td>₹220</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>5. Soft Net Dupatta & 4-Side Border</td>
                    <td>Arihant Fabrics</td>
                    <td>2.5m Net + Zari Patti</td>
                    <td>₹210</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>6. Steam Pressing, Rigid Box & Inward Freight</td>
                    <td>Mahavir Master Finishers</td>
                    <td>Packaging + Logistics</td>
                    <td>₹120</td>
                  </tr>
                  <tr style={{ background: 'rgba(245, 158, 11, 0.1)', fontWeight: 800 }}>
                    <td colSpan={3} style={{ color: 'var(--accent-gold)' }}>
                      TOTAL CERTIFIED LANDED COST PER SET (Cost of Goods Sold):
                    </td>
                    <td style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>₹1,800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Profit Margin Card */}
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                  Statutory Gross Margin Equation
                </span>
                <div className="font-display" style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399', margin: '8px 0' }}>
                  25.0%
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  (Wholesale Net Sales ₹2,400 − Landed Cost ₹1,800 = ₹600 Unit Profit)
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>For 25 Dispatched Sets (Batch 1):</span>
                  <strong>₹60,000 Invoiced Sales</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Landed COGS (25 × ₹1,800):</span>
                  <strong style={{ color: 'var(--accent-ruby)' }}>−₹45,000 Direct Cost</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-medium)', paddingTop: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>Realized Gross Profit:</span>
                  <strong style={{ color: '#34d399', fontSize: '1rem' }}>+₹15,000 (25.0%)</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Customer Aging Ledger (Master Plan Section 14) */}
      {subTab === 'aging' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '14px' }}>
            Customer Receivables Aging Schedule (Credit Surveillance)
          </h2>

          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Wholesale Customer Party</th>
                  <th>Credit Limit</th>
                  <th>Current (0-15 Days)</th>
                  <th>16-30 Days</th>
                  <th>31-60 Days (Overdue)</th>
                  <th>Total Outstanding</th>
                  <th>Credit Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 800 }}>Shreemati Bridal Sarees (Mumbai)</td>
                  <td>₹10,00,000</td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>₹33,000</td>
                  <td>₹0</td>
                  <td>₹0</td>
                  <td style={{ fontWeight: 800 }}>₹33,000</td>
                  <td><span className="badge badge-emerald">Within Limit</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Royal Heritage Boutique (Delhi)</td>
                  <td>₹8,00,000</td>
                  <td>₹0</td>
                  <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>₹95,000</td>
                  <td>₹0</td>
                  <td style={{ fontWeight: 800 }}>₹95,000</td>
                  <td><span className="badge badge-gold">Follow Up Queued</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Receipts */}
      {subTab === 'receipts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {payments.map(pay => (
            <div key={pay.id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>{pay.receiptNumber}</span>
                  <span className="badge badge-gray">{pay.paymentMode}</span>
                  <span className="badge badge-emerald">Verified Bank Deposit</span>
                </div>
                <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '4px' }}>
                  {pay.customerName}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Bank Reference: <strong>{pay.bankRef}</strong> • Realized Date: {pay.receiptDate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  ₹{pay.amount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Allocated to {pay.allocatedToInvoices[0]?.invoiceNumber || 'Advance Settlement'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Tax Invoice Print Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '680px', background: '#0a0e17' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                Official GST Tax Invoice Preview
              </h2>
              <button onClick={() => setSelectedInvoice(null)} className="btn-secondary" style={{ padding: '4px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ 
              background: '#ffffff', 
              color: '#000000', 
              padding: '24px', 
              borderRadius: '6px', 
              fontFamily: 'Inter, sans-serif'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>TEXTILEFLOW ENTERPRISE LLP</h2>
                  <div style={{ fontSize: '0.8rem', color: '#333' }}>Millennium Textile Market, Ring Road, Surat, Gujarat - 395002</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>GSTIN: 24AAACT1234F1Z8 | State Code: 24 (Gujarat)</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#000' }}>TAX INVOICE</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{selectedInvoice.invoiceNumber}</div>
                  <div style={{ fontSize: '0.75rem' }}>Date: {selectedInvoice.invoiceDate}</div>
                </div>
              </div>

              {/* Bill to */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', fontSize: '0.8rem' }}>
                <div style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
                  <strong style={{ textDecoration: 'underline' }}>BILLED TO:</strong><br />
                  <strong>{selectedInvoice.customerName}</strong><br />
                  GSTIN: {selectedInvoice.gstin}<br />
                  Place of Supply: Maharashtra (State Code: 27)
                </div>
                <div style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
                  <strong style={{ textDecoration: 'underline' }}>DESPATCH & ORDER REF:</strong><br />
                  Order No: <strong>{selectedInvoice.orderNumber}</strong><br />
                  e-Way Bill No: <strong>{selectedInvoice.eWayBillNumber}</strong><br />
                  Due Date: <strong>{selectedInvoice.dueDate}</strong>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '12px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Item Description</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>HSN</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Rate (₹)</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Taxable Amt (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {((salesOrders.find(s => s.id === selectedInvoice.salesOrderId || s.orderNumber === selectedInvoice.orderNumber)?.items) || [
                    { skuCode: 'LH-101-MAR-FS', color: 'Maroon', quantity: 25, unitPrice: 2400, allocatedQty: 25, dispatchedQty: 25, gstRate: 5 }
                  ]).map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px' }}>LH-101 Bridal Velvet Lehenga ({it.color})</td>
                      <td style={{ padding: '6px', textAlign: 'center' }}>6204</td>
                      <td style={{ padding: '6px', textAlign: 'center' }}>{it.quantity} Sets</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>₹{it.unitPrice.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>₹{(it.quantity * it.unitPrice).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '2px solid #000', paddingTop: '8px', fontSize: '0.85rem' }}>
                <div style={{ maxWidth: '300px', fontSize: '0.72rem' }}>
                  <strong>IRN:</strong> <span style={{ wordBreak: 'break-all' }}>{selectedInvoice.irnNumber}</span><br />
                  <strong>Bank:</strong> HDFC Bank Ltd, Ring Road Branch<br />
                  <strong>A/C No:</strong> 50200088921820 | <strong>IFSC:</strong> HDFC0001024
                </div>
                <div style={{ width: '220px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Taxable Subtotal:</span>
                    <strong>₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Integrated GST (5%):</span>
                    <strong>₹{selectedInvoice.gstTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #000', paddingTop: '3px', fontWeight: 900 }}>
                    <span>Invoice Total:</span>
                    <span>₹{selectedInvoice.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>Advance Allocated:</span>
                    <span>−₹{selectedInvoice.allocatedAdvance.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #000', paddingTop: '3px', fontWeight: 900, color: '#dc2626' }}>
                    <span>Balance Payable:</span>
                    <span>₹{selectedInvoice.balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => window.print()} className="btn-primary" style={{ fontSize: '0.8rem' }}>
                <Printer size={14} />
                <span>Print Official Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '520px' }}>
            <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              Record Payment Receipt
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Deposit wholesale remittance to settle outstanding invoice balance or credit advance ledger.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Customer Account:
                </label>
                <select 
                  value={payCustomerId} 
                  onChange={(e) => setPayCustomerId(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {khatas.filter(k => k.khataType === 'Customer').map(k => (
                    <option key={k.id} value={k.id}>{k.name} ({k.city})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Select Invoice to Allocate:
                </label>
                <select 
                  value={payInvoiceNo} 
                  onChange={(e) => {
                    setPayInvoiceNo(e.target.value);
                    const inv = invoices.find(i => i.invoiceNumber === e.target.value);
                    if (inv) setPayAmount(inv.balanceDue);
                  }} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {invoices.map(i => (
                    <option key={i.id} value={i.invoiceNumber}>
                      {i.invoiceNumber} — Balance Due: ₹{i.balanceDue.toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Payment Mode:
                  </label>
                  <select 
                    value={payMode} 
                    onChange={(e) => setPayMode(e.target.value as any)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    <option value="Bank NEFT/RTGS">Bank NEFT/RTGS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Received Amount (₹):
                  </label>
                  <input 
                    type="number" 
                    value={payAmount} 
                    onChange={(e) => setPayAmount(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Bank UTR / Transaction Reference:
                </label>
                <input 
                  type="text" 
                  value={payRef} 
                  onChange={(e) => setPayRef(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => setShowPaymentModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleRecordPayment} className="btn-emerald">
                  <CheckCircle2 size={14} />
                  <span>Confirm Receipt & Settle Invoice</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
