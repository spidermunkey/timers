export const dashboardHTML = `
<div class="pg-1">

  <div class="col-1 now-playing-column">

    <div class="current-timer">

        <div class="np-wrapper">

          <div class="ct-wrapper">
          <div class="section-title">Now-Playing</div>
    
          <div class="section-time-slot"> 
            <div class="time-slot"></div> 
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

        <div class="timer-notes">
        <div class="timer-note-title">Notes</div>
        <div class="create-note"> <textarea name="note" id="note" cols="30" rows="10"></textarea> </div>
        <div class="btn-add-note"> 
        <span class="create">Create Note </span>
      </div>
        </div>
        <div class="current-dashboard-label">icon + current page</div>

    </div>

    <div class="timer-list-names">
      <div class="section-title">Other Timers </div>
      <ul class="namelist">

      </ul>
    </div>


  </div>

  <div class="col-2">
    <div class="module-quick-notes">
      <div class="quick-note-wall">Notes This Week</div>

    </div>

    <div class="module-monthly-indicators"></div>
  </div>
</div>

<div class="pg-2">
  <div class="row-1">
    <div class="page-header">
      <div class="label">
        <span>Task/Timer List</span>
      </div>
      <div class="search">search</div>
    </div>
  </div>

  <div class="row-2">
    <div class="col-1">
      <div class="timer-list"></div>
    </div>
    <div class="col-2">
      <div class="module-create-timer">
        create-timer
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
