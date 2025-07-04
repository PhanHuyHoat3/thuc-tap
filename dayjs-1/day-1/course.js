export class Course {
  constructor(id, title, duration) {
    this.id = id;
    this.title = title;
    this.duration = duration;
  }

  get info() {
    return `${this.title} - ${this.duration} hours`;
  }

  set updateTitle(newTitle) {
    this.title = newTitle;
  }

  static isValid(course) {
    return course instanceof Course;
  }
}

export class LiveCourse extends Course {
  constructor(id, title, duration, schedule) {
    super(id, title, duration);
    this.schedule = schedule;
  }

  get info() {
    return `${super.info} | Live: ${this.schedule}`;
  }
}

export class RecordedCourse extends Course {
  constructor(id, title, duration, videoUrl) {
    super(id, title, duration);
    this.videoUrl = videoUrl;
  }

  get info() {
    return `${super.info} | Video: ${this.videoUrl}`;
  }
}