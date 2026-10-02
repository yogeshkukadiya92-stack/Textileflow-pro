import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { SalesOrder } from '../types';
import { 
  ShoppingCart, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Truck, 
  Eye, 
  FileText,
  UserCheck,
  XCircle,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const SalesOrders: React.FC = () => {
  const { salesOrders, khatas, designs, createSalesOrder, cancelSalesOrder, role, searchQuery, triggerToast } = useTextile();
  const [showNewOrderModal, setShowNewOrderModal] = useState<boolean>(false);

  // New Order State
  const [customerId, setCustomerId] = useState<string>(khatas.find(k => k.khataType === 'Customer')?.id || '');
  const [designCode, setDesignCode] = useState<string>('LH-101');
  const [selectedSku, setSelectedSku] = useState<string>('LH-101-MAR-FS');
  const [orderQty, setOrderQty] = useState<number>(20);
  const [unitRate, setUnitRate] = useState<number>(2400);
  const [advanceRecv, setAdvanceRecv] = useState<number>(15000);
  const [creditOverrideReason, setCreditOverrideReason] = useState<string>('');
  const [needsCreditOverride, setNeedsCreditOverride] = useState<boolean>(false);

  const selectedCustomer = khatas.find(k => k.id === customerId);
  const selectedDesign = designs.find(d => d.designCode === designCode);
  const selectedSkuItem = selectedDesign?.skus.find(s => s.skuCode === selectedSku);

  // Credit calculation
  const customerExposure = (selectedCustomer?.unpaidInvoicesTotal || 0) + (selectedCustomer?.activeCommitmentsTotal || 0);
  const customerLimit = selectedCustomer?.creditLimit || 0;
  const orderTotal = orderQty * unitRate;
  const isCreditExceeded = (customerExposure + (orderTotal - advanceRecv)) > customerLimit;

  const filteredOrders = salesOrders.filter(so => 
    so.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    so.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    so.customerCity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateOrder = () => {
    if (!selectedCustomer) {
      triggerToast('Please select a valid customer', 'error');
      return;
    }

    if (orderQty <= 0) {
      triggerToast('Order quantity must be greater than zero', 'error');
      return;
    }

    if (isCreditExceeded && !needsCreditOverride) {
      triggerToast('Credit limit exceeded. Owner override approval required!', 'warning');
      setNeedsCreditOverride(true);
      return;
    }

    createSalesOrder({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerCity: selectedCustomer.city,
      orderType: 'Ready Stock',
      advanceReceived: advanceRecv,
      totalAmount: orderTotal,
      creditOverride: needsCreditOverride,
      creditOverrideReason: needsCreditOverride ? creditOverrideReason : undefined,
      items: [
        {
          skuCode: selectedSku,
          color: selectedSkuItem?.color || 'Maroon',
          quantity: orderQty,
          unitPrice: unitRate,
          allocatedQty: orderQty,
          dispatchedQty: 0,
          gstRate: 5
        }
      ]
    });

    setShowNewOrderModal(false);
    setNeedsCreditOverride(false);
    setCreditOverrideReason('');
  };

  const handleCancel = (orderId: string, orderNum: string) => {
    if (confirm(`Are you sure you want to cancel sales order ${orderNum}? Reserved inventory will be immediately released.`)) {
      cancelSalesOrder(orderId);
    }
  };

  // Metrics
  const totalOrderValue = salesOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalAdvanceCollected = salesOrders.reduce((acc, o) => acc + o.advanceReceived, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Sales Orders & Wholesale Pricing
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Buyer order booking, automated credit limit checks, and live inventory allocation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {(role === 'owner_admin' || role === 'sales') && (
            <button onClick={() => setShowNewOrderModal(true)} className="btn-primary" style={{ fontSize: '0.82rem' }}>
              <Plus size={16} />
              <span>Book New Sales Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart size={22} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Sales Bookings</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)' }}>₹{totalOrderValue.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={22} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Advances Deposited</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{totalAdvanceCollected.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={22} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Orders Count</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>{salesOrders.length} Registered</div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOrders.map(order => (
          <div key={order.id} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>{order.orderNumber}</span>
                  <span className="badge badge-gray">{order.orderType}</span>
                  <span className={`badge ${order.status === 'Fulfilled' ? 'badge-emerald' : order.status === 'Partially Dispatched' ? 'badge-cyan' : order.status === 'Cancelled' ? 'badge-ruby' : 'badge-gold'}`}>
                    {order.status}
                  </span>
                  {order.orderNumber === 'SO-2026-5501' && (
                    <span className="badge badge-emerald">✨ Section 22 Proof Order</span>
                  )}
                  {order.creditOverride && (
                    <span className="badge badge-ruby">Authorized Credit Override</span>
                  )}
                </div>
                <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '4px' }}>
                  {order.customerName}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Destination: {order.customerCity} • Booked On: {order.orderDate}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Order Total Value
                  </div>
                  <div className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                    Advance Paid: ₹{order.advanceReceived.toLocaleString('en-IN')}
                  </div>
                </div>

                {order.status !== 'Fulfilled' && order.status !== 'Cancelled' && (
                  <button 
                    onClick={() => handleCancel(order.id, order.orderNumber)}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '6px 10px', color: 'var(--accent-ruby)', borderColor: 'rgba(244, 63, 94, 0.4)' }}
                    title="Cancel order and immediately release reserved inventory"
                  >
                    <XCircle size={14} />
                    <span>Cancel Order</span>
                  </button>
                )}
              </div>
            </div>

            {/* Line items table */}
            <div className="table-container">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>SKU Code</th>
                    <th>Color / Description</th>
                    <th>Ordered Qty</th>
                    <th>Allocated Qty</th>
                    <th>Dispatched Qty</th>
                    <th>Wholesale Price</th>
                    <th>Net Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{item.skuCode}</td>
                      <td>{item.color}</td>
                      <td style={{ fontWeight: 700 }}>{item.quantity} sets</td>
                      <td style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{item.allocatedQty} sets</td>
                      <td style={{ color: item.dispatchedQty > 0 ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 700 }}>
                        {item.dispatchedQty} sets
                      </td>
                      <td>₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td style={{ fontWeight: 800 }}>₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {order.notes && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic' }}>
                Note: "{order.notes}"
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="modal-overlay" onClick={() => setShowNewOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '580px' }}>
            <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              Book Wholesale Sales Order
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Confirm wholesale buyer booking with automated credit ceiling check and real-time inventory reservation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Wholesale Buyer Account:
                </label>
                <select 
                  value={customerId} 
                  onChange={(e) => setCustomerId(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {khatas.filter(k => k.khataType === 'Customer').map(k => (
                    <option key={k.id} value={k.id}>{k.name} ({k.city}) — Credit Limit: ₹{k.creditLimit?.toLocaleString('en-IN')}</option>
                  ))}
                </select>
              </div>

              {/* Credit Status Card */}
              {selectedCustomer && (
                <div style={{ 
                  background: isCreditExceeded ? 'rgba(244, 63, 94, 0.12)' : 'rgba(15, 23, 42, 0.7)', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  border: isCreditExceeded ? '1px solid var(--accent-ruby)' : '1px solid var(--border-medium)', 
                  fontSize: '0.78rem', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Approved Credit Limit: </span>
                    <strong>₹{selectedCustomer.creditLimit?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Current Exposure: </span>
                    <strong style={{ color: isCreditExceeded ? 'var(--accent-ruby)' : 'var(--accent-gold)' }}>
                      ₹{customerExposure.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              )}

              {isCreditExceeded && (
                <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '12px', borderRadius: '8px', border: '1px solid var(--accent-ruby)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-ruby)', fontWeight: 700, fontSize: '0.8rem' }}>
                    <AlertCircle size={16} />
                    <span>Credit Limit Exceeded Warning (Section 12 Gate)</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#f8fafc', marginTop: '4px' }}>
                    Booking value exceeds available credit headroom. Owner override rationale required to proceed.
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter owner approval override reason..."
                    value={creditOverrideReason}
                    onChange={(e) => setCreditOverrideReason(e.target.value)}
                    className="input-field"
                    style={{ marginTop: '8px', fontSize: '0.78rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Design Collection:
                  </label>
                  <select 
                    value={designCode} 
                    onChange={(e) => {
                      setDesignCode(e.target.value);
                      const d = designs.find(des => des.designCode === e.target.value);
                      if (d && d.skus.length > 0) setSelectedSku(d.skus[0].skuCode);
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
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Color / Shade SKU:
                  </label>
                  <select 
                    value={selectedSku} 
                    onChange={(e) => setSelectedSku(e.target.value)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    {selectedDesign?.skus.map(s => (
                      <option key={s.skuCode} value={s.skuCode}>
                        {s.color} (Available Unreserved: {s.availableStock} sets)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Order Quantity (Sets):
                  </label>
                  <input 
                    type="number" 
                    value={orderQty} 
                    onChange={(e) => setOrderQty(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Wholesale Price per Set (₹):
                  </label>
                  <input 
                    type="number" 
                    value={unitRate} 
                    onChange={(e) => setUnitRate(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Customer Advance Deposit (₹):
                </label>
                <input 
                  type="number" 
                  value={advanceRecv} 
                  onChange={(e) => setAdvanceRecv(Number(e.target.value))} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Order Net Total:</span>
                <span style={{ color: 'var(--accent-gold)' }}>₹{(orderQty * unitRate).toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => setShowNewOrderModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleCreateOrder} className="btn-primary">
                  <span>Confirm Order & Allocate Stock</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
