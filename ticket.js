document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const seats = document.querySelectorAll('.seat');
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmationDetails');
    const newBookingButton = document.getElementById('newBooking');
    const priceDisplay = document.getElementById('price');
    
    const prices = {
        howrah: { saltLake: 50, dumDum: 60, esplanade: 40, parkStreet: 45, ballygunge: 55, shyambazar: 35, kalighat: 50, garia: 70, jadavpur: 65, kasba: 55, barasat: 60, sealdah: 45, chandniChowk: 40, tollygunge: 60, baguiati: 55, rajarhat: 70, newTown: 75, kalyani: 80, dumdumPark: 50 },
        saltLake: { howrah: 50, dumDum: 45, esplanade: 60, parkStreet: 55, ballygunge: 70, shyambazar: 50, kalighat: 60, garia: 85, jadavpur: 80, kasba: 75, barasat: 40, sealdah: 65, chandniChowk: 60, tollygunge: 75, baguiati: 50, rajarhat: 35, newTown: 50, kalyani: 60, dumdumPark: 45 },
        dumDum: { howrah: 60, saltLake: 45, esplanade: 70, parkStreet: 65, ballygunge: 80, shyambazar: 40, kalighat: 70, garia: 95, jadavpur: 90, kasba: 85, barasat: 20, sealdah: 75, chandniChowk: 70, tollygunge: 85, baguiati: 35, rajarhat: 45, newTown: 55, kalyani: 70, dumdumPark: 30 },
        esplanade: { howrah: 40, saltLake: 60, dumDum: 70, parkStreet: 20, ballygunge: 30, shyambazar: 35, kalighat: 25, garia: 55, jadavpur: 50, kasba: 45, barasat: 70, sealdah: 20, chandniChowk: 15, tollygunge: 30, baguiati: 45, rajarhat: 60, newTown: 65, kalyani: 75, dumdumPark: 50 },
        parkStreet: { howrah: 45, saltLake: 55, dumDum: 65, esplanade: 20, ballygunge: 35, shyambazar: 40, kalighat: 30, garia: 60, jadavpur: 55, kasba: 50, barasat: 75, sealdah: 25, chandniChowk: 20, tollygunge: 35, baguiati: 50, rajarhat: 65, newTown: 70, kalyani: 80, dumdumPark: 55 },
        ballygunge: { howrah: 55, saltLake: 70, dumDum: 80, esplanade: 30, parkStreet: 35, shyambazar: 45, kalighat: 20, garia: 40, jadavpur: 35, kasba: 25, barasat: 85, sealdah: 30, chandniChowk: 25, tollygunge: 20, baguiati: 60, rajarhat: 75, newTown: 80, kalyani: 90, dumdumPark: 65 },
        shyambazar: { howrah: 35, saltLake: 50, dumDum: 40, esplanade: 35, parkStreet: 40, ballygunge: 45, kalighat: 50, garia: 70, jadavpur: 65, kasba: 55, barasat: 40, sealdah: 20, chandniChowk: 25, tollygunge: 60, baguiati: 55, rajarhat: 70, newTown: 75, kalyani: 85, dumdumPark: 30 },
        kalighat: { howrah: 50, saltLake: 60, dumDum: 70, esplanade: 25, parkStreet: 30, ballygunge: 20, shyambazar: 50, garia: 45, jadavpur: 40, kasba: 30, barasat: 75, sealdah: 35, chandniChowk: 30, tollygunge: 20, baguiati: 55, rajarhat: 70, newTown: 75, kalyani: 85, dumdumPark: 50 },
        garia: { howrah: 70, saltLake: 85, dumDum: 95, esplanade: 55, parkStreet: 60, ballygunge: 40, shyambazar: 70, kalighat: 45, jadavpur: 15, kasba: 25, barasat: 90, sealdah: 50, chandniChowk: 45, tollygunge: 30, baguiati: 85, rajarhat: 100, newTown: 105, kalyani: 115, dumdumPark: 95 },
        jadavpur: { howrah: 65, saltLake: 80, dumDum: 90, esplanade: 50, parkStreet: 55, ballygunge: 35, shyambazar: 65, kalighat: 40, garia: 15, kasba: 20, barasat: 85, sealdah: 45, chandniChowk: 40, tollygunge: 25, baguiati: 80, rajarhat: 95, newTown: 100, kalyani: 110, dumdumPark: 90 },
        kasba: { howrah: 55, saltLake: 75, dumDum: 85, esplanade: 45, parkStreet: 50, ballygunge: 25, shyambazar: 55, kalighat: 30, garia: 25, jadavpur: 20, barasat: 80, sealdah: 40, chandniChowk: 35, tollygunge: 20, baguiati: 75, rajarhat: 90, newTown: 95, kalyani: 105, dumdumPark: 85 },
        barasat: { howrah: 60, saltLake: 40, dumDum: 20, esplanade: 70, parkStreet: 75, ballygunge: 85, shyambazar: 40, kalighat: 75, garia: 90, jadavpur: 85, kasba: 80, sealdah: 65, chandniChowk: 60, tollygunge: 85, baguiati: 35, rajarhat: 50, newTown: 55, kalyani: 65, dumdumPark: 30 },
        sealdah: { howrah: 45, saltLake: 65, dumDum: 75, esplanade: 20, parkStreet: 25, ballygunge: 30, shyambazar: 20, kalighat: 35, garia: 50, jadavpur: 45, kasba: 40, barasat: 65, chandniChowk: 20, tollygunge: 30, baguiati: 45, rajarhat: 60, newTown: 65, kalyani: 75, dumdumPark: 50 },
        chandniChowk: { howrah: 40, saltLake: 60, dumDum: 70, esplanade: 15, parkStreet: 20, ballygunge: 25, shyambazar: 25, kalighat: 30, garia: 45, jadavpur: 40, kasba: 35, barasat: 60, sealdah: 20, tollygunge: 25, baguiati: 40, rajarhat: 55, newTown: 60, kalyani: 70, dumdumPark: 45 },
        tollygunge: { howrah: 60, saltLake: 75, dumDum: 85, esplanade: 30, parkStreet: 35, ballygunge: 20, shyambazar: 60, kalighat: 20, garia: 30, jadavpur: 25, kasba: 20, barasat: 85, sealdah: 30, chandniChowk: 25, baguiati: 75, rajarhat: 90, newTown: 95, kalyani: 105, dumdumPark: 85 },
        baguiati: { howrah: 55, saltLake: 50, dumDum: 35, esplanade: 45, parkStreet: 50, ballygunge: 60, shyambazar: 55, kalighat: 55, garia: 85, jadavpur: 80, kasba: 75, barasat: 35, sealdah: 45, chandniChowk: 40, tollygunge: 75, rajarhat: 50, newTown: 55, kalyani: 65, dumdumPark: 30 },
        rajarhat: { howrah: 70, saltLake: 35, dumDum: 45, esplanade: 60, parkStreet: 65, ballygunge: 75, shyambazar: 70, kalighat: 70, garia: 100, jadavpur: 95, kasba: 90, barasat: 50, sealdah: 60, chandniChowk: 55, tollygunge: 90, baguiati: 50, newTown: 15, kalyani: 35, dumdumPark: 45 },
        newTown: { howrah: 75, saltLake: 50, dumDum: 55, esplanade: 65, parkStreet: 70, ballygunge: 80, shyambazar: 75, kalighat: 75, garia: 105, jadavpur: 100, kasba: 95, barasat: 55, sealdah: 65, chandniChowk: 60, tollygunge: 95, baguiati: 55, rajarhat: 15, kalyani: 30, dumdumPark: 55 },
        kalyani: { howrah: 80, saltLake: 60, dumDum: 70, esplanade: 75, parkStreet: 80, ballygunge: 90, shyambazar: 85, kalighat: 85, garia: 115, jadavpur: 110, kasba: 105, barasat: 65, sealdah: 75, chandniChowk: 70, tollygunge: 105, baguiati: 65, rajarhat: 30, newTown: 30, dumdumPark: 70 },
        dumdumPark: { howrah: 50, saltLake: 45, dumDum: 30, esplanade: 50, parkStreet: 55, ballygunge: 65, shyambazar: 30, kalighat: 50, garia: 95, jadavpur: 90, kasba: 85, barasat: 30, sealdah: 50, chandniChowk: 45, tollygunge: 85, baguiati: 30, rajarhat: 45, newTown: 55, kalyani: 70 },
    };

    function calculatePrice(from, to) {
        return prices[from][to] || prices[to][from] || 0;
    }

    function updatePrice() {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const price = calculatePrice(from, to);
        priceDisplay.textContent = price;
    }

    document.getElementById('from').addEventListener('change', updatePrice);
    document.getElementById('to').addEventListener('change', updatePrice);

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
        });
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.dataset.seat);
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        const price = calculatePrice(from, to);

        confirmationDetails.textContent = `From: ${from}\nTo: ${to}\nDate: ${date}\nSeats: ${selectedSeats.join(', ')}\nPrice: ${price}`;
        confirmation.classList.remove('hidden');
        form.classList.add('hidden');
    });

    newBookingButton.addEventListener('click', () => {
        form.reset();
        document.querySelectorAll('.seat.selected').forEach(seat => seat.classList.remove('selected'));
        form.classList.remove('hidden');
        confirmation.classList.add('hidden');
        updatePrice();
    });

    // Initialize price
    updatePrice();
});
