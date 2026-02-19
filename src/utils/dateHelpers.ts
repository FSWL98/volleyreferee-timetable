/**
 * Общие функции для работы с датами
 */

export interface ParsedTime {
    hours: number;
    minutes: number;
}

/**
 * Парсинг даты из строки по формату
 * @param dateStr - строка с датой
 * @param format - формат (DD.MM.YYYY, YYYY-MM-DD, и т.д.)
 */
export const parseDate = (dateStr: string, format: string = 'DD.MM.YYYY'): Date => {
    if (!dateStr) return new Date(NaN);

    try {
        let day: number, month: number, year: number;

        if (format === 'DD.MM.YYYY') {
            const parts = dateStr.split('.');
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            year = parseInt(parts[2], 10);
        } else if (format === 'YYYY-MM-DD') {
            const parts = dateStr.split('-');
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            day = parseInt(parts[2], 10);
        } else if (format === 'MM/DD/YYYY') {
            const parts = dateStr.split('/');
            month = parseInt(parts[0], 10) - 1;
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
        } else {
            // По умолчанию пробуем разобрать как есть
            return new Date(dateStr);
        }

        return new Date(year, month, day);
    } catch (error) {
        console.error('Error parsing date:', dateStr, error);
        return new Date(NaN);
    }
};

/**
 * Парсинг времени из строки
 * @param timeStr - строка со временем (например, "10:30" или "14:00:00")
 * @param format - формат (HH:mm, HH:mm:ss)
 */
export const parseTime = (timeStr: string): ParsedTime => {
    if (!timeStr) return { hours: 0, minutes: 0 };

    try {
        let hours: number, minutes: number;

        if (timeStr.includes(':')) {
            const parts = timeStr.split(':');
            hours = parseInt(parts[0], 10);
            minutes = parseInt(parts[1], 10);
        } else {
            hours = parseInt(timeStr.substring(0, 2), 10);
            minutes = parseInt(timeStr.substring(2, 4), 10);
        }

        return {
            hours: isNaN(hours) ? 0 : hours,
            minutes: isNaN(minutes) ? 0 : minutes
        };
    } catch (error) {
        console.error('Error parsing time:', timeStr, error);
        return { hours: 0, minutes: 0 };
    }
};

/**
 * Форматирование даты для отображения
 * @param date - объект Date
 * @param format - формат
 */
export const formatDate = (date: Date, format: string = 'DD.MM.YYYY'): string => {
    if (!date || isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (format === 'DD.MM.YYYY') {
        return `${day}.${month}.${year}`;
    } else if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    } else if (format === 'DD MMM YYYY') {
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${day} ${months[date.getMonth()]} ${year}`;
    }

    return `${day}.${month}.${year}`;
};

/**
 * Форматирование времени для отображения
 * @param date - объект Date
 * @param format - формат
 */
export const formatTime = (date: Date,): string => {
    if (!date || isNaN(date.getTime())) return '';

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};
