function formatToICSDate(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time
    .split(":")
    .map((part) => parseInt(part.replace(/AM|PM/, "").trim(), 10));
  const isPM = time.includes("PM");

  let hour24 = hours;
  if (isPM && hours < 12) {
    hour24 += 12;
  }
  if (!isPM && hours === 12) {
    hour24 = 0;
  }

  const d = new Date(Date.UTC(year, month - 1, day, hour24, minutes, 0));

  const pad = (num) => (num < 10 ? "0" + num : num);

  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

export function createICSFile(bookingDetails) {
  const { serviceName, counsellorName, date, time } = bookingDetails;

  const startTime = formatToICSDate(date, time);

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time
    .split(":")
    .map((part) => parseInt(part.replace(/AM|PM/, "").trim(), 10));
  const isPM = time.includes("PM");

  let hour24 = hours;
  if (isPM && hours < 12) {
    hour24 += 12;
  }
  if (!isPM && hours === 12) {
    hour24 = 0;
  }

  const startDate = new Date(
    Date.UTC(year, month - 1, day, hour24, minutes, 0),
  );
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour

  const pad = (num) => (num < 10 ? "0" + num : num);

  const formatEndDate = (d) => {
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };

  const endTime = formatEndDate(endDate);

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SukoonWorld//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@sukoonworld.org
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:Counselling Session: ${serviceName}
DESCRIPTION:Your session with ${counsellorName} at Sukoon World. Please ensure you are in a quiet, private space for your session.
LOCATION:Online - Sukoon World
END:VEVENT
END:VCALENDAR
`.trim();

  return new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
}
