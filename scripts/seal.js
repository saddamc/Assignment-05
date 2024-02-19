function handleClick(event) {
    const seat = event.target.id; 
    
    if (event.target.classList.contains('seat-btn')) {
        if (event.target.classList.contains('selected')) {
            event.target.classList.remove('selected'); 
            updateSelectedSeats(seat, false); 
        } else {
           
            const selectedSeats = document.querySelectorAll('.selected');
            if (selectedSeats.length < 4) {
                event.target.classList.add('selected'); 
                updateSelectedSeats(seat, true); 
            } else {
                alert('You can select maximum 4 seats.');
            }
        }
    }
}

// Function to update selected seats and total price
function updateSelectedSeats(seat, isSelected) {
    const selectedSeats = document.querySelectorAll('.selected');
    const seatCount = selectedSeats.length;
    const pricePerSeat = 550; 
    const totalPrice = seatCount * pricePerSeat;
    const seatLeft = 40 - seatCount; 
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
        placeName.textContent = "Economy"; 
        selectedSeatsList.appendChild(placeName);

        const price = document.createElement('p');
        price.textContent = pricePerSeat;
        selectedSeatsList.appendChild(price);
    } else {
        const selectedSeat = selectedSeatsList.querySelector(`li:contains(${seat})`);
        selectedSeat.remove();
    }

  
    if (seatCount >= 2 && seatCount <= 4) {
        activateCoupon("NEW15");
    } else if (seatCount > 4) {
        activateCoupon("Coupon 20");
    } else {
        deactivateCoupon("NEW15");
        deactivateCoupon("Coupon 20");
    }
}

function activateCoupon(couponCode) {
    const couponInput = document.querySelector('.input input');
    couponInput.value = couponCode;
}

function deactivateCoupon(couponCode) {
    const couponInput = document.querySelector('.input input');
    couponInput.value = "";
}

document.getElementById('apply-coupon').addEventListener('click', function (event) {
    const couponInput = document.querySelector('.input input');
    const couponCode = couponInput.value.trim();
});

document.getElementById('apply-next').addEventListener('click', function () {
    const passengerName = document.getElementById('passenger-name').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    if (passengerName === '' || phoneNumber === '') {
        alert('Please fill in all required fields.');
    } else {
        document.querySelector('.hidden').classList.remove('hidden');
    }
});
