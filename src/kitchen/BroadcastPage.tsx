import React, { useState, useEffect, useRef } from 'react';
import { 
  Megaphone, 
  AlertTriangle, 
  AlertCircle, 
  Gift, 
  Send, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Users,
  Check
} from 'lucide-react';
import { SelectMembersPanel, initialMembersData } from './SelectMembersPanel';

export interface KitchenBroadcastItem {
  id: string;
  title: string;
  category: 'General' | 'Warning' | 'Urgent Alert' | 'Good News';
  audience: string;
  time: string;
  status: 'Sent' | 'Scheduled';
  iconType: 'megaphone' | 'warning' | 'alert' | 'gift';
}

interface KitchenBroadcastPageProps {
  showToast?: (msg: string) => void;
  selectedMemberIds?: string[];
  onToggleMember?: (id: string) => void;
  onClearAllMembers?: () => void;
}

export const KitchenBroadcastPage: React.FC<KitchenBroadcastPageProps> = ({ 
  showToast,
  selectedMemberIds: propSelectedMemberIds,
  onToggleMember: propOnToggleMember,
  onClearAllMembers: propOnClearAllMembers
}) => {
  const [announcementType, setAnnouncementType] = useState('General');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Members');
  const [deliveryChannel, setDeliveryChannel] = useState('');

  // Selected Members State (Default pre-selected 2 members: Rohit Arjun & Pranathi Sharma)
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(['m2', 'm3']);
  
  // Panel visibility state: false by default, opens ONLY when "Specific Members" is selected
  const [isMembersPanelOpen, setIsMembersPanelOpen] = useState(false);

  const selectedIds = propSelectedMemberIds || localSelectedIds;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [broadcasts, setBroadcasts] = useState<KitchenBroadcastItem[]>([
    {
      id: '1',
      title: 'Water Maintenance Tomorrow',
      category: 'General',
      audience: 'All Members',
      time: 'Today, 10:30 AM',
      status: 'Sent',
      iconType: 'megaphone'
    },
    {
      id: '2',
      title: 'Power Interruption Notice',
      category: 'Warning',
      audience: 'Residents Only',
      time: 'Yesterday, 4:15 PM',
      status: 'Sent',
      iconType: 'warning'
    },
    {
      id: '3',
      title: 'Lift Not Working – Block B',
      category: 'Urgent Alert',
      audience: 'All Members',
      time: '22 Jul, 9:20 PM',
      status: 'Sent',
      iconType: 'alert'
    },
    {
      id: '4',
      title: 'Independence Day Celebration',
      category: 'Good News',
      audience: 'All Members',
      time: '20 Jul, 11:00 AM',
      status: 'Scheduled',
      iconType: 'gift'
    }
  ]);

  const handleToggleMember = (id: string) => {
    if (propOnToggleMember) {
      propOnToggleMember(id);
    } else {
      setLocalSelectedIds(prev => 
        prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
      );
    }
  };

  const handleClearAllMembers = () => {
    if (propOnClearAllMembers) {
      propOnClearAllMembers();
    } else {
      setLocalSelectedIds([]);
    }
  };

  const handleAudienceChange = (val: string) => {
    setTargetAudience(val);
    if (val === 'Specific Members') {
      setIsMembersPanelOpen(true);
    } else {
      setIsMembersPanelOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      if (showToast) showToast('Please enter a message content');
      return;
    }

    const typeToTitleMap: Record<string, string> = {
      'General': 'General Kitchen Announcement',
      'Warning': 'Mess Timing Adjustment Notice',
      'Urgent Alert': 'Urgent Pantry Supply Maintenance',
      'Good News': 'Sunday Special Feast Menu'
    };

    const catName = (announcementType as 'General' | 'Warning' | 'Urgent Alert' | 'Good News') || 'General';
    const newTitle = typeToTitleMap[catName] || (message.length > 25 ? message.substring(0, 25) + '...' : message);

    let audienceText = targetAudience || 'All Members';
    if (targetAudience === 'Specific Members') {
      if (selectedIds.length === 0) {
        if (showToast) showToast('Please select at least 1 member for Specific Members broadcast');
        return;
      }
      const selectedNames = initialMembersData
        .filter(m => selectedIds.includes(m.id))
        .map(m => m.name)
        .join(', ');
      audienceText = `Specific Members (${selectedIds.length} Selected: ${selectedNames})`;
    }

    const newBroadcast: KitchenBroadcastItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: catName,
      audience: targetAudience === 'Specific Members' ? `Specific Members (${selectedIds.length} Selected)` : audienceText,
      time: 'Just now',
      status: 'Sent',
      iconType: catName === 'Warning' ? 'warning' : catName === 'Urgent Alert' ? 'alert' : catName === 'Good News' ? 'gift' : 'megaphone'
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    if (showToast) showToast(`Broadcast "${newTitle}" sent to ${targetAudience === 'Specific Members' ? `Specific Members (${selectedIds.length} Selected)` : audienceText}`);

    setAnnouncementType('General');
    setMessage('');
    setDeliveryChannel('');
    setIsMembersPanelOpen(false);
  };

  return (
    <div className="kitchen-broadcast-wrapper">
      {/* Title */}
      <h2 className="broadcast-page-title">Broadcast Messages</h2>

      {/* Broadcast Form Card */}
      <form className="broadcast-form-card" onSubmit={handleSubmit}>
        {/* Field 1: Announcement Type */}
        <div className="broadcast-field-group">
          <label className="broadcast-label">Announcement Type</label>
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <div 
              className={`custom-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(prev => !prev)}
            >
              <span className="dropdown-selected-value">
                {announcementType || 'General'}
              </span>
              <ChevronDown size={16} className={`dropdown-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="custom-dropdown-menu">
                {['General', 'Warning', 'Urgent Alert'].map((option) => {
                  const isSelected = announcementType === option;
                  return (
                    <div
                      key={option}
                      className={`custom-dropdown-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setAnnouncementType(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="dropdown-check-wrapper">
                        {isSelected && <Check size={16} strokeWidth={2.5} />}
                      </span>
                      <span className="dropdown-option-label">{option}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Field 2: Message Textarea */}
        <div className="broadcast-field-group">
          <label className="broadcast-label">Message</label>
          <div className="textarea-input-wrapper">
            <div className="textarea-icon-prefix">
              <MessageSquare size={16} color="#2563eb" />
            </div>
            <textarea
              className="broadcast-textarea"
              rows={3}
              maxLength={250}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="char-counter">{message.length}/250</div>
          </div>
        </div>

        {/* Field 3: Target Audience */}
        <div className="broadcast-field-group">
          <label className="broadcast-label">Target Audience</label>

          {/* Standard Select Input when panel is NOT open */}
          {!isMembersPanelOpen && (
            <div className="select-input-wrapper">
              <select 
                className="broadcast-select"
                value={targetAudience}
                onChange={(e) => handleAudienceChange(e.target.value)}
              >
                <option value="All Members">All Members</option>
                <option value="Residents Only">Residents Only</option>
                <option value="Mess Subscribers">Mess Subscribers Only</option>
                <option value="Kitchen Staff">Kitchen Staff</option>
                <option value="Specific Members">
                  {targetAudience === 'Specific Members' && selectedIds.length > 0
                    ? `Specific Members (${selectedIds.length} Selected)`
                    : 'Specific Members'}
                </option>
              </select>
              <ChevronDown size={16} className="select-arrow-icon" />
            </div>
          )}

          {/* DEDICATED "SELECT MEMBERS" PANEL (Opens ONLY when Specific Members is selected) */}
          {isMembersPanelOpen && (
            <div className="inline-specific-members-box">
              {/* Header Box */}
              <div className="inline-members-header">
                <div className="inline-header-left">
                  <div className="members-header-icon-box">
                    <Users size={16} color="#2563eb" />
                  </div>
                  
                  {/* Select Dropdown inside Header */}
                  <select 
                    className="inline-audience-dropdown"
                    value={targetAudience}
                    onChange={(e) => handleAudienceChange(e.target.value)}
                  >
                    <option value="Specific Members">Specific Members</option>
                    <option value="All Members">All Members</option>
                    <option value="Residents Only">Residents Only</option>
                    <option value="Mess Subscribers">Mess Subscribers Only</option>
                    <option value="Kitchen Staff">Kitchen Staff</option>
                  </select>
                </div>

                <button 
                  type="button"
                  className="panel-collapse-btn"
                  onClick={() => setIsMembersPanelOpen(false)}
                  aria-label="Collapse panel"
                >
                  <ChevronUp size={18} />
                </button>
              </div>

              {/* Panel Content (Search, Tabs, Member Cards, Bottom Bar with Done/Apply) */}
              <SelectMembersPanel
                selectedMemberIds={selectedIds}
                onToggleMember={handleToggleMember}
                onClearAll={handleClearAllMembers}
                onDone={() => setIsMembersPanelOpen(false)}
                onClosePanel={() => setIsMembersPanelOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Field 4: Delivery Channels */}
        <div className="broadcast-field-group">
          <label className="broadcast-label">Delivery Channels</label>
          <div className="select-input-wrapper">
            <select 
              className="broadcast-select"
              value={deliveryChannel}
              onChange={(e) => setDeliveryChannel(e.target.value)}
            >
              <option value="">Select delivery channels</option>
              <option value="All Channels">All Channels</option>
              <option value="Push Notification">In-App Push Notification</option>
              <option value="SMS & Push">SMS &amp; Push Notification</option>
              <option value="Email & Notice">Email &amp; Digital Notice Board</option>
            </select>
            <ChevronDown size={16} className="select-arrow-icon" />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="broadcast-submit-btn">
          <span className="submit-btn-left">
            <Send size={16} />
            <span>Send Broadcast</span>
          </span>
          <ChevronRight size={14} className="submit-arrow-icon" />
        </button>
      </form>

      {/* Recent Broadcasts Header */}
      <div className="recent-broadcasts-header">
        <h3 className="recent-broadcasts-title">Recent Broadcasts</h3>
        <button 
          type="button" 
          className="view-all-btn"
          onClick={() => {
            if (showToast) showToast('Showing all recent broadcasts');
          }}
        >
          View All
        </button>
      </div>

      {/* Broadcast Cards List */}
      <div className="recent-broadcasts-list">
        {broadcasts.map((item) => (
          <div key={item.id} className="recent-broadcast-card">
            {/* Left Icon Badge Box */}
            <div className={`broadcast-icon-box box-${item.iconType}`}>
              {item.iconType === 'megaphone' && <Megaphone size={18} />}
              {item.iconType === 'warning' && <AlertTriangle size={18} />}
              {item.iconType === 'alert' && <AlertCircle size={18} />}
              {item.iconType === 'gift' && <Gift size={18} />}
            </div>

            {/* Content & Meta */}
            <div className="broadcast-card-content">
              <div className="broadcast-card-title">{item.title}</div>
              
              <div className="broadcast-meta-row">
                <span className={`category-tag-badge cat-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.category}
                </span>
                
                <span className="meta-dot">•</span>
                <span className="meta-text">{item.audience}</span>
                
                <span className="meta-dot">•</span>
                <span className="meta-text">{item.time}</span>
              </div>
            </div>

            {/* Right Status Pill Badge */}
            <div className="broadcast-card-status">
              {item.status === 'Sent' ? (
                <span className="status-pill status-sent">
                  Sent <CheckCircle size={11} /> <ChevronRight size={12} />
                </span>
              ) : (
                <span className="status-pill status-scheduled">
                  Scheduled <Calendar size={11} /> <ChevronRight size={12} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenBroadcastPage;
