export default function (data, params = {}) {
  try {
    return ["key"].includes(params.type) ? data : JSON.parse(data);
  } catch (_) {
    return data;
  }
}
