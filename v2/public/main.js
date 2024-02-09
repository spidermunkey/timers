import { api } from "./javascript/api/app.js"
import { Timer, TimeTracker } from "./javascript/components/Timer.js";

/*
    TODO

    UI UPDATES

        scale down timer size
        redo add menu
        add sounds
        timer blinker (playing|pausing|pomodoro indicator)


    FEATURE UPDATES
        add pomodoro timer
        add extend current timer feature
    
    API UPDATES
    tracker tags && logging
        ** {
            select from quick task [over-arching tasks]
                -- adds up weekly total
                -- tracks times started and ended across week
                -- tracks over achieved, under achieved, achieved

            select timing goals for under over tasks
                -- read *over* 20hrs/week
                -- code *over* 20hrs/week
                -- clean *under* 8hrs/week
            advanced settings for specific goals and time management

            [task]('specifics') *in* allotedTime {on} |day or week of| 
                -- [read] ('building a second brain') *under* 4hrs/{this}|monday||week|
        }

        ** {
            on start/stop log to server [taskname,id] => started stoped finished for [time]
        }

        ** {
            add tasklog collection to db 
                tasks
                task-logs
        }
*/

const timerTab = $("#timers");
const trackerTab = $("#trackers");

const dashboard = $(".dashboard");
const appRoot = $("#app");

let trackers, timers;

const ready = (async () => {
  await api.getTimers((data) => {
    const fragment = frag();
    const renderFilteredMap = (props) => {
      const t = new Timer({ props });
      return !!t.isToday;
    };

    timers = data.filter(renderFilteredMap).map((props) => {
      const timer = new Timer({ props });
      return timer;
    });

    timers.length == 0
      ? (fragment.innerHTML = "No Trackers Today")
      : timers.forEach((timer) => {
          timer.render(fragment);
        });
  });

  await api.getTrackers((data) => {
    const fragment = frag();
    if (data.length == 0) fragment.innerHTML = "No Trackers";
    else
      trackers = data.map((props) => {
        const tracker = new TimeTracker({ props });
        tracker.render(fragment);
        return tracker;
      });
  });

  return true;
})();

const readySetGo = async () => {
  await ready;
  const test = await api.getTimers();
  console.dir({
    description: "API META DATA",
    trackers,
    timers,
  });
};

readySetGo();
