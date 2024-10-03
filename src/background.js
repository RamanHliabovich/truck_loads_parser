chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SEARCH_RESULTS') {
    console.log('Received search results:', message.results);

    // Customize the content for the Discord message
    const discordMessage = {
      content: `Search results: ${message.results.join(', ')}`
    };

    // Discord Webhook URL (replace this with your actual webhook URL)
    const webhookUrl = 'https://discord.com/api/webhooks/1291259915494625405/0mhL6a-hU9VOT6Y-k7t1pJtWiNobA9PDeDe8NSLBtEMfxuR4peKO5jwS9MoNdJQTOSvZ';

    // Make a POST request to the Discord Webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(discordMessage)
    })
    .then(response => {
      if (response.ok) {
        console.log('Message sent to Discord');
      } else {
        console.error('Error sending message to Discord:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
  }
});