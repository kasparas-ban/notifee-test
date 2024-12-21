export const formatFullTime = (totalSeconds: number) => {
  if (totalSeconds === 0) return "0 sec";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let time = "";
  if (hours) time += `${hours} h`;
  if (minutes) time += `${time.length ? " " : ""}${minutes} min`;
  if (seconds) time += `${time.length ? " " : ""}${seconds} sec`;

  return time;
};
