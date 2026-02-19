/**
 * Конфигурация турниров - упрощенная версия для одного листа
 */

export interface TournamentColumnIndices {
    homeTeam: number;
    awayTeam: number;
    matchNumber?: number;
    address: number;
    date: number;
    startTime: number;
    group: number;
    firstReferee: number;
    secondReferee: number;
    gamesCount?: number;
    additionalInfo?: number;
}

export interface TournamentConfig {
    id: string;
    name: string;
    spreadsheetId: string;
    sheetName: string;           // имя листа (обычно 'Sheet1' или 'Лист1')
    columns: TournamentColumnIndices;
    dateFormat: string;
    timeFormat: string;
    cacheTime: number;
    hasHeaderRow: boolean;        // есть ли строка с заголовками
}

export type TournamentId = string;

const tournamentConfig: Record<TournamentId, TournamentConfig> = {
    // Первый турнир (например, "Премьер-лига")
    universities: {
        id: 'universities',
        name: 'Чемпионат ВУЗов',
        spreadsheetId: import.meta.env.VITE_UNIVERSITIES_SHEET_ID || '',
        sheetName: 'Календарь',
        columns: {
            homeTeam: 0,
            awayTeam: 1,
            address: 5,
            date: 3,
            startTime: 4,
            group: 2,
            firstReferee: 6,
            secondReferee: 7,
        },
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        cacheTime: 10 * 60 * 1000, // 10 минут
        hasHeaderRow: true
    },

    // Второй турнир (может быть другая структура колонок)
    city: {
        id: 'city',
        name: 'Чемпионат и Первенство Санкт-Петербурга',
        spreadsheetId: import.meta.env.VITE_CITY_SHEET_ID || '',
        sheetName: 'Назначения',
        columns: {
            // Если порядок колонок отличается
            homeTeam: 5,
            awayTeam: 7,
            matchNumber: 0,
            address: 8,           // адрес в другой колонке
            date: 1,
            startTime: 3,
            group: 4,
            firstReferee: 10,
            secondReferee: 11,
            gamesCount: 9,
            additionalInfo: 12,
        },
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        cacheTime: 10 * 60 * 1000,
        hasHeaderRow: true
    }
};

// Функция для получения конфига турнира по ID
export const getTournamentConfig = (tournamentId: TournamentId): TournamentConfig => {
    return tournamentConfig[tournamentId];
};

// Функция для получения полного диапазона
export const getFullRange = (config: TournamentConfig): string => {
    // Определяем последнюю колонку по максимальному индексу
    const maxColumnIndex = Math.max(...Object.values(config.columns));
    const lastColumn = String.fromCharCode(65 + maxColumnIndex); // A=65, B=66, etc.

    return `${config.sheetName}!A:${lastColumn}`;
};

export default tournamentConfig;