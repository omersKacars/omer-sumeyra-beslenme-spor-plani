(() => {
  let deferredPrompt = null;
  const installBtn = document.getElementById("btn-install");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try {
          await deferredPrompt.userChoice;
        } catch (_) {
          // noop
        }
        deferredPrompt = null;
      } else {
        alert(
          "Bazı cihazlarda bu buton yerine tarayıcı menüsünden 'Ana ekrana ekle' seçeneğini kullanmalısın."
        );
      }
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
