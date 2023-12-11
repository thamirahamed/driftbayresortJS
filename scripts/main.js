//Mobile Ham Burger Menu

const headerBtn = document.querySelector('.header__bars');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavTwo = document.querySelector('.mobile-nav2');
      
// State
let isMobileNavOpen = false;

headerBtn.addEventListener('click', () => {
    isMobileNavOpen = !isMobileNavOpen;
    if (isMobileNavOpen) {
        mobileNav.style.display = 'flex';
    } else{
        mobileNav.style.display = 'none';
    }
});
      
// State
let isMobileNavTwoOpen = false;

headerBtn.addEventListener('click', () => {
    isMobileNavTwoOpen = !isMobileNavTwoOpen;
    if (isMobileNavTwoOpen) {
        mobileNavTwo.style.display = 'flex';
    } else{
        mobileNavTwo.style.display = 'none';
    }
});

// Get references to the input elements
const bookingForm = document.getElementById('booking__form');
const fNameInput = document.getElementById('fName');
const lNameInput = document.getElementById('lName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const singleRoomInput = document.getElementById('single');
const doubleRoomInput = document.getElementById('double');
const tripleRoomInput = document.getElementById('triple');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const kidsMealsInput = document.getElementById('meals');
const wifiCheckbox = document.getElementById('wifi');
const extraBedCheckbox = document.getElementById('extraBed');
const poolCheckBox = document.getElementById('poolView');
const promoInput = document.getElementById('promoCode');
const promoTick = document.getElementById('promoTick');
const advTypeRadio = document.getElementById('radio');
const localAdultsInput = document.getElementById('localAdults');
const localChildrenInput = document.getElementById('localChildren');
const foreignAdultsInput = document.getElementById('foreignAdults');
const foreignChildrenInput = document.getElementById('foreignChildren');
const adultGuideCheckbox = document.getElementById('adultGuide');
const kidsGuideCheckbox = document.getElementById('kidsGuide');
const loyaltyElement = document.getElementById('points');
const advPriceElement = document.getElementById('advPrice');
const totalPriceElement = document.getElementById('totalPrice');
const loyaltyBubble = document.getElementById('loyaltyPoints');
const advPriceBubble = document.getElementById('advPriceBubble');
const totalPriceBubble = document.getElementById('bookingPriceBubble');
const roomFavoritesBtn = document.getElementById('roomFavorites');
const advFavoritesBtn = document.getElementById('advFavorites');
const loyaltyBtn = document.getElementById('checkLoyalty');
const bookRoomsBtn = document.getElementById('bookRooms');
const advBookBtn = document.getElementById('bookAdv');
const overallTable = document.getElementById('overallTable');
const overallAdvTable = document.getElementById('advOverallTable');
const popupMenu = document.getElementById('popupBox');
const blurOverlay = document.getElementById('blur');
const confirmBtn = document.getElementById('confirmBtn');
const popupAdvMenu = document.getElementById('popupBoxAdv');
const advConfirmMsg = document.getElementById('advConfirmMsg')
const confirmAdvBtn = document.getElementById('confirmBtnAdv');
const totalOverallPriceElement = document.getElementById('totalOverallPrice');
const today = new Date().toISOString().split('T')[0]; // Get current date in yyyy-mm-dd format

// Set minimum date for check-in and check-out inputs
checkInInput.min = today; // Minimum date is today\

//Adding Event Listeners for all input fields
fNameInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
lNameInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
emailInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
phoneInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
cityInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
countryInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
checkInInput.addEventListener('change', () => {
    updateStayDuration();
    updateTotalPrice();
    resetValidation();
    setMinCheckOutDate(); 

    if (checkOutInput.value < this.value) {
        checkOutInput.value = this.value; // Reset check-out date if it's earlier than check-in date
    }
});
checkOutInput.addEventListener('change', () => {
    updateStayDuration();
    updateTotalPrice();
    resetValidation();
    if (this.value < checkInInput.value) {
        checkOutInput.value = checkInInput.value; // Reset check-out date if it's earlier than check-in date
    }
});
singleRoomInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
doubleRoomInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
tripleRoomInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
adultsInput.addEventListener('input', () => {
    updateTotalPrice();
    resetValidation();
});
childrenInput.addEventListener('input', updateTotalPrice);
kidsMealsInput.addEventListener('input', updateTotalPrice);
extraBedCheckbox.addEventListener('change', updateTotalPrice);
promoInput.addEventListener('input', updateTotalPrice);
localAdultsInput.addEventListener('input', () => {
    updateAdventurePrice();
    resetValidation();
});
localChildrenInput.addEventListener('input', () => {
    updateAdventurePrice();
    resetValidation();
});
foreignAdultsInput.addEventListener('input', () => {
    updateAdventurePrice();
    resetValidation();
});
foreignChildrenInput.addEventListener('input', () => {
    updateAdventurePrice();
    resetValidation();
});
adultGuideCheckbox.addEventListener('change', updateAdventurePrice);
kidsGuideCheckbox.addEventListener('change', updateAdventurePrice);
roomFavoritesBtn.addEventListener('click', () => {
    if(validateBookingForm()){
        saveRoomBookingToFavorites();
    }
});
advFavoritesBtn.addEventListener('click', () => {
    if(validateAdvForm()){
        saveAdventureBookingToFavorites();
    }
});
loyaltyBtn.addEventListener('click', displayLoyaltyPoints);
bookRoomsBtn.addEventListener('click', () => {
    if(validateBookingForm()){
        showBookingPopup();
    }
});
confirmBtn.addEventListener('click', () => {
    updateOverallBooking();
    updateLoyaltyPoints();
    resetCurrentBooking();
    hideBookingPopup();
    calculateTotalPrices();
});
advBookBtn.addEventListener('click', () => {
    if(validateAdvForm()){
        showAdvPopup();
    }
});
confirmAdvBtn.addEventListener('click', () => {
    updateAdvOverallBooking();
    resetCurrentBooking();
    hideAdvPopup();
    calculateTotalPrices();
});

// Function to reset the loyalty points in local storage on page reload
window.addEventListener('load', function() {
    localStorage.setItem('loyaltyPoints', '0');
});

// Function to set minimum check-out date based on check-in date
function setMinCheckOutDate() {
    const selectedDate = new Date(checkInInput.value);
    selectedDate.setDate(selectedDate.getDate() + 1); // Add one day to the selected check-in date
    const minCheckOutDate = selectedDate.toISOString().split('T')[0];
    checkOutInput.min = minCheckOutDate;
}

//Function to find duration of stay
function updateStayDuration() {
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);
  
    // Calculate the time difference in milliseconds
    const timeDifference = checkOutDate - checkInDate;
  
    // Convert time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
}

// Function to update the total booking price
function updateTotalPrice() {

    //Room Prices
    let sPrice = 25000;
    let dPrice = 35000;
    let tPrice = 40000;
    let eBeds = 8000;
    let kMeals = 5000;

    //fetch input values
    let totalPrice = 0;
    const singleRoom = singleRoomInput.value;
    const doubleRoom = doubleRoomInput.value;
    const tripleRoom = tripleRoomInput.value;
    const kidsMeals = kidsMealsInput.value;
    var daysDifference = updateStayDuration();

    // Check if daysDifference is a valid number and Calculating totalPrice
    if (!isNaN(daysDifference) && daysDifference > 0) {
        if (parseInt(singleRoom) > 0) {
            totalPrice += singleRoom * sPrice;
        }
    
        if (parseInt(doubleRoom) > 0) {
            totalPrice += doubleRoom * dPrice;
        }
    
        if (parseInt(tripleRoom) > 0) {
            totalPrice += tripleRoom * tPrice;
        }
    
        if (extraBedCheckbox.checked) {
            totalPrice += eBeds;
        }
    
        if (parseInt(kidsMeals) > 0) {
            totalPrice += kMeals * kidsMeals;
        }

        totalPrice = totalPrice * daysDifference;

        // Check if the entered promo code is "Promo123"
        if (promoInput.value.trim() === "Promo123") {
            // Apply a 5% discount
            let discountAmount = 0;
            discountAmount = totalPrice * 0.05;
            totalPrice -= discountAmount;

            // Display a tick for successful promo code entry
            promoTick.style.filter = 'grayscale(0) opacity(1)';
            promoTick.style.transform = 'scale(1.1)';
        } else {
            promoTick.style.filter = 'grayscale(1) opacity(0.5)';
            promoTick.style.transform = 'scale(1)';
        }

        
        //Display Price Bubble only after relevants inputs are filled
        if (totalPrice > 0 && !isNaN(totalPrice)) {
            totalPriceBubble.style.display = 'block';
        } else {
            totalPriceBubble.style.display = 'none';
        }

        //Display total price in the bubble
        totalPriceElement.innerHTML = `<u>LKR</u> ${totalPrice}.00`;
    
    } else { //Any error caused will display this message in the bubble
        totalPriceElement.innerHTML = "Invalid / Missing Input(s)";
    } 
    return totalPrice;
} 

//Function to update total adventure price
function updateAdventurePrice() {

    //Base Price
    let lAdults = 5000;
    let lKids = 2000;
    let fAdults = 10000;
    let fKids = 5000;
    let gAdults = 1000;
    let gKids = 500;

    //Fetch input values
    let advPrice = 0;
    const localAdults = localAdultsInput.value;
    const localKids = localChildrenInput.value;
    const foreignAdults = foreignAdultsInput.value;
    const foreignKids = foreignChildrenInput.value;

    //Calculating total advPrice
    if (parseInt(localAdults) > 0) {
        advPrice += localAdults * lAdults;
    } 

    if (parseInt(localKids) > 0) {
        advPrice += localKids * lKids;
    }

    if (parseInt(foreignAdults) > 0) {
        advPrice += foreignAdults * fAdults;
    }

    if (parseInt(foreignKids) > 0) {
        advPrice += foreignKids * fKids;
    }

    if (adultGuideCheckbox.checked) {
        advPrice += gAdults;
    }

    if (kidsGuideCheckbox.checked) {
        advPrice += gKids;
    }

    if (advPrice > 0 && !isNaN(advPrice)) {
        advPriceBubble.style.display = 'block';
    } else {
        advPriceBubble.style.display = 'none';
    }

    //Displaying total advPrice in the bubble
    advPriceElement.innerHTML = `<u>LKR</u> ${advPrice}.00`
}

//Function to update overall booking table
function updateOverallBooking() {

    // Refernce table body
    const tableBody = document.getElementById('overallTableBody');

    // Gather all the necessary details for the overall booking
    const overallBookingDetails = {
      name: `${fNameInput.value} ${lNameInput.value}`,
      checkInDate: checkInInput.value,
      checkOutDate: checkOutInput.value,
      singleRooms: singleRoomInput.value || 0,
      doubleRooms: doubleRoomInput.value || 0,
      tripleRooms: tripleRoomInput.value || 0,
      adultsChildren: `${adultsInput.value} / ${childrenInput.value || 0}`,
      wifi: wifiCheckbox.checked ? 'Yes' : 'No',
      extraBed: extraBedCheckbox.checked ? 'Yes' : 'No',
      poolView: poolCheckBox.checked ? 'Yes' : 'No',
      totalCost: totalPriceElement.innerText, 
    };

    // Define labels for each detail
    const labels = {
        name: 'Name',
        checkInDate: 'Check-in Date',
        checkOutDate: 'Check-Out Date',
        singleRooms: 'Single Rooms',
        doubleRooms: 'Double Rooms',
        tripleRooms: 'Triple Rooms',
        adultsChildren: 'No. of Adults / Children',
        wifi: 'WiFi',
        extraBed: 'Extra Bed',
        poolView: 'Pool View',
        totalCost: 'Total Cost',
    };
  
    // Update the overall booking display 
    const newRow = tableBody.insertRow(-1); // Insert a new row at the end of the table
    for (const detail in overallBookingDetails) {
        const newCell = newRow.insertCell();
        newCell.textContent = `${overallBookingDetails[detail]}`;
        newCell.setAttribute('data-label', labels[detail]);
    }
}

// Function to reset current booking and cost
function resetCurrentBooking() {

    // Reset all the input fields and cost displays for the current booking
    document.getElementById('booking__form').reset();
  
    // Reset the display for total price and adventure price bubbles
    totalPriceBubble.style.display = 'none';
    advPriceBubble.style.display = 'none';
    promoTick.style.filter = 'grayscale(1) opacity(0.5)';
    promoTick.style.transform = 'scale(1.1)';
  
    // Reset the inner HTML of the total price and adventure price elements to '0.00'
    totalPriceElement.innerHTML = `<u>LKR</u> 0.00`;
    advPriceElement.innerHTML = `<u>LKR</u> 0.00`;
}

// Function to update overall adventure table
function updateAdvOverallBooking() {

    // Refernce table body
    const advTableBody = document.getElementById('advTableBody');

    // Fetch the selected adventure type
    const advTypeInputs = document.getElementsByName('advType');
    let selectedAdvType = '';
    for (const advTypeInput of advTypeInputs) {
        if (advTypeInput.checked) {
            selectedAdvType = advTypeInput.value;
            break;
        }
    }

    // Gather all the necessary details for the overall booking
    const overallAdvDetails = {
        name: `${fNameInput.value} ${lNameInput.value}`,
        advType: selectedAdvType,
        localAdults : localAdultsInput.value || 0,
        localKids: localChildrenInput.value || 0,
        foreignAdults: foreignAdultsInput.value || 0,
        foreignKids: foreignChildrenInput.value || 0,
        adultsGuide: adultGuideCheckbox.checked ? 'Yes' : 'No',
        kidsGuide: kidsGuideCheckbox.checked ? 'Yes' : 'No',
        totalCost: advPriceElement.innerText,
    }

    // Define labels for each detail
    const labels = {
        name: 'Name',
        advType: 'Adventure Type',
        localAdults: 'No. of Local Adults',
        localKids: 'No. of Local Children',
        foreignAdults: 'No. of Foreign Adults',
        foreignKids: 'No. of Foreign Children',
        adultsGuide: 'Adults Guide',
        kidsGuide: 'Kids Guide',
        totalCost: 'Total Cost',
    };

    // Update the overall booking display 
    const newRow = advTableBody.insertRow(-1); // Insert a new row at the end of the table
    for (const detail in overallAdvDetails) {
        const newCell = newRow.insertCell();
        newCell.textContent = `${overallAdvDetails[detail]}`;
        newCell.setAttribute('data-label', labels[detail]);
    }
}

// Function to show booking confirmation popup
function showBookingPopup() {
    popupMenu.style.display = 'flex';
    blurOverlay.style.display = 'flex';
}

// Function to show adventure confirmation popup
function showAdvPopup() {
    // Fetch the selected adventure type
    const advTypeInputs = document.getElementsByName('advType');
    let selectedAdvType = '';
    for (const advTypeInput of advTypeInputs) {
        if (advTypeInput.checked) {
            selectedAdvType = advTypeInput.value;
            break;
        }
    }

    popupAdvMenu.style.display = 'flex';
    blurOverlay.style.display = 'flex';
    advConfirmMsg.innerText = `You have placed a booking for ${selectedAdvType}`;

}

// Function to hide booking confirmation popup
function hideBookingPopup() {
    popupMenu.style.display = 'none';
    blurOverlay.style.display = 'none';
    overallTable.scrollIntoView({ behavior: 'smooth', block: 'center' });    
}

// Function to hide adventure confirmation popup
function hideAdvPopup() {
    popupAdvMenu.style.display = 'none';
    blurOverlay.style.display = 'none';
    overallAdvTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Function to update loyalty points
function updateLoyaltyPoints() {
    // Fetch the table row containing the last room details
    const roomRows = document.querySelectorAll('#overallTable tbody tr');
    const lastRoomRow = roomRows[roomRows.length - 1];

    // Calculate the total number of rooms from the last row of the table
    const singleRooms = parseInt(lastRoomRow.cells[3].textContent);
    const doubleRooms = parseInt(lastRoomRow.cells[4].textContent);
    const tripleRooms = parseInt(lastRoomRow.cells[5].textContent);

    const totalRooms = singleRooms + doubleRooms + tripleRooms;

    // Fetch existing loyalty points from local storage
    let existingLoyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints')) || 0;

    // Check if the total number of rooms is greater than 3
    let loyaltyPointsEarned;
    if (totalRooms > 3) {
        // Award 20 loyalty points per room
        loyaltyPointsEarned = totalRooms * 20;
        loyaltyPointsEarned += existingLoyaltyPoints;

        // Store loyalty points in local storage
        localStorage.setItem('loyaltyPoints', loyaltyPointsEarned);
    }
}

// Function to display loyalty points from local storage
function displayLoyaltyPoints () {
    let loyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints')) || 0;

    // Display loyalty points to the user
    loyaltyElement.textContent = loyaltyPoints;
    loyaltyBubble.style.display = 'block';
}
  
// Function to validate Booking Form
function validateBookingForm() {
    // Reference all relevant input boxes
    const fName = document.getElementById('fNameValidate');
    const lName = document.getElementById('lNameValidate');
    const email = document.getElementById('emailValidate');
    const phone = document.getElementById('phoneValidate');
    const city = document.getElementById('cityValidate');
    const country = document.getElementById('countryValidate');
    const checkIn = document.getElementById('checkInValidate');
    const checkOut = document.getElementById('checkOutValidate');
    const single = document.getElementById('singleValidate');
    const double = document.getElementById('doubleValidate');
    const triple = document.getElementById('tripleValidate');
    const adults = document.getElementById('adultValidate');

    // Reference all relevant alerts
    const fNameAlert = document.getElementById('fNameAlert');
    const lNameAlert = document.getElementById('lNameAlert');
    const emailAlert = document.getElementById('emailAlert');
    const phoneAlert = document.getElementById('phoneAlert');
    const cityAlert = document.getElementById('cityAlert');
    const countryAlert = document.getElementById('countryAlert');
    const checkInAlert = document.getElementById('checkInAlert');
    const checkOutAlert = document.getElementById('checkOutAlert');
    const adultsAlert = document.getElementById('adultAlert');

    // Validate number of rooms
    const singleRooms = parseInt(singleRoomInput.value);
    const doubleRooms = parseInt(doubleRoomInput.value);
    const tripleRooms = parseInt(tripleRoomInput.value);

    let isValid = true;

    // Validate each input field
    if (adultsInput.value.trim() === '') {
        adults.style.background = 'red';
        adultsAlert.style.display = 'inline';
        adultsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    if (!(singleRooms > 0 || doubleRooms > 0 || tripleRooms > 0)) {
        alert('Please enter at least one room in Single, Double, or Triple Rooms.');
        single.style.background = 'red';
        singleRoomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        double.style.background = 'red';
        doubleRoomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        triple.style.background = 'red';
        tripleRoomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (checkOutInput.value.trim() === '') {
        checkOut.style.background = 'red';
        checkOutAlert.style.display = 'inline';
        checkOutInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (checkInInput.value.trim() === '') {
        checkIn.style.background = 'red';
        checkInAlert.style.display = 'inline';
        checkInInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (countryInput.value.trim() === '') {
        country.style.background = 'red';
        countryAlert.style.display = 'inline';
        countryInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (cityInput.value.trim() === '') {
        city.style.background = 'red';
        cityAlert.style.display = 'inline';
        cityInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    if (phoneInput.value.trim() === '') {
        phone.style.background = 'red';
        phoneAlert.style.display = 'inline';
        phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
        email.style.background = 'red';
        emailAlert.style.display = 'inline';
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        email.style.background = 'red';
        emailAlert.style.display = 'inline';
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (lNameInput.value.trim() === '') {
        lName.style.background = 'red';
        lNameAlert.style.display = 'inline';
        lNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (fNameInput.value.trim() === '') {
        fName.style.background = 'red';
        fNameAlert.style.display = 'inline';
        fNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    // Return the validation result
    return isValid;
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate Adventure Booking
function validateAdvForm() {
    // Reference all relevant input boxes
    const fName = document.getElementById('fNameValidate');
    const lName = document.getElementById('lNameValidate');
    const email = document.getElementById('emailValidate');
    const phone = document.getElementById('phoneValidate');
    const city = document.getElementById('cityValidate');
    const country = document.getElementById('countryValidate');
    const lAdults = document.getElementById('lAdultsValidate');
    const lKids = document.getElementById('lKidsValidate');
    const fAdults = document.getElementById('fAdultsValidate');
    const fKids = document.getElementById('fKidsValidate');
    

    // Reference all relevant alerts
    const fNameAlert = document.getElementById('fNameAlert');
    const lNameAlert = document.getElementById('lNameAlert');
    const emailAlert = document.getElementById('emailAlert');
    const phoneAlert = document.getElementById('phoneAlert');
    const cityAlert = document.getElementById('cityAlert');
    const countryAlert = document.getElementById('countryAlert');

    // Validate number of adults and kids
    const localAdults = parseInt(localAdultsInput.value);
    const localKids = parseInt(localChildrenInput.value);
    const foreignAdults = parseInt(foreignAdultsInput.value);
    const foreignKids = parseInt(foreignChildrenInput.value);

    // Validate adventure type selection
    const advTypeInputs = document.getElementsByName('advType');
    let isAdvTypeSelected = false;
    for (const advTypeInput of advTypeInputs) {
        if (advTypeInput.checked) {
            isAdvTypeSelected = true;
            break;
        }
    }

    let isValid = true;

    // Validate each input field
    if (!(localAdults > 0 || localKids > 0 || foreignAdults > 0 || foreignKids > 0)) {
        alert('Please enter at least one person in Local Adults, Local Children, Foreign Adults, Foreign Kids');
        lAdults.style.background = 'red';
        localAdultsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        lKids.style.background = 'red';
        localChildrenInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fAdults.style.background = 'red';
        foreignAdultsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fKids.style.background = 'red';
        foreignChildrenInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    if (!isAdvTypeSelected) {
        alert('Please select an adventure type.');
        advTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (countryInput.value.trim() === '') {
        country.style.background = 'red';
        countryAlert.style.display = 'inline';
        countryInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (cityInput.value.trim() === '') {
        city.style.background = 'red';
        cityAlert.style.display = 'inline';
        cityInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    if (phoneInput.value.trim() === '') {
        phone.style.background = 'red';
        phoneAlert.style.display = 'inline';
        phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
        email.style.background = 'red';
        emailAlert.style.display = 'inline';
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        email.style.background = 'red';
        emailAlert.style.display = 'inline';
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (lNameInput.value.trim() === '') {
        lName.style.background = 'red';
        lNameAlert.style.display = 'inline';
        lNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }
    
    if (fNameInput.value.trim() === '') {
        fName.style.background = 'red';
        fNameAlert.style.display = 'inline';
        fNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        isValid = false;
    }

    // Return the validation result
    return isValid;
}

// Function to reset Validation upon Input
function resetValidation() {
    // Reference all relevant input boxes
    const fName = document.getElementById('fNameValidate');
    const lName = document.getElementById('lNameValidate');
    const email = document.getElementById('emailValidate');
    const phone = document.getElementById('phoneValidate');
    const city = document.getElementById('cityValidate');
    const country = document.getElementById('countryValidate');
    const checkIn = document.getElementById('checkInValidate');
    const checkOut = document.getElementById('checkOutValidate');
    const single = document.getElementById('singleValidate');
    const double = document.getElementById('doubleValidate');
    const triple = document.getElementById('tripleValidate');
    const adults = document.getElementById('adultValidate');
    const lAdults = document.getElementById('lAdultsValidate');
    const lKids = document.getElementById('lKidsValidate');
    const fAdults = document.getElementById('fAdultsValidate');
    const fKids = document.getElementById('fKidsValidate');
    
    // Reference all relevant alerts
    const fNameAlert = document.getElementById('fNameAlert');
    const lNameAlert = document.getElementById('lNameAlert');
    const emailAlert = document.getElementById('emailAlert');
    const phoneAlert = document.getElementById('phoneAlert');
    const cityAlert = document.getElementById('cityAlert');
    const countryAlert = document.getElementById('countryAlert');
    const checkInAlert = document.getElementById('checkInAlert');
    const checkOutAlert = document.getElementById('checkOutAlert');
    const adultsAlert = document.getElementById('adultAlert');

    // Validate number of rooms
    const singleRooms = parseInt(singleRoomInput.value);
    const doubleRooms = parseInt(doubleRoomInput.value);
    const tripleRooms = parseInt(tripleRoomInput.value);

    // Validate number of adults and kids
    const localAdults = parseInt(localAdultsInput.value);
    const localKids = parseInt(localChildrenInput.value);
    const foreignAdults = parseInt(foreignAdultsInput.value);
    const foreignKids = parseInt(foreignChildrenInput.value);


    // Validate each input field
    if (localAdults > 0 || localKids > 0 || foreignAdults > 0 || foreignKids > 0) {
        lAdults.style.background = 'var(--clr-blue900)';
        lKids.style.background = 'var(--clr-blue900)';
        fAdults.style.background = 'var(--clr-blue900)';
        fKids.style.background = 'var(--clr-blue900)';
    }

    if (!(adultsInput.value.trim() === '')) {
        adults.style.background = 'var(--clr-blue900)';
        adultsAlert.style.display = 'none';
    }

    if (singleRooms > 0 || doubleRooms > 0 || tripleRooms > 0) {
        single.style.background = 'var(--clr-blue900)';
        double.style.background = 'var(--clr-blue900)';
        triple.style.background = 'var(--clr-blue900)';
    }
    
    if (!(checkOutInput.value.trim() === '')) {
        checkOut.style.background = 'var(--clr-blue900)';
        checkOutAlert.style.display = 'none';
    }
    
    if (!(checkInInput.value.trim() === '')) {
        checkIn.style.background = 'var(--clr-blue900)';
        checkInAlert.style.display = 'none';
    }
    
    if (!(countryInput.value.trim() === '')) {
        country.style.background = 'var(--clr-blue900)';
        countryAlert.style.display = 'none';
    }
    
    if (!(cityInput.value.trim() === '')) {
        city.style.background = 'var(--clr-blue900)';
        cityAlert.style.display = 'none';
    }

    if (!(phoneInput.value.trim() === '')) {
        phone.style.background = 'var(--clr-blue900)';
        phoneAlert.style.display = 'none';
    }
    
    if (validateEmail(emailInput.value.trim())) {
        email.style.background = 'var(--clr-blue900)';
        emailAlert.style.display = 'none';
    } 
    
    if (!(lNameInput.value.trim() === '')) {
        lName.style.background = 'var(--clr-blue900)';
        lNameAlert.style.display = 'none';
    }
    
    if (!(fNameInput.value.trim() === '')) {
        fName.style.background = 'var(--clr-blue900)';
        fNameAlert.style.display = 'none';
    }
}

// Function to save room booking details with all input field data to local storage
function saveRoomBookingToFavorites() {
    const roomBookingDetails = {
            checkInDate: checkInInput.value,
            checkOutDate: checkOutInput.value,
            singleRooms: singleRoomInput.value || 0,
            doubleRooms: doubleRoomInput.value || 0,
            tripleRooms: tripleRoomInput.value || 0,
            adults: adultsInput.value || 0,
            children: childrenInput.value || 0,
            meals: kidsMealsInput.value || 0,
            wifi: wifiCheckbox.checked ? 'Yes' : 'No',
            extraBed: extraBedCheckbox.checked ? 'Yes' : 'No',
            poolView: poolCheckBox.checked ? 'Yes' : 'No',
            promoCode: promoInput.value,
        }
    
    alert("Your choices have been favorited!");
    localStorage.setItem('favoriteRoomBooking', JSON.stringify(roomBookingDetails));
}

// Function to save adventure booking details to local storage
function saveAdventureBookingToFavorites() {
    // Fetch the selected adventure type
    const advTypeInputs = document.getElementsByName('advType');
    let selectedAdvType = '';
    for (const advTypeInput of advTypeInputs) {
        if (advTypeInput.checked) {
            selectedAdvType = advTypeInput.value;
            break;
        }
    }

    const adventureBookingDetails = {
        adventureType: selectedAdvType,
        localAdults: localAdultsInput.value || 0,
        localChildren: localChildrenInput.value || 0,
        foreignAdults: foreignAdultsInput.value || 0,
        foreignChildren: foreignChildrenInput.value || 0,
        adultGuide: adultGuideCheckbox.checked ? 'Yes' : 'No',
        kidsGuide: kidsGuideCheckbox.checked ? 'Yes' : 'No',
    };

    alert("Your choices for adventure have been favorited!");
    localStorage.setItem('favoriteAdventureBooking', JSON.stringify(adventureBookingDetails));
}

// Function to calculate the total prices from both tables
function calculateTotalPrices() {
    // Get all rows from overallTable and advOverallTable
    const overallRows = document.querySelectorAll('#overallTable tbody tr');
    const advOverallRows = document.querySelectorAll('#advOverallTable tbody tr');

    let totalRoomPrice = 0;
    let totalAdvPrice = 0;

    // Calculate total price from overallTable
    overallRows.forEach(row => {
        const totalCostCell = row.querySelector('[data-label="Total Cost"]');
        const totalPriceText = totalCostCell.textContent.trim().replace('LKR', '').trim();
        const totalPrice = parseFloat(totalPriceText.replace(',', '')); // Remove commas and convert to float
        if (!isNaN(totalPrice)) {
            totalRoomPrice += totalPrice;
        }
    });

    // Calculate total price from advOverallTable
    advOverallRows.forEach(row => {
        const totalCostCell = row.querySelector('[data-label="Total Cost"]');
        const totalPriceText = totalCostCell.textContent.trim().replace('LKR', '').trim();
        const totalPrice = parseFloat(totalPriceText.replace(',', '')); // Remove commas and convert to float
        if (!isNaN(totalPrice)) {
            totalAdvPrice += totalPrice;
        }
    });

    // Calculate total of both prices
    const totalBothPrices = totalRoomPrice + totalAdvPrice;
    totalOverallPriceElement.textContent = `LKR ${totalBothPrices}.00`
}



