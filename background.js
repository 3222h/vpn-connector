// URL of a service to ping for keeping the connection alive
const vpnServerPingURL = "https://example.com/ping";  // Replace with your VPN's keep-alive URL
const pingInterval = 10000; // Ping every 10 seconds (in milliseconds)

let vpnConnected = true; // Initially assume VPN is connected

// Function to ping the VPN server to keep it alive
function pingVPNServer() {
  fetch(vpnServerPingURL)
    .then(response => {
      if (response.ok) {
        console.log("VPN is alive");
        vpnConnected = true;
      } else {
        console.log("Ping failed, VPN may have disconnected");
        vpnConnected = false;
        reconnectVPN();
      }
    })
    .catch(error => {
      console.error("Error pinging VPN server:", error);
      vpnConnected = false;
      reconnectVPN();
    });
}

// Automatically reconnect the VPN if disconnected
function reconnectVPN() {
  if (!vpnConnected) {
    console.log("Reconnecting to VPN...");
    // Simulate VPN reconnect logic here
    // Replace this with your actual VPN reconnect API or logic
    setTimeout(() => {
      vpnConnected = true;
      console.log("VPN reconnected successfully");
    }, 5000); // Simulating 5 seconds reconnect delay
  }
}

// Set up the keep-alive pinging interval (every 10 seconds)
setInterval(pingVPNServer, pingInterval);

// Initial VPN status monitoring
pingVPNServer();

// Background communication to handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getStatus') {
    sendResponse({ status: vpnConnected ? 'VPN is connected' : 'VPN is disconnected' });
  }

  if (message.action === 'reconnectVPN') {
    reconnectVPN();
  }
});
