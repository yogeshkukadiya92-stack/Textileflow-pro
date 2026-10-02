import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { DesignItem, SampleStatus } from '../types';
import { 
  Plus, 
  Check, 
  Share2, 
  Eye, 
  Layers, 
  Sparkles, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Camera, 
  ExternalLink,
  Tag,
  Scissors,
  RotateCcw,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const DesignCatalog: React.FC = () => {
  const { 
    designs, 
    physicalSamples, 
    approveDesign, 
    createDesign, 
    loanPhysicalSample, 
    returnPhysicalSample, 
    convertSampleToSale, 
    role, 
    searchQuery,
    addToast 
  } = useTextile();

  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);
  const [showNewDesignModal, setShowNewDesignModal] = useState<boolean>(false);
  const [showLoanSampleModal, setShowLoanSampleModal] = useState<boolean>(false);

  // New Design Form State
  const [newDesignCode, setNewDesignCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Lehenga' | 'Saree' | 'Gown'>('Lehenga');
  const [newFabric, setNewFabric] = useState<string>('Pure Silk / Velvet');
  const [newWorkType, setNewWorkType] = useState<string>('Zari & Thread Handwork');
  const [newCost, setNewCost] = useState<number>(1800);
  const [newWholesalePrice, setNewWholesalePrice] = useState<number>(2400);
  const [newSemiPrice, setNewSemiPrice] = useState<number>(2650);
  const [newMOQ, setNewMOQ] = useState<number>(20);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80');

  // New Sample Loan State
  const [loanSku, setLoanSku] = useState<string>('LH-101-MAR-FS');
  const [loanParty, setLoanParty] = useState<string>('Navrang Saree Agency (Surat Textile Agent)');
  const [loanDueDate, setLoanDueDate] = useState<string>('2026-10-16');
  const [loanDeposit, setLoanDeposit] = useState<number>(2500);
  const [loanCourier, setLoanCourier] = useState<string>('SHREE-MARUTI-5521');

  const filteredDesigns = designs.filter(d => {
    const matchesSearch = 
      d.designCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateDesignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesignCode || !newTitle) {
      addToast('Validation Error', 'Please specify a Design Code and Title.', 'error');
      return;
    }

    createDesign({
      designCode: newDesignCode.toUpperCase().trim(),
      title: newTitle.trim(),
      category: newCategory,
      fabric: newFabric,
      workType: newWorkType,
      estimatedCost: newCost,
      wholesalePrice: newWholesalePrice,
      semiWholesalePrice: newSemiPrice,
      minimumOrderQty: newMOQ,
      photoUrl: newPhotoUrl
    });

    setShowNewDesignModal(false);
    setNewDesignCode('');
    setNewTitle('');
  };

  const handleLoanSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parentDesign = designs.find(d => d.skus.some(s => s.skuCode === loanSku));

    loanPhysicalSample({
      designCode: parentDesign?.designCode || 'LH-101',
      skuCode: loanSku,
      quantity: 1,
      recipientParty: loanParty,
      recipientType: 'Agent',
      returnDueDate: loanDueDate,
      depositAmount: loanDeposit,
      courierLR: loanCourier
    });

    setShowLoanSampleModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Designs & Technical Samples
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Catalog creations, approved technical revisions, and physical sample tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowLoanSampleModal(true)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Scissors size={14} color="var(--accent-cyan)" />
            <span>Loan Sample</span>
          </button>

          <button 
            onClick={() => setShowCatalogModal(true)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Share2 size={14} color="var(--accent-gold)" />
            <span>Share Catalog</span>
          </button>
          
          {(role === 'owner_admin' || role === 'purchase_production') && (
            <button 
              onClick={() => setShowNewDesignModal(true)}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              <Plus size={15} />
              <span>Create Design</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', 'Lehenga', 'Saree', 'Gown'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: filterCategory === cat ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              background: filterCategory === cat ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: filterCategory === cat ? 'var(--accent-gold)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {cat === 'All' ? 'All Master Categories' : cat}
          </button>
        ))}
      </div>

      {/* 3D Interactive Design Cards Grid */}
      <div className="grid-cols-auto-fit card-3d-wrap">
        {filteredDesigns.map(design => {
          const totalAvailable = design.skus.reduce((sum, s) => sum + s.availableStock, 0);
          const totalPhysical = design.skus.reduce((sum, s) => sum + s.readyPhysicalStock, 0);
          const isApproved = design.sampleStatus === 'Approved';

          return (
            <div 
              key={design.id}
              className="glass-card card-3d"
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: design.designCode === 'LH-101' ? '1px solid rgba(245, 158, 11, 0.5)' : undefined
              }}
              onClick={() => setSelectedDesign(design)}
            >
              {/* Product Image Header */}
              <div style={{
                height: '210px',
                backgroundImage: `url(${design.photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 60%)'
                }} />

                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span className="badge badge-gold" style={{ fontWeight: 800 }}>
                    {design.designCode}
                  </span>
                  <span className="badge badge-gray">
                    {design.currentVersion}
                  </span>
                </div>

                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className={`badge ${isApproved ? 'badge-emerald' : 'badge-gold'}`}>
                    {design.sampleStatus}
                  </span>
                </div>

                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    {design.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
                    {design.fabric} • {design.category}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                
                {/* Wholesale Pricing & Margin */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Wholesale Tier 1
                    </div>
                    <div className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                      ₹{design.wholesalePrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {role !== 'sales' && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Landed Cost (COGS)
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                        ₹{design.estimatedCost.toLocaleString('en-IN')}{' '}
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                          (+₹{design.wholesalePrice - design.estimatedCost})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* SKU Colors & Stock Breakdown */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    <span>Active SKUs & Variants:</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {totalAvailable} Available ({totalPhysical} Phys)
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {design.skus.map(sku => (
                      <span 
                        key={sku.skuCode}
                        className="badge badge-gray"
                        style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                      >
                        {sku.color.split(' ')[0]}: <strong>{sku.availableStock}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kit Recipe Components */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                    BOM Kit Composition:
                  </div>
                  <div>
                    {design.components.map(c => c.name).join(' + ')}
                  </div>
                </div>

                {/* Approve Button if not approved */}
                {!isApproved && (role === 'owner_admin' || role === 'purchase_production') && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      approveDesign(design.id);
                    }}
                    className="btn-emerald"
                    style={{ width: '100%', fontSize: '0.8rem', padding: '7px' }}
                  >
                    <Check size={14} />
                    <span>Approve Sample Technical Sheet</span>
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Physical Samples Lending Register (Master Plan Section 5 & 10) */}
      <div className="glass-panel" style={{ padding: '24px', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scissors size={20} color="var(--accent-gold)" />
              <span>Physical Sample Loans & Showroom Lending Register</span>
            </h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Section 5 & 10: Tracks physical samples dispatched to boutique agents. Segregated from saleable inventory while retaining company ownership.
            </div>
          </div>

          <span className="badge badge-gold">
            {physicalSamples.filter(s => s.status === 'With Recipient').length} Samples Active in Market
          </span>
        </div>

        <div className="table-container">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Sample SKU</th>
                <th>Recipient Party & Type</th>
                <th>Dispatched Date</th>
                <th>Return Due Date</th>
                <th>Security Deposit</th>
                <th>Courier LR</th>
                <th>Loan Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {physicalSamples.map(sample => (
                <tr key={sample.id}>
                  <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{sample.skuCode}</td>
                  <td>{sample.recipientParty} ({sample.recipientType})</td>
                  <td>{sample.dispatchDate}</td>
                  <td style={{ color: 'var(--accent-ruby)', fontWeight: 700 }}>{sample.returnDueDate}</td>
                  <td>₹{sample.depositAmount.toLocaleString('en-IN')}</td>
                  <td><span className="badge badge-gray">{sample.courierLR}</span></td>
                  <td>
                    <span className={`badge ${sample.status === 'With Recipient' ? 'badge-cyan' : sample.status === 'Returned' ? 'badge-emerald' : 'badge-gold'}`}>
                      {sample.status}
                    </span>
                  </td>
                  <td>
                    {sample.status === 'With Recipient' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          onClick={() => returnPhysicalSample(sample.id)}
                          className="btn-secondary" 
                          style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                          title="Return sample back to saleable stock pool"
                        >
                          <RotateCcw size={12} />
                          <span>Return</span>
                        </button>
                        <button 
                          onClick={() => convertSampleToSale(sample.id, 2400)}
                          className="btn-emerald" 
                          style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                          title="Convert to commercial sale"
                        >
                          <DollarSign size={12} />
                          <span>Convert Sale</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Design Modal */}
      {showNewDesignModal && (
        <div className="modal-overlay" onClick={() => setShowNewDesignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '640px' }}>
            <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px', color: 'var(--accent-gold)' }}>
              Create New Design & Technical Sheet
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Add a new Saree or Lehenga model into the production catalog with initial BOM specifications and wholesale pricing tiers.
            </p>

            <form onSubmit={handleCreateDesignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Design Code:</label>
                  <input 
                    type="text" 
                    placeholder="e.g. LH-105" 
                    value={newDesignCode} 
                    onChange={(e) => setNewDesignCode(e.target.value)} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Design Title:</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Royal Organza Handwork Bridal Lehenga" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Category:</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value as any)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }}
                  >
                    <option value="Lehenga">Lehenga</option>
                    <option value="Saree">Saree</option>
                    <option value="Gown">Gown</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Base Fabric:</label>
                  <input 
                    type="text" 
                    value={newFabric} 
                    onChange={(e) => setNewFabric(e.target.value)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Embroidery / Work:</label>
                  <input 
                    type="text" 
                    value={newWorkType} 
                    onChange={(e) => setNewWorkType(e.target.value)} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Landed Cost (₹):</label>
                  <input 
                    type="number" 
                    value={newCost} 
                    onChange={(e) => setNewCost(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>Wholesale Tier 1 (₹):</label>
                  <input 
                    type="number" 
                    value={newWholesalePrice} 
                    onChange={(e) => setNewWholesalePrice(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Semi-Wholesale (₹):</label>
                  <input 
                    type="number" 
                    value={newSemiPrice} 
                    onChange={(e) => setNewSemiPrice(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>MOQ (Sets):</label>
                  <input 
                    type="number" 
                    value={newMOQ} 
                    onChange={(e) => setNewMOQ(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Reference Photo URL:</label>
                <input 
                  type="text" 
                  value={newPhotoUrl} 
                  onChange={(e) => setNewPhotoUrl(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowNewDesignModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={15} />
                  <span>Create & Save Technical Sheet</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Loan Physical Sample Modal */}
      {showLoanSampleModal && (
        <div className="modal-overlay" onClick={() => setShowLoanSampleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px', maxWidth: '520px' }}>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px', color: 'var(--accent-cyan)' }}>
              Loan Physical Sample to Market Agent
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Dispatches physical sample to agent/boutique showroom. System will move location and exclude piece from warehouse saleable pool.
            </p>

            <form onSubmit={handleLoanSampleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Select Sample SKU:</label>
                <select 
                  value={loanSku} 
                  onChange={(e) => setLoanSku(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {designs.flatMap(d => d.skus.map(s => (
                    <option key={s.skuCode} value={s.skuCode}>
                      {d.designCode} — {s.color} (Available in godown: {s.availableStock})
                    </option>
                  )))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Recipient Agent / Boutique:</label>
                <input 
                  type="text" 
                  value={loanParty} 
                  onChange={(e) => setLoanParty(e.target.value)} 
                  className="input-field" 
                  required 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Return Due Date:</label>
                  <input 
                    type="date" 
                    value={loanDueDate} 
                    onChange={(e) => setLoanDueDate(e.target.value)} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Security Deposit (₹):</label>
                  <input 
                    type="number" 
                    value={loanDeposit} 
                    onChange={(e) => setLoanDeposit(Number(e.target.value))} 
                    className="input-field" 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Courier LR / Hand Receipt:</label>
                <input 
                  type="text" 
                  value={loanCourier} 
                  onChange={(e) => setLoanCourier(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowLoanSampleModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Scissors size={14} />
                  <span>Dispatch & Record Loan</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Shareable Watermarked Catalog Generator Modal */}
      {showCatalogModal && (
        <div className="modal-overlay" onClick={() => setShowCatalogModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px', maxWidth: '580px' }}>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px', color: 'var(--accent-gold)' }}>
              Generate Watermarked Wholesale Catalog
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Section 10: Client-scoped secure portal link with wholesale tier rates and watermark overlay. Purchase costs are strictly hidden server-side.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Client Pricing Tier:</label>
                <select className="input-field" style={{ marginTop: '4px' }}>
                  <option>Wholesale Tier 1 (MOQ 25 sets — Net ₹2,400)</option>
                  <option>Semi-Wholesale Tier 2 (MOQ 10 sets — Net ₹2,650)</option>
                  <option>Boutique Exclusive Special (MRP Display Only)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Watermark Protection Text:</label>
                <input 
                  type="text" 
                  defaultValue="CONFIDENTIAL — SHREEMATI BRIDAL SAREES (MUMBAI)" 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '8px', border: '1px dashed var(--border-medium)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 800 }}>
                  ✓ Encrypted WhatsApp Share Link Generated:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#fff', wordBreak: 'break-all', marginTop: '6px', fontFamily: 'monospace' }}>
                  https://textileflow.in/c/lh101-bridal-oct2026?token=sec_981a2f4c9&client=shreemati
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button onClick={() => setShowCatalogModal(false)} className="btn-secondary">
                  Close
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard?.writeText('https://textileflow.in/c/lh101-bridal-oct2026?token=sec_981a2f4c9&client=shreemati');
                    addToast('Catalog Link Copied', 'Encrypted watermarked catalog link copied to clipboard.', 'success');
                    setShowCatalogModal(false);
                  }} 
                  className="btn-primary"
                >
                  <Share2 size={14} />
                  <span>Copy & Share Link</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Selected Design Detail Sheet Modal */}
      {selectedDesign && (
        <div className="modal-overlay" onClick={() => setSelectedDesign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px', maxWidth: '780px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>{selectedDesign.designCode}</span>
                  <span className="badge badge-gray">{selectedDesign.currentVersion}</span>
                  <span className="badge badge-emerald">{selectedDesign.sampleStatus}</span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '6px' }}>
                  {selectedDesign.title}
                </h2>
              </div>
              <button onClick={() => setSelectedDesign(null)} className="btn-secondary" style={{ padding: '4px 10px' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{
                height: '260px',
                borderRadius: 'var(--radius-md)',
                backgroundImage: `url(${selectedDesign.photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--border-medium)'
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div><strong>Category:</strong> {selectedDesign.category}</div>
                <div><strong>Fabric Material:</strong> {selectedDesign.fabric}</div>
                <div><strong>Embroidery Technique:</strong> {selectedDesign.workType}</div>
                <div><strong>Wholesale Rate (Tier 1):</strong> ₹{selectedDesign.wholesalePrice.toLocaleString('en-IN')}</div>
                <div><strong>Semi-Wholesale Rate:</strong> ₹{selectedDesign.semiWholesalePrice.toLocaleString('en-IN')}</div>
                <div><strong>Minimum Order Qty (MOQ):</strong> {selectedDesign.minimumOrderQty} sets</div>
                {selectedDesign.approvedBy && (
                  <div><strong>Approved By:</strong> {selectedDesign.approvedBy} ({selectedDesign.approvalDate})</div>
                )}
                {selectedDesign.notes && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontStyle: 'italic', background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '6px' }}>
                    "{selectedDesign.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* BOM Components List */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '8px', color: 'var(--accent-gold)' }}>
                Bill of Materials (BOM) Kit Specifications:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedDesign.components.map((comp, i) => (
                  <div key={i} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '8px 14px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span>{comp.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{comp.fabric} • {comp.pieces || 1} pcs</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SKUs Table */}
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '8px', color: 'var(--accent-cyan)' }}>
                SKU Inventory Breakdown:
              </h4>
              <div className="table-container">
                <table className="luxury-table">
                  <thead>
                    <tr>
                      <th>SKU Identifier</th>
                      <th>Color & Shade</th>
                      <th>Physical Stock</th>
                      <th>Active Reserved</th>
                      <th>Available for Sale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDesign.skus.map(s => (
                      <tr key={s.skuCode}>
                        <td style={{ fontWeight: 800 }}>{s.skuCode}</td>
                        <td>{s.color} ({s.shadeCode})</td>
                        <td>{s.readyPhysicalStock} sets</td>
                        <td style={{ color: 'var(--accent-gold)' }}>{s.reservedStock} sets</td>
                        <td style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.95rem' }}>
                          {s.availableStock} sets
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
