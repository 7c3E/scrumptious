function pad(value: number, length = 2) {
  return value.toString().padStart(length, "0");
}

export function generateOrderNumber(now = new Date(), randomValue = Math.random()) {
  const timestamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
  ].join("");
  const suffix = Math.floor(randomValue * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(0, 4);

  return `SC${timestamp}${suffix}`;
}