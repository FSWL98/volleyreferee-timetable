import { useState, useEffect, type FC } from "react";
import {getTournamentConfig, type TournamentConfig} from "../../config/tournamentConfig.ts";
import useGoogleSheets from "../../hooks/useGoogleSheets.ts";
import { type CalendarEvent } from "../../utils/types.ts";
import MatchCalendar from "../../components/MatchCalendar/MatchCalendar.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ErrorComponent from "../Error/ErrorComponent.tsx";

type TournamentCalendarProps = {
    id: string;
    parseFunction: (rows: string[][], config: TournamentConfig) => CalendarEvent[];
}

export const TournamentCalendar: FC<TournamentCalendarProps> = ({ id, parseFunction }) => {
    const config = getTournamentConfig(id);

    const [parsedData, setParsedData] = useState<CalendarEvent[]>([])


    const {
        data,
        headers,
        loading,
        error,
        lastUpdated,
        refresh,
        isEmpty,
    } = useGoogleSheets(
        config?.spreadsheetId || '',
        config?.sheetName || '',
    );

    useEffect(() => {
        if (!loading && !error && data) {
            const newData = parseFunction(data, config);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setParsedData(newData);
        }
    }, [parseFunction, loading, data, error, setParsedData, config]);

    if (!config || error) {
        return <ErrorComponent refetch={refresh} />
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div style={{ height: "800px", width: "100%" }}>
            <MatchCalendar eventsList={parsedData} />
        </div>
    );
}