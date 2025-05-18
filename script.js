
import { db, collection, addDoc } from './firebase.js';

const form = document.getElementById('periodForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const startDate = new Date(document.getElementById('startDate').value);
  const cycleLength = parseInt(document.getElementById('cycleLength').value);

  if (isNaN(startDate.getTime()) || isNaN(cycleLength)) {
    resultDiv.innerHTML = `<p style="color:red;">Invalid input.</p>`;
    return;
  }

  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(startDate.getDate() + cycleLength);

  const ovulationDate = new Date(nextPeriod);
  ovulationDate.setDate(nextPeriod.getDate() - 14);

  resultDiv.innerHTML = `
    <p><strong>Next Period:</strong> ${nextPeriod.toDateString()}</p>
    <p><strong>Ovulation Date:</strong> ${ovulationDate.toDateString()}</p>
  `;

  try {
    await addDoc(collection(db, "periodLogs"), {
      startDate: startDate.toISOString(),
      cycleLength: cycleLength,
      nextPeriod: nextPeriod.toISOString(),
      ovulationDate: ovulationDate.toISOString(),
      timestamp: new Date().toISOString()
    });
    console.log("Period data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
});
