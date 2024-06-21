$(document).ready(function () {
    const sessions = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
    const seatCount = 30;
    const maxDays = 7;
    const localStorageKey = 'cinema-bookings';

    function generateDates() {
        const dates = [];
        const today = new Date();
        for (let i = -maxDays; i <= maxDays; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    }

    function populateDateSelector() {
        const dates = generateDates();
        const $dateSelector = $('#date');
        $dateSelector.empty();
        dates.forEach(date => {
            const option = $('<option>').val(date.toISOString().split('T')[0]).text(date.toDateString());
            $dateSelector.append(option);
        });
    }

    function populateSessionSelector() {
        const $sessionSelector = $('#session');
        $sessionSelector.empty();
        sessions.forEach(session => {
            const option = $('<option>').val(session).text(session);
            $sessionSelector.append(option);
        });
    }

    function generateSeats() {
        const $seats = $('#seats');
        $seats.empty();
        for (let i = 0; i < seatCount; i++) {
            const seat = $('<div>').addClass('seat').text(i + 1);
            $seats.append(seat);
        }
    }

    function loadBookings() {
        const bookings = JSON.parse(localStorage.getItem(localStorageKey)) || {};
        return bookings;
    }

    function saveBookings(bookings) {
        localStorage.setItem(localStorageKey, JSON.stringify(bookings));
    }

    function renderSeats() {
        const selectedDate = $('#date').val();
        const selectedSession = $('#session').val();
        const bookings = loadBookings();

        const key = `${selectedDate}_${selectedSession}`;
        const bookedSeats = bookings[key] || [];

        $('#seats .seat').each(function (index) {
            const seatNumber = index + 1;
            $(this).removeClass('booked selected');
            if (bookedSeats.includes(seatNumber)) {
                $(this).addClass('booked');
            }
        });
    }

    function handleSeatClick() {
        $(document).on('click', '.seat:not(.booked)', function () {
            $(this).toggleClass('selected');
        });
    }

    function handleBooking() {
        $('#seats').on('click', '.seat:not(.booked)', function () {
            const selectedDate = $('#date').val();
            const selectedSession = $('#session').val();
            const seatNumber = $(this).text();

            const bookings = loadBookings();
            const key = `${selectedDate}_${selectedSession}`;
            if (!bookings[key]) {
                bookings[key] = [];
            }

            if ($(this).hasClass('selected')) {
                bookings[key].push(Number(seatNumber));
            } else {
                const index = bookings[key].indexOf(Number(seatNumber));
                if (index !== -1) {
                    bookings[key].splice(index, 1);
                }
            }

            saveBookings(bookings);
            renderSeats();
        });
    }

    function init() {
        populateDateSelector();
        populateSessionSelector();
        generateSeats();
        renderSeats();
        handleSeatClick();
        handleBooking();
        $('#date, #session').change(renderSeats);
    }

    init();
});
