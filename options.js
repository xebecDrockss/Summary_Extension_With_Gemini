document.addEventListener("DOMContentLoaded", () => {
  // Load saved API key if it exists
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      document.getElementById("api-key").value = result.geminiApiKey;
    }
  });

  // Save API key when button is clicked
  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();

    if (apiKey) {
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";

        // Close the tab after a short delay to show the success message
        setTimeout(() => {
          window.close();
          // For cases where window.close() doesn't work (like when opened programmatically)
          chrome.tabs.getCurrent((tab) => {
            if (tab) {
              chrome.tabs.remove(tab.id);
            }
          });
        }, 1000);
      });
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
//     if (geminiApiKey) document.getElementById("api-key").value = geminiApiKey;
//   }
//   ); 

//   document.getElementById("save-button").addEventListener("click", () => {
//     const apiKey = document.getElementById("api-key").value.trim();

//     if (!apiKey) return;

//     chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
//       document.getElementById("success-message").style.display = "block";
//       setTimeout(() => window.close(), 1000);
//     });
//   }
//   );

// });
