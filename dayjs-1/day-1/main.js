import { Course, LiveCourse, RecordedCourse } from './course.js';
import { Student } from './student.js';
import { createCourseManager } from './utils.js';

const student1 = new Student(1, 'Alice', 'alice@example.com');
console.log('Optional chaining:', student1?.name ?? 'Không tồn tại');

const student2 = Student.copyWithNewEmail(student1, 'newalice@example.com');
console.log('Copy student:', student2);

const manager = createCourseManager();
manager.add(new Course(101, 'JS Basics', 20));
console.log('Course list:', manager.getAll());

function checkHoisting() {
  let courseTitle = 'ES6 Advanced';
  console.log('Course:', courseTitle);
}
checkHoisting();

function asyncRegister() {
  console.log('1. Start Registration');

  setTimeout(() => {
    console.log('3. Timeout Done');
  }, 0);

  Promise.resolve().then(() => {
    console.log('2. Promise Resolved');
  });

  console.log('4. End Sync Code');
}
asyncRegister();

async function registerStudentToCourse(student, course) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      success ? resolve(`${student.name} đăng ký ${course.title}`) :
                reject(new Error('Đăng ký thất bại!'));
    }, 500);
  });
}

async function batchRegister() {
  const students = [
    new Student(1, 'Bob', 'bob@example.com'),
    new Student(2, 'Jane', 'jane@example.com'),
    new Student(3, 'John', 'john@example.com'),
  ];

  const course = new Course(202, 'ReactJS', 30);

  try {
    const results = await Promise.all(
      students.map(s => registerStudentToCourse(s, course).catch(err => err.message))
    );
    results.forEach(res => console.log('✅', res));
  } catch (e) {
    console.error('❌ Lỗi tổng:', e.message);
  }
}

batchRegister();