const toggleTheme = document.getElementById(
  "toggleTheme"
);

const calc = document.querySelector(".calc");

toggleTheme.addEventListener(
  "click",
  (evt) => {
    //toggle light class on calc
    if (!calc.classList.contains("light")) {
      calc.classList.add("light");
    } else {
      calc.classList.remove("light");
    }
  }
);

// Now lets implement the calculator functionality

const display =
  document.querySelector(".display");
const keyContainer = document.querySelector(
  ".key-container"
);

const operators = ["%", "/", "-", "+", "*"];
let prevValue = "";

// We have attached the event on keyContainer
// instead of button/key to leverage
// event bubbling so that we don't
// have to add event of each button.

keyContainer.addEventListener(
  "click",
  (evt) => {
    const value = evt.target.value;

    if (evt.target.tagName !== "BUTTON") {
      return;
    }
    const currentDisplayValue =
      display.textContent;

    switch (value) {
      case "c":
        display.textContent = "";
        break;

      case "+/-":
        // Toggle the +/- at beggining of number
        if (
          currentDisplayValue.charAt(0) ===
          "-"
        ) {
          display.textContent =
            currentDisplayValue.slice(1);
        } else {
          display.textContent =
            "-" + currentDisplayValue;
        }
        break;

      case "=":
        // This check is added to avoid
        // adding operator or dot twice
        if (
          [...operators, "."].includes(
            prevValue
          )
        ) {
          return;
        }

        try {
          const expression =
            currentDisplayValue.replace(
              /%/g,
              "/100*"
            );

          display.textContent =
            eval(expression);
        } catch (error) {
          display.textContent = "Error";
        }
        break;

      case "<":
        display.textContent =
          currentDisplayValue.slice(0, -1);
        break;

      default:
        if (
          operators.includes(value) &&
          operators.includes(prevValue)
        ) {
          return;
        }
        prevValue = value;
        display.textContent += value;
        break;
    }
  }
);
