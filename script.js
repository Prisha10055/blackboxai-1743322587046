// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu md:hidden bg-blue-600 text-white p-4';
        mobileMenu.innerHTML = `
            <a href="index.html" class="block py-2 hover:text-blue-200">Home</a>
            <a href="learn.html" class="block py-2 hover:text-blue-200">Learn</a>
            <a href="simulator.html" class="block py-2 hover:text-blue-200">Simulator</a>
            <a href="real-trading.html" class="block py-2 hover:text-blue-200">Real Trading</a>
            <a href="account.html" class="block py-2 hover:text-blue-200">Account</a>
        `;
        document.querySelector('nav').appendChild(mobileMenu);
        mobileMenu.style.display = 'none';

        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Initialize user data in localStorage if not exists
    if (!localStorage.getItem('tradeLearnUser')) {
        localStorage.setItem('tradeLearnUser', JSON.stringify({
            name: '',
            email: '',
            completedModules: [],
            simulatorFunds: 10000,
            portfolio: [],
            watchlist: ['AAPL', 'MSFT', 'GOOGL', 'BTC-USD', 'ETH-USD']
        }));
    }

    // Update navigation based on auth status
    updateAuthUI();
});

// Common utility functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// User authentication functions
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('tradeLearnUser'));
    const authElements = document.querySelectorAll('.auth-element');
    
    authElements.forEach(element => {
        if (user.email) {
            // User is logged in
            if (element.classList.contains('logged-in')) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            // User is logged out
            if (element.classList.contains('logged-out')) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    });
}

// Simulator functions
function generateRandomPrice(symbol) {
    // Base prices for popular assets
    const basePrices = {
        'AAPL': 150,
        'MSFT': 250,
        'GOOGL': 120,
        'BTC-USD': 30000,
        'ETH-USD': 2000,
        'SPY': 400
    };
    
    const volatility = {
        'AAPL': 0.02,
        'MSFT': 0.015,
        'GOOGL': 0.018,
        'BTC-USD': 0.05,
        'ETH-USD': 0.06,
        'SPY': 0.01
    };
    
    const basePrice = basePrices[symbol] || 100;
    const changePercent = (Math.random() * 2 - 1) * (volatility[symbol] || 0.03);
    return basePrice * (1 + changePercent);
}

// Export functions for module scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        updateAuthUI,
        generateRandomPrice
    };
}