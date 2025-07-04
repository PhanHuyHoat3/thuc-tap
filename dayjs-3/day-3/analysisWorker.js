onmessage = function (e) {
  const data = e.data;
  const result = {
    clickRate: data.filter(ev => ev.type === 'click').length / data.length,
    anomalies: data.filter(ev => ev.type === 'scroll' && ev.pixels > 10000)
  };
  postMessage(result);
};