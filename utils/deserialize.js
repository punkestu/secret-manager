export default function (data, params = {}) {
  return ["key"].includes(params.type) ? data : JSON.parse(data);
}
