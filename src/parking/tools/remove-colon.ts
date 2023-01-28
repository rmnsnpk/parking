export function removeColon(str: string) {
  if (str[0] === ':') {
    return str.slice(1);
  }
  return str;
}
