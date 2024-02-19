// Function to handle seat selection
function handleClick(event) {
    const seat = event.target.id; // Get the ID of the clicked seat
    // Check if the seat is already selected or not
    if (event.target.classList.contains('seat-btn')) {
        if (event.target.classList.contains('selected')) {
            event.target.classList.remove('selected'); // Deselect the seat
            updateSelectedSeats(seat, false); // Update selected seat count and total price
        } else {
            // Check if maximum seats limit reached
            const selectedSeats = document.querySelectorAll('.selected');
            if (selectedSeats.length < 4) {
                event.target.classList.add('selected'); // Select the seat
                updateSelectedSeats(seat, true); // Update selected seat count and total price
            } else {
                // Display a message indicating that maximum seats limit reached
                alert('You can select maximum 4 seats.');
            }
        }
    }
}

// Function to update selected seats and total price
function updateSelectedSeats(seat, isSelected) {
    const selectedSeats = document.querySelectorAll('.selected');
    const seatCount = selectedSeats.length;
    const pricePerSeat = 550; // Price per seat
    const totalPrice = seatCount * pricePerSeat;
    const seatLeft = 40 - seatCount; // Update available seat count
    document.getElementById('seat-count').textContent = seatCount;
    document.getElementById('total-price').textContent = totalPrice;
    document.getElementById('grand-total-price').textContent = totalPrice;
    document.getElementById('seat-left').textContent = seatLeft;
    
    // Update selected seat list with place name and price
    const selectedSeatsList = document.getElementById('selected-place-container');
    if (isSelected) {
        const li = document.createElement('li');
        li.textContent = seat;
        selectedSeatsList.appendChild(li);

        const placeName = document.createElement('p');
        placeName.textContent = "Economy"; // Update with the actual place name
        selectedSeatsList.appendChild(placeName);

        const price = document.createElement('p');
        price.textContent = pricePerSeat;
        selectedSeatsList.appendChild(price);
    } else {
        const selectedSeat = selectedSeatsList.querySelector(`li:contains(${seat})`);
        selectedSeat.remove();
    }

    // Activate coupon codes under certain conditions
    if (seatCount >= 2 && seatCount <= 4) {
        activateCoupon("NEW15");
    } else if (seatCount > 4) {
        activateCoupon("Coupon 20");
    } else {
        // Deactivate coupon codes if conditions are not met
        deactivateCoupon("NEW15");
        deactivateCoupon("Coupon 20");
    }
}

// Function to activate a coupon
function activateCoupon(couponCode) {
    // Activate coupon code logic here
    // For example: Update UI to indicate that the coupon is active
    const couponInput = document.querySelector('.input input');
    couponInput.value = couponCode;
}

// Function to deactivate a coupon
function deactivateCoupon(couponCode) {
    // Deactivate coupon code logic here
    // For example: Reset coupon input field or update UI to indicate that the coupon is inactive
    const couponInput = document.querySelector('.input input');
    couponInput.value = "";
}

// Function to apply coupon
document.getElementById('apply-coupon').addEventListener('click', function (event) {
    const couponInput = document.querySelector('.input input');
    const couponCode = couponInput.value.trim();
    // Apply coupon logic here
    // For example: Check if the entered coupon code is valid and update the total price accordingly
});

// Function to advance to the next step
document.getElementById('apply-next').addEventListener('click', function () {
    const passengerName = document.getElementById('passenger-name').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    // Validate user input
    if (passengerName === '' || phoneNumber === '') {
        // Display an error message or prevent advancing if required fields are not filled
        alert('Please fill in all required fields.');
    } else {
        // Advance to the next step, e.g., show success section
        document.querySelector('.hidden').classList.remove('hidden');
        // You might want to submit form data or perform further actions here
    }
});
