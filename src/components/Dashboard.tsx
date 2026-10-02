import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  Truck, 
  Play, 
  ShieldCheck, 
  Percent,
  Layers,
  ShoppingBag,
  ArrowRight,
  Plus,
  DollarSign,
  MessageSquare
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    designs, 
    salesOrders, 
    invoices, 
    jobOrders, 
    qcRecords, 
    dispatches, 
    whatsAppMessages,
    setActiveTab, 
    runSection22Demo 
  } = useTextile();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'products' | 'pipeline'>('overview');

  // Key Financial Calculations
  const totalInvoicedSales = invoices.reduce((sum, inv) => sum + inv.subtotal, 0);
  const totalCOGS = invoices.reduce((sum, inv) => sum + inv.cogsAmount, 0);
  const totalGrossProfit = totalInvoicedSales - totalCOGS;
  const grossMarginPercent = totalInvoicedSales > 0 ? (totalGrossProfit / totalInvoicedSales) * 100 : 0;
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  
  // Inventory counts
  const totalAvailablePieces = designs.reduce((sum, d) => 
    sum + d.skus.reduce((skuSum, s) => skuSum + s.availableStock, 0), 0
  );
  const totalPhysicalPieces = designs.reduce((sum, d) => 
    sum + d.skus.reduce((skuSum, s) => skuSum + s.readyPhysicalStock, 0), 0
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header: Clean, Peaceful, Uncluttered */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Executive Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Wholesale manufacturing overview, order fulfillment, and live financial metrics.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('sales')} 
            className="btn-secondary" 
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <Plus size={14} />
            <span>New Order</span>
          </button>
          <button 
            onClick={() => setActiveTab('designs')} 
            className="btn-secondary" 
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <Plus size={14} />
            <span>New Design</span>
          </button>
          <button 
            onClick={runSection22Demo} 
            className="btn-primary" 
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            <Play size={13} fill="#000" />
            <span>LH-101 Case Study</span>
          </button>
        </div>
      </div>

      {/* 4 Clean Metric Cards (No noisy formulas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        
        {/* Metric 1 */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Invoiced Revenue
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="var(--accent-gold)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc' }}>
            ₹{totalInvoicedSales.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={13} />
            <span>25 Bridal Sets Billed</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Realized Gross Profit
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={16} color="var(--accent-emerald)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            ₹{totalGrossProfit.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <strong style={{ color: '#34d399' }}>{grossMarginPercent.toFixed(1)}% margin</strong> (Landed ₹1,800/set)
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Available Sellable Stock
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={16} color="var(--accent-cyan)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {totalAvailablePieces} Sets
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {totalPhysicalPieces} sets on hand in warehouse
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Receivables Outstanding
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} color="var(--accent-ruby)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-ruby)' }}>
            ₹{totalOutstanding.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            1 customer balance pending
          </div>
        </div>

      </div>

      {/* Clean Sub-navigation tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveSubTab('overview')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'overview' ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
            color: activeSubTab === 'overview' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'overview' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Activity & Action Items
        </button>

        <button
          onClick={() => setActiveSubTab('products')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'products' ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
            color: activeSubTab === 'products' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'products' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Catalog Margins ({designs.length})
        </button>

        <button
          onClick={() => setActiveSubTab('pipeline')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'pipeline' ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
            color: activeSubTab === 'pipeline' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'pipeline' ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Production Pipeline
        </button>
      </div>

      {/* Tab 1: Activity & Action Items */}
      {activeSubTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '16px' }}>
          
          {/* Recent Orders List */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 800 }}>
                Recent Sales Orders
              </h3>
              <button 
                onClick={() => setActiveTab('sales')} 
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                <span>View all</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {salesOrders.slice(0, 4).map(so => (
                <div 
                  key={so.id}
                  onClick={() => setActiveTab('sales')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{so.orderNumber}</span>
                      <span className="badge badge-gray" style={{ fontSize: '0.62rem' }}>{so.customerCity}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {so.customerName} • {so.items.reduce((sum, it) => sum + it.quantity, 0)} Sets
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc' }}>
                      ₹{so.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <span className={`badge ${so.status === 'Fulfilled' ? 'badge-emerald' : 'badge-gold'}`} style={{ fontSize: '0.62rem', marginTop: '2px' }}>
                      {so.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Required Items */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px' }}>
              Pending Action Items
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Action 1 */}
              <div 
                onClick={() => setActiveTab('finance')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-ruby)' }}>
                    Payment Balance Due
                  </span>
                  <span className="badge badge-ruby">₹33,000</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  INV-2026-4401 (Shreemati Bridal Sarees) net balance pending after advance settlement.
                </div>
              </div>

              {/* Action 2 */}
              <div 
                onClick={() => setActiveTab('qc')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    Inward QC Rework Hold
                  </span>
                  <span className="badge badge-gold">5 Sets</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  5 sets quarantined for minor zari flaw. Awaiting vendor debit note or touch-up.
                </div>
              </div>

              {/* Action 3 */}
              <div 
                onClick={() => setActiveTab('whatsapp')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    WhatsApp AI Order Ready
                  </span>
                  <span className="badge badge-emerald">Needs 1 Click</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  Natural language draft extracted from Royal Heritage Boutique. Confirm to reserve stock.
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Products & Margins */}
      {activeSubTab === 'products' && (
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Design / SKU</th>
                  <th>Category</th>
                  <th>Landed Cost (COGS)</th>
                  <th>Wholesale Price</th>
                  <th>Gross Profit</th>
                  <th>Margin %</th>
                  <th>Sellable Available</th>
                </tr>
              </thead>
              <tbody>
                {designs.map(d => {
                  const unitCost = d.estimatedCost;
                  const unitPrice = d.wholesalePrice;
                  const profit = unitPrice - unitCost;
                  const marginPct = ((profit / unitPrice) * 100).toFixed(1);
                  const available = d.skus.reduce((s, sku) => s + sku.availableStock, 0);

                  return (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>
                        <div>{d.designCode}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.title}</div>
                      </td>
                      <td>{d.category}</td>
                      <td>₹{unitCost.toLocaleString('en-IN')}</td>
                      <td>₹{unitPrice.toLocaleString('en-IN')}</td>
                      <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+₹{profit.toLocaleString('en-IN')}</td>
                      <td>
                        <span className="badge badge-emerald">{marginPct}%</span>
                      </td>
                      <td style={{ fontWeight: 800 }}>{available} Sets</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Production Pipeline */}
      {activeSubTab === 'pipeline' && (
        <div className="glass-panel" style={{ padding: '18px' }}>
          <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px' }}>
            Active Production Batches
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {jobOrders.map(jo => {
              const activeStage = jo.stages.find(s => s.status === 'In Progress') || jo.stages[0];
              return (
                <div key={jo.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{jo.jobOrderNumber}</span>
                    <span className="badge badge-purple">{activeStage ? activeStage.stageName : jo.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Design: {jo.designCode} ({jo.version}) • Status: {jo.status}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                    Total Sets: {jo.totalSets} • Challan: {jo.challanNumber} ({jo.challanDate})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
