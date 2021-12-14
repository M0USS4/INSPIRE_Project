const data = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(),
    end: new Date(),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 9, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 101,
    title: 'Appointment with Kweku',
    start: new Date(2021, 11, 7, 15, 0, 0),
    end: new Date(2021, 11, 7, 16, 0, 0),
    name: 'Test Name', type: 'appointment', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 10, 0, 0),
    end: new Date(2021, 11, 8, 10, 0, 0),
    name: 'Nom Prenom',
    type: 'appointment',
    status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 11, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 12, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 13, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 14, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 15, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 8, 16, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2022, 11, 8, 17, 0, 0),
    end: new Date(2022, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },

  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 10, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 11, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 12, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 13, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 14, 0, 0),
    end: new Date(2021, 11, 10, 15, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 15, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 10, 16, 0, 0),
    end: new Date(2021, 11, 2, 0, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 111,
    title: 'Long Event',
    start: new Date(2022, 0, 3, 15, 0, 0),
    end: new Date(2022, 0, 3, 16, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2021, 11, 13, 0, 0, 0),
    end: new Date(2021, 11, 14, 0, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2021, 11, 6, 10, 0, 0),
    end: new Date(2021, 11, 7, 11, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2021, 11, 9, 14, 0, 0),
    end: new Date(2021, 11, 9, 15, 0, 0),
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2021, 11, 11),
    end: new Date(2021, 11, 13),
    desc: 'Big conference for important people',
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2021, 11, 5, 10, 30, 0, 0),
    end: new Date(2021, 11, 5, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    name: 'Nom Prenom', type: 'block', status: true
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2021, 3, 12, 12, 14, 0, 0),
    end: new Date(2021, 3, 12, 13, 15, 0, 0),
    desc: 'Power lunch',
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2021, 3, 12, 14, 0, 0, 0),
    end: new Date(2021, 3, 12, 15, 0, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2021, 3, 12, 17, 0, 0, 0),
    end: new Date(2021, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2021, 3, 12, 20, 0, 0, 0),
    end: new Date(2021, 3, 12, 21, 0, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2021, 3, 13, 7, 0, 0),
    end: new Date(2021, 3, 13, 10, 30, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2021, 3, 17, 19, 30, 0),
    end: new Date(2021, 3, 18, 2, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2021, 3, 20, 19, 30, 0),
    end: new Date(2021, 3, 22, 2, 0, 0),
    name: 'Nom Prenom', type: 'appointment', status: true
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    name: 'Nom Prenom', type: 'appointment', status: true
  }
];

export default data;

