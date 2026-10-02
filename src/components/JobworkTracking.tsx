import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { JobOrder, JobStageType } from '../types';
import { 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  RotateCw,
  Plus
} from 'lucide-react';

export const JobworkTracking: React.FC = () => {
  const { jobOrders, updateJobStage, createJobOrder, designs, khatas, role, addToast } = useTextile();
  const [selectedJob, setSelectedJob] = useState<JobOrder>(jobOrders[0] || null);
  const [showChallanModal, setShowChallanModal] = useState<boolean>(false);
  const [showNewJobModal, setShowNewJobModal] = useState<boolean>(false);

  // Stage Update State
  const [updateModalStageIndex, setUpdateModalStageIndex] = useState<number | null>(null);
  const [updateGoodQty, setUpdateGoodQty] = useState<number>(0);
  const [updateReworkQty, setUpdateReworkQty] = useState<number>(0);
  const [updateRemarks, setUpdateRemarks] = useState<string>('');

  // New Job Order State
  const [newDesignCode, setNewDesignCode] = useState<string>('LH-101');
  const [newMaterial, setNewMaterial] = useState<string>('Pure Micro Velvet 9000 (280 Meters)');
  const [newSets, setNewSets] = useState<number>(100);
  const [newCharges, setNewCharges] = useState<number>(68000);

  const openStageUpdate = (job: JobOrder, stageIdx: number) => {
    setSelectedJob(job);
    setUpdateModalStageIndex(stageIdx);
    const stage = job.stages[stageIdx];
    setUpdateGoodQty(stage.goodOutputQty || stage.inputQty);
    setUpdateReworkQty(stage.reworkQty || 0);
    setUpdateRemarks(stage.remarks || '');
  };

  const handleSaveStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob && updateModalStageIndex !== null) {
      updateJobStage(selectedJob.id, updateModalStageIndex, updateGoodQty, updateReworkQty, updateRemarks);
      setUpdateModalStageIndex(null);
    }
  };

  const handleCreateNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    createJobOrder({
      designCode: newDesignCode,
      issuedMaterial: newMaterial,
      totalSets: newSets,
      totalJobCharges: newCharges
    });
    setShowNewJobModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Embroidery & Artisan Jobwork Pipeline
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Multi-stage manufacturing tracking: Raw Material → Computer Embroidery → Hand Zardozi → Kali Stitching → Finishing. Statutory CGST Rule 45 Delivery Challans.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowChallanModal(true)}
            className="btn-secondary"
            style={{ fontSize: '0.82rem' }}
          >
            <Printer size={15} color="var(--accent-gold)" />
            <span>Print CGST Rule 45 Challan</span>
          </button>

          {(role === 'owner_admin' || role === 'purchase_production') && (
            <button 
              onClick={() => setShowNewJobModal(true)}
              className="btn-primary"
              style={{ fontSize: '0.82rem' }}
            >
              <Plus size={16} />
              <span>+ Issue New Job Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Job Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {jobOrders.map(job => (
          <div key={job.id} className="glass-panel" style={{ padding: '24px' }}>
            
            {/* Job Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>{job.jobOrderNumber}</span>
                  <span className="badge badge-gold">{job.designCode} ({job.version})</span>
                  <span className={`badge ${job.status === 'Completed' ? 'badge-emerald' : 'badge-cyan'}`}>
                    {job.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 700, marginTop: '4px' }}>
                  Issued Raw Material: {job.issuedMaterial} ({job.totalSets} Sets Batch)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Ref PO: <strong>{job.parentPoNumber || 'Direct Job'}</strong> • Delivery Challan: <strong>{job.challanNumber}</strong> ({job.challanDate})
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Total Jobwork Cost
                </div>
                <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  ₹{job.totalJobCharges.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Stages Pipeline */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px'
            }}>
              {job.stages.map((stage, idx) => {
                const isCompleted = stage.status === 'Completed';
                const isInProgress = stage.status === 'In Progress';

                return (
                  <div 
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '16px',
                      borderLeft: `4px solid ${isCompleted ? 'var(--accent-emerald)' : isInProgress ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      background: isInProgress ? 'rgba(245, 158, 11, 0.08)' : 'rgba(15, 23, 42, 0.7)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isCompleted ? 'var(--accent-emerald)' : 'var(--text-main)' }}>
                        {idx + 1}. {stage.stageName}
                      </span>
                      <span className={`badge ${isCompleted ? 'badge-emerald' : isInProgress ? 'badge-gold' : 'badge-gray'}`} style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                        {stage.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '8px' }}>
                      {stage.assignedKhataName}
                    </div>

                    <div style={{ background: 'rgba(10, 13, 20, 0.8)', padding: '10px', borderRadius: '6px', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Input Qty:</span>
                        <span>{stage.inputQty} sets</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        <span>Good Output:</span>
                        <span>{stage.goodOutputQty} sets</span>
                      </div>
                      {stage.pendingQty > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)' }}>
                          <span>WIP Pending:</span>
                          <span>{stage.pendingQty} sets</span>
                        </div>
                      )}
                      {stage.reworkQty > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-ruby)' }}>
                          <span>Rework:</span>
                          <span>{stage.reworkQty} sets</span>
                        </div>
                      )}
                    </div>

                    {stage.remarks && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                        "{stage.remarks}"
                      </div>
                    )}

                    {/* Stage Action */}
                    {(role === 'owner_admin' || role === 'purchase_production' || role === 'vendor_portal') && (
                      <button
                        onClick={() => openStageUpdate(job, idx)}
                        className="btn-secondary"
                        style={{ width: '100%', fontSize: '0.74rem', padding: '5px', marginTop: '10px' }}
                      >
                        <RotateCw size={12} />
                        <span>Update Stage Progress</span>
                      </button>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Stage Update Modal */}
      {updateModalStageIndex !== null && selectedJob && (
        <div className="modal-overlay" onClick={() => setUpdateModalStageIndex(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px', maxWidth: '520px' }}>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px' }}>
              Update Jobwork Stage Progress
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {selectedJob.jobOrderNumber} • {selectedJob.stages[updateModalStageIndex].stageName} ({selectedJob.stages[updateModalStageIndex].assignedKhataName})
            </div>

            <form onSubmit={handleSaveStage} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Stage Total Input:</label>
                <input 
                  type="text" 
                  disabled 
                  value={`${selectedJob.stages[updateModalStageIndex].inputQty} sets`}
                  className="input-field" 
                  style={{ marginTop: '4px', opacity: 0.7 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>Good Completed Output (Sets):</label>
                <input 
                  type="number" 
                  value={updateGoodQty}
                  onChange={(e) => setUpdateGoodQty(Number(e.target.value))}
                  className="input-field" 
                  required 
                  style={{ marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--accent-ruby)', fontWeight: 700 }}>Rework / Defect Quantity (Sets):</label>
                <input 
                  type="number" 
                  value={updateReworkQty}
                  onChange={(e) => setUpdateReworkQty(Number(e.target.value))}
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Artisan Remarks / Machine Log:</label>
                <input 
                  type="text" 
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                  placeholder="e.g. Zari multihead run completed flawlessly, transfer ready"
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setUpdateModalStageIndex(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-emerald">
                  <CheckCircle2 size={14} />
                  <span>Save & Advance Stage</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* New Job Order Modal */}
      {showNewJobModal && (
        <div className="modal-overlay" onClick={() => setShowNewJobModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '580px' }}>
            <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px', color: 'var(--accent-purple)' }}>
              Issue Raw Material & Create Job Order
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Generate official jobwork order and CGST Rule 45 movement delivery challan to dispatch material to artisans.
            </p>

            <form onSubmit={handleCreateNewJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Select Design Model:</label>
                <select 
                  value={newDesignCode} 
                  onChange={(e) => setNewDesignCode(e.target.value)} 
                  className="input-field" 
                  style={{ marginTop: '4px' }}
                >
                  {designs.map(d => (
                    <option key={d.id} value={d.designCode}>{d.designCode} — {d.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Issued Raw Material Details:</label>
                <input 
                  type="text" 
                  value={newMaterial} 
                  onChange={(e) => setNewMaterial(e.target.value)} 
                  placeholder="e.g. Raw Mulberry Silk Fabric 250m" 
                  className="input-field" 
                  required 
                  style={{ marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Batch Quantity (Sets):</label>
                  <input 
                    type="number" 
                    value={newSets} 
                    onChange={(e) => setNewSets(Number(e.target.value))} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Total Job Charges (₹):</label>
                  <input 
                    type="number" 
                    value={newCharges} 
                    onChange={(e) => setNewCharges(Number(e.target.value))} 
                    className="input-field" 
                    required 
                    style={{ marginTop: '4px' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowNewJobModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Scissors size={14} />
                  <span>Generate Job Order & Challan</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Statutory CGST Rule 45 Delivery Challan Modal (Section 7, Line 90) */}
      {showChallanModal && (
        <div className="modal-overlay" onClick={() => setShowChallanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '720px', background: '#0a0f1d' }}>
            <div style={{ border: '2px solid rgba(255, 255, 255, 0.2)', padding: '24px', borderRadius: '8px' }}>
              
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-medium)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 800 }}>
                  FORM GST ITC-04 / STATUTORY DELIVERY CHALLAN
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '2px 0' }}>
                  DELIVERY CHALLAN FOR JOB WORK
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  (Issued under Section 143 read with Rule 45 of CGST Rules, 2017)
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.82rem', marginBottom: '16px' }}>
                <div>
                  <strong style={{ color: 'var(--accent-gold)' }}>PRINCIPAL SENDER:</strong>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Yogesh AI Hub Textile Wholesale Ltd.</div>
                  <div>Ring Road Textile Tower, Surat, Gujarat - 395002</div>
                  <div>GSTIN: <strong>24AAACY1234A1Z1</strong></div>
                </div>

                <div>
                  <strong style={{ color: 'var(--accent-gold)' }}>CONSIGNEE (JOBWORKER):</strong>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Balaji Multihead Computer Embroidery Works</div>
                  <div>Varachha Main Industrial Road, Surat, Gujarat - 395006</div>
                  <div>GSTIN: <strong>24AAACB9876B1Z3</strong></div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px' }}>
                <div>Challan No: <strong>CH-CGST-45-0922</strong></div>
                <div>Date: <strong>21-Sep-2026</strong></div>
                <div>Nature: <strong>Computer Zari Embroidery</strong></div>
                <div>Place of Supply: <strong>24 (Gujarat)</strong></div>
              </div>

              <div className="table-container" style={{ marginBottom: '16px' }}>
                <table className="luxury-table" style={{ fontSize: '0.8rem' }}>
                  <thead>
                    <tr>
                      <th>HSN</th>
                      <th>Goods Description</th>
                      <th>Quantity Issued</th>
                      <th>UOM</th>
                      <th>Taxable Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5407</td>
                      <td>Micro Velvet 9000 Cut Kalis (LH-101 V2)</td>
                      <td>100 Sets (280 Meters)</td>
                      <td>Sets</td>
                      <td>₹1,20,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', lineHeight: 1.4 }}>
                *Statutory Declaration: The goods sent under this delivery challan are dispatched solely for job work processing and not for commercial sale. The goods shall be returned to the principal within 1 year as specified under Section 143(1) of the CGST Act.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <div style={{ textAlign: 'center', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700 }}>Haresh Solanki</div>
                  <div style={{ color: 'var(--text-muted)' }}>Authorized Signatory (Principal)</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700 }}>Balaji Embroidery Works</div>
                  <div style={{ color: 'var(--text-muted)' }}>Receiver's Signature & Stamp</div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setShowChallanModal(false)} className="btn-secondary">
                Close
              </button>
              <button 
                onClick={() => {
                  window.print();
                  addToast('Print Triggered', 'Statutory delivery challan sent to printer.', 'info');
                }} 
                className="btn-primary"
              >
                <Printer size={14} />
                <span>Print Official Delivery Challan</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
