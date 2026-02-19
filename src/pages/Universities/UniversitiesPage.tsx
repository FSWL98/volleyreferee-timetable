import { TournamentCalendar } from "../../components/TournamentCalendar/TournamentCalendar.tsx";
import { parseSchedule } from "../../utils/parsers.ts";

const UniversitiesPage = () => {
    return (
        <>
            <TournamentCalendar id='universities' parseFunction={parseSchedule} />
        </>
    )
};

export default UniversitiesPage;