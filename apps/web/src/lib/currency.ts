export function formatPhpFromCentavos(
  centavos: number,
  options?: { alwaysShowDecimals?: boolean },
): string {
  const isNegative = centavos < 0;
  const absolute = Math.abs(Math.trunc(centavos));
  const pesos = Math.floor(absolute / 100);
  const remainder = absolute % 100;

  const formattedPesos = pesos.toLocaleString('en-PH');
  const shouldShowDecimals = Boolean(options?.alwaysShowDecimals) || remainder !== 0;
  const decimalPart = shouldShowDecimals
    ? `.${String(remainder).padStart(2, '0')}`
    : '';

  return `${isNegative ? '-' : ''}₱${formattedPesos}${decimalPart}`;
}

export function formatDurationMinutes(minutes: number): string {
  const safeMinutes = Math.max(0, Math.trunc(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const mins = safeMinutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return hours === 1 ? '1 hr' : `${hours} hrs`;
  }

  const hourLabel = hours === 1 ? '1 hr' : `${hours} hrs`;
  return `${hourLabel} ${mins} min`;
}
