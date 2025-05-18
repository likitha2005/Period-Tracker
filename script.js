function trackPeriod() {
  const startDateInput = document.getElementById('start').value;
  const cycleLength = parseInt(document.getElementById('cycle').value);

  if (!startDateInput || isNaN(cycleLength)) {
    alert("Please enter valid inputs.");
    return;
  }

  const startDate = new Date(startDateInput);
  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(startDate.getDate() + cycleLength);

  const ovulationStart = new Date(startDate);
  ovulationStart.setDate(startDate.getDate() + cycleLength - 14);

  const ovulationEnd = new Date(ovulationStart);
  ovulationEnd.setDate(ovulationStart.getDate() + 2);

  const entry = {
    date: startDate.toDateString(),
    nextPeriod: nextPeriod.toDateString(),
    ovulation: `${ovulationStart.toDateString()} - ${ovulationEnd.toDateString()}`,
  };

  let history = JSON.parse(localStorage.getItem('periodHistory')) || [];
  history.unshift(entry);
  localStorage.setItem('periodHistory', JSON.stringify(history));

  displayOutput(entry);
  displayHistory();
}

function displayOutput(entry) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <h3>📆 Predictions</h3>
    <p><strong>Last Period:</strong> ${entry.date}</p>
    <p><strong>Next Period:</strong> ${entry.nextPeriod}</p>
    <p><strong>Ovulation Window:</strong> ${entry.ovulation}</p>
  `;
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem('periodHistory')) || [];
  const historyHTML = history.map((e, i) => `
    <div class="history-entry">
      <strong>#${i + 1}</strong> - ${e.date} ➜ Next: ${e.nextPeriod}, Ovulation: ${e.ovulation}
    </div>
  `).join("");

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML += `
    <h3>🕒 History</h3>
    ${historyHTML}
  `;
}

window.onload = () => {
  displayHistory();
};
