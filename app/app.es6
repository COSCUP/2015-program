import React from "react";
import Router, {Route, DefaultRoute, NotFoundRoute} from "react-router";
import Application from "./Application";
import Home from "./Home/Home.es6";

const routes = (
  <Route name="app" path="/" handler={Application} ignoreScrollBehavior={true}>
    <Route name="session" path="/:event" handler={Home} />
    <NotFoundRoute handler={Home} />
  </Route>
  );

const load = (routerState) => {
  return Promise.all(
    routerState.routes.filter((route) => {
      return route.handler.load;
    }).map((route) => {
      return route.handler.load(routerState.params);
    }));
};


Router.run(routes, (Handler, state) => {
  load(state).then(() => {
    React.render(
      <Handler {...state} />,
      document.getElementById("react-root")
      );
  });
});
