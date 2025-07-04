export class ConsoleLogger {
  update(data) {
    console.log("Kết quả phân tích:", data);
  }
}
export class ServerReporter {
  update(data) {
    fetch('/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}
export class UIUpdater {
  update(data) {
    document.getElementById("result").textContent = `📊 Kết quả phân tích:\n${JSON.stringify(data, null, 2)}`;
  }
}