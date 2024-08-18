if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        if ("periodicSync" in registration) {
          registration.periodicSync
            .register("check-weather", {
              minInterval: 30 * 1000, // 24 hours
            })
            .then(() => {
              console.log("Periodic Sync registered");
            })
            .catch((err) => {
              console.error("Periodic Sync registration failed:", err);
            });
        }
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
