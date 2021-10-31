import { useCallback, useState } from "react";
import axios from "axios";

export function useHandleDinnerDayList() {
  const [dinnerDayList, setDinnerDayList] = useState([]);

  function isDayEventRedundant(dinnerDay) {
    return dinnerDayList.some((item) => {
      return parseInt(item.id) === dinnerDay.id;
    });
  }

  function handleDinnerDayList(selectedEventDay) {
    const dinnerDay = {
      id: new Date(selectedEventDay.start).getTime(),
      title: "Obiad",
      allDay: true,
      start: new Date(selectedEventDay.start),
      end: new Date(selectedEventDay.start),
    };

    if (isDayEventRedundant(dinnerDay)) {
      return;
    }
    saveEventData(dinnerDay);
  }

  const getEventsData = useCallback(() => {
    axios
      .get("http://139.162.131.141:2021/eventsData", {
        headers: {
      
          "content-type": "application/json",
          accept: "*/*",
      
        },
      })
      .then((res) => {
        console.log("res", res);
        setDinnerDayList(res.data.eventsData);
      });
  }, []);

  function saveEventData(eventData) {
    axios
      .post("http://139.162.131.141:2021/eventsData", eventData)
      .then((_) => {
        getEventsData();
      });
  }

  return [dinnerDayList, getEventsData, handleDinnerDayList];
}
