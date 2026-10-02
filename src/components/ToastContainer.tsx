import React from 'react';
import { useTextile } from '../context/TextileContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTextile();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '420px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        const borderColor = isSuccess 
          ? 'var(--accent-emerald)' 
          : isError 
            ? 'var(--accent-ruby)' 
            : isWarning 
              ? 'var(--accent-gold)' 
              : 'var(--accent-cyan)';

        const bgColor = isSuccess 
          ? 'rgba(6, 78, 59, 0.92)' 
          : isError 
            ? 'rgba(127, 29, 29, 0.92)' 
            : isWarning 
              ? 'rgba(120, 53, 15, 0.92)' 
              : 'rgba(15, 23, 42, 0.92)';

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              background: bgColor,
              border: `1px solid ${borderColor}`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              animation: 'fadeIn 0.25s ease-out'
            }}
          >
            <div style={{ marginTop: '2px' }}>
              {isSuccess && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
              {isError && <XCircle size={18} color="var(--accent-ruby)" />}
              {isWarning && <AlertTriangle size={18} color="var(--accent-gold)" />}
              {!isSuccess && !isError && !isWarning && <Info size={18} color="var(--accent-cyan)" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#f8fafc', marginBottom: '2px' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
