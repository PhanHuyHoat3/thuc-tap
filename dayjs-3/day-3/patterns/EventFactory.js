class ClickEvent {
  handle(data) { return { type: 'click', count: 1 }; }
}
class ScrollEvent {
  handle(data) { return { type: 'scroll', pixels: data.scrollY }; }
}
class StayTimeEvent {
  handle(data) { return { type: 'stay', time: data.timeSpent }; }
}

export class EventFactory {
  static createEvent(type) {
    switch (type) {
      case 'click': return new ClickEvent();
      case 'scroll': return new ScrollEvent();
      case 'stay': return new StayTimeEvent();
      default: throw new Error("Unknown event type");
    }
  }
}