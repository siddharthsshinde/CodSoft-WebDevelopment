document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
  
    document.querySelector('.buttons').addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        const btnValue = e.target.getAttribute('data-value');
        if (btnValue === '=') {
          // Calculate and display the result
          try {
            display.value = eval(display.value);
          } catch (error) {
            display.value = 'Error';
          }
        } else if (btnValue === 'AC') {
          // Clear the display
          display.value = '';
        } else if (btnValue === 'DEL') {
          // Delete the last character
          display.value = display.value.slice(0, -1);
        } else {
          // Add the button value to the display
          display.value += btnValue;
        }
      }
    });
  });
  