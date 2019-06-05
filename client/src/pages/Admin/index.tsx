import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import Overview from "./Overview";
import Profile from "./Profile";

class Admin extends React.Component<any, any> {
  public static propTypes = {
    businessData: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  public render() {
    const { businessData, match } = this.props;
    return (
      <Dashboard>
        <Switch>
          <Route exact path={match.url} component={Overview} />
          <Route
            exact
            path={`${match.url}/profile`}
            render={() => <Profile profile={businessData.profile} />}
          />
          <Route render={() => <Redirect to={match.url} />} />
        </Switch>
      </Dashboard>
    );
  }
}

const reduxProps = (store: any) => ({
  businessData: store.admin.businessData
});

export default connect(
  reduxProps,
  null
)(Admin);
