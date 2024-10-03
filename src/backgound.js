console.log('Background service worker is running.');

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SEARCH_RESULTS') {
      console.log('Received search results:', message.results);
  
      // You can perform any additional processing with the results here
      // For example, you could store the results or send a notification
    }});
