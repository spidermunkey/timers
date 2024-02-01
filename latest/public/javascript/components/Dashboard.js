export const dashboardHTML = `
<div class="pg-1">
  <div class="col-1">
    <div class="current-timer">
      <div class="section-title">Now-Playing</div>
    </div>

    <div class="indicators">
      <div class="daily-indicator">daily indicator</div>
      <div class="weekly-indicator">weekly indicator</div>
    </div>

    <div class="current-dashboard-label">icon + current page</div>
  </div>

  <div class="col-2">
    <div class="module-quick-notes">
      <div class="btn-add-note"> + new note </div>
      <div class="create-note"> <textarea name="note" id="note" cols="30" rows="10">NOTES</textarea> </div>
      <div class="btn-submite-note">Update</div>
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
