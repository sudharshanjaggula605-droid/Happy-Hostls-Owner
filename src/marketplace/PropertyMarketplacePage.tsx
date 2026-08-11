import React, { useState } from 'react';
import { 
  Building2, 
  Building, 
  KeyRound, 
  Home as HomeIcon, 
  Search, 
  MapPin, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  X, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Tag, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

export interface PropertyListing {
  id: string;
  title: string;
  category: 'sale' | 'lease' | 'buy';
  propertyType: 'Residential' | 'Commercial' | 'Hostel' | 'PG' | 'Other';
  location: string;
  floors: string;
  rooms: string;
  capacity?: string;
  builtUpArea: string;
  priceOrLease: string;
  securityDeposit?: string;
  leaseDuration?: string;
  currentUsage?: string;
  furnishedStatus: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  existingSetup?: 'Yes' | 'No';
  facilities: string[];
  photos: string[];
  videoUrl?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  contactMethod: 'Phone' | 'WhatsApp' | 'Email';
  description: string;
  submissionDate: string;
  status: 'Pending Verification' | 'Under Review' | 'Approved' | 'Rejected' | 'Closed';
  rejectionReason?: string;
}

const initialMyListings: PropertyListing[] = [
  {
    id: 'HH-849201',
    title: 'Sunrise Heights PG Building',
    category: 'lease',
    propertyType: 'Hostel',
    location: 'Koramangala 5th Block, Bengaluru',
    floors: '4',
    rooms: '28',
    capacity: '56 Beds',
    builtUpArea: '8,500 sq ft',
    priceOrLease: '₹1.80 Lakh / Month',
    securityDeposit: '₹6.00 Lakhs',
    leaseDuration: '3 Years',
    furnishedStatus: 'Fully Furnished',
    existingSetup: 'Yes',
    facilities: ['Kitchen', 'Parking', 'Lift', 'CCTV', 'Wi-Fi', 'Water Facility', 'Electricity', 'Attached Bathrooms', 'Dining Area', 'Security', 'Power Backup'],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    ownerName: 'Rohit Rajpoot',
    ownerPhone: '+91 62657 75558',
    ownerEmail: 'rohitrajpoot21119@gmail.com',
    contactMethod: 'WhatsApp',
    description: 'Fully equipped 4-floor hostel building with existing 56-bed setup, commercial kitchen equipment, lift, and 24/7 power backup. Ready for immediate takeover.',
    submissionDate: '2026-08-08',
    status: 'Pending Verification'
  },
  {
    id: 'HH-732910',
    title: 'Gachibowli Commercial Complex',
    category: 'sale',
    propertyType: 'Commercial',
    location: 'Financial District, Gachibowli, Hyderabad',
    floors: '5',
    rooms: '40',
    builtUpArea: '14,000 sq ft',
    priceOrLease: '₹3.40 Crore',
    currentUsage: 'Vacant',
    furnishedStatus: 'Semi-Furnished',
    facilities: ['Kitchen Available', 'Parking Available', 'Lift Available', 'CCTV Available', 'Wi-Fi Available', 'Water Facility', 'Electricity Connection', 'Attached Bathrooms', 'Hostel Infrastructure Available'],
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ],
    ownerName: 'Rohit Rajpoot',
    ownerPhone: '+91 62657 75558',
    ownerEmail: 'rohitrajpoot21119@gmail.com',
    contactMethod: 'Phone',
    description: 'Prime commercial building suitable for converting into a 100+ bed premium student & IT professional co-living space.',
    submissionDate: '2026-08-02',
    status: 'Approved'
  }
];

const mockMarketplaceFeed: PropertyListing[] = [
  {
    id: 'HH-910283',
    title: 'HSR Layout 30-Room PG Property',
    category: 'lease',
    propertyType: 'PG',
    location: 'Sector 2, HSR Layout, Bengaluru',
    floors: '3',
    rooms: '30',
    capacity: '60 Beds',
    builtUpArea: '7,200 sq ft',
    priceOrLease: '₹1.50 Lakh / Month',
    securityDeposit: '₹5.00 Lakhs',
    leaseDuration: '3 Years',
    furnishedStatus: 'Fully Furnished',
    existingSetup: 'Yes',
    facilities: ['Kitchen', 'Parking', 'Lift', 'CCTV', 'Wi-Fi', 'Water Facility', 'Attached Bathrooms'],
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    ownerName: 'Suresh Menon',
    ownerPhone: '+91 98450 12345',
    ownerEmail: 'suresh.m@gmail.com',
    contactMethod: 'Phone',
    description: 'Fully furnished PG building with solar water heating, high-speed Wi-Fi, and individual attached bathrooms.',
    submissionDate: '2026-08-05',
    status: 'Approved'
  },
  {
    id: 'HH-561234',
    title: 'Powai Lake View Residence',
    category: 'sale',
    propertyType: 'Hostel',
    location: 'Near IIT Main Gate, Powai, Mumbai',
    floors: '4',
    rooms: '22',
    builtUpArea: '6,800 sq ft',
    priceOrLease: '₹2.85 Crore',
    currentUsage: 'Hostel',
    furnishedStatus: 'Fully Furnished',
    facilities: ['Kitchen Available', 'Parking Available', 'CCTV Available', 'Wi-Fi Available', 'Water Facility', 'Electricity Connection'],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    ownerName: 'Vikram Joshi',
    ownerPhone: '+91 98200 98765',
    ownerEmail: 'vikram.j@gmail.com',
    contactMethod: 'WhatsApp',
    description: 'Running student hostel near IIT Bombay with 95% average occupancy. Excellent ROI opportunity.',
    submissionDate: '2026-08-01',
    status: 'Approved'
  }
];

interface PropertyMarketplacePageProps {
  onBack: () => void;
  showToast?: (msg: string) => void;
}

export const PropertyMarketplacePage: React.FC<PropertyMarketplacePageProps> = ({ onBack, showToast }) => {
  const [viewMode, setViewMode] = useState<'main' | 'sell-form' | 'lease-form' | 'buy-form' | 'preview' | 'confirmation' | 'my-listings'>('main');
  const [myListings, setMyListings] = useState<PropertyListing[]>(initialMyListings);
  const [selectedPreviewListing, setSelectedPreviewListing] = useState<PropertyListing | null>(null);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('HH-849201');

  // Location Selector Modal State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [activeLocationTarget, setActiveLocationTarget] = useState<'sell' | 'lease' | 'buy'>('sell');

  // Delete Confirmation State
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null);

  // Form State: Sell Building
  const [sellForm, setSellForm] = useState({
    title: '',
    location: 'Gachibowli, Hyderabad',
    propertyType: 'Hostel' as 'Residential' | 'Commercial' | 'Hostel' | 'PG' | 'Other',
    floors: '4',
    rooms: '24',
    builtUpArea: '6500 sq ft',
    expectedPrice: '₹2.50 Crore',
    currentUsage: 'Hostel' as 'Hostel' | 'PG' | 'Residential' | 'Commercial' | 'Vacant',
    furnishedStatus: 'Fully Furnished' as 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished',
    features: ['Kitchen Available', 'Parking Available', 'Lift Available', 'CCTV Available', 'Wi-Fi Available', 'Water Facility', 'Electricity Connection', 'Attached Bathrooms', 'Hostel Infrastructure Available'],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'Uploaded_Property_Video.mp4',
    ownerName: 'Rohit Rajpoot',
    ownerPhone: '+91 62657 75558',
    ownerEmail: 'rohitrajpoot21119@gmail.com',
    contactMethod: 'WhatsApp' as 'Phone' | 'WhatsApp' | 'Email',
    description: 'Well-maintained building ready for hostel or PG operations with individual attached bathrooms and power backup.'
  });

  // Form State: Lease Building
  const [leaseForm, setLeaseForm] = useState({
    title: '',
    location: 'Koramangala, Bengaluru',
    propertyType: 'Hostel' as 'Residential' | 'Commercial' | 'Hostel' | 'PG' | 'Other',
    floors: '3',
    rooms: '20',
    capacity: '40 Beds',
    builtUpArea: '5500 sq ft',
    furnishedStatus: 'Fully Furnished' as 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished',
    existingSetup: 'Yes' as 'Yes' | 'No',
    facilities: ['Kitchen', 'Parking', 'Lift', 'CCTV', 'Wi-Fi', 'Water Facility', 'Electricity', 'Attached Bathrooms', 'Dining Area', 'Common Area', 'Security', 'Power Backup'],
    expectedLease: '₹1.40 Lakh / Month',
    securityDeposit: '₹5.00 Lakhs',
    leaseDuration: '3 Years' as '1 Year' | '2 Years' | '3 Years' | '5+ Years' | 'Negotiable',
    availableFrom: '2026-09-01',
    leaseTerms: 'Minimum 3-year lock-in period required. Rent escalation 5% per annum.',
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'Lease_Building_Walkthrough.mp4',
    ownerName: 'Rohit Rajpoot',
    ownerPhone: '+91 62657 75558',
    ownerEmail: 'rohitrajpoot21119@gmail.com',
    contactMethod: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    description: 'Available for immediate lease to verified hostel / PG operators.'
  });

  // Form State: Buy / Requirement
  const [buyForm, setBuyForm] = useState({
    preferredLocation: 'HSR Layout / Electronic City, Bengaluru',
    minBudget: '₹1.50 Crore',
    maxBudget: '₹3.50 Crore',
    propertyType: 'Hostel' as 'Residential' | 'Commercial' | 'Hostel' | 'PG' | 'Other',
    requiredRooms: '25 - 40 Rooms',
    requiredCapacity: '50 - 80 Beds',
    minBuiltUpArea: '6000 sq ft',
    preferredFloors: '3 to 5 Floors',
    requiredFacilities: ['Kitchen', 'Parking', 'Lift', 'CCTV', 'Wi-Fi', 'Water Facility', 'Attached Bathrooms', 'Security', 'Power Backup'],
    propertyPreference: 'Ready-to-use Hostel' as 'Ready-to-use Hostel' | 'Existing PG' | 'Normal Building' | 'Any',
    buyerName: 'Rohit Rajpoot',
    buyerPhone: '+91 62657 75558',
    buyerEmail: 'rohitrajpoot21119@gmail.com',
    contactMethod: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    description: 'Looking to purchase a ready-to-use hostel or commercial building for expanding Happy Hostels chain in South Bengaluru.'
  });

  const popularLocations = [
    'Koramangala, Bengaluru',
    'HSR Layout, Bengaluru',
    'Gachibowli, Hyderabad',
    'Madhapur, Hyderabad',
    'Powai, Mumbai',
    'Janakpuri, New Delhi',
    'Viman Nagar, Pune',
    'Velachery, Chennai'
  ];

  const toggleCheckbox = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const handleCreatePreviewFromSell = () => {
    const listing: PropertyListing = {
      id: 'HH-' + Math.floor(100000 + Math.random() * 900000),
      title: sellForm.title || `${sellForm.rooms}-Room Building in ${sellForm.location.split(',')[0]}`,
      category: 'sale',
      propertyType: sellForm.propertyType,
      location: sellForm.location,
      floors: sellForm.floors,
      rooms: sellForm.rooms,
      builtUpArea: sellForm.builtUpArea,
      priceOrLease: sellForm.expectedPrice,
      currentUsage: sellForm.currentUsage,
      furnishedStatus: sellForm.furnishedStatus,
      facilities: sellForm.features,
      photos: sellForm.photos,
      videoUrl: sellForm.videoUrl,
      ownerName: sellForm.ownerName,
      ownerPhone: sellForm.ownerPhone,
      ownerEmail: sellForm.ownerEmail,
      contactMethod: sellForm.contactMethod,
      description: sellForm.description,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    setSelectedPreviewListing(listing);
    setViewMode('preview');
  };

  const handleCreatePreviewFromLease = () => {
    const listing: PropertyListing = {
      id: 'HH-' + Math.floor(100000 + Math.random() * 900000),
      title: leaseForm.title || `${leaseForm.rooms}-Room Hostel Building for Lease`,
      category: 'lease',
      propertyType: leaseForm.propertyType,
      location: leaseForm.location,
      floors: leaseForm.floors,
      rooms: leaseForm.rooms,
      capacity: leaseForm.capacity,
      builtUpArea: leaseForm.builtUpArea,
      priceOrLease: leaseForm.expectedLease,
      securityDeposit: leaseForm.securityDeposit,
      leaseDuration: leaseForm.leaseDuration,
      furnishedStatus: leaseForm.furnishedStatus,
      existingSetup: leaseForm.existingSetup,
      facilities: leaseForm.facilities,
      photos: leaseForm.photos,
      videoUrl: leaseForm.videoUrl,
      ownerName: leaseForm.ownerName,
      ownerPhone: leaseForm.ownerPhone,
      ownerEmail: leaseForm.ownerEmail,
      contactMethod: leaseForm.contactMethod,
      description: leaseForm.description,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    setSelectedPreviewListing(listing);
    setViewMode('preview');
  };

  const handleSubmitListingDirect = (listing: PropertyListing) => {
    setMyListings(prev => [listing, ...prev]);
    setLastSubmittedId(listing.id);
    setViewMode('confirmation');
    if (showToast) showToast(`Listing ${listing.id} submitted successfully!`);
  };

  const handleSubmitBuyRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'HH-' + Math.floor(100000 + Math.random() * 900000);
    const listing: PropertyListing = {
      id: newId,
      title: `Looking for ${buyForm.requiredRooms} (${buyForm.minBudget} - ${buyForm.maxBudget})`,
      category: 'buy',
      propertyType: buyForm.propertyType,
      location: buyForm.preferredLocation,
      floors: buyForm.preferredFloors,
      rooms: buyForm.requiredRooms,
      capacity: buyForm.requiredCapacity,
      builtUpArea: buyForm.minBuiltUpArea,
      priceOrLease: `${buyForm.minBudget} - ${buyForm.maxBudget}`,
      furnishedStatus: 'Fully Furnished',
      facilities: buyForm.requiredFacilities,
      photos: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'],
      ownerName: buyForm.buyerName,
      ownerPhone: buyForm.buyerPhone,
      ownerEmail: buyForm.buyerEmail,
      contactMethod: buyForm.contactMethod,
      description: buyForm.description,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    setMyListings(prev => [listing, ...prev]);
    setLastSubmittedId(newId);
    setViewMode('confirmation');
    if (showToast) showToast(`Requirement ${newId} submitted!`);
  };

  const handleDeleteListing = (id: string) => {
    setMyListings(prev => prev.filter(item => item.id !== id));
    setDeletingListingId(null);
    if (showToast) showToast(`Listing ${id} deleted`);
  };

  return (
    <div className="pmp-container">
      
      {/* TOP HEADER BAR */}
      <div className="pmp-header-bar">
        <button type="button" className="pmp-back-btn" onClick={() => {
          if (viewMode === 'main') onBack();
          else setViewMode('main');
        }}>
          <ArrowLeft size={18} />
        </button>
        
        <div className="pmp-header-title-wrap">
          <Building2 size={18} color="#2563eb" style={{ flexShrink: 0 }} />
          <h1 className="pmp-header-title">Property Marketplace</h1>
        </div>

        <button 
          type="button" 
          className="pmp-my-listings-pill"
          onClick={() => setViewMode('my-listings')}
        >
          <Tag size={12} />
          <span>My Listings ({myListings.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. MAIN MARKETPLACE LANDING SCREEN                                        */}
      {/* ========================================================================= */}
      {viewMode === 'main' && (
        <div className="pmp-main-feed">
          
          {/* HERO ANNOUNCEMENT BANNER */}
          <div className="pmp-hero-banner">
            <div className="pmp-hero-top">
              <Sparkles size={18} className="pmp-hero-sparkle" />
              <span className="pmp-hero-tag">Hostel &amp; PG Business Network</span>
            </div>
            <h2 className="pmp-hero-heading">Find or List Properties for Hostel Business</h2>
            <p className="pmp-hero-desc">
              Connect building owners with people looking to buy or lease properties for hostel/PG business seamlessly.
            </p>
          </div>

          {/* 3 MAIN ACTION CARDS */}
          <div className="pmp-cards-grid">
            
            {/* CARD 1: SELL MY BUILDING */}
            <div className="pmp-action-card sell-card">
              <div className="pmp-card-icon-wrap sell-icon-bg">
                <Building2 size={24} color="#2563eb" />
              </div>
              <div className="pmp-card-content">
                <h3 className="pmp-card-title">🏢 Sell My Building</h3>
                <p className="pmp-card-desc">I want to sell my building/property.</p>
                <button 
                  type="button" 
                  className="pmp-card-btn sell-btn"
                  onClick={() => setViewMode('sell-form')}
                >
                  <span>List Property for Sale</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* CARD 2: LEASE MY BUILDING */}
            <div className="pmp-action-card lease-card">
              <div className="pmp-card-icon-wrap lease-icon-bg">
                <KeyRound size={24} color="#16a34a" />
              </div>
              <div className="pmp-card-content">
                <h3 className="pmp-card-title">🔑 Lease My Building</h3>
                <p className="pmp-card-desc">I want to give my building/property for hostel use.</p>
                <button 
                  type="button" 
                  className="pmp-card-btn lease-btn"
                  onClick={() => setViewMode('lease-form')}
                >
                  <span>List Property for Lease</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* CARD 3: BUY A BUILDING */}
            <div className="pmp-action-card buy-card">
              <div className="pmp-card-icon-wrap buy-icon-bg">
                <HomeIcon size={24} color="#7c3aed" />
              </div>
              <div className="pmp-card-content">
                <h3 className="pmp-card-title">🏠 Buy a Building</h3>
                <p className="pmp-card-desc">I want to buy a building for hostel/PG business.</p>
                <button 
                  type="button" 
                  className="pmp-card-btn buy-btn"
                  onClick={() => setViewMode('buy-form')}
                >
                  <span>Find a Property</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* ACTIVE VERIFIED MARKETPLACE LISTINGS FEED */}
          <div className="pmp-feed-section">
            <div className="pmp-feed-header">
              <h3 className="pmp-feed-title">Active Marketplace Listings</h3>
              <span className="pmp-feed-badge">Verified Properties</span>
            </div>

            <div className="pmp-feed-list">
              {mockMarketplaceFeed.map(item => (
                <div key={item.id} className="pmp-feed-item-card">
                  <div className="pmp-item-img-wrap">
                    <img src={item.photos[0]} alt={item.title} className="pmp-item-img" />
                    <span className={`pmp-type-badge ${item.category}`}>
                      {item.category === 'sale' ? 'For Sale' : item.category === 'lease' ? 'For Lease' : 'Buy Requirement'}
                    </span>
                  </div>

                  <div className="pmp-item-body">
                    <div className="pmp-item-title">{item.title}</div>
                    <div className="pmp-item-location">
                      <MapPin size={13} color="#64748b" />
                      <span>{item.location}</span>
                    </div>

                    <div className="pmp-item-details-row">
                      <span>🏢 {item.rooms} Rooms</span>
                      <span>📐 {item.builtUpArea}</span>
                      <span>⚡ {item.furnishedStatus}</span>
                    </div>

                    <div className="pmp-item-footer">
                      <div className="pmp-item-price">{item.priceOrLease}</div>
                      <button 
                        type="button" 
                        className="pmp-item-view-btn"
                        onClick={() => {
                          setSelectedPreviewListing(item);
                          setViewMode('preview');
                        }}
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SELL MY BUILDING FORM SCREEN                                           */}
      {/* ========================================================================= */}
      {viewMode === 'sell-form' && (
        <form className="pmp-form-container" onSubmit={(e) => { e.preventDefault(); handleCreatePreviewFromSell(); }}>
          <div className="pmp-form-header">
            <h2>🏢 Sell My Building</h2>
            <p>Fill in property details to list your building for sale.</p>
          </div>

          {/* SECTION 1: PROPERTY DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Property Details</h3>
            
            <div className="pmp-field-group">
              <label>Property / Building Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Sunrise Residency Commercial Complex"
                value={sellForm.title} 
                onChange={(e) => setSellForm({ ...sellForm, title: e.target.value })}
              />
            </div>

            <div className="pmp-field-group">
              <label>Property Location *</label>
              <div className="pmp-input-with-btn">
                <input 
                  type="text" 
                  required 
                  placeholder="Street address, landmark, city"
                  value={sellForm.location} 
                  onChange={(e) => setSellForm({ ...sellForm, location: e.target.value })}
                />
                <button type="button" className="pmp-location-pick-btn" onClick={() => { setActiveLocationTarget('sell'); setIsLocationModalOpen(true); }}>
                  <MapPin size={15} /> Pick
                </button>
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Property Type *</label>
              <div className="pmp-radio-chips">
                {(['Residential', 'Commercial', 'Hostel', 'PG', 'Other'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`pmp-chip ${sellForm.propertyType === type ? 'active' : ''}`}
                    onClick={() => setSellForm({ ...sellForm, propertyType: type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Number of Floors *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 4"
                  value={sellForm.floors} 
                  onChange={(e) => setSellForm({ ...sellForm, floors: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Total Number of Rooms *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 24"
                  value={sellForm.rooms} 
                  onChange={(e) => setSellForm({ ...sellForm, rooms: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Built-up Area *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 6,500 sq ft"
                  value={sellForm.builtUpArea} 
                  onChange={(e) => setSellForm({ ...sellForm, builtUpArea: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Expected Selling Price *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹2.50 Crore"
                  value={sellForm.expectedPrice} 
                  onChange={(e) => setSellForm({ ...sellForm, expectedPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Current Usage *</label>
              <div className="pmp-radio-chips">
                {(['Hostel', 'PG', 'Residential', 'Commercial', 'Vacant'] as const).map(usage => (
                  <button
                    key={usage}
                    type="button"
                    className={`pmp-chip ${sellForm.currentUsage === usage ? 'active' : ''}`}
                    onClick={() => setSellForm({ ...sellForm, currentUsage: usage })}
                  >
                    {usage}
                  </button>
                ))}
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Furnished Status *</label>
              <div className="pmp-radio-chips">
                {(['Fully Furnished', 'Semi-Furnished', 'Unfurnished'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    className={`pmp-chip ${sellForm.furnishedStatus === f ? 'active' : ''}`}
                    onClick={() => setSellForm({ ...sellForm, furnishedStatus: f })}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: PROPERTY FEATURES (CHECKBOXES) */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Property Features</h3>
            <div className="pmp-checkboxes-grid">
              {[
                'Kitchen Available',
                'Parking Available',
                'Lift Available',
                'CCTV Available',
                'Wi-Fi Available',
                'Water Facility',
                'Electricity Connection',
                'Attached Bathrooms',
                'Hostel Infrastructure Available'
              ].map(feature => {
                const isChecked = sellForm.features.includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    className={`pmp-checkbox-btn ${isChecked ? 'active' : ''}`}
                    onClick={() => setSellForm({ ...sellForm, features: toggleCheckbox(sellForm.features, feature) })}
                  >
                    <div className="pmp-box">{isChecked && <Check size={12} />}</div>
                    <span>{feature}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: PROPERTY PHOTOS & VIDEOS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Property Photos &amp; Video</h3>
            
            <div className="pmp-media-actions-row">
              <button type="button" className="pmp-upload-btn" onClick={() => { if (showToast) showToast('Photo dropzone simulated. Image added to gallery!'); }}>
                <ImageIcon size={16} />
                <span>+ Upload Photos</span>
              </button>

              <button type="button" className="pmp-upload-btn alt" onClick={() => { if (showToast) showToast('Property Walkthrough Video attached!'); }}>
                <Video size={16} />
                <span>+ Upload Video</span>
              </button>
            </div>

            {/* Gallery Thumbnails */}
            <div className="pmp-thumbnails-preview">
              {sellForm.photos.map((url, idx) => (
                <div key={idx} className="pmp-thumb-box">
                  <img src={url} alt={`Upload ${idx}`} />
                </div>
              ))}
              <div className="pmp-video-attached-tag">
                <Video size={13} color="#2563eb" />
                <span>{sellForm.videoUrl}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: OWNER DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Owner Details</h3>
            
            <div className="pmp-field-group">
              <label>Owner Name *</label>
              <input 
                type="text" 
                required 
                value={sellForm.ownerName} 
                onChange={(e) => setSellForm({ ...sellForm, ownerName: e.target.value })}
              />
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Mobile Number *</label>
                <input 
                  type="text" 
                  required 
                  value={sellForm.ownerPhone} 
                  onChange={(e) => setSellForm({ ...sellForm, ownerPhone: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  value={sellForm.ownerEmail} 
                  onChange={(e) => setSellForm({ ...sellForm, ownerEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Preferred Contact Method *</label>
              <div className="pmp-radio-chips">
                {(['Phone', 'WhatsApp', 'Email'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    className={`pmp-chip ${sellForm.contactMethod === method ? 'active' : ''}`}
                    onClick={() => setSellForm({ ...sellForm, contactMethod: method })}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: ADDITIONAL INFORMATION */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Additional Information</h3>
            <textarea 
              rows={3}
              placeholder="Tell us more about your property (e.g., surrounding area, nearby colleges/IT parks, exact age of building...)"
              value={sellForm.description}
              onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
            />
          </div>

          {/* ACTIONS */}
          <div className="pmp-form-footer-actions">
            <button 
              type="submit" 
              className="pmp-btn-secondary"
            >
              <Eye size={16} /> Preview Listing
            </button>

            <button 
              type="button" 
              className="pmp-btn-primary"
              onClick={() => {
                handleCreatePreviewFromSell();
                handleSubmitListingDirect({
                  id: 'HH-' + Math.floor(100000 + Math.random() * 900000),
                  title: sellForm.title || `${sellForm.rooms}-Room Building in ${sellForm.location.split(',')[0]}`,
                  category: 'sale',
                  propertyType: sellForm.propertyType,
                  location: sellForm.location,
                  floors: sellForm.floors,
                  rooms: sellForm.rooms,
                  builtUpArea: sellForm.builtUpArea,
                  priceOrLease: sellForm.expectedPrice,
                  currentUsage: sellForm.currentUsage,
                  furnishedStatus: sellForm.furnishedStatus,
                  facilities: sellForm.features,
                  photos: sellForm.photos,
                  videoUrl: sellForm.videoUrl,
                  ownerName: sellForm.ownerName,
                  ownerPhone: sellForm.ownerPhone,
                  ownerEmail: sellForm.ownerEmail,
                  contactMethod: sellForm.contactMethod,
                  description: sellForm.description,
                  submissionDate: new Date().toISOString().split('T')[0],
                  status: 'Pending Verification'
                });
              }}
            >
              Submit Property
            </button>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. LEASE MY BUILDING FORM SCREEN                                          */}
      {/* ========================================================================= */}
      {viewMode === 'lease-form' && (
        <form className="pmp-form-container" onSubmit={(e) => { e.preventDefault(); handleCreatePreviewFromLease(); }}>
          <div className="pmp-form-header">
            <h2>🔑 Lease My Building</h2>
            <p>Give your building/property for lease to a hostel or PG operator.</p>
          </div>

          {/* SECTION 1: PROPERTY DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Property Details</h3>
            
            <div className="pmp-field-group">
              <label>Property / Building Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Sunrise Heights PG Building"
                value={leaseForm.title} 
                onChange={(e) => setLeaseForm({ ...leaseForm, title: e.target.value })}
              />
            </div>

            <div className="pmp-field-group">
              <label>Location *</label>
              <div className="pmp-input-with-btn">
                <input 
                  type="text" 
                  required 
                  placeholder="Property locality and city"
                  value={leaseForm.location} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, location: e.target.value })}
                />
                <button type="button" className="pmp-location-pick-btn" onClick={() => { setActiveLocationTarget('lease'); setIsLocationModalOpen(true); }}>
                  <MapPin size={15} /> Pick
                </button>
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Number of Floors *</label>
                <input 
                  type="text" 
                  required 
                  value={leaseForm.floors} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, floors: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Number of Rooms *</label>
                <input 
                  type="text" 
                  required 
                  value={leaseForm.rooms} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, rooms: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Maximum Occupancy / Capacity *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 56 Beds"
                  value={leaseForm.capacity} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, capacity: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Built-up Area *</label>
                <input 
                  type="text" 
                  required 
                  value={leaseForm.builtUpArea} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, builtUpArea: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Furnished Status *</label>
              <div className="pmp-radio-chips">
                {(['Fully Furnished', 'Semi-Furnished', 'Unfurnished'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    className={`pmp-chip ${leaseForm.furnishedStatus === f ? 'active' : ''}`}
                    onClick={() => setLeaseForm({ ...leaseForm, furnishedStatus: f })}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Existing Hostel Setup? *</label>
              <div className="pmp-radio-chips">
                {(['Yes', 'No'] as const).map(ans => (
                  <button
                    key={ans}
                    type="button"
                    className={`pmp-chip ${leaseForm.existingSetup === ans ? 'active' : ''}`}
                    onClick={() => setLeaseForm({ ...leaseForm, existingSetup: ans })}
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: FACILITIES (CHECKBOXES) */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Facilities Available</h3>
            <div className="pmp-checkboxes-grid">
              {[
                'Kitchen',
                'Parking',
                'Lift',
                'CCTV',
                'Wi-Fi',
                'Water Facility',
                'Electricity',
                'Attached Bathrooms',
                'Dining Area',
                'Common Area',
                'Security',
                'Power Backup'
              ].map(fac => {
                const isChecked = leaseForm.facilities.includes(fac);
                return (
                  <button
                    key={fac}
                    type="button"
                    className={`pmp-checkbox-btn ${isChecked ? 'active' : ''}`}
                    onClick={() => setLeaseForm({ ...leaseForm, facilities: toggleCheckbox(leaseForm.facilities, fac) })}
                  >
                    <div className="pmp-box">{isChecked && <Check size={12} />}</div>
                    <span>{fac}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: LEASE DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Lease Terms &amp; Financials</h3>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Expected Monthly Lease Amount *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹1.40 Lakh / Month"
                  value={leaseForm.expectedLease} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, expectedLease: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Security Deposit *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹5.00 Lakhs"
                  value={leaseForm.securityDeposit} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, securityDeposit: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Preferred Lease Duration *</label>
              <div className="pmp-radio-chips">
                {(['1 Year', '2 Years', '3 Years', '5+ Years', 'Negotiable'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`pmp-chip ${leaseForm.leaseDuration === d ? 'active' : ''}`}
                    onClick={() => setLeaseForm({ ...leaseForm, leaseDuration: d })}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Available From *</label>
              <input 
                type="date" 
                required 
                value={leaseForm.availableFrom} 
                onChange={(e) => setLeaseForm({ ...leaseForm, availableFrom: e.target.value })}
              />
            </div>

            <div className="pmp-field-group">
              <label>Lease Terms / Conditions</label>
              <textarea 
                rows={2}
                placeholder="Specify lock-in period, rent escalation clauses, or tenant preferences..."
                value={leaseForm.leaseTerms}
                onChange={(e) => setLeaseForm({ ...leaseForm, leaseTerms: e.target.value })}
              />
            </div>
          </div>

          {/* SECTION 4: PHOTOS & VIDEOS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Photos &amp; Video Walkthrough</h3>
            
            <div className="pmp-media-actions-row">
              <button type="button" className="pmp-upload-btn" onClick={() => { if (showToast) showToast('Photo uploaded!'); }}>
                <ImageIcon size={16} />
                <span>+ Upload Property Photos</span>
              </button>

              <button type="button" className="pmp-upload-btn alt" onClick={() => { if (showToast) showToast('Video attached!'); }}>
                <Video size={16} />
                <span>+ Upload Property Video</span>
              </button>
            </div>

            <div className="pmp-thumbnails-preview">
              {leaseForm.photos.map((url, idx) => (
                <div key={idx} className="pmp-thumb-box">
                  <img src={url} alt={`Upload ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: OWNER DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Owner Details</h3>
            
            <div className="pmp-field-group">
              <label>Owner Name *</label>
              <input 
                type="text" 
                required 
                value={leaseForm.ownerName} 
                onChange={(e) => setLeaseForm({ ...leaseForm, ownerName: e.target.value })}
              />
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Mobile Number *</label>
                <input 
                  type="text" 
                  required 
                  value={leaseForm.ownerPhone} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, ownerPhone: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  value={leaseForm.ownerEmail} 
                  onChange={(e) => setLeaseForm({ ...leaseForm, ownerEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Preferred Contact Method *</label>
              <div className="pmp-radio-chips">
                {(['Phone', 'WhatsApp', 'Email'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    className={`pmp-chip ${leaseForm.contactMethod === method ? 'active' : ''}`}
                    onClick={() => setLeaseForm({ ...leaseForm, contactMethod: method })}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 6: DESCRIPTION */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Description</h3>
            <textarea 
              rows={3}
              placeholder="Provide additional information for hostel operators..."
              value={leaseForm.description}
              onChange={(e) => setLeaseForm({ ...leaseForm, description: e.target.value })}
            />
          </div>

          {/* ACTIONS */}
          <div className="pmp-form-footer-actions">
            <button 
              type="submit" 
              className="pmp-btn-secondary"
            >
              <Eye size={16} /> Preview Listing
            </button>

            <button 
              type="button" 
              className="pmp-btn-primary"
              onClick={() => {
                handleCreatePreviewFromLease();
                handleSubmitListingDirect({
                  id: 'HH-' + Math.floor(100000 + Math.random() * 900000),
                  title: leaseForm.title || `${leaseForm.rooms}-Room Hostel Building for Lease`,
                  category: 'lease',
                  propertyType: leaseForm.propertyType,
                  location: leaseForm.location,
                  floors: leaseForm.floors,
                  rooms: leaseForm.rooms,
                  capacity: leaseForm.capacity,
                  builtUpArea: leaseForm.builtUpArea,
                  priceOrLease: leaseForm.expectedLease,
                  securityDeposit: leaseForm.securityDeposit,
                  leaseDuration: leaseForm.leaseDuration,
                  furnishedStatus: leaseForm.furnishedStatus,
                  existingSetup: leaseForm.existingSetup,
                  facilities: leaseForm.facilities,
                  photos: leaseForm.photos,
                  videoUrl: leaseForm.videoUrl,
                  ownerName: leaseForm.ownerName,
                  ownerPhone: leaseForm.ownerPhone,
                  ownerEmail: leaseForm.ownerEmail,
                  contactMethod: leaseForm.contactMethod,
                  description: leaseForm.description,
                  submissionDate: new Date().toISOString().split('T')[0],
                  status: 'Pending Verification'
                });
              }}
            >
              Submit Property
            </button>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* 4. BUY A BUILDING FORM SCREEN                                             */}
      {/* ========================================================================= */}
      {viewMode === 'buy-form' && (
        <form className="pmp-form-container" onSubmit={handleSubmitBuyRequirement}>
          <div className="pmp-form-header">
            <h2>🏠 Find a Building</h2>
            <p>Find a suitable property for your hostel or PG business.</p>
          </div>

          {/* SECTION 1: REQUIREMENTS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Requirements</h3>
            
            <div className="pmp-field-group">
              <label>Preferred Location *</label>
              <div className="pmp-input-with-btn">
                <input 
                  type="text" 
                  required 
                  placeholder="Target area, locality or city"
                  value={buyForm.preferredLocation} 
                  onChange={(e) => setBuyForm({ ...buyForm, preferredLocation: e.target.value })}
                />
                <button type="button" className="pmp-location-pick-btn" onClick={() => { setActiveLocationTarget('buy'); setIsLocationModalOpen(true); }}>
                  <MapPin size={15} /> Pick
                </button>
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Minimum Budget *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹1.50 Crore"
                  value={buyForm.minBudget} 
                  onChange={(e) => setBuyForm({ ...buyForm, minBudget: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Maximum Budget *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹3.50 Crore"
                  value={buyForm.maxBudget} 
                  onChange={(e) => setBuyForm({ ...buyForm, maxBudget: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Property Type *</label>
              <div className="pmp-radio-chips">
                {(['Residential', 'Commercial', 'Hostel', 'PG', 'Other'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`pmp-chip ${buyForm.propertyType === t ? 'active' : ''}`}
                    onClick={() => setBuyForm({ ...buyForm, propertyType: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Required Number of Rooms *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 25 - 40 Rooms"
                  value={buyForm.requiredRooms} 
                  onChange={(e) => setBuyForm({ ...buyForm, requiredRooms: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Required Capacity *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 50 - 80 Beds"
                  value={buyForm.requiredCapacity} 
                  onChange={(e) => setBuyForm({ ...buyForm, requiredCapacity: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Minimum Built-up Area *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 6000 sq ft"
                  value={buyForm.minBuiltUpArea} 
                  onChange={(e) => setBuyForm({ ...buyForm, minBuiltUpArea: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Preferred Number of Floors</label>
                <input 
                  type="text" 
                  placeholder="e.g. 3 to 5 Floors"
                  value={buyForm.preferredFloors} 
                  onChange={(e) => setBuyForm({ ...buyForm, preferredFloors: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: REQUIRED FACILITIES */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Required Facilities</h3>
            <div className="pmp-checkboxes-grid">
              {[
                'Kitchen',
                'Parking',
                'Lift',
                'CCTV',
                'Wi-Fi',
                'Water Facility',
                'Attached Bathrooms',
                'Dining Area',
                'Security',
                'Power Backup'
              ].map(fac => {
                const isChecked = buyForm.requiredFacilities.includes(fac);
                return (
                  <button
                    key={fac}
                    type="button"
                    className={`pmp-checkbox-btn ${isChecked ? 'active' : ''}`}
                    onClick={() => setBuyForm({ ...buyForm, requiredFacilities: toggleCheckbox(buyForm.requiredFacilities, fac) })}
                  >
                    <div className="pmp-box">{isChecked && <Check size={12} />}</div>
                    <span>{fac}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: PROPERTY PREFERENCE (RADIO BUTTONS) */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Property Preference</h3>
            <div className="pmp-radio-chips">
              {(['Ready-to-use Hostel', 'Existing PG', 'Normal Building', 'Any'] as const).map(pref => (
                <button
                  key={pref}
                  type="button"
                  className={`pmp-chip ${buyForm.propertyPreference === pref ? 'active' : ''}`}
                  onClick={() => setBuyForm({ ...buyForm, propertyPreference: pref })}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 4: BUYER DETAILS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Buyer Details</h3>
            
            <div className="pmp-field-group">
              <label>Name *</label>
              <input 
                type="text" 
                required 
                value={buyForm.buyerName} 
                onChange={(e) => setBuyForm({ ...buyForm, buyerName: e.target.value })}
              />
            </div>

            <div className="pmp-field-row">
              <div className="pmp-field-group">
                <label>Mobile Number *</label>
                <input 
                  type="text" 
                  required 
                  value={buyForm.buyerPhone} 
                  onChange={(e) => setBuyForm({ ...buyForm, buyerPhone: e.target.value })}
                />
              </div>

              <div className="pmp-field-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  value={buyForm.buyerEmail} 
                  onChange={(e) => setBuyForm({ ...buyForm, buyerEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="pmp-field-group">
              <label>Preferred Contact Method *</label>
              <div className="pmp-radio-chips">
                {(['Phone', 'WhatsApp', 'Email'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`pmp-chip ${buyForm.contactMethod === m ? 'active' : ''}`}
                    onClick={() => setBuyForm({ ...buyForm, contactMethod: m })}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: ADDITIONAL REQUIREMENTS */}
          <div className="pmp-form-section">
            <h3 className="pmp-sec-title">Additional Requirements</h3>
            <textarea 
              rows={3}
              placeholder="Describe what type of building you are looking for..."
              value={buyForm.description}
              onChange={(e) => setBuyForm({ ...buyForm, description: e.target.value })}
            />
          </div>

          <div className="pmp-form-footer-actions">
            <button 
              type="submit" 
              className="pmp-btn-primary full-width"
            >
              Submit Requirement
            </button>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* 5. PROPERTY PREVIEW PAGE SCREEN                                           */}
      {/* ========================================================================= */}
      {viewMode === 'preview' && selectedPreviewListing && (
        <div className="pmp-preview-container">
          <div className="pmp-preview-header">
            <h2>Preview Property Listing</h2>
            <span className="pmp-preview-subtitle">Verify details before final submission to marketplace</span>
          </div>

          {/* IMAGES CAROUSEL / GALLERY */}
          <div className="pmp-preview-hero-img-wrap">
            <img 
              src={selectedPreviewListing.photos[0]} 
              alt={selectedPreviewListing.title} 
              className="pmp-preview-hero-img"
            />
            <div className="pmp-preview-img-count">
              <ImageIcon size={14} /> {selectedPreviewListing.photos.length} Photos
            </div>
          </div>

          {/* PROPERTY INFORMATION */}
          <div className="pmp-preview-card">
            <div className="pmp-preview-title-row">
              <h3 className="pmp-preview-title">{selectedPreviewListing.title}</h3>
              <span className={`pmp-type-badge ${selectedPreviewListing.category}`}>
                {selectedPreviewListing.category === 'sale' ? 'For Sale' : selectedPreviewListing.category === 'lease' ? 'For Lease' : 'Buy Requirement'}
              </span>
            </div>

            <div className="pmp-preview-location">
              <MapPin size={15} color="#2563eb" />
              <span>{selectedPreviewListing.location}</span>
            </div>

            <div className="pmp-preview-specs-grid">
              <div className="pmp-spec-box">
                <span className="lbl">Property Type</span>
                <span className="val">{selectedPreviewListing.propertyType}</span>
              </div>
              <div className="pmp-spec-box">
                <span className="lbl">Floors</span>
                <span className="val">{selectedPreviewListing.floors} Floors</span>
              </div>
              <div className="pmp-spec-box">
                <span className="lbl">Total Rooms</span>
                <span className="val">{selectedPreviewListing.rooms} Rooms</span>
              </div>
              <div className="pmp-spec-box">
                <span className="lbl">Built-up Area</span>
                <span className="val">{selectedPreviewListing.builtUpArea}</span>
              </div>
              {selectedPreviewListing.capacity && (
                <div className="pmp-spec-box">
                  <span className="lbl">Capacity</span>
                  <span className="val">{selectedPreviewListing.capacity}</span>
                </div>
              )}
              <div className="pmp-spec-box">
                <span className="lbl">Furnishing</span>
                <span className="val">{selectedPreviewListing.furnishedStatus}</span>
              </div>
            </div>
          </div>

          {/* FINANCIAL DETAILS */}
          <div className="pmp-preview-card highlight-financials">
            <h4 className="pmp-card-subhead">Financial Details</h4>
            <div className="pmp-financials-row">
              <div>
                <span className="lbl">
                  {selectedPreviewListing.category === 'sale' ? 'Selling Price' : 'Monthly Lease'}
                </span>
                <div className="pmp-price-large">{selectedPreviewListing.priceOrLease}</div>
              </div>

              {selectedPreviewListing.securityDeposit && (
                <div>
                  <span className="lbl">Security Deposit</span>
                  <div className="val-bold">{selectedPreviewListing.securityDeposit}</div>
                </div>
              )}

              {selectedPreviewListing.leaseDuration && (
                <div>
                  <span className="lbl">Lease Duration</span>
                  <div className="val-bold">{selectedPreviewListing.leaseDuration}</div>
                </div>
              )}
            </div>
          </div>

          {/* FACILITIES CHIPS */}
          <div className="pmp-preview-card">
            <h4 className="pmp-card-subhead">Facilities &amp; Amenities</h4>
            <div className="pmp-chips-container">
              {selectedPreviewListing.facilities.map((fac, idx) => (
                <span key={idx} className="pmp-facility-chip">
                  <CheckCircle2 size={13} color="#16a34a" /> {fac}
                </span>
              ))}
            </div>
          </div>

          {/* OWNER INFORMATION */}
          <div className="pmp-preview-card">
            <h4 className="pmp-card-subhead">Owner Contact Information</h4>
            <div className="pmp-owner-info-grid">
              <div>
                <span className="lbl">Owner Name</span>
                <span className="val">{selectedPreviewListing.ownerName}</span>
              </div>
              <div>
                <span className="lbl">Mobile Number</span>
                <span className="val">{selectedPreviewListing.ownerPhone}</span>
              </div>
              <div>
                <span className="lbl">Email Address</span>
                <span className="val">{selectedPreviewListing.ownerEmail}</span>
              </div>
              <div>
                <span className="lbl">Preferred Contact</span>
                <span className="val highlight-blue">{selectedPreviewListing.contactMethod}</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="pmp-preview-card">
            <h4 className="pmp-card-subhead">Property Description</h4>
            <p className="pmp-preview-desc-text">{selectedPreviewListing.description}</p>
          </div>

          {/* BOTTOM BUTTONS */}
          <div className="pmp-form-footer-actions">
            <button 
              type="button" 
              className="pmp-btn-secondary"
              onClick={() => {
                if (selectedPreviewListing.category === 'sale') setViewMode('sell-form');
                else if (selectedPreviewListing.category === 'lease') setViewMode('lease-form');
                else setViewMode('buy-form');
              }}
            >
              <Edit3 size={16} /> Edit
            </button>

            <button 
              type="button" 
              className="pmp-btn-primary"
              onClick={() => handleSubmitListingDirect(selectedPreviewListing)}
            >
              Submit Listing
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SUBMISSION CONFIRMATION SCREEN                                         */}
      {/* ========================================================================= */}
      {viewMode === 'confirmation' && (
        <div className="pmp-confirmation-card">
          <div className="pmp-success-icon-wrap">
            <CheckCircle2 size={44} color="#16a34a" />
          </div>

          <h2 className="pmp-conf-title">✅ Property Submitted Successfully</h2>
          <p className="pmp-conf-desc">
            Your property has been submitted to Happy Hostel for verification.
          </p>

          <div className="pmp-listing-id-pill">
            <span className="lbl">Listing ID:</span>
            <strong className="id-val">{lastSubmittedId}</strong>
          </div>

          <div className="pmp-status-pill-wrap">
            <Clock size={15} color="#d97706" />
            <span className="status-lbl">Status: <strong>Pending Verification</strong></span>
          </div>

          <div className="pmp-conf-actions-col">
            <button 
              type="button" 
              className="pmp-btn-primary full-width"
              onClick={() => setViewMode('my-listings')}
            >
              View My Listings
            </button>

            <button 
              type="button" 
              className="pmp-btn-secondary full-width"
              onClick={() => setViewMode('main')}
            >
              Back to Property Marketplace
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MY PROPERTY LISTINGS SCREEN                                            */}
      {/* ========================================================================= */}
      {viewMode === 'my-listings' && (
        <div className="pmp-my-listings-container">
          <div className="pmp-my-listings-header">
            <div>
              <h2>My Property Listings</h2>
              <p>Manage and track verification status of all your submitted properties.</p>
            </div>

            <button 
              type="button" 
              className="pmp-add-listing-btn"
              onClick={() => setViewMode('main')}
            >
              <Plus size={16} /> + New Listing
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="pmp-empty-state">
              <Building size={36} color="#94a3b8" />
              <h3>No Property Listings Found</h3>
              <p>You haven't listed any properties yet. List your property for sale or lease now.</p>
              <button 
                type="button" 
                className="pmp-btn-primary"
                onClick={() => setViewMode('main')}
              >
                Go to Marketplace
              </button>
            </div>
          ) : (
            <div className="pmp-my-listings-list">
              {myListings.map(item => (
                <div key={item.id} className="pmp-my-item-card">
                  
                  {/* CARD HEADER / THUMBNAIL */}
                  <div className="pmp-my-card-top">
                    <img src={item.photos[0]} alt={item.title} className="pmp-my-thumb" />
                    
                    <div className="pmp-my-card-info">
                      <div className="pmp-my-id-row">
                        <span className="id-badge">{item.id}</span>
                        <span className={`pmp-type-badge ${item.category}`}>
                          {item.category === 'sale' ? 'For Sale' : item.category === 'lease' ? 'For Lease' : 'Buy Requirement'}
                        </span>
                      </div>

                      <h3 className="pmp-my-title">{item.title}</h3>
                      
                      <div className="pmp-my-loc">
                        <MapPin size={13} color="#64748b" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE & STATUS ROW */}
                  <div className="pmp-my-card-mid">
                    <div>
                      <div className="pmp-my-price">{item.priceOrLease}</div>
                      <div className="pmp-my-date">Submitted on {item.submissionDate}</div>
                    </div>

                    <span className={`pmp-status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="pmp-my-card-actions">
                    <button 
                      type="button" 
                      className="pmp-act-btn view"
                      onClick={() => {
                        setSelectedPreviewListing(item);
                        setViewMode('preview');
                      }}
                    >
                      <Eye size={14} /> View
                    </button>

                    <button 
                      type="button" 
                      className="pmp-act-btn edit"
                      onClick={() => {
                        setSelectedPreviewListing(item);
                        if (item.category === 'sale') setViewMode('sell-form');
                        else if (item.category === 'lease') setViewMode('lease-form');
                        else setViewMode('buy-form');
                      }}
                    >
                      <Edit3 size={14} /> Edit
                    </button>

                    <button 
                      type="button" 
                      className="pmp-act-btn delete"
                      onClick={() => setDeletingListingId(item.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* LOCATION SELECTION MAP PICKER MODAL                                      */}
      {/* ========================================================================= */}
      {isLocationModalOpen && (
        <div className="wizard-modal-backdrop" onClick={() => setIsLocationModalOpen(false)}>
          <div className="booking-view-modal-card" style={{ maxWidth: '420px', borderRadius: '20px' }} onClick={(e) => e.stopPropagation()}>
            
            <div className="view-modal-header">
              <div className="view-modal-title-wrap">
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} />
                </div>
                <h3 className="view-modal-title">Select Property Location</h3>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setIsLocationModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="view-modal-body" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Simulated Map Visual */}
              <div style={{
                height: '140px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                border: '1px solid #7dd3fc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <MapPin size={32} color="#0284c7" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1', marginTop: '6px' }}>Interactive Location Pin</span>
                <span style={{ fontSize: '10px', color: '#0284c7' }}>Tap popular hub below to auto-fill</span>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Popular Hostel &amp; PG Business Hubs:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {popularLocations.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      if (activeLocationTarget === 'sell') setSellForm({ ...sellForm, location: loc });
                      else if (activeLocationTarget === 'lease') setLeaseForm({ ...leaseForm, location: loc });
                      else setBuyForm({ ...buyForm, preferredLocation: loc });
                      setIsLocationModalOpen(false);
                      if (showToast) showToast(`Selected location: ${loc}`);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      borderRadius: '12px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <MapPin size={16} color="#2563eb" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>

            </div>

            <div className="view-modal-footer">
              <button 
                type="button"
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => setIsLocationModalOpen(false)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                 */}
      {/* ========================================================================= */}
      {deletingListingId && (
        <div className="wizard-modal-backdrop" onClick={() => setDeletingListingId(null)}>
          <div className="booking-view-modal-card" style={{ maxWidth: '360px', borderRadius: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="view-modal-header" style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
              <div className="view-modal-title-wrap">
                <AlertCircle size={20} color="#dc2626" />
                <h3 className="view-modal-title" style={{ color: '#991b1b' }}>Delete Property Listing?</h3>
              </div>
            </div>

            <div className="view-modal-body" style={{ padding: '16px', fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
              Are you sure you want to delete listing <strong>{deletingListingId}</strong>? This action cannot be undone.
            </div>

            <div className="view-modal-footer" style={{ padding: '12px 16px', gap: '10px' }}>
              <button 
                type="button"
                style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => setDeletingListingId(null)}
              >
                Cancel
              </button>
              <button 
                type="button"
                style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#dc2626', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => handleDeleteListing(deletingListingId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
