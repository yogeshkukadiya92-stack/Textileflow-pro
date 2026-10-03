import React from 'react';
import { useTextile } from '../context/TextileContext';
import { 
  LayoutDashboard, 
  Palette, 
  Users, 
  Scissors, 
  CheckCircle2, 
  Boxes, 
  ShoppingCart, 
  Truck, 
  Receipt, 
  MessageSquare, 
  Calculator, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface MenuGroup {
  group: string;
  items: {
    id: string;
    icon: any;
    label: string;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, role, t, lang, setIsMobileNavOpen } = useTextile();

  const menuGroups: MenuGroup[] = [
    {
      group: lang === 'gu' ? 'વર્કસ્પેસ' : 'WORKSPACE',
      items: [
        { id: 'dashboard', icon: LayoutDashboard, label: t('nav_dashboard') || 'Dashboard' },
        { id: 'walkthrough', icon: Calculator, label: t('nav_walkthrough') || 'Section 22 Proof', badge: 'LH-101' },
        { id: 'designs', icon: Palette, label: t('nav_designs') || 'Designs & Samples' }
      ]
    },
    {
      group: lang === 'gu' ? 'ઉત્પાદન અને ખરીદી' : 'PRODUCTION & SUPPLY',
      items: [
        { id: 'khatas', icon: Users, label: t('nav_khata') || 'Khatas & PO' },
        { id: 'jobwork', icon: Scissors, label: t('nav_jobwork') || 'Jobwork & Challans' },
        { id: 'qc', icon: CheckCircle2, label: t('nav_qc') || 'Inward & QC' },
        { id: 'inventory', icon: Boxes, label: t('nav_stock') || 'Stock & Allocation' }
      ]
    },
    {
      group: lang === 'gu' ? 'વેચાણ અને હિસાબ' : 'SALES & ACCOUNTING',
      items: [
        { id: 'sales', icon: ShoppingCart, label: t('nav_orders') || 'Sales Orders' },
        { id: 'dispatch', icon: Truck, label: t('nav_dispatch') || 'Dispatch & Packing' },
        { id: 'finance', icon: Receipt, label: t('nav_finance') || 'Finance & Invoicing' },
        { id: 'whatsapp', icon: MessageSquare, label: t('nav_whatsapp') || 'WhatsApp & AI' },
        { id: 'audit', icon: ShieldAlert, label: t('nav_audit') || 'Audit Trail' }
      ]
    }
  ];

  return (
    <aside className="glass-panel" style={{
      width: '240px',
      minWidth: '240px',
      padding: '16px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: 'calc(100vh - 90px)',
      position: 'sticky',
      top: '76px',
      borderRadius: 'var(--radius-lg)',
      overflowY: 'auto'
    }}>
      {menuGroups.map((grp, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ 
            fontSize: '0.68rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.06em', 
            color: 'var(--text-faint)', 
            fontWeight: 700,
            padding: '0 10px 4px 10px'
          }}>
            {grp.group}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {grp.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid transparent',
                    color: isActive ? '#f8fafc' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <Icon size={16} color={isActive ? 'var(--accent-gold)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="badge badge-gold" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      ))}

      {/* Role Pill Footer */}
      <div style={{
        marginTop: 'auto',
        padding: '10px 12px',
        background: 'rgba(15, 23, 42, 0.4)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} />
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Role: <strong style={{ color: '#e2e8f0' }}>{role === 'owner_admin' ? 'Owner / Admin' : role}</strong>
        </div>
      </div>
    </aside>
  );
};
