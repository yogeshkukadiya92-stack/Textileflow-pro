export type UserRole = 
  | 'owner_admin' 
  | 'purchase_production' 
  | 'qc_store' 
  | 'sales' 
  | 'dispatch' 
  | 'accounts' 
  | 'vendor_portal';

export type Language = 'en' | 'gu';

export type SampleStatus = 'Draft' | 'In Review' | 'Change Requested' | 'Approved' | 'Discontinued';

export type JobStageType = 
  | 'Material Ready' 
  | 'Embroidery' 
  | 'Handwork' 
  | 'Stitching' 
  | 'Finishing' 
  | 'QC' 
  | 'Packing';

export type QCStatus = 'Accepted' | 'Hold' | 'Rework' | 'Rejected';

export type OrderStatus = 
  | 'Inquiry' 
  | 'Quotation' 
  | 'Pending Approval' 
  | 'Confirmed' 
  | 'Allocated' 
  | 'Partially Dispatched' 
  | 'Fulfilled' 
  | 'Cancelled';

export type StockLocationType = 
  | 'Shop' 
  | 'Main Godown' 
  | 'Rack/Bin' 
  | 'QC Hold' 
  | 'Sample Room' 
  | 'Vendor Location' 
  | 'In-Transit' 
  | 'Damaged Bay';

export interface SKU {
  skuCode: string;
  color: string;
  size: string;
  shadeCode: string;
  barCode: string;
  readyPhysicalStock: number;
  reservedStock: number;
  availableStock: number; // readyPhysicalStock - reservedStock
}

export interface DesignComponent {
  name: string;
  consumptionMeters?: number;
  pieces?: number;
  fabric: string;
}

export interface DesignItem {
  id: string;
  designCode: string;
  title: string;
  titleGu?: string;
  category: 'Lehenga' | 'Saree' | 'Gown' | 'Dress Material';
  fabric: string;
  workType: string;
  currentVersion: string;
  sampleStatus: SampleStatus;
  estimatedCost: number; // Landed Cost in ₹
  wholesalePrice: number; // Wholesale Tier 1 Price in ₹
  semiWholesalePrice: number; // Semi-Wholesale Tier 2 Price in ₹
  minimumOrderQty: number;
  components: DesignComponent[];
  skus: SKU[];
  photoUrl: string;
  approvalDate?: string;
  approvedBy?: string;
  notes?: string;
}

export interface PhysicalSampleRecord {
  id: string;
  designCode: string;
  skuCode: string;
  quantity: number;
  recipientParty: string;
  recipientType: 'Agent' | 'Customer' | 'Exhibition' | 'Showroom';
  dispatchDate: string;
  returnDueDate: string;
  depositAmount: number;
  courierLR: string;
  status: 'With Recipient' | 'Returned' | 'Converted to Sale' | 'Overdue';
}

export interface KhataParty {
  id: string;
  name: string;
  khataType: 'Supplier' | 'Embroidery Unit' | 'Handwork Artisan' | 'Stitching Unit' | 'Finishing Jobwork' | 'Customer';
  city: string;
  phone: string;
  gstin?: string;
  capacityPerMonth?: number;
  leadTimeDays: number;
  outstandingBalance: number;
  qualityRating: number;
  creditLimit?: number;
  creditDays?: number;
  unpaidInvoicesTotal?: number;
  activeCommitmentsTotal?: number;
}

export interface PurchaseOrderItem {
  designCode: string;
  version: string;
  skuCode: string;
  color: string;
  orderedQty: number;
  receivedQty: number;
  ratePerSet: number;
  tolerancePercent: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  khataId: string;
  khataName: string;
  orderType: 'Finished Goods' | 'Raw Material / Jobwork';
  orderDate: string;
  deliveryDueDate: string;
  items: PurchaseOrderItem[];
  advancePaid: number;
  status: 'Draft' | 'Sent' | 'In Production' | 'Partially Received' | 'Completed' | 'Cancelled';
  paymentTerms: string;
  totalAmount: number;
}

export interface JobOrderStage {
  stageName: JobStageType;
  assignedKhataId: string;
  assignedKhataName: string;
  inputQty: number;
  goodOutputQty: number;
  pendingQty: number;
  reworkQty: number;
  wastageQty: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Transferred';
  startDate: string;
  completedDate?: string;
  ratePerUnit: number;
  remarks?: string;
}

export interface JobOrder {
  id: string;
  jobOrderNumber: string;
  parentPoNumber?: string;
  parentSalesOrderNumber?: string;
  designCode: string;
  version: string;
  issuedMaterial: string;
  totalSets: number;
  stages: JobOrderStage[];
  challanNumber: string;
  challanDate: string;
  status: 'Material Issued' | 'Stage WIP' | 'Finishing' | 'Completed';
  totalJobCharges: number;
}

export interface QCInspectionRecord {
  id: string;
  grnNumber: string;
  referencePoOrJob: string;
  designCode: string;
  lotNumber: string;
  totalReceived: number;
  acceptedQty: number;
  holdQty: number;
  reworkQty: number;
  rejectedQty: number;
  inspectorName: string;
  date: string;
  shadeConsistency: 'Perfect' | 'Slight Variance' | 'Mismatched';
  embroideryDefects: number;
  stainIssues: boolean;
  lehengaComponentsComplete: boolean;
  status: QCStatus;
  notes: string;
}

export interface StockReservation {
  id: string;
  salesOrderId: string;
  customerName: string;
  skuCode: string;
  lotNumber: string;
  reservedQty: number;
  reservedAt: string;
  expiresAt: string;
  status: 'Active' | 'Consumed By Dispatch' | 'Expired / Cancelled';
}

export interface SalesOrderItem {
  skuCode: string;
  color: string;
  quantity: number;
  unitPrice: number;
  allocatedQty: number;
  dispatchedQty: number;
  gstRate: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerCity: string;
  orderDate: string;
  orderType: 'Ready Stock' | 'Make To Order';
  status: OrderStatus;
  items: SalesOrderItem[];
  totalAmount: number;
  advanceReceived: number;
  creditOverride: boolean;
  creditOverrideReason?: string;
  notes?: string;
}

export interface DispatchPacking {
  id: string;
  dispatchNumber: string;
  salesOrderId: string;
  orderNumber: string;
  customerName: string;
  shippingAddress: string;
  cartonCount: number;
  cartonDetails: {
    cartonId: string;
    skuSummary: string;
    piecesCount: number;
    weightKg: number;
    sealNumber: string;
  }[];
  transporterName: string;
  lrNumber: string;
  dispatchDate: string;
  expectedDelivery: string;
  freightType: 'To-Pay' | 'Paid';
  deliveryStatus: 'Booked' | 'In-Transit' | 'Out for Delivery' | 'Delivered';
  dispatchedItems: {
    skuCode: string;
    qty: number;
  }[];
}

export interface TaxInvoice {
  id: string;
  invoiceNumber: string;
  salesOrderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  gstin?: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  gstTotal: number;
  grandTotal: number;
  cogsAmount: number;
  grossProfit: number;
  grossMarginPercent: number;
  allocatedAdvance: number;
  balanceDue: number;
  irnNumber?: string;
  eWayBillNumber?: string;
  status: 'Draft' | 'Posted' | 'Partially Paid' | 'Paid Full' | 'Cancelled';
}

export interface PaymentReceipt {
  id: string;
  receiptNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  receiptDate: string;
  paymentMode: 'Bank NEFT/RTGS' | 'UPI' | 'Cheque' | 'Cash';
  bankRef: string;
  allocatedToInvoices: {
    invoiceNumber: string;
    amount: number;
  }[];
  unallocatedAdvance: number;
  verified: boolean;
}

export interface WhatsAppMessageItem {
  id: string;
  sender: 'customer' | 'business' | 'system';
  partyName: string;
  phoneNumber: string;
  timestamp: string;
  messageText: string;
  isWithin24HrWindow: boolean;
  extractedOrderDraft?: {
    designCode: string;
    quantities: { color: string; qty: number }[];
    totalSets: number;
    suggestedRate: number;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
