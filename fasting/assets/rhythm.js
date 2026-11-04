// Fixed wall-clock preview, not a prescription, timer, or time-zone calculation.
(function (scope) {
  function routine(start, hours) {
    const match = /^(\d{2}):(\d{2})$/.exec(start);
    if (!match || +match[1] > 23 || +match[2] > 59 || ![12, 14, 16].includes(Number(hours))) return null;
    const startMinutes = Number(match[1]) * 60 + Number(match[2]);
    const endTotal = startMinutes + Number(hours) * 60;
    const endMinutes = endTotal % 1440;
    const cuts = [...new Set([0, startMinutes, endMinutes, 1440])].sort((a, b) => a - b);
    const segments = cuts.slice(0, -1).map((left, index) => {
      const right = cuts[index + 1];
      const middle = (left + right) / 2;
      const fasting = ((middle - startMinutes + 1440) % 1440) < Number(hours) * 60;
      return { left, width: right - left, fasting };
    });
    return { startMinutes, endMinutes, nextDay: endTotal >= 1440, hours: Number(hours), segments };
  }
  scope.FastingRoutine = { routine };
})(globalThis);
