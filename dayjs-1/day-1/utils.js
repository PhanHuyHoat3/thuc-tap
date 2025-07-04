export function createCourseManager() {
  const courses = [];

  return {
    add(course) {
      if (!courses.find(c => c.id === course.id)) {
        courses.push(course);
      }
    },
    getAll() {
      return [...courses];
    }
  };
}