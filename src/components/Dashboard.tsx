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
  ShoppingCart,
  ArrowRight, 
  Plus, 
  DollarSign, 
  MessageSquare, 
  AlertCircle, 
  Calendar, 
  Users, 
  Scissors, 
  Activity, 
  FileText, 
  X, 
  ChevronRight,
  Boxes,
  RotateCw,
  Eye,
  BadgeAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Dashboard: React.FC = () => {
  const { 
    designs, 
    salesOrders, 
    invoices, 
    payments,
    jobOrders, 
    qcRecords, 
    dispatches, 
    whatsAppMessages,
    khatas,
    setActiveTab, 
    runSection22Demo,
    createSalesOrder,
    recordPayment,
    convertWhatsAppDraft,
    triggerToast,
    t,
    lang
  } = useTextile();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'products' | 'pipeline' | 'financials'>('overview');
  
  // Dashboard Quick Modals
  const [showQuickOrderModal, setShowQuickOrderModal] = useState<boolean>(false);
  const [showQuickPayModal, setShowQuickPayModal] = useState<boolean>(false);

  // Quick Order State
  const customerList = khatas.filter(k => k.khataType === 'Customer');
  const [orderCustId, setOrderCustId] = useState<string>(customerList[0]?.id || '');
  const [orderDesignCode, setOrderDesignCode] = useState<string>(designs[0]?.designCode || 'LH-101');
  const activeDesignObj = designs.find(d => d.designCode === orderDesignCode) || designs[0];
  const [orderSku, setOrderSku] = useState<string>(activeDesignObj?.skus[0]?.skuCode || '');
  const [orderQty, setOrderQty] = useState<number>(20);
  const [orderRate, setOrderRate] = useState<number>(activeDesignObj?.wholesalePrice || 2400);
  const [orderAdvance, setOrderAdvance] = useState<number>(10000);

  // Quick Payment State
  const [payCustId, setPayCustId] = useState<string>(customerList[0]?.id || '');
  const [payInvNumber, setPayInvNumber] = useState<string>(invoices[0]?.invoiceNumber || '');
  const [payAmount, setPayAmount] = useState<number>(invoices[0]?.balanceDue || 25000);
  const [payMode, setPayMode] = useState<'Bank NEFT/RTGS' | 'UPI' | 'Cheque' | 'Cash'>('Bank NEFT/RTGS');
  const [payUtr, setPayUtr] = useState<string>('HDFC-N9928172');

  // Key Financial Calculations
  const totalInvoicedSales = invoices.reduce((sum, inv) => sum + inv.subtotal, 0);
  const totalCOGS = invoices.reduce((sum, inv) => sum + inv.cogsAmount, 0);
  const totalGrossProfit = totalInvoicedSales - totalCOGS;
  const grossMarginPercent = totalInvoicedSales > 0 ? (totalGrossProfit / totalInvoicedSales) * 100 : 25;
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const totalPaymentsReceived = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalOrderBook = salesOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Inventory Metrics
  const totalPhysicalPieces = designs.reduce((sum, d) => 
    sum + d.skus.reduce((skuSum, s) => skuSum + s.readyPhysicalStock, 0), 0
  );
  const totalReservedPieces = designs.reduce((sum, d) => 
    sum + d.skus.reduce((skuSum, s) => skuSum + s.reservedStock, 0), 0
  );
  const totalAvailablePieces = Math.max(0, totalPhysicalPieces - totalReservedPieces);
  const totalInventoryAssetValue = designs.reduce((sum, d) => 
    sum + (d.estimatedCost * d.skus.reduce((sSum, s) => sSum + s.readyPhysicalStock, 0)), 0
  );

  // Production WIP metrics
  const activeJobs = jobOrders.filter(j => j.status !== 'Completed');
  const totalWipSets = activeJobs.reduce((sum, j) => sum + j.totalSets, 0);

  // Action Items Computations
  const pendingInvoices = invoices.filter(inv => inv.balanceDue > 0);
  const qcExceptions = qcRecords.filter(r => (r.reworkQty || 0) > 0 || (r.rejectedQty || 0) > 0 || (r.holdQty || 0) > 0);
  const pendingDraftMessages = whatsAppMessages.filter(m => m.extractedOrderDraft !== undefined);
  
  // Low Stock Watchlist (Available stock < 10)
  const lowStockSkus = designs.flatMap(d => 
    d.skus.filter(s => s.availableStock < 10).map(s => ({
      ...s,
      designCode: d.designCode,
      designTitle: d.title,
      category: d.category,
      wholesalePrice: d.wholesalePrice
    }))
  );

  // Handlers
  const handleQuickCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = khatas.find(k => k.id === orderCustId);
    if (!cust) {
      triggerToast('Please select a valid customer', 'error');
      return;
    }
    if (orderQty <= 0) {
      triggerToast('Quantity must be greater than zero', 'error');
      return;
    }

    const orderSuccess = createSalesOrder({
      customerId: cust.id,
      customerName: cust.name,
      customerCity: cust.city,
      orderType: 'Ready Stock',
      advanceReceived: orderAdvance,
      totalAmount: orderQty * orderRate,
      items: [
        {
          skuCode: orderSku,
          color: activeDesignObj.skus.find(s => s.skuCode === orderSku)?.color || 'Maroon',
          quantity: orderQty,
          unitPrice: orderRate,
          allocatedQty: orderQty,
          dispatchedQty: 0,
          gstRate: 5
        }
      ]
    });

    if (orderSuccess) {
      setShowQuickOrderModal(false);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleQuickRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = khatas.find(k => k.id === payCustId);
    if (!cust) return;

    recordPayment({
      customerId: cust.id,
      customerName: cust.name,
      amount: payAmount,
      paymentMode: payMode,
      bankRef: payUtr,
      allocatedToInvoices: [
        {
          invoiceNumber: payInvNumber,
          amount: payAmount
        }
      ]
    });

    setShowQuickPayModal(false);
    confetti({ particleCount: 60, spread: 70 });
  };

  const handle1ClickWhatsAppDraft = (msgId: string) => {
    convertWhatsAppDraft(msgId);
    confetti({ particleCount: 80, spread: 80 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header: Clean, Executive Command Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className="font-display" style={{ fontSize: '1.55rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {lang === 'gu' ? 'મુખ્ય કારોબારી ડેશબોર્ડ' : 'Executive Command Dashboard'}
            </h1>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              ● Live Real-Time
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            {lang === 'gu' 
              ? 'હોલસેલ સાડી-લેહંગા ઉત્પાદન, સ્ટોક અનામત, ડિસ્પેચ અને નાણાકીય નફાનો વાસ્તવિક હિસાબ.' 
              : 'Wholesale manufacturing metrics, atomic stock allocations, live logistics, and GST margin realization.'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowQuickOrderModal(true)} 
            className="btn-primary" 
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            <Plus size={15} />
            <span>{lang === 'gu' ? '+ નવો ઓર્ડર' : '+ New Order'}</span>
          </button>
          
          <button 
            onClick={() => setShowQuickPayModal(true)} 
            className="btn-secondary" 
            style={{ fontSize: '0.8rem', padding: '7px 12px' }}
          >
            <DollarSign size={15} color="var(--accent-emerald)" />
            <span>{lang === 'gu' ? 'પેમેન્ટ જમા' : 'Receive Payment'}</span>
          </button>

          <button 
            onClick={() => setActiveTab('qc')} 
            className="btn-secondary" 
            style={{ fontSize: '0.8rem', padding: '7px 12px' }}
          >
            <ShieldCheck size={15} color="var(--accent-cyan)" />
            <span>{lang === 'gu' ? 'ઇનવર્ડ QC' : 'Inward QC'}</span>
          </button>

          <button 
            onClick={runSection22Demo} 
            className="btn-primary" 
            style={{ fontSize: '0.8rem', padding: '7px 14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}
          >
            <Play size={13} fill="#fff" />
            <span>{lang === 'gu' ? 'સેક્શન ૨૨ ઉદાહરણ' : 'LH-101 Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* 6 Key Operational & Financial KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
        
        {/* Metric 1: Invoiced Sales */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'ઇન્વૉઇસ્ડ વેચાણ (Net)' : 'Invoiced Net Sales'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="var(--accent-gold)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc' }}>
            ₹{totalInvoicedSales.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={13} />
            <span>{invoices.length} Verified Tax Invoices</span>
          </div>
        </div>

        {/* Metric 2: Realized Gross Profit & Margin */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'વાસ્તવિક નફો (Gross Profit)' : 'Realized Gross Profit'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={16} color="var(--accent-emerald)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            ₹{totalGrossProfit.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <strong style={{ color: '#34d399' }}>{grossMarginPercent.toFixed(1)}% margin</strong> • Landed ₹1,800/set
          </div>
        </div>

        {/* Metric 3: Available Sellable Stock */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'વેચાણપાત્ર અનરિઝર્વ્ડ સ્ટોક' : 'Available Unreserved Stock'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={16} color="var(--accent-cyan)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {totalAvailablePieces} Sets
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {totalPhysicalPieces} on hand ({totalReservedPieces} reserved)
          </div>
        </div>

        {/* Metric 4: Receivables Outstanding */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'વસૂલાત બાકી રકમ (Due)' : 'Outstanding Receivables'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} color="var(--accent-ruby)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-ruby)' }}>
            ₹{totalOutstanding.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {pendingInvoices.length} account{pendingInvoices.length !== 1 ? 's' : ''} with balance due
          </div>
        </div>

        {/* Metric 5: Artisan Production WIP */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'કારીગર ખાતામાં ચાલુ માલ (WIP)' : 'Artisan Production WIP'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(192, 132, 252, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scissors size={16} color="var(--accent-purple)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-purple)' }}>
            {totalWipSets} Sets
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {activeJobs.length} active challans in embroidery/stitching
          </div>
        </div>

        {/* Metric 6: Warehouse Asset Valuation */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'gu' ? 'ગોડાઉન સ્ટોક મૂલ્યાંકન' : 'Warehouse Stock Value'}
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boxes size={16} color="var(--accent-gold)" />
            </div>
          </div>
          <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc' }}>
            ₹{totalInventoryAssetValue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            At landed manufacturing cost
          </div>
        </div>

      </div>

      {/* Visual Analytics Bar: Cash-flow & Inventory Health */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
              Cash Flow Realization & Inventory Utilization Health
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Direct snapshot of billed collections, advance settlements, and unallocated warehouse stock.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-emerald)' }} />
              <span>Received: ₹{totalPaymentsReceived.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-ruby)' }} />
              <span>Outstanding Due: ₹{totalOutstanding.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-cyan)' }} />
              <span>Available Sets: {totalAvailablePieces}</span>
            </div>
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div style={{ width: '100%', height: '10px', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${Math.min(100, (totalPaymentsReceived / Math.max(1, totalInvoicedSales + totalPaymentsReceived)) * 100)}%`, 
              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
              transition: 'width 0.4s ease'
            }} 
            title="Collected Payments"
          />
          <div 
            style={{ 
              width: `${Math.min(100, (totalOutstanding / Math.max(1, totalInvoicedSales + totalPaymentsReceived)) * 100)}%`, 
              background: 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)',
              transition: 'width 0.4s ease'
            }} 
            title="Pending Due"
          />
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveSubTab('overview')}
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'overview' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeSubTab === 'overview' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'overview' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'gu' ? 'કાર્યવાહી અને ઓર્ડર્સ' : 'Overview & Action Queue'} ({pendingInvoices.length + qcExceptions.length + pendingDraftMessages.length})
        </button>

        <button
          onClick={() => setActiveSubTab('products')}
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'products' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeSubTab === 'products' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'products' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'gu' ? 'કેટલોગ અને નફો' : 'Catalog Margins & Stock'} ({designs.length})
        </button>

        <button
          onClick={() => setActiveSubTab('pipeline')}
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'pipeline' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeSubTab === 'pipeline' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'pipeline' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'gu' ? 'જોબવર્ક પાઇપલાઇન' : 'Artisan Production Pipeline'} ({jobOrders.length})
        </button>

        <button
          onClick={() => setActiveSubTab('financials')}
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeSubTab === 'financials' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: activeSubTab === 'financials' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: activeSubTab === 'financials' ? 800 : 600,
            cursor: 'pointer',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'gu' ? 'હિસાબ અને બાકી રકમ' : 'Receivables & Ledgers'} (₹{totalOutstanding.toLocaleString('en-IN')})
        </button>
      </div>

      {/* Subtab 1: Overview & Action Items */}
      {activeSubTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)', gap: '16px' }}>
          
          {/* Left Column: Recent Sales Orders & Active Logistics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Recent Sales Orders Panel */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={18} color="var(--accent-gold)" />
                  <h3 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                    {lang === 'gu' ? 'તાજેતરના હોલસેલ ઓર્ડર્સ' : 'Recent Wholesale Orders'}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveTab('sales')} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>{lang === 'gu' ? 'બધા ઓર્ડર જુઓ' : 'View all orders'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {salesOrders.slice(0, 5).map(so => {
                  const totalSetsInOrder = so.items.reduce((sum, it) => sum + it.quantity, 0);
                  const isFulfilled = so.status === 'Fulfilled';

                  return (
                    <div 
                      key={so.id}
                      onClick={() => setActiveTab('sales')}
                      style={{
                        padding: '12px 14px',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#f8fafc' }}>{so.orderNumber}</span>
                          <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>{so.customerCity}</span>
                          <span className={`badge ${isFulfilled ? 'badge-emerald' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                            {so.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                          {so.customerName} • {totalSetsInOrder} Sets • Adv ₹{so.advanceReceived?.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>
                          ₹{so.totalAmount.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                          {so.orderDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Logistics & Transporters */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={18} color="var(--accent-cyan)" />
                  <h3 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                    {lang === 'gu' ? 'ડિસ્પેચ અને ટ્રાન્સપોર્ટર બિલ્ટી (LR)' : 'Active Dispatches & Consignments'}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveTab('dispatch')} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>{lang === 'gu' ? 'લોજિસ્ટિક્સ મેનેજ' : 'Manage Logistics'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dispatches.map(dsp => (
                  <div 
                    key={dsp.id} 
                    onClick={() => setActiveTab('dispatch')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(56, 189, 248, 0.04)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{dsp.dispatchNumber}</span>
                        <strong style={{ fontSize: '0.85rem' }}>{dsp.customerName}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {dsp.transporterName} • LR: {dsp.lrNumber} ({dsp.freightType})
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`badge ${dsp.deliveryStatus === 'Delivered' ? 'badge-emerald' : 'badge-cyan'}`}>
                        {dsp.deliveryStatus}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '2px' }}>
                        {dsp.cartonCount} Bales Packed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Dynamic Action Required Feed */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} color="var(--accent-gold)" />
                <h3 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                  {lang === 'gu' ? 'તાત્કાલિક ધ્યાન આપવા જેવી બાબતો' : 'Real-Time Action Required'}
                </h3>
              </div>
              <span className="badge badge-gold">
                {pendingInvoices.length + qcExceptions.length + pendingDraftMessages.length + lowStockSkus.length} Items
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* WhatsApp AI Order Ready */}
              {pendingDraftMessages.map(msg => (
                <div 
                  key={msg.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={14} color="var(--accent-emerald)" />
                      <strong style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
                        WhatsApp AI Order Draft Ready
                      </strong>
                    </div>
                    <span className="badge badge-emerald">Needs 1 Click</span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    <strong>{msg.partyName}</strong> wants {msg.extractedOrderDraft?.totalSets} sets ({msg.extractedOrderDraft?.designCode} @ ₹{msg.extractedOrderDraft?.suggestedRate}).
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button 
                      onClick={() => handle1ClickWhatsAppDraft(msg.id)}
                      className="btn-emerald" 
                      style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                    >
                      <CheckCircle2 size={12} />
                      <span>Confirm & Reserve Stock</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('whatsapp')}
                      className="btn-secondary" 
                      style={{ fontSize: '0.74rem', padding: '4px 8px' }}
                    >
                      View Chat
                    </button>
                  </div>
                </div>
              ))}

              {/* Outstanding Invoices Action */}
              {pendingInvoices.map(inv => (
                <div 
                  key={inv.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(244, 63, 94, 0.08)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <DollarSign size={14} color="var(--accent-ruby)" />
                      <strong style={{ fontSize: '0.8rem', color: 'var(--accent-ruby)' }}>
                        Balance Payment Due
                      </strong>
                    </div>
                    <span className="badge badge-ruby">₹{inv.balanceDue.toLocaleString('en-IN')}</span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    {inv.invoiceNumber} • <strong>{inv.customerName}</strong> net balance pending after advance settlement.
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button 
                      onClick={() => {
                        setPayCustId(inv.customerId);
                        setPayInvNumber(inv.invoiceNumber);
                        setPayAmount(inv.balanceDue);
                        setShowQuickPayModal(true);
                      }}
                      className="btn-primary" 
                      style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                    >
                      <span>Collect Payment</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('finance')}
                      className="btn-secondary" 
                      style={{ fontSize: '0.74rem', padding: '4px 8px' }}
                    >
                      Open Invoice
                    </button>
                  </div>
                </div>
              ))}

              {/* QC Exceptions */}
              {qcExceptions.map(qc => (
                <div 
                  key={qc.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} color="var(--accent-gold)" />
                      <strong style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                        QC Quarantine / Hold
                      </strong>
                    </div>
                    <span className="badge badge-gold">{qc.reworkQty || qc.rejectedQty} Sets</span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    GRN {qc.grnNumber} ({qc.designCode}) has {qc.reworkQty} rework and {qc.rejectedQty} rejected sets.
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button 
                      onClick={() => setActiveTab('qc')}
                      className="btn-secondary" 
                      style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                    >
                      <span>Inspect in QC</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Low Stock SKUs Watchlist */}
              {lowStockSkus.length > 0 && (
                <div 
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={14} color="var(--accent-cyan)" />
                      <strong style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                        Low Stock Reorder Watchlist
                      </strong>
                    </div>
                    <span className="badge badge-cyan">{lowStockSkus.length} SKUs Low</span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    {lowStockSkus[0]?.skuCode} ({lowStockSkus[0]?.color}) has only {lowStockSkus[0]?.availableStock} sets available.
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button 
                      onClick={() => setActiveTab('khatas')}
                      className="btn-primary" 
                      style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                    >
                      <span>Issue Factory PO</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Empty state if all action items cleared */}
              {pendingInvoices.length === 0 && qcExceptions.length === 0 && pendingDraftMessages.length === 0 && lowStockSkus.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={24} style={{ margin: '0 auto 6px auto' }} />
                  <div>All operational queues are clear! Excellent manufacturing flow.</div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* Subtab 2: Products Margins & Valuation */}
      {activeSubTab === 'products' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {lang === 'gu' ? 'પ્રોડક્ટ માર્જિન અને ગોડાઉન સ્ટોક મૂલ્યાંકન' : 'Catalog Margins & Live Valuation'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Manufacturing cost vs Wholesale Tier 1 realization and unreserved stock in godown.
              </p>
            </div>
            <button onClick={() => setActiveTab('designs')} className="btn-secondary" style={{ fontSize: '0.8rem' }}>
              <Plus size={14} />
              <span>Add Design Sheet</span>
            </button>
          </div>

          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Design / SKU</th>
                  <th>Category</th>
                  <th>Landed Cost (COGS)</th>
                  <th>Wholesale Rate</th>
                  <th>Unit Gross Profit</th>
                  <th>Margin %</th>
                  <th>Physical Stock</th>
                  <th>Active Reserved</th>
                  <th>Available to Sell</th>
                  <th>Asset Value</th>
                </tr>
              </thead>
              <tbody>
                {designs.map(d => {
                  const unitCost = d.estimatedCost;
                  const unitPrice = d.wholesalePrice;
                  const profit = unitPrice - unitCost;
                  const marginPct = ((profit / unitPrice) * 100).toFixed(1);
                  const phys = d.skus.reduce((s, sku) => s + sku.readyPhysicalStock, 0);
                  const res = d.skus.reduce((s, sku) => s + sku.reservedStock, 0);
                  const avail = Math.max(0, phys - res);
                  const valuation = phys * unitCost;

                  return (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>
                        <div>{d.designCode}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.title}</div>
                      </td>
                      <td>{d.category}</td>
                      <td>₹{unitCost.toLocaleString('en-IN')}</td>
                      <td style={{ fontWeight: 700 }}>₹{unitPrice.toLocaleString('en-IN')}</td>
                      <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+₹{profit.toLocaleString('en-IN')}</td>
                      <td>
                        <span className="badge badge-emerald">{marginPct}%</span>
                      </td>
                      <td>{phys} sets</td>
                      <td style={{ color: 'var(--accent-gold)' }}>{res} sets</td>
                      <td style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{avail} sets</td>
                      <td style={{ fontWeight: 800 }}>₹{valuation.toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Production Pipeline */}
      {activeSubTab === 'pipeline' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {lang === 'gu' ? 'કારીગર ખાતા જોબવર્ક પ્રગતિ' : 'Active Artisan Jobwork Batches'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Manufacturing progression across embroidery, handwork, kali stitching, and statutory CGST Rule 45 challans.
              </p>
            </div>
            <button onClick={() => setActiveTab('jobwork')} className="btn-primary" style={{ fontSize: '0.8rem' }}>
              <Plus size={14} />
              <span>Issue New Job Order</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {jobOrders.map(jo => {
              const activeStage = jo.stages.find(s => s.status === 'In Progress') || jo.stages[0];
              const completedStagesCount = jo.stages.filter(s => s.status === 'Completed').length;
              const progressPct = Math.round((completedStagesCount / jo.stages.length) * 100);

              return (
                <div 
                  key={jo.id} 
                  onClick={() => setActiveTab('jobwork')}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid var(--border-subtle)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-purple)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>{jo.jobOrderNumber}</span>
                      <strong style={{ fontSize: '0.88rem' }}>{jo.designCode}</strong>
                    </div>
                    <span className="badge badge-gold">{activeStage ? activeStage.stageName : jo.status}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Material: {jo.issuedMaterial} • Total Batch: <strong>{jo.totalSets} Sets</strong>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '3px' }}>
                      <span>Stage Progress: {activeStage?.stageName}</span>
                      <span>{progressPct}% Completed</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.06)', overflow: 'hidden' }}>
                      <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #c084fc 0%, #a855f7 100%)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-faint)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '8px' }}>
                    <span>Challan: {jo.challanNumber}</span>
                    <span>Job Charges: ₹{jo.totalJobCharges.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 4: Receivables & Ledgers */}
      {activeSubTab === 'financials' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {lang === 'gu' ? 'ગ્રાહક વસૂલાત અને ક્રેડિટ લેજર' : 'Customer Receivables & Credit Ledger'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Active commitments, advance allocation against invoices, and outstanding due balances.
              </p>
            </div>
            <button onClick={() => setShowQuickPayModal(true)} className="btn-primary" style={{ fontSize: '0.8rem' }}>
              <Plus size={14} />
              <span>Record Payment Receipt</span>
            </button>
          </div>

          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Customer Account</th>
                  <th>City / Region</th>
                  <th>Credit Limit</th>
                  <th>Total Billed</th>
                  <th>Advance Settled</th>
                  <th>Net Balance Due</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 800 }}>
                      <div>{inv.customerName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Invoice: {inv.invoiceNumber}</div>
                    </td>
                    <td>Mumbai Hub</td>
                    <td>₹10,00,000</td>
                    <td>₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                    <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>₹{inv.allocatedAdvance.toLocaleString('en-IN')}</td>
                    <td style={{ color: inv.balanceDue > 0 ? 'var(--accent-ruby)' : 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.95rem' }}>
                      ₹{inv.balanceDue.toLocaleString('en-IN')}
                    </td>
                    <td>
                      {inv.balanceDue > 0 ? (
                        <button 
                          onClick={() => {
                            setPayCustId(inv.customerId);
                            setPayInvNumber(inv.invoiceNumber);
                            setPayAmount(inv.balanceDue);
                            setShowQuickPayModal(true);
                          }}
                          className="btn-primary" 
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Settle Due
                        </button>
                      ) : (
                        <span className="badge badge-emerald">Cleared in Full</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Order Modal */}
      {showQuickOrderModal && (
        <div className="modal-overlay" onClick={() => setShowQuickOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '540px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                Fast Wholesale Booking
              </h2>
              <button onClick={() => setShowQuickOrderModal(false)} className="btn-secondary" style={{ padding: '2px 8px' }}>✕</button>
            </div>

            <form onSubmit={handleQuickCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Wholesale Customer:</label>
                <select 
                  value={orderCustId} 
                  onChange={(e) => setOrderCustId(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {customerList.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Design Model:</label>
                  <select 
                    value={orderDesignCode} 
                    onChange={(e) => {
                      setOrderDesignCode(e.target.value);
                      const d = designs.find(des => des.designCode === e.target.value);
                      if (d) {
                        setOrderSku(d.skus[0]?.skuCode || '');
                        setOrderRate(d.wholesalePrice);
                      }
                    }} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    {designs.map(d => (
                      <option key={d.id} value={d.designCode}>{d.designCode} ({d.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Color SKU Variant:</label>
                  <select 
                    value={orderSku} 
                    onChange={(e) => setOrderSku(e.target.value)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    {activeDesignObj.skus.map(s => (
                      <option key={s.skuCode} value={s.skuCode}>{s.color} (Avail: {s.availableStock})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Quantity (Sets):</label>
                  <input 
                    type="number" 
                    value={orderQty} 
                    onChange={(e) => setOrderQty(Number(e.target.value))} 
                    className="input-field" 
                    min={1}
                    required
                    style={{ marginTop: '4px' }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Wholesale Rate (₹):</label>
                  <input 
                    type="number" 
                    value={orderRate} 
                    onChange={(e) => setOrderRate(Number(e.target.value))} 
                    className="input-field" 
                    required
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Advance Deposit Received (₹):</label>
                <input 
                  type="number" 
                  value={orderAdvance} 
                  onChange={(e) => setOrderAdvance(Number(e.target.value))} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Calculated Order Total:</span>
                <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>₹{(orderQty * orderRate).toLocaleString('en-IN')}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowQuickOrderModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={14} />
                  <span>Book Order & Reserve Stock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Payment Modal */}
      {showQuickPayModal && (
        <div className="modal-overlay" onClick={() => setShowQuickPayModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                Record Payment Settlement
              </h2>
              <button onClick={() => setShowQuickPayModal(false)} className="btn-secondary" style={{ padding: '2px 8px' }}>✕</button>
            </div>

            <form onSubmit={handleQuickRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Customer Account:</label>
                <select 
                  value={payCustId} 
                  onChange={(e) => {
                    const cid = e.target.value;
                    setPayCustId(cid);
                    const cinv = invoices.filter(i => i.customerId === cid && i.balanceDue > 0);
                    if (cinv.length > 0) {
                      setPayInvNumber(cinv[0].invoiceNumber);
                      setPayAmount(cinv[0].balanceDue);
                    }
                  }} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {customerList.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Select Tax Invoice:</label>
                <select 
                  value={payInvNumber} 
                  onChange={(e) => {
                    setPayInvNumber(e.target.value);
                    const inv = invoices.find(i => i.invoiceNumber === e.target.value);
                    if (inv) setPayAmount(inv.balanceDue);
                  }} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {invoices.map(i => (
                    <option key={i.id} value={i.invoiceNumber}>
                      {i.invoiceNumber} — {i.customerName} (Due: ₹{i.balanceDue.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Remittance Amount (₹):</label>
                  <input 
                    type="number" 
                    value={payAmount} 
                    onChange={(e) => setPayAmount(Number(e.target.value))} 
                    className="input-field" 
                    required
                    style={{ marginTop: '4px' }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Payment Method:</label>
                  <select 
                    value={payMode} 
                    onChange={(e) => setPayMode(e.target.value as any)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    <option>Bank NEFT/RTGS</option>
                    <option>UPI</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Bank Reference / UTR:</label>
                <input 
                  type="text" 
                  value={payUtr} 
                  onChange={(e) => setPayUtr(e.target.value)} 
                  className="input-field" 
                  required
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowQuickPayModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-emerald">
                  <DollarSign size={14} />
                  <span>Deposit & Settle Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
