document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const DEFAULT_LAT = 19.076;
  const DEFAULT_LNG = 72.8777;
  const DEFAULT_ZOOM = 13;

  let lat = DEFAULT_LAT;
  let lng = DEFAULT_LNG;
  let zoom = DEFAULT_ZOOM;

  if (
    typeof coord !== "undefined" &&
    coord?.geometry?.coordinates?.length === 2
  ) {
    [lng, lat] = coord.geometry.coordinates;
    zoom = 13;
  }

  const map = L.map("map").setView([lat, lng], zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  if (
    typeof coord !== "undefined" &&
    coord?.geometry?.coordinates?.length === 2
  ) {
    L.marker([lat, lng]).addTo(map).bindPopup(coord.title).openPopup();
  } else {
    L.marker([DEFAULT_LAT, DEFAULT_LNG])
      .addTo(map)
      .bindPopup(coord.title)
      .openPopup();
  }
});
