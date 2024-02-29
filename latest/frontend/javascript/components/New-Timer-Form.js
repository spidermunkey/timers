export class NewTimerForm {
    constructor(){

    }

    getHTML() {
        return `
        <div class="new-timer-form">
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
        <form action="#">
            <div class="form-timer-title">
            <input type="text" placeholder="Title" />
            </div>
            <div class="form-timer-time-slot">
            <div class="time-hours slot">
                <input type="text" class="z z-hour t" placeholder="0" />
                <input type="text" class="n n-hour t" placeholder="0" />
                <div class="t-label">h</div>
            </div>
            <div class="time-minutes slot">
                <input type="text" class="z z-minute t" placeholder="0" />
                <input type="text" class="n n-minute t" placeholder="0" />
                <div class="t-label">m</div>
            </div>
            <div class="time-seconds slot">
                <input type="text" class="z z-second t" placeholder="0" />
                <input type="text" class="n n-second t" placeholder="0" />
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
  </div>
  
        `
    }
}
