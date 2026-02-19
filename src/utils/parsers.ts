/**
 * Парсеры для данных турнира А
 */
import { type TournamentConfig } from "../config/tournamentConfig.ts";
import { parseDate, parseTime } from "./dateHelpers.ts";
import { type CalendarEvent } from "./types.ts";

export const parseSchedule = (rows: string[][], config: TournamentConfig): CalendarEvent[] => {
    if (!rows || !Array.isArray(rows)) return [];

    const columns = config.columns;

    return rows
        .filter((row, index) => index > 0 && row[columns.date] && row[columns.startTime] && row[columns.homeTeam] && row[columns.awayTeam]) // только строки с датой и временем
        .map((row, index) => {
            // Парсим дату и время
            const dateStr = row[columns.date] || '';
            const timeStr = row[columns.startTime] || '';

            // Проверяем наличие судей
            const firstReferee = row[columns.firstReferee]?.trim() || '';
            const secondReferee = row[columns.secondReferee]?.trim() || '';
            const bothRefereesFilled = Boolean(firstReferee && secondReferee);
            const address = row[columns.address]?.trim() || '';

            const homeTeam = row[columns.homeTeam]?.trim() || '';
            const awayTeam = row[columns.awayTeam]?.trim() || '';
            const matchNumber = columns.matchNumber ? row[columns.matchNumber]?.trim() : '';
            const gamesCount = columns.gamesCount ? row[columns.gamesCount] : '0';
            const additionalInfo = columns.additionalInfo ? row[columns.additionalInfo]?.trim() : '';

            const date = parseDate(dateStr, config.dateFormat);
            const time = parseTime(timeStr);

            const startDateTime = new Date(date);
            startDateTime.setHours(time.hours, time.minutes, 0);

            const endDateTime = new Date(startDateTime);
            if (parseInt(gamesCount, 10) > 0) {
                endDateTime.setHours(endDateTime.getHours() + parseInt(gamesCount, 10));
                endDateTime.setMinutes(endDateTime.getMinutes() + 30 * parseInt(gamesCount, 10));
            } else {
                endDateTime.setHours(endDateTime.getHours() + 1);
                endDateTime.setMinutes(endDateTime.getMinutes() + 30);
            }

            return {
                id: `${index}`,
                homeTeam,
                awayTeam,
                matchNumber: matchNumber || index,
                gamesCount,
                address,
                date: dateStr,
                start: startDateTime,
                end: endDateTime,
                startTime: timeStr,
                group: row[columns.group]?.trim() || '',
                firstReferee,
                secondReferee,
                bothRefereesFilled,
                additionalInfo
            };
        });
};

export const parseMatchesToMessage = (events: CalendarEvent[]) => {
    let result = '';
    events.forEach((el) => {
        result += `${el.date} ${el.address} (${el.homeTeam} - ${el.awayTeam})\n`
    })
    return result
}