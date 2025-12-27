// Dynamic Date and Time Display
function updateDateTime() {
    const dateElement = document.querySelector('.date');
    const now = new Date();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    dateElement.textContent = `${day} ${month} ${year} � ${hours}:${minutes}`;
}

// Populate Week Selector Dropdown
function populateWeekSelector() {
    const select = document.getElementById('choose-week');
    const weeks = [
        'Last Week',
        'This Week',
        '2 Weeks Ago',
        '3 Weeks Ago',
        '4 Weeks Ago',
        'Last Month'
    ];

    // Clear existing options
    select.innerHTML = '';

    weeks.forEach((week, index) => {
        const option = document.createElement('option');
        option.value = week.toLowerCase().replace(/\s+/g, '-');
        option.textContent = week;
        if (index === 0) option.selected = true;
        select.appendChild(option);
    });

    // Update label when selection changes
    select.addEventListener('change', function() {
        console.log('Selected period:', this.value);
        // Here you could add logic to filter transactions by selected period
    });
}

// Navigation Interactivity
function setupNavigation() {
    const navItems = document.querySelectorAll('.ul1 li, .ul2 li');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active-nav'));

            // Add active class to clicked item
            this.classList.add('active-nav');

            const text = this.textContent.trim();
            console.log('Navigating to:', text);

            // Update dashboard header based on navigation
            const mainHeader = document.querySelector('.main-area h1');
            if (!text.includes('Log Out')) {
                mainHeader.textContent = text;
            } else {
                if (confirm('Are you sure you want to log out?')) {
                    alert('Logging out...');
                }
            }
        });
    });
}

// Update Button Functionality
function setupUpdateButton() {
    const updateBtn = document.querySelector('.update');

    updateBtn.addEventListener('click', function() {
        this.textContent = 'Updating...';
        this.disabled = true;

        // Simulate data refresh
        setTimeout(() => {
            // Update the date/time
            updateDateTime();

            // Generate random balance update
            const balanceElement = document.querySelector('.your-balance h2');
            const currentBalance = parseFloat(balanceElement.textContent.replace(/[$,]/g, ''));
            const change = (Math.random() * 200 - 100).toFixed(2);
            const newBalance = (currentBalance + parseFloat(change)).toFixed(2);
            balanceElement.textContent = `$${Number(newBalance).toLocaleString()}`;

            // Show notification
            showNotification('Dashboard updated successfully!');

            this.textContent = 'Update';
            this.disabled = false;
        }, 1500);
    });
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1em 1.5em;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Transaction Filtering
function setupTransactionFilters() {
    const filterItems = document.querySelectorAll('.transactions-area nav li');
    const transactions = document.querySelectorAll('.transaction-details');

    filterItems.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filterItems.forEach(f => f.style.color = 'rgb(173, 173, 173)');

            // Add active class to clicked filter
            this.style.color = 'rgb(35, 35, 35)';
            this.style.fontWeight = '700';

            const filterType = this.textContent.trim().toLowerCase();

            transactions.forEach(transaction => {
                const amount = transaction.querySelector('.amount').textContent;

                if (filterType === 'all') {
                    transaction.style.display = 'block';
                } else if (filterType === 'revenue' && !amount.includes('-')) {
                    transaction.style.display = 'block';
                } else if (filterType === 'expenses' && amount.includes('-')) {
                    transaction.style.display = 'block';
                } else if (filterType !== 'all') {
                    transaction.style.display = 'none';
                }
            });
        });
    });
}

// Add CSS animations
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .active-nav {
            color: white !important;
            font-weight: 700;
        }

        .ul1 li, .ul2 li {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .ul1 li:hover, .ul2 li:hover {
            color: white;
            transform: translateX(5px);
        }

        .update {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .update:hover {
            transform: scale(1.05);
        }

        .update:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .transactions-area nav li {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .transactions-area nav li:hover {
            color: rgb(35, 35, 35);
        }
    `;
    document.head.appendChild(style);
}

// Ripple Effect on Click
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#ripple-style')) {
        style.id = 'ripple-style';
        document.head.appendChild(style);
    }

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Transaction Card Expand/Collapse
function setupTransactionExpand() {
    const transactions = document.querySelectorAll('.transaction-details');

    transactions.forEach(transaction => {
        transaction.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');

            // Remove expanded class from all
            transactions.forEach(t => t.classList.remove('expanded'));

            if (!isExpanded) {
                this.classList.add('expanded');

                // Add expand style if not exists
                if (!document.querySelector('#expand-style')) {
                    const style = document.createElement('style');
                    style.id = 'expand-style';
                    style.textContent = `
                        .transaction-details.expanded {
                            height: auto !important;
                            padding-bottom: 1em;
                            background: rgba(247, 247, 247, 0.8);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
    });
}

// Add Pulsing Notification Badge
function addNotificationBadge() {
    const bellIcon = document.querySelector('.fa-bell');
    if (bellIcon && !document.querySelector('.notification-badge')) {
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        badge.textContent = '3';
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4444;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            animation: pulse 2s ease-in-out infinite;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 0 0 6px rgba(255, 68, 68, 0);
                }
            }
        `;
        if (!document.querySelector('#pulse-style')) {
            style.id = 'pulse-style';
            document.head.appendChild(style);
        }

        bellIcon.parentElement.style.position = 'relative';
        bellIcon.parentElement.appendChild(badge);

        // Make bell icon interactive
        bellIcon.parentElement.addEventListener('click', function() {
            showNotification('You have 3 new notifications!');
            badge.textContent = '0';
            setTimeout(() => {
                badge.style.display = 'none';
            }, 300);
        });
    }
}

// Balance Card Flip Animation
function setupBalanceCardFlip() {
    const balanceCard = document.querySelector('.your-balance');
    let isFlipped = false;

    balanceCard.addEventListener('click', function(e) {
        if (e.target.tagName !== 'H2') return; // Only flip when clicking balance

        isFlipped = !isFlipped;
        this.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        this.style.transition = 'transform 0.6s';

        setTimeout(() => {
            if (isFlipped) {
                showNotification('Card details hidden for privacy');
            }
        }, 300);
    });
}

// Add Progress Bars to Utility Cards
function addSpendingProgress() {
    const utilityCards = [
        { selector: '.cafe-restaurant', color: '#8bc34a', percent: 65 },
        { selector: '.health-care', color: '#e91e63', percent: 45 },
        { selector: '.shopping', color: '#3f51b5', percent: 80 }
    ];

    utilityCards.forEach(card => {
        const element = document.querySelector(card.selector);
        if (element && !element.querySelector('.progress-bar')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                position: absolute;
                bottom: 8px;
                left: 10%;
                width: 80%;
                height: 4px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 2px;
                overflow: hidden;
            `;

            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.cssText = `
                height: 100%;
                background: ${card.color};
                width: 0;
                transition: width 1s ease-out;
                border-radius: 2px;
            `;

            progressBar.appendChild(progressFill);
            element.appendChild(progressBar);

            // Animate progress
            setTimeout(() => {
                progressFill.style.width = card.percent + '%';
            }, 500);
        }
    });
}

// Swipe Gesture for Utility Cards (Mobile)
function setupSwipeGestures() {
    const utilitiesContainer = document.querySelector('.utilities');
    if (!utilitiesContainer) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    utilitiesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    utilitiesContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNotification('Swiped right!');
            } else {
                showNotification('Swiped left!');
            }
            isDragging = false;
        }
    });

    utilitiesContainer.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Skeleton Loading Animation
function showSkeletonLoading() {
    const style = document.createElement('style');
    style.id = 'skeleton-style';
    style.textContent = `
        @keyframes skeleton-loading {
            0% {
                background-position: -200px 0;
            }
            100% {
                background-position: calc(200px + 100%) 0;
            }
        }

        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
            background-size: 200px 100%;
            animation: skeleton-loading 1.5s infinite;
        }
    `;
    if (!document.querySelector('#skeleton-style')) {
        document.head.appendChild(style);
    }
}

// Counter Animation for Numbers
function animateCounter(element, target) {
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Add Tooltips
function addTooltips() {
    const elementsWithTooltip = [
        { selector: '.fa-bell', text: 'Notifications' },
        { selector: '.update', text: 'Refresh dashboard data' },
        { selector: '.your-balance', text: 'Click balance to hide' }
    ];

    elementsWithTooltip.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.setAttribute('title', item.text);
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    populateWeekSelector();
    setupNavigation();
    setupUpdateButton();
    setupTransactionFilters();
    addAnimations();
    setupTransactionExpand();
    addNotificationBadge();
    setupBalanceCardFlip();
    addSpendingProgress();
    setupSwipeGestures();
    showSkeletonLoading();
    addTooltips();

    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('.update, .cafe-restaurant, .health-care, .shopping, .black-area');
    clickableElements.forEach(el => {
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.addEventListener('click', createRipple);
    });

    // Update time every minute
    setInterval(updateDateTime, 60000);

    // Animate transaction numbers on load
    setTimeout(() => {
        const transactionNumber = document.querySelector('.transaction-number h4');
        if (transactionNumber) {
            animateCounter(transactionNumber, 48);
        }
    }, 500);

    console.log('Dashboard initialized with advanced features!');
});
