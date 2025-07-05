

const largeDisplay = document.getElementById("large-display");
const smallDisplay = document.getElementById("small-display");

document.getElementById("small-display").textContent = "\u00A0"; // non-breaking space
document.getElementById("large-display").textContent = "\u00A0"; // non-breaking space


smallDisplay.style.color = "#626061";
function appendValue(value) {
    // Jika display masih placeholder, ganti dengan value baru
    if (smallDisplay.textContent === "\u00A0") {
        smallDisplay.textContent = value;
    } else {
        // Batasi maksimal 20 karakter untuk input
        if (smallDisplay.textContent.length < 20) {
            smallDisplay.textContent += value;
        }
    }
    
    // Adjust font size berdasarkan panjang input
    adjustSmallDisplayFontSize(smallDisplay.textContent.length);
}

function clearDisplay(){
    // Menggunakan invisible character agar ukuran tetap konsisten
    smallDisplay.textContent = "\u00A0"; // non-breaking space
    largeDisplay.textContent = "\u00A0"; // non-breaking space
    
    // Reset font size ke default untuk kedua display
    largeDisplay.style.color = "";
    largeDisplay.style.fontSize = "";
    largeDisplay.className = largeDisplay.className.replace(/text-\w+/g, '') + ' text-5xl';
    
    smallDisplay.style.fontSize = "";
    smallDisplay.className = smallDisplay.className.replace(/text-\w+/g, '') + ' text-2xl';
}

function backspace() {
    let content = smallDisplay.textContent;
    if (content.length > 1 && content !== "\u00A0") {
        smallDisplay.textContent = content.slice(0, -1);
        // Adjust font size setelah backspace
        adjustSmallDisplayFontSize(smallDisplay.textContent.length);
    } else {
        smallDisplay.textContent = "\u00A0"; // non-breaking space
        // Reset font size ke default
        smallDisplay.style.fontSize = "";
        smallDisplay.className = smallDisplay.className.replace(/text-\w+/g, '') + ' text-2xl';
    }
}

function calculate() {
     // Set color ke abu-abu sebelum evaluasi
    try {
        const result = eval(smallDisplay.textContent);
        let resultString = result.toString();
        
        // Batasi maksimal 15 digit
        if (resultString.length > 15) {
            // Jika hasil terlalu panjang, gunakan scientific notation atau potong
            if (result > 999999999999999 || result < -99999999999999) {
                resultString = result.toExponential(8); // Scientific notation dengan 8 digit presisi
            } else {
                resultString = resultString.substring(0, 15);
            }
        }
        
        // Reset color jika sebelumnya error
        largeDisplay.style.color = "#d9d9d9";
        largeDisplay.textContent = resultString;
        
        // Adjust font size berdasarkan panjang string
        adjustLargeDisplayFontSize(resultString.length);
        
    } catch {
        largeDisplay.style.color = "red";
        largeDisplay.textContent = "Error";
        // Reset font size untuk error
        largeDisplay.style.fontSize = "";
        largeDisplay.className = largeDisplay.className.replace(/text-\w+/g, '') + ' text-5xl';
    }
}

function adjustLargeDisplayFontSize(digitCount) {
    // Remove existing text size classes
    largeDisplay.className = largeDisplay.className.replace(/text-\w+/g, '');
    
    // Apply new size based on digit count
    if (digitCount <= 6) {
        largeDisplay.className += ' text-5xl'; // 3rem (default)
        largeDisplay.style.fontSize = "";
    } else if (digitCount <= 8) {
        largeDisplay.className += ' text-4xl'; // 2.25rem
        largeDisplay.style.fontSize = "";
    } else if (digitCount <= 10) {
        largeDisplay.className += ' text-3xl'; // 1.875rem
        largeDisplay.style.fontSize = "";
    } else if (digitCount <= 12) {
        largeDisplay.className += ' text-2xl'; // 1.5rem
        largeDisplay.style.fontSize = "";
    } else if (digitCount <= 15) {
        largeDisplay.className += ' text-xl'; // 1.25rem
        largeDisplay.style.fontSize = "";
    }
}

function adjustSmallDisplayFontSize(digitCount) {
    // Remove existing text size classes from small display
    smallDisplay.className = smallDisplay.className.replace(/text-\w+/g, '');
    
    // Apply new size based on digit count untuk small display
    if (digitCount <= 8) {
        smallDisplay.className += ' text-2xl'; // 1.5rem (default)
        smallDisplay.style.fontSize = "";
    } else if (digitCount <= 12) {
        smallDisplay.className += ' text-xl'; // 1.25rem
        smallDisplay.style.fontSize = "";
    } else if (digitCount <= 16) {
        smallDisplay.className += ' text-lg'; // 1.125rem
        smallDisplay.style.fontSize = "";
    } else if (digitCount <= 20) {
        smallDisplay.className += ' text-base'; // 1rem - ukuran terkecil
        smallDisplay.style.fontSize = "";
    }
}
