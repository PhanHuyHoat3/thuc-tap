export class BasicAnalytics {
  analyze(data) {
    return { type: 'basic', clicks: data.filter(e => e.type === 'click').length };
  }
}
export class TimeBasedAnalytics {
  analyze(data) {
    return { type: 'time', totalTime: data.reduce((acc, e) => acc + (e.time || 0), 0) };
  }
}
export class AIEnhancedAnalytics {
  analyze(data) {
    return { type: 'ai', summary: "Simulated AI analysis..." };
  }
}