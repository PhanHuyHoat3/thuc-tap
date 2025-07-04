export class AnalyticsService {
  constructor() {
    if (AnalyticsService.instance) return AnalyticsService.instance;
    this.observers = [];
    this.strategy = null;
    AnalyticsService.instance = this;
  }

  static getInstance() {
    return new AnalyticsService();
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  analyze(data) {
    if (this.strategy) {
      const result = this.strategy.analyze(data);
      this.notifyObservers(result);
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }
  notifyObservers(data) {
    this.observers.forEach(o => o.update(data));
  }
}