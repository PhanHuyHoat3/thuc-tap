export function withLogging(fn) {
  return function (...args) {
    console.log("📝 [Ghi log] Dữ liệu đầu vào:", args);
    return fn(...args);
  };
}

export function withTiming(fn) {
  return function (...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`⏱️ [Thời gian xử lý] ${ (end - start).toFixed(2) }ms`);
    return result;
  };
}