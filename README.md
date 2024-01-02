# timers
for daily goals

## Organizing my life

### Start with why
Life is hard, sometimes when it sucks, I have a tendency to regress.
In my youth I turned to drugs.
As I grew older I turned inside, anxious to be alone.
Then I began to turn to outside sources and influences.
I've come to believe that if I am to persist I must turn to daily habits.

I believe what you do every day has the most influence on who and how you become.

## Functionality

1) Define Daily Goals
    - Each Daily Goal has a set time to completion (ex: read | 2 hours)
    - On Play Timer will count down
    - On Pause Timer will stop counting
    - On Stop || Run To Completion timer will log the task as completed
    - Each play/pause/stop action will log the action and length of  time between actions to a daily log file for analytics

2) Organize Daily Goals
    - The main interface for the app will display a fresh display for the goals laid out for the day
    (ex: read 2hrs | workout 1hr | code | 3hours)

    - They will be organized as set for the day
    (ex: Thursday (read | code | workout) || Friday (workout | read | code))

    - They may be completed in any order however the order of completion will be logged to analytics

    - At the 0th hour of every day the progress will be logged and displayed and a new display will be set
    - At the start of each day the user must press start to begin each timer

    - After startDay function the first timer will automatically start.After 60minutes of a running timer or the completion of a time, the timing function will be paused and display a message requiring the user to resume in order to confirm that the task is being done.

    - At the 0th hour of every monday total hours for each task will be displayed
    
    - At the 0th hour of every monday a list of completed/defined tasks checklist will be displayed

    - At the 0th hour of 1st of every month a total hours and total tasks completed will be displayed

    - A running total of hours and tasks will be shown until the 1st of every year when the totals for the year are reset on the display and logged to the database

    - A users profile will show all of the previously metioned logs as well as a lifetime cumilative total.


## Outlook

1) Intergrate with calendar app

2) Intergrate with goals app, goal --> prequesites for completion --> associated timer --> associated day(s)

3) Update Styles regularly

4) Show analytics and analytical actions 