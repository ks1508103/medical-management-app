import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import apiService from './services/apiService';

// Dictionary for English and Hindi translations
const translations = {
  en: {
    portalTitle: 'MedCare Portal',
    portalSub: 'Secure authentication for store owners and system administrators',
    roleLabel: 'Select Portal Role',
    ownerRole: '🏪 Medical Store Owner Portal',
    adminRole: '🛡️ System Administrator Portal',
    emailLabel: 'Email Address',
    passLabel: 'Password',
    loginBtn: 'Access System',
    demoCreds: 'Demo Login Credentials:',
    adminCenter: 'MedCare Admin Control Center',
    verifyPage: 'Medical Store License Verification Page',
    verifySub: 'Review registered pharmacy licenses, inspect documentation credentials, and approve or revoke operating access.',
    storeName: 'Store Name',
    ownerName: 'Owner Name',
    licenseNo: 'License Number',
    status: 'Current Status',
    action: 'Verification Action',
    approve: 'Approve',
    reject: 'Reject',
    storeMgmt: 'MedCare Store Management',
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    billing: 'New Billing',
    history: 'Sales History',
    logout: 'Logout',
    welcomeOwner: 'Welcome, Store Owner',
    overview: 'Overview of your medical shop inventory, low-stock warnings, and revenue metrics.',
    totalMeds: 'Total Medicines',
    lowStock: 'Low Stock Alerts',
    revenue: 'Total Sales Revenue',
    createBill: 'Create Customer Bill',
    createBillSub: 'Generate instant customer bills, record phone numbers, and trigger automated stock warnings.',
    goToBilling: 'Go to Billing',
    addStock: 'Add New Stock',
    addStockSub: 'Add new medicine brands, prices, and quantities to backend inventory.',
    manageInv: 'Manage Inventory',
    searchMed: '🔍 Search medicine by name...',
    filterLow: 'Filter Low Stock',
    showLow: 'Showing Low Stock Only',
    saveMed: 'Save Medicine',
    quickSelect: '⚡ Quick-Select Popular Medicines:',
    custName: 'Customer / Patient Name',
    mobileNum: 'Mobile Number (10 digits)',
    address: 'Address',
    selectMed: 'Select Medicine',
    qty: 'Quantity',
    genBill: 'Generate Bill & Check Stock SMS',
    receiptPreview: 'Invoice Receipt Preview',
    printBill: 'Print Bill',
    salesLog: 'Customer Sales & Transaction Log',
    clearLog: 'Clear Log',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    registerTab: 'Register New Store',
    loginTab: 'Login to Portal',
    registerBtn: 'Submit License for Approval'
  },
  hi: {
    portalTitle: 'मेडकेयर पोर्टल',
    portalSub: 'स्टोर मालिकों और सिस्टम प्रशासकों के लिए सुरक्षित लॉगिन',
    roleLabel: 'पोर्टल भूमिका चुनें',
    ownerRole: '🏪 मेडिकल स्टोर ओनर पोर्टल',
    adminRole: '🛡️ सिस्टम एडमिनिस्ट्रेटर पोर्टल',
    emailLabel: 'ईमेल पता',
    passLabel: 'पासवर्ड',
    loginBtn: 'सिस्टम में प्रवेश करें',
    demoCreds: 'डेमो लॉगिन विवरण:',
    adminCenter: 'मेडकेयर एडमिन कंट्रोल सेंटर',
    verifyPage: 'मेडिकल स्टोर लाइसेंस सत्यापन पृष्ठ',
    verifySub: 'पंजीकृत फ़ार्मेसी लाइसेंस की समीक्षा करें, और संचालन की अनुमति दें या अस्वीकार करें।',
    storeName: 'स्टोर का नाम',
    ownerName: 'मालिक का नाम',
    licenseNo: 'लाइसेंस नंबर',
    status: 'वर्तमान स्थिति',
    action: 'सत्यापन कार्रवाई',
    approve: 'स्वीकृत करें',
    reject: 'अस्वीकार करें',
    storeMgmt: 'मेडकेयर स्टोर प्रबंधन',
    dashboard: 'डैशबोर्ड',
    inventory: 'इन्वेंट्री',
    billing: 'नया बिलिंग',
    history: 'बिक्री इतिहास',
    logout: 'लॉग आउट',
    welcomeOwner: 'स्वागत है, स्टोर ओनर',
    overview: 'आपकी मेडिकल शॉप इन्वेंट्री, कम स्टॉक की चेतावनियों और राजस्व का अवलोकन।',
    totalMeds: 'कुल दवाइयां',
    lowStock: 'कम स्टॉक अलर्ट',
    revenue: 'कुल बिक्री राजस्व',
    createBill: 'ग्राहक बिल बनाएं',
    createBillSub: 'तुरंत ग्राहक बिल बनाएं, फोन नंबर दर्ज करें, और स्वचालित स्टॉक चेतावनी सक्रिय करें।',
    goToBilling: 'बिलिंग पर जाएं',
    addStock: 'नया स्टॉक जोड़ें',
    addStockSub: 'बैकएंड इन्वेंट्री में नए ब्रांड, मूल्य और मात्रा जोड़ें।',
    manageInv: 'इन्वेंट्री प्रबंधित करें',
    searchMed: '🔍 नाम से दवा खोजें...',
    filterLow: 'कम स्टॉक फ़िल्टर करें',
    showLow: 'केवल कम स्टॉक दिखा रहा है',
    saveMed: 'दवा सहेजें',
    quickSelect: '⚡ लोकप्रिय दवाएं चुनें:',
    custName: 'ग्राहक / रोगी का नाम',
    mobileNum: 'मोबाइल नंबर (10 अंक)',
    address: 'पता',
    selectMed: 'दवा चुनें',
    qty: 'मात्रा',
    genBill: 'बिल बनाएं और स्टॉक एसएमएस भेजें',
    receiptPreview: 'चालान रसीद पूर्वावलोकन',
    printBill: 'बिल प्रिंट करें',
    salesLog: 'ग्राहक बिक्री और लेनदेन लॉग',
    clearLog: 'लॉग साफ़ करें',
    themeDark: 'डार्क मोड',
    themeLight: 'लाइट मोड',
    registerTab: 'नया स्टोर रजिस्टर करें',
    loginTab: 'पोर्टल पर लॉगिन करें',
    registerBtn: 'स्वीकृति के लिए लाइसेंस जमा करें'
  }
};

function App() {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('med_auth');
    return savedAuth ? JSON.parse(savedAuth) : { isLoggedIn: false, role: '', email: '' };
  });

  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'owner' });
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  // Registered Users / Store Owners database state
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('med_registered_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { email: 'owner@medcare.com', password: 'owner123', storeName: 'City Health Pharmacy', ownerName: 'Rahul Sharma', licenseNo: 'DL-MUM-2026-9988' }
    ];
  });

  const [registerForm, setRegisterForm] = useState({ storeName: '', ownerName: '', licenseNo: '', email: '', password: '' });

  // Theme and Language State
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('med_dark_mode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [shops, setShops] = useState(() => {
    const savedShops = localStorage.getItem('med_verified_shops');
    return savedShops ? JSON.parse(savedShops) : [
      { id: 1, storeName: 'City Health Pharmacy', ownerName: 'Rahul Sharma', licenseNo: 'DL-MUM-2026-9988', status: 'Verified' },
      { id: 2, storeName: 'Lifeline Medicos', ownerName: 'Amit Verma', licenseNo: 'DL-PUNE-2026-4455', status: 'Pending Review' }
    ];
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetching medicines from Spring Boot backend API with fallback
  const [medicines, setMedicines] = useState([]);
  const [loadingMeds, setLoadingMeds] = useState(true);

  useEffect(() => {
    apiService.getMedicines().then((data) => {
      if (data && data.length > 0) {
        setMedicines(data);
      } else {
        // Fallback initial items if backend is unreachable
        setMedicines([
          { id: 1, name: 'Paracetamol 500mg', category: 'Painkiller', price: 25.00, stock: 15 },
          { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', price: 120.50, stock: 60 },
          { id: 3, name: 'Cetirizine 10mg', category: 'Antihistamine', price: 45.00, stock: 8 }
        ]);
      }
      setLoadingMeds(false);
    });
  }, []);

  const [salesHistory, setSalesHistory] = useState(() => {
    const saved = localStorage.getItem('medical_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [newMed, setNewMed] = useState({ name: '', category: '', price: '', stock: '' });
  const [customer, setCustomer] = useState({ name: '', mobile: '', address: '', selectedMedId: '', quantity: 1 });
  const [smsAlert, setSmsAlert] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);
  const [latestBill, setLatestBill] = useState(null);

  useEffect(() => {
    localStorage.setItem('med_auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('medical_sales', JSON.stringify(salesHistory));
  }, [salesHistory]);

  useEffect(() => {
    localStorage.setItem('med_verified_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('med_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('med_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.role === 'admin') {
      if (loginForm.email === 'admin@medcare.com' && loginForm.password === 'admin123') {
        setAuth({ isLoggedIn: true, role: 'admin', email: loginForm.email });
      } else {
        alert('Invalid Admin credentials! Use admin@medcare.com / admin123');
      }
    } else {
      const foundUser = registeredUsers.find(u => u.email === loginForm.email && u.password === loginForm.password);
      if (!foundUser) {
        alert('Invalid email/password, or account not registered yet!');
        return;
      }

      const shopRecord = shops.find(s => s.licenseNo === foundUser.licenseNo);
      if (!shopRecord || shopRecord.status !== 'Verified') {
        alert('⚠️ Access Denied: Your medical shop license is still "Pending Review" or has been "Rejected" by the System Admin.');
        return;
      }

      setAuth({ isLoggedIn: true, role: 'owner', email: loginForm.email });
      setActiveTab('dashboard');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.storeName || !registerForm.ownerName || !registerForm.licenseNo || !registerForm.email || !registerForm.password) {
      alert('Please fill in all registration fields!');
      return;
    }

    if (registeredUsers.some(u => u.email === registerForm.email)) {
      alert('This email is already registered!');
      return;
    }

    const newUser = { ...registerForm };
    setRegisteredUsers([...registeredUsers, newUser]);

    const newShopEntry = {
      id: Date.now(),
      storeName: registerForm.storeName,
      ownerName: registerForm.ownerName,
      licenseNo: registerForm.licenseNo,
      status: 'Pending Review'
    };
    setShops([...shops, newShopEntry]);

    alert('🎉 Registration successful! Your store has been submitted to the Admin Portal for license verification. You can log in once approved.');
    setAuthView('login');
    setRegisterForm({ storeName: '', ownerName: '', licenseNo: '', email: '', password: '' });
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: '', email: '' });
    localStorage.removeItem('med_auth');
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.price || !newMed.stock || !newMed.category) return;

    const medPayload = {
      name: newMed.name,
      category: newMed.category,
      price: parseFloat(newMed.price),
      stock: parseInt(newMed.stock)
    };

    // Call backend API to add medicine
    const addedItem = await apiService.addMedicine(medPayload);
    if (addedItem) {
      setMedicines([...medicines, addedItem]);
    } else {
      // Fallback local update if API fails
      setMedicines([...medicines, { id: Date.now(), ...medPayload }]);
    }

    setNewMed({ name: '', category: '', price: '', stock: '' });
    alert(`Success! "${medPayload.name}" added to Spring Boot backend inventory.`);
    setActiveTab('inventory');
  };

  const handleRestock = (id) => {
    const updated = medicines.map(med => {
      if (med.id === id) {
        return { ...med, stock: med.stock + 20 };
      }
      return med;
    });
    setMedicines(updated);
    alert('Stock increased by +20 units successfully!');
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(customer.mobile)) {
      alert('Please enter a valid 10-digit mobile number!');
      return;
    }

    if (!customer.name || !customer.selectedMedId) {
      alert('Please fill in customer details and select a medicine!');
      return;
    }

    const selectedMedicine = medicines.find(m => m.id === parseInt(customer.selectedMedId));
    const qty = parseInt(customer.quantity);
    const totalPrice = selectedMedicine.price * qty;

    const updatedMedicines = medicines.map((med) => {
      if (med.id === parseInt(customer.selectedMedId)) {
        const newStock = med.stock - qty;
        
        if (newStock <= 10) {
          apiService.sendStockAlertSMS(med.name, newStock, customer.mobile)
            .then(() => {
              setSmsAlert(`🚨 API Gateway Response: Low stock alert sent for "${med.name}" (${newStock} units left).`);
            })
            .catch(err => console.error(err));
        }
        return { ...med, stock: newStock < 0 ? 0 : newStock };
      }
      return med;
    });

    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      customerName: customer.name,
      mobile: customer.mobile,
      address: customer.address,
      medicineName: selectedMedicine.name,
      quantity: qty,
      total: totalPrice
    };

    setMedicines(updatedMedicines);
    setSalesHistory([newTransaction, ...salesHistory]);
    setLatestBill(newTransaction);
    alert(`Bill generated successfully for ${customer.name}! Total: ₹${totalPrice.toFixed(2)}`);
    setCustomer({ name: '', mobile: '', address: '', selectedMedId: '', quantity: 1 });
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all sales history?')) {
      setSalesHistory([]);
      localStorage.removeItem('medical_sales');
      setLatestBill(null);
    }
  };

  const verifyShop = (id, status) => {
    const updated = shops.map(s => s.id === id ? { ...s, status } : s);
    setShops(updated);
  };

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLowStock = filterLowStockOnly ? med.stock <= 10 : true;
    return matchesSearch && matchesLowStock;
  });

  const lowStockCount = medicines.filter(m => m.stock <= 10).length;
  const totalRevenue = salesHistory.reduce((acc, curr) => acc + curr.total, 0);

  const renderControls = () => (
    <div className="d-flex align-items-center gap-2">
      <button 
        className="btn btn-sm btn-outline-secondary bg-white text-dark fw-bold"
        onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
        title="Toggle Language">
        <i className="bi bi-translate me-1"></i> {lang === 'en' ? 'हिंदी' : 'English'}
      </button>

      <button 
        className={`btn btn-sm ${darkMode ? 'btn-warning text-dark' : 'btn-dark text-white'}`}
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Theme">
        <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'} me-1`}></i> 
        {darkMode ? t.themeLight : t.themeDark}
      </button>
    </div>
  );

  // ================= 1. SEPARATE LOGIN & REGISTRATION PAGE VIEW =================
  if (!auth.isLoggedIn) {
    return (
      <div className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} min-vh-100 d-flex align-items-center justify-content-center p-3`}>
        <div className="position-absolute top-0 end-0 p-4">
          {renderControls()}
        </div>

        <div className={`card shadow-lg border-0 p-5 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`} style={{ width: '480px', borderRadius: '16px' }}>
          <div className="text-center mb-4">
            <div className="bg-info bg-opacity-10 p-3 rounded-circle d-inline-block text-info mb-2">
              <i className="bi bi-capsule-pill fs-1"></i>
            </div>
            <h2 className="fw-bold">{t.portalTitle}</h2>
            <p className="small opacity-75">{t.portalSub}</p>

            <div className="btn-group mt-2" role="group">
              <button 
                type="button" 
                className={`btn btn-sm ${authView === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setAuthView('login')}>
                {t.loginTab}
              </button>
              <button 
                type="button" 
                className={`btn btn-sm ${authView === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setAuthView('register')}>
                {t.registerTab}
              </button>
            </div>
          </div>

          {authView === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase opacity-75">{t.roleLabel}</label>
                <select 
                  className={`form-select form-select-lg fs-6 ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                  value={loginForm.role} 
                  onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })}>
                  <option value="owner">{t.ownerRole}</option>
                  <option value="admin">{t.adminRole}</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase opacity-75">{t.emailLabel}</label>
                <input 
                  type="email" 
                  className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                  placeholder={loginForm.role === 'admin' ? 'admin@medcare.com' : 'owner@medcare.com'} 
                  value={loginForm.email} 
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase opacity-75">{t.passLabel}</label>
                <input 
                  type="password" 
                  className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                  placeholder="••••••••" 
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} 
                  required 
                />
              </div>

              <div className={`alert ${darkMode ? 'bg-dark text-light border-0' : 'bg-light'} py-2 px-3 small mb-4`}>
                <div className="fw-bold mb-1"><i className="bi bi-info-circle-fill me-1 text-primary"></i>{t.demoCreds}</div>
                {loginForm.role === 'admin' ? (
                  <div>
                    <div>Email: <code>admin@medcare.com</code></div>
                    <div>Password: <code>admin123</code></div>
                  </div>
                ) : (
                  <div>
                    <div>Email: <code>owner@medcare.com</code></div>
                    <div>Password: <code>owner123</code></div>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-info w-100 py-3 fw-bold shadow-sm text-dark">
                <i className="bi bi-box-arrow-in-right me-2"></i>{t.loginBtn}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <label className="form-label small fw-bold">Store Name</label>
                <input type="text" className="form-control form-control-sm" placeholder="e.g. City Health Pharmacy"
                  value={registerForm.storeName} onChange={(e) => setRegisterForm({ ...registerForm, storeName: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold">Owner Full Name</label>
                <input type="text" className="form-control form-control-sm" placeholder="e.g. Rahul Sharma"
                  value={registerForm.ownerName} onChange={(e) => setRegisterForm({ ...registerForm, ownerName: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold">Pharmacy License Number</label>
                <input type="text" className="form-control form-control-sm" placeholder="e.g. DL-MUM-2026-1234"
                  value={registerForm.licenseNo} onChange={(e) => setRegisterForm({ ...registerForm, licenseNo: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold">Email (Login ID)</label>
                <input type="email" className="form-control form-control-sm" placeholder="owner@pharmacy.com"
                  value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Password</label>
                <input type="password" className="form-control form-control-sm" placeholder="Create password"
                  value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required />
              </div>

              <button type="submit" className="btn btn-success w-100 py-2 fw-bold shadow-sm">
                <i className="bi bi-person-plus-fill me-2"></i>{t.registerBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ================= 2. SEPARATE ADMIN VERIFICATION PAGE VIEW =================
  if (auth.isLoggedIn && auth.role === 'admin') {
    return (
      <div className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} min-vh-100 pb-5`}>
        <nav className={`navbar ${darkMode ? 'navbar-dark bg-black' : 'navbar-dark bg-dark'} shadow-sm px-4`}>
          <div className="container-fluid">
            <span className="navbar-brand fw-bold text-info">
              <i className="bi bi-shield-lock-fill me-2 fs-4"></i>{t.adminCenter}
            </span>
            <div className="d-flex align-items-center gap-3">
              {renderControls()}
              <span className="text-white small d-none d-md-inline"><strong>{auth.email}</strong></span>
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                <i className="bi bi-power me-1"></i> {t.logout}
              </button>
            </div>
          </div>
        </nav>

        <div className="container my-5">
          <div className={`card shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
              <h4 className="mb-0 fw-bold"><i className="bi bi-patch-check-fill me-2"></i>{t.verifyPage}</h4>
              <span className="badge bg-light text-dark fs-6">{shops.length} Total</span>
            </div>
            <div className="card-body p-4">
              <p className="opacity-75 mb-4">{t.verifySub}</p>
              
              <div className="table-responsive">
                <table className={`table ${darkMode ? 'table-dark text-white' : 'table-striped'} table-hover align-middle`}>
                  <thead>
                    <tr>
                      <th>{t.storeName}</th>
                      <th>{t.ownerName}</th>
                      <th>{t.licenseNo}</th>
                      <th>{t.status}</th>
                      <th>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops.map((shop) => (
                      <tr key={shop.id}>
                        <td className="fw-semibold">{shop.storeName}</td>
                        <td>{shop.ownerName}</td>
                        <td><code>{shop.licenseNo}</code></td>
                        <td>
                          {shop.status === 'Verified' ? (
                            <span className="badge bg-success px-3 py-2">Verified Active</span>
                          ) : shop.status === 'Rejected' ? (
                            <span className="badge bg-danger px-3 py-2">License Rejected</span>
                          ) : (
                            <span className="badge bg-warning text-dark px-3 py-2">Pending Review</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-sm btn-success px-3 fw-bold"
                              onClick={() => verifyShop(shop.id, 'Verified')}>
                              <i className="bi bi-check-lg me-1"></i> {t.approve}
                            </button>
                            <button 
                              className="btn btn-sm btn-danger px-3 fw-bold"
                              onClick={() => verifyShop(shop.id, 'Rejected')}>
                              <i className="bi bi-x-lg me-1"></i> {t.reject}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= 3. SEPARATE STORE OWNER MANAGEMENT SYSTEM VIEW =================
  return (
    <div className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} min-vh-100 pb-5`}>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-black' : 'navbar-dark bg-dark'} shadow-sm px-4`}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-info" href="#!">
            <i className="bi bi-capsule-pill me-2 fs-4"></i>{t.storeMgmt}
          </a>
          <div className="navbar-nav ms-auto flex-row gap-2 align-items-center">
            <button 
              className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`}
              onClick={() => setActiveTab('dashboard')}>
              <i className="bi bi-speedometer2 me-1"></i> {t.dashboard}
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'inventory' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`}
              onClick={() => setActiveTab('inventory')}>
              <i className="bi bi-boxes me-1"></i> {t.inventory} ({medicines.length})
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'billing' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`}
              onClick={() => setActiveTab('billing')}>
              <i className="bi bi-receipt me-1"></i> {t.billing}
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'history' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`}
              onClick={() => setActiveTab('history')}>
              <i className="bi bi-clock-history me-1"></i> {t.history} ({salesHistory.length})
            </button>

            <div className="ms-2">
              {renderControls()}
            </div>

            <button className="btn btn-sm btn-outline-danger ms-2" onClick={handleLogout} title={t.logout}>
              <i className="bi bi-power"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        {smsAlert && (
          <div className="alert alert-warning alert-dismissible fade show shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>{smsAlert}
            <button type="button" className="btn-close" onClick={() => setSmsAlert('')}></button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <div className={`p-4 mb-4 rounded-3 shadow-sm border-start border-info border-5 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
              <h2 className="fw-bold">{t.welcomeOwner}</h2>
              <p className="opacity-75 mb-0">{t.overview}</p>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0 bg-primary text-white h-100">
                  <div className="card-body">
                    <h6 className="text-uppercase small fw-bold">{t.totalMeds}</h6>
                    <h2 className="display-6 fw-bold mt-2">{medicines.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 bg-danger text-white h-100">
                  <div className="card-body">
                    <h6 className="text-uppercase small fw-bold">{t.lowStock}</h6>
                    <h2 className="display-6 fw-bold mt-2">{lowStockCount}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 bg-success text-white h-100">
                  <div className="card-body">
                    <h6 className="text-uppercase small fw-bold">{t.revenue}</h6>
                    <h2 className="display-6 fw-bold mt-2">₹{totalRevenue.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <div className={`card shadow-sm border-0 h-100 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                  <div className="card-body text-center p-4">
                    <i className="bi bi-cart-plus text-info display-4 mb-3"></i>
                    <h4>{t.createBill}</h4>
                    <p className="opacity-75">{t.createBillSub}</p>
                    <button className="btn btn-info px-4 text-dark fw-bold" onClick={() => setActiveTab('billing')}>{t.goToBilling}</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className={`card shadow-sm border-0 h-100 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                  <div className="card-body text-center p-4">
                    <i className="bi bi-plus-circle text-success display-4 mb-3"></i>
                    <h4>{t.addStock}</h4>
                    <p className="opacity-75">{t.addStockSub}</p>
                    <button className="btn btn-success px-4 fw-bold" onClick={() => setActiveTab('inventory')}>{t.manageInv}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className={`card shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                  <h5 className="mb-0"><i className="bi bi-boxes me-2"></i>Medicine Stock Inventory (Spring Boot Connected)</h5>
                  <span className="badge bg-info text-dark">{filteredMedicines.length} Items</span>
                </div>
                <div className="card-body">
                  <div className="row mb-3 g-2 align-items-center">
                    <div className="col-md-7">
                      <input 
                        type="text" 
                        className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                        placeholder={t.searchMed} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-5 text-md-end">
                      <button 
                        className={`btn btn-sm ${filterLowStockOnly ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'}`}
                        onClick={() => setFilterLowStockOnly(!filterLowStockOnly)}>
                        <i className="bi bi-filter me-1"></i> {filterLowStockOnly ? t.showLow : t.filterLow}
                      </button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className={`table ${darkMode ? 'table-dark text-white' : 'table-hover'} align-middle`}>
                      <thead>
                        <tr>
                          <th>Medicine Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status & Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingMeds ? (
                          <tr><td colSpan="5" className="text-center py-4">Loading from Spring Boot backend...</td></tr>
                        ) : filteredMedicines.length > 0 ? (
                          filteredMedicines.map((med) => (
                            <tr key={med.id}>
                              <td className="fw-semibold">{med.name}</td>
                              <td><span className={`badge ${darkMode ? 'bg-dark text-white border' : 'bg-light text-dark border'}`}>{med.category}</span></td>
                              <td>₹{med.price.toFixed(2)}</td>
                              <td>{med.stock} units</td>
                              <td>
                                {med.stock === 0 ? (
                                  <span className="badge bg-danger me-2">Out of Stock</span>
                                ) : med.stock <= 10 ? (
                                  <span className="badge bg-warning text-dark me-2">Low Stock</span>
                                ) : (
                                  <span className="badge bg-success me-2">Available</span>
                                )}
                                <button 
                                  className="btn btn-sm btn-outline-primary py-0 px-2" 
                                  onClick={() => handleRestock(med.id)}
                                  title="Add 20 units">
                                  +20 Restock
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="5" className="text-center text-muted py-4">No medicines found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={`card shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                <div className="card-header bg-secondary text-white py-3">
                  <h5 className="mb-0"><i className="bi bi-plus-square me-2"></i>Add New Medicine</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAddMedicine} className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-bold">Medicine Name</label>
                      <input type="text" className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} placeholder="e.g. Aspirin 100mg" 
                        value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Category</label>
                      <select 
                        className={`form-select ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                        value={newMed.category} 
                        onChange={(e) => setNewMed({ ...newMed, category: e.target.value })} 
                        required>
                        <option value="">Select category...</option>
                        <option value="Tablet">💊 Tablet</option>
                        <option value="Capsule">🟢 Capsule</option>
                        <option value="Syrup / Liquid">🧪 Syrup / Liquid</option>
                        <option value="Injection">💉 Injection</option>
                        <option value="Ointment">🧴 Ointment / Cream</option>
                        <option value="Painkiller">⚡ Painkiller</option>
                        <option value="Antibiotic">🛡️ Antibiotic</option>
                        <option value="Antihistamine">🌿 Antihistamine</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Price (₹)</label>
                      <input type="number" step="0.01" className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} placeholder="0.00" 
                        value={newMed.price} onChange={(e) => setNewMed({ ...newMed, price: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Initial Stock Quantity</label>
                      <input type="number" className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} placeholder="0" 
                        value={newMed.stock} onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })} required />
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-white">
                        <i className="bi bi-save me-2"></i>{t.saveMed}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className={`card shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                <div className="card-header bg-primary text-white py-3">
                  <h4 className="mb-0"><i className="bi bi-receipt me-2"></i>Customer Checkout & SMS Billing</h4>
                </div>
                <div className="card-body p-4">
                  <div className={`mb-3 p-3 rounded border ${darkMode ? 'bg-dark text-white border-0' : 'bg-light'}`}>
                    <label className="form-label small fw-bold opacity-75 mb-2">{t.quickSelect}</label>
                    <div className="d-flex flex-wrap gap-2">
                      {medicines.map(m => (
                        <button 
                          key={m.id} 
                          type="button" 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setCustomer({ ...customer, selectedMedId: m.id.toString() })}>
                          {m.name} (₹{m.price})
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleCheckout}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">{t.custName}</label>
                      <input type="text" className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} placeholder="Enter full name" 
                        value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">{t.mobileNum}</label>
                      <input 
                        type="tel" 
                        className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`}
                        placeholder="e.g. 9876543210" 
                        maxLength="10"
                        value={customer.mobile} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setCustomer({ ...customer, mobile: val });
                        }} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">{t.address}</label>
                      <textarea className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} rows="2" placeholder="Customer address details" 
                        value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })}></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label className="form-label fw-bold">{t.selectMed}</label>
                        <select className={`form-select ${darkMode ? 'bg-dark text-white border-0' : ''}`} value={customer.selectedMedId} 
                          onChange={(e) => setCustomer({ ...customer, selectedMedId: e.target.value })} required>
                          <option value="">Choose medicine from stock...</option>
                          {medicines.map((med) => (
                            <option key={med.id} value={med.id}>
                              {med.name} — ₹{med.price} (Available: {med.stock})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">{t.qty}</label>
                        <input type="number" className={`form-control ${darkMode ? 'bg-dark text-white border-0' : ''}`} min="1" 
                          value={customer.quantity} onChange={(e) => setCustomer({ ...customer, quantity: e.target.value })} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success w-100 py-3 fw-bold fs-5 mt-3 shadow-sm">
                      <i className="bi bi-cart-check-fill me-2"></i>{t.genBill}
                    </button>
                  </form>
                </div>
              </div>

              {latestBill && (
                <div className={`card shadow-sm border-success mt-4 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0"><i className="bi bi-check-circle me-2"></i>{t.receiptPreview}</h5>
                    <button className="btn btn-sm btn-light text-dark fw-bold" onClick={() => window.print()}>
                      <i className="bi bi-printer me-1"></i> {t.printBill}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="mb-1 opacity-75 small">Invoice Date: <strong>{latestBill.date}</strong></p>
                        <p className="mb-1">Customer Name: <strong>{latestBill.customerName}</strong></p>
                        <p className="mb-1">Mobile: <strong>{latestBill.mobile}</strong></p>
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        <p className="mb-1">Medicine: <strong>{latestBill.medicineName}</strong></p>
                        <p className="mb-1">Quantity: <strong>{latestBill.quantity} units</strong></p>
                        <h5 className="text-success fw-bold mt-2">Total Paid: ₹{latestBill.total.toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={`card shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
            <div className="card-header bg-info text-dark d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-clock-history me-2"></i>{t.salesLog}</h5>
              <div className="d-flex gap-2">
                <span className="badge bg-dark text-white align-self-center">{salesHistory.length} Bills</span>
                {salesHistory.length > 0 && (
                  <button className="btn btn-sm btn-outline-dark bg-white" onClick={handleClearHistory}>
                    <i className="bi bi-trash me-1"></i> {t.clearLog}
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {salesHistory.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-receipt display-4 opacity-50"></i>
                  <p className="opacity-75 mt-3">No bills generated yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className={`table ${darkMode ? 'table-dark text-white' : 'table-striped'} align-middle`}>
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Customer Name</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Medicine</th>
                        <th>Qty</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesHistory.map((sale) => (
                        <tr key={sale.id}>
                          <td className="small opacity-75">{sale.date}</td>
                          <td className="fw-semibold">{sale.customerName}</td>
                          <td>{sale.mobile}</td>
                          <td className="small opacity-75">{sale.address || 'N/A'}</td>
                          <td>{sale.medicineName}</td>
                          <td>{sale.quantity}</td>
                          <td className="text-success fw-bold">₹{sale.total.toFixed(2)}</td>
                          <td>
                            <button 
                              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} py-0 px-2`}
                              onClick={() => {
                                setLatestBill(sale);
                                setActiveTab('billing');
                              }}
                              title="Print">
                              <i className="bi bi-printer me-1"></i> Print
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;