export function idifyName(name: string): string {
  return name
    .replace(/'/g, "")
    .replace(/\W+/g, "-")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLocaleLowerCase();
}
