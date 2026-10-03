import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { UserRole } from '../types';
import { 
  Sparkles, 
  UserCheck, 
  Search, 
  ShieldCheck, 
  PlayCircle,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Menu,
  X,
  Languages,
  Globe
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    lang,
    setLang,
    searchQuery, 
    setSearchQuery, 
    isMobileNavOpen,
    setIsMobileNavOpen,
    runSection22Demo, 
    resetToDefaults,
    setActiveTab,
    auditLogs,
    triggerToast
  } = useTextile();

  const rolesList: { id: UserRole; name: string }[] = [
    { id: 'owner_admin', name: 'Owner / Executive Admin' },
    { id: 'purchase_production', name: 'Procurement & Production' },
    { id: 'qc_store', name: 'Quality & Store Keeper' },
    { id: 'sales', name: 'Sales Representative' },
    { id: 'dispatch', name: 'Dispatch & Logistics' },
    { id: 'accounts', name: 'Finance, Billing & CA' },
    { id: 'vendor_portal', name: 'Artisan / Jobwork Unit' }
  ];

  return (
    <header className="glass-panel" style={{ 
      margin: '12px 16px 0 16px', 
      padding: '10px 18px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      gap: '16px',
      position: 'sticky',
      top: '12px',
      zIndex: 100,
      borderRadius: 'var(--radius-lg)'
    }}>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        className="btn-secondary mobile-only"
        style={{ padding: '6px', height: '36px', width: '36px', alignItems: 'center', justifyContent: 'center' }}
        title="Toggle Menu"
      >
        {isMobileNavOpen ? <X size={18} color="var(--accent-gold)" /> : <Menu size={18} color="var(--accent-gold)" />}
      </button>

      {/* Brand */}
      <div 
        onClick={() => setActiveTab('dashboard')} 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.25)',
          fontSize: '1.1rem'
        }}>
          🧵
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Textile<span className="text-gradient-gold">Flow</span>
          </span>
          <span className="badge badge-gold hide-mobile" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
            PRO
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }} className="hide-mobile">
        <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search design, SKU, customer or invoice..."
          className="input-field"
          style={{ 
            paddingLeft: '34px', 
            paddingRight: searchQuery ? '32px' : '12px',
            height: '36px', 
            borderRadius: 'var(--radius-full)',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.82rem'
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        
        {/* Language Switcher Pill */}
        <button
          onClick={() => {
            const nextLang = lang === 'en' ? 'gu' : 'en';
            setLang(nextLang);
            triggerToast(nextLang === 'gu' ? 'ગુજરાતી ભાષા પસંદ થઈ' : 'Language set to English', 'info');
          }}
          className="btn-secondary"
          style={{
            padding: '4px 9px',
            height: '34px',
            fontSize: '0.74rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            background: lang === 'gu' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: lang === 'gu' ? '1px solid var(--accent-gold)' : '1px solid var(--border-medium)',
            color: lang === 'gu' ? 'var(--accent-gold)' : '#cbd5e1'
          }}
          title="Toggle Language / ભાષા બદલો"
        >
          <Globe size={13} />
          <span>{lang === 'en' ? 'EN' : 'ગુજરાતી'}</span>
        </button>

        {/* Role Selector Pill */}
        <div style={{ position: 'relative' }}>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="input-field"
            style={{ 
              height: '34px', 
              padding: '4px 10px', 
              fontSize: '0.78rem', 
              fontWeight: 600,
              width: 'auto',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-medium)',
              cursor: 'pointer'
            }}
          >
            {rolesList.map(r => (
              <option key={r.id} value={r.id} style={{ background: '#0f172a', color: '#fff' }}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Section 22 Proof Button */}
        <button 
          onClick={runSection22Demo}
          className="btn-primary"
          style={{ padding: '6px 14px', height: '34px', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}
        >
          <PlayCircle size={14} />
          <span className="hide-mobile">Section 22 Proof</span>
        </button>

        {/* Reset Button */}
        <button 
          onClick={resetToDefaults}
          className="btn-secondary"
          style={{ padding: '6px 10px', height: '34px', fontSize: '0.78rem', borderRadius: 'var(--radius-md)' }}
          title="Reset to Master Seed Data"
        >
          <RotateCcw size={13} />
          <span className="hide-mobile">Reset</span>
        </button>

        {/* Audit Log Icon */}
        <button 
          onClick={() => setActiveTab('audit')}
          className="btn-secondary"
          style={{ padding: '6px 8px', height: '34px', width: '34px', borderRadius: 'var(--radius-md)', position: 'relative' }}
          title="Audit Ledger"
        >
          <ShieldCheck size={16} color="var(--accent-cyan)" />
          {auditLogs.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: 'var(--accent-gold)',
              color: '#000',
              fontSize: '0.6rem',
              fontWeight: 800,
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {auditLogs.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
