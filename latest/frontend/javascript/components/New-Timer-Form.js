export class NewTimerForm {
    constructor(){
        // TODO 
        /* 
            ADD TOP HEADER/LABEL TO FORM CLOSE AREA "NEW TIMER"
            SCROLL WHEEL AND CURSOR FOR SELECTING TIME INPUTS
            SUBMIT TO API FUNCTIONALITY
            ADD SUMBIT BUTTON

                                        <div class="ph-scroll">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
        */
    }

    getHTML() {
        return `
        <div class="new-timer">
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
                        <div class="ph-scroll z-scroll">
                            <div class="ph-scroll-container" slot="z1">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>
                        <div class="ph-scroll n-scroll">
                            <div class="ph-scroll-container" slot="n1">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>


                        <span class="input-slot" slot="z1" t="h">
                            <input type="text" class="z z-hour t" placeholder="" />
                            <div class="ph-scroll-trap"></div>
                        </span>
                        <span class="input-slot n-slot" slot="n1" t="h">
                            <input type="text" class="n n-hour t" placeholder="" />
                            <div class="ph-scroll-trap"></div>
                        </span>
                        <div class="t-label">h</div>
                    </div>


                    <div class="time-minutes slot">
                        <div class="ph-scroll z-scroll">
                            <div class="ph-scroll-container" slot="z2">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>
                        <div class="ph-scroll n-scroll">
                            <div class="ph-scroll-container" slot="n2">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>
                        <span class="input-slot" slot="z2">
                            <input type="text" class="z z-minute t" placeholder="" />
                            <div class="ph-scroll-trap"></div>
                        </span>
                        <span class="input-slot n-slot" slot="n2" t="n">
                            <input type="text" class="n n-minute t" placeholder="" />
                            <div class="ph-scroll-trap"></div>
                        </span>
                        <div class="t-label">m</div>
                    </div>



                    <div class="time-seconds slot">
                        <div class="ph-scroll z-scroll">
                            <div class="ph-scroll-container" slot="z3">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>
                        <div class="ph-scroll n-scroll">
                            <div class="ph-scroll-container" slot="n3">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>
                    <span class="input-slot" slot="z3">
                        <input type="text" class="z z-second t" placeholder="" />
                        <div class="ph-scroll-trap"></div>
                    </span>
                    <span class="input-slot n-slot" slot="n3" t="n">
                        <input type="text" class="n n-second t" placeholder="" />
                        <div class="ph-scroll-trap"></div>
                    </span>
                        <div class="t-label">s</div>
                    </div>
                </div>
            </form>
        </div>
  </div>
        </div>
        
  
        `
    }
}
