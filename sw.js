self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', function(event) {
  // Close the notification when it is clicked
  event.notification.close();
});

function vibrate(){
navigator.vibrate(500);
}
var timerId = setInterval(vibrate, 5000);
