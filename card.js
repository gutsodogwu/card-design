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

    dateElement.textContent = `${day} ${month} ${year} · ${hours}:${minutes}`;
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    populateWeekSelector();
    setupNavigation();
    setupUpdateButton();
    setupTransactionFilters();
    addAnimations();

    // Update time every minute
    setInterval(updateDateTime, 60000);

    console.log('Dashboard initialized successfully!');
});
