function showMessage() {
  const msg = document.getElementById("thankYou");
  msg.classList.remove("hidden");

  // Kích hoạt lại animation nếu nhấn nhiều lần
  msg.style.animation = "none";
  msg.offsetHeight; // trigger reflow
  msg.style.animation = "zoomIn 0.6s ease forwards";
}
