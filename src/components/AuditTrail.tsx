import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  User, 
  FileText, 
  CheckCircle2, 
  Lock,
  Download,
  Filter,
  Search
} from 'lucide-react';

export const AuditTrail: React.FC = () => {
  const { auditLogs, triggerToast } = useTextile();
  const [filterAction, setFilterAction] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = filterAction === 'All' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
                          log.entityId.toLowerCase().includes(search.toLowerCase()) ||
                          log.userName.toLowerCase().includes(search.toLowerCase()) ||
                          log.details.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Action', 'Entity Type', 'Entity ID', 'Details'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.userName}"`,
      `"${l.action}"`,
      `"${l.entityType}"`,
      `"${l.entityId}"`,
      `"${l.details.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TextileFlow_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Audit log CSV exported successfully', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Audit Trail & Activity Log
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Immutable activity ledger capturing design revisions, QC logs, orders, and payments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExportCSV} className="btn-secondary" style={{ fontSize: '0.8rem' }}>
            <Download size={14} />
            <span>Export Audit Trail (CSV)</span>
          </button>
          <span className="badge badge-emerald">
            <Lock size={12} /> Cryptographically Signed Ledger
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search actions, entities, users..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '32px', fontSize: '0.8rem', height: '36px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Action Filter:</span>
          <select 
            value={filterAction} 
            onChange={(e) => setFilterAction(e.target.value)}
            className="input-field"
            style={{ fontSize: '0.8rem', height: '36px', width: '180px' }}
          >
            <option value="All">All Audit Events</option>
            <option value="Design">Design Approvals</option>
            <option value="Purchase">Purchase Orders</option>
            <option value="Job">Jobwork Passes</option>
            <option value="QC">QC Inspections</option>
            <option value="Sales">Sales Orders</option>
            <option value="Dispatch">Dispatches</option>
            <option value="Payment">Payment Receipts</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="table-container">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Operator / Role</th>
                <th>Operational Action</th>
                <th>Entity Type</th>
                <th>Entity Reference</th>
                <th>Audit Verification Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={12} />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-gray" style={{ fontSize: '0.68rem' }}>
                      {log.userName}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {log.action}
                  </td>
                  <td>
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                      {log.entityType}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#fff' }}>
                    {log.entityId}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
