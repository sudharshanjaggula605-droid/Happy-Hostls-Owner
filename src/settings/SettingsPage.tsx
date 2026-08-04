import React, { useState } from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  Shield, 
  Smartphone, 
  Phone, 
  Building, 
  Camera,
  Lock,
  X,
  Flag,
  Hash
} from 'lucide-react';

interface SettingsPageProps {
  showToast?: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'hostel'>('profile');

  // Profile Form States
  const [firstName, setFirstName] = useState('Rohit');
  const [lastName, setLastName] = useState('Rajpoot');
  const [nativePlace, setNativePlace] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('6265775558');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [email] = useState('rohitrajpoot21119@gmail.com');
  const [profileAvatar, setProfileAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');

  // Hostel Settings Form States
  const [hostelName, setHostelName] = useState('Sunrise Residency');
  const [hostelAddress, setHostelAddress] = useState('Full street address');
  const [cityName, setCityName] = useState('Mumbai');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400001');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('https://www.google.com/maps/place...');
  
  // Amenities State
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Wi-Fi', 'Geyser', 'Lift', 'CCTV', 'Food'
  ]);

  const availableAmenities = [
    'Wi-Fi',
    'Parking',
    'Washing Machine',
    'Geyser',
    'Fridge',
    'Lift',
    'CCTV',
    'TV',
    'Study Table & Chair',
    'Almirah',
    'Food'
  ];

  // Floor Selection State
  const [selectedFloor, setSelectedFloor] = useState<string>('Ground Floor');

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  // Handle Save Profile Settings
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !mobileNumber) {
      if (showToast) showToast('Please enter first name and mobile number');
      return;
    }
    if (showToast) showToast('Profile Settings updated successfully!');
  };

  // Handle Save Hostel Settings
  const handleSaveHostel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostelName) {
      if (showToast) showToast('Please enter hostel name');
      return;
    }
    if (showToast) showToast('Hostel Settings saved successfully!');
  };

  // Handle Change Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      if (showToast) showToast('Please fill all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      if (showToast) showToast('New passwords do not match!');
      return;
    }
    if (showToast) showToast('Password changed successfully!');
    setIsPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle Avatar Change Demo
  const handleAvatarClick = () => {
    const newAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    ];
    const nextAvatar = newAvatars[(newAvatars.indexOf(profileAvatar) + 1) % newAvatars.length];
    setProfileAvatar(nextAvatar);
    if (showToast) showToast('Profile photo updated!');
  };

  return (
    <div className="settings-page-wrapper">
      {/* SEGMENTED CONTROL TABS */}
      <div className="settings-segmented-tabs">
        <button 
          type="button" 
          className={`tab-pill-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Settings
        </button>

        <button 
          type="button" 
          className={`tab-pill-btn ${activeTab === 'hostel' ? 'active' : ''}`}
          onClick={() => setActiveTab('hostel')}
        >
          Hostel Settings
        </button>
      </div>

      {/* TAB 1: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="settings-tab-content">
          {/* PROFILE SUMMARY CARD */}
          <div className="profile-summary-card">
            <div className="avatar-wrapper" onClick={handleAvatarClick} title="Click to edit profile photo">
              <img 
                src={profileAvatar} 
                alt={`${firstName} ${lastName}`} 
                className="profile-avatar-img" 
              />
              <div className="camera-badge-overlay">
                <Camera size={11} color="#0f172a" />
              </div>
            </div>

            <div className="profile-info-right">
              <div className="profile-full-name">{firstName} {lastName}</div>
              <div className="verification-status-row">
                <CheckCircle size={13} color="#16a34a" />
                <span className="verification-text">EMAIL VERIFIED</span>
              </div>
              <div className="profile-email-text">{email}</div>
            </div>
          </div>

          {/* CHANGE PASSWORD CARD */}
          <div 
            className="change-password-card" 
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <div className="password-card-left">
              <div className="shield-icon-badge">
                <ShieldCheck size={18} color="#0284c7" />
              </div>
              <span className="password-card-title">Change password</span>
            </div>

            <ChevronRight size={18} className="chevron-arrow-muted" />
          </div>

          {/* SECTION 1: PERSONAL INFORMATION */}
          <div className="settings-section-container">
            <div className="settings-section-header">
              <span className="blue-bar-indicator" />
              <h3 className="section-title-text">Personal information</h3>
            </div>

            <div className="settings-form-fields-group">
              {/* First Name */}
              <div className="settings-field-item">
                <label className="field-item-label">First name *</label>
                <input 
                  type="text" 
                  required
                  className="settings-text-input" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="settings-field-item">
                <label className="field-item-label">Last name</label>
                <input 
                  type="text" 
                  className="settings-text-input" 
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Native Place */}
              <div className="settings-field-item">
                <label className="field-item-label">Native place</label>
                <div className="prefix-input-wrapper">
                  <MapPin size={16} className="prefix-field-icon" />
                  <input 
                    type="text" 
                    className="settings-text-input prefix-padding" 
                    placeholder="City or hometown"
                    value={nativePlace}
                    onChange={(e) => setNativePlace(e.target.value)}
                  />
                </div>
              </div>

              {/* Guardian */}
              <div className="settings-field-item">
                <label className="field-item-label">Guardian</label>
                <div className="prefix-input-wrapper">
                  <Shield size={16} className="prefix-field-icon" />
                  <input 
                    type="text" 
                    className="settings-text-input prefix-padding" 
                    placeholder="Parent or guardian name"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CONTACT INFORMATION */}
          <div className="settings-section-container">
            <div className="settings-section-header">
              <span className="blue-bar-indicator" />
              <h3 className="section-title-text">Contact</h3>
            </div>

            <div className="settings-form-fields-group">
              {/* Mobile Number */}
              <div className="settings-field-item">
                <label className="field-item-label">Mobile number *</label>
                <div className="prefix-input-wrapper">
                  <Smartphone size={16} className="prefix-field-icon" />
                  <input 
                    type="text" 
                    required
                    className="settings-text-input prefix-padding" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Alternate Mobile */}
              <div className="settings-field-item">
                <label className="field-item-label">Alternate mobile</label>
                <div className="prefix-input-wrapper">
                  <Phone size={16} className="prefix-field-icon" />
                  <input 
                    type="text" 
                    className="settings-text-input prefix-padding" 
                    placeholder="Additional contact number"
                    value={alternateMobile}
                    onChange={(e) => setAlternateMobile(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE VISIBILITY CARD */}
          <div className="profile-visibility-card">
            <div className="visibility-header">
              <ChevronRight size={16} color="#0284c7" />
              <span className="visibility-title">Profile Visibility</span>
            </div>
            <p className="visibility-desc">
              Your personal information is only visible to verified hostel managers and staff during your stay.
            </p>
          </div>

          {/* SAVE CHANGES BUTTON & SUBTEXT */}
          <div className="settings-save-actions-group">
            <button type="submit" className="save-changes-blue-btn">
              <span>Save Changes</span>
              <ChevronRight size={18} />
            </button>
            <div className="sessions-disclaimer-text">
              Changes will be updated across all your ProfileHub sessions.
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: HOSTEL SETTINGS (MATCHING REFERENCE SCREENSHOT EXACTLY) */}
      {activeTab === 'hostel' && (
        <form onSubmit={handleSaveHostel} className="hostel-settings-tab-content">
          <div className="hostel-form-card">
            {/* Field 1: HOSTEL NAME */}
            <div className="hostel-field-group">
              <label className="hostel-field-label">HOSTEL NAME</label>
              <div className="prefix-input-wrapper">
                <Building size={16} className="prefix-field-icon" />
                <input 
                  type="text"
                  required
                  className="hostel-text-input prefix-padding"
                  placeholder="e.g. Sunrise Residency"
                  value={hostelName}
                  onChange={(e) => setHostelName(e.target.value)}
                />
              </div>
            </div>

            {/* Field 2: HOSTEL ADDRESS */}
            <div className="hostel-field-group">
              <label className="hostel-field-label">HOSTEL ADDRESS</label>
              <div className="prefix-input-wrapper">
                <MapPin size={16} className="prefix-field-icon" />
                <input 
                  type="text"
                  className="hostel-text-input prefix-padding"
                  placeholder="Full street address"
                  value={hostelAddress}
                  onChange={(e) => setHostelAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Field 3: CITY & STATE (Two Columns) */}
            <div className="hostel-two-cols">
              <div className="hostel-field-group">
                <label className="hostel-field-label">CITY</label>
                <div className="prefix-input-wrapper">
                  <Building size={16} className="prefix-field-icon" />
                  <input 
                    type="text"
                    className="hostel-text-input prefix-padding"
                    placeholder="Mumbai"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                  />
                </div>
              </div>

              <div className="hostel-field-group">
                <label className="hostel-field-label">STATE</label>
                <div className="prefix-input-wrapper">
                  <Flag size={16} className="prefix-field-icon" />
                  <input 
                    type="text"
                    className="hostel-text-input prefix-padding"
                    placeholder="Maharashtra"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Field 4: PINCODE */}
            <div className="hostel-field-group">
              <label className="hostel-field-label">PINCODE</label>
              <div className="prefix-input-wrapper">
                <Hash size={16} className="prefix-field-icon" />
                <input 
                  type="text"
                  className="hostel-text-input prefix-padding"
                  placeholder="400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            {/* Field 5: LOCATION / MAPS LINK (Google Maps URL) */}
            <div className="hostel-field-group">
              <label className="hostel-field-label">LOCATION / MAPS LINK</label>
              <div className="prefix-input-wrapper">
                <MapPin size={16} className="prefix-field-icon" />
                <input 
                  type="text"
                  className="hostel-text-input prefix-padding"
                  placeholder="https://www.google.com/maps/place..."
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Field 6: AMENITIES (Selectable Pill Chips) */}
            <div className="hostel-field-group">
              <label className="hostel-field-label">AMENITIES</label>
              <div className="amenities-chips-row">
                {availableAmenities.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      className={`amenity-chip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 7: FLOOR SELECTION CARD WITH IMAGE */}
            <div className="floor-selection-card">
              <div className="room-interior-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80" 
                  alt="Hostel Floor Interior" 
                  className="room-interior-img" 
                />
              </div>
              <div className="floor-select-subtext">
                Select a floor to view associated rooms
              </div>

              {/* Floor Switcher Pills */}
              <div className="floors-pill-switcher">
                {['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'].map((flr) => (
                  <button
                    key={flr}
                    type="button"
                    className={`floor-pill-btn ${selectedFloor === flr ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedFloor(flr);
                      if (showToast) showToast(`Selected ${flr} rooms view`);
                    }}
                  >
                    {flr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STICKY SAVE BUTTON */}
          <div className="hostel-save-btn-wrapper">
            <button type="submit" className="hostel-save-solid-btn">
              Save
            </button>
          </div>
        </form>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />

            <div className="modal-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} color="#0284c7" />
                <h3 className="modal-title">Change Password</h3>
              </div>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setIsPasswordModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="modal-form-body">
              <div className="form-group-field">
                <label className="form-field-label">Current Password *</label>
                <input 
                  type="password" 
                  required 
                  className="modal-text-input" 
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-group-field">
                <label className="form-field-label">New Password *</label>
                <input 
                  type="password" 
                  required 
                  className="modal-text-input" 
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Confirm New Password *</label>
                <input 
                  type="password" 
                  required 
                  className="modal-text-input" 
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="modal-buttons-row">
                <button 
                  type="button" 
                  className="modal-cancel-btn"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
