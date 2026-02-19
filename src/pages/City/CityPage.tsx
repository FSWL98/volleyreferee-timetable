import { TournamentCalendar } from "../../components/TournamentCalendar/TournamentCalendar.tsx";
import { parseSchedule } from "../../utils/parsers.ts";

const CityPage = () => {
    return (
        <>
            <TournamentCalendar id='city' parseFunction={parseSchedule} />
        </>
    )
};

export default CityPage;