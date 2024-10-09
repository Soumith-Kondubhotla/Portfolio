// Initialize EmailJS with your public key
emailjs.init("I5-ckDI2CzmnEHUCO");

const lightArea = document.createElement("div");
lightArea.classList.add("light-area");
document.body.appendChild(lightArea);

lightArea.style.opacity = 0;

let mouseMoving = false;

function updateLightAreaPosition(e) {
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  lightArea.style.left = `${e.pageX - scrollX}px`;
  lightArea.style.top = `${e.pageY - scrollY}px`;

  if (!mouseMoving) {
    lightArea.style.opacity = 1;
    mouseMoving = true;
  }

  clearTimeout(lightArea.hideTimeout);
  lightArea.hideTimeout = setTimeout(() => {
    lightArea.style.opacity = 0;
    mouseMoving = false;
  }, 500);
}

document.addEventListener("mousemove", (e) => {
  updateLightAreaPosition(e);
});

window.addEventListener("scroll", (e) => {
  const fakeEvent = {
    pageX:
      window.pageXOffset +
      (lightArea.getBoundingClientRect().left + lightArea.offsetWidth / 2),
    pageY:
      window.pageYOffset +
      (lightArea.getBoundingClientRect().top + lightArea.offsetHeight / 2),
  };
  updateLightAreaPosition(fakeEvent);
});

document.addEventListener("mouseleave", () => {
  lightArea.style.opacity = 0;
  mouseMoving = false;
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the page from reloading

    // Collect form data
    const templateParams = {
      from_name: this.email.value,
      message: this.message.value,
    };

    // Send email using EmailJS
    emailjs.send("service_soumith", "template_zaxbnaf", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("SUCCESS! Your message has been sent.");
      },
      function (error) {
        console.error("FAILED...", error);
        alert(
          "FAILED! Your message could not be sent. Error: " +
            JSON.stringify(error)
        );
      }
    );

    this.reset();
  });
