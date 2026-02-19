import { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views, type View} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ru } from 'date-fns/locale/ru'; // для русской локализации
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { type CalendarEvent } from "../../utils/types.ts";
import './MatchCalendar.css';
import Modal from "../Modal/Modal.tsx";

const locales = {
    'ru': ru
};

const localizer = dateFnsLocalizer({
    format: (date: Date, formatStr: string): string => {
        return format(date, formatStr, { locale: ru });
    },
    parse: (value: string, formatStr: string): Date | null => {
        return parse(value, formatStr, new Date(), { locale: ru });
    },
    startOfWeek: (date: Date): Date => {
        return startOfWeek(date, { locale: ru });
    },
    getDay: (date: Date): number => {
        return getDay(date);
    },
    locales
});

const parseTournament = (group: string | undefined) => {
    switch (group) {
        case '1Ж':
            return 'Чемпионат ВУЗов. Девушки. 1 группа';
        case '2Ж':
            return 'Чемпионат ВУЗов. Девушки. 2 группа';
        case '3Ж':
            return 'Чемпионат ВУЗов. Девушки. 3 группа'
        case '1М':
            return 'Чемпионат ВУЗов. Мужчины. 1 группа';
        case '2М':
            return 'Чемпионат ВУЗов. Мужчины. 2 группа';
        case '3М':
            return 'Чемпионат ВУЗов. Мужчины. 3 группа'
        case 'муж':
            return 'Чемпионат города. Мужчины'
        case 'жен':
            return 'Чемпионат города. Женщины'
        case 'юн':
            return 'Первенство города. Юноши'
        case 'дев':
            return 'Первенство города. Девушки'
        default:
            return 'Турнир не определен'
    }
}

const parseReferees = (firstReferee: string | undefined, secondReferee: string | undefined) => {
    if (!firstReferee && !secondReferee) {
        return 'судьи не назначены';
    }

    if (!firstReferee) {
        return `${secondReferee}`;
    }

    if (!secondReferee) {
        return `${firstReferee}`;
    }

    return `${firstReferee}, ${secondReferee}`;
}

const CustomEvent = ({ event }: { event: CalendarEvent}) => {

    return (
        <div
            title={`${event.homeTeam} vs ${event.awayTeam}\nСудьи: ${event.firstReferee || '-'} / ${event.secondReferee || '-'}\nГруппа: ${event.group}\nАдрес: ${event.address}`}
            className={`event-item event-item_${Number(!!event.firstReferee) + Number(!!event.secondReferee)}`}
        >
            <strong>({event.group}) {event.homeTeam} - {event.awayTeam}</strong>
        </div>
    );
};

type MatchCalendarProps = {
    eventsList: CalendarEvent[];
}

const MatchCalendar = ({ eventsList }: MatchCalendarProps) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (eventsList) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEvents(eventsList);
        }
    }, [eventsList]);

    const handleSelectEvent = (event: CalendarEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const formats = {
        monthHeaderFormat: 'LLLL yyyy',
        dayHeaderFormat: 'dd MMMM yyyy',
    };

    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>(Views.MONTH);

    const handleNavigate = useCallback((newDate: Date) => {
        setDate(newDate);
    }, [date]);

    const handleView = useCallback((newView: View) => {
        setView(newView);
    }, []);

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                formats={formats}
                components={{
                    event: CustomEvent
                }}
                date={date}
                view={view}
                popup
                onNavigate={handleNavigate}
                onView={handleView}
                onSelectEvent={handleSelectEvent}
                messages={{
                    next: 'Вперед',
                    previous: 'Назад',
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                    agenda: 'Повестка',
                    date: 'Дата',
                    time: 'Время',
                    event: 'Событие',
                    showMore: (count: number) => `+${count} ещё`,
                    noEventsInRange: 'Нет событий за выбранный период'
                }}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={`#${selectedEvent?.matchNumber} ${selectedEvent?.homeTeam} — ${selectedEvent?.awayTeam}`}
            >
                <div className='match-info'>
                    <span className='match-info__item'>
                        <strong>Наименование турнира: </strong>{parseTournament(selectedEvent?.group)}
                    </span>
                    <span className='match-info__item'>
                        <strong>Дата проведения: </strong>{selectedEvent?.date} {selectedEvent?.startTime}
                    </span>
                    <span className='match-info__item'>
                        <strong>Адрес зала: </strong>{selectedEvent?.address}
                    </span>
                    {selectedEvent?.gamesCount && (
                        <span className='match-info__item'>
                            <strong>Количество игр: </strong>{selectedEvent.gamesCount}
                        </span>
                    )}
                    {selectedEvent?.additionalInfo && (
                        <span className='match-info__item'>
                            <strong>Дополнительная информация: </strong>{selectedEvent.additionalInfo}
                        </span>
                    )}
                    <span className='match-info__item'>
                        <strong>Назначенные судьи: </strong>{parseReferees(selectedEvent?.firstReferee, selectedEvent?.secondReferee)}
                    </span>
                </div>
            </Modal>
        </div>
    );
};

export default MatchCalendar;