document.getElementById('searchButton').addEventListener('click', () => {
    const searchText = document.getElementById('searchText').value;
  
    // Send the search text to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: searchTable,
        args: [searchText]
      });
    });
  });
  
  // This function will run in the context of the page
  function searchTable(searchText) {
    const tables = document.getElementsByTagName('table');
    const results = [];
  
    for (let table of tables) {
      for (let row of table.rows) {
        for (let cell of row.cells) {
          if (cell.textContent.includes(searchText)) {
            results.push(cell.textContent);
          }
        }
      }
    }
  
    // Return the result to the popup
    chrome.runtime.sendMessage({ type: 'SEARCH_RESULTS', results });
  }
  
  // Listen for the results and display them
  chrome.runtime.onMessage.addListener((message) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message.results.join('<br>');
  });
  