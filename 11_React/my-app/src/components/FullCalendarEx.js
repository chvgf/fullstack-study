import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
  { title: 'Meeting', start: new Date() },
  { title: 'event 1', date: '2023-03-01' },
  { title: 'event 2', start: '2023-03-02', end: '2023-03-05' },
];

function FullCalendarEx() {
  return (
    <div>
      <h1>FullCalendar 기본</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends
        events={events}
        // eventContent={renderEventContent}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default FullCalendarEx;