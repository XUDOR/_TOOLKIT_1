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
      sumValue.style.backgroundColor = '#2f9e41';  // 0-65% - green
  } else if (avgVolume <= 85) {
      sumValue.style.backgroundColor = '#FFD700';  // 66-85% - gold
  } else {
      sumValue.style.backgroundColor = '#e0431e';  // 86-100% - red
  }
}

// Function to handle slider interactions
document.querySelectorAll('.chVol').forEach(function(slider) {
  // Create the slider thumb element
  const thumb = document.createElement('div');
  thumb.classList.add('slider-thumb');
  slider.appendChild(thumb);

  slider.addEventListener('mousedown', function(e) {
      const sliderHeight = slider.clientHeight;
      const sliderRect = slider.getBoundingClientRect();
      const chVolValue = slider.nextElementSibling;

      function onMouseMove(e) {
          let newTop = e.clientY - sliderRect.top;

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

      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener('mouseup', function() {
          document.removeEventListener('mousemove', onMouseMove);
      }, { once: true });
  });
});

// Toggle functionality for 'on' and 'mute' buttons
document.querySelectorAll('#mixer-on-Button, #MIXER-mute-Button').forEach(function(button) {
  button.addEventListener('click', function() {
      button.classList.toggle('active');
      if (button.classList.contains('active')) {
          button.style.backgroundColor = '#ADD8E6'; // Light Blue
          button.style.color = 'white';
      } else {
          button.style.backgroundColor = '#59584f';
          button.style.color = 'white';
      }
  });
});
