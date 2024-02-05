export const dashboardHTML = `
<div class="pg-1">

  <div class="col-1 now-playing-column">

    <div class="current-timer">

        <div class="np-wrapper">

          <div class="ct-wrapper">
          <div class="section-title">Now-Playing</div>
    
          <div class="section-time-slot"> 
            <div class="time-slot">00:00:00</div> 
          </div>

          </div>

          <div class="timer--clock-controls">
            <div class="ctrl-wrapper">
                <div class="play ctrl current">
                    <span class="control">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                    </span>
                </div>
                <div class="pause ctrl">
                    <span class="control">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  height="40px" width="40px">
                            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path>
                        </svg>
                    </span>
                </div>
            </div>
          </div>

          <div class="indicators">
            <div class="daily-indicator"> </div>
            <div class="weekly-indicator"></div>
          </div>

        </div>

        <div class="search">
        <input type="text" placeholder="search timers">
      </div>
        <div class="timer-list">
        </div>


    </div>




  </div>

  <div class="col-2 task-insights">

    <div class="tab-bar">
    <div class="tab" tab="sessions">Sessions</div>

      <div class="tab" tab="notes">Notes</div>
      <div class="tab" tab="analytics">Analytics</div>
    </div>
    <div class="tab-panel">
      <div class="module module-quick-notes" module="notes" state="active">
        <div class="quick-note-wall">Notes This Week</div>
      </div>
      <div class="module module-monthly-indicators" module="analytics">Montly Analytics</div>
      <div class="module module-task-session-data" module="sessions">Task Session Data</div>
    </div>


  </div>

</div>

<div class="pg-2">
  <div class="row-1">
    <div class="page-header">


    </div>
  </div>

  <div class="row-2">
    <div class="col-1">
      <div class="timer-list"></div>
    </div>
    <div class="col-2">
      <div class="module-create-timer">
      <div class="create-timer-form">
        <div class="form-close">
        <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="-1 -1 24 24"
        height="24px"
        width="24px"
      >
        <path
          d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
        ></path>
      </svg>
        </div>
        <div class="form">
          <form action="#" id="new-timer">
            <div class="form-timer-title">
              <input type="text" placeholder="Title">
            </div>
            <div class="form-timer-time-slot">
              <div class="time-hours slot">
                <input type="text" class="z z-hour t" placeholder="0">
                <input type="text" class="n n-hour t" placeholder="0">
                <div class="t-label">h</div>
              </div>
              <div class="time-minutes slot">
                <input type="text" class="z z-minute t" placeholder="0">
                <input type="text" class="n n-minute t" placeholder="0">
                <div class="t-label">m</div>
              </div>
              <div class="time-seconds slot">
                <input type="text" class="z z-second t" placeholder="0">
                <input type="text" class="n n-second t" placeholder="0">
                <div class="t-label">s</div>
              </div>
            </div>
            <div class="form-timer-days">
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">M</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">T</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">W</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">T</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">F</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">S</span>
              </div>
              <div class="d">
                <span class="d-box"></span>
                <span class="d-label">S</span>
              </div>

              <div class="d-which">
                <div class="which every">
                  <div class="w w-box e-box"></div>
                  <div class="w w-label e-label">everday</div>
                </div>
                <div class="which never">
                  <div class="w w-box nv-box"></div>
                  <div class="w w-label nv-label">never</div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="form-submit">
          <button type="submit" form="new-timer">Add Timer</button>
        </div>
      </div>
      <div class="module-title">Create Timer</div>
      </div>
      <div class="tab-wrapper">
        <div class="tabs">
          <div class="tab session-tab">Sessions</div>
          <div class="tab outlook-tab">Outlook</div>
        </div>
        <div class="current-tab"></div>
      </div>
    </div>
  </div>
</div>

`;
