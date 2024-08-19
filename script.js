//script.js

// Initialize volumes to 50% by default
document.querySelectorAll('.chVol-value, .sum-value').forEach(function(vol) {
  vol.style.height = '50%';
  vol.textContent = '50%';
});

// Function to update the sum value based on all channel volumes
function updateSumValue() {
  let total = 0;

  // Calculate the sum of all channel volumes
  document.querySelectorAll('.chVol-value').forEach(function(vol) {
      let volume = parseInt(vol.textContent.replace('%', '')) || 0;
      total += volume;
  });

  // Find the sum-value element and update it
  const sumValue = document.querySelector('.sum-value');
  const avgVolume = total / 3; // Assuming 3 channels

  sumValue.textContent = Math.round(avgVolume) + '%';
  sumValue.style.height = avgVolume + '%'; // Adjust the height to reflect volume

  // Change the background color based on the average volume
  if (avgVolume <= 65) {
      sumValue.style.backgroundColor = '#90c10a';  // 0-65% - green
      sumValue.style.color = '#184551'; 
  } else if (avgVolume <= 85) {
      sumValue.style.backgroundColor = '#FFD700';  // 66-85% - gold
      sumValue.style.color = 'red';
  } else {
      sumValue.style.backgroundColor = '#e0431e';  // 86-100% - red
      sumValue.style.color = '#021b16';
  }
}

// Function to handle slider interactions
document.querySelectorAll('.chVol').forEach(function(slider) {
    // Create the slider thumb element
    const thumb = document.createElement('div');
    thumb.classList.add('slider-thumb');
    slider.appendChild(thumb);
  
    function onMove(e) {
        const sliderHeight = slider.clientHeight;
        const sliderRect = slider.getBoundingClientRect();
        const chVolValue = slider.nextElementSibling;
  
        let clientY = e.clientY || e.touches[0].clientY;
        let newTop = clientY - sliderRect.top;
  
        // Boundaries for slider movement
        if (newTop < 0) newTop = 0;
        if (newTop > sliderHeight) newTop = sliderHeight;
  
        const valuePercentage = 100 - (newTop / sliderHeight) * 100; // Invert to make slider go top-to-bottom
        thumb.style.top = newTop + 'px';
  
        // Update chVol-value based on slider position
        chVolValue.style.height = valuePercentage + '%';
        chVolValue.textContent = Math.round(valuePercentage) + '%';
  
        // Update the sum-value based on the sum of all channel volumes
        updateSumValue();
    }
  
    slider.addEventListener('mousedown', function(e) {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMove);
        }, { once: true });
    });
  
    slider.addEventListener('touchstart', function(e) {
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', function() {
            document.removeEventListener('touchmove', onMove);
        }, { once: true });
    });
  });
  

// Toggle functionality for 'on' and 'mute' buttons
document.querySelectorAll('#mixer-on-Button, #MIXER-mute-Button').forEach(function(button) {
    button.addEventListener('click', function() {
        button.classList.toggle('active');
        if (button.classList.contains('active')) {
            if (button.id === 'MIXER-mute-Button') {
                button.style.backgroundColor = '#e0431e'; // Red
                button.style.color = '#021b16'; // Text color
            } else {
                button.style.backgroundColor = '#ADD8E6'; // Light Blue for other buttons
                button.style.color = '#021b16';
            }
        } else {
            button.style.backgroundColor = '#59584f';
            button.style.color = 'white';
        }
    });
  });
  