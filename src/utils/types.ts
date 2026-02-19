export interface CalendarEvent {
    id: string;
    homeTeam: string;
    awayTeam: string;
    gameNumber: string | number;
    address: string;
    date: string;
    start: Date;
    end: Date;
    startTime: string;
    group: string;
    firstReferee: string;
    secondReferee: string;
    gamesCount?: string | number;
    bothRefereesFilled: boolean;
    additionalInfo?: string;
}