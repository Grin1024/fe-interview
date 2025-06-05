function toggleCase0(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result +=
      str[i] === str[i].toUpperCase()
        ? str[i].toLowerCase()
        : str[i].toUpperCase();
  }
  return result;
}

console.log(toggleCase0("Hello World!"));