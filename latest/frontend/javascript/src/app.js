/* TODO

  --> create single source of truth for currently running timers

*/

const app = {
  current_time: "",

  current_timer: {
    playing: false,
    reference: undefined,
    get homePageReference() {
      return $('.task-module[module="timers"] .now-playing');
    },
    get samePageReference() {
      return $('#app[location="timer"] .current-timer');
    },
  },

  current_task: {
    playing: false,
    reference: undefined,
    get homePageReference() {
      return $('.task-module[module="tasks"] .now-playing');
    },
    get samePageReference() {
      return $('#app[location="task"] .current-timer');
    },
  },

  current_pomo: {
    playing: false,
  },

  current_tab: "",

  data: {},
};
