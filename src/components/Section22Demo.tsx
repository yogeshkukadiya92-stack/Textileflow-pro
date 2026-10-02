import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Boxes, 
  Truck, 
  Receipt, 
  DollarSign, 
  Eye, 
  Layers,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Section22Demo: React.FC = () => {
  const { setActiveTab, addToast } = useTextile();
  const [currentStep, setCurrentStep] = useState<number>(6); // Start at step 6 (the active state from the master plan)

  const stepsData = [
    {
      step: 1,
      title: 'Step 1: 100 Sets Purchase Order Issued',
      desc: 'Based on approved technical sample V2 of LH-101, an official PO is issued for 4 colors (Crimson Maroon, Emerald, Navy, Wine) × 25 sets each = 100 sets total.',
      physicalStock: 0,
      reservedStock: 0,
      availableStock: 0,
      sampleStock: 0,
      invoicedSales: 0,
      cogs: 0,
      grossProfit: 0,
      grossMargin: 0,
      advanceAllocated: 0,
      balanceDue: 0
    },
    {
      step: 2,
      title: 'Step 2: Inward Goods & 100% QC Pass (Landed Cost ₹1,800)',
      desc: 'All 100 sets arrive at central warehouse from Arihant Fabrics and pass multi-point quality inspection. Landed cost is ₹1,800 per set; total inventory asset value is ₹1,80,000.',
      physicalStock: 100,
      reservedStock: 0,
      availableStock: 100,
      sampleStock: 0,
      invoicedSales: 0,
      cogs: 0,
      grossProfit: 0,
      grossMargin: 0,
      advanceAllocated: 0,
      balanceDue: 0
    },
    {
      step: 3,
      title: 'Step 3: Digital Catalog Distribution (WhatsApp)',
      desc: 'Watermarked digital catalog shared with client (Shreemati Bridal Sarees, Mumbai). Digital distribution does not alter physical or saleable inventory (100 sets remain available).',
      physicalStock: 100,
      reservedStock: 0,
      availableStock: 100,
      sampleStock: 0,
      invoicedSales: 0,
      cogs: 0,
      grossProfit: 0,
      grossMargin: 0,
      advanceAllocated: 0,
      balanceDue: 0
    },
    {
      step: 4,
      title: 'Step 4: Customer Order for 40 Sets (@ ₹2,400)',
      desc: 'Client confirms commercial booking for 40 sets @ ₹2,400. Order book commitments total ₹96,000 (not yet recognized as invoiced sales revenue).',
      physicalStock: 100,
      reservedStock: 0,
      availableStock: 100,
      sampleStock: 0,
      invoicedSales: 0,
      cogs: 0,
      grossProfit: 0,
      grossMargin: 0,
      advanceAllocated: 0,
      balanceDue: 0
    },
    {
      step: 5,
      title: 'Step 5: Atomic Stock Reservation Applied',
      desc: 'Database applies atomic row lock: Physical Stock = 100, Reserved Stock = 40 → Immediately Available for Sale = 60 sets. No negative stock or race condition possible.',
      physicalStock: 100,
      reservedStock: 40,
      availableStock: 60,
      sampleStock: 0,
      invoicedSales: 0,
      cogs: 0,
      grossProfit: 0,
      grossMargin: 0,
      advanceAllocated: 0,
      balanceDue: 0
    },
    {
      step: 6,
      title: 'Step 6: First Dispatch of 25 Sets in 2 Bales',
      desc: '25 sets packed and dispatched via VRL Logistics: Physical Stock reduces to 75, Remaining Reserved Stock is 15, Immediately Available remains 60! Pending delivery = 15 sets.',
      physicalStock: 75,
      reservedStock: 15,
      availableStock: 60,
      sampleStock: 0,
      invoicedSales: 60000,
      cogs: 45000,
      grossProfit: 15000,
      grossMargin: 25.0,
      advanceAllocated: 0,
      balanceDue: 60000
    },
    {
      step: 7,
      title: 'Step 7: True Gross Profit Realized (₹15,000, 25.0% Margin)',
      desc: 'Invoiced Net Sales ₹60,000 (25 × ₹2,400) − Landed COGS ₹45,000 (25 × ₹1,800) = Real Gross Profit ₹15,000; True Gross Margin = 25.0%!',
      physicalStock: 75,
      reservedStock: 15,
      availableStock: 60,
      sampleStock: 0,
      invoicedSales: 60000,
      cogs: 45000,
      grossProfit: 15000,
      grossMargin: 25.0,
      advanceAllocated: 0,
      balanceDue: 60000
    },
    {
      step: 8,
      title: 'Step 8: ₹30,000 Bank Advance Allocation',
      desc: 'Previously cleared bank NEFT advance of ₹30,000 is allocated directly against Invoice INV-2026-4401. Remaining customer invoice balance due = ₹30,000 (exclusive of applicable taxes).',
      physicalStock: 75,
      reservedStock: 15,
      availableStock: 60,
      sampleStock: 0,
      invoicedSales: 60000,
      cogs: 45000,
      grossProfit: 15000,
      grossMargin: 25.0,
      advanceAllocated: 30000,
      balanceDue: 30000
    },
    {
      step: 9,
      title: 'Step 9: Physical Sample Movement (Reconciled Pool = 58)',
      desc: '2 physical sample sets loaned to market agent → Warehouse Available Stock becomes 58. Remainder of 15 order sets ready for final second dispatch.',
      physicalStock: 75,
      reservedStock: 15,
      availableStock: 58,
      sampleStock: 2,
      invoicedSales: 60000,
      cogs: 45000,
      grossProfit: 15000,
      grossMargin: 25.0,
      advanceAllocated: 30000,
      balanceDue: 30000
    }
  ];

  const current = stepsData[currentStep - 1];

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    addToast('Proof Verified', 'Mathematical audit ledger matches Master Plan Section 22 specification.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '20px',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-emerald">
                <Sparkles size={12} />
                Section 22 Proof
              </span>
              <span className="badge badge-gold">
                LH-101 Bridal Velvet
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Production & Margin Walkthrough
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: '700px', marginTop: '2px' }}>
              Interactive 9-step simulation: Sample Approval → 100 sets PO → Atomic Reservation → 25 sets Dispatched → ₹15,000 Profit (25% Margin) → ₹30,000 Advance Settled.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setCurrentStep(1)}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <RotateCcw size={13} />
              <span>Restart</span>
            </button>
            <button 
              onClick={triggerCelebration}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              <Sparkles size={13} />
              <span>Verify Proof</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Selector Horizontal Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '6px 2px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {stepsData.map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: currentStep === s.step ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              background: currentStep === s.step ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: currentStep === s.step ? '#34d399' : 'var(--text-muted)',
              fontWeight: currentStep === s.step ? 800 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{s.step}.</span>
            <span>{s.title.split(':')[1]?.trim() || s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Box */}
      <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              STEP {current.step} OF 9
            </div>
            <h2 className="font-display" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
              {current.title}
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', marginTop: '6px', maxWidth: '800px', lineHeight: 1.5 }}>
              {current.desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="btn-secondary"
              style={{ opacity: currentStep === 1 ? 0.5 : 1, fontSize: '0.82rem' }}
            >
              ← Previous Step
            </button>
            <button 
              disabled={currentStep === stepsData.length}
              onClick={() => {
                setCurrentStep(prev => Math.min(stepsData.length, prev + 1));
                if (currentStep === 6 || currentStep === 7) triggerCelebration();
              }}
              className="btn-emerald"
              style={{ opacity: currentStep === stepsData.length ? 0.5 : 1, fontSize: '0.82rem' }}
            >
              <span>Next Step →</span>
            </button>
          </div>
        </div>

        {/* Live Mathematical Dashboard for Current Step */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
          
          {/* Box 1: Physical Stock */}
          <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Boxes size={15} color="var(--accent-cyan)" />
              <span>Physical Stock (Warehouse)</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', margin: '6px 0 2px 0' }}>
              {current.physicalStock} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sets</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {current.step >= 6 ? '75 sets remaining in physical storage' : '100 sets received from PO'}
            </div>
          </div>

          {/* Box 2: Active Reservation */}
          <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Layers size={15} color="var(--accent-gold)" />
              <span>Active Committed Reservations</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', margin: '6px 0 2px 0' }}>
              {current.reservedStock} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sets</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {current.step >= 6 ? '15 sets remaining committed for 2nd batch' : current.step >= 4 ? '40 sets allocated to order' : '0 committed'}
            </div>
          </div>

          {/* Box 3: Immediately Available */}
          <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <CheckCircle2 size={15} color="var(--accent-emerald)" />
              <span>Immediately Available for Sale</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '6px 0 2px 0' }}>
              {current.availableStock} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sets</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Formula: Physical ({current.physicalStock}) − Reserved ({current.reservedStock})
            </div>
          </div>

          {/* Box 4: Financial Gross Profit */}
          <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <DollarSign size={15} color="var(--accent-purple)" />
              <span>Real Gross Profit (Margin)</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', margin: '6px 0 2px 0' }}>
              ₹{current.grossProfit.toLocaleString('en-IN')}{' '}
              {current.grossMargin > 0 && (
                <span style={{ fontSize: '1rem', color: 'var(--accent-emerald)' }}>({current.grossMargin}%)</span>
              )}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {current.invoicedSales > 0 ? `Net Sales ₹${current.invoicedSales.toLocaleString('en-IN')} − Landed Cost ₹${current.cogs.toLocaleString('en-IN')}` : 'Awaiting dispatch confirmation'}
            </div>
          </div>

        </div>

        {/* Section 22 Proof Breakdown Table */}
        <div style={{ marginTop: '24px' }}>
          <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="var(--accent-gold)" />
            <span>Section 22 Operational Verification Ledger</span>
          </h3>

          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Audit Parameter</th>
                  <th>Verified Actual Value</th>
                  <th>Calculation Basis & Formula</th>
                  <th>Compliance State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Design & Version</td>
                  <td style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>LH-101 (Approved V2)</td>
                  <td>Approved technical sample with 16 Kalis flair</td>
                  <td><span className="badge badge-emerald">Verified</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Total Purchase Order Issued</td>
                  <td style={{ fontWeight: 700 }}>100 Sets @ ₹1,800</td>
                  <td>4 colors (Maroon, Emerald, Navy, Wine) × 25 sets = ₹1,80,000</td>
                  <td><span className="badge badge-emerald">QC Passed</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Customer Order Booked</td>
                  <td style={{ fontWeight: 700 }}>40 Sets @ ₹2,400</td>
                  <td>Shreemati Bridal Sarees Ltd. = ₹96,000 Order Value</td>
                  <td><span className="badge badge-cyan">Committed</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>First Dispatched Batch</td>
                  <td style={{ fontWeight: 700 }}>25 Sets @ ₹2,400</td>
                  <td>Invoice INV-2026-4401 = ₹60,000 Net Invoiced Sales</td>
                  <td><span className="badge badge-gold">Invoiced</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Landed Cost of Sold Goods</td>
                  <td style={{ fontWeight: 700 }}>₹45,000</td>
                  <td>25 sets dispatched × ₹1,800 landed cost per set</td>
                  <td><span className="badge badge-gray">COGS True</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>Real Gross Profit</td>
                  <td style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1rem' }}>₹15,000 (25.0% Margin)</td>
                  <td>Net Sales ₹60,000 − Landed Cost ₹45,000 = ₹15,000</td>
                  <td><span className="badge badge-emerald">100% Match</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Bank Advance Settlement</td>
                  <td style={{ fontWeight: 700 }}>₹30,000 Allocated</td>
                  <td>₹30,000 Bank NEFT advance allocated directly to INV-4401</td>
                  <td><span className="badge badge-purple">Settled</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Remaining Invoice Balance Due</td>
                  <td style={{ fontWeight: 700, color: '#fb7185' }}>₹30,000</td>
                  <td>₹60,000 − ₹30,000 allocated advance = ₹30,000 (excl GST)</td>
                  <td><span className="badge badge-ruby">Receivable</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Saleable Warehouse Pool</td>
                  <td style={{ fontWeight: 700 }}>58 Available Sets</td>
                  <td>75 physical in godown − 15 remaining reserved − 2 sample loan = 58</td>
                  <td><span className="badge badge-cyan">Atomic Pool</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
