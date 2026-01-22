// Configuration - Update this URL after deploying your backend
const API_BASE_URL = 'https://YOUR-CLOUD-RUN-URL';

// State
let selectedSlot = null;

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const emptyEl = document.getElementById('empty');
const slotsContainerEl = document.getElementById('slots-container');
const modalEl = document.getElementById('modal');
const modalSlotInfoEl = document.getElementById('modal-slot-info');
const bookingFormEl = document.getElementById('booking-form');
const submitBtnEl = document.getElementById('submit-btn');
const successModalEl = document.getElementById('success-modal');
const successMessageEl = document.getElementById('success-message');

// Format date in French
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
}

// Group slots by date
function groupSlotsByDate(slots) {
    const groups = {};
    slots.forEach(slot => {
        if (!groups[slot.date]) {
            groups[slot.date] = [];
        }
        groups[slot.date].push(slot);
    });
    return groups;
}

// Render slots
function renderSlots(slots) {
    if (!slots || slots.length === 0) {
        showEmpty();
        return;
    }

    const grouped = groupSlotsByDate(slots);
    const dates = Object.keys(grouped).sort();

    slotsContainerEl.innerHTML = dates.map(date => `
        <div class="day-group">
            <div class="day-header">${formatDate(date)}</div>
            <div class="slots-list">
                ${grouped[date].map(slot => `
                    <button class="slot-btn"
                            data-slot-id="${slot.id}"
                            data-date="${slot.date}"
                            data-start="${slot.startTime}"
                            data-end="${slot.endTime}"
                            onclick="openBookingModal(this)">
                        ${slot.startTime} - ${slot.endTime}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');

    showSlots();
}

// Load slots from API
async function loadSlots() {
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/slots`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur serveur');
        }

        const data = await response.json();
        renderSlots(data.slots);
    } catch (error) {
        console.error('Error loading slots:', error);
        showError('Impossible de charger les créneaux');
    }
}

// Open booking modal
function openBookingModal(button) {
    selectedSlot = {
        id: button.dataset.slotId,
        date: button.dataset.date,
        startTime: button.dataset.start,
        endTime: button.dataset.end
    };

    modalSlotInfoEl.textContent = `${formatDate(selectedSlot.date)} de ${selectedSlot.startTime} à ${selectedSlot.endTime}`;
    bookingFormEl.reset();
    submitBtnEl.disabled = false;
    submitBtnEl.textContent = 'Confirmer';
    modalEl.classList.remove('hidden');
}

// Close booking modal
function closeModal() {
    modalEl.classList.add('hidden');
    selectedSlot = null;
}

// Close success modal
function closeSuccessModal() {
    successModalEl.classList.add('hidden');
    loadSlots(); // Reload slots to refresh availability
}

// Submit booking
async function submitBooking(event) {
    event.preventDefault();

    if (!selectedSlot) return;

    const formData = new FormData(bookingFormEl);
    const bookingData = {
        slotId: selectedSlot.id,
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        telephone: formData.get('telephone')
    };

    submitBtnEl.disabled = true;
    submitBtnEl.textContent = 'Réservation en cours...';

    try {
        const response = await fetch(`${API_BASE_URL}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la réservation');
        }

        // Success
        closeModal();
        successMessageEl.textContent = `Votre rendez-vous est confirmé pour le ${formatDate(data.date)} à ${data.time}.`;
        successModalEl.classList.remove('hidden');

    } catch (error) {
        console.error('Booking error:', error);
        alert(error.message);
        submitBtnEl.disabled = false;
        submitBtnEl.textContent = 'Confirmer';
    }
}

// UI State helpers
function showLoading() {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    emptyEl.classList.add('hidden');
    slotsContainerEl.classList.add('hidden');
}

function showError(message) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    slotsContainerEl.classList.add('hidden');
    errorMessageEl.textContent = message;
}

function showEmpty() {
    loadingEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    slotsContainerEl.classList.add('hidden');
}

function showSlots() {
    loadingEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    emptyEl.classList.add('hidden');
    slotsContainerEl.classList.remove('hidden');
}

// Close modal on backdrop click
modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
});

successModalEl.addEventListener('click', (e) => {
    if (e.target === successModalEl) {
        closeSuccessModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!modalEl.classList.contains('hidden')) {
            closeModal();
        }
        if (!successModalEl.classList.contains('hidden')) {
            closeSuccessModal();
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', loadSlots);
