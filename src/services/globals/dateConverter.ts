// services/dateConverter.ts
import moment from 'jalali-moment';

/**
 * Converts a Gregorian date to Jalali date.
 * @param {string} isoDate - ISO8601 formatted date string.
 * @returns {string} - Jalali date in the format YYYY/MM/DD.
 */
export const convertToJalali = (isoDate: string): string => {
  try {
    // Parse the ISO date as Gregorian
    const gregorianDate = moment(isoDate, 'YYYY-MM-DDTHH:mm:ssZ').locale('fa');
    // Format the date in Jalali format
    return gregorianDate.format('jYYYY/jMM/jDD');
  } catch (error) {
    console.error('Error converting date:', error);
    return 'Invalid date';
  }
};
