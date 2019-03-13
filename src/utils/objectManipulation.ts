// function pick(obj: Object, keys: string[]) {
//   return { ...keys.map(k => (k in obj ? { [k]: obj[k] } : {})) };
// }
function pick(obj: object, props: string[]): object {
  return props.reduce(reducerPick(obj), {});
}
const reducerPick = (obj: { [key: string]: any }) => (acc: any, prop: any) => {
  if (prop in obj) acc = { ...acc, [prop]: obj[prop] };
  // if (key in obj) acc[key] = obj[key];
  return acc;
};

function deleteProps(obj: object, props: string[]): object {
  const keys = Object.keys(obj);
  return keys.reduce(reducerReject(obj, props), {});
}
const reducerReject = (obj: { [key: string]: any }, props: string[]) => (
  acc: any,
  key: any,
) => {
  if (key in props) return acc;
  else return { ...acc, [key]: obj[key] };
};
