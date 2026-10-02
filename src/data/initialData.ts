import { 
  DesignItem, 
  KhataParty, 
  PurchaseOrder, 
  JobOrder, 
  QCInspectionRecord, 
  StockReservation, 
  SalesOrder, 
  DispatchPacking, 
  TaxInvoice, 
  PaymentReceipt, 
  WhatsAppMessageItem, 
  AuditLog,
  PhysicalSampleRecord 
} from '../types';

export const initialDesigns: DesignItem[] = [
  {
    id: 'd-1',
    designCode: 'LH-101',
    title: 'Royal Velvet Embroidered Bridal Lehenga (Section 22 Benchmark)',
    category: 'Lehenga',
    fabric: 'Micro Velvet 9000 & Butter Soft Net',
    workType: 'Heavy Zari, Resham & Sequence Handwork',
    currentVersion: 'V2',
    sampleStatus: 'Approved',
    estimatedCost: 1800,
    wholesalePrice: 2400,
    semiWholesalePrice: 2650,
    minimumOrderQty: 25,
    photoUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    approvalDate: '2026-09-28',
    approvedBy: 'Yogeshbhai (Principal Planner)',
    notes: 'Approved sample version V2 with 16 Kalis flared circumference and reinforced micro-can-can lining.',
    components: [
      { name: 'Lehenga Skirt Fabric (16 Kalis)', fabric: 'Micro Velvet 9000', pieces: 1 },
      { name: 'Unstitched Designer Choli/Blouse', fabric: 'Matching Velvet with embroidered sleeves', pieces: 1 },
      { name: 'Bridal Dupatta with 4-Side Border', fabric: 'Butter Soft Net with Heavy Zari border', pieces: 1 }
    ],
    skus: [
      {
        skuCode: 'LH-101-MAR-FS',
        color: 'Bridal Crimson Maroon',
        size: 'Free Size (Up to 42 Waist)',
        shadeCode: 'SH-881',
        barCode: '890121510101',
        readyPhysicalStock: 18,
        reservedStock: 3,
        availableStock: 15
      },
      {
        skuCode: 'LH-101-EME-FS',
        color: 'Royal Emerald Green',
        size: 'Free Size (Up to 42 Waist)',
        shadeCode: 'SH-882',
        barCode: '890121510102',
        readyPhysicalStock: 19,
        reservedStock: 4,
        availableStock: 15
      },
      {
        skuCode: 'LH-101-NAV-FS',
        color: 'Imperial Navy Blue',
        size: 'Free Size (Up to 42 Waist)',
        shadeCode: 'SH-883',
        barCode: '890121510103',
        readyPhysicalStock: 19,
        reservedStock: 4,
        availableStock: 15
      },
      {
        skuCode: 'LH-101-WIN-FS',
        color: 'Deep Ruby Wine',
        size: 'Free Size (Up to 42 Waist)',
        shadeCode: 'SH-884',
        barCode: '890121510104',
        readyPhysicalStock: 19,
        reservedStock: 4,
        availableStock: 15
      }
    ]
  },
  {
    id: 'd-2',
    designCode: 'LH-102',
    title: 'Pastel Organza Hand Mirror Work Lehenga',
    category: 'Lehenga',
    fabric: 'Pure Organza & Silk Crepe',
    workType: 'Real Mirror & Thread Floral Embroidery',
    currentVersion: 'V1',
    sampleStatus: 'Approved',
    estimatedCost: 2150,
    wholesalePrice: 2950,
    semiWholesalePrice: 3200,
    minimumOrderQty: 20,
    photoUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    approvalDate: '2026-09-30',
    approvedBy: 'Ankit Sharma (Design Head)',
    components: [
      { name: 'Organza Skirt 4.5m Flair', fabric: 'Digital Printed Organza', pieces: 1 },
      { name: 'Designer Blouse Fabric', fabric: 'Raw Silk', pieces: 1 },
      { name: 'Organza Cutwork Dupatta', fabric: 'Organza', pieces: 1 }
    ],
    skus: [
      {
        skuCode: 'LH-102-PNK-FS',
        color: 'Dusty Rose Pink',
        size: 'Free Size',
        shadeCode: 'SH-721',
        barCode: '890121510201',
        readyPhysicalStock: 35,
        reservedStock: 10,
        availableStock: 25
      },
      {
        skuCode: 'LH-102-BLU-FS',
        color: 'Powder Sky Blue',
        size: 'Free Size',
        shadeCode: 'SH-722',
        barCode: '890121510202',
        readyPhysicalStock: 28,
        reservedStock: 8,
        availableStock: 20
      }
    ]
  },
  {
    id: 'd-3',
    designCode: 'SR-201',
    title: 'Kanjivaram Handloom Pure Silk Saree',
    category: 'Saree',
    fabric: 'Pure Mulberry Silk with Gold Zari',
    workType: 'Woven Temple Border & Contrast Rich Pallu',
    currentVersion: 'V2',
    sampleStatus: 'Approved',
    estimatedCost: 2800,
    wholesalePrice: 3850,
    semiWholesalePrice: 4200,
    minimumOrderQty: 12,
    photoUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    approvalDate: '2026-09-25',
    approvedBy: 'Yogeshbhai',
    components: [
      { name: 'Saree 5.5 Meters', fabric: 'Pure Silk', pieces: 1 },
      { name: 'Unstitched Contrast Blouse 0.8m', fabric: 'Brocade Silk', pieces: 1 }
    ],
    skus: [
      {
        skuCode: 'SR-201-RED-ALL',
        color: 'Crimson Red with Antique Gold Zari',
        size: '6.3 Meters with Blouse',
        shadeCode: 'SH-501',
        barCode: '890121520101',
        readyPhysicalStock: 42,
        reservedStock: 12,
        availableStock: 30
      },
      {
        skuCode: 'SR-201-PRP-ALL',
        color: 'Imperial Purple with Silver Zari',
        size: '6.3 Meters with Blouse',
        shadeCode: 'SH-502',
        barCode: '890121520102',
        readyPhysicalStock: 38,
        reservedStock: 8,
        availableStock: 30
      }
    ]
  },
  {
    id: 'd-4',
    designCode: 'SR-202',
    title: 'Banarasi Handloom Katan Zari Saree',
    category: 'Saree',
    fabric: 'Katan Silk & Antique Gold Zari',
    workType: 'Kadhwa Weaving & Meenakari Border',
    currentVersion: 'V1',
    sampleStatus: 'In Review',
    estimatedCost: 1650,
    wholesalePrice: 2350,
    semiWholesalePrice: 2550,
    minimumOrderQty: 24,
    photoUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    components: [
      { name: 'Saree with Rich Pallu', fabric: 'Katan Silk', pieces: 1 },
      { name: 'Running Blouse Piece', fabric: 'Katan Silk', pieces: 1 }
    ],
    skus: [
      {
        skuCode: 'SR-202-YLW-ALL',
        color: 'Haldi Ochre Yellow & Magenta Border',
        size: '6.3 Meters with Blouse',
        shadeCode: 'SH-310',
        barCode: '890121520201',
        readyPhysicalStock: 25,
        reservedStock: 5,
        availableStock: 20
      }
    ]
  }
];

export const initialKhatas: KhataParty[] = [
  {
    id: 'k-1',
    name: 'Arihant Fabrics & Weaving Mills',
    khataType: 'Supplier',
    city: 'Surat Central Industrial Area, Gujarat',
    phone: '+91 98251 44521',
    gstin: '24AAACA1234A1Z5',
    capacityPerMonth: 8000,
    leadTimeDays: 7,
    outstandingBalance: 145000,
    qualityRating: 4.8
  },
  {
    id: 'k-2',
    name: 'Balaji Multihead Computer Embroidery Works',
    khataType: 'Embroidery Unit',
    city: 'Varachha Road, Surat',
    phone: '+91 98982 77140',
    capacityPerMonth: 3500,
    leadTimeDays: 10,
    outstandingBalance: 62000,
    qualityRating: 4.9
  },
  {
    id: 'k-3',
    name: 'Jay Ambe Master Handwork & Zardozi Unit',
    khataType: 'Handwork Artisan',
    city: 'Navsari Craft Hub, Gujarat',
    phone: '+91 94263 11890',
    capacityPerMonth: 1200,
    leadTimeDays: 14,
    outstandingBalance: 48000,
    qualityRating: 4.7
  },
  {
    id: 'k-4',
    name: 'Radhe Krishna Kali Stitching & Finishing Unit',
    khataType: 'Stitching Unit',
    city: 'Ring Road Textile Market, Surat',
    phone: '+91 98795 33412',
    capacityPerMonth: 2500,
    leadTimeDays: 5,
    outstandingBalance: 24000,
    qualityRating: 4.6
  },
  {
    id: 'k-5',
    name: 'Shreemati Bridal Sarees Ltd.',
    khataType: 'Customer',
    city: 'Zaveri Bazaar, Mumbai, Maharashtra',
    phone: '+91 98200 99881',
    gstin: '27AABCS9876C1Z9',
    leadTimeDays: 3,
    outstandingBalance: 30000,
    creditLimit: 1000000,
    creditDays: 30,
    unpaidInvoicesTotal: 30000,
    activeCommitmentsTotal: 36000,
    qualityRating: 5.0
  },
  {
    id: 'k-6',
    name: 'Royal Heritage Luxury Boutique',
    khataType: 'Customer',
    city: 'Chandni Chowk, Old Delhi',
    phone: '+91 98111 23456',
    gstin: '07AACCR5432D1Z3',
    leadTimeDays: 4,
    outstandingBalance: 95000,
    creditLimit: 800000,
    creditDays: 45,
    unpaidInvoicesTotal: 95000,
    activeCommitmentsTotal: 120000,
    qualityRating: 4.9
  },
  {
    id: 'k-7',
    name: 'Dulhan Haute Couture Emporium',
    khataType: 'Customer',
    city: 'Dharmendra Road, Rajkot, Gujarat',
    phone: '+91 98242 66789',
    gstin: '24AACCD4321E1Z1',
    leadTimeDays: 2,
    outstandingBalance: 42000,
    creditLimit: 500000,
    creditDays: 30,
    unpaidInvoicesTotal: 42000,
    activeCommitmentsTotal: 0,
    qualityRating: 4.8
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2026-1001',
    khataId: 'k-1',
    khataName: 'Arihant Fabrics & Weaving Mills',
    orderType: 'Finished Goods',
    orderDate: '2026-09-20',
    deliveryDueDate: '2026-09-27',
    advancePaid: 50000,
    status: 'Completed',
    paymentTerms: '30 Days Net from GRN approval',
    totalAmount: 180000,
    items: [
      {
        designCode: 'LH-101',
        version: 'V2',
        skuCode: 'LH-101-MAR-FS',
        color: 'Bridal Crimson Maroon',
        orderedQty: 25,
        receivedQty: 25,
        ratePerSet: 1800,
        tolerancePercent: 5
      },
      {
        designCode: 'LH-101',
        version: 'V2',
        skuCode: 'LH-101-EME-FS',
        color: 'Royal Emerald Green',
        orderedQty: 25,
        receivedQty: 25,
        ratePerSet: 1800,
        tolerancePercent: 5
      },
      {
        designCode: 'LH-101',
        version: 'V2',
        skuCode: 'LH-101-NAV-FS',
        color: 'Imperial Navy Blue',
        orderedQty: 25,
        receivedQty: 25,
        ratePerSet: 1800,
        tolerancePercent: 5
      },
      {
        designCode: 'LH-101',
        version: 'V2',
        skuCode: 'LH-101-WIN-FS',
        color: 'Deep Ruby Wine',
        orderedQty: 25,
        receivedQty: 25,
        ratePerSet: 1800,
        tolerancePercent: 5
      }
    ]
  },
  {
    id: 'po-2',
    poNumber: 'PO-2026-1002',
    khataId: 'k-2',
    khataName: 'Balaji Multihead Computer Embroidery Works',
    orderType: 'Raw Material / Jobwork',
    orderDate: '2026-09-25',
    deliveryDueDate: '2026-10-06',
    advancePaid: 20000,
    status: 'In Production',
    paymentTerms: 'Payment on stage completion',
    totalAmount: 110000,
    items: [
      {
        designCode: 'LH-102',
        version: 'V1',
        skuCode: 'LH-102-PNK-FS',
        color: 'Dusty Rose Pink',
        orderedQty: 50,
        receivedQty: 0,
        ratePerSet: 2200,
        tolerancePercent: 5
      }
    ]
  }
];

export const initialJobOrders: JobOrder[] = [
  {
    id: 'jo-1',
    jobOrderNumber: 'JO-2026-8801',
    parentPoNumber: 'PO-2026-1001',
    designCode: 'LH-101',
    version: 'V2',
    issuedMaterial: 'Pure Micro Velvet 9000 (280 Meters)',
    totalSets: 100,
    challanNumber: 'CH-CGST-45-0922',
    challanDate: '2026-09-21',
    status: 'Completed',
    totalJobCharges: 68000,
    stages: [
      {
        stageName: 'Material Ready',
        assignedKhataId: 'k-1',
        assignedKhataName: 'Arihant Fabrics (Surat)',
        inputQty: 100,
        goodOutputQty: 100,
        pendingQty: 0,
        reworkQty: 0,
        wastageQty: 0,
        status: 'Completed',
        startDate: '2026-09-21',
        completedDate: '2026-09-22',
        ratePerUnit: 0,
        remarks: 'Inspected raw grey velvet rolls 280 meters'
      },
      {
        stageName: 'Embroidery',
        assignedKhataId: 'k-2',
        assignedKhataName: 'Balaji Embroidery (Varachha)',
        inputQty: 100,
        goodOutputQty: 100,
        pendingQty: 0,
        reworkQty: 0,
        wastageQty: 0,
        status: 'Completed',
        startDate: '2026-09-22',
        completedDate: '2026-09-25',
        ratePerUnit: 350,
        remarks: 'Multihead Zari embroidery completed with zero defects'
      },
      {
        stageName: 'Handwork',
        assignedKhataId: 'k-3',
        assignedKhataName: 'Jay Ambe Handwork (Navsari)',
        inputQty: 100,
        goodOutputQty: 100,
        pendingQty: 0,
        reworkQty: 0,
        wastageQty: 0,
        status: 'Completed',
        startDate: '2026-09-25',
        completedDate: '2026-09-27',
        ratePerUnit: 200,
        remarks: 'Artisan hand zardozi and stone setting passed'
      },
      {
        stageName: 'Stitching',
        assignedKhataId: 'k-4',
        assignedKhataName: 'Radhe Krishna Stitching (Ring Road)',
        inputQty: 100,
        goodOutputQty: 100,
        pendingQty: 0,
        reworkQty: 0,
        wastageQty: 0,
        status: 'Completed',
        startDate: '2026-09-27',
        completedDate: '2026-09-28',
        ratePerUnit: 130,
        remarks: 'Can-can lining insertion and final skirt stitching'
      }
    ]
  },
  {
    id: 'jo-2',
    jobOrderNumber: 'JO-2026-8802',
    parentPoNumber: 'PO-2026-1002',
    designCode: 'LH-102',
    version: 'V1',
    issuedMaterial: 'Digital Printed Organza 150m + Raw Silk 50m',
    totalSets: 50,
    challanNumber: 'CH-CGST-45-0929',
    challanDate: '2026-09-28',
    status: 'Stage WIP',
    totalJobCharges: 32500,
    stages: [
      {
        stageName: 'Material Ready',
        assignedKhataId: 'k-1',
        assignedKhataName: 'Arihant Fabrics',
        inputQty: 50,
        goodOutputQty: 50,
        pendingQty: 0,
        reworkQty: 0,
        wastageQty: 0,
        status: 'Completed',
        startDate: '2026-09-28',
        completedDate: '2026-09-29',
        ratePerUnit: 0
      },
      {
        stageName: 'Embroidery',
        assignedKhataId: 'k-2',
        assignedKhataName: 'Balaji Embroidery',
        inputQty: 50,
        goodOutputQty: 32,
        pendingQty: 18,
        reworkQty: 0,
        wastageQty: 0,
        status: 'In Progress',
        startDate: '2026-09-29',
        ratePerUnit: 400,
        remarks: '32 sets embroidery completed, 18 currently on machines'
      }
    ]
  }
];

export const initialQCRecords: QCInspectionRecord[] = [
  {
    id: 'qc-1',
    grnNumber: 'GRN-2026-081',
    referencePoOrJob: 'PO-2026-1001 (LH-101)',
    designCode: 'LH-101',
    lotNumber: 'LOT-LH101-SEP28',
    totalReceived: 100,
    acceptedQty: 100,
    holdQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    inspectorName: 'Bhavin Patel (Chief Quality Inspector)',
    date: '2026-09-28',
    shadeConsistency: 'Perfect',
    embroideryDefects: 0,
    stainIssues: false,
    lehengaComponentsComplete: true,
    status: 'Accepted',
    notes: 'All 100 sets approved for warehouse saleable stock. Verified landed cost ₹1,800/set.'
  },
  {
    id: 'qc-2',
    grnNumber: 'GRN-2026-082',
    referencePoOrJob: 'JO-2026-8790 (SR-202)',
    designCode: 'SR-202',
    lotNumber: 'LOT-SR202-SEP30',
    totalReceived: 100,
    acceptedQty: 90,
    holdQty: 0,
    reworkQty: 5,
    rejectedQty: 5,
    inspectorName: 'Bhavin Patel',
    date: '2026-09-30',
    shadeConsistency: 'Slight Variance',
    embroideryDefects: 5,
    stainIssues: false,
    lehengaComponentsComplete: true,
    status: 'Hold',
    notes: '90 sets accepted into ready stock. 5 sent back for border rework. 5 rejected due to weft tear (Debit note initiated).'
  }
];

export const initialPhysicalSamples: PhysicalSampleRecord[] = [
  {
    id: 'smp-1',
    designCode: 'LH-101',
    skuCode: 'LH-101-MAR-FS',
    quantity: 1,
    recipientParty: 'Deepak Agency (Surat Textile Agent)',
    recipientType: 'Agent',
    dispatchDate: '2026-09-29',
    returnDueDate: '2026-10-06',
    depositAmount: 2500,
    courierLR: 'HAND-DELIVERY-01',
    status: 'With Recipient'
  },
  {
    id: 'smp-2',
    designCode: 'LH-101',
    skuCode: 'LH-101-EME-FS',
    quantity: 1,
    recipientParty: 'Meera Creation (Ahmedabad Boutique)',
    recipientType: 'Customer',
    dispatchDate: '2026-09-29',
    returnDueDate: '2026-10-05',
    depositAmount: 2500,
    courierLR: 'SHREE-MARUTI-4421',
    status: 'With Recipient'
  }
];

export const initialSalesOrders: SalesOrder[] = [
  {
    id: 'so-1',
    orderNumber: 'SO-2026-5501',
    customerId: 'k-5',
    customerName: 'Shreemati Bridal Sarees Ltd. (Mumbai)',
    customerCity: 'Mumbai',
    orderDate: '2026-09-29',
    orderType: 'Ready Stock',
    status: 'Partially Dispatched',
    advanceReceived: 30000,
    creditOverride: false,
    totalAmount: 96000,
    notes: 'Section 22 Walkthrough Order: 40 sets of LH-101 @ ₹2,400. 25 dispatched, 15 pending.',
    items: [
      {
        skuCode: 'LH-101-MAR-FS',
        color: 'Bridal Crimson Maroon',
        quantity: 10,
        unitPrice: 2400,
        allocatedQty: 10,
        dispatchedQty: 7,
        gstRate: 5
      },
      {
        skuCode: 'LH-101-EME-FS',
        color: 'Royal Emerald Green',
        quantity: 10,
        unitPrice: 2400,
        allocatedQty: 10,
        dispatchedQty: 6,
        gstRate: 5
      },
      {
        skuCode: 'LH-101-NAV-FS',
        color: 'Imperial Navy Blue',
        quantity: 10,
        unitPrice: 2400,
        allocatedQty: 10,
        dispatchedQty: 6,
        gstRate: 5
      },
      {
        skuCode: 'LH-101-WIN-FS',
        color: 'Deep Ruby Wine',
        quantity: 10,
        unitPrice: 2400,
        allocatedQty: 10,
        dispatchedQty: 6,
        gstRate: 5
      }
    ]
  },
  {
    id: 'so-2',
    orderNumber: 'SO-2026-5502',
    customerId: 'k-6',
    customerName: 'Royal Heritage Luxury Boutique (Delhi)',
    customerCity: 'Delhi',
    orderDate: '2026-10-01',
    orderType: 'Ready Stock',
    status: 'Confirmed',
    advanceReceived: 50000,
    creditOverride: false,
    totalAmount: 77000,
    items: [
      {
        skuCode: 'SR-201-RED-ALL',
        color: 'Crimson Red with Antique Gold Zari',
        quantity: 20,
        unitPrice: 3850,
        allocatedQty: 20,
        dispatchedQty: 0,
        gstRate: 5
      }
    ]
  }
];

export const initialDispatches: DispatchPacking[] = [
  {
    id: 'dsp-1',
    dispatchNumber: 'DSP-2026-301',
    salesOrderId: 'so-1',
    orderNumber: 'SO-2026-5501',
    customerName: 'Shreemati Bridal Sarees Ltd. (Mumbai)',
    shippingAddress: 'Shop 14, 2nd Floor, Zaveri Bazaar Saree Arcade, Mumbai - 400002',
    cartonCount: 2,
    cartonDetails: [
      {
        cartonId: 'BALE-SURAT-891',
        skuSummary: 'LH-101 Maroon (7 sets), Emerald (6 sets)',
        piecesCount: 13,
        weightKg: 28.5,
        sealNumber: 'SEAL-2026-881'
      },
      {
        cartonId: 'BALE-SURAT-892',
        skuSummary: 'LH-101 Navy (6 sets), Wine (6 sets)',
        piecesCount: 12,
        weightKg: 26.2,
        sealNumber: 'SEAL-2026-882'
      }
    ],
    transporterName: 'VRL Logistics (Surat - Mumbai Super Express)',
    lrNumber: 'VRL-SUR-994201',
    dispatchDate: '2026-09-30',
    expectedDelivery: '2026-10-02',
    freightType: 'To-Pay',
    deliveryStatus: 'In-Transit',
    dispatchedItems: [
      { skuCode: 'LH-101-MAR-FS', qty: 7 },
      { skuCode: 'LH-101-EME-FS', qty: 6 },
      { skuCode: 'LH-101-NAV-FS', qty: 6 },
      { skuCode: 'LH-101-WIN-FS', qty: 6 }
    ]
  }
];

export const initialInvoices: TaxInvoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-4401',
    salesOrderId: 'so-1',
    orderNumber: 'SO-2026-5501',
    customerId: 'k-5',
    customerName: 'Shreemati Bridal Sarees Ltd. (Mumbai)',
    gstin: '27AABCS9876C1Z9',
    invoiceDate: '2026-09-30',
    dueDate: '2026-10-30',
    subtotal: 60000,
    gstTotal: 3000,
    grandTotal: 63000,
    cogsAmount: 45000,
    grossProfit: 15000,
    grossMarginPercent: 25.0,
    allocatedAdvance: 30000,
    balanceDue: 33000,
    irnNumber: '7a8f9c1b2d3e4f509a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6',
    eWayBillNumber: '241088921045',
    status: 'Partially Paid'
  }
];

export const initialPayments: PaymentReceipt[] = [
  {
    id: 'pay-1',
    receiptNumber: 'REC-2026-101',
    customerId: 'k-5',
    customerName: 'Shreemati Bridal Sarees Ltd. (Mumbai)',
    amount: 30000,
    receiptDate: '2026-09-28',
    paymentMode: 'Bank NEFT/RTGS',
    bankRef: 'HDFCN26271982441',
    allocatedToInvoices: [
      {
        invoiceNumber: 'INV-2026-4401',
        amount: 30000
      }
    ],
    unallocatedAdvance: 0,
    verified: true
  }
];

export const initialWhatsAppMessages: WhatsAppMessageItem[] = [
  {
    id: 'wa-1',
    sender: 'customer',
    partyName: 'Shreemati Bridal Sarees Ltd. (Mumbai)',
    phoneNumber: '+91 98200 99881',
    timestamp: 'Today at 12:15 PM',
    messageText: 'Hello Yogeshbhai, saw the new bridal catalog. LH-101 is outstanding. Please book another 30 sets (15 Maroon and 15 Emerald). Confirming the wholesale rate of ₹2,400.',
    isWithin24HrWindow: true,
    extractedOrderDraft: {
      designCode: 'LH-101',
      totalSets: 30,
      suggestedRate: 2400,
      quantities: [
        { color: 'Bridal Crimson Maroon', qty: 15 },
        { color: 'Royal Emerald Green', qty: 15 }
      ]
    }
  },
  {
    id: 'wa-2',
    sender: 'customer',
    partyName: 'Royal Heritage Luxury Boutique (Delhi)',
    phoneNumber: '+91 98111 23456',
    timestamp: 'Yesterday at 05:40 PM',
    messageText: 'Please share the dispatch date and transporter LR details for our 20 pieces Kanjivaram silk order (SR-201).',
    isWithin24HrWindow: true
  },
  {
    id: 'wa-3',
    sender: 'system',
    partyName: 'TextileFlow Automated Gate',
    phoneNumber: 'SYSTEM',
    timestamp: '02 Oct 2026',
    messageText: 'Official Template Sent: Dispatch Notification for DSP-2026-301 via VRL Logistics (LR: VRL-SUR-994201).',
    isWithin24HrWindow: true
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-28 10:30 AM',
    userRole: 'owner_admin',
    userName: 'Yogeshbhai (Admin)',
    action: 'Approved Sample Version',
    entityType: 'DesignItem',
    entityId: 'LH-101',
    details: 'Sample V2 approved with Landed Cost ₹1,800, Wholesale Tier 1 Price ₹2,400.'
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-28 04:15 PM',
    userRole: 'qc_store',
    userName: 'Bhavin Patel (QC)',
    action: 'QC Inspection Pass',
    entityType: 'QCInspectionRecord',
    entityId: 'GRN-2026-081',
    details: '100 sets of LH-101 verified and approved into Warehouse Saleable Stock.'
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-29 11:20 AM',
    userRole: 'sales',
    userName: 'Chirag Shah (Sales)',
    action: 'Order Creation & Atomic Stock Reservation',
    entityType: 'SalesOrder',
    entityId: 'SO-2026-5501',
    details: 'Customer Shreemati Bridal Sarees: 40 sets reserved. Physical 100, Reserved 40, Available 60.'
  },
  {
    id: 'aud-4',
    timestamp: '2026-09-30 02:40 PM',
    userRole: 'dispatch',
    userName: 'Haresh Solanki (Store)',
    action: 'Dispatch & Bales Packed',
    entityType: 'DispatchPacking',
    entityId: 'DSP-2026-301',
    details: '25 sets packed in 2 bales with tamper-evident barcode seals. Handed over to VRL Logistics.'
  },
  {
    id: 'aud-5',
    timestamp: '2026-09-30 05:00 PM',
    userRole: 'accounts',
    userName: 'Manish Dave (Accounts)',
    action: 'Tax Invoice & Advance Allocation',
    entityType: 'TaxInvoice',
    entityId: 'INV-2026-4401',
    details: 'Tax Invoice generated ₹60,000 (COGS ₹45,000, Gross Profit ₹15,000, 25% margin). ₹30,000 advance allocated.'
  }
];
