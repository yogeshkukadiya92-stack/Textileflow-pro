import React from 'react';
import { useTextile } from './context/TextileContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Section22Demo } from './components/Section22Demo';
import { DesignCatalog } from './components/DesignCatalog';
import { KhataProcurement } from './components/KhataProcurement';
import { JobworkTracking } from './components/JobworkTracking';
import { QualityControl } from './components/QualityControl';
import { StockReservation } from './components/StockReservation';
import { SalesOrders } from './components/SalesOrders';
import { DispatchPacking } from './components/DispatchPacking';
import { FinanceBilling } from './components/FinanceBilling';
import { WhatsAppMarketing } from './components/WhatsAppMarketing';
import { AuditTrail } from './components/AuditTrail';
import { ToastContainer } from './components/ToastContainer';

export const AppContent: React.FC = () => {
  const { activeTab } = useTextile();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'walkthrough':
        return <Section22Demo />;
      case 'designs':
        return <DesignCatalog />;
      case 'khatas':
        return <KhataProcurement />;
      case 'jobwork':
        return <JobworkTracking />;
      case 'qc':
        return <QualityControl />;
      case 'inventory':
        return <StockReservation />;
      case 'sales':
        return <SalesOrders />;
      case 'dispatch':
        return <DispatchPacking />;
      case 'finance':
        return <FinanceBilling />;
      case 'whatsapp':
        return <WhatsAppMarketing />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <ToastContainer />

      <div style={{
        display: 'flex',
        flex: 1,
        maxWidth: '1600px',
        width: '100%',
        margin: '0 auto',
        padding: '16px',
        gap: '20px',
        alignItems: 'flex-start'
      }}>
        <Sidebar />

        <main style={{
          flex: 1,
          minWidth: 0,
          paddingBottom: '40px'
        }}>
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
