import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHTML() {
    return `<div class="dashboard" location="home">
    <div class="daily-metrics">
      <div class="task-metric">
          <div class="mod module-task-complete">
              <div class="t-completed">
    
                  <span class="label">Daily Tasks</span>
                  <div class="result">
                      <span class="res comped">5</span>
                      <span class="divider">/</span>
                      <span class="res total">10</span>
                  </div>
    
              </div>
              <div class="indicator">
                  <div class="progress"></div>
              </div>
              <div class="perf-reccomendations">
                  <ul>
                      <li class="over-perf">
                          <span class="marker">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16px" width="16px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                          </span>
                          <span>above average:</span>
                          <div>Code</div>
                      </li>
                      <li class="under-perf">
                          <span class="marker">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="rotate(180)" data-rotation="undefined" height="16px" width="16px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                          </span>
                          <span>below average:</span>
                          <div>Reading</div>
                      </li>
    
                  </ul>
              </div>
              <div class="create-todo">
                  <span>Create Todo List</span>
              </div>
          </div>
          <div class="mod module-weekly-completed">
              <span class="module-title">Time Allocated</span>
              <div class="allocations">
                  <div class="task-category">
    
                      <span class="label">Rest</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
    
                  </div>
    
                  <div class="task-category">
                      <span class="label">Work</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
                  </div>
                  <div class="task-category">
                      <span class="label">Study</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
                  </div>
                  <div class="task-category">
                      <span class="label">Excercise</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
                  </div>
                  <div class="task-category">
                      <span class="label">Code</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
                  </div>
                  <div class="task-category">
                      <span class="label">Misc</span>
    
                      <div class="progress-wrapper">
    
                          <div class="inner-indicator">
                              <svg width="64" height="64" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
                                  <circle r="30" cx="32" cy="32" fill="transparent" stroke="#e0e0e0" stroke-width="4px" stroke-dasharray="201px" stroke-dashoffset="0"></circle>
                                  <circle r="30" cx="32" cy="32" stroke="#00c93d" stroke-width="4px" stroke-linecap="round" stroke-dashoffset="94.25" fill="transparent" stroke-dasharray="188.5"></circle>
                                </svg>
                          </div>
    
                          <div class="daily-indicator">
                              <span class="daily-label">0/8 hrs</span>
                          </div>
    
                      </div>
    
                      <div class="weekly">
                          <div class="days">
                              <div class="day mon">
                                  <span>M</span>
                              </div>
                              <div class="day tue">
                                  <span>T</span>
                              </div>
                              <div class="day wed">
                                  <span>W</span>
                              </div>
                              <div class="day thur">
                                  <span>T</span>
                              </div>
                              <div class="day fri">
                                  <span>F</span>
                              </div>
                              <div class="day sat">
                                  <span>S</span>
                              </div>
                              <div class="day sun">
                                  <span>S</span>
                              </div>
    
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- <div class="mod module-performance-updates">
    
          </div> -->
      </div>
    </div>
    <div class="panel-wrapper">
      <div class="task-module" module="timers">
        <div class="preview">
          <div class="preview-icon">
              <span class="icon">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-7 -8 40 40"
                  height="40px"
                  width="40px"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.25 0a.75.75 0 000 1.5h1v1.278a9.955 9.955 0 00-5.635 2.276L4.28 3.72a.75.75 0 00-1.06 1.06l1.315 1.316A9.962 9.962 0 002 12.75c0 5.523 4.477 10 10 10s10-4.477 10-10a9.962 9.962 0 00-2.535-6.654L20.78 4.78a.75.75 0 00-1.06-1.06l-1.334 1.334a9.955 9.955 0 00-5.636-2.276V1.5h1a.75.75 0 000-1.5h-3.5zM12 21.25a8.5 8.5 0 100-17 8.5 8.5 0 000 17zm4.03-12.53a.75.75 0 010 1.06l-2.381 2.382a1.75 1.75 0 11-1.06-1.06l2.38-2.382a.75.75 0 011.061 0z"
                  ></path>
                </svg>
              </span>
          </div>
          <div class="preview-title">
              <span class="ttl">Timers</span>
    
          </div>
          <div class="task-list">
              <ul>
                  <li>Clean</li>
                  <li>Cook</li>
                  <li>Meditate</li>
              </ul>
          </div>
        </div>
    
        <div class="now-playing">
          <div class="btn-play-np">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
          </div>
          <div class="np-ttl">Now Playing</div>
          <div class="np-time-slot">0:00</div>
        </div>
      </div>
      <div class="task-module" module="tasks">
        <div class="preview">
          <div class="preview-icon">
              <span class="icon">                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-8 -8 40 40"
                  height="40px"
                  width="40px"
                >
                  <path
                    d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"
                  ></path>
                  <path
                    d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"
                  ></path>
                </svg></span>
          </div>
          <div class="preview-title">
              <span class="ttl">Tasks</span>
    
          </div>
          <div class="task-list">
              <ul>
                  <li>Study</li>
                  <li>Work</li>
                  <li>Sleep</li>
                  <li>Workout</li>
                  <li>Read</li>
                  <li>De-stress</li>
                  <li>Code</li>
                  <li>Hack Session</li>
                  <li>Clean</li>
              </ul>
          </div>
        </div>
    
        <div class="now-playing">
          <div class="btn-play-np">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
          </div>
          <div class="np-ttl">Now Playing</div>
          <div class="np-time-slot">0:00/1:30</div>
        </div>
      </div>
      <div class="task-module" module="pomodoro">
        <div class="preview">
          <div class="preview-icon">
              <span class="icon">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-8 -8 40 40"
                  height="40px"
                  width="40px"
                >
                  <path
                    d="M11.998 2.5A9.503 9.503 0 003.378 8H5.75a.75.75 0 010 1.5H2a1 1 0 01-1-1V4.75a.75.75 0 011.5 0v1.697A10.997 10.997 0 0111.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 011.5-.037 9.5 9.5 0 009.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5z"
                  ></path>
                  <path
                    d="M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z"
                  ></path>
                </svg>
              </span>
          </div>
          <div class="preview-title">
              <span class="ttl">Pomodoro</span>
    
          </div>
          <div class="task-list">
              <ul>
                  <li>Classic</li>
                  <li>Default</li>
                  <li>60/10</li>
                  <li>30/5</li>
              </ul>
          </div>
        </div>
        <div class="now-playing">
          <div class="btn-play-np">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
          </div>
          <div class="np-ttl">Now Playing</div>
          <div class="np-time-slot"> 0:00/1:30 <span class="session"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 -9 42 42" height="40px" width="">
              <circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg></span>1</div>
        </div>
      </div>
    </div>
    <div class="metrics-wrapper">
      <div class="btn-scrollTo">scroll to metrics</div>
      <div class="metrics-timeline">
          <div class="timeline">Today</div>
          <div class="timeline">Week</div>
          <div class="timeline">Month</div>
          <div class="timeline">Year</div>
      </div>
      <div class="metrics-graph">
          <div class="m-graph"></div>
          <div class="graph-type-banner"></div>
    
      </div>
    </div>
    </div>`
  }
}