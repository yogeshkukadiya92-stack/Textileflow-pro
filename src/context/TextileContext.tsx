import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  DesignItem, 
  KhataParty, 
  PurchaseOrder, 
  JobOrder, 
  QCInspectionRecord, 
  SalesOrder, 
  DispatchPacking, 
  TaxInvoice, 
  PaymentReceipt, 
  WhatsAppMessageItem, 
  AuditLog,
  PhysicalSampleRecord,
  ToastMessage 
} from '../types';
import { 
  initialDesigns, 
  initialKhatas, 
  initialPurchaseOrders, 
  initialJobOrders, 
  initialQCRecords, 
  initialPhysicalSamples, 
  initialSalesOrders, 
  initialDispatches, 
  initialInvoices, 
  initialPayments, 
  initialWhatsAppMessages, 
  initialAuditLogs 
} from '../data/initialData';

interface TextileContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  lang: Language;
  setLang: (l: Language) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  designs: DesignItem[];
  khatas: KhataParty[];
  purchaseOrders: PurchaseOrder[];
  jobOrders: JobOrder[];
  qcRecords: QCInspectionRecord[];
  physicalSamples: PhysicalSampleRecord[];
  salesOrders: SalesOrder[];
  dispatches: DispatchPacking[];
  invoices: TaxInvoice[];
  payments: PaymentReceipt[];
  whatsAppMessages: WhatsAppMessageItem[];
  auditLogs: AuditLog[];
  toasts: ToastMessage[];

  // Actions
  t: (key: string) => string;
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  triggerToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;

  createDesign: (design: Partial<DesignItem>) => void;
  approveDesign: (designId: string) => void;
  updateDesignStatus: (designId: string, status: any) => void;
  loanPhysicalSample: (sample: Partial<PhysicalSampleRecord>) => void;
  returnPhysicalSample: (sampleId: string) => void;
  convertSampleToSale: (sampleId: string, wholesaleRate: number) => void;

  createPurchaseOrder: (po: Partial<PurchaseOrder>) => void;
  updatePOStatus: (poId: string, status: any) => void;
  
  createJobOrder: (job: Partial<JobOrder>) => void;
  updateJobStage: (jobId: string, stageIndex: number, goodQty: number, reworkQty: number, remarks: string) => void;
  
  submitQCInspection: (record: Partial<QCInspectionRecord>) => void;
  
  createSalesOrder: (order: Partial<SalesOrder>) => boolean;
  cancelSalesOrder: (orderId: string) => void;
  
  executeDispatch: (orderId: string, transporterName: string, lrNumber: string, freightType?: 'To-Pay' | 'Paid') => void;
  
  allocateAdvanceToInvoice: (invoiceId: string, advanceAmount: number) => void;
  recordPayment: (payment: Partial<PaymentReceipt>) => void;
  
  sendWhatsAppReply: (msgId: string, replyText: string) => void;
  convertWhatsAppDraft: (msgId: string) => void;
  addIncomingWhatsAppMessage: (partyName: string, phone: string, text: string) => void;
  
  runSection22Demo: () => void;
  resetToDefaults: () => void;
  addAuditLog: (action: string, entityType: string, entityId: string, details: string) => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    app_title: 'TextileFlow Enterprise',
    app_subtitle: 'Wholesale Saree & Lehenga ERP | Yogesh AI Hub',
    nav_dashboard: 'Executive Dashboard',
    nav_walkthrough: 'Section 22 Math Proof',
    nav_designs: 'Designs & Sample Library',
    nav_khata: 'Khatas & Procurement (PO)',
    nav_jobwork: 'Embroidery & Jobwork Pipeline',
    nav_qc: 'Inward Goods & QC Inspection',
    nav_stock: 'Stock & Atomic Reservations',
    nav_orders: 'Sales Orders & Wholesale',
    nav_dispatch: 'Packing & Dispatch (LR)',
    nav_finance: 'Finance, GST & Landed Costing',
    nav_whatsapp: 'WhatsApp Business & AI Drafter',
    nav_audit: 'Audit Trail & Compliance',

    kpi_today_orders: 'Total Order Book',
    kpi_invoiced_sales: 'Net Invoiced Sales',
    kpi_gross_margin: 'Real Gross Margin %',
    kpi_ready_stock: 'Available Saleable Stock',
    kpi_vendor_wip: 'Artisan WIP Value',
    kpi_overdue_due: 'Total Outstanding Due',

    role_owner_admin: 'Owner / Executive Admin',
    role_purchase_production: 'Procurement & Production',
    role_qc_store: 'Quality & Store Keeper',
    role_sales: 'Sales Representative',
    role_dispatch: 'Dispatch & Logistics',
    role_accounts: 'Finance, Billing & CA',
    role_vendor_portal: 'Artisan / Jobwork Unit'
  },
  gu: {
    app_title: 'TextileFlow — ટેક્સટાઇલ બિઝનેસ મેનેજમેન્ટ',
    app_subtitle: 'સાડી અને લેહંગા હોલસેલ ઓપરેશન્સ | Yogesh AI Hub',
    nav_dashboard: 'માલિક ડેશબોર્ડ',
    nav_walkthrough: 'સેક્શન ૨૨ ગણિત ઉદાહરણ',
    nav_designs: 'સેમ્પલ અને ડિઝાઇન',
    nav_khata: 'ખાતા અને ખરીદી (PO)',
    nav_jobwork: 'એમ્બ્રોઇડરી અને જોબવર્ક',
    nav_qc: 'ગુણવત્તા ચકાસણી (QC)',
    nav_stock: 'સ્ટોક અને આરક્ષણ',
    nav_orders: 'ઓર્ડર અને ભાવ',
    nav_dispatch: 'પેકિંગ અને ડિસ્પેચ',
    nav_finance: 'હિસાબ અને નફો (GST)',
    nav_whatsapp: 'WhatsApp અને AI Drafter',
    nav_audit: 'ઓડિટ લોગ',

    kpi_today_orders: 'કુલ ઓર્ડર વેલ્યુ',
    kpi_invoiced_sales: 'ઇન્વૉઇસ્ડ વેચાણ (Net Sales)',
    kpi_gross_margin: 'વાસ્તવિક ગ્રોસ માર્જિન %',
    kpi_ready_stock: 'વેચી શકાય એવો સ્ટોક',
    kpi_vendor_wip: 'ખાતા પાસે ચાલુ માલ (WIP)',
    kpi_overdue_due: 'ગ્રાહક પાસેથી વસૂલાત બાકી',

    role_owner_admin: 'ઓનર / એડમિન',
    role_purchase_production: 'ખરીદી / પ્રોડક્શન',
    role_qc_store: 'QC / સ્ટોર કીપર',
    role_sales: 'સેલ્સ એક્ઝિક્યુટિવ',
    role_dispatch: 'ડિસ્પેચ / પેકિંગ',
    role_accounts: 'એકાઉન્ટ્સ / સીએ',
    role_vendor_portal: 'વેન્ડર પોર્ટલ (ખાતું)'
  }
};

const TextileContext = createContext<TextileContextType | undefined>(undefined);

// Helper for local storage
const loadStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`tf_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveStorage = <T,>(key: string, data: T) => {
  try {
    localStorage.setItem(`tf_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Storage save error:', e);
  }
};

export const TextileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('owner_admin');
  const [lang, setLang] = useState<Language>('en'); // 100% English professional default
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States
  const [designs, setDesigns] = useState<DesignItem[]>(() => loadStorage('designs', initialDesigns));
  const [khatas, setKhatas] = useState<KhataParty[]>(() => loadStorage('khatas', initialKhatas));
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => loadStorage('pos', initialPurchaseOrders));
  const [jobOrders, setJobOrders] = useState<JobOrder[]>(() => loadStorage('jobs', initialJobOrders));
  const [qcRecords, setQcRecords] = useState<QCInspectionRecord[]>(() => loadStorage('qc', initialQCRecords));
  const [physicalSamples, setPhysicalSamples] = useState<PhysicalSampleRecord[]>(() => loadStorage('samples', initialPhysicalSamples));
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>(() => loadStorage('orders', initialSalesOrders));
  const [dispatches, setDispatches] = useState<DispatchPacking[]>(() => loadStorage('dispatches', initialDispatches));
  const [invoices, setInvoices] = useState<TaxInvoice[]>(() => loadStorage('invoices', initialInvoices));
  const [payments, setPayments] = useState<PaymentReceipt[]>(() => loadStorage('payments', initialPayments));
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessageItem[]>(() => loadStorage('whatsapp', initialWhatsAppMessages));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadStorage('audit', initialAuditLogs));

  // Sync to storage
  useEffect(() => { saveStorage('designs', designs); }, [designs]);
  useEffect(() => { saveStorage('khatas', khatas); }, [khatas]);
  useEffect(() => { saveStorage('pos', purchaseOrders); }, [purchaseOrders]);
  useEffect(() => { saveStorage('jobs', jobOrders); }, [jobOrders]);
  useEffect(() => { saveStorage('qc', qcRecords); }, [qcRecords]);
  useEffect(() => { saveStorage('samples', physicalSamples); }, [physicalSamples]);
  useEffect(() => { saveStorage('orders', salesOrders); }, [salesOrders]);
  useEffect(() => { saveStorage('dispatches', dispatches); }, [dispatches]);
  useEffect(() => { saveStorage('invoices', invoices); }, [invoices]);
  useEffect(() => { saveStorage('payments', payments); }, [payments]);
  useEffect(() => { saveStorage('whatsapp', whatsAppMessages); }, [whatsAppMessages]);
  useEffect(() => { saveStorage('audit', auditLogs); }, [auditLogs]);

  const addToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts(prev => [newToast, ...prev]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const title = type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'warning' ? 'Alert' : 'Notice';
    addToast(title, message, type);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  const addAuditLog = (action: string, entityType: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric' }),
      userRole: role,
      userName: role === 'owner_admin' ? 'Yogeshbhai (Principal Admin)' : role.toUpperCase().replace('_', ' '),
      action,
      entityType,
      entityId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Design Management
  const createDesign = (designData: Partial<DesignItem>) => {
    const designCode = designData.designCode || `LH-${Math.floor(100 + Math.random() * 900)}`;
    const newDesign: DesignItem = {
      id: `d-${Date.now()}`,
      designCode,
      title: designData.title || 'Exclusive Embroidered Bridal Lehenga',
      category: designData.category || 'Lehenga',
      fabric: designData.fabric || 'Pure Silk / Velvet',
      workType: designData.workType || 'Zari & Hand Embroidery',
      currentVersion: 'V1',
      sampleStatus: 'In Review',
      estimatedCost: designData.estimatedCost || 1800,
      wholesalePrice: designData.wholesalePrice || 2400,
      semiWholesalePrice: designData.semiWholesalePrice || 2650,
      minimumOrderQty: designData.minimumOrderQty || 20,
      photoUrl: designData.photoUrl || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      approvalDate: undefined,
      approvedBy: undefined,
      notes: designData.notes || 'Created via Design Master',
      components: designData.components || [
        { name: 'Lehenga Skirt Fabric (16 Kalis)', fabric: 'Velvet 9000', pieces: 1 },
        { name: 'Unstitched Blouse Piece', fabric: 'Raw Silk', pieces: 1 },
        { name: 'Bridal Dupatta', fabric: 'Net with Border', pieces: 1 }
      ],
      skus: designData.skus || [
        {
          skuCode: `${designCode}-RED-FS`,
          color: 'Crimson Red',
          size: 'Free Size',
          shadeCode: 'SH-101',
          barCode: `8901215${Math.floor(10000 + Math.random() * 90000)}`,
          readyPhysicalStock: 0,
          reservedStock: 0,
          availableStock: 0
        },
        {
          skuCode: `${designCode}-BLU-FS`,
          color: 'Royal Navy',
          size: 'Free Size',
          shadeCode: 'SH-102',
          barCode: `8901215${Math.floor(10000 + Math.random() * 90000)}`,
          readyPhysicalStock: 0,
          reservedStock: 0,
          availableStock: 0
        }
      ]
    };

    setDesigns(prev => [newDesign, ...prev]);
    addAuditLog('New Design Created', 'DesignItem', newDesign.designCode, `Created design ${newDesign.title} with 2 initial SKUs.`);
    addToast('Design Created', `Design ${newDesign.designCode} created and queued for technical sample approval.`, 'success');
  };

  const approveDesign = (designId: string) => {
    setDesigns(prev => prev.map(d => {
      if (d.id === designId) {
        return {
          ...d,
          sampleStatus: 'Approved',
          approvalDate: new Date().toISOString().split('T')[0],
          approvedBy: 'Admin Signoff (Master Plan v1.0)'
        };
      }
      return d;
    }));
    addAuditLog('Sample Approved', 'DesignItem', designId, 'Commercial production unlocked.');
    addToast('Sample Approved', 'Design technical specifications approved for factory PO generation.', 'success');
  };

  const updateDesignStatus = (designId: string, status: any) => {
    setDesigns(prev => prev.map(d => d.id === designId ? { ...d, sampleStatus: status } : d));
    addToast('Status Updated', `Design status updated to ${status}.`, 'info');
  };

  // 2. Physical Sample Loan / Return / Sale Conversion
  const loanPhysicalSample = (sampleData: Partial<PhysicalSampleRecord>) => {
    const newSample: PhysicalSampleRecord = {
      id: `smp-${Date.now()}`,
      designCode: sampleData.designCode || 'LH-101',
      skuCode: sampleData.skuCode || 'LH-101-MAR-FS',
      quantity: sampleData.quantity || 1,
      recipientParty: sampleData.recipientParty || 'Agent Showroom',
      recipientType: sampleData.recipientType || 'Agent',
      dispatchDate: new Date().toISOString().split('T')[0],
      returnDueDate: sampleData.returnDueDate || '2026-10-15',
      depositAmount: sampleData.depositAmount || 2500,
      courierLR: sampleData.courierLR || 'DIRECT-HAND-LOAN',
      status: 'With Recipient'
    };

    // Decrement physical and available stock in warehouse
    setDesigns(prev => prev.map(d => {
      if (d.designCode === newSample.designCode) {
        const updatedSkus = d.skus.map(s => {
          if (s.skuCode === newSample.skuCode) {
            const newPhys = Math.max(0, s.readyPhysicalStock - newSample.quantity);
            return {
              ...s,
              readyPhysicalStock: newPhys,
              availableStock: Math.max(0, newPhys - s.reservedStock)
            };
          }
          return s;
        });
        return { ...d, skus: updatedSkus };
      }
      return d;
    }));

    setPhysicalSamples(prev => [newSample, ...prev]);
    addAuditLog('Physical Sample Dispatched', 'PhysicalSampleRecord', newSample.skuCode, `Loaned ${newSample.quantity} set to ${newSample.recipientParty}`);
    addToast('Sample Dispatched', `Physical sample loaned to ${newSample.recipientParty}. Deducted from saleable pool.`, 'info');
  };

  const returnPhysicalSample = (sampleId: string) => {
    const sample = physicalSamples.find(s => s.id === sampleId);
    if (!sample) return;

    // Restock back into warehouse
    setDesigns(prev => prev.map(d => {
      if (d.designCode === sample.designCode) {
        const updatedSkus = d.skus.map(s => {
          if (s.skuCode === sample.skuCode) {
            const newPhys = s.readyPhysicalStock + sample.quantity;
            return {
              ...s,
              readyPhysicalStock: newPhys,
              availableStock: newPhys - s.reservedStock
            };
          }
          return s;
        });
        return { ...d, skus: updatedSkus };
      }
      return d;
    }));

    setPhysicalSamples(prev => prev.map(s => s.id === sampleId ? { ...s, status: 'Returned' } : s));
    addAuditLog('Physical Sample Returned', 'PhysicalSampleRecord', sample.skuCode, `Returned by ${sample.recipientParty}. Stock restored.`);
    addToast('Sample Restocked', `Physical sample returned by ${sample.recipientParty} and returned to saleable stock.`, 'success');
  };

  const convertSampleToSale = (sampleId: string, wholesaleRate: number) => {
    const sample = physicalSamples.find(s => s.id === sampleId);
    if (!sample) return;

    setPhysicalSamples(prev => prev.map(s => s.id === sampleId ? { ...s, status: 'Converted to Sale' } : s));
    addAuditLog('Sample Converted to Sale', 'PhysicalSampleRecord', sample.skuCode, `Converted to completed sale @ ₹${wholesaleRate}.`);
    addToast('Sale Converted', `Sample loan converted to confirmed commercial sale @ ₹${wholesaleRate}.`, 'success');
  };

  // 3. Purchase Orders
  const createPurchaseOrder = (poData: Partial<PurchaseOrder>) => {
    const poNumber = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPO: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber,
      khataId: poData.khataId || 'k-1',
      khataName: poData.khataName || 'Arihant Fabrics & Weaving Mills',
      orderType: poData.orderType || 'Finished Goods',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDueDate: poData.deliveryDueDate || '2026-10-18',
      items: poData.items || [],
      advancePaid: poData.advancePaid || 0,
      status: 'Sent',
      paymentTerms: '30 Days Net from GRN approval',
      totalAmount: poData.totalAmount || 180000
    };

    setPurchaseOrders(prev => [newPO, ...prev]);
    addAuditLog('Purchase Order Issued', 'PurchaseOrder', newPO.poNumber, `PO issued to ${newPO.khataName} for total ₹${newPO.totalAmount.toLocaleString('en-IN')}`);
    addToast('PO Generated', `Official Purchase Order ${newPO.poNumber} issued to ${newPO.khataName}.`, 'success');
  };

  const updatePOStatus = (poId: string, status: any) => {
    setPurchaseOrders(prev => prev.map(p => p.id === poId ? { ...p, status } : p));
    addToast('PO Status Updated', `Purchase Order marked as ${status}.`, 'info');
  };

  // 4. Job Orders & Stages
  const createJobOrder = (jobData: Partial<JobOrder>) => {
    const joNumber = `JO-2026-${Math.floor(8800 + Math.random() * 1000)}`;
    const newJO: JobOrder = {
      id: `jo-${Date.now()}`,
      jobOrderNumber: joNumber,
      parentPoNumber: jobData.parentPoNumber || 'PO-2026-1001',
      designCode: jobData.designCode || 'LH-101',
      version: jobData.version || 'V2',
      issuedMaterial: jobData.issuedMaterial || 'Raw Micro Velvet 9000 (280m)',
      totalSets: jobData.totalSets || 100,
      challanNumber: `CH-CGST-45-${Math.floor(1000 + Math.random() * 9000)}`,
      challanDate: new Date().toISOString().split('T')[0],
      status: 'Stage WIP',
      totalJobCharges: jobData.totalJobCharges || 68000,
      stages: jobData.stages || [
        {
          stageName: 'Material Ready',
          assignedKhataId: 'k-1',
          assignedKhataName: 'Arihant Fabrics (Surat)',
          inputQty: jobData.totalSets || 100,
          goodOutputQty: jobData.totalSets || 100,
          pendingQty: 0,
          reworkQty: 0,
          wastageQty: 0,
          status: 'Completed',
          startDate: new Date().toISOString().split('T')[0],
          ratePerUnit: 0
        },
        {
          stageName: 'Embroidery',
          assignedKhataId: 'k-2',
          assignedKhataName: 'Balaji Embroidery (Varachha)',
          inputQty: jobData.totalSets || 100,
          goodOutputQty: 0,
          pendingQty: jobData.totalSets || 100,
          reworkQty: 0,
          wastageQty: 0,
          status: 'In Progress',
          startDate: new Date().toISOString().split('T')[0],
          ratePerUnit: 350
        }
      ]
    };

    setJobOrders(prev => [newJO, ...prev]);
    addAuditLog('Job Order Created', 'JobOrder', newJO.jobOrderNumber, `Challan ${newJO.challanNumber} generated under CGST Rule 45.`);
    addToast('Job Order Created', `Job order ${newJO.jobOrderNumber} and Rule 45 delivery challan generated.`, 'success');
  };

  const updateJobStage = (jobId: string, stageIndex: number, goodQty: number, reworkQty: number, remarks: string) => {
    setJobOrders(prev => prev.map(job => {
      if (job.id === jobId) {
        const updatedStages = [...job.stages];
        const currentStage = { ...updatedStages[stageIndex] };
        currentStage.goodOutputQty = goodQty;
        currentStage.reworkQty = reworkQty;
        currentStage.pendingQty = Math.max(0, currentStage.inputQty - goodQty - reworkQty);
        currentStage.remarks = remarks;
        if (currentStage.pendingQty === 0) {
          currentStage.status = 'Completed';
          currentStage.completedDate = new Date().toISOString().split('T')[0];
        } else {
          currentStage.status = 'In Progress';
        }
        updatedStages[stageIndex] = currentStage;
        return { ...job, stages: updatedStages };
      }
      return job;
    }));
    addAuditLog('Job Stage Advanced', 'JobOrder', jobId, `Stage ${stageIndex + 1} updated with good output: ${goodQty}, rework: ${reworkQty}`);
    addToast('Stage Updated', `Jobwork stage updated. Output: ${goodQty}, Rework: ${reworkQty}`, 'success');
  };

  // 5. Inward QC Inspection
  const submitQCInspection = (record: Partial<QCInspectionRecord>) => {
    const grnNumber = `GRN-2026-0${Math.floor(100 + Math.random() * 900)}`;
    const newQC: QCInspectionRecord = {
      id: `qc-${Date.now()}`,
      grnNumber,
      referencePoOrJob: record.referencePoOrJob || 'PO-2026-1001',
      designCode: record.designCode || 'LH-101',
      lotNumber: record.lotNumber || `LOT-${Date.now().toString().slice(-6)}`,
      totalReceived: record.totalReceived || 50,
      acceptedQty: record.acceptedQty || 50,
      holdQty: record.holdQty || 0,
      reworkQty: record.reworkQty || 0,
      rejectedQty: record.rejectedQty || 0,
      inspectorName: 'Bhavin Patel (Chief QC Inspector)',
      date: new Date().toISOString().split('T')[0],
      shadeConsistency: record.shadeConsistency || 'Perfect',
      embroideryDefects: record.embroideryDefects || 0,
      stainIssues: record.stainIssues || false,
      lehengaComponentsComplete: record.lehengaComponentsComplete !== false,
      status: (record.rejectedQty || 0) > 0 ? 'Hold' : 'Accepted',
      notes: record.notes || 'Inward verification completed with multi-point technical check.'
    };

    setQcRecords(prev => [newQC, ...prev]);

    // Live Inventory Update: Accepted quantity is directly split and injected into the design SKUs!
    if (newQC.acceptedQty > 0) {
      setDesigns(prev => prev.map(des => {
        if (des.designCode === newQC.designCode) {
          const splitPerSku = Math.floor(newQC.acceptedQty / des.skus.length);
          const remainder = newQC.acceptedQty % des.skus.length;

          const updatedSkus = des.skus.map((s, idx) => {
            const addQty = splitPerSku + (idx === 0 ? remainder : 0);
            const newPhysical = s.readyPhysicalStock + addQty;
            return {
              ...s,
              readyPhysicalStock: newPhysical,
              availableStock: newPhysical - s.reservedStock
            };
          });
          return { ...des, skus: updatedSkus };
        }
        return des;
      }));
    }

    addAuditLog('Inward QC Completed', 'QCInspectionRecord', newQC.grnNumber, `Received: ${newQC.totalReceived}, Accepted into stock: ${newQC.acceptedQty}, Rework: ${newQC.reworkQty}, Rejection claim: ${newQC.rejectedQty}`);
    addToast('QC Inspection Filed', `GRN ${newQC.grnNumber}: ${newQC.acceptedQty} sets verified and added to available stock.`, 'success');
  };

  // 6. Sales Orders with Credit & Stock Validation
  const createSalesOrder = (orderData: Partial<SalesOrder>): boolean => {
    const customer = khatas.find(k => k.id === orderData.customerId);
    const totalOrderValue = orderData.totalAmount || 0;

    // Credit Exposure Validation
    if (customer && !orderData.creditOverride) {
      const currentExposure = (customer.unpaidInvoicesTotal || 0) + (customer.activeCommitmentsTotal || 0);
      const limit = customer.creditLimit || 500000;
      if (currentExposure + totalOrderValue > limit) {
        addToast('Credit Limit Exceeded', `${customer.name} exceeds credit ceiling of ₹${limit.toLocaleString('en-IN')}. Manager override required.`, 'warning');
        return false;
      }
    }

    const orderNumber = `SO-2026-${Math.floor(5500 + Math.random() * 4000)}`;
    const newSO: SalesOrder = {
      id: `so-${Date.now()}`,
      orderNumber,
      customerId: orderData.customerId || 'k-5',
      customerName: orderData.customerName || 'Shreemati Bridal Sarees Ltd.',
      customerCity: orderData.customerCity || 'Mumbai',
      orderDate: new Date().toISOString().split('T')[0],
      orderType: orderData.orderType || 'Ready Stock',
      status: 'Confirmed',
      advanceReceived: orderData.advanceReceived || 0,
      creditOverride: orderData.creditOverride || false,
      creditOverrideReason: orderData.creditOverrideReason,
      totalAmount: totalOrderValue,
      items: orderData.items || []
    };

    // Atomic Stock Reservation: Deduct from available stock and add to reserved stock!
    setDesigns(prev => prev.map(d => {
      const updatedSkus = d.skus.map(sku => {
        const item = newSO.items.find(i => i.skuCode === sku.skuCode);
        if (item) {
          const newReserved = sku.reservedStock + item.quantity;
          return {
            ...sku,
            reservedStock: newReserved,
            availableStock: sku.readyPhysicalStock - newReserved
          };
        }
        return sku;
      });
      return { ...d, skus: updatedSkus };
    }));

    // Update Customer commitments
    if (customer) {
      setKhatas(prev => prev.map(k => k.id === customer.id ? {
        ...k,
        activeCommitmentsTotal: (k.activeCommitmentsTotal || 0) + totalOrderValue
      } : k));
    }

    setSalesOrders(prev => [newSO, ...prev]);
    addAuditLog('Sales Order Booked', 'SalesOrder', newSO.orderNumber, `Order placed by ${newSO.customerName} for ₹${totalOrderValue.toLocaleString('en-IN')}. Stock reserved atomically.`);
    addToast('Order Confirmed', `Order ${newSO.orderNumber} confirmed. Stock reserved atomically in warehouse pool.`, 'success');
    return true;
  };

  const cancelSalesOrder = (orderId: string) => {
    const targetOrder = salesOrders.find(o => o.id === orderId);
    if (!targetOrder) return;

    // Release reservations
    setDesigns(prev => prev.map(d => {
      const updatedSkus = d.skus.map(sku => {
        const item = targetOrder.items.find(i => i.skuCode === sku.skuCode);
        if (item) {
          const newReserved = Math.max(0, sku.reservedStock - item.quantity);
          return {
            ...sku,
            reservedStock: newReserved,
            availableStock: sku.readyPhysicalStock - newReserved
          };
        }
        return sku;
      });
      return { ...d, skus: updatedSkus };
    }));

    setSalesOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    addAuditLog('Order Cancelled', 'SalesOrder', targetOrder.orderNumber, 'Reservation released back to available pool.');
    addToast('Order Cancelled', `Order ${targetOrder.orderNumber} cancelled. Reserved stock released.`, 'info');
  };

  // 7. Dispatch & Transporter LR
  const executeDispatch = (orderId: string, transporterName: string, lrNumber: string, freightType: 'To-Pay' | 'Paid' = 'To-Pay') => {
    const targetOrder = salesOrders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const dispatchNumber = `DSP-2026-${Math.floor(300 + Math.random() * 600)}`;
    const totalPcs = targetOrder.items.reduce((s, it) => s + it.quantity, 0);

    const newDispatch: DispatchPacking = {
      id: `dsp-${Date.now()}`,
      dispatchNumber,
      salesOrderId: targetOrder.id,
      orderNumber: targetOrder.orderNumber,
      customerName: targetOrder.customerName,
      shippingAddress: `${targetOrder.customerCity} Regional Textile Hub`,
      cartonCount: Math.ceil(totalPcs / 12) || 2,
      cartonDetails: [
        {
          cartonId: `BALE-SURAT-${Math.floor(1000 + Math.random() * 9000)}`,
          skuSummary: `${totalPcs} Sets Packed with Barcode Tamper Seal`,
          piecesCount: totalPcs,
          weightKg: Math.round(totalPcs * 1.15),
          sealNumber: `SEAL-BARCODE-${Date.now().toString().slice(-4)}`
        }
      ],
      transporterName: transporterName || 'VRL Logistics (Surat - Mumbai Super)',
      lrNumber: lrNumber || `VRL-LR-${Math.floor(100000 + Math.random() * 900000)}`,
      dispatchDate: new Date().toISOString().split('T')[0],
      expectedDelivery: 'In 2 Business Days',
      freightType,
      deliveryStatus: 'In-Transit',
      dispatchedItems: targetOrder.items.map(it => ({ skuCode: it.skuCode, qty: it.quantity }))
    };

    setDispatches(prev => [newDispatch, ...prev]);

    // Update sales order fulfillment status
    setSalesOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Fulfilled' } : o));

    // Release reservation and decrement physical stock
    setDesigns(prev => prev.map(d => {
      const updatedSkus = d.skus.map(sku => {
        const item = targetOrder.items.find(i => i.skuCode === sku.skuCode);
        if (item) {
          const newPhysical = Math.max(0, sku.readyPhysicalStock - item.quantity);
          const newReserved = Math.max(0, sku.reservedStock - item.quantity);
          return {
            ...sku,
            readyPhysicalStock: newPhysical,
            reservedStock: newReserved,
            availableStock: newPhysical - newReserved
          };
        }
        return sku;
      });
      return { ...d, skus: updatedSkus };
    }));

    // Auto-generate Tax Invoice (Section 13 & 14)
    const subtotal = targetOrder.totalAmount;
    const gstTotal = Math.round(subtotal * 0.05); // 5% GST
    const grandTotal = subtotal + gstTotal;
    const estimatedCost = Math.round(subtotal * 0.75); // approx 75% cost, 25% margin
    const grossProfit = subtotal - estimatedCost;

    const newInvoice: TaxInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(4400 + Math.random() * 1000)}`,
      salesOrderId: targetOrder.id,
      orderNumber: targetOrder.orderNumber,
      customerId: targetOrder.customerId,
      customerName: targetOrder.customerName,
      gstin: '27AABCS9876C1Z9',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal,
      gstTotal,
      grandTotal,
      cogsAmount: estimatedCost,
      grossProfit,
      grossMarginPercent: Number(((grossProfit / subtotal) * 100).toFixed(1)),
      allocatedAdvance: targetOrder.advanceReceived || 0,
      balanceDue: grandTotal - (targetOrder.advanceReceived || 0),
      irnNumber: `irn_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
      eWayBillNumber: `24${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: (grandTotal - (targetOrder.advanceReceived || 0)) <= 0 ? 'Paid Full' : 'Partially Paid'
    };

    setInvoices(prev => [newInvoice, ...prev]);

    addAuditLog('Goods Dispatched & Invoiced', 'DispatchPacking', newDispatch.dispatchNumber, `Dispatched via ${transporterName} (LR: ${lrNumber}). Tax Invoice ${newInvoice.invoiceNumber} auto-generated.`);
    addToast('Dispatched & Invoiced', `Dispatch ${newDispatch.dispatchNumber} booked. Tax Invoice ${newInvoice.invoiceNumber} generated.`, 'success');
  };

  // 8. Finance & Advance Allocations
  const allocateAdvanceToInvoice = (invoiceId: string, advanceAmount: number) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newAllocated = inv.allocatedAdvance + advanceAmount;
        const newBalance = Math.max(0, inv.grandTotal - newAllocated);
        return {
          ...inv,
          allocatedAdvance: newAllocated,
          balanceDue: newBalance,
          status: newBalance === 0 ? 'Paid Full' : 'Partially Paid'
        };
      }
      return inv;
    }));
    addAuditLog('Advance Allocated', 'TaxInvoice', invoiceId, `Allocated ₹${advanceAmount.toLocaleString('en-IN')} advance against invoice.`);
    addToast('Advance Settled', `Allocated ₹${advanceAmount.toLocaleString('en-IN')} against invoice. Balance updated.`, 'success');
  };

  const recordPayment = (paymentData: Partial<PaymentReceipt>) => {
    const newReceipt: PaymentReceipt = {
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: paymentData.customerId || 'k-5',
      customerName: paymentData.customerName || 'Shreemati Bridal Sarees Ltd.',
      amount: paymentData.amount || 25000,
      receiptDate: new Date().toISOString().split('T')[0],
      paymentMode: paymentData.paymentMode || 'Bank NEFT/RTGS',
      bankRef: paymentData.bankRef || `UTR${Date.now().toString().slice(-9)}`,
      allocatedToInvoices: paymentData.allocatedToInvoices || [],
      unallocatedAdvance: paymentData.unallocatedAdvance || 0,
      verified: true
    };

    setPayments(prev => [newReceipt, ...prev]);
    addAuditLog('Bank Payment Received', 'PaymentReceipt', newReceipt.receiptNumber, `Received ₹${newReceipt.amount.toLocaleString('en-IN')} via ${newReceipt.paymentMode} (${newReceipt.bankRef})`);
    addToast('Payment Recorded', `Payment receipt ${newReceipt.receiptNumber} recorded and verified.`, 'success');
  };

  // 9. WhatsApp Messaging & AI Parser
  const sendWhatsAppReply = (msgId: string, text: string) => {
    const targetMsg = whatsAppMessages.find(m => m.id === msgId);
    const newMsg: WhatsAppMessageItem = {
      id: `wa-${Date.now()}`,
      sender: 'business',
      partyName: targetMsg ? targetMsg.partyName : 'Customer',
      phoneNumber: targetMsg ? targetMsg.phoneNumber : '+91 98200 99881',
      timestamp: 'Just now',
      messageText: text,
      isWithin24HrWindow: true
    };
    setWhatsAppMessages(prev => [...prev, newMsg]);
    addToast('WhatsApp Sent', `Message delivered to ${newMsg.phoneNumber}.`, 'info');
  };

  const addIncomingWhatsAppMessage = (partyName: string, phone: string, text: string) => {
    // Basic AI Extraction simulation
    let extractedDraft = undefined;
    if (text.includes('LH-101') || text.includes('101') || text.toLowerCase().includes('lehenga')) {
      extractedDraft = {
        designCode: 'LH-101',
        totalSets: 20,
        suggestedRate: 2400,
        quantities: [
          { color: 'Bridal Crimson Maroon', qty: 10 },
          { color: 'Royal Emerald Green', qty: 10 }
        ]
      };
    }

    const newMsg: WhatsAppMessageItem = {
      id: `wa-${Date.now()}`,
      sender: 'customer',
      partyName,
      phoneNumber: phone,
      timestamp: 'Just now',
      messageText: text,
      isWithin24HrWindow: true,
      extractedOrderDraft: extractedDraft
    };

    setWhatsAppMessages(prev => [newMsg, ...prev]);
    addToast('Incoming Message', `Received WhatsApp from ${partyName}. AI Drafter engaged.`, 'info');
  };

  const convertWhatsAppDraft = (msgId: string) => {
    const msg = whatsAppMessages.find(m => m.id === msgId);
    if (!msg || !msg.extractedOrderDraft) return;

    const draft = msg.extractedOrderDraft;
    const targetDesign = designs.find(d => d.designCode === draft.designCode) || designs[0];

    createSalesOrder({
      customerId: 'k-5',
      customerName: msg.partyName,
      customerCity: 'Mumbai',
      orderType: 'Ready Stock',
      advanceReceived: 10000,
      totalAmount: draft.totalSets * draft.suggestedRate,
      items: draft.quantities.map(q => ({
        skuCode: targetDesign.skus[0]?.skuCode || 'LH-101-MAR-FS',
        color: q.color,
        quantity: q.qty,
        unitPrice: draft.suggestedRate,
        allocatedQty: q.qty,
        dispatchedQty: 0,
        gstRate: 5
      }))
    });

    // Clear draft tag
    setWhatsAppMessages(prev => prev.map(m => m.id === msgId ? { ...m, extractedOrderDraft: undefined } : m));
    addAuditLog('AI Draft Converted', 'SalesOrder', draft.designCode, `WhatsApp order draft converted to confirmed booking.`);
  };

  // Section 22 Showcase Reset
  const runSection22Demo = () => {
    setActiveTab('walkthrough');
    addToast('Section 22 Loaded', 'Interactive mathematical walkthrough loaded for LH-101.', 'info');
  };

  const resetToDefaults = () => {
    setDesigns(initialDesigns);
    setKhatas(initialKhatas);
    setPurchaseOrders(initialPurchaseOrders);
    setJobOrders(initialJobOrders);
    setQcRecords(initialQCRecords);
    setPhysicalSamples(initialPhysicalSamples);
    setSalesOrders(initialSalesOrders);
    setDispatches(initialDispatches);
    setInvoices(initialInvoices);
    setPayments(initialPayments);
    setWhatsAppMessages(initialWhatsAppMessages);
    setAuditLogs(initialAuditLogs);
    localStorage.clear();
    addToast('Data Reset', 'All records restored to Section 22 master benchmark seed data.', 'info');
  };

  return (
    <TextileContext.Provider value={{
      role,
      setRole,
      lang,
      setLang,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      designs,
      khatas,
      purchaseOrders,
      jobOrders,
      qcRecords,
      physicalSamples,
      salesOrders,
      dispatches,
      invoices,
      payments,
      whatsAppMessages,
      auditLogs,
      toasts,
      t,
      addToast,
      triggerToast,
      removeToast,
      createDesign,
      approveDesign,
      updateDesignStatus,
      loanPhysicalSample,
      returnPhysicalSample,
      convertSampleToSale,
      createPurchaseOrder,
      updatePOStatus,
      createJobOrder,
      updateJobStage,
      submitQCInspection,
      createSalesOrder,
      cancelSalesOrder,
      executeDispatch,
      allocateAdvanceToInvoice,
      recordPayment,
      sendWhatsAppReply,
      convertWhatsAppDraft,
      addIncomingWhatsAppMessage,
      runSection22Demo,
      resetToDefaults,
      addAuditLog
    }}>
      {children}
    </TextileContext.Provider>
  );
};

export const useTextile = () => {
  const context = useContext(TextileContext);
  if (!context) {
    throw new Error('useTextile must be used within a TextileProvider');
  }
  return context;
};
