// script.js - NYDC Crypto Paper Trading Platform
// Author: Antigravity AI
// Provides Firebase Firestore integration and real-time UI interactions

// ==== Utility Functions ====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function formatCurrency(value) {
  return `${Number(value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} USDT`;
}

// Format numbers securely
function formatNumber(value, decimals = 2) {
  return Number(value).toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}

// Global tracking for currently active modal positions to update live P/L in modal
let modalActivePosition = null;

function updateModalPnL() {
  const pnlEl = $('#modal-pnl-display');
  if (!pnlEl || !modalActivePosition) return;
  
  if (Array.isArray(modalActivePosition)) {
    // Close All P/L
    let totalPnl = 0;
    modalActivePosition.forEach(pos => {
      const latestPos = fbPositions.find(p => p.id === pos.id) || pos;
      const entryVal = Number(latestPos.entry) || 0;
      const currentVal = Number(latestPos.current || latestPos.entry) || 0;
      const qtyVal = Number(latestPos.qty) || 0;
      const pnl = (currentVal - entryVal) * qtyVal * (latestPos.side === 'Long' || latestPos.side === 'Buy' ? 1 : -1);
      totalPnl += pnl;
    });
    pnlEl.textContent = `Total PnL: ${formatCurrency(totalPnl)}`;
    pnlEl.className = totalPnl >= 0 ? 'profit' : 'loss';
  } else {
    // Single Position P/L
    const latestPos = fbPositions.find(p => p.id === modalActivePosition.id) || modalActivePosition;
    const entryVal = Number(latestPos.entry) || 0;
    const currentVal = Number(latestPos.current || latestPos.entry) || 0;
    const qtyVal = Number(latestPos.qty) || 0;
    const pnl = (currentVal - entryVal) * qtyVal * (latestPos.side === 'Long' || latestPos.side === 'Buy' ? 1 : -1);
    const pnlPct = (pnl / (entryVal * qtyVal)) * 100;
    
    pnlEl.textContent = `Current PnL: ${formatCurrency(pnl)} (${pnl >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)`;
    pnlEl.className = pnl >= 0 ? 'profit' : 'loss';
  }
}

// Custom non-blocking confirm dialog using premium NYDC styling
function showConfirmModal(message, activePosOrList = null) {
  modalActivePosition = activePosOrList;
  return new Promise((resolve) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100vw';
    modalOverlay.style.height = '100vh';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.backdropFilter = 'blur(6px)';
    modalOverlay.style.zIndex = '99999';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    
    const modalCard = document.createElement('div');
    modalCard.style.background = '#0D0303';
    modalCard.style.border = '1px solid rgba(192, 57, 43, 0.3)';
    modalCard.style.borderRadius = '12px';
    modalCard.style.padding = '24px';
    modalCard.style.maxWidth = '360px';
    modalCard.style.width = '85%';
    modalCard.style.boxShadow = '0 10px 40px rgba(192, 57, 43, 0.2)';
    modalCard.style.display = 'flex';
    modalCard.style.flexDirection = 'column';
    modalCard.style.gap = '20px';
    modalCard.style.textAlign = 'center';
    modalCard.style.animation = 'modalFadeIn 0.25s ease-out';
    
    if (!document.getElementById('modal-animations')) {
      const style = document.createElement('style');
      style.id = 'modal-animations';
      style.textContent = `
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
    
    const msgText = document.createElement('div');
    msgText.style.fontSize = '15px';
    msgText.style.fontWeight = '500';
    msgText.style.color = '#FFFFFF';
    msgText.style.lineHeight = '1.5';
    msgText.textContent = message;
    
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '12px';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.style.flex = '1';
    cancelBtn.style.padding = '10px';
    cancelBtn.style.borderRadius = '6px';
    cancelBtn.style.background = 'rgba(120, 15, 15, 0.25)';
    cancelBtn.style.color = '#B0A9A9';
    cancelBtn.style.border = '1px solid rgba(192, 57, 43, 0.2)';
    cancelBtn.style.fontWeight = '600';
    cancelBtn.style.fontSize = '13px';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.textContent = 'Cancel';
    
    const confirmBtn = document.createElement('button');
    confirmBtn.style.flex = '1';
    confirmBtn.style.padding = '10px';
    confirmBtn.style.borderRadius = '6px';
    confirmBtn.style.background = '#C0392B';
    confirmBtn.style.color = '#FFFFFF';
    confirmBtn.style.border = 'none';
    confirmBtn.style.fontWeight = '600';
    confirmBtn.style.fontSize = '13px';
    confirmBtn.style.cursor = 'pointer';
    confirmBtn.textContent = 'Confirm';
    
    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(confirmBtn);
    modalCard.appendChild(msgText);
    
    // Inject Live P/L Display if position data is passed
    if (activePosOrList) {
       const pnlDisplay = document.createElement('div');
       pnlDisplay.id = 'modal-pnl-display';
       pnlDisplay.style.fontSize = '18px';
       pnlDisplay.style.fontWeight = '700';
       pnlDisplay.style.padding = '10px';
       pnlDisplay.style.borderRadius = '6px';
       pnlDisplay.style.background = 'rgba(255, 255, 255, 0.05)';
       pnlDisplay.style.margin = '4px 0';
       modalCard.appendChild(pnlDisplay);
       
       // Perform initial update immediately
       setTimeout(updateModalPnL, 0);
    }
    
    modalCard.appendChild(btnContainer);
    modalOverlay.appendChild(modalCard);
    document.body.appendChild(modalOverlay);
    
    cancelBtn.onclick = () => {
      document.body.removeChild(modalOverlay);
      modalActivePosition = null;
      resolve(false);
    };
    confirmBtn.onclick = () => {
      document.body.removeChild(modalOverlay);
      modalActivePosition = null;
      resolve(true);
    };
  });
}

// Custom non-blocking text input modal using premium NYDC styling
function showInputModal(message, placeholder = '') {
  return new Promise((resolve) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100vw';
    modalOverlay.style.height = '100vh';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.backdropFilter = 'blur(6px)';
    modalOverlay.style.zIndex = '99999';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    
    const modalCard = document.createElement('div');
    modalCard.style.background = '#0D0303';
    modalCard.style.border = '1px solid rgba(192, 57, 43, 0.3)';
    modalCard.style.borderRadius = '12px';
    modalCard.style.padding = '24px';
    modalCard.style.maxWidth = '360px';
    modalCard.style.width = '85%';
    modalCard.style.boxShadow = '0 10px 40px rgba(192, 57, 43, 0.2)';
    modalCard.style.display = 'flex';
    modalCard.style.flexDirection = 'column';
    modalCard.style.gap = '15px';
    modalCard.style.textAlign = 'center';
    modalCard.style.animation = 'modalFadeIn 0.25s ease-out';
    
    const msgText = document.createElement('div');
    msgText.style.fontSize = '15px';
    msgText.style.fontWeight = '500';
    msgText.style.color = '#FFFFFF';
    msgText.textContent = message;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = '100%';
    input.style.background = '#2B3139';
    input.style.border = '1px solid rgba(192, 57, 43, 0.3)';
    input.style.borderRadius = '6px';
    input.style.padding = '10px 14px';
    input.style.color = '#FFFFFF';
    input.style.fontSize = '14px';
    input.style.outline = 'none';
    input.style.textAlign = 'center';
    input.style.textTransform = 'uppercase';
    
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '12px';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.style.flex = '1';
    cancelBtn.style.padding = '10px';
    cancelBtn.style.borderRadius = '6px';
    cancelBtn.style.background = 'rgba(120, 15, 15, 0.25)';
    cancelBtn.style.color = '#B0A9A9';
    cancelBtn.style.border = '1px solid rgba(192, 57, 43, 0.2)';
    cancelBtn.style.fontWeight = '600';
    cancelBtn.style.fontSize = '13px';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.textContent = 'Cancel';
    
    const confirmBtn = document.createElement('button');
    confirmBtn.style.flex = '1';
    confirmBtn.style.padding = '10px';
    confirmBtn.style.borderRadius = '6px';
    confirmBtn.style.background = '#C0392B';
    confirmBtn.style.color = '#FFFFFF';
    confirmBtn.style.border = 'none';
    confirmBtn.style.fontWeight = '600';
    confirmBtn.style.fontSize = '13px';
    confirmBtn.style.cursor = 'pointer';
    confirmBtn.textContent = 'Add';
    
    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(confirmBtn);
    modalCard.appendChild(msgText);
    modalCard.appendChild(input);
    modalCard.appendChild(btnContainer);
    modalOverlay.appendChild(modalCard);
    document.body.appendChild(modalOverlay);
    
    setTimeout(() => input.focus(), 50);
    
    cancelBtn.onclick = () => {
      document.body.removeChild(modalOverlay);
      resolve(null);
    };
    
    confirmBtn.onclick = () => {
      const val = input.value.trim();
      document.body.removeChild(modalOverlay);
      resolve(val);
    };
    
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        document.body.removeChild(modalOverlay);
        resolve(val);
      }
    };
  });
}

// ==== Firebase Configuration & Initialization ====
// firebaseConfig is loaded globally from config.js

let db = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } else {
    console.error("Firebase library not loaded!");
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

// ==== Global State ====
let currentUser = null;
let currentSelectedSymbol = null;
let binanceWS = null;
let currentOrderType = 'market';
let userEditedPrice = false;

// ==== Dynamic Portfolio Constants & State ====
let initialBalance = 100000;

const dummyPortfolio = {
  value: initialBalance,
  pnl: 0,
  returnPct: 0.0,
  rank: 4,
  marketStatus: 'OPEN',
  timerSeconds: 4 * 60 * 60,
};

const defaultWatchlist = [
  {symbol: 'BTCUSDT', price: 30000, change: 1.2},
  {symbol: 'ETHUSDT', price: 2000, change: -0.8},
  {symbol: 'SOLUSDT', price: 85, change: 0.5},
  {symbol: 'BNBUSDT', price: 250, change: 2.1},
  {symbol: 'XRPUSDT', price: 0.55, change: -1.3},
  {symbol: 'DOGEUSDT', price: 0.07, change: 0.2},
  {symbol: 'ADAUSDT', price: 0.38, change: -0.5},
  {symbol: 'AVAXUSDT', price: 15, change: 1.0},
];

let dummyWatchlist = [];
try {
  const saved = localStorage.getItem('watchlist');
  if (saved) {
    dummyWatchlist = JSON.parse(saved);
  } else {
    dummyWatchlist = [...defaultWatchlist];
  }
} catch (e) {
  dummyWatchlist = [...defaultWatchlist];
}

function saveWatchlist() {
  try {
    localStorage.setItem('watchlist', JSON.stringify(dummyWatchlist));
  } catch (e) {
    console.error("Error saving watchlist:", e);
  }
}

let fbPositions = [];
let fbOrders = [];
let fbHistory = [];
let fbTrades = [];

// ==== Dynamic Portfolio Calculations ====
function getRealizedPnL() {
  let realized = 0;
  fbPositions.forEach(p => {
    if (p.status === 'Closed') {
      realized += Number(p.pnl) || 0;
    }
  });
  return realized;
}

function getUnrealizedPnL() {
  let unrealized = 0;
  fbPositions.forEach(p => {
    if (p.status === 'Active' || !p.status) {
      const current = Number(p.current || p.entry) || 0;
      const entry = Number(p.entry) || 0;
      const qty = Number(p.qty) || 0;
      const pnl = (current - entry) * qty * (p.side === 'Long' || p.side === 'Buy' ? 1 : -1);
      unrealized += pnl;
    }
  });
  return unrealized;
}

function getLockedMargin() {
  let margin = 0;
  fbOrders.forEach(o => {
    if (o.status === 'Pending') {
      margin += (Number(o.qty) || 0) * (Number(o.price) || 0);
    }
  });
  fbPositions.forEach(p => {
    if (p.status === 'Active' || !p.status) {
      margin += (Number(p.qty) || 0) * (Number(p.entry) || 0);
    }
  });
  return margin;
}

function getAvailableBalance() {
  const realized = getRealizedPnL();
  const locked = getLockedMargin();
  return initialBalance + realized - locked;
}

function getPortfolioValue() {
  const realized = getRealizedPnL();
  const unrealized = getUnrealizedPnL();
  return initialBalance + realized + unrealized;
}

function calculatePortfolio() {
  const realized = getRealizedPnL();
  const unrealized = getUnrealizedPnL();
  
  dummyPortfolio.value = initialBalance + realized + unrealized;
  dummyPortfolio.pnl = realized + unrealized;
  dummyPortfolio.returnPct = (dummyPortfolio.pnl / initialBalance) * 100;
}

// ==== Firebase Listeners ====
function setupFirebaseListeners() {
  if (!db || !currentUser) {
    console.warn("Firebase or CurrentUser not ready. Skipping database listeners.");
    populatePositionsTabs();
    populateDashboard();
    return;
  }

  try {
    db.collection("orders")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        fbOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        populatePositionsTabs();
        populateDashboard();
      }, err => console.error("orders snapshot error:", err));
    
    db.collection("positions")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        fbPositions = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        populatePositionsTabs();
        populateDashboard();
      }, err => console.error("positions snapshot error:", err));
    
    db.collection("history")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        fbHistory = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        populatePositionsTabs();
      }, err => console.error("history snapshot error:", err));
    
    db.collection("trades")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        fbTrades = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        populatePositionsTabs();
      }, err => console.error("trades snapshot error:", err));
  } catch (error) {
    console.error("Firebase connection error:", error);
  }
}

// ==== Initialization ====
function init() {
  if (typeof firebase === 'undefined') {
     console.error("Firebase libraries not loaded.");
     return;
  }

  // Observe Authentication State
  firebase.auth().onAuthStateChanged(async (user) => {
     if (!user) {
        // Redirect to Login Page if not logged in
        window.location.href = "login.html";
     } else {
        try {
           // Verify that user document exists and they are NOT admin
           const doc = await db.collection("users").doc(user.uid).get();
           if (doc.exists && doc.data().role === 'admin') {
              window.location.href = "admin.html";
              return;
           }

           currentUser = user;

            // Load starting balance from database (with auto-repair for legacy or corrupted profiles)
            if (doc.exists) {
               const profile = doc.data();
               let startBal = Number(profile.startingBalance);
               
               if (profile.startingBalance === undefined || startBal <= 0) {
                  startBal = Number(profile.portfolioValue) || 100000;
                  if (startBal <= 0) {
                     startBal = 100000; // Reset to standard starting balance if already corrupted
                  }
                  
                  // Reset all corrupted Firestore values to clean starting capital
                  db.collection("users").doc(user.uid).update({
                     startingBalance: startBal,
                     availableBalance: startBal,
                     portfolioValue: startBal,
                     unrealizedPnL: 0,
                     realizedPnL: 0
                  }).catch(e => console.error("Error healing corrupted balance in DB:", e));
               }
               initialBalance = startBal;
            }

           // Run normal client routines
           setupFirebaseListeners();
           populateDashboard();
           populateWatchlist();
           populatePositionsTabs();
           connectBinanceWS();
           bindEvents();

        } catch (e) {
           console.error("Auth initialization check failed:", e);
           window.location.href = "login.html";
        }
     }
  });
}

// ==== Dashboard Cards ====
function populateDashboard() {
  calculatePortfolio();
  
  const unrealized = getUnrealizedPnL();
  const realized = getRealizedPnL();
  const available = getAvailableBalance();
  const portfolio = getPortfolioValue();
  
  const cardsData = [
    {title: 'Portfolio Value', value: formatCurrency(portfolio), subtitle: 'Total Assets', isPnl: false},
    {title: 'Available Balance', value: formatCurrency(available), subtitle: 'Ready to Trade', isPnl: false},
    {title: 'Unrealized PnL', value: formatCurrency(unrealized), subtitle: unrealized >= 0 ? '+ Active Profit' : '- Active Loss', isPnl: true, pnlVal: unrealized},
    {title: 'Realized PnL', value: formatCurrency(realized), subtitle: realized >= 0 ? '+ Closed Profit' : '- Closed Loss', isPnl: true, pnlVal: realized},
  ];

  const container = $('#dashboard-cards');
  if (container) {
    container.innerHTML = '';
    cardsData.forEach(card => {
      const div = document.createElement('div');
      div.className = 'card';
      let subtitleClass = '';
      if (card.isPnl) {
         subtitleClass = card.pnlVal >= 0 ? 'profit' : 'loss';
      }
      div.innerHTML = `
        <div class="title">${card.title}</div>
        <div class="value ${subtitleClass}">${card.value}</div>
        <div class="subtitle ${subtitleClass}">${card.subtitle}</div>
      `;
      container.appendChild(div);
    });
  }
  
  const balEl = $('#balance');
  if (balEl) balEl.textContent = formatCurrency(available);

  const navValEl = $('#portfolio-value');
  if (navValEl) navValEl.textContent = formatCurrency(portfolio);

  // Sync balances to user profile in Firestore so admin leaderboard updates in real-time
  if (db && currentUser) {
     db.collection("users").doc(currentUser.uid).update({
        availableBalance: available,
        portfolioValue: portfolio,
        unrealizedPnL: unrealized,
        realizedPnL: realized
     }).catch(e => console.error("Error updating user leaderboard document:", e));
  }
  
  // Update floating chart position overlay
  updateChartOverlay();
}

// ==== Chart Position Overlay ====
function updateChartOverlay() {
  const overlay = $('#chart-position-overlay');
  if (!overlay) return;
  
  if (!currentUser || !currentSelectedSymbol) {
     overlay.classList.add('hidden');
     return;
  }
  
  const formattedSymbol = currentSelectedSymbol.replace('USDT', '/USDT');
  const activePosList = fbPositions.filter(p => p.symbol === formattedSymbol && (p.status === 'Active' || !p.status));
  
  if (activePosList.length === 0) {
     overlay.classList.add('hidden');
     return;
  }
  
  overlay.classList.remove('hidden');
  overlay.innerHTML = '';
  
  activePosList.forEach((pos, idx) => {
    const entryVal = Number(pos.entry) || 0;
    const currentVal = Number(pos.current || pos.entry) || 0;
    const qtyVal = Number(pos.qty) || 0;
    const pnl = (currentVal - entryVal) * qtyVal * (pos.side === 'Long' || pos.side === 'Buy' ? 1 : -1);
    const pnlPct = (pnl / (entryVal * qtyVal)) * 100;
    
    const sideClass = pos.side === 'Long' || pos.side === 'Buy' ? 'profit' : 'loss';
    const pnlClass = pnl >= 0 ? 'profit' : 'loss';
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'overlay-item';
    if (idx > 0) {
      itemDiv.style.borderTop = '1px dashed rgba(192, 57, 43, 0.2)';
      itemDiv.style.paddingTop = '8px';
      itemDiv.style.marginTop = '8px';
    }
    
    itemDiv.innerHTML = `
      <div class="overlay-header">
        <span class="${sideClass}">${pos.symbol} ${pos.side.toUpperCase()}</span>
        <span class="${pnlClass}">${pnl >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%</span>
      </div>
      <div class="overlay-row">
        <span class="label">Qty:</span>
        <span class="val">${formatNumber(qtyVal, 4)}</span>
      </div>
      <div class="overlay-row">
        <span class="label">Entry Price:</span>
        <span class="val">${formatCurrency(entryVal)}</span>
      </div>
      <div class="overlay-row">
        <span class="label">Unrealized PnL:</span>
        <span class="val ${pnlClass}">${pnl >= 0 ? '+' : ''}${formatCurrency(pnl)}</span>
      </div>
      <button class="overlay-close-btn" id="overlay-close-btn-${pos.id}" data-id="${pos.id}">Market Close</button>
    `;
    overlay.appendChild(itemDiv);
  });
}

// ==== Watchlist ====
function populateWatchlist() {
  const ul = $('#watchlist');
  if (!ul) return;
  ul.innerHTML = '';
  dummyWatchlist.forEach(item => {
    const li = document.createElement('li');
    li.dataset.symbol = item.symbol;
    li.textContent = `${item.symbol.replace('USDT', '/USDT')}`;
    li.addEventListener('click', () => selectSymbol(item.symbol));
    ul.appendChild(li);
  });
  
  if (!currentSelectedSymbol && dummyWatchlist.length > 0) {
    selectSymbol(dummyWatchlist[0].symbol);
  } else if (currentSelectedSymbol) {
    const liList = $$('#watchlist li');
    liList.forEach(li => li.classList.toggle('selected', li.dataset.symbol === currentSelectedSymbol));
  }
}

function selectSymbol(symbol) {
  currentSelectedSymbol = symbol;
  const liList = $$('#watchlist li');
  liList.forEach(li => li.classList.toggle('selected', li.dataset.symbol === symbol));
  const data = dummyWatchlist.find(s => s.symbol === symbol);
  if (data) {
    const priceInput = $('#price-input');
    if (priceInput) {
      priceInput.value = data.price;
      priceInput.dispatchEvent(new Event('input'));
    }
  }
  
  const qtySuffix = $('#qty-suffix');
  if (qtySuffix) {
    qtySuffix.textContent = symbol.replace('USDT', '');
  }
  
  userEditedPrice = false;
  
  initChart(symbol);
  
  updateChartOverlay();
}

// ==== Real-time Data (Binance WS) & Order Matching ====
async function processOrderFill(order, fillPrice) {
  if (!db || !currentUser) return;
  const now = new Date().toLocaleString();
  
  try {
    // 1. Delete order
    if (order.id) {
      await db.collection("orders").doc(order.id).delete();
    }
    
    // 2. Add to trade log
    await db.collection("trades").add({
      symbol: order.symbol,
      side: order.side,
      qty: order.qty,
      price: fillPrice,
      time: now,
      uid: currentUser.uid
    });

    // 3. Add to order history log
    await db.collection("history").add({
      symbol: order.symbol,
      side: order.side,
      qty: order.qty,
      price: fillPrice,
      status: 'Filled',
      time: now,
      uid: currentUser.uid
    });

    // 4. Update Positions (Active / Closed)
    const targetSide = order.side === 'Buy' ? 'Long' : 'Short';
    const activePos = fbPositions.find(p => p.symbol === order.symbol && p.side === targetSide && (p.status === 'Active' || !p.status));

    if (activePos) {
      const activeQty = Number(activePos.qty) || 0;
      const activeEntry = Number(activePos.entry) || 0;
      const orderQty = Number(order.qty) || 0;
      
      // Increase position size and recalculate entry price
      const newQty = activeQty + orderQty;
      const newEntry = ((activeQty * activeEntry) + (orderQty * fillPrice)) / newQty;
      
      await db.collection("positions").doc(activePos.id).update({
        qty: newQty,
        entry: newEntry,
        current: fillPrice
      });
    } else {
      // No active position for this side, create new
      await db.collection("positions").add({
        symbol: order.symbol,
        side: targetSide,
        qty: order.qty,
        entry: fillPrice,
        current: fillPrice,
        status: 'Active',
        time: now,
        uid: currentUser.uid
      });
    }
  } catch (error) {
    console.error("Error processing order fill:", error);
  }
}

function connectBinanceWS() {
  if (binanceWS) binanceWS.close();
  
  binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');
  
  binanceWS.onmessage = (event) => {
    const data = JSON.parse(event.data);
    data.forEach(ticker => {
      const watchItem = dummyWatchlist.find(s => s.symbol === ticker.s);
      if (watchItem) {
        watchItem.price = parseFloat(ticker.c);
        
        // Update the order form instantly if this is the currently selected symbol
        if (ticker.s === currentSelectedSymbol) {
          const priceInput = $('#price-input');
          if (priceInput && !userEditedPrice) {
            priceInput.value = watchItem.price;
            priceInput.dispatchEvent(new Event('input'));
          }
        }
        
        // --- Order Matching Engine ---
        const formattedSymbol = ticker.s.replace('USDT', '/USDT');
        let uiNeedsUpdate = false;
        
        // Update live position prices for Unrealized PnL
        fbPositions.forEach(pos => {
           if (pos.symbol === formattedSymbol && (pos.status === 'Active' || !pos.status)) {
               pos.current = watchItem.price;
               uiNeedsUpdate = true;
           }
        });
        
        // Check Limit/Stop orders
        for (let i = fbOrders.length - 1; i >= 0; i--) {
           const order = fbOrders[i];
           if (order.symbol === formattedSymbol && order.status === 'Pending') {
              let shouldFill = false;
              if (order.type === 'limit' && order.side === 'Buy' && watchItem.price <= order.price) shouldFill = true;
              if (order.type === 'limit' && order.side === 'Sell' && watchItem.price >= order.price) shouldFill = true;
              if (order.type === 'stop' && order.side === 'Buy' && watchItem.price >= order.price) shouldFill = true;
              if (order.type === 'stop' && order.side === 'Sell' && watchItem.price <= order.price) shouldFill = true;
              
              if (shouldFill) {
                 processOrderFill(order, order.price);
                 fbOrders.splice(i, 1);
                 uiNeedsUpdate = true;
              }
           }
        }
        
        if (uiNeedsUpdate) {
           populatePositionsTabs();
           populateDashboard();
           updateModalPnL();
        }
      }
    });
  };
  
  binanceWS.onclose = () => {
    setTimeout(connectBinanceWS, 3000); // Auto reconnect on failure
  };
}

// ==== TradingView Chart ====
function initChart(symbol = 'BTCUSDT') {
  const container = $('#tradingview-widget');
  if (!container) return;
  container.innerHTML = '';
  
  if (typeof TradingView !== 'undefined') {
    new TradingView.widget({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#161B26',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      container_id: 'tradingview-widget',
      studies: [],
    });
  } else {
    container.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-secondary);">TradingView script not loaded yet.</div>';
  }
}

// ==== Positions Tabs Rendering ====
function populatePositionsTabs() {
  const dataMap = {
    positions: fbPositions.filter(p => p.status === 'Active' || !p.status),
    closed: fbPositions.filter(p => p.status === 'Closed'),
    orders: fbOrders,
    history: fbHistory,
    trades: fbTrades,
  };

  const activeTabBtn = $('#positions-tabs .positions-tab.active');
  const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'positions';
  renderTable(activeTab);

  function renderTable(tab) {
    const container = $('#positions-content');
    if (!container) return;
    const rows = dataMap[tab] || [];
    let html = '';
    
    if (tab === 'positions' && rows.length > 0) {
      html += `<div style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
                 <button id="close-all-btn" class="close-btn" style="background-color: var(--loss); color: white; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px;">Close All Positions</button>
               </div>`;
    }
    
    html += '<table class="table">';
    html += '<thead><tr>';
    if (tab === 'positions') {
      html += '<th>Symbol</th><th>Side</th><th>Qty</th><th>Entry Price</th><th>Current Price</th><th>Unrealized PnL</th><th>Action</th>';
    } else if (tab === 'closed') {
      html += '<th>Symbol</th><th>Side</th><th>Qty</th><th>Entry Price</th><th>Exit Price</th><th>Realized PnL</th><th>Time</th>';
    } else if (tab === 'orders') {
      html += '<th>Symbol</th><th>Side</th><th>Qty</th><th>Limit Price</th><th>Status</th><th>Action</th>';
    } else if (tab === 'history') {
      html += '<th>Symbol</th><th>Side</th><th>Qty</th><th>Price</th><th>Status</th><th>Time</th>';
    } else if (tab === 'trades') {
      html += '<th>Symbol</th><th>Side</th><th>Qty</th><th>Price</th><th>Time</th>';
    }
    html += '</tr></thead><tbody>';
    
    if (rows.length === 0) {
      let colSpan = 5;
      if (tab === 'positions' || tab === 'closed') colSpan = 7;
      if (tab === 'history') colSpan = 6;
      html += `<tr><td colspan="${colSpan}" style="text-align: center; color: var(--text-secondary);">No items found</td></tr>`;
    } else {
      rows.forEach(r => {
        html += '<tr>';
        if (tab === 'positions') {
          const entryVal = Number(r.entry) || 0;
          const currentVal = Number(r.current || r.entry) || 0;
          const qtyVal = Number(r.qty) || 0;
          const pnl = (currentVal - entryVal) * qtyVal * (r.side === 'Long' || r.side === 'Buy' ? 1 : -1);
          html += `<td>${r.symbol}</td>
                   <td class="${r.side === 'Long' || r.side === 'Buy' ? 'profit' : 'loss'}">${r.side}</td>
                   <td>${formatNumber(qtyVal, 4)}</td>
                   <td>${formatCurrency(entryVal)}</td>
                   <td>${formatCurrency(currentVal)}</td>
                   <td class="${pnl >= 0 ? 'profit' : 'loss'}">${formatCurrency(pnl)}</td>
                   <td><button class="close-btn" data-id="${r.id}">Close</button></td>`;
        } else if (tab === 'closed') {
          html += `<td>${r.symbol}</td>
                   <td class="${r.side === 'Long' || r.side === 'Buy' ? 'profit' : 'loss'}">${r.side}</td>
                   <td>${formatNumber(r.qty, 4)}</td>
                   <td>${formatCurrency(r.entry)}</td>
                   <td>${formatCurrency(r.exit)}</td>
                   <td class="${(r.pnl || 0) >= 0 ? 'profit' : 'loss'}">${formatCurrency(r.pnl || 0)}</td>
                   <td>${r.time || '—'}</td>`;
        } else if (tab === 'orders') {
          html += `<td>${r.symbol}</td>
                   <td class="${r.side === 'Buy' ? 'profit' : 'loss'}">${r.side}</td>
                   <td>${formatNumber(r.qty, 4)}</td>
                   <td>${formatCurrency(r.price)}</td>
                   <td>${r.status}</td>
                   <td><button class="cancel-btn" data-id="${r.id}">Cancel</button></td>`;
        } else if (tab === 'history') {
          html += `<td>${r.symbol}</td>
                   <td class="${r.side === 'Buy' || r.side === 'Long' ? 'profit' : 'loss'}">${r.side}</td>
                   <td>${formatNumber(r.qty, 4)}</td>
                   <td>${formatCurrency(r.price)}</td>
                   <td>${r.status}</td>
                   <td>${r.time || '—'}</td>`;
        } else if (tab === 'trades') {
          html += `<td>${r.symbol}</td>
                   <td class="${r.side === 'Buy' || r.side === 'Long' ? 'profit' : 'loss'}">${r.side}</td>
                   <td>${formatNumber(r.qty, 4)}</td>
                   <td>${formatCurrency(r.price)}</td>
                   <td>${r.time || '—'}</td>`;
        }
        html += '</tr>';
      });
    }
    html += '</tbody></table>';
    container.innerHTML = html;
  }
}

// ==== Order Submission & Events Binding ====
function bindEvents() {
  const priceInput = $('#price-input');
  const qtyInput = $('#qty-input');
  const totalDisplay = $('#total-display');
  const slider = $('#size-slider');

  // Trade form panel event binding (only on trading index page)
  if (priceInput && qtyInput && totalDisplay) {
    const updateTotal = () => {
      const price = parseFloat(priceInput.value) || 0;
      const qty = parseFloat(qtyInput.value) || 0;
      totalDisplay.value = formatNumber(price * qty, 2);
    };

    priceInput.addEventListener('input', (e) => {
      if (e.isTrusted) userEditedPrice = true;
      updateTotal();
    });
    qtyInput.addEventListener('input', updateTotal);

    // Slider adjusts quantity as percentage of Available Balance
    if (slider) {
      slider.addEventListener('input', () => {
        const percent = slider.value / 100;
        const balance = getAvailableBalance();
        const price = parseFloat(priceInput.value) || 0;
        if (price > 0) {
          const qty = (balance * percent) / price;
          qtyInput.value = qty.toFixed(4);
          updateTotal();
        }
      });
    }

    // Default state
    priceInput.readOnly = true;
  }

  // Tab switching for positions page
  $$('#positions-tabs .positions-tab').forEach(tabBtn => {
    tabBtn.onclick = () => {
      $$('#positions-tabs .positions-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      populatePositionsTabs();
    };
  });

  // Logout Button
  const logoutBtn = $('#logout-btn');
  if (logoutBtn) {
     logoutBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
           window.location.href = "login.html";
        });
     };
  }

  // Action Buttons event delegation for Positions Content
  const posContent = $('#positions-content');
  if (posContent) {
    posContent.onclick = async (e) => {
      if (!db || !currentUser) return;
      if (e.target.id === 'close-all-btn') {
         const activePositions = fbPositions.filter(p => p.status === 'Active' || !p.status);
         if (activePositions.length === 0) return;
         
         const confirmCloseAll = await showConfirmModal(`Are you sure you want to close all ${activePositions.length} active positions?`, activePositions);
         if (confirmCloseAll) {
            e.target.disabled = true;
            e.target.textContent = 'Closing...';
            const now = new Date().toLocaleString();
            
            try {
               const promises = activePositions.map(async (pos) => {
                  const exitPrice = pos.current || pos.entry;
                  const pnl = pos.qty * (exitPrice - pos.entry) * (pos.side === 'Long' || pos.side === 'Buy' ? 1 : -1);
                  
                  // Update position
                  await db.collection("positions").doc(pos.id).update({
                     status: 'Closed',
                     exit: exitPrice,
                     pnl: pnl,
                     time: now
                  });
                  
                  // Add trade log
                  await db.collection("trades").add({
                     symbol: pos.symbol,
                     side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                     qty: pos.qty,
                     price: exitPrice,
                     time: now,
                     uid: currentUser.uid
                  });
                  
                  // Add history
                  await db.collection("history").add({
                     symbol: pos.symbol,
                     side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                     qty: pos.qty,
                     price: exitPrice,
                     status: 'Closed',
                     time: now,
                     uid: currentUser.uid
                  });
               });
               
               await Promise.all(promises);
               alert("All active positions closed successfully!");
            } catch (err) {
               console.error("Error closing all positions:", err);
               alert("Failed to close some positions: " + err.message);
            }
         }
      } else if (e.target.classList.contains('close-btn')) {
         const id = e.target.dataset.id;
         const pos = fbPositions.find(p => p.id === id);
         if (pos) {
            const confirmClose = await showConfirmModal(`Are you sure you want to close this ${pos.side} position on ${pos.symbol}?`, pos);
            if (confirmClose) {
               const now = new Date().toLocaleString();
               const exitPrice = pos.current || pos.entry;
               const pnl = pos.qty * (exitPrice - pos.entry) * (pos.side === 'Long' || pos.side === 'Buy' ? 1 : -1);
               
               try {
                 await db.collection("positions").doc(pos.id).update({
                    status: 'Closed',
                    exit: exitPrice,
                    pnl: pnl,
                    time: now
                 });
                 
                 await db.collection("trades").add({
                    symbol: pos.symbol,
                    side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                    qty: pos.qty,
                    price: exitPrice,
                    time: now,
                    uid: currentUser.uid
                 });
                 
                 await db.collection("history").add({
                    symbol: pos.symbol,
                    side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                    qty: pos.qty,
                    price: exitPrice,
                    status: 'Closed',
                    time: now,
                    uid: currentUser.uid
                 });
               } catch (err) {
                 console.error("Error closing position manually:", err);
               }
            }
         }
      } else if (e.target.classList.contains('cancel-btn')) {
         const id = e.target.dataset.id;
         const order = fbOrders.find(o => o.id === id);
         if (order) {
            const confirmCancel = await showConfirmModal(`Cancel order: ${order.side} ${order.qty} ${order.symbol} @ ${order.price}?`);
            if (confirmCancel) {
               try {
                 await db.collection("orders").doc(order.id).delete();
                 
                 const now = new Date().toLocaleString();
                 await db.collection("history").add({
                    symbol: order.symbol,
                    side: order.side,
                    qty: order.qty,
                    price: order.price,
                    status: 'Cancelled',
                    time: now,
                    uid: currentUser.uid
                 });
               } catch (err) {
                 console.error("Error cancelling order:", err);
               }
            }
         }
      }
    };
  }

  // Action Buttons event delegation for Chart Position Overlay
  const overlay = $('#chart-position-overlay');
  if (overlay) {
    overlay.onclick = async (e) => {
      if (!db || !currentUser) return;
      if (e.target.id && e.target.id.startsWith('overlay-close-btn-')) {
         const id = e.target.dataset.id;
         const pos = fbPositions.find(p => p.id === id);
         if (pos) {
            const confirmClose = await showConfirmModal(`Are you sure you want to close this ${pos.side} position on ${pos.symbol}?`, pos);
            if (confirmClose) {
               const now = new Date().toLocaleString();
               const exitPrice = pos.current || pos.entry;
               const pnl = pos.qty * (exitPrice - pos.entry) * (pos.side === 'Long' || pos.side === 'Buy' ? 1 : -1);
               
               try {
                 await db.collection("positions").doc(pos.id).update({
                    status: 'Closed',
                    exit: exitPrice,
                    pnl: pnl,
                    time: now
                 });
                 
                 await db.collection("trades").add({
                    symbol: pos.symbol,
                    side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                    qty: pos.qty,
                    price: exitPrice,
                    time: now,
                    uid: currentUser.uid
                 });
                 
                 await db.collection("history").add({
                    symbol: pos.symbol,
                    side: pos.side === 'Long' || pos.side === 'Buy' ? 'Sell' : 'Buy',
                    qty: pos.qty,
                    price: exitPrice,
                    status: 'Closed',
                    time: now,
                    uid: currentUser.uid
                 });
               } catch (err) {
                 console.error("Error closing position via overlay:", err);
               }
            }
         }
      }
    };
  }

  // Tab switching for order type
  $$('.order-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.order-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentOrderType = tab.dataset.type;
      
      const pInput = $('#price-input');
      if (currentOrderType === 'market') {
        pInput.readOnly = true;
        if (currentSelectedSymbol) {
           const data = dummyWatchlist.find(s => s.symbol === currentSelectedSymbol);
           if (data) {
              pInput.value = data.price;
              updateTotal();
           }
        }
      } else {
        pInput.readOnly = false;
      }
    });
  });

  // Default state
  if (priceInput) priceInput.readOnly = true;

  async function handleOrder(side) {
    if (!db || !currentUser) return alert("Firebase database not connected.");
    const price = parseFloat(priceInput.value) || 0;
    const qty = parseFloat(qtyInput.value) || 0;
    if (price <= 0 || qty <= 0) return alert('Invalid price or quantity');
    
    const avbl = getAvailableBalance();
    const cost = price * qty;
    if (avbl < cost) return alert('Insufficient balance');
    
    const now = new Date().toLocaleString();
    const formattedSymbol = currentSelectedSymbol.replace('USDT', '/USDT');
    
    try {
      if (currentOrderType === 'market') {
         const tempOrder = {
            symbol: formattedSymbol,
            side: side,
            qty: qty,
            price: price,
            type: 'market',
            uid: currentUser.uid
         };
         await processOrderFill(tempOrder, price);
      } else {
         await db.collection("orders").add({
            symbol: formattedSymbol,
            side: side,
            qty: qty,
            price: price,
            status: 'Pending',
            type: currentOrderType,
            time: now,
            uid: currentUser.uid
         });
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Error submitting order: " + err.message);
    }
    
    qtyInput.value = '';
    if (slider) {
       slider.value = 0;
    }
    updateTotal();
  }

  const buyBtn = $('#buy-btn');
  const sellBtn = $('#sell-btn');
  if (buyBtn) buyBtn.addEventListener('click', () => handleOrder('Buy'));
  if (sellBtn) sellBtn.addEventListener('click', () => handleOrder('Sell'));

  // Add Symbol Button event listener
  const addSymbolBtn = $('.add-symbol-btn');
  if (addSymbolBtn) {
    addSymbolBtn.onclick = async () => {
      const symbolInput = await showInputModal("Enter the crypto ticker to add to Watchlist:", "e.g., LTC, DOT, LINK");
      if (symbolInput) {
        let formatted = symbolInput.trim().toUpperCase();
        if (formatted.length === 0) return;
        
        // Append USDT if they only wrote the coin name
        if (!formatted.endsWith('USDT')) {
          formatted += 'USDT';
        }
        
        // Check if it already exists
        const exists = dummyWatchlist.some(s => s.symbol === formatted);
        if (exists) {
          alert(`Symbol ${formatted} is already in your watchlist.`);
          return;
        }
        
        // Add to watchlist
        const newItem = { symbol: formatted, price: 0, change: 0.0 };
        dummyWatchlist.push(newItem);
        saveWatchlist();
        populateWatchlist();
        selectSymbol(formatted);
      }
    };
  }
}

// ==== Run Init ====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
