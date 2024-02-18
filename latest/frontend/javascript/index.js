import Timers from "./views/Timers.js";
import Home from "./views/Home.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const swapView = async (view) => {
  $(".dashboard").innerHTML = await view.getHTML();
  await view.hydrate();
};
const renderView = async (view) => {
  $(".dashboard").innerHTML = "";
  await view.render($(".dashboard"));
};

const router = async () => {
  const routes = [
    {
      path: "/",
      view: Home,
    },
    {
      path: "/timers",
      view: Timers,
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
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  let view;

  if (!match.route.view.once) {
    view = new match.route.view();
  } else view = match.route.view;

  if (view.render) renderView(view);
  else swapView(view);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.closest("[data-link").href);
    }
  });

  router();
});
