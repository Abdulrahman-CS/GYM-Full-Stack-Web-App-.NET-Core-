// reverse-string helper
function stringReverse(s) {
  return s.split("").reverse().join("");
}

// get the reversed pieces
const userName = stringReverse("321homimheD"); // reversed "Dehmimoh123"
const emServer = stringReverse("moc.liamg"); // reversed "gmail.com"

// once DOM is ready, call showEM into our placeholder
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("email-placeholder");
  const container = document.createElement("span");

  // temporarily override document.write to capture output
  const originalWrite = document.write;
  document.write = (html) => (container.innerHTML += html);

  // generate the link
  showEM(userName, emServer);

  // restore document.write
  document.write = originalWrite;

  // replace placeholder with the real link
  placeholder.replaceWith(container);
});

function showEM(userName, emServer) {
  var emLink = userName + "@" + emServer;
  document.write("<a href='mailto:" + emLink + "'>");
  document.write(emLink);
  document.write("</a>");
}

// form.js
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields before sending.");
    return false;
  }
  // rudimentary email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // you could disable the button here to prevent double‑submits:
  document.querySelector('#contactForm button[type="submit"]').disabled = true;

  return true; // allow the form to post
}
