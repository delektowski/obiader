import React, { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { pl } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useHandleDinnerDayList } from "./hooks/useHandleDinnerDayList";

const locales = {
  pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => {
    return startOfWeek(new Date(), { weekStartsOn: 1 });
  },
  getDay,
  locales,
});

const MyCalendar = () => {
  const [dinnerDayList, getEventsData, handleDinnerDayList] =
    useHandleDinnerDayList();

  useEffect(() => {
    getEventsData();
  },[getEventsData]);

  return (
    <div>
      <Calendar
        onView={() => null}
        view="month"
        localizer={localizer}
        events={dinnerDayList}
        onSelectSlot={handleDinnerDayList}
        selectable={true}
        culture="pl"
        style={{ height: "100vh", padding: "1rem" }}
      />
    </div>
  );
};

export default MyCalendar;
