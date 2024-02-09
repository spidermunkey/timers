import Timers from "../html/views/Timers.js"
import Home from "../html/views/Home.js"

const navigateTo = url => {
  history.pushState(null,null,url);
  router();
}

const swapView = (html) => {
  $('.dashboard').innerHTML = html;
}

const router = async () => {
  const routes = [
    {
      path: "/",
      view: Home
    },
    {
      path: "/timers",
      view: Timers
    },
    // {
    //   path: "/trackers",
    //   view: () => console.log("viewing trackers")
    // },
    // {
    //   path: "/pomodoro",
    //   view: () => console.log("viewing pomodoro")
    // },
    // {
    //   path: "/analytics",
    //   view: () => console.log("viewing analytics")
    // }
  ]

  // test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();
  swapView(await view.getHTML())

  console.log(potentialMatches);
  console.log(match)
  console.log(match.route.view)
}


window.addEventListener("popstate",router);

document.addEventListener("DOMContentLoaded", () => {

  document.body.addEventListener("click", e => {
    if (e.target.closest("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.closest("[data-link").href);
    }
  })

  router();
})