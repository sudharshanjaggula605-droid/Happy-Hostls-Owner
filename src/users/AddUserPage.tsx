import React, { useState, useMemo } from 'react';
import { 
  User, 
  Phone, 
  Building, 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle, 
  MapPin, 
  Mail, 
  Sparkles
} from 'lucide-react';

interface AddUserPageProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showToast?: (msg: string) => void;
}

export const AddUserPage: React.FC<AddUserPageProps> = ({
  onSuccess,
  onCancel,
  showToast
}) => {
  // 1. Personal Information State
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Female');
  const [dob, setDob] = useState('2001-05-14');

  // 2. Contact Details State
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');

  // 3. Hostel Allocation State
  const [selectedHostel, setSelectedHostel] = useState('Happy Hostels');
  const [selectedBlock, setSelectedBlock] = useState('Block A');
  const [selectedFloor, setSelectedFloor] = useState('1st Floor');
  const [selectedRoom, setSelectedRoom] = useState('101');
  const [selectedBed, setSelectedBed] = useState('Bed A');
  const [joiningDate, setJoiningDate] = useState('2026-08-01');
  const [monthlyRent, setMonthlyRent] = useState<number>(6500);
  const [securityDeposit, setSecurityDeposit] = useState<number>(2000);

  // 4. Guardian Details State
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('Father');
  const [guardianPhone, setGuardianPhone] = useState('');

  // 5. Documents State
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [idDocFileName, setIdDocFileName] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);

  // Validation Errors State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Available Rooms database dynamically computed based on Hostel + Floor
  const availableRoomsMap: Record<string, Record<string, Array<{ room: string; beds: string[] }>>> = {
    'Happy Hostels': {
      '1st Floor': [
        { room: '101', beds: ['Bed A (Occupied)', 'Bed B (Available)', 'Bed C (Available)'] },
        { room: '102', beds: ['Bed A (Available)', 'Bed B (Available)'] },
        { room: '103', beds: ['Bed A (Available)', 'Bed B (Available)', 'Bed C (Available)'] }
      ],
      '2nd Floor': [
        { room: '201', beds: ['Bed A (Available)', 'Bed B (Available)'] },
        { room: '202', beds: ['Bed A (Available)', 'Bed B (Available)', 'Bed C (Available)'] },
        { room: '204', beds: ['Bed A (Available)', 'Bed B (Available)'] }
      ],
      '3rd Floor': [
        { room: '301', beds: ['Bed A (Available)', 'Bed B (Available)'] },
        { room: '302', beds: ['Bed A (Available)'] }
      ]
    },
    'Akshara Ladies Hostel': {
      '1st Floor': [
        { room: '104', beds: ['Bed A (Available)', 'Bed B (Available)'] },
        { room: '105', beds: ['Bed A (Available)', 'Bed B (Available)'] }
      ],
      '2nd Floor': [
        { room: '208', beds: ['Bed A (Available)', 'Bed B (Available)'] }
      ]
    },
    'Sunrise Residency': {
      '1st Floor': [
        { room: '112', beds: ['Bed A (Available)', 'Bed B (Available)'] }
      ],
      '2nd Floor': [
        { room: '202', beds: ['Bed A (Available)', 'Bed B (Available)'] }
      ]
    }
  };

  // Get available rooms for current hostel and floor
  const roomsForCurrentFloor = useMemo(() => {
    const hostelData = availableRoomsMap[selectedHostel] || availableRoomsMap['Happy Hostels'];
    return hostelData[selectedFloor] || hostelData['1st Floor'] || [];
  }, [selectedHostel, selectedFloor]);

  // Get available beds for selected room
  const bedsForCurrentRoom = useMemo(() => {
    const foundRoom = roomsForCurrentFloor.find(r => r.room === selectedRoom);
    return foundRoom ? foundRoom.beds : ['Bed A (Available)', 'Bed B (Available)'];
  }, [roomsForCurrentFloor, selectedRoom]);

  // Handle Hostel change
  const handleHostelChange = (h: string) => {
    setSelectedHostel(h);
    const floors = Object.keys(availableRoomsMap[h] || {});
    if (floors.length > 0) {
      const defaultFloor = floors[0];
      setSelectedFloor(defaultFloor);
      const rooms = availableRoomsMap[h][defaultFloor] || [];
      if (rooms.length > 0) {
        setSelectedRoom(rooms[0].room);
        setSelectedBed(rooms[0].beds[0] || 'Bed A');
      }
    }
  };

  // Handle Floor change
  const handleFloorChange = (f: string) => {
    setSelectedFloor(f);
    const hostelData = availableRoomsMap[selectedHostel] || availableRoomsMap['Happy Hostels'];
    const rooms = hostelData[f] || [];
    if (rooms.length > 0) {
      setSelectedRoom(rooms[0].room);
      setSelectedBed(rooms[0].beds[0] || 'Bed A');
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile.trim().replace(/\D/g, ''))) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (aadhaarNumber.trim().length < 12) {
      newErrors.aadhaarNumber = 'Aadhaar number must be at least 12 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      if (showToast) showToast('Please fix validation errors before saving');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (showToast) showToast(`Tenant ${fullName} saved successfully!`);
      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <div className="modern-add-user-container">
      {/* SECTION HEADER BANNER */}
      <div className="modern-add-user-header">
        <div className="header-badge-pill">
          <Sparkles size={12} />
          <span>NEW OCCUPANT REGISTRATION</span>
        </div>
        <h1 className="modern-page-title">Add New User</h1>
        <p className="modern-page-subtitle">
          Fill in tenant credentials, contact details, and hostel allocation to onboard.
        </p>
      </div>

      <form onSubmit={handleSaveUser} className="modern-user-form">
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="modern-card-section">
          <div className="card-section-header">
            <div className="section-icon-badge bg-blue-badge">
              <User size={18} color="#2563eb" />
            </div>
            <div className="section-header-text">
              <h2 className="section-title">Personal Information</h2>
              <p className="section-desc">Basic details &amp; identity</p>
            </div>
          </div>

          <div className="card-section-body">
            <div className="form-group full-width">
              <label className="input-label">Full Name *</label>
              <input 
                type="text" 
                className={`modern-input ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="e.g. Ananya Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="error-message">
                  <AlertCircle size={12} /> {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-grid-2col">
              <div className="form-group">
                <label className="input-label">Gender</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Date of Birth</label>
                <input 
                  type="date"
                  className="modern-input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTACT DETAILS */}
        <div className="modern-card-section">
          <div className="card-section-header">
            <div className="section-icon-badge bg-emerald-badge">
              <Phone size={18} color="#059669" />
            </div>
            <div className="section-header-text">
              <h2 className="section-title">Contact Details</h2>
              <p className="section-desc">Phone numbers, email &amp; permanent address</p>
            </div>
          </div>

          <div className="card-section-body">
            <div className="form-grid-2col">
              <div className="form-group">
                <label className="input-label">Mobile Number *</label>
                <input 
                  type="tel" 
                  className={`modern-input ${errors.mobile ? 'is-invalid' : ''}`}
                  placeholder="+91 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && (
                  <span className="error-message">
                    <AlertCircle size={12} /> {errors.mobile}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">Alternate Mobile</label>
                <input 
                  type="tel" 
                  className="modern-input"
                  placeholder="Optional 2nd phone"
                  value={altMobile}
                  onChange={(e) => setAltMobile(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group full-width mt-12">
              <label className="input-label">Email Address *</label>
              <div className="input-icon-wrap">
                <Mail size={16} className="input-left-icon" />
                <input 
                  type="email" 
                  className={`modern-input has-icon ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </div>

            <div className="form-group full-width mt-12">
              <label className="input-label">Permanent Address</label>
              <div className="input-icon-wrap">
                <MapPin size={16} className="input-left-icon" />
                <input 
                  type="text" 
                  className="modern-input has-icon"
                  placeholder="Street address, colony, building..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2col mt-12">
              <div className="form-group">
                <label className="input-label">City</label>
                <input 
                  type="text" 
                  className="modern-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">State</label>
                <input 
                  type="text" 
                  className="modern-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: HOSTEL ALLOCATION (SEARCHABLE/DYNAMIC DROPDOWNS) */}
        <div className="modern-card-section">
          <div className="card-section-header">
            <div className="section-icon-badge bg-purple-badge">
              <Building size={18} color="#7c3aed" />
            </div>
            <div className="section-header-text">
              <h2 className="section-title">Hostel Allocation</h2>
              <p className="section-desc">Search &amp; select hostel, block, floor, room &amp; bed</p>
            </div>
          </div>

          <div className="card-section-body">
            <div className="form-grid-2col">
              <div className="form-group">
                <label className="input-label">Select Hostel *</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={selectedHostel}
                    onChange={(e) => handleHostelChange(e.target.value)}
                  >
                    <option value="Happy Hostels">Happy Hostels</option>
                    <option value="Akshara Ladies Hostel">Akshara Ladies Hostel</option>
                    <option value="Sunrise Residency">Sunrise Residency</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Block</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>
            </div>

            <div className="form-grid-2col mt-12">
              <div className="form-group">
                <label className="input-label">Floor</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={selectedFloor}
                    onChange={(e) => handleFloorChange(e.target.value)}
                  >
                    <option value="1st Floor">1st Floor</option>
                    <option value="2nd Floor">2nd Floor</option>
                    <option value="3rd Floor">3rd Floor</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Room Number *</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  >
                    {roomsForCurrentFloor.map(r => (
                      <option key={r.room} value={r.room}>Room {r.room}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>
            </div>

            <div className="form-grid-2col mt-12">
              <div className="form-group">
                <label className="input-label">Allocated Bed *</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={selectedBed}
                    onChange={(e) => setSelectedBed(e.target.value)}
                  >
                    {bedsForCurrentRoom.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Joining Date</label>
                <input 
                  type="date"
                  className="modern-input"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2col mt-12">
              <div className="form-group">
                <label className="input-label">Monthly Rent (₹)</label>
                <input 
                  type="number"
                  className="modern-input"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Security Deposit (₹)</label>
                <input 
                  type="number"
                  className="modern-input"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: GUARDIAN DETAILS */}
        <div className="modern-card-section">
          <div className="card-section-header">
            <div className="section-icon-badge bg-amber-badge">
              <ShieldCheck size={18} color="#d97706" />
            </div>
            <div className="section-header-text">
              <h2 className="section-title">Guardian Details</h2>
              <p className="section-desc">Emergency contact &amp; relationship info</p>
            </div>
          </div>

          <div className="card-section-body">
            <div className="form-group full-width">
              <label className="input-label">Guardian / Parent Name</label>
              <input 
                type="text" 
                className="modern-input"
                placeholder="e.g. Ramesh Sharma"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
              />
            </div>

            <div className="form-grid-2col mt-12">
              <div className="form-group">
                <label className="input-label">Relationship</label>
                <div className="modern-select-wrapper">
                  <select 
                    className="modern-select"
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Local Guardian">Local Guardian</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Guardian Phone</label>
                <input 
                  type="tel" 
                  className="modern-input"
                  placeholder="+91 9123456789"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: DOCUMENTS & UPLOADS */}
        <div className="modern-card-section">
          <div className="card-section-header">
            <div className="section-icon-badge bg-indigo-badge">
              <FileText size={18} color="#6366f1" />
            </div>
            <div className="section-header-text">
              <h2 className="section-title">Documents</h2>
              <p className="section-desc">Government ID verification &amp; photos</p>
            </div>
          </div>

          <div className="card-section-body">
            <div className="form-group full-width">
              <label className="input-label">Aadhaar Number *</label>
              <input 
                type="text" 
                className={`modern-input ${errors.aadhaarNumber ? 'is-invalid' : ''}`}
                placeholder="12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
              />
              {errors.aadhaarNumber && (
                <span className="error-message">
                  <AlertCircle size={12} /> {errors.aadhaarNumber}
                </span>
              )}
            </div>

            <div className="form-grid-2col mt-12">
              <div className="upload-box-card">
                <span className="upload-box-title">Upload Aadhaar ID</span>
                <label className="upload-dropzone">
                  <Upload size={20} color="#6366f1" />
                  <span className="upload-text">
                    {idDocFileName || 'Choose File'}
                  </span>
                  <input 
                    type="file" 
                    className="hidden-file-input" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setIdDocFileName(e.target.files[0].name);
                      }
                    }} 
                  />
                </label>
              </div>

              <div className="upload-box-card">
                <span className="upload-box-title">Profile Photo</span>
                <label className="upload-dropzone">
                  <Upload size={20} color="#059669" />
                  <span className="upload-text">
                    {photoFileName || 'Choose Photo'}
                  </span>
                  <input 
                    type="file" 
                    className="hidden-file-input" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPhotoFileName(e.target.files[0].name);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY BREAKDOWN CARD */}
        <div className="modern-card-section summary-theme-card">
          <div className="summary-theme-header">
            <span className="summary-badge-text">FEE BREAKDOWN</span>
            <h3 className="summary-theme-title">
              Total Joining Fee: ₹{(monthlyRent + securityDeposit).toLocaleString()}
            </h3>
          </div>

          <div className="summary-details-pills">
            <div className="detail-pill">
              <span className="pill-key">Hostel:</span>
              <span className="pill-val">{selectedHostel}</span>
            </div>
            <div className="detail-pill">
              <span className="pill-key">Allocation:</span>
              <span className="pill-val">Room {selectedRoom} ({selectedBed})</span>
            </div>
            <div className="detail-pill">
              <span className="pill-key">Monthly Rent:</span>
              <span className="pill-val">₹{monthlyRent.toLocaleString()}</span>
            </div>
            <div className="detail-pill">
              <span className="pill-key">Security Deposit:</span>
              <span className="pill-val">₹{securityDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* FIXED BOTTOM ACTION BAR */}
        <div className="modern-fixed-bottom-bar">
          <button 
            type="button" 
            className="btn-bottom-cancel"
            onClick={() => {
              if (onCancel) onCancel();
            }}
          >
            Cancel
          </button>

          <button 
            type="submit" 
            className="btn-bottom-save"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Saving User...</span>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Save User</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
