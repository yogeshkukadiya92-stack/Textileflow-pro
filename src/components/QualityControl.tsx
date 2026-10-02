import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShieldCheck, 
  RotateCcw,
  XCircle,
  FileCheck
} from 'lucide-react';

export const QualityControl: React.FC = () => {
  const { qcRecords, submitQCInspection, designs, role } = useTextile();
  const [showNewQCModal, setShowNewQCModal] = useState<boolean>(false);

  // Form states
  const [designCode, setDesignCode] = useState<string>('LH-101');
  const [refPo, setRefPo] = useState<string>('PO-2026-1001');
  const [totalRecv, setTotalRecv] = useState<number>(100);
  const [acceptedQty, setAcceptedQty] = useState<number>(90);
  const [reworkQty, setReworkQty] = useState<number>(5);
  const [rejectedQty, setRejectedQty] = useState<number>(5);
  const [shadeConsistency, setShadeConsistency] = useState<'Perfect' | 'Slight Variance' | 'Mismatched'>('Perfect');
  const [embroideryDefects, setEmbroideryDefects] = useState<number>(2);
  const [stainIssues, setStainIssues] = useState<boolean>(false);
  const [componentsComplete, setComponentsComplete] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('Physical batch inspection completed per 4-point protocol.');

  const handleSubmitQC = () => {
    submitQCInspection({
      designCode,
      referencePoOrJob: refPo,
      totalReceived: totalRecv,
      acceptedQty,
      reworkQty,
      rejectedQty,
      holdQty: Math.max(0, totalRecv - acceptedQty - reworkQty - rejectedQty),
      shadeConsistency,
      embroideryDefects,
      stainIssues,
      lehengaComponentsComplete: componentsComplete,
      notes
    });
    setShowNewQCModal(false);
  };

  const totalInspected = qcRecords.reduce((sum, r) => sum + r.totalReceived, 0);
  const totalAccepted = qcRecords.reduce((sum, r) => sum + r.acceptedQty, 0);
  const totalExceptions = qcRecords.reduce((sum, r) => sum + r.reworkQty + r.rejectedQty + r.holdQty, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Inward Goods & Quality Inspection (QC)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Verify shipments upon factory receipt. Only passed items enter sellable stock.
          </p>
        </div>

        {(role === 'owner_admin' || role === 'qc_store') && (
          <button onClick={() => setShowNewQCModal(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
            <Plus size={15} />
            <span>Record Inspection</span>
          </button>
        )}
      </div>

      {/* 3 Clean Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL RECEIVED</div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>
            {totalInspected} Sets
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '2px' }}>
            Inward goods registered
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>ACCEPTED & STOCKED</div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            {totalAccepted} Sets
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Added to ready inventory
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 600 }}>REWORK & REJECTS</div>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
            {totalExceptions} Sets
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '2px' }}>
            Quarantine hold / vendor debit
          </div>
        </div>
      </div>

      {/* QC Records List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {qcRecords.map(qc => (
          <div key={qc.id} className="glass-panel" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{qc.grnNumber}</span>
                  <span className="badge badge-gold">{qc.designCode}</span>
                  <span className={`badge ${qc.status === 'Accepted' ? 'badge-emerald' : qc.status === 'Rework' || qc.status === 'Hold' ? 'badge-gold' : 'badge-ruby'}`}>
                    {qc.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Lot: {qc.lotNumber} • Ref: {qc.referencePoOrJob} • Date: {qc.date} • Inspector: {qc.inspectorName}
                </div>
              </div>

              {/* 4-Way Quantities */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="badge badge-emerald" style={{ padding: '4px 10px' }}>
                  {qc.acceptedQty} Accepted
                </span>
                {qc.reworkQty > 0 && (
                  <span className="badge badge-gold" style={{ padding: '4px 10px' }}>
                    {qc.reworkQty} Rework
                  </span>
                )}
                {qc.rejectedQty > 0 && (
                  <span className="badge badge-ruby" style={{ padding: '4px 10px' }}>
                    {qc.rejectedQty} Rejected
                  </span>
                )}
              </div>
            </div>

            {/* Checklist summary */}
            <div style={{ display: 'flex', gap: '16px', background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.75rem', flexWrap: 'wrap' }}>
              <div>Shade: <strong style={{ color: qc.shadeConsistency === 'Perfect' ? 'var(--accent-emerald)' : 'var(--accent-gold)' }}>{qc.shadeConsistency}</strong></div>
              <div>Flaws: <strong>{qc.embroideryDefects} defects</strong></div>
              <div>Kit Complete: <strong style={{ color: qc.lehengaComponentsComplete ? 'var(--accent-emerald)' : 'var(--accent-ruby)' }}>{qc.lehengaComponentsComplete ? 'Yes (3-Pc OK)' : 'Missing Component'}</strong></div>
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>"{qc.notes}"</div>
            </div>
          </div>
        ))}
      </div>

      {/* New QC Inspection Modal */}
      {showNewQCModal && (
        <div className="modal-overlay" onClick={() => setShowNewQCModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '520px' }}>
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              Record Quality Inspection
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Verify inward shipment. Only accepted quantities will be added to available stock.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Design SKU:</label>
                  <select value={designCode} onChange={(e) => setDesignCode(e.target.value)} className="input-field" style={{ marginTop: '4px' }}>
                    {designs.map(d => (
                      <option key={d.id} value={d.designCode}>{d.designCode} ({d.category})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Reference PO / Job:</label>
                  <input type="text" value={refPo} onChange={(e) => setRefPo(e.target.value)} className="input-field" style={{ marginTop: '4px' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Received (Sets):</label>
                <input 
                  type="number" 
                  value={totalRecv} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTotalRecv(val);
                    setAcceptedQty(val);
                    setReworkQty(0);
                    setRejectedQty(0);
                  }} 
                  className="input-field" 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              {/* 3-way split inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>ACCEPTED:</label>
                  <input type="number" value={acceptedQty} onChange={(e) => setAcceptedQty(Number(e.target.value))} className="input-field" style={{ marginTop: '4px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>REWORK:</label>
                  <input type="number" value={reworkQty} onChange={(e) => setReworkQty(Number(e.target.value))} className="input-field" style={{ marginTop: '4px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--accent-ruby)', fontWeight: 700 }}>REJECT:</label>
                  <input type="number" value={rejectedQty} onChange={(e) => setRejectedQty(Number(e.target.value))} className="input-field" style={{ marginTop: '4px' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Remarks:</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field" style={{ marginTop: '4px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button onClick={() => setShowNewQCModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSubmitQC} className="btn-primary">
                  <span>Submit QC Entry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
