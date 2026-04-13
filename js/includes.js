document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("site-header");
  const footerTarget = document.getElementById("site-footer");

  if (headerTarget) {
    const headerResponse = await fetch("partials/header.html");
    headerTarget.innerHTML = await headerResponse.text();
  }

  if (footerTarget) {
    const footerResponse = await fetch("partials/footer.html");
    footerTarget.innerHTML = await footerResponse.text();
  }
});