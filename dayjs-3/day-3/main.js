import { EventFactory } from './patterns/EventFactory.js';
import { AnalyticsService } from './patterns/AnalyticsService.js';
import { BasicAnalytics, TimeBasedAnalytics, AIEnhancedAnalytics } from './patterns/strategies.js';
import { ConsoleLogger, ServerReporter, UIUpdater } from './patterns/observers.js';
import { AnalyticsProxy } from './patterns/proxy.js';
import { withLogging, withTiming } from './patterns/decorators.js';

const rawEvents = [
  { type: 'click' },
  { type: 'click' },
  { type: 'click' },
  { type: 'scroll', pixels: 1200 },
  { type: 'click' },
  { type: 'stay', time: 1000 }
];

const service = AnalyticsService.getInstance();
service.subscribe(new ConsoleLogger());
service.subscribe(new UIUpdater());

service.setStrategy(new BasicAnalytics());

document.getElementById("strategy-select").addEventListener("change", e => {
  const strategy = {
    basic: new BasicAnalytics(),
    time: new TimeBasedAnalytics(),
    ai: new AIEnhancedAnalytics()
  }[e.target.value];

  service.setStrategy(strategy);
});

document.getElementById("analyze-btn").addEventListener("click", () => {
  const user = { isLoggedIn: true };
  const proxy = new AnalyticsProxy(service, user);

  const decoratedAnalyze = withTiming(withLogging(data => proxy.analyze(data)));
  decoratedAnalyze(rawEvents);

  const worker = new Worker('./analysisWorker.js');
  worker.postMessage(rawEvents);
  worker.onmessage = e => {
    document.getElementById("result").textContent += `\n [Web Worker] Kết quả phân tích nền:\n${JSON.stringify(e.data, null, 2)}`;
  };
});