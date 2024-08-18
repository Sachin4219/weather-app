if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .then(() => {
        if ("PeriodicSyncManager" in window) {
          registration.periodicSync
            .register("check-weather", {
              minInterval: 10 * 1000, // 24 hours in milliseconds
            })
            .then(() => console.log("Periodic Sync registered"))
            .catch((err) =>
              console.error("Periodic Sync registration failed:", err)
            );
        }
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

if ("Notification" in window) {
  window.addEventListener("load", () => {
    // Check if permission has already been granted
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
    } else if (Notification.permission !== "denied") {
      // Request permission if not denied
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.error("Notification permission denied.");
          }
        })
        .catch((err) => {
          console.error("Failed to request notification permission:", err);
        });
    }
  });
} else {
  console.error("Notifications are not supported in this browser.");
}
