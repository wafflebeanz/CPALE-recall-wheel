import { SubjectConfig, SubjectId, TopicItem } from '../types';

export const SUBJECT_CONFIGS: SubjectConfig[] = [
  {
    id: 'FAR',
    name: 'FAR',
    fullName: 'Financial Accounting & Reporting',
    description: 'Assets, liabilities, equity, leases, revenue, MSMEs & financial statements',
    icon: '📊',
    accentColor: '#EC4899', // Pink
    lightColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
  },
  {
    id: 'AFAR',
    name: 'AFAR',
    fullName: 'Advanced Financial Accounting & Reporting',
    description: 'Partnership, business combinations, consolidation, costing & NPO/Govt',
    icon: '✨',
    accentColor: '#8B5CF6', // Purple
    lightColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
  },
  {
    id: 'RFBT',
    name: 'RFBT',
    fullName: 'Regulatory Framework for Business Transactions',
    description: 'Corporations, obligations & contracts, sales, banking laws, IP & labor',
    icon: '⚖️',
    accentColor: '#3B82F6', // Blue
    lightColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  {
    id: 'TAX',
    name: 'TAX',
    fullName: 'Taxation',
    description: 'Income tax, VAT, estate & donor taxes, remedies, EOPT & CMEPA',
    icon: '📑',
    accentColor: '#10B981', // Emerald
    lightColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  {
    id: 'MAS',
    name: 'MAS',
    fullName: 'Management Advisory Services',
    description: 'CVP analysis, standard costing, capital budgeting, economics & WACC',
    icon: '📈',
    accentColor: '#F59E0B', // Amber
    lightColor: '#FFFBEB',
    borderColor: '#FDE68A',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  {
    id: 'AUD',
    name: 'AUD',
    fullName: 'Auditing (Theory & Practice)',
    description: 'Audit risk model, internal control, audit evidence, sampling & reports',
    icon: '🔍',
    accentColor: '#14B8A6', // Teal
    lightColor: '#F0FDFA',
    borderColor: '#99F6E4',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
  },
];

export const INITIAL_TOPICS: Record<SubjectId, TopicItem[]> = {
  FAR: [
    {
      id: 'far-1',
      title: 'Cash & Cash Equivalents',
      category: 'Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'PCF Shortage/Overage = PCF count vs Imprest balance',
        'Cash equivalents: Acquired within 3 months to maturity',
        'Compensating balance: Unrestricted = Cash, Restricted = Short/Long Term',
        'Equity securities excluded except redeemable preference shares'
      ]
    },
    {
      id: 'far-2',
      title: 'Proof of Cash & Bank Reconciliation',
      category: 'Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'DIT and OC carry forward adjustments',
        'Book errors vs Bank errors impact on receipts/disbursements',
        'Unadjusted balance + DIT - OC = Adjusted bank balance'
      ]
    },
    {
      id: 'far-3',
      title: 'Accounts Receivable & Doubtful Accounts (AWERA)',
      category: 'Receivables',
      mastered: false,
      label: 'none',
      keyPoints: [
        'AWERA Method: Allowance Beg (A), Write-off (W), Expense (E), Recovery (R), Allowance End (A)',
        'Net Realizable Value = Gross AR - Allowances (discounts, returns, doubtful accounts)'
      ]
    },
    {
      id: 'far-4',
      title: 'Notes Receivable & Financing',
      category: 'Receivables',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Receivable Financing: Pledging (general), Assignment (specific receivables with notification)',
        'Factoring: Casual sale vs Continuing arrangement (factor\'s holdback)',
        'Discounting: Maturity value = P x (1 + R x T); Proceeds = Mat Val - Discount'
      ]
    },
    {
      id: 'far-5',
      title: 'Loans Receivable & ECL 3-Stage Model',
      category: 'Receivables',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Initial: PV of cash flows + Direct origination cost - Origination fees',
        'Stage 1: 12-month ECL, EIR on gross carrying amount',
        'Stage 2: Lifetime ECL, EIR on gross carrying amount',
        'Stage 3: Lifetime ECL, EIR on net amortized cost (credit-impaired)'
      ]
    },
    {
      id: 'far-6',
      title: 'Inventories & Lower of Cost and NRV (LCNRV)',
      category: 'Inventories',
      mastered: false,
      label: 'none',
      keyPoints: [
        'NRV = Estimated Selling Price - Cost of Disposal - Cost to Complete',
        'Applied item by item; loss is charged to COGS',
        'FOB Shipping Point (buyer owns in transit) vs FOB Destination (seller owns)',
        'Consignor includes out on consignment; consignee excludes held on consignment'
      ]
    },
    {
      id: 'far-7',
      title: 'Gross Profit & Retail Inventory Methods',
      category: 'Inventories',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Gross Profit Method: Sales - Est COGS = Est Ending Inventory (detects shortage/overage)',
        'Retail Method: Conservative (+Markup, no Markdown in cost ratio)',
        'Average method includes markdown in ratio; FIFO excludes beginning inventory'
      ]
    },
    {
      id: 'far-8',
      title: 'Property, Plant & Equipment (PPE)',
      category: 'Non-Current Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Initial: Purchase price + DACs + Dismantling cost at PV',
        'Exchange with commercial substance: Gain/Loss = FV given up - CA given up',
        'Demolition for land use capitalized to land; for new building depends on timing'
      ]
    },
    {
      id: 'far-9',
      title: 'Depreciation & Revaluation Model',
      category: 'Non-Current Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'SYD = n(n+1)/2; Declining balance ignores salvage value until final year',
        'Revaluation Surplus: recorded in OCI, amortized directly to Retained Earnings',
        'Leasehold Improvements depreciated over shorter of useful life or remaining lease term'
      ]
    },
    {
      id: 'far-10',
      title: 'Borrowing Costs Capitalization',
      category: 'Liabilities/Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Specific borrowing: Actual interest expense - temporary investment income',
        'General borrowing: Weighted Average Expenditures (WAE) x Capitalization rate',
        'Capitalizable cost is lower of actual borrowing costs vs computed average borrowing cost'
      ]
    },
    {
      id: 'far-11',
      title: 'Agriculture & Biological Assets (PAS 41)',
      category: 'Special Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Consumable plants/animals = Biological assets at FVLCD',
        'Bearer plants = PPE under PAS 16; produce at harvest = biological asset'
      ]
    },
    {
      id: 'far-12',
      title: 'Intangibles, Patents & R&D Costs',
      category: 'Intangibles',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Research Phase: Expensed outright; Development Phase: Capitalized if criteria met',
        'Patent: Legal life 20 years; Trademark: 10 years renewable; Copyright: Life + 50 yrs',
        'Internally generated goodwill is NEVER recognized'
      ]
    },
    {
      id: 'far-13',
      title: 'Cash Generating Units (CGU) & Impairment',
      category: 'Impairment',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Recoverable amount = Higher of Value in Use vs FVLCD',
        'Impairment allocated first 100% to Goodwill, then pro-rata to other non-cash assets'
      ]
    },
    {
      id: 'far-14',
      title: 'Segment Reporting (PFRS 8)',
      category: 'Disclosures',
      mastered: false,
      label: 'none',
      keyPoints: [
        '10% tests: Revenue test, Asset test, Profit/Loss test (higher absolute)',
        '75% Overall size test: External revenue must equal at least 75% of total'
      ]
    },
    {
      id: 'far-15',
      title: 'Events After Reporting Period & Discontinued Operations',
      category: 'Reporting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Adjusting events: existed at reporting date (bankruptcy, court settlement)',
        'Non-adjusting events: arose after reporting date (fire, business combo, FX shifts) - Disclose',
        'Discontinued operations presented net of tax below continuing operations'
      ]
    },
    {
      id: 'far-16',
      title: 'Investments in Equity Securities & Associates',
      category: 'Investments',
      mastered: false,
      label: 'none',
      keyPoints: [
        'FVPL (trading) vs FVOCI (irrevocable non-trading, OCI to RE, no recycling)',
        'Associate (20-50%): Equity method, FVINA amortization adjustments',
        'Stock dividends: memo entry only unless different class'
      ]
    },
    {
      id: 'far-17',
      title: 'Investment Property (PAS 40)',
      category: 'Investments',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Held for capital appreciation or rental; Cost model (depreciated) vs Fair Value model (no depreciation, changes in P/L)',
        'Reclassification to owner-occupied PPE uses FV at date of change'
      ]
    },
    {
      id: 'far-18',
      title: 'Investments in Debt Securities (PFRS 9)',
      category: 'Investments',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Hold to collect = Amortized cost; Hold to collect & sell = FVOCI; Other = FVPL',
        'Reclassifications occur 1st day of reporting period following business model change'
      ]
    },
    {
      id: 'far-19',
      title: 'Wasting Assets & Government Grants',
      category: 'Special Assets',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Depletion base = Cost + Exploration + Development + Restoration - Residual',
        'Maximum dividend = Unrestricted RE + Realized accumulated depletion',
        'Government grants recognized in P/L matching related expenses'
      ]
    },
    {
      id: 'far-20',
      title: 'Financial Liabilities & Bonds Payable',
      category: 'Liabilities',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Substantial modification of debt: 10% test (gain/loss recognized, extinguish old)',
        'Compound instruments: Liability component at FV, Equity component is residual'
      ]
    },
    {
      id: 'far-21',
      title: 'Income Tax Accounting (PAS 12)',
      category: 'Taxation',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Permanent differences (fines, FWT income) affect only current tax',
        'Future Taxable Amounts (FTA) create Deferred Tax Liability (DTL)',
        'Future Deductible Amounts (FDA) create Deferred Tax Asset (DTA)'
      ]
    },
    {
      id: 'far-22',
      title: 'Leases - Lessor & Lessee Accounting (PFRS 16)',
      category: 'Leases',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Lessee: Recognize Right-of-Use Asset (ROUA) & Lease Liability (PV of rentals)',
        'Exemptions: Short-term (<12 mos) and low-value assets',
        'Sale and leaseback: Proportional gain recognition on rights transferred'
      ]
    },
    {
      id: 'far-23',
      title: 'Employee Benefits (PAS 19)',
      category: 'Liabilities',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Defined Contribution: Contributed amount expensed',
        'Defined Benefit: Service Cost + Net Interest in P/L; Remeasurements in OCI',
        'Asset ceiling effect (EAC): Interest in P/L, change in ceiling in OCI'
      ]
    },
    {
      id: 'far-24',
      title: 'Shareholders\' Equity & Treasury Shares',
      category: 'Equity',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Small share dividends (<20%): Debited at FV; Large share dividends (>=20%): Par value',
        'Treasury shares recorded at cost; Reissuance gain to Share Premium - TS'
      ]
    },
    {
      id: 'far-25',
      title: 'Book Value Per Share & Earnings Per Share (EPS)',
      category: 'Equity',
      mastered: false,
      label: 'none',
      keyPoints: [
        'BEPS = (Net Income - Preference Dividends) / WACSO',
        'Diluted EPS considers convertible bonds, options (treasury stock method)',
        'BVPS allocates equity after deducting liquidation value and preference dividend arrears'
      ]
    },
    {
      id: 'far-26',
      title: 'Share-Based Payments (PFRS 2)',
      category: 'Equity',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Equity-settled: FV of options at grant date, allocated over vesting period',
        'Cash-settled (SARs): Measured at FV at each reporting date until settled'
      ]
    },
    {
      id: 'far-27',
      title: 'Accounting for MSMEs (Micro, Small, Medium)',
      category: 'Frameworks',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Micro: Assets/Liab < P3M; Small: P3M to P100M; Medium: P100M to P350M',
        'SMEs allowed single Statement of Income & Retained Earnings under specific cases',
        'SMEs expense all borrowing costs and R&D'
      ]
    }
  ],

  AFAR: [
    {
      id: 'afar-1',
      title: 'Partnership Formation & Operations',
      category: 'Partnership',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Basis of non-cash assets: Agreed value > Fair Market Value > Book Value',
        'Profits/Losses priority: Agreement > Capital ratio (losses follow profit agreement)',
        'Temporary withdrawals do not affect average capital calculation'
      ]
    },
    {
      id: 'afar-2',
      title: 'Partnership Dissolution & Admission',
      category: 'Partnership',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Admission by purchase: personal transaction between partners',
        'Admission by investment: AC = CC (no bonus); AC > CC (bonus to new); AC < CC (bonus to old)'
      ]
    },
    {
      id: 'afar-3',
      title: 'Partnership Liquidation - Safe Payments & CPP',
      category: 'Partnership',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Safe Payments Schedule: Cash withheld for future liquidation expenses and unpaid liabilities',
        'Cash Priority Program (CPP): Based on Maximum Loss Absorption Capacity (MLAC)',
        'Most vulnerable partner has the LOWEST maximum absorption capacity'
      ]
    },
    {
      id: 'afar-4',
      title: 'Corporate Liquidation - Statement of Affairs & SoRaL',
      category: 'Liquidation',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Statement of Affairs: Assets at realizable values, liabilities at settlement price',
        'Expected Recovery % = Net Free Assets / Total Unsecured Liabilities without Priority',
        'SoRaL: Reports actual liquidation results (Assets realized vs to be realized)'
      ]
    },
    {
      id: 'afar-5',
      title: 'PFRS 15 Long-Term Construction Contracts',
      category: 'Revenue',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Reliable estimates: Percentage of Completion (Cost-to-Cost method)',
        'Unreliable estimates: Zero-profit / Cost recovery method',
        'CIP > Progress Billings = Current Asset; CIP < Billings = Current Liability'
      ]
    },
    {
      id: 'afar-6',
      title: 'Franchise Accounting & 5 Steps (COPAS)',
      category: 'Revenue',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Initial Franchise Fees (IFF): Point-in-time vs Over-time (maintain brand value)',
        'Continuing Franchise Fees (CFF): Recognized as earned based on sales',
        'COPAS: Contracts with customer, Obligations, Price, Allocation, Satisfy obligation'
      ]
    },
    {
      id: 'afar-7',
      title: 'Licenses & Consignment Accounting',
      category: 'Revenue',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Licenses: Right to Access (Over Time) vs Right to Use (Point in Time)',
        'Consignment: Consignor = Principal/Owner; Consignee = Agent',
        'Remittance = Collections - Consignee charges (commission, delivery, cartage)'
      ]
    },
    {
      id: 'afar-8',
      title: 'Business Combinations - Acquisition Method',
      category: 'Business Combinations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Direct acquisition costs (DACs) expensed; Share issuance costs charged to APIC',
        'Goodwill = Consideration Transferred + NCI - Fair Value of Identifiable Net Assets (FVINA)',
        'Full Goodwill method vs Partial/Proportional Goodwill method'
      ]
    },
    {
      id: 'afar-9',
      title: 'Business Combinations - Step Acquisition & Reverse',
      category: 'Business Combinations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Previously held equity interest remeasured at fair value on acquisition date (P/L or OCI)',
        'Reverse acquisition: Private entity is accounting acquirer, public entity is legal parent'
      ]
    },
    {
      id: 'afar-10',
      title: 'Consolidated Balance Sheet at & after Acquisition',
      category: 'Consolidation',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Eliminate parent\'s investment vs subsidiary\'s equity accounts',
        'Undervaluation added to assets; subsequent amortization reduces consolidated net income'
      ]
    },
    {
      id: 'afar-11',
      title: 'Intercompany Sales of Inventories (UPEI & RPBI)',
      category: 'Consolidation',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Downstream: Parent sells to Sub (100% parent impact)',
        'Upstream: Sub sells to Parent (shared between parent & NCI)',
        'Unrealized Profit in Ending Inventory (UPEI) deducted; Realized Profit (RPBI) added'
      ]
    },
    {
      id: 'afar-12',
      title: 'Intercompany Fixed Assets & Depreciables',
      category: 'Consolidation',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Unrealized gain on equipment eliminated in year of sale',
        'Realized through piecemeal depreciation over remaining useful life'
      ]
    },
    {
      id: 'afar-13',
      title: 'Foreign Currency Transactions & Translations (PAS 21)',
      category: 'Foreign Currency',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Monetary items adjusted at closing rate; Non-monetary at historical rate',
        'Translation (Functional to Presentation): Assets/Liab at closing rate; Equity at historical; OCI',
        'Remeasurement (Temporal method): Exchange differences go directly to P/L'
      ]
    },
    {
      id: 'afar-14',
      title: 'Derivatives & Hedging Accounting',
      category: 'Foreign Currency',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Fair Value Hedge: G/L on hedged item & hedging instrument both go to P/L',
        'Cash Flow Hedge: Effective portion to OCI, Ineffective portion to P/L'
      ]
    },
    {
      id: 'afar-15',
      title: 'Home Office & Branch Accounting',
      category: 'Branch Accounting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Shipments billed above cost: Allowance for Overvaluation of Branch Inventory',
        'Reciprocal accounts: Investment in Branch (Debit) vs Home Office Current (Credit)',
        'Adjusted balances of reciprocal accounts must ALWAYS be equal'
      ]
    },
    {
      id: 'afar-16',
      title: 'Job Order Costing (Spoilage, Rework & Scrap)',
      category: 'Cost Accounting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Normal scrap/spoilage charged to specific job (WIP) or all jobs (FOH Control)',
        'Underapplied FOH = Unfavorable; Overapplied = Favorable; allocated pro-rata if significant'
      ]
    },
    {
      id: 'afar-17',
      title: 'Process Costing & Lost Units (FIFO vs WA)',
      category: 'Cost Accounting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'FIFO EUP considers work done this period only; Weighted Average blends beginning + current',
        'Normal loss at end of process absorbed only by units that passed inspection point'
      ]
    },
    {
      id: 'afar-18',
      title: 'Joint Products, By-Products & Cost Allocations',
      category: 'Cost Accounting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Allocation methods: Physical output, Sales value at split-off, NRV method',
        'By-product: Reversal method or production method (reduces joint costs)'
      ]
    },
    {
      id: 'afar-19',
      title: 'Activity-Based Costing (ABC) & Service Department Allocations',
      category: 'Cost Accounting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'ABC allocates costs via cost drivers (activities)',
        'Service department allocations: Direct method (ignores mutual services) vs Step-Down vs Reciprocal'
      ]
    },
    {
      id: 'afar-20',
      title: 'Non-Profit Organizations (NPO Accounting)',
      category: 'Government/NPO',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Net assets: Unrestricted, Temporarily Restricted (time/purpose), Permanently Restricted',
        'Expenses always decrease Unrestricted Net Assets only'
      ]
    },
    {
      id: 'afar-21',
      title: 'Government Accounting Manual (GAM & Budget)',
      category: 'Government/NPO',
      mastered: false,
      label: 'none',
      keyPoints: [
        'COA (rules), DBM (budget execution/allotment), BTr (treasury cash registry/NCA)',
        'Budget process: Preparation -> Legislation -> Execution -> Accountability',
        'Modified Disbursement System (MDS) checks; Reversion of unused NCA'
      ]
    },
    {
      id: 'afar-22',
      title: 'Installment Sales & Repossessions',
      category: 'Revenue',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Deferred Gross Profit = Installment AR x Gross Profit Rate',
        'Realized Gross Profit = Collections x Gross Profit Rate',
        'Repossessed inventory recorded at fair market value at repossession date'
      ]
    }
  ],

  RFBT: [
    {
      id: 'rfbt-1',
      title: 'Consumer Protection Act (RA 7394)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Deceptive sales acts (fraud/misrepresentation) vs Unfair sales acts (taking advantage)',
        'Home solicitation sales allowed only 9:00 AM - 7:00 PM on working days with DTI permit',
        'Pyramid sales schemes prohibited; Minimum labeling and price tag rules'
      ]
    },
    {
      id: 'rfbt-2',
      title: 'Lemon Law (RA 10462)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Applies to brand new motor vehicles purchased in PH within 12 months or 20,000 km',
        'Requires at least 4 separate repair attempts for the same complaint, then final attempt'
      ]
    },
    {
      id: 'rfbt-3',
      title: 'Data Privacy Act (RA 10173)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Principles: Transparency, Legitimate Purpose, Proportionality',
        'Sensitive personal info: race, marital status, health, SSS no., executive orders',
        'Breach notification to NPC within 72 hours; At least 100 data subjects = no delay'
      ]
    },
    {
      id: 'rfbt-4',
      title: 'Electronic Commerce Act (RA 8792)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Electronic Data Message (EDM) and electronic documents have legal effect and admissibility',
        'Time & place of dispatch/receipt principles'
      ]
    },
    {
      id: 'rfbt-5',
      title: 'Ease of Doing Business Act (RA 11032)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Anti-Red Tape Authority (ARTA); Citizen\'s Charter required',
        'Processing times: Simple (3 days), Complex (7 days), Highly technical (20 working days)',
        'Automatic approval if complete documents and failure to act within timeframe'
      ]
    },
    {
      id: 'rfbt-6',
      title: 'Philippine Competition Act (RA 10667)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Anti-competitive agreements prohibited per se: price fixing, bid rigging, market sharing',
        'Abuse of dominant position (at least 50% market share)',
        'Compulsory merger notification threshold (> P1 Billion); 30-day review period'
      ]
    },
    {
      id: 'rfbt-7',
      title: 'Government Procurement Reform Act (RA 9184)',
      category: 'Special Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Approved Budget for Contract (ABC); Lowest Calculated Responsive Bid (LCRB)',
        'Alternative methods: Direct Contracting, Repeat Order, Shopping, Negotiated Procurement'
      ]
    },
    {
      id: 'rfbt-8',
      title: 'Labor Law (RA 6715 & PD 442)',
      category: 'Labor',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Normal work hours: 8 hours max; Meal period at least 1 hour (unpaid)',
        'Overtime premium: 25% regular, 30% holiday; Night differential 10% (10PM - 6AM)',
        '13th month pay: 1/12 basic salary, paid not later than Dec 24; SIL 5 days'
      ]
    },
    {
      id: 'rfbt-9',
      title: 'Social Security Law (RA 11199)',
      category: 'Labor',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Compulsory coverage: all employees <=60 yrs, employers, self-employed, OFWs',
        'Retirement pension: at least 120 monthly contributions (60 y/o separated, 65 y/o employed)',
        'Maternity leave 105 days (+15 days solo parents)'
      ]
    },
    {
      id: 'rfbt-10',
      title: 'FRIA - Financial Rehabilitation (RA 10142)',
      category: 'Insolvency',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Suspension of payments: technically insolvent individuals with sufficient assets but illiquid',
        'Court rehabilitation: Stay Order within 5 days suspends all claims against debtor',
        'Cram-down effect: approved rehabilitation plan is binding on all creditors'
      ]
    },
    {
      id: 'rfbt-11',
      title: 'FRIA - Liquidation & Acts of Insolvency',
      category: 'Insolvency',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Voluntary vs Involuntary liquidation; Minimum claim of at least P500,000',
        'Acts of insolvency: absconding, hiding assets, fraudulent conveyance, defaulting 30 days'
      ]
    },
    {
      id: 'rfbt-12',
      title: 'Intellectual Property Code (RA 8293)',
      category: 'IP Law',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Patent: Novelty, inventive step, industrial applicability; 20-year term from filing',
        'Trademark: Distinctive visible sign; 10 years renewable; Declaration of Actual Use (DAU)',
        'Copyright: Created upon creation; Lifetime + 50 years; Fair use doctrine'
      ]
    },
    {
      id: 'rfbt-13',
      title: 'Law on Insurance (RA 10607)',
      category: 'Insurance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Insurable interest: Life (at inception); Property (at inception and at time of loss)',
        'Contract of adhesion; Aleatory; Right of subrogation automatically enures to insurer'
      ]
    },
    {
      id: 'rfbt-14',
      title: 'Anti-Money Laundering Act (AMLA RA 9160)',
      category: 'Banking',
      mastered: false,
      label: 'none',
      keyPoints: [
        '3 Stages: Placement (highest risk), Layering (untraceable), Integration (clean)',
        'Covered transactions: > P500,000 for banks; Suspicious transactions: report next working day',
        'AMLC composition: BSP Governor (Chairman), IC Commissioner, SEC Chairperson'
      ]
    },
    {
      id: 'rfbt-15',
      title: 'Bank Secrecy Law (RA 1405)',
      category: 'Banking',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Absolute confidentiality of deposits; Exceptions (WIObmu CARO TEA)',
        'Written consent, Impeachment, Order of court, AMLA, BIR estate inquiry, PCGG, Ombudsman'
      ]
    },
    {
      id: 'rfbt-16',
      title: 'Truth in Lending & PDIC Act',
      category: 'Banking',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Truth in Lending (RA 3765): clear disclosure of finance charges, EIR/SIR',
        'PDIC (RA 3591): Maximum deposit insurance coverage up to P1,000,000 per depositor per bank'
      ]
    },
    {
      id: 'rfbt-17',
      title: 'Bouncing Checks Law (BP 22) vs Estafa',
      category: 'Commercial Law',
      mastered: false,
      label: 'none',
      keyPoints: [
        'BP 22: Mala prohibita; 90 days maintaining balance; 5 banking days notice of dishonor',
        'Estafa: Mala in se; requires deceit and damage'
      ]
    },
    {
      id: 'rfbt-18',
      title: 'Revised Corporation Code (RA 11232)',
      category: 'Corporations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Perpetual existence; Natural and juridical incorporators allowed; Repealed 25%-25% rule',
        'One Person Corporation (OPC); Powers: Express, Implied, Inherent'
      ]
    },
    {
      id: 'rfbt-19',
      title: 'Board of Directors, Officers & Voting',
      category: 'Corporations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Vacancies: REI (Removal, Expiration, Increase in seats) filled by Stockholders only',
        'Other vacancies filled by remaining BOD if quorum exists (ReDAD: Resign, Death, Abandon)',
        '2/3 Stockholders vote required for amendment of AoI, merger, sale of all assets'
      ]
    },
    {
      id: 'rfbt-20',
      title: 'Shares of Stock, Delinquency & Appraisal Rights',
      category: 'Corporations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Pre-emptive right allows maintaining equity %; Appraisal right to withdraw upon dissent',
        'Delinquent shares: lost right to vote; sold at public auction to highest bidder'
      ]
    },
    {
      id: 'rfbt-21',
      title: 'Philippine Cooperative Code (RA 9520)',
      category: 'Cooperatives',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Minimum 15 natural persons; 1 member 1 vote; Net surplus distribution (Reserve fund >=50%)'
      ]
    },
    {
      id: 'rfbt-22',
      title: 'Law on Partnerships (Civil Code)',
      category: 'Partnerships',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Universal vs Particular; Industrial partner cannot engage in other business without consent',
        'Dissolution: Extrajudicial vs Judicial causes; Limited partner cannot be industrial partner'
      ]
    },
    {
      id: 'rfbt-23',
      title: 'Obligations & Extinguishment (Civil Code)',
      category: 'Obligations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Sources: Law, Contracts, Quasi-contracts (Negotiorum Gestio, Solutio Indebiti), Delicts, Quasi-delicts',
        'Extinguishment: Payment, Loss, Condonation, Confusion, Compensation, Novation'
      ]
    },
    {
      id: 'rfbt-24',
      title: 'Contracts & Defective Contracts',
      category: 'Contracts',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Essential elements: Consent, Object, Cause (Cognition Theory)',
        'Hierarchy: Rescissible (lesion) -> Voidable (consent vitiated) -> Unenforceable (SoF) -> Void (inexistent)'
      ]
    },
    {
      id: 'rfbt-25',
      title: 'Law on Sales (Recto & Maceda Laws)',
      category: 'Sales',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Recto Law: Personal property in installment (Exact fulfillment, cancel, foreclose chattel mortgage)',
        'Maceda Law: Residential property installments (Cash surrender value >=50% after 2 yrs)'
      ]
    },
    {
      id: 'rfbt-26',
      title: 'Credit Transactions (Pledge vs Mortgages)',
      category: 'Credit',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Pledge: Personal property, delivery required, extrajudicial sale, no deficiency recovery',
        'Real Estate Mortgage: Real property, registered in RD, deficiency recoverable',
        'Chattel Mortgage: Personal property, Affidavit of Good Faith registered in RD'
      ]
    }
  ],

  TAX: [
    {
      id: 'tax-1',
      title: 'Senior Citizens & PWD Benefits',
      category: 'Preferential Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        '20% Discount + VAT Exemption on medicines, professional fees, restaurants, hotels',
        '5% utility discount on water (<30 cu.m) and electricity (<100 kWh)',
        'Establishment gets 15% (SC) or 25% (PWD) deduction for salaries paid'
      ]
    },
    {
      id: 'tax-2',
      title: 'BOI Registered Enterprises & CREATE Act',
      category: 'Incentives',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Special Corporate Income Tax (SCIT): 5% in lieu of all taxes (3% National, 2% LGU)',
        'Income Tax Holiday (ITH) 4-7 years based on SIPP Tiers, followed by SCIT or Enhanced Deductions',
        'BMBE Law: Assets <= P3M exempt from income tax'
      ]
    },
    {
      id: 'tax-3',
      title: 'Remedies of the Taxpayer (Protest & Appeal)',
      category: 'Remedies',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Notice of Discrepancy (30 days) -> PAN (15 days to reply) -> FAN/FLD (30 days to protest)',
        'Protest: Reconsideration or Reinvestigation (60 days to submit documents)',
        'CIR has 180 days to decide; Appeal to CTA within 30 days from denial'
      ]
    },
    {
      id: 'tax-4',
      title: 'Remedies of the Government (Assessment & Collection)',
      category: 'Remedies',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Ordinary assessment period: 3 years from last day or actual filing (whichever is later)',
        'False/fraudulent return: 10 years from discovery; Collection within 5 years after FAN'
      ]
    },
    {
      id: 'tax-5',
      title: 'Civil Penalties & Compromise of Taxes',
      category: 'Penalties',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Surcharge: 25% for simple delay/wrong venue; 50% for willful neglect or fraudulent return',
        'Compromise: Financial Incapacity (min 10% basic tax), Doubtful Validity (min 40% basic tax)'
      ]
    },
    {
      id: 'tax-6',
      title: 'Excise Tax (Automobiles, Sweetened Drinks & Fuel)',
      category: 'Excise Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Exempt automobiles: pure electric vehicles, jeepneys, buses, trucks',
        'Sweetened beverages subject to excise; exempt: 100% natural fruit juice, milk products, coffee',
        'Alcohol, tobacco, minerals, cosmetic invasive surgery (5%)'
      ]
    },
    {
      id: 'tax-7',
      title: 'Documentary Stamp Tax (DST)',
      category: 'DST',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Original issuance of shares: P2 per P200 par value',
        'Sales of shares: P1.5 per P200; Bank checks: P3 per check; Real property sale: P15 per P1,000'
      ]
    },
    {
      id: 'tax-8',
      title: 'Value-Added Tax (VAT) Mechanics & Registration',
      category: 'VAT',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Threshold: Gross sales exceed P3,000,000 in a 12-month period; Rate: 12%',
        'Transactions deemed sale: consignments unsold >60 days, retirement inventories, distributions'
      ]
    },
    {
      id: 'tax-9',
      title: 'Zero-Rated Sales & Cross-Border Doctrine',
      category: 'VAT',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Direct export of goods/services: 0% VAT; Cross-border doctrine: taxed where consumed',
        'Effectively zero-rated: sales to PEZA/Freeport zones'
      ]
    },
    {
      id: 'tax-10',
      title: 'VAT Exemptions & Presumptive Input VAT',
      category: 'VAT',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Exempt: Agricultural & marine food in original state (CCROP MO); Residential rent <= P15,000/mo',
        'Presumptive Input VAT: 4% on primary agricultural inputs for sardines, mackerel, milk, sugar, cooking oil'
      ]
    },
    {
      id: 'tax-11',
      title: 'Estate Tax - Gross Estate & Inclusions',
      category: 'Transfer Taxes',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Rate: 6% flat rate on Net Taxable Estate; Inclusions: Revocable transfers, transfers in contemplation of death',
        'Valuation: Real property higher of Zonal vs Assessed value; Unlisted common shares at book value'
      ]
    },
    {
      id: 'tax-12',
      title: 'Estate Tax - Deductions & Filing',
      category: 'Transfer Taxes',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Standard deduction: P5,000,000 (Resident/Citizen); Family home: Max P10,000,000',
        'Vanishing deduction (Property previously taxed within 5 years)',
        'Filing: BIR Form 1801 within 1 year from death'
      ]
    },
    {
      id: 'tax-13',
      title: 'Donor\'s Tax & Valuation',
      category: 'Transfer Taxes',
      mastered: false,
      label: 'none',
      keyPoints: [
        '6% tax on gifts in excess of P250,000 exempt threshold per calendar year',
        'Form: BIR Form 1800 filed within 30 days from date of donation'
      ]
    },
    {
      id: 'tax-14',
      title: 'Dealings in Properties & Capital Gains Tax (CGT)',
      category: 'Income Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Unlisted shares: 15% CGT; Real property capital asset: 6% of higher GSP vs FMV',
        'Principal residence exemption: 18 months reinvestment, once every 10 years',
        'Holding period for individuals: <= 12 mos = 100%, > 12 mos = 50%'
      ]
    },
    {
      id: 'tax-15',
      title: 'Individual Income Taxation (Graduated vs 8%)',
      category: 'Income Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Resident citizens taxed on worldwide income; Non-residents taxed on PH income only',
        '8% optional flat tax on gross sales in excess of P250,000 for pure self-employed'
      ]
    },
    {
      id: 'tax-16',
      title: 'Fringe Benefits Tax (FBT) & De Minimis',
      category: 'Income Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Imposed on managerial/supervisory employees: Grossed-up monetary value x 35%',
        'Rank-and-file employees exempt from FBT; De minimis benefits within ceilings exempt'
      ]
    },
    {
      id: 'tax-17',
      title: 'Corporate Income Tax & General Principles',
      category: 'Income Tax',
      mastered: false,
      label: 'none',
      keyPoints: [
        'RCIT: 25% (or 20% for micro/small corporations); MCIT: 2% of gross income',
        'Lifeblood theory; Inherent limitations (public purpose, territoriality, comity)'
      ]
    },
    {
      id: 'tax-18',
      title: 'Real Property Tax (RPT) & Local Taxes',
      category: 'Local Taxes',
      mastered: false,
      label: 'none',
      keyPoints: [
        'RPT = Assessed Value x Tax Rate (1% Province, 2% City) + Special Education Fund (1%)',
        'Community Tax (Cedula): P5 basic + P1 per P1,000 income for individuals'
      ]
    },
    {
      id: 'tax-19',
      title: 'Ease of Paying Taxes Act (EOPT 2024)',
      category: 'Recent Tax Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'File and pay anywhere; Annual P500 registration fee removed',
        'Accrual basis and single INVOICE requirement for goods and services',
        'Taxpayer classifications: Micro (<P3M), Small (P3M-P20M), Medium (P20M-P1B), Large (>=P1B)'
      ]
    },
    {
      id: 'tax-20',
      title: 'Capital Markets Efficiency Promotion Act (CMEPA 2025)',
      category: 'Recent Tax Laws',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Stock transaction tax (STT) reduced to 0.1% for domestic and foreign stock exchanges',
        'Uniform 20% final tax on interest income; PERA employer contribution 150% deduction'
      ]
    }
  ],

  MAS: [
    {
      id: 'mas-1',
      title: 'Basic Concepts & Management Functions',
      category: 'Foundations',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Financial (Reliability/Historical) vs Management Accounting (Relevance/Future)',
        'Functions: Planning, Organizing, Controlling; Line authority vs Staff authority'
      ]
    },
    {
      id: 'mas-2',
      title: 'Cost Behavior & Estimation Methods',
      category: 'Cost Behavior',
      mastered: false,
      label: 'none',
      keyPoints: [
        'High-Low method: Variable cost per unit = Difference in Cost / Difference in Activity',
        'Least-squares regression: line of best fit; Correlation coefficient r (-1 to +1)'
      ]
    },
    {
      id: 'mas-3',
      title: 'Cost-Volume-Profit (CVP) Analysis',
      category: 'CVP',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Break-Even Point (Units) = Fixed Costs / Unit Contribution Margin',
        'Margin of Safety = Total Sales - Break-Even Sales = Profit / CM Ratio',
        'Multi-product sales mix uses Weighted Average Contribution Margin (WACM)'
      ]
    },
    {
      id: 'mas-4',
      title: 'Relevant Costing & Decision Making',
      category: 'Decision Making',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Make or Buy: include opportunity costs for maximum purchase price',
        'Special order: minimum price at full capacity vs excess capacity',
        'Shutdown point = (Fixed Cost - Shutdown Cost) / Unit CM'
      ]
    },
    {
      id: 'mas-5',
      title: 'Linear Programming & Optimization',
      category: 'Decision Making',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Objective function: Maximize Z = UCM1(A) + UCM2(B)',
        'Handles multiple constraints simultaneously'
      ]
    },
    {
      id: 'mas-6',
      title: 'Budgeting & Master Budget Sequence',
      category: 'Budgeting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Master budget sequence: Sales forecast -> Production budget -> Cost of sales -> Financial budget',
        'Zero-based budgeting re-examines all costs; Kaizen budgeting focuses on continuous reduction'
      ]
    },
    {
      id: 'mas-7',
      title: 'Gross Profit Variance Analysis',
      category: 'Variance Analysis',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Sales Price Variance = Actual Quantity x (Actual SP - Budgeted SP)',
        'Cost Price Variance = Actual Quantity x (Actual CP - Budgeted CP)',
        'Volume Variance = (Actual Quantity - Budgeted Quantity) x Budgeted SP/CP'
      ]
    },
    {
      id: 'mas-8',
      title: 'Standard Costing - Materials & Labor Variances',
      category: 'Variance Analysis',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Materials Price Variance (MPV) = AQ x (AP - SP); Quantity Variance (MQV) = SP x (AQ - SQ)',
        'Labor Rate Variance (LRV) = AH x (AR - SR); Efficiency Variance (LEV) = SR x (AH - SH)'
      ]
    },
    {
      id: 'mas-9',
      title: 'Standard Costing - Overhead Variances (2, 3, 4-Way)',
      category: 'Variance Analysis',
      mastered: false,
      label: 'none',
      keyPoints: [
        '2-Way: Controllable variance vs Volume variance',
        '3-Way: Spending, Efficiency, Volume; 4-Way: Variable spending, Fixed spending, Efficiency, Volume'
      ]
    },
    {
      id: 'mas-10',
      title: 'Responsibility Accounting & Segment Reporting',
      category: 'Performance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Centers: Cost, Revenue, Profit, Investment',
        'Segment margin evaluates segment performance; Performance margin evaluates manager'
      ]
    },
    {
      id: 'mas-11',
      title: 'ROI, Residual Income & EVA',
      category: 'Performance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'ROI = Margin (Income/Sales) x Turnover (Sales/Assets) [Du Pont Technique]',
        'Residual Income = Income - (Assets x Minimum ROI)',
        'Economic Value Added (EVA) = NOPAT - (Total Capital x WACC)'
      ]
    },
    {
      id: 'mas-12',
      title: 'Absorption Costing vs Variable Costing',
      category: 'Costing',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Absorption treats FFOH as product cost; Variable treats FFOH as period expense',
        'Memory key: P > S -> Income(AC) > Income(VC); Difference = Fixed FOH rate x (Production - Sales)'
      ]
    },
    {
      id: 'mas-13',
      title: 'Transfer Pricing & Balanced Scorecard',
      category: 'Performance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Transfer price: Market price > Cost-based > Negotiated; prevents sub-optimization',
        'Balanced Scorecard: Financial, Customer, Internal Business Process, Learning & Growth'
      ]
    },
    {
      id: 'mas-14',
      title: 'Economics - Microeconomics & Macroeconomics',
      category: 'Economics',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Elasticity of Demand: Ed > 1 (Elastic), Ed < 1 (Inelastic)',
        'GDP Expenditure Approach = C + I + G + (X - M); Income Approach = WIRIPIT DAF',
        'Fiscal policy (tax/spend) vs Monetary policy (open market operations, reserve ratio, interest)'
      ]
    },
    {
      id: 'mas-15',
      title: 'Capital Budgeting - Non-Discounted Methods',
      category: 'Capital Budgeting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Payback Period = Net Investment / Annual Cash Inflow (measures liquidity, ignores time value)',
        'Accounting Rate of Return (ARR) = Annual Net Income After Tax / Average Investment'
      ]
    },
    {
      id: 'mas-16',
      title: 'Capital Budgeting - Cash Flow Cornerstones (TOWA-RAT & CWTS)',
      category: 'Capital Budgeting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Net Investment (TOWA-RAT): Tax on gain, Other costs, Working capital, Acquisition - Resale, Avoidable, Tax on loss',
        'Termination Cash Flow (CWTS): Cost to remove, Working capital return, Tax on gain/loss, Salvage value'
      ]
    },
    {
      id: 'mas-17',
      title: 'Capital Budgeting - Discounted Methods (NPV, PI, IRR)',
      category: 'Capital Budgeting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Net Present Value (NPV): PV of inflows - Net investment (reinvested at cost of capital)',
        'Profitability Index (PI) = PV of inflows / Net investment (accept if PI > 1)',
        'Internal Rate of Return (IRR): discount rate where NPV = 0'
      ]
    },
    {
      id: 'mas-18',
      title: 'Cost of Capital & WACC',
      category: 'Finance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Cost of debt KD = Yield x (1 - Tax Rate)',
        'Cost of equity KE = Risk-free rate + Beta x (Market Return - Risk-free) [CAPM]',
        'Optimal capital structure minimizes WACC'
      ]
    },
    {
      id: 'mas-19',
      title: 'Operating, Financial & Total Leverage',
      category: 'Finance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'DOL = CM / EBIT; DFL = EBIT / (EBIT - Fixed Financial Charges); DTL = DOL x DFL'
      ]
    },
    {
      id: 'mas-20',
      title: 'Financial Statement Analysis & Ratios',
      category: 'Finance',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Liquidity: Current ratio, Quick ratio (acid test)',
        'Solvency: Debt ratio, Debt-to-Equity, Times Interest Earned',
        'Activity: Inventory turnover, Receivable turnover, Cash conversion cycle (CCC)'
      ]
    },
    {
      id: 'mas-21',
      title: 'Working Capital & Cash Management (Baumol)',
      category: 'Working Capital',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Optimal cash balance (Baumol ECQ): sqrt(2 x Annual Demand x Transaction Cost / Opportunity Cost)',
        'Float management: maximize payment float, minimize collection float'
      ]
    },
    {
      id: 'mas-22',
      title: 'Inventory Management (EOQ & Reorder Point)',
      category: 'Working Capital',
      mastered: false,
      label: 'none',
      keyPoints: [
        'EOQ = sqrt(2 x Annual Demand x Order Cost / Carrying Cost per unit)',
        'Reorder point = Lead time usage + Safety stock'
      ]
    }
  ],

  AUD: [
    {
      id: 'aud-1',
      title: 'Assurance Fundamentals & 5 Elements (3SECC)',
      category: 'Principles',
      mastered: false,
      label: 'none',
      keyPoints: [
        '3SECC: Three-party relationship, Subject matter, Evidence, Criteria, Conclusion',
        'Reasonable assurance (Audit) expresses positive conclusion; Limited assurance (Review) expresses negative'
      ]
    },
    {
      id: 'aud-2',
      title: 'Non-Assurance Engagements & Standards',
      category: 'Principles',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Agreed-Upon Procedures (AUP): factual findings report, restricted distribution, no independence needed',
        'Compilation: assisting management in presenting FS, no assurance, "complied without audit"'
      ]
    },
    {
      id: 'aud-3',
      title: 'Management Assertions (TOCCAC & ACERV)',
      category: 'FS Audit',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Transactions [IS]: TOCCAC (Completeness, Occurrence, Classification, Accuracy, Cutoff)',
        'Balances [BS]: ACERV (Completeness, Existence, Rights & Obligations, Valuation & Allocation)'
      ]
    },
    {
      id: 'aud-4',
      title: 'Audit Evidence & Hierarchy of Reliability',
      category: 'Evidence',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Sufficiency (quantity) vs Appropriateness (quality: relevance & reliability)',
        'Reliability hierarchy: External third-party > Internal with good IC > Direct auditor inspection > Written > Oral'
      ]
    },
    {
      id: 'aud-5',
      title: 'Audit Procedures - Vouching vs Tracing',
      category: 'Evidence',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Vouching (Records to Source documents): tests for Existence / Occurrence (Overstatement)',
        'Tracing (Source documents to Records): tests for Completeness (Understatement)'
      ]
    },
    {
      id: 'aud-6',
      title: 'Preliminary Engagement Activities & Terms',
      category: 'Engagement',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Auditor independence, competence, client integrity, predecessor auditor communication',
        'Engagement letter establishes agreement between auditor and management on scope and duties'
      ]
    },
    {
      id: 'aud-7',
      title: 'Audit Planning & Audit Risk Model',
      category: 'Planning',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Overall audit strategy sets scope, timing, and direction; Detailed audit plan executes it',
        'Audit Risk = Inherent Risk x Control Risk x Detection Risk',
        'Detection risk has an INVERSE relationship with RoMM and Substantive Testing'
      ]
    },
    {
      id: 'aud-8',
      title: 'Audit Materiality & Tolerable Misstatement',
      category: 'Planning',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Planning materiality disaggregated into performance materiality / tolerable misstatement',
        'Materiality has an INVERSE relationship with audit risk and sample size'
      ]
    },
    {
      id: 'aud-9',
      title: 'Internal Control - 5 Components (CRIME)',
      category: 'Internal Control',
      mastered: false,
      label: 'none',
      keyPoints: [
        'CRIME: Control Environment, Risk Assessment, Information & Communication, Monitoring, Existing Control Activities',
        'Segregation of duties: ICARE (Independent checks, Custody, Authorization, Recording, Execution)'
      ]
    },
    {
      id: 'aud-10',
      title: 'Test of Controls (ToC) & Substantive Testing',
      category: 'Procedures',
      mastered: false,
      label: 'none',
      keyPoints: [
        'ToC evaluates operating effectiveness; Reliance approach vs Substantive approach',
        'Substantive tests: Test of Details (Transactions vs Balances) and Substantive Analytical Procedures'
      ]
    },
    {
      id: 'aud-11',
      title: 'External Confirmations (Positive vs Negative)',
      category: 'Evidence',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Positive confirmation requires response whether agree or disagree (more reliable)',
        'Negative confirmation responds only if disagree (used when RoMM is low, large number of small accounts)'
      ]
    },
    {
      id: 'aud-12',
      title: 'Audit Sampling - Risks (Alpha vs Beta)',
      category: 'Sampling',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Alpha Risk (Type 1): Under-reliance / Incorrect rejection -> affects Audit EFFICIENCY (extra work)',
        'Beta Risk (Type 2): Over-reliance / Incorrect acceptance -> affects Audit EFFECTIVENESS (wrong opinion!)'
      ]
    },
    {
      id: 'aud-13',
      title: 'Attribute Sampling & Variable Sampling',
      category: 'Sampling',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Attribute sampling tests deviation rate in controls (SDR vs Tolerable Deviation Rate TDR)',
        'Variable sampling tests monetary misstatement (Ratio estimation, Difference estimation, Mean-per-unit)'
      ]
    },
    {
      id: 'aud-14',
      title: 'Auditing in a CIS Environment & CAATs',
      category: 'IT Auditing',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Auditing around the computer (Black box) vs Auditing through the computer (White box)',
        'CAATs: Test data, Integrated Test Facility (ITF dummy accounts), Parallel simulation, Snapshot'
      ]
    },
    {
      id: 'aud-15',
      title: 'Quality Management for Audit Firms (PSQM 1 & 2)',
      category: 'Quality',
      mastered: false,
      label: 'none',
      keyPoints: [
        'PSQM 1: System of Quality Management (firm-wide, risk-based approach, annual evaluation)',
        'PSQM 2: Engagement Quality Review (EQR) for listed entities and high-risk engagements'
      ]
    },
    {
      id: 'aud-16',
      title: 'Code of Ethics for CPAs (COBID & Threats I-FASS)',
      category: 'Ethics',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Fundamental Principles: COBID (Confidentiality, Objectivity, Professional Behavior, Integrity, Diligence/Due Care)',
        'Threats: I-FASS (Intimidation, Familiarity, Advocacy, Self-interest, Self-review)'
      ]
    },
    {
      id: 'aud-17',
      title: 'Independence Rules & Cooling-Off Periods',
      category: 'Ethics',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Independence in Mind vs Independence in Appearance',
        'PIE lead engagement partner rotation: 7 years on-period; 5-year cooling off period'
      ]
    },
    {
      id: 'aud-18',
      title: 'Transaction Cycles - Order to Cash (Revenue)',
      category: 'Cycles',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Customer order -> Sales order -> Credit approval -> Shipping -> Billing (invoice) -> AR -> Cash collection',
        'Separation: Credit approval separated from sales; Shipping separated from billing'
      ]
    },
    {
      id: 'aud-19',
      title: 'Transaction Cycles - Procure to Pay & Payroll',
      category: 'Cycles',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Procure to Pay: Requisition slip -> Purchase Order -> Receiving Report -> Vendor Invoice -> Voucher 3-way match',
        'Payroll: Timekeeping segregated from HR and check disbursement; surprise paycheck distributions'
      ]
    },
    {
      id: 'aud-20',
      title: 'Completing the Audit & Unrecorded Liabilities',
      category: 'Completion',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Search for unrecorded liabilities examines subsequent cash disbursements after year-end',
        'Inquiry of legal counsel for litigations and claims; Subsequent events review'
      ]
    },
    {
      id: 'aud-21',
      title: 'Going Concern & Management Representations',
      category: 'Completion',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Going concern assessment covers at least 12 months from reporting date',
        'Management Representation Letter: dated same date as auditor\'s report; signed by CEO & CFO'
      ]
    },
    {
      id: 'aud-22',
      title: 'Audit Reports & Modified Opinions',
      category: 'Reporting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Unqualified: Fairly presented in all material respects',
        'Qualified: Material but not pervasive ("Except for...")',
        'Adverse: Material AND pervasive misstatement ("Does not present fairly")',
        'Disclaimer: Material AND pervasive scope limitation ("We do not express an opinion")'
      ]
    },
    {
      id: 'aud-23',
      title: 'Key Audit Matters (KAM), EoM & Other Matter',
      category: 'Reporting',
      mastered: false,
      label: 'none',
      keyPoints: [
        'KAM: Most significant matters communicated with TCwG (required for listed entities)',
        'Emphasis of Matter (EoM): Already disclosed in notes, fundamental to users (GUESTS)',
        'Other Matter (OM): Matters not presented/disclosed in FS relevant to understanding audit'
      ]
    },
    {
      id: 'aud-24',
      title: 'Philippine Accountancy Act of 2004 (RA 9298)',
      category: 'Profession',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Professional Regulatory Board of Accountancy (PRBoA): Chairman + 6 members',
        'CPALE Rating: 75% general average with no subject below 65%; conditional if majority >=75%',
        'CPD Law (RA 10912): 120 CPD units for BOA accreditation, 15 for license renewal'
      ]
    },
    {
      id: 'aud-25',
      title: 'Fraud, Error & NOCLAR',
      category: 'Fraud',
      mastered: false,
      label: 'none',
      keyPoints: [
        'Fraud triangle: Incentive/Pressure, Opportunity, Rationalization',
        'Kiting: Concealing cash shortage by unrecorded inter-bank check transfer',
        'Lapping: Postponing entry of cash collection to conceal stolen previous receipts',
        'NOCLAR: Non-Compliance with Laws and Regulations responsibilities'
      ]
    }
  ]
};

export const MOTIVATIONAL_QUOTES = [
  "“May He give you the desire of your heart and make all your plans succeed.” — Hercules, CPA 2023",
  "“Your dedication will always be rewarded, for the seeds of effort you sow will surely bloom in time.” — Hercules, CPA 2023",
  "“If it's out of your hands, it deserves freedom from your mind too.” — Hercules, CPA 2023",
  "“Trust in the Lord with all your heart and not lean on your own understanding.” — Proverbs 3:5",
  "“Today's struggles are part of tomorrow's success story.” — Future CPA Study Habit",
  "“One spin, one topic, one step closer to that CPA license!” — CPALE Review Buddy"
];
