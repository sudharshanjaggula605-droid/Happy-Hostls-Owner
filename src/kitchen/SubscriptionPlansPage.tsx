import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  Award, 
  Zap, 
  Check, 
  X, 
  Sparkles, 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  HelpCircle, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  Lock,
  Flame,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export type PlanType = 'Bronze' | 'Gold' | 'Platinum';

interface SubscriptionPlansPageProps {
  currentPlan: PlanType;
  onUpdatePlan: (plan: PlanType) => void;
  onBack: () => void;
  showToast?: (msg: string) => void;
}

interface PlanDetails {
  id: PlanType;
  name: string;
  badge: string;
  badgeType: 'bronze' | 'gold' | 'platinum';
  monthlyPrice: number;
  annualPricePerMonth: number;
  tagline: string;
  capacityText: string;
  features: string[];
  notIncluded?: string[];
}

const PLANS: PlanDetails[] = [
  {
    id: 'Bronze',
    name: 'Bronze Plan',
    badge: 'ESSENTIAL',
    badgeType: 'bronze',
    monthlyPrice: 499,
    annualPricePerMonth: 399,
    tagline: 'Ideal for small hostels & PG owners getting started.',
    capacityText: 'Up to 30 Beds • 1 Hostel • 1 Admin',
    features: [
      'Room & Bed Allocation Management',
      'Digital Rent Collection & Manual Receipts',
      'Basic Kitchen & Expense Logging',
      'Overdue Rent Alerts (Email/App)',
      'Standard Occupancy & Revenue Dashboard',
      'Standard Community Support'
    ],
    notIncluded: [
      'Automated WhatsApp Fee Reminders',
      'Laundry & Staff Payroll Management',
      'AI Occupancy Forecasting',
      'Custom Branded Guest App'
    ]
  },
  {
    id: 'Gold',
    name: 'Gold Plan',
    badge: 'MOST POPULAR',
    badgeType: 'gold',
    monthlyPrice: 1299,
    annualPricePerMonth: 999,
    tagline: 'The complete toolkit for growing hostel businesses.',
    capacityText: 'Up to 150 Beds • 3 Hostels • 5 Staff Logins',
    features: [
      'Everything in Bronze Plan',
      'Automated WhatsApp Payment Reminders',
      'Laundry Order & Kitchen Inventory Tracking',
      'Resident Complaint Ticketing Desk',
      'Staff Attendance & Salary Payroll Manager',
      'Advanced Multi-Hostel Analytics',
      'Priority 24/7 Phone & WhatsApp Support'
    ],
    notIncluded: [
      'AI Occupancy Forecasting & Dynamic Pricing',
      'Custom Branded Resident App & Domain'
    ]
  },
  {
    id: 'Platinum',
    name: 'Platinum Plan',
    badge: 'ULTIMATE ENTERPRISE',
    badgeType: 'platinum',
    monthlyPrice: 2499,
    annualPricePerMonth: 1999,
    tagline: 'Enterprise automation & custom branding for large chains.',
    capacityText: 'Unlimited Beds • Unlimited Hostels • Unlimited Staff',
    features: [
      'Everything in Gold Plan',
      'AI Occupancy Forecast & Smart Pricing Suggestions',
      'Automated Bank Statement Reconciliation',
      'Custom Branded Guest Mobile App & Web Domain',
      'Dedicated Key Account Manager & Onsite Setup',
      'Custom API & Accounting Software Integration',
      'VIP 24/7 Priority Resolution & SLA Guarantee'
    ]
  }
];

const ADDONS = [
  { id: 'whatsapp_credits', name: '+1,000 WhatsApp SMS Credits', price: 299, desc: 'Automated WhatsApp receipts & reminders.' },
  { id: 'qr_scanner_stand', name: 'Smart UPI QR Counter Stand', price: 899, desc: 'Physical acrylic QR stand for reception.' },
  { id: 'custom_domain', name: 'Custom Domain Setup', price: 1499, desc: 'Branded web link for resident payments.' }
];

const FAQS = [
  { q: 'Can I upgrade or downgrade my plan at any time?', a: 'Yes! Upgrade instantly at any time. Unused credits from your current subscription are prorated automatically.' },
  { q: 'How do automated WhatsApp reminders work?', a: 'Gold & Platinum plans include integrated WhatsApp API to send one-click rent reminders and receipts.' },
  { q: 'Are there any hidden setup fees?', a: 'No hidden fees at all! GST (18%) is calculated transparently at checkout.' },
  { q: 'What payment methods are supported?', a: 'All major UPI apps (GPay, PhonePe, Paytm, BHIM), Credit/Debit cards, and Net Banking.' }
];

export const SubscriptionPlansPage: React.FC<SubscriptionPlansPageProps> = ({
  currentPlan,
  onUpdatePlan,
  onBack,
  showToast
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTab, setActiveTab] = useState<'plans' | 'compare' | 'addons' | 'faq'>('plans');
  const [selectedPlanTab, setSelectedPlanTab] = useState<PlanType>('Gold');
  
  // Checkout Modal / Page Screen States
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanType | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'summary' | 'payment' | 'processing' | 'success'>('summary');
  
  // Checkout Form & Options
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [selectedNetBank, setSelectedNetBank] = useState('HDFC Bank');
  
  // Addons & Promo Code
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [transactionId, setTransactionId] = useState('');

  // Handle plan purchase click
  const handleInitiatePurchase = (plan: PlanType) => {
    setSelectedPlanForCheckout(plan);
    setCheckoutStep('summary');
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError('');
    setIsCheckoutModalOpen(true);
  };

  // Toggle add-ons
  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Apply Promo Code
  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a coupon code');
      return;
    }
    if (code === 'HAPPY20' || code === 'WELCOME20' || code === 'GOLD20') {
      setAppliedPromo({ code, percent: 20 });
      setPromoError('');
      if (showToast) showToast('Coupon code applied! 20% discount added.');
    } else if (code === 'HAPPY10') {
      setAppliedPromo({ code, percent: 10 });
      setPromoError('');
      if (showToast) showToast('Coupon code applied! 10% discount added.');
    } else {
      setPromoError('Invalid coupon code. Try HAPPY20');
      setAppliedPromo(null);
    }
  };

  // Calculate pricing totals
  const getSelectedPlanDetails = () => {
    return PLANS.find(p => p.id === selectedPlanForCheckout) || PLANS[1];
  };

  const getBasePrice = () => {
    const plan = getSelectedPlanDetails();
    if (billingCycle === 'annual') {
      return plan.annualPricePerMonth * 12;
    }
    return plan.monthlyPrice;
  };

  const getAddonsTotal = () => {
    return selectedAddonIds.reduce((sum, id) => {
      const addon = ADDONS.find(a => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
  };

  const getSubtotal = () => getBasePrice() + getAddonsTotal();

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    return Math.round((getSubtotal() * appliedPromo.percent) / 100);
  };

  const getGstAmount = () => {
    const taxable = getSubtotal() - getDiscountAmount();
    return Math.round(taxable * 0.18);
  };

  const getTotalPayable = () => {
    return (getSubtotal() - getDiscountAmount()) + getGstAmount();
  };

  // Process Mock Payment
  const handleProcessPayment = () => {
    if (paymentMethod === 'upi' && selectedUpiApp === 'custom' && !customUpiId.includes('@')) {
      if (showToast) showToast('Please enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || cardNumber.length < 12)) {
      if (showToast) showToast('Please enter a valid 16-digit card number');
      return;
    }

    setCheckoutStep('processing');

    // Simulate Payment Gateway API Call
    setTimeout(() => {
      const generatedTxn = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
      setTransactionId(generatedTxn);
      setCheckoutStep('success');
      
      if (selectedPlanForCheckout) {
        onUpdatePlan(selectedPlanForCheckout);
      }
      if (showToast) {
        showToast(`Upgraded to ${selectedPlanForCheckout} Plan successfully!`);
      }
    }, 1800);
  };

  const activePlanDetails = PLANS.find(p => p.id === selectedPlanTab) || PLANS[1];

  return (
    <div className="plans-page-container">
      {/* Top Mobile App Header */}
      <div className="plans-header">
        <button className="plans-back-btn" onClick={onBack} aria-label="Go Back">
          <ArrowLeft size={18} />
        </button>
        <div className="plans-header-title-container">
          <h1 className="plans-header-title">Subscription Plans</h1>
          <p className="plans-header-sub">Upgrade your hostel management system</p>
        </div>

        <div className={`active-plan-header-chip badge-${currentPlan.toLowerCase()}`}>
          {currentPlan === 'Bronze' && <Award size={12} />}
          {currentPlan === 'Gold' && <Crown size={12} />}
          {currentPlan === 'Platinum' && <Sparkles size={12} />}
          <span>{currentPlan.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Body inside Mobile Screen */}
      <div className="plans-content">
        
        {/* Compact Hero & Billing Toggle */}
        <div className="billing-switcher-hero">
          <span className="hero-sparkle">PREMIUM PLANS</span>
          <h2>Select Your Hostel Plan</h2>
          
          <div className="billing-toggle-container">
            <button 
              className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`billing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual <span className="save-badge">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="plans-tab-bar">
          <button 
            className={`plans-tab-item ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            <Crown size={14} />
            <span>Plans</span>
          </button>
          <button 
            className={`plans-tab-item ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            <BarChart3 size={14} />
            <span>Matrix</span>
          </button>
          <button 
            className={`plans-tab-item ${activeTab === 'addons' ? 'active' : ''}`}
            onClick={() => setActiveTab('addons')}
          >
            <Zap size={14} />
            <span>Add-ons</span>
          </button>
          <button 
            className={`plans-tab-item ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <HelpCircle size={14} />
            <span>FAQ</span>
          </button>
        </div>

        {/* TAB 1: SINGLE-SCREEN PLAN VIEWER WITH QUICK PILL SELECTOR */}
        {activeTab === 'plans' && (
          <div className="mobile-plan-view-container">
            
            {/* Quick Segmented Plan Selector Pill Bar (No scrolling needed!) */}
            <div className="plan-segment-bar">
              <button 
                className={`segment-btn ${selectedPlanTab === 'Bronze' ? 'active bronze' : ''}`}
                onClick={() => setSelectedPlanTab('Bronze')}
              >
                <Award size={14} />
                <span>Bronze</span>
              </button>

              <button 
                className={`segment-btn ${selectedPlanTab === 'Gold' ? 'active gold' : ''}`}
                onClick={() => setSelectedPlanTab('Gold')}
              >
                <Crown size={14} />
                <span>Gold</span>
              </button>

              <button 
                className={`segment-btn ${selectedPlanTab === 'Platinum' ? 'active platinum' : ''}`}
                onClick={() => setSelectedPlanTab('Platinum')}
              >
                <Sparkles size={14} />
                <span>Platinum</span>
              </button>
            </div>

            {/* Selected Plan Card - Fits 100% cleanly on Mobile Viewport */}
            <div 
              className={`plan-card card-${activePlanDetails.badgeType} ${currentPlan === activePlanDetails.id ? 'is-current-plan' : ''} ${activePlanDetails.id === 'Gold' ? 'popular-glow' : ''}`}
            >
              {activePlanDetails.badge && (
                <div className={`plan-popular-tag tag-${activePlanDetails.badgeType}`}>
                  {activePlanDetails.id === 'Gold' && <Flame size={11} />}
                  {activePlanDetails.id === 'Platinum' && <Sparkles size={11} />}
                  <span>{activePlanDetails.badge}</span>
                </div>
              )}

              <div className="plan-card-header">
                <div className="plan-icon-wrapper">
                  {activePlanDetails.id === 'Bronze' && <Award size={22} className="icon-bronze" />}
                  {activePlanDetails.id === 'Gold' && <Crown size={22} className="icon-gold" />}
                  {activePlanDetails.id === 'Platinum' && <Sparkles size={22} className="icon-platinum" />}
                </div>
                <div>
                  <h3 className="plan-name">{activePlanDetails.name}</h3>
                  <p className="plan-tagline">{activePlanDetails.tagline}</p>
                </div>
              </div>

              {/* Price Block */}
              <div className="plan-price-block">
                <div className="price-main">
                  <span className="currency">₹</span>
                  <span className="amount">
                    {(billingCycle === 'annual' ? activePlanDetails.annualPricePerMonth : activePlanDetails.monthlyPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="period">/ mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="billed-annually-note">
                    Billed annually at ₹{(activePlanDetails.annualPricePerMonth * 12).toLocaleString('en-IN')}/yr
                  </p>
                )}
              </div>

              <div className="plan-capacity-chip">
                <Building2 size={13} />
                <span>{activePlanDetails.capacityText}</span>
              </div>

              {/* Action Buy Button */}
              <div className="plan-action-container">
                {currentPlan === activePlanDetails.id ? (
                  <button className="plan-btn current-active-btn" disabled>
                    <CheckCircle2 size={16} />
                    <span>Current Active Plan</span>
                  </button>
                ) : (
                  <button 
                    className={`plan-btn buy-now-btn btn-${activePlanDetails.badgeType}`}
                    onClick={() => handleInitiatePurchase(activePlanDetails.id)}
                  >
                    <Zap size={16} />
                    <span>Upgrade to {activePlanDetails.name}</span>
                  </button>
                )}
              </div>

              <hr className="plan-divider" />

              {/* Features List */}
              <div className="plan-features-section">
                <p className="features-title">Features Included:</p>
                <ul className="features-list">
                  {activePlanDetails.features.map((feat, idx) => (
                    <li key={idx} className="feature-item included">
                      <Check size={14} className="check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}

                  {activePlanDetails.notIncluded && activePlanDetails.notIncluded.map((feat, idx) => (
                    <li key={`not-${idx}`} className="feature-item not-included">
                      <X size={14} className="x-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: COMPARISON MATRIX */}
        {activeTab === 'compare' && (
          <div className="comparison-table-wrapper">
            <h3 className="comparison-title">Features Comparison</h3>
            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>Bronze</th>
                    <th className="highlight-col">Gold</th>
                    <th>Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feat-name">Bed Capacity</td>
                    <td>Up to 30</td>
                    <td className="highlight-col font-bold">Up to 150</td>
                    <td className="font-bold text-purple">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="feat-name">Properties</td>
                    <td>1 Hostel</td>
                    <td className="highlight-col font-bold">3 Hostels</td>
                    <td className="font-bold text-purple">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="feat-name">WhatsApp Reminders</td>
                    <td><X size={14} className="text-red" /></td>
                    <td className="highlight-col"><Check size={16} className="text-green" /></td>
                    <td><Check size={16} className="text-green" /></td>
                  </tr>
                  <tr>
                    <td className="feat-name">Laundry & Kitchen</td>
                    <td>Basic</td>
                    <td className="highlight-col"><Check size={16} className="text-green" /> Full</td>
                    <td><Check size={16} className="text-green" /> Full</td>
                  </tr>
                  <tr>
                    <td className="feat-name">AI Forecast</td>
                    <td><X size={14} className="text-red" /></td>
                    <td className="highlight-col"><X size={14} className="text-red" /></td>
                    <td><Check size={16} className="text-green" /> Enabled</td>
                  </tr>
                  <tr>
                    <td className="feat-name">Support</td>
                    <td>Email</td>
                    <td className="highlight-col font-bold">24/7 Phone</td>
                    <td className="font-bold text-purple">VIP Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADDONS */}
        {activeTab === 'addons' && (
          <div className="addons-section">
            <h3 className="addons-title">Power-up Addons</h3>
            <p className="addons-sub">Enhance your hostel management with extra credits.</p>

            <div className="addons-grid">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <div 
                    key={addon.id} 
                    className={`addon-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div className="addon-checkbox">
                      {isSelected ? <CheckCircle2 size={18} className="text-primary" /> : <div className="checkbox-empty" />}
                    </div>
                    <div className="addon-info">
                      <h4>{addon.name}</h4>
                      <p>{addon.desc}</p>
                    </div>
                    <div className="addon-price">
                      <span>+₹{addon.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedAddonIds.length > 0 && (
              <div className="addons-summary-bar">
                <span>Add-ons Total: <strong>₹{getAddonsTotal()}</strong></span>
                <button 
                  className="buy-now-btn btn-gold"
                  onClick={() => handleInitiatePurchase(currentPlan === 'Bronze' ? 'Gold' : currentPlan)}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FAQ */}
        {activeTab === 'faq' && (
          <div className="faq-section">
            <h3 className="faq-title">Frequently Asked Questions</h3>
            <div className="faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className="faq-item">
                    <button 
                      className="faq-question"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && <div className="faq-answer">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* STEP-BY-STEP MOBILE CHECKOUT PAGES (FITS 100% ON SCREEN WITHOUT SCROLLING) */}
      {/* ========================================================================= */}
      {isCheckoutModalOpen && (
        <div className="modal-backdrop">
          <div className="mobile-checkout-screen-container">
            
            {/* STEP 1: ORDER SUMMARY SCREEN */}
            {checkoutStep === 'summary' && (
              <div className="checkout-step-page">
                {/* Header */}
                <div className="step-page-header">
                  <div className="step-header-title">
                    <ShieldCheck size={20} className="shield-icon" />
                    <div>
                      <h3>Step 1 of 2: Order Summary</h3>
                      <p>Encrypted 256-Bit SSL Payment</p>
                    </div>
                  </div>
                  <button className="close-modal-btn" onClick={() => setIsCheckoutModalOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                {/* Body Content - Fits 100% on Mobile Viewport */}
                <div className="step-page-body">
                  <div className="summary-plan-badge">
                    <Crown size={15} />
                    <span>{selectedPlanForCheckout?.toUpperCase()} PLAN</span>
                    <span className="cycle-tag">{billingCycle.toUpperCase()}</span>
                  </div>

                  <div className="summary-row">
                    <span>Base Plan ({billingCycle})</span>
                    <span>₹{getBasePrice().toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAddonIds.length > 0 && (
                    <div className="summary-row">
                      <span>Add-ons ({selectedAddonIds.length})</span>
                      <span>+₹{getAddonsTotal().toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Promo Code Input Box */}
                  <div className="promo-box-container">
                    <div className="promo-input-row">
                      <Tag size={15} className="tag-icon" />
                      <input 
                        type="text" 
                        placeholder="Coupon Code (HAPPY20)"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                      />
                      <button className="apply-promo-btn" onClick={handleApplyPromo}>Apply</button>
                    </div>
                    {promoError && <p className="promo-error">{promoError}</p>}
                    {appliedPromo && (
                      <p className="promo-success">Coupon {appliedPromo.code} applied! (-{appliedPromo.percent}%)</p>
                    )}
                  </div>

                  {appliedPromo && (
                    <div className="summary-row discount">
                      <span>Discount ({appliedPromo.percent}%)</span>
                      <span>-₹{getDiscountAmount().toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>GST (18% Govt Tax)</span>
                    <span>+₹{getGstAmount().toLocaleString('en-IN')}</span>
                  </div>

                  <hr className="summary-divider" />

                  <div className="summary-total-row">
                    <span>Total Amount</span>
                    <span className="total-price">₹{getTotalPayable().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Fixed Bottom Action Button */}
                <div className="step-page-footer">
                  <button 
                    className="pay-now-action-btn"
                    onClick={() => setCheckoutStep('payment')}
                  >
                    <span>Proceed to Select Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD SELECTION SCREEN */}
            {checkoutStep === 'payment' && (
              <div className="checkout-step-page">
                {/* Header */}
                <div className="step-page-header">
                  <button className="plans-back-btn" onClick={() => setCheckoutStep('summary')}>
                    <ArrowLeft size={16} />
                  </button>
                  <div className="step-header-title">
                    <h3>Step 2 of 2: Payment Method</h3>
                    <p>Total: <strong>₹{getTotalPayable().toLocaleString('en-IN')}</strong></p>
                  </div>
                  <button className="close-modal-btn" onClick={() => setIsCheckoutModalOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="step-page-body">
                  <div className="payment-tabs">
                    <button 
                      className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <Smartphone size={15} />
                      <span>UPI / QR</span>
                    </button>
                    <button 
                      className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard size={15} />
                      <span>Card</span>
                    </button>
                    <button 
                      className={`payment-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <Building2 size={15} />
                      <span>NetBank</span>
                    </button>
                  </div>

                  {/* METHOD 1: UPI */}
                  {paymentMethod === 'upi' && (
                    <div className="upi-payment-panel">
                      <p className="panel-subtitle">Instant Pay via UPI Apps</p>
                      
                      <div className="upi-apps-grid">
                        <button 
                          className={`upi-app-btn ${selectedUpiApp === 'gpay' ? 'selected' : ''}`}
                          onClick={() => setSelectedUpiApp('gpay')}
                        >
                          <span className="app-dot gpay" />
                          <span>GPay</span>
                        </button>
                        <button 
                          className={`upi-app-btn ${selectedUpiApp === 'phonepe' ? 'selected' : ''}`}
                          onClick={() => setSelectedUpiApp('phonepe')}
                        >
                          <span className="app-dot phonepe" />
                          <span>PhonePe</span>
                        </button>
                        <button 
                          className={`upi-app-btn ${selectedUpiApp === 'paytm' ? 'selected' : ''}`}
                          onClick={() => setSelectedUpiApp('paytm')}
                        >
                          <span className="app-dot paytm" />
                          <span>Paytm</span>
                        </button>
                        <button 
                          className={`upi-app-btn ${selectedUpiApp === 'custom' ? 'selected' : ''}`}
                          onClick={() => setSelectedUpiApp('custom')}
                        >
                          <QrCode size={15} />
                          <span>QR Code</span>
                        </button>
                      </div>

                      {selectedUpiApp === 'custom' ? (
                        <div className="card-form-group">
                          <label>Enter UPI ID (VPA)</label>
                          <input 
                            type="text"
                            placeholder="e.g. 9876543210@upi"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="qr-preview-box">
                          <QrCode size={60} className="qr-code-icon" />
                          <p className="qr-note">Scan or click Pay below to open {selectedUpiApp.toUpperCase()}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* METHOD 2: CARDS */}
                  {paymentMethod === 'card' && (
                    <div className="card-payment-panel">
                      <div className="card-form-group">
                        <label>Card Number</label>
                        <div className="card-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="4532 •••• •••• 8921" 
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <CreditCard size={16} className="card-icon" />
                        </div>
                      </div>

                      <div className="card-row-two">
                        <div className="card-form-group">
                          <label>Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                          />
                        </div>
                        <div className="card-form-group">
                          <label>CVV</label>
                          <input 
                            type="password" 
                            placeholder="•••" 
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="card-form-group">
                        <label>Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="Name on card"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* METHOD 3: NETBANKING */}
                  {paymentMethod === 'netbanking' && (
                    <div className="netbank-payment-panel">
                      <label>Select Bank</label>
                      <select 
                        className="netbank-select"
                        value={selectedNetBank}
                        onChange={(e) => setSelectedNetBank(e.target.value)}
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">SBI</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Fixed Bottom Action Button */}
                <div className="step-page-footer">
                  <button 
                    className="pay-now-action-btn"
                    onClick={handleProcessPayment}
                  >
                    <Lock size={15} />
                    <span>Pay ₹{getTotalPayable().toLocaleString('en-IN')} & Upgrade Now</span>
                  </button>
                  <p className="trust-footer">100% Encrypted SSL • Instant Activation</p>
                </div>
              </div>
            )}

            {/* STEP 3: PROCESSING SCREEN */}
            {checkoutStep === 'processing' && (
              <div className="checkout-step-page">
                <div className="checkout-processing-state">
                  <div className="spinner-ring" />
                  <h3>Processing Payment...</h3>
                  <p>Securing ₹{getTotalPayable().toLocaleString('en-IN')} with Razorpay Gateway</p>
                  <div className="processing-secure-badge">
                    <Lock size={13} />
                    <span>Do not refresh or press back</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS CELEBRATION SCREEN */}
            {checkoutStep === 'success' && (
              <div className="checkout-step-page">
                <div className="checkout-success-state">
                  <div className="success-icon-badge">
                    <CheckCircle size={48} />
                  </div>

                  <h2>Subscription Activated!</h2>
                  <p className="success-sub">
                    You are now on the <strong>{selectedPlanForCheckout} Plan</strong>!
                  </p>

                  <div className="receipt-summary-box">
                    <div className="receipt-row">
                      <span>Transaction ID:</span>
                      <strong className="code-text">{transactionId}</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Plan:</span>
                      <strong>{selectedPlanForCheckout} ({billingCycle})</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Amount Paid:</span>
                      <strong className="amount-text">₹{getTotalPayable().toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <button 
                    className="done-success-btn"
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      onBack();
                    }}
                  >
                    <span>Done & Return to Dashboard</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
