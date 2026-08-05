import { useState, useRef, useEffect } from 'react';
import {
  Home as HomeIcon,
  CreditCard,
  Settings as SettingsIcon,
  Bell,
  ArrowLeft,
  AlertTriangle,
  Plus,
  Search,
  Phone,
  Utensils,
  ChevronRight,
  DoorOpen,
  MoreHorizontal,
  Shirt,
  Megaphone,
  X,
  Building,
  CheckCircle,
  Edit3,
  Trash2,
  Users
} from 'lucide-react';
import type {
  DayOfWeek,
  PantryItem,
  KitchenExpense,
  Supplier,
  HostelRoom,
  ResidentRequest,
  FeeTransaction,
  RequestStatus,
  PaymentStatus
} from './types';
import {
  initialWeeklyMenu,
  initialPantryItems,
  initialExpenses,
  initialSuppliers,
  initialHostelStats,
  initialHostelRooms,
  initialResidentRequests,
  initialFeeTransactions
} from './mockData';
import { KitchenHomePage } from './kitchen/HomePage';
import { KitchenBroadcastPage } from './kitchen/BroadcastPage';
import { FeesManagementPage } from './kitchen/FeesManagementPage';
import { PaymentVerificationPage } from './kitchen/PaymentVerificationPage';
import { PaymentHistoryPage } from './kitchen/PaymentHistoryPage';
import { DuePaymentsPage } from './kitchen/DuePaymentsPage';
import { CollectResidentFeePage } from './kitchen/CollectResidentFeePage';
import { StaffManagementPage } from './kitchen/StaffManagementPage';
import { PayStaffSalaryPage } from './kitchen/PayStaffSalaryPage';
import { StaffAttendancePage } from './kitchen/StaffAttendancePage';
import { StaffPaymentHistoryPage } from './kitchen/StaffPaymentHistoryPage';
import { ExpensesManagementPage } from './kitchen/ExpensesManagementPage';
import { RoomManagementPage } from './rooms/RoomManagementPage';
import { OccupancyRatePage } from './kitchen/OccupancyRatePage';
import { BookingRequestsPage } from './kitchen/BookingRequestsPage';
import { OverdueDuesPage } from './kitchen/OverdueDuesPage';
import { OpenComplaintsPage } from './kitchen/OpenComplaintsPage';
import { RevenueAnalyticsPage } from './kitchen/RevenueAnalyticsPage';
import { GuestsDirectoryPage } from './kitchen/GuestsDirectoryPage';
import { AddPantryItemPage } from './kitchen/AddPantryItemPage';
import { UpdateStockPage } from './kitchen/UpdateStockPage';
import { SuccessRatePage } from './kitchen/SuccessRatePage';
import { SubscriptionPlansPage } from './kitchen/SubscriptionPlansPage';
import type { PlanType } from './kitchen/SubscriptionPlansPage';
import { NotificationsPage } from './NotificationsPage';
import { LaundryPage, CreateLaundryOrderPage, initialLaundryOrders } from './laundry';
import { SettingsPage } from './settings/SettingsPage';
import { UsersHistoryPage } from './users/UsersHistoryPage';
import { AddUserPage } from './users/AddUserPage';
import type { LaundryOrder } from './laundry';

function App() {
  // Navigation & View States
  const [currentHostelName, setCurrentHostelName] = useState('Happy Hostels');
  const [currentPlan, setCurrentPlan] = useState<PlanType>('Gold');
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'fees' | 'rooms' | 'laundry' | 'broadcast' | 'settings' | 'kitchen'>('home');
  const [kitchenTab, setKitchenTab] = useState<'menu' | 'pantry' | 'expenses' | 'suppliers'>('menu');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'edit-menu' | 'add-pantry' | 'update-stock' | 'log-expense' | 'create-laundry-order' | 'add-user' | 'payment-verification' | 'payment-history' | 'due-payments' | 'collect-fee' | 'staff-management' | 'pay-staff-salary' | 'staff-attendance' | 'staff-payment-history' | 'expenses-management' | 'notifications' | 'occupancy-rate' | 'booking-requests' | 'overdue-dues' | 'open-complaints' | 'revenue-analytics' | 'guests-directory' | 'success-rate' | 'subscription-plans'>('home');
  const [selectedVerificationFee, setSelectedVerificationFee] = useState<FeeTransaction | null>(null);
  const [selectedCollectResident, setSelectedCollectResident] = useState<{ id: string; name: string; roomNumber: string; amount?: number } | null>(null);
  const [selectedPayStaff, setSelectedPayStaff] = useState<{ name: string; role?: string; salaryMonthly: number; absentDays?: number } | null>(null);
  const [selectedAttendanceStaff, setSelectedAttendanceStaff] = useState<{ name: string; role?: string; presentDays?: number; absentDays?: number } | null>(null);
  const [laundryOrders, setLaundryOrders] = useState<LaundryOrder[]>(initialLaundryOrders);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['m2', 'm3']);

  // Drawer & Modal States
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedRoomModal, setSelectedRoomModal] = useState<HostelRoom | null>(null);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState<FeeTransaction | null>(null);

  // Search & Filter States
  const [requestSearchQuery] = useState('');
  const [requestFilter] = useState<'All' | RequestStatus>('All');
  const [roomFloorFilter, setRoomFloorFilter] = useState<string>('All');
  void setRoomFloorFilter;
  const [feeSearchQuery, setFeeSearchQuery] = useState('');
  const [feeMonthFilter, setFeeMonthFilter] = useState<string>('All');
  const [feeStatusFilter, setFeeStatusFilter] = useState<'All' | PaymentStatus>('All');

  // New Request Form State
  const [newReqName, setNewReqName] = useState('');
  const [newReqRoom, setNewReqRoom] = useState('');
  const [newReqType, setNewReqType] = useState<'Maintenance' | 'Room Request' | 'Complaint' | 'Leave Request' | 'Sick Meal'>('Maintenance');
  const [newReqDetails, setNewReqDetails] = useState('');

  // Hostel Data States
  const [hostelStats] = useState(initialHostelStats);
  void hostelStats;
  const [hostelRooms] = useState<HostelRoom[]>(initialHostelRooms);
  const [residentRequests, setResidentRequests] = useState<ResidentRequest[]>(initialResidentRequests);
  const [feeTransactions, setFeeTransactions] = useState<FeeTransaction[]>(initialFeeTransactions);

  // Kitchen Data States
  const [weeklyMenu, setWeeklyMenu] = useState(initialWeeklyMenu);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [expenses, setExpenses] = useState<KitchenExpense[]>(initialExpenses);
  const [expenseSearchQuery, setExpenseSearchQuery] = useState('');
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState('All');
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState('');
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Form state for Supplier modal
  const [supName, setSupName] = useState('');
  const [supContactPerson, setSupContactPerson] = useState('');
  const [supPhone, setSupPhone] = useState('');
  const [supItems, setSupItems] = useState('');
  const [supAddress, setSupAddress] = useState('');
  const [supLastDelivery, setSupLastDelivery] = useState('');
  const [supPaymentStatus, setSupPaymentStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');

  // Form States - Kitchen
  const [editingDay, setEditingDay] = useState<DayOfWeek | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [menuBreakfast, setMenuBreakfast] = useState('');
  const [menuLunch, setMenuLunch] = useState('');
  const [menuSnacks, setMenuSnacks] = useState('');
  const [menuDinner, setMenuDinner] = useState('');
  const [_pantryName, _setPantryName] = useState('');
  const [_pantryUnit, _setPantryUnit] = useState('kg');
  const [_pantryPrice, _setPantryPrice] = useState('');
  const [_pantryStock, _setPantryStock] = useState('');
  const [_pantrySupplier, _setPantrySupplier] = useState('');
  const [_addStockAmount, _setAddStockAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory] = useState('Grocery / Grains');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseDate] = useState(new Date().toISOString().substring(0, 10));

  // Global Navigation History
  const [historyStack, setHistoryStack] = useState<{screen: string, tab: string}[]>([{screen: 'home', tab: 'home'}]);
  void historyStack;
  const isBackNav = useRef(false);

  useEffect(() => {
    if (isBackNav.current) {
      isBackNav.current = false;
    } else {
      setHistoryStack(prev => {
        const last = prev[prev.length - 1];
        if (last && (last.screen !== currentScreen || last.tab !== activeTab)) {
          return [...prev, { screen: currentScreen, tab: activeTab }];
        }
        return prev;
      });
    }
  }, [currentScreen, activeTab]);

  const handleGlobalBack = () => {
    setHistoryStack(prev => {
      if (prev.length > 1) {
        isBackNav.current = true;
        const newHistory = prev.slice(0, -1);
        const target = newHistory[newHistory.length - 1];
        setCurrentScreen(target.screen as any);
        setActiveTab(target.tab as any);
        return newHistory;
      } else {
        isBackNav.current = true;
        setCurrentScreen('home');
        setActiveTab('home');
        return [{screen: 'home', tab: 'home'}];
      }
    });
  };

  // UI Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Handlers for Request Actions (kept for future use)
  const _handleUpdateRequestStatus = (id: string, newStatus: RequestStatus) => {
    setResidentRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    }));
    const reqItem = residentRequests.find(r => r.id === id);
    showToast(`Request from ${reqItem?.residentName || 'resident'} marked ${newStatus}`);
  };
  void _handleUpdateRequestStatus;

  const handleCreateNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqName || !newReqRoom || !newReqDetails) {
      showToast('Please complete all required fields');
      return;
    }
    const newReq: ResidentRequest = {
      id: 'req-' + Date.now(),
      residentName: newReqName,
      roomNumber: newReqRoom,
      type: newReqType,
      details: newReqDetails,
      status: 'Pending',
      date: new Date().toISOString().substring(0, 10),
      priority: 'High',
      avatarBg: '#2563eb'
    };
    setResidentRequests(prev => [newReq, ...prev]);
    showToast(`New request submitted for Room ${newReqRoom}`);
    setNewReqName('');
    setNewReqRoom('');
    setNewReqDetails('');
    setIsNewRequestModalOpen(false);
  };

  // Handlers for Fee Actions
  const handleRecordFeePayment = (id: string) => {
    setFeeTransactions(prev => prev.map(ft => {
      if (ft.id === id) {
        return {
          ...ft,
          amountPaid: ft.amount,
          dues: 0,
          status: 'Paid',
          paymentMethod: 'UPI / GPay'
        };
      }
      return ft;
    }));
    const ftItem = feeTransactions.find(f => f.id === id);
    showToast(`Payment of ₹${ftItem?.amount.toLocaleString('en-IN')} recorded for ${ftItem?.studentName}`);
    setIsPayModalOpen(null);
  };

  const handleSendReminder = (name: string) => {
    showToast(`Payment reminder SMS & WhatsApp sent to ${name}`);
  };

  const handleAcceptPaymentVerification = (id: string) => {
    setFeeTransactions(prev => prev.map(ft => {
      if (ft.id === id) {
        return {
          ...ft,
          amountPaid: ft.amount,
          dues: 0,
          status: 'Paid',
          paymentMethod: 'UPI Verified',
          history: [
            {
              id: `h-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              amountPaid: ft.amount,
              paymentMethod: 'UPI Verified',
              receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
            },
            ...(ft.history || [])
          ]
        };
      }
      return ft;
    }));
    showToast('Payment accepted successfully.');
    setSelectedVerificationFee(null);
    setCurrentScreen('home');
    setActiveTab('fees');
  };

  const handleRejectPaymentVerification = (_id: string, reason: string) => {
    showToast(`Payment proof rejected: ${reason}. Resident notified.`);
    setSelectedVerificationFee(null);
    setCurrentScreen('home');
    setActiveTab('fees');
  };

  // Supplier Action Handlers
  const openAddSupplierModal = () => {
    setEditingSupplier(null);
    setSupName('');
    setSupContactPerson('');
    setSupPhone('');
    setSupItems('');
    setSupAddress('');
    setSupLastDelivery(new Date().toISOString().substring(0, 10));
    setSupPaymentStatus('Paid');
    setIsSupplierModalOpen(true);
  };

  const openEditSupplierModal = (sup: Supplier) => {
    setEditingSupplier(sup);
    setSupName(sup.name);
    setSupContactPerson(sup.contactPerson);
    setSupPhone(sup.phone);
    setSupItems(sup.itemsSupplied);
    setSupAddress(sup.address);
    setSupLastDelivery(sup.lastDeliveryDate);
    setSupPaymentStatus(sup.paymentStatus);
    setIsSupplierModalOpen(true);
  };

  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supName || !supContactPerson || !supPhone) {
      showToast('Please fill required supplier details');
      return;
    }

    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => {
        if (s.id === editingSupplier.id) {
          return {
            ...s,
            name: supName,
            contactPerson: supContactPerson,
            phone: supPhone,
            itemsSupplied: supItems,
            address: supAddress,
            lastDeliveryDate: supLastDelivery,
            paymentStatus: supPaymentStatus
          };
        }
        return s;
      }));
      showToast(`Updated supplier "${supName}"`);
    } else {
      const newSup: Supplier = {
        id: 'sup-' + Date.now(),
        name: supName,
        contactPerson: supContactPerson,
        phone: supPhone,
        itemsSupplied: supItems,
        address: supAddress,
        lastDeliveryDate: supLastDelivery,
        paymentStatus: supPaymentStatus
      };
      setSuppliers(prev => [newSup, ...prev]);
      showToast(`Added new supplier "${supName}"`);
    }
    setIsSupplierModalOpen(false);
  };

  const handleDeleteSupplier = (id: string, name: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    showToast(`Supplier "${name}" deleted`);
  };

  // Kitchen Navigation Helpers — used in kitchen sub-module JSX
  const navigateToEditMenu = (day: DayOfWeek) => {
    setEditingDay(day);
    const m = weeklyMenu[day];
    setMenuBreakfast(m.breakfast); setMenuLunch(m.lunch);
    setMenuSnacks(m.snacks); setMenuDinner(m.dinner);
    setCurrentScreen('edit-menu');
    setTimeout(() => {
      window.scrollTo(0, 0);
      const appScreen = document.querySelector('.app-screen');
      if (appScreen) appScreen.scrollTop = 0;
      const appContent = document.querySelector('.app-content');
      if (appContent) appContent.scrollTop = 0;
    }, 40);
  };
  const navigateToAddPantry = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentScreen('add-pantry');
    setTimeout(() => {
      window.scrollTo(0, 0);
      const appScreen = document.querySelector('.app-screen');
      if (appScreen) appScreen.scrollTop = 0;
      const appContent = document.querySelector('.app-content');
      if (appContent) appContent.scrollTop = 0;
    }, 40);
  };
  const navigateToUpdateStock = (id?: string) => { setUpdatingItemId(id || null); setCurrentScreen('update-stock'); setTimeout(() => { window.scrollTo(0, 0); const appScreen = document.querySelector('.app-screen'); if (appScreen) appScreen.scrollTop = 0; }, 40); };
  const navigateToLogExpense = () => { setExpenseAmount(''); setExpenseDescription(''); setCurrentScreen('log-expense'); };
  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDay) return;
    setWeeklyMenu(prev => ({
      ...prev,
      [editingDay]: {
        breakfast: menuBreakfast,
        lunch: menuLunch,
        snacks: menuSnacks,
        dinner: menuDinner
      }
    }));
    showToast(`Updated menu for ${editingDay}`);
    setCurrentScreen('home');
  };


  const handleDeletePantryItem = (id: string) => {
    const itemToDelete = pantryItems.find(i => i.id === id);
    setPantryItems(prev => prev.filter(item => item.id !== id));
    showToast(`Removed ${itemToDelete?.name || 'Item'} from pantry inventory`);
  };

  const handleLogExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount || !expenseDescription) {
      showToast('Please enter amount and description');
      return;
    }
    const newExpense: KitchenExpense = {
      id: 'e_' + Date.now(),
      date: expenseDate,
      category: expenseCategory,
      description: expenseDescription,
      amount: parseFloat(expenseAmount),
      status: 'Paid'
    };
    setExpenses(prev => [newExpense, ...prev]);
    showToast(`Expense of ₹${parseFloat(expenseAmount).toLocaleString('en-IN')} logged`);
    setKitchenTab('expenses');
    setCurrentScreen('home');
  };

  const handleToggleMember = (id: string) => {
    setSelectedMemberIds(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleClearAllMembers = () => {
    setSelectedMemberIds([]);
  };

  // Filter Computations (requestFilter/requestSearchQuery kept for future use)
  const _filteredRequests = residentRequests.filter(req => {
    const matchesSearch = req.residentName.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
      req.roomNumber.includes(requestSearchQuery) ||
      req.details.toLowerCase().includes(requestSearchQuery.toLowerCase());
    const matchesStatus = requestFilter === 'All' || req.status === requestFilter;
    return matchesSearch && matchesStatus;
  });
  void _filteredRequests;

  const filteredRooms = hostelRooms.filter(room => {
    if (roomFloorFilter === 'All') return true;
    return room.floor === roomFloorFilter;
  });
  void filteredRooms;

  void feeSearchQuery;
  void setFeeSearchQuery;
  void feeMonthFilter;
  void setFeeMonthFilter;
  void feeStatusFilter;
  void setFeeStatusFilter;
  void isPayModalOpen;
  void setIsPayModalOpen;
  void handleRecordFeePayment;
  void handleSendReminder;



  const lowStockCount = pantryItems.filter(item => item.stock <= item.threshold).length;

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.description.toLowerCase().includes(expenseSearchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(expenseSearchQuery.toLowerCase());
    const matchesCategory = expenseCategoryFilter === 'All' || exp.category === expenseCategoryFilter;
    return matchesSearch && matchesCategory;
  });
  const totalExpensesSum = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  const filteredSuppliers = suppliers.filter(sup =>
    sup.name.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
    sup.contactPerson.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
    sup.itemsSupplied.toLowerCase().includes(supplierSearchQuery.toLowerCase())
  );

  const getPageTitle = () => {
    if (currentScreen === 'edit-menu') return `Edit Menu: ${editingDay || ''}`;
    if (currentScreen === 'add-pantry') return 'Add Pantry Item';
    if (currentScreen === 'update-stock') return 'Update Pantry Stock';
    if (currentScreen === 'log-expense') return 'Log Kitchen Expense';
    if (currentScreen === 'create-laundry-order') return 'Create Laundry Order';
    if (currentScreen === 'add-user') return 'Add User';
    if (currentScreen === 'subscription-plans') return 'Subscription Plans';

    switch (activeTab) {
      case 'home':
        return null;
      case 'kitchen':
        return 'Kitchen Management';
      case 'laundry':
        return 'Laundry Management';
      case 'broadcast':
        return 'Broadcast';
      case 'requests':
        return 'Users';
      case 'fees':
        return 'Analytics';
      case 'rooms':
        return 'Room Management';
      case 'settings':
        return 'Settings';
      default:
        return null;
    }
  };

  return (
    <div className="app-simulator">
      <div className="app-screen">

        {/* VIRTUAL STATUS BAR */}
        <div className="phone-status-bar">
          <span className="status-bar-time">9:41</span>
          <div className="status-bar-icons">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <path d="M2 3h1v5H2zM5 1h1v7H5zM8 0h1v8H8zM11 2h1v6h-1zM14 4h1v4h-1z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.58 16.14a7 7 0 0 1 6.83 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
              <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" fill="none" stroke="currentColor" />
              <rect x="2" y="2" width="13" height="7" rx="1.5" />
              <path d="M20 3.5v4" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* DYNAMIC HEADER BAR WITH HOSTEL NAME */}
        <header className="app-header">
          <div className="header-left">
            {(currentScreen !== 'home' || activeTab !== 'home') && (
              <button className="header-btn" onClick={handleGlobalBack} aria-label="Go back">
                <ArrowLeft size={18} />
              </button>
            )}

            <span className="header-logo-icon">
              <Building size={18} />
            </span>

            <h1 className="header-title">
              {currentHostelName}
            </h1>
          </div>

          <div className="header-right">
            <button className="header-btn" onClick={() => setCurrentScreen('notifications')} aria-label="Notifications">
              <Bell size={18} />
              <span className="header-btn-badge" />
            </button>

            {/* PROFILE AVATAR BUTTON + DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button
                className="header-profile-avatar"
                onClick={() => setIsProfileOpen(prev => !prev)}
                aria-label="Profile"
              >
                V
              </button>

              {isProfileOpen && (
                <>
                  {/* backdrop to close */}
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 49 }}
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="profile-dropdown">
                    {/* Profile info row */}
                    <div className="profile-dropdown-info">
                      <div className="profile-dropdown-avatar">V</div>
                      <div>
                        <div className="profile-dropdown-name">Vijaya</div>
                        <div className="profile-dropdown-role">Hostel Owner</div>
                      </div>
                    </div>
                    <div className="profile-dropdown-divider" />
                    {/* Profile Settings */}
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('settings');
                        setCurrentScreen('home');
                      }}
                    >
                      <span className="profile-dropdown-item-icon"><SettingsIcon size={16} /></span>
                      <span>Profile Settings</span>
                    </button>
                    {/* Logout */}
                    <button
                      className="profile-dropdown-item logout"
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (showToast) showToast('You have been logged out.');
                      }}
                    >
                      <span className="profile-dropdown-item-icon"><DoorOpen size={16} /></span>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE TITLE BELOW NAVBAR (Hidden on Home page) */}
        {(currentScreen !== 'home' || activeTab !== 'home') && getPageTitle() && (
          <div className="page-title-banner">
            <h2 className="page-title-text">{getPageTitle()}</h2>
          </div>
        )}

        {/* MAIN CONTENT CONTAINER */}
        <main className="app-content">

          {/* TOAST NOTIFICATION */}
          {toastMessage && (
            <div className="toast-msg" role="alert" aria-live="polite">
              <span className="toast-icon-wrap">
                <CheckCircle size={15} strokeWidth={2.5} />
              </span>
              <span className="toast-text">{toastMessage}</span>
              <div className="toast-progress-bar" />
            </div>
          )}

          {/* SCREEN: FULL-SCREEN NOTIFICATIONS */}
          {currentScreen === 'notifications' && (
            <NotificationsPage
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('home');
              }}
            />
          )}

          {/* SCREEN 1: REDESIGNED HOME DASHBOARD */}
          {currentScreen === 'home' && activeTab === 'home' && (
            <div className="home-screen-container">
              <KitchenHomePage
                userName="Vijaya"
                currentHostel={currentHostelName}
                currentPlan={currentPlan}
                onSelectHostel={(name) => setCurrentHostelName(name)}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onNavigateScreen={(screen) => setCurrentScreen(screen as any)}
                showToast={showToast}
              />
            </div>
          )}

          {/* SUBSCRIPTION PLANS SCREEN */}
          {currentScreen === 'subscription-plans' && (
            <SubscriptionPlansPage 
              currentPlan={currentPlan}
              onUpdatePlan={(newPlan) => setCurrentPlan(newPlan)}
              onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }}
              showToast={showToast}
            />
          )}

          {/* DEDICATED CARD PAGES */}
          {currentScreen === 'add-pantry' && (
            <AddPantryItemPage
              suppliers={suppliers}
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('kitchen');
                setKitchenTab('pantry');
              }}
              onAddItem={(newItemData) => {
                const newItem: PantryItem = {
                  id: 'p_' + Date.now(),
                  ...newItemData
                };
                setPantryItems(prev => [...prev, newItem]);
                showToast(`Added ${newItem.name} to pantry`);
                setKitchenTab('pantry');
                setActiveTab('kitchen');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'update-stock' && (
            <UpdateStockPage
              pantryItems={pantryItems}
              initialItemId={updatingItemId}
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('kitchen');
                setKitchenTab('pantry');
              }}
              onSaveStock={(itemId, quantityToAdd, totalCost) => {
                setPantryItems(prev => prev.map(item => {
                  if (item.id === itemId) {
                    return { ...item, stock: item.stock + quantityToAdd };
                  }
                  return item;
                }));
                const targetItem = pantryItems.find(i => i.id === itemId);
                showToast(`Added +${quantityToAdd} ${targetItem?.unit || 'stock'} to ${targetItem?.name || 'item'} (${totalCost > 0 ? '₹' + totalCost : ''})`);
                setKitchenTab('pantry');
                setActiveTab('kitchen');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'occupancy-rate' && (
            <OccupancyRatePage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} />
          )}

          {currentScreen === 'booking-requests' && (
            <BookingRequestsPage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} />
          )}

          {currentScreen === 'overdue-dues' && (
            <OverdueDuesPage
              onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }}
              onNavigateToCollectFee={(res) => {
                setSelectedCollectResident(res);
                setCurrentScreen('collect-fee');
              }}
              showToast={showToast}
            />
          )}

          {currentScreen === 'open-complaints' && (
            <OpenComplaintsPage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} showToast={showToast} />
          )}

          {currentScreen === 'revenue-analytics' && (
            <RevenueAnalyticsPage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} />
          )}

          {currentScreen === 'guests-directory' && (
            <GuestsDirectoryPage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} />
          )}

          {currentScreen === 'success-rate' && (
            <SuccessRatePage onBack={() => { setCurrentScreen('home'); setActiveTab('home'); }} />
          )}

          {/* SCREEN 2: USERS HISTORY PAGE (REQUESTS NAVIGATION) */}
          {currentScreen === 'home' && activeTab === 'requests' && (
            <div className="p-16">
              <UsersHistoryPage
                showToast={showToast}
                onNavigateToAddUser={() => setCurrentScreen('add-user')}
              />
            </div>
          )}

          {/* FULL-SCREEN ADD USER PAGE */}
          {currentScreen === 'add-user' && (
            <div className="p-16">
              <AddUserPage
                onSuccess={() => {
                  setCurrentScreen('home');
                  setActiveTab('requests');
                }}
                showToast={showToast}
              />
            </div>
          )}

          {/* SCREEN 3: HAPPYHOSTEL ROOM & BED MANAGEMENT */}
          {currentScreen === 'home' && activeTab === 'rooms' && (
            <div className="p-16">
              <RoomManagementPage />
            </div>
          )}

          {/* SCREEN 4: REDESIGNED FEES MANAGEMENT (REFERENCE IMAGE MATCH) */}
          {currentScreen === 'home' && activeTab === 'fees' && (
            <div className="p-16">
              <FeesManagementPage
                feeTransactions={feeTransactions}
                setFeeTransactions={setFeeTransactions}
                showToast={showToast}
                onSelectFeeForVerification={(fee) => {
                  setSelectedVerificationFee(fee);
                  setCurrentScreen('payment-verification');
                }}
                onOpenPaymentHistory={() => setCurrentScreen('payment-history')}
                onOpenDuePayments={() => setCurrentScreen('due-payments')}
                onNavigateToCollectFee={(res) => {
                  setSelectedCollectResident(res);
                  setCurrentScreen('collect-fee');
                }}
                onOpenStaffManagement={() => setCurrentScreen('staff-management')}
                onOpenExpenses={() => setCurrentScreen('expenses-management')}
              />
            </div>
          )}

          {/* SCREEN: FULL-SCREEN EXPENSES MANAGEMENT */}
          {currentScreen === 'expenses-management' && (
            <ExpensesManagementPage
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
            />
          )}



          {/* SCREEN: FULL-SCREEN PAYMENT VERIFICATION DETAILS */}
          {currentScreen === 'payment-verification' && selectedVerificationFee && (
            <PaymentVerificationPage
              transaction={selectedVerificationFee}
              onBack={() => {
                setSelectedVerificationFee(null);
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
              onAcceptPayment={handleAcceptPaymentVerification}
              onRejectPayment={handleRejectPaymentVerification}
            />
          )}

          {/* SCREEN: FULL-SCREEN PAYMENT HISTORY */}
          {currentScreen === 'payment-history' && (
            <PaymentHistoryPage
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN DUE PAYMENTS */}
          {currentScreen === 'due-payments' && (
            <DuePaymentsPage
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
              onOpenHistory={() => setCurrentScreen('payment-history')}
              onNavigateToCollectFee={(res) => {
                setSelectedCollectResident(res);
                setCurrentScreen('collect-fee');
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN COLLECT RESIDENT FEE */}
          {currentScreen === 'collect-fee' && (
            <CollectResidentFeePage
              initialResident={selectedCollectResident}
              onBack={() => {
                setSelectedCollectResident(null);
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
              onSubmitReceipt={(_studentId, amount, _paymentMode, _period) => {
                setFeeTransactions(prev => prev.map(ft => {
                  if (selectedCollectResident && (ft.id === selectedCollectResident.id || ft.studentName.toLowerCase().includes(selectedCollectResident.name.toLowerCase()))) {
                    return {
                      ...ft,
                      amountPaid: amount,
                      dues: Math.max(0, ft.amount - amount),
                      status: amount >= ft.amount ? 'Paid' : 'Partial'
                    };
                  }
                  return ft;
                }));
                showToast(`Payment receipt of ₹${amount.toLocaleString('en-IN')} submitted successfully!`);
                setSelectedCollectResident(null);
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN STAFF MANAGEMENT */}
          {currentScreen === 'staff-management' && (
            <StaffManagementPage
              onBack={() => {
                setCurrentScreen('home');
                setActiveTab('fees');
              }}
              onOpenHistory={() => setCurrentScreen('staff-payment-history')}
              onNavigateToPaySalary={(staff) => {
                setSelectedPayStaff(staff);
                setCurrentScreen('pay-staff-salary');
              }}
              onNavigateToAttendance={(staff) => {
                setSelectedAttendanceStaff(staff);
                setCurrentScreen('staff-attendance');
              }}
              onPaySalary={(staffName, amount) => {
                showToast(`Monthly salary payout of ₹${amount.toLocaleString('en-IN')} paid to ${staffName}.`);
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN PAY STAFF SALARY */}
          {currentScreen === 'pay-staff-salary' && (
            <PayStaffSalaryPage
              initialStaff={selectedPayStaff}
              onBack={() => {
                setSelectedPayStaff(null);
                setCurrentScreen('staff-management');
              }}
              onDisburseSalary={(staffName, amount, month, channel) => {
                showToast(`Salary of ₹${amount.toLocaleString('en-IN')} disbursed successfully to ${staffName} for ${month} via ${channel}!`);
                setSelectedPayStaff(null);
                setCurrentScreen('staff-management');
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN STAFF ATTENDANCE */}
          {currentScreen === 'staff-attendance' && (
            <StaffAttendancePage
              initialStaff={selectedAttendanceStaff}
              onBack={() => {
                setSelectedAttendanceStaff(null);
                setCurrentScreen('staff-management');
              }}
            />
          )}

          {/* SCREEN: FULL-SCREEN STAFF PAYMENT HISTORY */}
          {currentScreen === 'staff-payment-history' && (
            <StaffPaymentHistoryPage
              onBack={() => setCurrentScreen('staff-management')}
            />
          )}


          {/* SCREEN 5: LAUNDRY MANAGEMENT */}
          {currentScreen === 'home' && activeTab === 'laundry' && (
            <div className="p-16">
              <LaundryPage
                showToast={showToast}
                ordersList={laundryOrders}
                onNavigateToCreateOrder={() => setCurrentScreen('create-laundry-order')}
              />
            </div>
          )}

          {/* SCREEN: CREATE LAUNDRY ORDER */}
          {currentScreen === 'create-laundry-order' && (
            <div className="p-16">
              <CreateLaundryOrderPage
                onSaveOrder={(newOrder) => {
                  setLaundryOrders([newOrder, ...laundryOrders]);
                  if (showToast) showToast(`Laundry Order ${newOrder.orderId} created successfully!`);
                  setCurrentScreen('home');
                  setActiveTab('laundry');
                }}
                onCancel={() => {
                  setCurrentScreen('home');
                  setActiveTab('laundry');
                }}
                showToast={showToast}
                nextOrderIdNumber={100 + laundryOrders.length + 1}
              />
            </div>
          )}

          {/* SCREEN 6: BROADCAST SYSTEM */}
          {currentScreen === 'home' && activeTab === 'broadcast' && (
            <div className="p-16">
              <KitchenBroadcastPage
                showToast={showToast}
                selectedMemberIds={selectedMemberIds}
                onToggleMember={handleToggleMember}
                onClearAllMembers={handleClearAllMembers}
              />
            </div>
          )}

          {/* SCREEN 7: SYSTEM SETTINGS */}
          {currentScreen === 'home' && activeTab === 'settings' && (
            <div className="p-16">
              <SettingsPage showToast={showToast} />
            </div>
          )}

          {/* DEDICATED KITCHEN MANAGEMENT PAGE */}
          {currentScreen === 'home' && activeTab === 'kitchen' && (
            <div className="p-16">



              {/* 2 Action Buttons Row */}
              <div className="kitchen-action-btns-row">
                <button type="button" className="btn-kitchen-soft" onClick={navigateToAddPantry}>
                  <Plus size={16} /> Add Pantry Item
                </button>
                <button type="button" className="btn-kitchen-solid" onClick={() => navigateToUpdateStock('')}>
                  <Plus size={16} /> Add Stock
                </button>
              </div>

              {/* Low Stock Alert Banner */}
              <div className="low-stock-alert-banner" onClick={() => setKitchenTab('pantry')}>
                <div className="low-stock-alert-left">
                  <AlertTriangle size={18} style={{ color: '#ef4444' }} />
                  <span>Attention: {lowStockCount} items running low in stock!</span>
                </div>
                <ChevronRight size={18} style={{ color: '#991b1b' }} />
              </div>

              {/* Kitchen Navigation Tabs */}
              <div className="kitchen-tabs-nav">
                <button
                  className={`kitchen-tab-btn ${kitchenTab === 'menu' ? 'active' : ''}`}
                  onClick={() => setKitchenTab('menu')}
                >
                  Weekly Menu
                </button>
                <button
                  className={`kitchen-tab-btn ${kitchenTab === 'pantry' ? 'active' : ''}`}
                  onClick={() => setKitchenTab('pantry')}
                >
                  Pantry Inventory
                </button>
                <button
                  className={`kitchen-tab-btn ${kitchenTab === 'suppliers' ? 'active' : ''}`}
                  onClick={() => setKitchenTab('suppliers')}
                >
                  Suppliers Directory
                </button>
              </div>

              {/* TAB 1: WEEKLY MESS MENU */}
              {kitchenTab === 'menu' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 className="weekly-menu-title" style={{ marginBottom: 0 }}>Weekly Mess Menu</h2>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>7 Days Grid</span>
                  </div>

                  <div className="weekly-menu-cards-grid">
                    {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as DayOfWeek[]).map((day) => {
                      const meals = weeklyMenu[day];
                      return (
                        <div
                          key={day}
                          className="day-menu-card-compact"
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigateToEditMenu(day)}
                        >
                          <div className="day-card-compact-header">
                            <span className="day-card-compact-name">{day}</span>
                            <button
                              type="button"
                              className="edit-btn-compact"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToEditMenu(day);
                              }}
                              aria-label={`Edit ${day} menu`}
                            >
                              <Edit3 size={13} />
                            </button>
                          </div>

                          <div className="meal-compact-item">
                            <div className="meal-compact-label">Breakfast</div>
                            <div className="meal-compact-value">{meals.breakfast}</div>
                          </div>

                          <div className="meal-compact-item">
                            <div className="meal-compact-label">Lunch</div>
                            <div className="meal-compact-value">{meals.lunch}</div>
                          </div>

                          <div className="meal-compact-item">
                            <div className="meal-compact-label">Snacks</div>
                            <div className="meal-compact-value">{meals.snacks}</div>
                          </div>

                          <div className="meal-compact-item">
                            <div className="meal-compact-label">Dinner</div>
                            <div className="meal-compact-value">{meals.dinner}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: PANTRY INVENTORY */}
              {kitchenTab === 'pantry' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h2 className="weekly-menu-title" style={{ marginBottom: 0 }}>Pantry Inventory ({pantryItems.length})</h2>
                    <button
                      type="button"
                      className="quick-action-pill"
                      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', border: 'none' }}
                      onClick={navigateToAddPantry}
                    >
                      <Plus size={14} /> Add Item
                    </button>
                  </div>

                  <div className="pantry-inventory-feed">
                    {pantryItems.map(item => {
                      const isLow = item.stock <= item.threshold;
                      return (
                        <div key={item.id} className={`pantry-inventory-card ${isLow ? 'low-stock' : 'sufficient-stock'}`}>
                          {/* TOP: ITEM NAME & STATUS BADGE */}
                          <div className="pantry-card-top">
                            <div className="pantry-item-name">{item.name}</div>
                            <span className={`pantry-status-pill ${isLow ? 'low' : 'sufficient'}`}>
                              ● {isLow ? 'Low Stock' : 'Sufficient'}
                            </span>
                          </div>

                          {/* MIDDLE: SUPPLIER & UNIT PRICE GRID */}
                          <div className="pantry-card-details-grid">
                            <div className="pantry-detail-col">
                              <span className="pantry-detail-label">Supplier</span>
                              <span className="pantry-detail-value">{item.supplier || 'Mother Dairy Local'}</span>
                            </div>
                            <div className="pantry-detail-col">
                              <span className="pantry-detail-label">Unit Price</span>
                              <span className="pantry-detail-value">₹{item.price} / {item.unit}</span>
                            </div>
                          </div>

                          {/* BOTTOM: STOCK & ADD ACTION BUTTON */}
                          <div className="pantry-card-bottom">
                            <div className="pantry-stock-info">
                              <span className="pantry-stock-label">Current Stock</span>
                              <div className="pantry-stock-value-wrap">
                                <span className={`pantry-stock-value ${isLow ? 'danger' : 'normal'}`}>
                                  {item.stock} {item.unit}
                                </span>
                                <span className="pantry-stock-min">(Min: {item.threshold})</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                type="button"
                                className="pantry-add-stock-btn"
                                onClick={() => navigateToUpdateStock(item.id)}
                              >
                                <Plus size={14} /> Add Stock
                              </button>
                              <button
                                type="button"
                                className="pantry-delete-btn"
                                onClick={() => handleDeletePantryItem(item.id)}
                                title="Delete Item"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: KITCHEN EXPENSES */}
              {kitchenTab === 'expenses' && (
                <div>
                  {/* Search and Category Filter Pills */}
                  <div className="search-filter-wrap">
                    <div className="search-box-modern">
                      <Search size={16} style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        className="search-box-input"
                        value={expenseSearchQuery}
                        onChange={(e) => setExpenseSearchQuery(e.target.value)}
                      />
                      {expenseSearchQuery && (
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setExpenseSearchQuery('')}>
                          <X size={14} style={{ color: 'var(--text-muted)' }} />
                        </button>
                      )}
                    </div>

                    <div className="filter-pills-row">
                      {['All', 'Grocery / Grains', 'Dairy', 'Eggs / Poultry', 'Veggies / Fruits'].map(cat => (
                        <button
                          key={cat}
                          className={`pill-btn ${expenseCategoryFilter === cat ? 'active' : ''}`}
                          onClick={() => setExpenseCategoryFilter(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Total Monthly Expenses Banner */}
                  <div className="expense-total-banner">
                    <div className="expense-total-header">Total Monthly Expenses</div>
                    <div className="expense-total-amount">₹{totalExpensesSum.toLocaleString('en-IN')}</div>
                    <div className="expense-total-pill">
                      Logged {filteredExpenses.length} payment{filteredExpenses.length !== 1 ? 's' : ''} in July 2026
                    </div>
                  </div>

                  {/* Section Title & Action Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 className="payment-ledger-title" style={{ marginBottom: 0 }}>Payment Ledger</h2>
                    <button
                      className="quick-action-pill"
                      style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none' }}
                      onClick={navigateToLogExpense}
                    >
                      <Plus size={14} /> Log Expense
                    </button>
                  </div>

                  {/* Payment Ledger Cards List */}
                  {filteredExpenses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No expense records match your filter.
                    </div>
                  ) : (
                    <div>
                      {filteredExpenses.map(exp => {
                        let categoryIcon = '📦';
                        if (exp.category.includes('Grocery') || exp.category.includes('Grains')) categoryIcon = '🌾';
                        else if (exp.category.includes('Dairy')) categoryIcon = '🥛';
                        else if (exp.category.includes('Egg') || exp.category.includes('Poultry')) categoryIcon = '🥚';
                        else if (exp.category.includes('Veg') || exp.category.includes('Fruit')) categoryIcon = '🥦';

                        return (
                          <div key={exp.id} className="ledger-card-item">
                            <div className="ledger-icon-box">
                              {categoryIcon}
                            </div>
                            <div className="ledger-content-body">
                              <div className="ledger-desc-title">{exp.description}</div>
                              <span className="ledger-category-tag">{exp.category}</span>
                            </div>
                            <div className="ledger-right-info">
                              <div className="ledger-amount-val">₹{exp.amount.toLocaleString('en-IN')}</div>
                              <div className="ledger-date-txt">{exp.date}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SUPPLIERS DIRECTORY */}
              {kitchenTab === 'suppliers' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h2 className="weekly-menu-title" style={{ marginBottom: 0 }}>Suppliers ({filteredSuppliers.length})</h2>
                    <button
                      className="quick-action-pill"
                      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', border: 'none' }}
                      onClick={openAddSupplierModal}
                    >
                      <Plus size={14} /> Add Supplier
                    </button>
                  </div>

                  {/* Clean Search Box */}
                  <div className="search-box-modern" style={{ marginBottom: '14px' }}>
                    <Search size={16} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search supplier, contact, or items..."
                      className="search-box-input"
                      value={supplierSearchQuery}
                      onChange={(e) => setSupplierSearchQuery(e.target.value)}
                    />
                    {supplierSearchQuery && (
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setSupplierSearchQuery('')}>
                        <X size={14} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    )}
                  </div>

                  {/* Modern Suppliers Cards List */}
                  {filteredSuppliers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No suppliers found.
                    </div>
                  ) : (
                    <div className="supplier-directory-feed">
                      {filteredSuppliers.map(sup => {
                        const initial = sup.name.charAt(0).toUpperCase();
                        const pStatus = sup.paymentStatus.toLowerCase();
                        return (
                          <div key={sup.id} className="supplier-directory-card">
                            {/* TOP ROW: BRAND & CALL BUTTON */}
                            <div className="supplier-card-top">
                              <div className="supplier-brand-wrap">
                                <div className="supplier-avatar-badge">{initial}</div>
                                <div className="supplier-name-text">{sup.name}</div>
                              </div>
                              <a href={`tel:${sup.phone}`} className="supplier-call-btn">
                                <Phone size={13} /> Call
                              </a>
                            </div>

                            {/* MIDDLE GRID: CONTACT PERSON & ITEMS */}
                            <div className="supplier-details-grid">
                              <div className="supplier-detail-col">
                                <span className="supplier-detail-label">Contact Person</span>
                                <span className="supplier-detail-value">{sup.contactPerson}</span>
                              </div>
                              <div className="supplier-detail-col">
                                <span className="supplier-detail-label">Items Supplied</span>
                                <span className="supplier-detail-value">{sup.itemsSupplied}</span>
                              </div>
                            </div>

                            {/* BOTTOM ROW: PAYMENT STATUS & EDIT/DELETE ACTIONS */}
                            <div className="supplier-card-bottom">
                              <span className={`supplier-payment-pill ${pStatus}`}>
                                ● {sup.paymentStatus}
                              </span>

                              <div className="supplier-actions-wrap">
                                <button
                                  type="button"
                                  className="supplier-action-edit"
                                  onClick={() => openEditSupplierModal(sup)}
                                >
                                  <Edit3 size={13} /> Edit
                                </button>
                                <button
                                  type="button"
                                  className="supplier-action-delete"
                                  onClick={() => handleDeleteSupplier(sup.id, sup.name)}
                                >
                                  <Trash2 size={13} /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* SCREEN: EDIT FOOD MENU */}
          {currentScreen === 'edit-menu' && (
            <form onSubmit={handleSaveMenu} className="p-16">
              <div className="modern-form-card">
                <div className="modern-form-header">
                  <div className="modern-form-icon-wrap" style={{ background: '#fff7ed', color: '#ea580c' }}>
                    <Utensils size={18} />
                  </div>
                  <div>
                    <div className="modern-form-title">Edit Weekly Menu</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#ea580c' }}>{editingDay}</div>
                  </div>
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">🥞 Breakfast Menu</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Idli, Sambar, Chutney, Tea"
                    className="modern-form-input"
                    value={menuBreakfast}
                    onChange={(e) => setMenuBreakfast(e.target.value)}
                  />
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">🍛 Lunch Menu</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rice, Dal Tadka, Paneer Butter Masala, Roti"
                    className="modern-form-input"
                    value={menuLunch}
                    onChange={(e) => setMenuLunch(e.target.value)}
                  />
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">☕ Evening Snacks</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samosa, Green Chutney, Coffee"
                    className="modern-form-input"
                    value={menuSnacks}
                    onChange={(e) => setMenuSnacks(e.target.value)}
                  />
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">🍽️ Dinner Menu</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Veg Biryani, Mirchi Ka Salan, Raitha"
                    className="modern-form-input"
                    value={menuDinner}
                    onChange={(e) => setMenuDinner(e.target.value)}
                  />
                </div>

                <div className="modern-form-actions-row">
                  <button type="button" className="btn-form-cancel" onClick={() => setCurrentScreen('home')}>Cancel</button>
                  <button type="submit" className="btn-form-save">Save Menu</button>
                </div>
              </div>
            </form>
          )}





          {/* SCREEN: LOG EXPENSE */}
          {currentScreen === 'log-expense' && (
            <form onSubmit={handleLogExpense} className="p-16">
              <div className="modern-form-card">
                <div className="modern-form-header">
                  <div className="modern-form-icon-wrap" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                    <CreditCard size={18} />
                  </div>
                  <div className="modern-form-title">Log Kitchen Expense</div>
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 1500"
                    className="modern-form-input"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </div>

                <div className="modern-field-group">
                  <label className="modern-field-label">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide details about the kitchen purchase..."
                    className="modern-form-input"
                    style={{ resize: 'none' }}
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                  />
                </div>

                <div className="modern-form-actions-row">
                  <button type="button" className="btn-form-cancel" onClick={() => setCurrentScreen('home')}>Cancel</button>
                  <button type="submit" className="btn-form-save">Save Expense</button>
                </div>
              </div>
            </form>
          )}

        </main>

        {/* MODALS — rendered as siblings inside app-screen */}

        {/* MODAL: ROOM DETAILS BOTTOM SHEET */}
        {selectedRoomModal && (
          <div className="modal-overlay-backdrop" onClick={() => setSelectedRoomModal(null)}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-handle" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Room {selectedRoomModal.roomNumber} Breakdown</h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{selectedRoomModal.floor} • {selectedRoomModal.sharingType}</span>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setSelectedRoomModal(null)}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Occupancy Status</div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>{selectedRoomModal.status}</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Monthly Rent</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>₹{selectedRoomModal.rentPerMonth.toLocaleString('en-IN')}/mo</div>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>Assigned Residents ({selectedRoomModal.residents.length}):</div>
                {selectedRoomModal.residents.length === 0 ? (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No residents currently assigned.</div>
                ) : (
                  selectedRoomModal.residents.map((res, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: '10px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '12px' }}>{res.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{res.course} • Since {res.checkInDate}</div>
                      </div>
                      <a href={`tel:${res.phone}`} style={{ color: 'var(--primary)' }}><Phone size={14} /></a>
                    </div>
                  ))
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>Facilities:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedRoomModal.facilities.map((fac, i) => (
                    <span key={i} style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '10px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px' }}>
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-action-sm btn-action-approve"
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => {
                    showToast(`Assigned bed in Room ${selectedRoomModal.roomNumber}`);
                    setSelectedRoomModal(null);
                  }}
                >
                  Assign Bed
                </button>
                <button className="btn-action-sm btn-action-reject" style={{ flex: 1, padding: '10px' }} onClick={() => setSelectedRoomModal(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: NEW REQUEST */}
        {isNewRequestModalOpen && (
          <div className="modal-overlay-backdrop" onClick={() => setIsNewRequestModalOpen(false)}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-handle" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Submit Resident Request</h3>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsNewRequestModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateNewRequest}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600' }}>Resident Name *</label>
                  <input type="text" required className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={newReqName} onChange={(e) => setNewReqName(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Room No *</label>
                    <input type="text" required className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={newReqRoom} onChange={(e) => setNewReqRoom(e.target.value)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Category</label>
                    <select className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={newReqType} onChange={(e) => setNewReqType(e.target.value as any)}>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Room Request">Room Request</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Leave Request">Leave Request</option>
                      <option value="Sick Meal">Sick Meal</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600' }}>Request Description *</label>
                  <textarea required rows={3} className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px', resize: 'none' }} value={newReqDetails} onChange={(e) => setNewReqDetails(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn-action-sm btn-action-reject" style={{ flex: 1, padding: '8px' }} onClick={() => setIsNewRequestModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-action-sm btn-action-approve" style={{ flex: 1, padding: '8px' }}>Submit Request</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: RECORD FEE PAYMENT */}
        {isPayModalOpen && (
          <div className="modal-overlay-backdrop" onClick={() => setIsPayModalOpen(null)}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-handle" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Record Fee Payment</h3>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsPayModalOpen(null)}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', marginBottom: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>{isPayModalOpen.studentName}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Room {isPayModalOpen.roomNumber} • {isPayModalOpen.month}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>₹{isPayModalOpen.amount.toLocaleString('en-IN')}</div>
              </div>

              <button
                className="btn-action-sm btn-action-approve"
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
                onClick={() => handleRecordFeePayment(isPayModalOpen.id)}
              >
                Confirm Payment Received (UPI / Cash)
              </button>
            </div>
          </div>
        )}

        {/* MORE OPTIONS POP-UP / BOTTOM SHEET */}
        {isMoreMenuOpen && (
          <div className="modal-overlay-backdrop bottom-sheet-align" onClick={() => setIsMoreMenuOpen(false)}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-handle" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>More Modules</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsMoreMenuOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className={`announcement-card ${activeTab === 'kitchen' ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', border: activeTab === 'kitchen' ? '1px solid var(--primary)' : '1px solid var(--border-color)', cursor: 'pointer' }}
                  onClick={() => {
                    setActiveTab('kitchen');
                    setCurrentScreen('home');
                    setIsMoreMenuOpen(false);
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Utensils size={20} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Kitchen Management</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Manage meals, menu, inventory &amp; kitchen ops</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>

                <button
                  className="announcement-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    setActiveTab('laundry');
                    setCurrentScreen('home');
                    setIsMoreMenuOpen(false);
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shirt size={20} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Laundry Management</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Washing slots &amp; pickup batches</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>

                <button
                  className="announcement-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    setActiveTab('broadcast');
                    setCurrentScreen('home');
                    setIsMoreMenuOpen(false);
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Megaphone size={20} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Broadcast Announcements</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Mass push &amp; notice alerts</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>

                <button
                  className="announcement-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    setActiveTab('settings');
                    setCurrentScreen('home');
                    setIsMoreMenuOpen(false);
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SettingsIcon size={20} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>System &amp; Profile Settings</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Security PIN &amp; preferences</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FIXED BOTTOM NAVIGATION BAR */}
        <nav className="phone-nav-bar">
          <button
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              setCurrentScreen('home');
              setIsMoreMenuOpen(false);
            }}
          >
            <span className="nav-tab-icon"><HomeIcon size={20} /></span>
            <span>Home</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('requests');
              setCurrentScreen('home');
              setIsMoreMenuOpen(false);
            }}
          >
            <span className="nav-tab-icon"><Users size={20} /></span>
            <span>Users</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('fees');
              setCurrentScreen('home');
              setIsMoreMenuOpen(false);
            }}
          >
            <span className="nav-tab-icon"><CreditCard size={20} /></span>
            <span>Fee Mgmt</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('rooms');
              setCurrentScreen('home');
              setIsMoreMenuOpen(false);
            }}
          >
            <span className="nav-tab-icon"><DoorOpen size={20} /></span>
            <span>Room Mgmt</span>
          </button>

          <button
            className={`nav-tab-btn ${isMoreMenuOpen || ['settings', 'laundry', 'broadcast'].includes(activeTab) ? 'active' : ''}`}
            onClick={() => {
              setIsMoreMenuOpen(prev => !prev);
            }}
          >
            <span className="nav-tab-icon"><MoreHorizontal size={20} /></span>
            <span>More</span>
          </button>
        </nav>

        {/* MODAL: ADD / EDIT SUPPLIER */}
        {isSupplierModalOpen && (
          <div className="modal-overlay-backdrop" onClick={() => setIsSupplierModalOpen(false)}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-handle" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800' }}>{editingSupplier ? 'Edit Supplier' : 'Register New Supplier'}</h3>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsSupplierModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveSupplier}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600' }}>Supplier Company Name *</label>
                  <input type="text" required className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supName} onChange={(e) => setSupName(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Contact Person *</label>
                    <input type="text" required className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supContactPerson} onChange={(e) => setSupContactPerson(e.target.value)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Mobile Number *</label>
                    <input type="text" required className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supPhone} onChange={(e) => setSupPhone(e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600' }}>Items Supplied</label>
                  <input type="text" placeholder="e.g. Milk, Curd, Butter, Paneer" className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supItems} onChange={(e) => setSupItems(e.target.value)} />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600' }}>Address</label>
                  <input type="text" placeholder="Shop/Store address..." className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supAddress} onChange={(e) => setSupAddress(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Last Delivery Date</label>
                    <input type="date" className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supLastDelivery} onChange={(e) => setSupLastDelivery(e.target.value)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: '600' }}>Payment Status</label>
                    <select className="search-box-input" style={{ border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '8px', width: '100%', marginTop: '2px' }} value={supPaymentStatus} onChange={(e) => setSupPaymentStatus(e.target.value as any)}>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn-action-sm btn-action-reject" style={{ flex: 1, padding: '8px' }} onClick={() => setIsSupplierModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-action-sm btn-action-approve" style={{ flex: 1, padding: '8px' }}>Save Supplier</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
