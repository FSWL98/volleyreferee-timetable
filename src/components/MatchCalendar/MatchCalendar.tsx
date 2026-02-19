import { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views, type View} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ru } from 'date-fns/locale/ru'; // для русской локализации
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { type CalendarEvent } from "../../utils/types.ts";
import './MatchCalendar.css';

// Настройка локализации
const locales = {
    'ru': ru
};

const localizer = dateFnsLocalizer({
    format: (date: Date, formatStr: string): string => {
        return format(date, formatStr, { locale: ru });
    },

    // Парсинг строки в дату с локализацией
    parse: (value: string, formatStr: string): Date | null => {
        // parse из date-fns может вернуть Date или null
        return parse(value, formatStr, new Date(), { locale: ru });
    },

    // Функция для определения первого дня недели (понедельник для ru)
    startOfWeek: (date: Date): Date => {
        return startOfWeek(date, { locale: ru });
    },

    // Функция для получения дня недели (0 - воскресенье, 1 - понедельник, ...)
    getDay: (date: Date): number => {
        return getDay(date);
    },

    // Передаем словарь локалей
    locales
});

// Кастомный компонент для отображения события
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

// Основной компонент
const MatchCalendar = ({ eventsList }: MatchCalendarProps) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    useEffect(() => {
        if (eventsList) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEvents(eventsList);
        }
    }, [eventsList]);

    // Обработчик клика по событию
    const handleSelectEvent = (event: CalendarEvent) => {
        setSelectedEvent(event);
    };

    // Форматирование даты в заголовке
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
                // Кастомный рендеринг событий
                components={{
                    event: CustomEvent
                }}
                date={date}
                view={view}
                // Попап для событий, если их много в одном дне
                popup
                onNavigate={handleNavigate}
                onView={handleView}
                // Обработчик клика
                onSelectEvent={handleSelectEvent}
                // Русские названия месяцев и дней
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
        </div>
    );
};

export default MatchCalendar;