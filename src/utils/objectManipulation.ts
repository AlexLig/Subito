// function pick(obj: Object, keys: string[]) {
//   return { ...keys.map(k => (k in obj ? { [k]: obj[k] } : {})) };
// }
function pick(obj: object, keys: string[]): object {
  return keys.reduce(reducer(obj), {});
}
const reducer = (obj: { [key: string]: any }) => (acc: any, key: any) => {
  if (key in obj) acc = { ...acc, [key]: obj[key] };
  // if (key in obj) acc[key] = obj[key];
  return acc;
};
