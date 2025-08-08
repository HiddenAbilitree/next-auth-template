export const formatTime = (time: Date) =>
  time
    .toLocaleString(`en-US`, {
      day: `2-digit`,
      hour: `numeric`,
      hour12: true,
      minute: `2-digit`,
      month: `2-digit`,
      year: `2-digit`,
    })
    .replace(`,`, ``);
