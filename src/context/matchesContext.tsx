import { createContext, useState, useContext, useCallback, useMemo, type ReactNode, type FC } from 'react';
import { type SelectedMatchesState, type MatchesContextType } from './types.ts';
import { type CalendarEvent } from "../utils/types.ts";

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

interface MatchesProviderProps {
    children: ReactNode;
}

const MatchesProvider: FC<MatchesProviderProps> = ({ children }) => {
    const [selectedMatches, setSelectedMatches] = useState<SelectedMatchesState>({});

    // Выбрать конкретный матч
    const selectMatch = useCallback((match: CalendarEvent, tournamentId: string) => {
        setSelectedMatches(prev => {
            const tournamentMatches = prev[tournamentId] || [];

            // Проверяем, не выбран ли уже этот матч
            const isAlreadySelected = tournamentMatches.some(m => m.id === match.id);

            if (isAlreadySelected) {
                return prev;
            }

            return {
                ...prev,
                [tournamentId]: [...tournamentMatches, match]
            };
        });
    }, []);

    // Отменить выбор матча
    const unselectMatch = useCallback((matchId: string, tournamentId: string) => {
        setSelectedMatches(prev => {
            const tournamentMatches = prev[tournamentId] || [];

            const filteredMatches = tournamentMatches.filter(m => m.id !== matchId);

            // Если после фильтрации массив пуст, удаляем турнир из состояния
            if (filteredMatches.length === 0) {
                const newState = { ...prev };
                delete newState[tournamentId];
                return newState;
            }

            return {
                ...prev,
                [tournamentId]: filteredMatches
            };
        });
    }, []);

    const unselectAllInTournament = useCallback((tournamentId: string) => {
        setSelectedMatches(prev => {
            const newState = { ...prev };
            delete newState[tournamentId];
            return newState;
        });
    }, []);

    const clearAllSelections = useCallback(() => {
        setSelectedMatches({});
    }, []);

    // Получить выбранные матчи конкретного турнира
    const getSelectedMatchesByTournament = useCallback((tournamentId: string): CalendarEvent[] => {
        return selectedMatches[tournamentId] || [];
    }, [selectedMatches]);

    // Получить общее количество выбранных матчей
    const getSelectedMatchesCount = useCallback((): number => {
        return Object.values(selectedMatches).reduce(
            (total, matches) => total + matches.length,
            0
        );
    }, [selectedMatches]);

    // Получить количество выбранных матчей в конкретном турнире
    const getSelectedMatchesCountByTournament = useCallback((tournamentId: string): number => {
        return selectedMatches[tournamentId]?.length || 0;
    }, [selectedMatches]);

    // Проверить, выбран ли конкретный матч
    const isMatchSelected = useCallback((matchId: string, tournamentId: string): boolean => {
        return selectedMatches[tournamentId]?.some(m => m.id === matchId) || false;
    }, [selectedMatches]);

    // Мемоизированное общее количество
    const totalSelectedMatches = useMemo(() => {
        return getSelectedMatchesCount();
    }, [getSelectedMatchesCount]);

    const contextValue: MatchesContextType = {
        selectedMatches,
        selectMatch,
        unselectMatch,
        unselectAllInTournament,
        clearAllSelections,
        getSelectedMatchesByTournament,
        getSelectedMatchesCount,
        getSelectedMatchesCountByTournament,
        isMatchSelected,
        totalSelectedMatches
    };

    return (
        <MatchesContext.Provider value={contextValue}>
            {children}
        </MatchesContext.Provider>
    );
};

export const WithMatchesProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <MatchesProvider>
        {children}
    </MatchesProvider>
)

export const useMatches = (): MatchesContextType => {
    const context = useContext(MatchesContext);

    if (context === undefined) {
        throw new Error('useMatches must be used within a MatchesProvider');
    }

    return context;
};