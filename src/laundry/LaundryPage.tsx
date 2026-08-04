import React, { useState, useMemo } from 'react';
import { 
  Shirt, 
  Clock, 
  Waves, 
  CheckCircle2, 
  AlertCircle, 
  IndianRupee, 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Pencil, 
  ChevronDown,
  X,
  Calendar,
  Filter,
  RotateCcw
} from 'lucide-react';

export interface LaundryOrder {
  id: string;
  orderId: string;
  residentName: string;
  roomNumber: string;
  hostelBlock: string;
  itemsCount: number;
  itemsDetail: string;
  staffName: string;
  staffAvatar: string;
  status: 'Pending' | 'Washing' | 'Ready' | 'Delivered' | 'Delayed';
  paymentStatus: 'Paid' | 'Pending';
  amount: number;
  expectedDelivery: string;
  orderDate?: string; // YYYY-MM-DD format
}

export const initialLaundryOrders: LaundryOrder[] = [
  {
    id: 'l1',
    orderId: 'LDR-00101',
    residentName: 'Aarav Sharma',
    roomNumber: '101',
    hostelBlock: 'Block A Hostel',
    itemsCount: 8,
    itemsDetail: '4 Shirts, 3 Pants, 1 Jacket',
    staffName: 'Rita Devi',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    status: 'Delivered',
    paymentStatus: 'Paid',
    amount: 80,
    expectedDelivery: 'Jun 30, Early',
    orderDate: '2026-06-30'
  },
  {
    id: 'l2',
    orderId: 'LDR-00102',
    residentName: 'Kabir Verma',
    roomNumber: '204',
    hostelBlock: 'Block A Hostel',
    itemsCount: 12,
    itemsDetail: '6 Shirts, 4 Trousers, 2 Bedsheets',
    staffName: 'Shyam Singh',
    staffAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    status: 'Washing',
    paymentStatus: 'Pending',
    amount: 120,
    expectedDelivery: 'Jul 03, On Time',
    orderDate: '2026-07-03'
  },
  {
    id: 'l3',
    orderId: 'LDR-00105',
    residentName: 'Ishaan Gupta',
    roomNumber: '112',
    hostelBlock: 'Block B Hostel',
    itemsCount: 5,
    itemsDetail: '3 Shirts, 2 Jeans',
    staffName: 'Rita Devi',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    status: 'Pending',
    paymentStatus: 'Paid',
    amount: 50,
    expectedDelivery: 'Jun 29, Overdue',
    orderDate: '2026-06-29'
  },
  {
    id: 'l4',
    orderId: 'LDR-00108',
    residentName: 'Ananya Roy',
    roomNumber: '305',
    hostelBlock: 'Block B Hostel',
    itemsCount: 15,
    itemsDetail: '8 Tops, 5 Pants, 2 Towels',
    staffName: 'Shyam Singh',
    staffAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    status: 'Ready',
    paymentStatus: 'Paid',
    amount: 150,
    expectedDelivery: 'Jul 01, Ready for Pickup',
    orderDate: '2026-07-01'
  },
  {
    id: 'l5',
    orderId: 'LDR-00110',
    residentName: 'Rohan Mehta',
    roomNumber: '108',
    hostelBlock: 'Block C Hostel',
    itemsCount: 7,
    itemsDetail: '4 Shirts, 3 Shorts',
    staffName: 'Rita Devi',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    status: 'Delayed',
    paymentStatus: 'Pending',
    amount: 90,
    expectedDelivery: 'Jun 28, Delayed',
    orderDate: '2026-06-28'
  }
];

interface LaundryPageProps {
  showToast?: (msg: string) => void;
  onNavigateToCreateOrder?: () => void;
  ordersList?: LaundryOrder[];
}

export const LaundryPage: React.FC<LaundryPageProps> = ({ 
  showToast,
  onNavigateToCreateOrder,
  ordersList
}) => {
  const [internalOrders, setInternalOrders] = useState<LaundryOrder[]>(initialLaundryOrders);
  const orders = ordersList || internalOrders;
  const setOrders = setInternalOrders;
  
  const [selectedHostel, setSelectedHostel] = useState<string>('All Hostels');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTabFilter, setActiveTabFilter] = useState<'All' | 'Pending' | 'Washing' | 'Ready'>('All');

  // Date Range Filter States
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [appliedFromDate, setAppliedFromDate] = useState<string>('');
  const [appliedToDate, setAppliedToDate] = useState<string>('');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [viewingOrder, setViewingOrder] = useState<LaundryOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<LaundryOrder | null>(null);

  // New Order Form States
  const [newResidentName, setNewResidentName] = useState<string>('');
  const [newRoomNumber, setNewRoomNumber] = useState<string>('');
  const [newHostelBlock, setNewHostelBlock] = useState<string>('Block A Hostel');
  const [newItemsCount, setNewItemsCount] = useState<string>('5');
  const [newItemsDetail, setNewItemsDetail] = useState<string>('');
  const [newStaffName, setNewStaffName] = useState<string>('Rita Devi');
  const [newAmount, setNewAmount] = useState<string>('60');
  const [newPaymentStatus, setNewPaymentStatus] = useState<'Paid' | 'Pending'>('Pending');

  // Quick Stats Calculation
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const washingCount = orders.filter(o => o.status === 'Washing').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;
  const delayedCount = orders.filter(o => o.status === 'Delayed').length;
  const totalRevenueSum = orders.reduce((sum, o) => sum + o.amount, 0);

  // Apply Date Filter Action
  const handleApplyDateFilter = () => {
    if (!fromDate && !toDate) {
      if (showToast) showToast('Please select From Date or To Date');
      return;
    }
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    if (showToast) showToast(`Filtered orders from ${fromDate || 'Start'} to ${toDate || 'End'}`);
  };

  // Reset Date Filter Action
  const handleResetDateFilter = () => {
    setFromDate('');
    setToDate('');
    setAppliedFromDate('');
    setAppliedToDate('');
    if (showToast) showToast('Date range filter reset');
  };

  // Filter Orders Dynamically
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Hostel filter
      const matchesHostel = selectedHostel === 'All Hostels' || order.hostelBlock === selectedHostel;
      
      // Search filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        order.residentName.toLowerCase().includes(query) ||
        order.roomNumber.toLowerCase().includes(query) ||
        order.orderId.toLowerCase().includes(query) ||
        order.staffName.toLowerCase().includes(query);

      // Status tab filter
      const matchesTab = activeTabFilter === 'All' || order.status === activeTabFilter;

      // Date Range Filter (checking orderDate YYYY-MM-DD format)
      let matchesDateRange = true;
      if (order.orderDate) {
        if (appliedFromDate) {
          matchesDateRange = matchesDateRange && (order.orderDate >= appliedFromDate);
        }
        if (appliedToDate) {
          matchesDateRange = matchesDateRange && (order.orderDate <= appliedToDate);
        }
      }

      return matchesHostel && matchesSearch && matchesTab && matchesDateRange;
    });
  }, [orders, selectedHostel, searchQuery, activeTabFilter, appliedFromDate, appliedToDate]);

  // Handle Create Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResidentName || !newRoomNumber || !newAmount) {
      if (showToast) showToast('Please enter resident name, room number and amount');
      return;
    }

    const nextIdNumber = 100 + orders.length + 1;
    const todayStr = new Date().toISOString().split('T')[0];

    const newOrder: LaundryOrder = {
      id: 'l_' + Date.now(),
      orderId: `LDR-00${nextIdNumber}`,
      residentName: newResidentName,
      roomNumber: newRoomNumber,
      hostelBlock: newHostelBlock,
      itemsCount: parseInt(newItemsCount) || 5,
      itemsDetail: newItemsDetail || `${newItemsCount} Mixed Clothes`,
      staffName: newStaffName,
      staffAvatar: newStaffName === 'Rita Devi' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      status: 'Pending',
      paymentStatus: newPaymentStatus,
      amount: parseFloat(newAmount) || 60,
      expectedDelivery: 'Tomorrow, On Time',
      orderDate: todayStr
    };

    setOrders([newOrder, ...orders]);
    if (showToast) showToast(`Created Laundry Order ${newOrder.orderId} for ${newResidentName}`);

    // Reset Form & Close Modal
    setNewResidentName('');
    setNewRoomNumber('');
    setNewItemsCount('5');
    setNewItemsDetail('');
    setNewAmount('60');
    setIsCreateModalOpen(false);
  };

  // Handle Update Status / Payment in Edit Modal
  const handleSaveEditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    if (showToast) showToast(`Updated Order ${editingOrder.orderId} (${editingOrder.status}, ${editingOrder.paymentStatus})`);
    setEditingOrder(null);
  };

  return (
    <div className="laundry-page-wrapper">
      {/* QUICK STATS SECTION */}
      <div className="laundry-section-header">
        <h2 className="laundry-section-title">Quick Stats</h2>
        <span className="laundry-today-badge">TODAY</span>
      </div>

      {/* 6 Quick Stats Card */}
      <div className="laundry-stats-card">
        {/* Stat 1: Total Orders */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-blue">
            <Shirt size={16} />
          </div>
          <div className="laundry-stat-val">{totalOrdersCount}</div>
          <div className="laundry-stat-lbl">TOTAL</div>
        </div>

        <div className="stat-divider" />

        {/* Stat 2: Pending */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-yellow">
            <Clock size={16} />
          </div>
          <div className="laundry-stat-val">{pendingCount}</div>
          <div className="laundry-stat-lbl">PENDING</div>
        </div>

        <div className="stat-divider" />

        {/* Stat 3: Washing */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-cyan">
            <Waves size={16} />
          </div>
          <div className="laundry-stat-val">{washingCount}</div>
          <div className="laundry-stat-lbl">WASHING</div>
        </div>

        <div className="stat-divider" />

        {/* Stat 4: Ready */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-green">
            <CheckCircle2 size={16} />
          </div>
          <div className="laundry-stat-val">{readyCount}</div>
          <div className="laundry-stat-lbl">READY</div>
        </div>

        <div className="stat-divider" />

        {/* Stat 5: Delayed */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-red">
            <AlertCircle size={16} />
          </div>
          <div className="laundry-stat-val">{delayedCount}</div>
          <div className="laundry-stat-lbl">DELAYED</div>
        </div>

        <div className="stat-divider" />

        {/* Stat 6: Revenue */}
        <div className="laundry-stat-col">
          <div className="laundry-stat-icon icon-purple">
            <IndianRupee size={16} />
          </div>
          <div className="laundry-stat-val">₹{(totalRevenueSum / 1000).toFixed(1)}k</div>
          <div className="laundry-stat-lbl">REVENUE</div>
        </div>
      </div>

      {/* SELECT HOSTEL & CREATE ORDER ROW */}
      <div className="laundry-actions-row">
        <div className="hostel-select-group">
          <label className="hostel-select-label">SELECT HOSTEL</label>
          <div className="hostel-select-wrapper">
            <select 
              className="hostel-dropdown-select"
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
            >
              <option value="All Hostels">All Hostels</option>
              <option value="Block A Hostel">Block A Hostel</option>
              <option value="Block B Hostel">Block B Hostel</option>
              <option value="Block C Hostel">Block C Hostel</option>
            </select>
            <ChevronDown size={16} className="select-arrow-icon" />
          </div>
        </div>

        <button 
          type="button"
          className="create-order-btn"
          onClick={() => {
            if (onNavigateToCreateOrder) {
              onNavigateToCreateOrder();
            } else {
              setIsCreateModalOpen(true);
            }
          }}
        >
          <Plus size={16} />
          <span>Create Order</span>
        </button>
      </div>

      {/* SEARCH BAR & FILTER TABS */}
      <div className="laundry-search-filter-card">
        {/* Search Bar */}
        <div className="laundry-search-box">
          <Search size={16} className="search-icon-muted" />
          <input 
            type="text"
            className="laundry-search-input"
            placeholder="Search Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-btn" 
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills Row */}
        <div className="laundry-filter-pills-row">
          <button 
            type="button"
            className={`laundry-filter-pill ${activeTabFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTabFilter('All')}
          >
            All Orders
          </button>

          <button 
            type="button"
            className={`laundry-filter-pill ${activeTabFilter === 'Pending' ? 'active' : ''}`}
            onClick={() => setActiveTabFilter('Pending')}
          >
            Pending
          </button>

          <button 
            type="button"
            className={`laundry-filter-pill ${activeTabFilter === 'Washing' ? 'active' : ''}`}
            onClick={() => setActiveTabFilter('Washing')}
          >
            Washing
          </button>

          <button 
            type="button"
            className={`laundry-filter-pill ${activeTabFilter === 'Ready' ? 'active' : ''}`}
            onClick={() => setActiveTabFilter('Ready')}
          >
            Ready
          </button>
        </div>
      </div>

      {/* DEDICATED FROM DATE & TO DATE FILTER ROW ABOVE OPERATIONS QUEUE */}
      <div className="laundry-date-filter-box">
        <div className="date-filter-header-row">
          <div className="date-filter-header-left">
            <Calendar size={15} color="#0055ff" />
            <span className="date-filter-box-title">Date Range Filter</span>
          </div>

          {(appliedFromDate || appliedToDate) && (
            <span className="active-date-filter-pill">
              {appliedFromDate || 'Start'} → {appliedToDate || 'End'}
            </span>
          )}
        </div>

        <div className="date-filter-inputs-grid">
          <div className="date-field-col">
            <label className="date-input-lbl">From Date</label>
            <input 
              type="date"
              className="laundry-date-picker-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="date-field-col">
            <label className="date-input-lbl">To Date</label>
            <input 
              type="date"
              className="laundry-date-picker-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="date-filter-actions-row">
          <button 
            type="button"
            className="apply-date-filter-btn"
            onClick={handleApplyDateFilter}
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>

          {(appliedFromDate || appliedToDate || fromDate || toDate) && (
            <button 
              type="button"
              className="reset-date-filter-btn"
              onClick={handleResetDateFilter}
            >
              <RotateCcw size={14} />
              <span>Reset / Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* OPERATIONS QUEUE SECTION */}
      <div className="operations-queue-header">
        <div className="queue-title-left">
          <h3 className="queue-title">Operations Queue</h3>
          <span className="queue-subtext">Monitor and track live orders</span>
        </div>
        <div className="live-status-pill">
          LIVE <span className="live-blue-dot" />
        </div>
      </div>

      {/* ORDERS CARDS LIST */}
      <div className="laundry-orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders-card">
            {appliedFromDate || appliedToDate ? (
              <>
                <Calendar size={28} color="#94a3b8" />
                <div className="no-orders-title">No orders found for the selected date range.</div>
                <div className="no-orders-desc">
                  There are no laundry orders dated between {appliedFromDate || 'Start'} and {appliedToDate || 'End'}.
                </div>
                <button 
                  type="button"
                  className="reset-date-filter-inline-btn"
                  onClick={handleResetDateFilter}
                >
                  <RotateCcw size={13} />
                  <span>Reset / Clear Date Filter</span>
                </button>
              </>
            ) : (
              <>
                <Shirt size={28} color="#94a3b8" />
                <div className="no-orders-title">No Laundry Orders Found</div>
                <div className="no-orders-desc">No orders match your search query or filter settings.</div>
              </>
            )}
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="laundry-order-card">
              {/* Card Top Row: Order ID & Status Pill */}
              <div className="order-card-row-1">
                <span className="order-id-badge">{order.orderId}</span>

                <span className={`order-status-pill status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {/* Card Second Row: Resident Name, Room Number, Amount & Payment */}
              <div className="order-card-row-2">
                <div className="resident-info-left">
                  <div className="resident-name-txt">{order.residentName}</div>
                  <div className="room-number-txt">Room {order.roomNumber}</div>
                </div>

                <div className="amount-payment-right">
                  <div className="order-amount-txt">₹{order.amount}</div>
                  <div className={`payment-dot-status ${order.paymentStatus === 'Paid' ? 'paid' : 'pending'}`}>
                    <span className="payment-dot" />
                    <span>{order.paymentStatus}</span>
                  </div>
                </div>
              </div>

              {/* Card Third Row: Items Count Badge & Laundry Staff */}
              <div className="order-card-row-3">
                <div className="items-count-badge">
                  <FileText size={13} />
                  <span>{order.itemsCount} Items</span>
                </div>

                <div className="laundry-staff-info">
                  <img 
                    src={order.staffAvatar} 
                    alt={order.staffName} 
                    className="staff-avatar-img"
                  />
                  <span className="staff-name-txt">{order.staffName}</span>
                </div>
              </div>

              {/* Card Bottom Row: Delivery Tag & Action Icons */}
              <div className="order-card-row-4">
                <div className={`delivery-tag-text ${order.status === 'Delayed' ? 'delayed-text' : ''}`}>
                  <Clock size={13} />
                  <span>{order.expectedDelivery}</span>
                  {order.orderDate && <span className="order-date-chip">({order.orderDate})</span>}
                </div>

                <div className="order-actions-right">
                  <button 
                    type="button" 
                    className="action-icon-btn" 
                    onClick={() => setViewingOrder(order)}
                    aria-label="View Order Details"
                  >
                    <Eye size={16} />
                  </button>

                  <button 
                    type="button" 
                    className="action-icon-btn" 
                    onClick={() => setEditingOrder(order)}
                    aria-label="Edit Order"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="showing-queue-footer">
          Showing {filteredOrders.length} active orders in queue
        </div>
      </div>

      {/* MODAL 1: CREATE LAUNDRY ORDER */}
      {isCreateModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />
            
            <div className="modal-header-row">
              <h3 className="modal-title">+ Create Laundry Order</h3>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setIsCreateModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="modal-form-body">
              <div className="form-group-field">
                <label className="form-field-label">Resident Name *</label>
                <input 
                  type="text" 
                  required 
                  className="modal-text-input" 
                  placeholder="e.g. Aarav Sharma"
                  value={newResidentName} 
                  onChange={(e) => setNewResidentName(e.target.value)} 
                />
              </div>

              <div className="form-two-cols">
                <div className="form-group-field">
                  <label className="form-field-label">Room Number *</label>
                  <input 
                    type="text" 
                    required 
                    className="modal-text-input" 
                    placeholder="e.g. 101"
                    value={newRoomNumber} 
                    onChange={(e) => setNewRoomNumber(e.target.value)} 
                  />
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Hostel Block</label>
                  <select 
                    className="modal-select-input"
                    value={newHostelBlock}
                    onChange={(e) => setNewHostelBlock(e.target.value)}
                  >
                    <option value="Block A Hostel">Block A Hostel</option>
                    <option value="Block B Hostel">Block B Hostel</option>
                    <option value="Block C Hostel">Block C Hostel</option>
                  </select>
                </div>
              </div>

              <div className="form-two-cols">
                <div className="form-group-field">
                  <label className="form-field-label">Items Count</label>
                  <input 
                    type="number" 
                    min="1"
                    className="modal-text-input" 
                    value={newItemsCount} 
                    onChange={(e) => setNewItemsCount(e.target.value)} 
                  />
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Amount (₹) *</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    className="modal-text-input" 
                    value={newAmount} 
                    onChange={(e) => setNewAmount(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Items Description</label>
                <input 
                  type="text" 
                  className="modal-text-input" 
                  placeholder="e.g. 4 Shirts, 3 Pants, 1 Towel"
                  value={newItemsDetail} 
                  onChange={(e) => setNewItemsDetail(e.target.value)} 
                />
              </div>

              <div className="form-two-cols">
                <div className="form-group-field">
                  <label className="form-field-label">Assigned Staff</label>
                  <select 
                    className="modal-select-input"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                  >
                    <option value="Rita Devi">Rita Devi</option>
                    <option value="Shyam Singh">Shyam Singh</option>
                  </select>
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Payment Status</label>
                  <select 
                    className="modal-select-input"
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value as 'Paid' | 'Pending')}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="modal-buttons-row">
                <button 
                  type="button" 
                  className="modal-cancel-btn" 
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW ORDER DETAILS */}
      {viewingOrder && (
        <div className="modal-overlay-backdrop" onClick={() => setViewingOrder(null)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />

            <div className="modal-header-row">
              <div>
                <h3 className="modal-title">Order {viewingOrder.orderId}</h3>
                <span className="modal-subtitle">{viewingOrder.hostelBlock}</span>
              </div>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setViewingOrder(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="view-order-details-body">
              <div className="detail-row-card">
                <div className="detail-item">
                  <span className="detail-lbl">Resident Name</span>
                  <span className="detail-val">{viewingOrder.residentName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Room Number</span>
                  <span className="detail-val">Room {viewingOrder.roomNumber}</span>
                </div>
              </div>

              <div className="detail-row-card">
                <div className="detail-item">
                  <span className="detail-lbl">Status</span>
                  <span className={`order-status-pill status-${viewingOrder.status.toLowerCase()}`}>
                    {viewingOrder.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Payment</span>
                  <span className={`payment-dot-status ${viewingOrder.paymentStatus === 'Paid' ? 'paid' : 'pending'}`}>
                    <span className="payment-dot" /> {viewingOrder.paymentStatus} (₹{viewingOrder.amount})
                  </span>
                </div>
              </div>

              <div className="detail-row-card full-width-card">
                <span className="detail-lbl">Items Breakdown ({viewingOrder.itemsCount} Total)</span>
                <span className="detail-val-highlight">{viewingOrder.itemsDetail}</span>
              </div>

              <div className="detail-row-card">
                <div className="detail-item">
                  <span className="detail-lbl">Assigned Staff</span>
                  <div className="staff-info-inline">
                    <img src={viewingOrder.staffAvatar} alt={viewingOrder.staffName} className="staff-avatar-sm" />
                    <span className="detail-val">{viewingOrder.staffName}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Order Date &amp; Delivery</span>
                  <span className="detail-val">{viewingOrder.orderDate || 'N/A'} • {viewingOrder.expectedDelivery}</span>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className="modal-submit-btn full-width-btn"
              onClick={() => setViewingOrder(null)}
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT LAUNDRY ORDER */}
      {editingOrder && (
        <div className="modal-overlay-backdrop" onClick={() => setEditingOrder(null)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />

            <div className="modal-header-row">
              <h3 className="modal-title">Edit Order: {editingOrder.orderId}</h3>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setEditingOrder(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditOrder} className="modal-form-body">
              <div className="form-group-field">
                <label className="form-field-label">Order Status</label>
                <select 
                  className="modal-select-input"
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    status: e.target.value as any
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Washing">Washing</option>
                  <option value="Ready">Ready</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Payment Status</label>
                <select 
                  className="modal-select-input"
                  value={editingOrder.paymentStatus}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    paymentStatus: e.target.value as any
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Assigned Staff</label>
                <select 
                  className="modal-select-input"
                  value={editingOrder.staffName}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    staffName: e.target.value,
                    staffAvatar: e.target.value === 'Rita Devi'
                      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
                  })}
                >
                  <option value="Rita Devi">Rita Devi</option>
                  <option value="Shyam Singh">Shyam Singh</option>
                </select>
              </div>

              <div className="modal-buttons-row">
                <button 
                  type="button" 
                  className="modal-cancel-btn" 
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaundryPage;
