self.addEventListener("sync", (event) => {
  console.log("sync event");
  if (event.tag === "check-weather") {
    event.waitUntil(checkCloudCover());
  }
});

async function checkCloudCover() {
  const uri = "https://api.openweathermap.org/data/2.5/weather?q=";
  const appid = "d051b119410eccb47463b12e9f73cf47";

  const favorites = ["Palam"];

  for (const place of favorites) {
    const response = await fetch(`${uri}${place}&appid=${appid}`);
    const data = await response.json();
    const cloudCover = data.clouds.all; // Example field for cloud cover
    console.log(cloudCover);

    if (cloudCover > 60) {
      self.registration.showNotification("Weather Alert", {
        body: `Cloud cover at ${place} is higher than 60%`,
        icon: "../assets/icons/icon512x512.png",
      });
    }
  }
}
