import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  AlertCircle, 
  TrendingUp, 
  Receipt, 
  CheckCircle2, 
  ChevronRight,
  ChevronDown,
  Crown,
  Award,
  Sparkles,
  UserCheck,
  Megaphone,
  BarChart2,
  Check
} from 'lucide-react';

interface KitchenHomePageProps {
  userName?: string;
  currentHostel?: string;
  currentPlan?: 'Bronze' | 'Gold' | 'Platinum';
  onSelectHostel?: (hostelName: string) => void;
  onNavigateTab?: (tab: 'requests' | 'fees' | 'rooms' | 'laundry' | 'broadcast' | 'settings' | 'kitchen') => void;
  onNavigateScreen?: (screen: string) => void;
  showToast?: (msg: string) => void;
}

export const KitchenHomePage: React.FC<KitchenHomePageProps> = ({ 
  userName = 'Vijaya',
  currentHostel = 'Happy Hostels',
  currentPlan = 'Gold',
  onSelectHostel,
  onNavigateTab, 
  onNavigateScreen,
  showToast 
}) => {
  const [selectedHostelName, setSelectedHostelName] = useState(currentHostel);
  const [isHostelDropdownOpen, setIsHostelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableHostels = [
    'Happy Hostels',
    'Sunrise Residency',
    'Akshara Ladies Hostel',
    'Greenwood Stays'
  ];

  useEffect(() => {
    setSelectedHostelName(currentHostel);
  }, [currentHostel]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsHostelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHostelChange = (name: string) => {
    setSelectedHostelName(name);
    if (onSelectHostel) onSelectHostel(name);
    setIsHostelDropdownOpen(false);
    if (showToast) showToast(`Switched to ${name}`);
  };

  return (
    <div className="home-dashboard-container">
      {/* Top Royal Blue Header */}
      <div className="home-blue-header">
        <div className="header-top-row">
          <div className="header-welcome-text">
            Welcome, {userName}
          </div>

          <div className="header-top-right">
            <button 
              type="button" 
              className={`gold-plan-badge badge-${currentPlan.toLowerCase()}`}
              onClick={() => onNavigateScreen && onNavigateScreen('subscription-plans')}
              title="Click to view & upgrade Subscription Plans"
            >
              {currentPlan === 'Bronze' && <Award size={12} className="gold-crown-icon" />}
              {currentPlan === 'Gold' && <Crown size={12} className="gold-crown-icon" />}
              {currentPlan === 'Platinum' && <Sparkles size={12} className="gold-crown-icon" />}
              <span>{currentPlan.toUpperCase()} PLAN</span>
            </button>
          </div>
        </div>

        {/* Hostel Selector Dropdown Pill */}
        <div className="hostel-selector-container" ref={dropdownRef}>
          <button 
            type="button" 
            className="hostel-selector-btn"
            onClick={() => setIsHostelDropdownOpen(prev => !prev)}
          >
            <span>{selectedHostelName}</span>
            <ChevronDown size={14} className={`selector-chevron ${isHostelDropdownOpen ? 'rotate' : ''}`} />
          </button>

          {isHostelDropdownOpen && (
            <div className="hostel-dropdown-menu">
              {availableHostels.map((h) => (
                <div 
                  key={h}
                  className={`hostel-dropdown-item ${selectedHostelName === h ? 'selected' : ''}`}
                  onClick={() => handleHostelChange(h)}
                >
                  <span>{h}</span>
                  {selectedHostelName === h && <Check size={13} color="#2563eb" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Dashboard Content Area */}
      <div className="home-dashboard-content">
        {/* Occupancy Rate Card */}
        <div 
          className="occupancy-card" 
          style={{ cursor: 'pointer' }} 
          onClick={() => { 
            if (onNavigateScreen) onNavigateScreen('occupancy-rate');
            else if (onNavigateTab) onNavigateTab('rooms'); 
          }}
        >
          <div className="occupancy-card-left">
            <div className="occupancy-card-label">Occupancy Rate</div>
            <div className="occupancy-card-value">88%</div>
            <div className="occupancy-progress-bg">
              <div className="occupancy-progress-fill" style={{ width: '88%' }} />
            </div>
            <div className="occupancy-card-subtext">96 / 110 Beds Occupied</div>
          </div>
          <div className="occupancy-card-right">
            <img 
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=300&q=80" 
              alt="Hostel Building" 
              className="hostel-card-image"
            />
          </div>
        </div>

        {/* Needs Attention Section (2-Column Grid) */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Needs Attention</h2>
          
          <div className="needs-attention-grid-2col">
            {/* Card 1: Overdue Dues */}
            <div 
              className="kpi-card-2col"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('overdue-dues');
                else if (onNavigateTab) onNavigateTab('fees');
              }}
            >
              <div className="kpi-card-top-row">
                <div className="kpi-icon-badge bg-rose">
                  <AlertTriangle size={15} color="#ef4444" />
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
              <div className="kpi-card-content-wrap">
                <div className="kpi-card-value-text">₹43,500</div>
                <div className="kpi-card-label-text">Overdue Dues</div>
              </div>
            </div>

            {/* Card 2: Open Complaints */}
            <div 
              className="kpi-card-2col"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('open-complaints');
                else if (onNavigateTab) onNavigateTab('requests');
              }}
            >
              <div className="kpi-card-top-row">
                <div className="kpi-icon-badge bg-purple">
                  <AlertCircle size={15} color="#8b5cf6" />
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
              <div className="kpi-card-content-wrap">
                <div className="kpi-card-value-text">5</div>
                <div className="kpi-card-label-text">Complaints</div>
              </div>
            </div>

            {/* Card 3: Revenue */}
            <div 
              className="kpi-card-2col"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('revenue-analytics');
                else if (onNavigateTab) onNavigateTab('fees');
              }}
            >
              <div className="kpi-card-top-row">
                <div className="kpi-icon-badge bg-emerald">
                  <TrendingUp size={15} color="#10b981" />
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
              <div className="kpi-card-content-wrap">
                <div className="kpi-card-value-text">₹1,45,000</div>
                <div className="kpi-card-label-text">Revenue</div>
              </div>
            </div>

            {/* Card 4: Expenses */}
            <div 
              className="kpi-card-2col" 
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('expenses-management');
                else if (onNavigateTab) onNavigateTab('fees');
              }} 
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-card-top-row">
                <div className="kpi-icon-badge bg-indigo">
                  <Receipt size={15} color="#6366f1" />
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
              <div className="kpi-card-content-wrap">
                <div className="kpi-card-value-text">₹45,000</div>
                <div className="kpi-card-label-text">Expenses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Section */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Manage</h2>

          <div className="manage-shortcuts-row">
            {/* Shortcut 1: Staff */}
            <button 
              type="button" 
              className="shortcut-card"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('staff-management');
                else if (onNavigateTab) onNavigateTab('fees');
              }}
            >
              <div className="shortcut-icon-box bg-purple-light">
                <UserCheck size={18} color="#7c3aed" />
              </div>
              <span className="shortcut-label">Staff</span>
            </button>

            {/* Shortcut 2: Requests */}
            <button 
              type="button" 
              className="shortcut-card"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('booking-requests');
                else if (onNavigateTab) onNavigateTab('requests');
              }}
            >
              <div className="shortcut-icon-box bg-pink-light">
                <Calendar size={18} color="#db2777" />
              </div>
              <span className="shortcut-label">Requests</span>
            </button>

            {/* Shortcut 3: Broadcast */}
            <button 
              type="button" 
              className="shortcut-card"
              onClick={() => {
                if (onNavigateTab) onNavigateTab('broadcast');
              }}
            >
              <div className="shortcut-icon-box bg-amber-light">
                <Megaphone size={18} color="#d97706" />
              </div>
              <span className="shortcut-label">Broadcast</span>
            </button>

            {/* Shortcut 4: Success Rate */}
            <button 
              type="button" 
              className="shortcut-card"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('success-rate');
                else if (onNavigateTab) onNavigateTab('fees');
              }}
            >
              <div className="shortcut-icon-box bg-indigo-light">
                <CheckCircle2 size={18} color="#4f46e5" />
              </div>
              <span className="shortcut-label">Success Rate</span>
            </button>

            {/* Shortcut 5: Analytics */}
            <button 
              type="button" 
              className="shortcut-card"
              onClick={() => {
                if (onNavigateScreen) onNavigateScreen('revenue-analytics');
                else if (onNavigateTab) onNavigateTab('fees');
              }}
            >
              <div className="shortcut-icon-box bg-emerald-light">
                <BarChart2 size={18} color="#059669" />
              </div>
              <span className="shortcut-label">Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenHomePage;
