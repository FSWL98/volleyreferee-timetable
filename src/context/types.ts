import type { CalendarEvent } from "../utils/types.ts";

export interface SelectedMatchesState {
    [tournamentId: string]: CalendarEvent[]; // массив ID выбранных матчей
}

export interface MatchesContextType {
    // Состояние
    selectedMatches: SelectedMatchesState;

    // Методы для работы с выбранными матчами
    selectMatch: (match: CalendarEvent, tournamentId: string) => void;
    unselectMatch: (matchId: string, tournamentId: string) => void;
    unselectAllInTournament: (tournamentId: string) => void;
    clearAllSelections: () => void;

    // Геттеры
    getSelectedMatchesByTournament: (tournamentId: string) => CalendarEvent[];
    getSelectedMatchesCount: () => number;
    getSelectedMatchesCountByTournament: (tournamentId: string) => number;
    isMatchSelected: (matchId: string, tournamentId: string, ) => boolean;

    // Статистика
    totalSelectedMatches: number;
}