import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login2";
import Register from "../components/Register/Register2";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import Home from "../components/Home/Home";
import CvTemplate from "../components/CvTemplate/CvTemplate";
import GroupRole from "../components/GroupRole/GroupRole";
import EditJob from "../components/Job/EditJob";
import Job from "../components/Job/Job";
import CompanyJob from "../components/Company/CompanyJob";
import CompanyJobStatus from "../components/Company/CompanyJobStatus";
import JobInfo from "../components/Job/JobInfo";
import NotFound from "../components/NotFound/NotFound";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/accounts" component={Users} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <PrivateRoutes path="/edit-jobs" component={EditJob} />
        <PrivateRoutes path="/cv-template" component={CvTemplate} />
        <PrivateRoutes path="/job" component={Job} />
        <PrivateRoutes path="/company-jobs" component={CompanyJob} />
        <PrivateRoutes
          path="/company-jobs-status"
          component={CompanyJobStatus}
        />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/job-info/:id">
          <JobInfo />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
