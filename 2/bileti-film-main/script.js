document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const sessionsList = document.getElementById('sessions-list');
    const seatsMap = document.getElementById('seats-map');
    
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];

    dateInput.addEventListener('change', function() {
        updateSessions();
        updateSeats();
    });

    function updateSessions() {
        sessionsList.innerHTML = '';
        const date = new Date(dateInput.value);
        if (date) {
            for (let i = 10; i <= 20; i += 2) {
                const sessionButton = document.createElement('button');
                sessionButton.textContent = `${i}:00`;
                sessionButton.onclick = () => selectSession(i);
                sessionsList.appendChild(sessionButton);
            }
        }
    }

    function updateSeats() {
        seatsMap.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.onclick = () => toggleSeat(seat);
            seatsMap.appendChild(seat);
        }
    }

    function selectSession(time) {
        // Здесь можно добавить логику для работы с сессиями
        console.log(`Сеанс выбран: ${time}:00`);
    }

    function toggleSeat(seat) {
        if (!seat.classList.contains('booked')) {
            seat.classList.toggle('selected');
        }
    }

    // Инициализация
    updateSessions();
    updateSeats();
});
