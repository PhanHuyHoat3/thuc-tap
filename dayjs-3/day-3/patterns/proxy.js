export class AnalyticsProxy {
  constructor(realAnalytics, user) {
    this.realAnalytics = realAnalytics;
    this.user = user;
  }

  analyze(data) {
    if (!this.user?.isLoggedIn) {
      return console.warn("⚠️ Người dùng chưa đăng nhập. Không thể phân tích.");
    }
    this.realAnalytics.analyze(data);
  }
}