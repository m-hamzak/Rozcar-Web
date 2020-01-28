import { Route } from "react-router-dom";
import React from 'react';
const AppRoute = ({ NavBar, component, ...routeProps }) => {
  return (
    <Route {...routeProps} render={(props) => {
      return (
        <div>
          {React.createElement(NavBar, { routeData: routeProps })}
          {React.createElement(component, props)}
        </div>
      );
    }} />
  );
}

export default AppRoute;