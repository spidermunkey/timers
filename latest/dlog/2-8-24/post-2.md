one last note on hangups...

I think I bite of more than I can chew with trying to build single page applications with being that these are my first full stack projects.

I get most of the way there but when I'ts time to actually use it I find most of the data for the application is hard coded in some way.

I should go all the way back to the drawing board and maybe try server side rendering with templates or maybe even php...

Reason being, when the main idea is to build it for my personal use and the attempt to put it out in the world for others to use or learn from if they choose but, I can't make it beyond the honeymoon phase with these apps. Everytime I get to interact with api in a persistent way, meaning try to edit, upload or delete, I find myself backtracking from a somewhat tangled mess. I think I know what it's supposed to do until I just want to open it up and use it without consulting the code editor or database at all.

If I where to rewrite the apps from scratch I can cover all bases, like permissions, sessions, cookies, and most importantly the page. I get hung up on pages. Whenever I want to create another page or add functionality to a page I have to untangle so many things that are in the same place and essential rebuild the app to work around it. I think the knowledge gaps are steming from how I get the data from backend to frontend, currently its get all the data from backend then figure out how to display it on the frontend. However if I work my way from the backend I believe I can compartmentalize the actions taken into managable bites so lets just finish the scappy version 2 and start a new from the backend.

step one. auth portal.
step two server side rendered components.
{
dashboards: fetch and sendback timer components... thats it!
forms: add/edit timer validate inputs thats it!
timer: component that plays pauses but also logs its data
buttons: [delete, edit, create],
=> create appropriate forms on the frontend that send back
components rendered in the timer but not of the timer itself!
visualizers: fetch data predefined categories
}

now, with that mapped out I can create all of these components on the backend and send them based on what actions a user takes.
the benifit of this would be keeping all of the relevant logic within relevant chunks of code.

my current workflow is ideal when you know how everything works already but seeing as features keep comming to mind on the fly it feels very awkard creating the html, styling it, adding javascript to make it work then hopping to another editor to make sure it works on the backend... sounds like the right thing in my head, easy to reason about after the fact. In the process of developing however, results in anything added or modified being added and modified it 5 different places which feels wrong in so many ways.
