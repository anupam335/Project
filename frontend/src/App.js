import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/registration/register.component';
import AdminProfile from './components/profile/admin/adminProfile.component';
import CustomerList from './components/profile/admin/CustomerList';
import WorkerList from './components/profile/admin/WorkerList';
import SearchCustomer from './components/profile/admin/SearchCustomer';
import SearchWorker from './components/profile/admin/SearchWorker';
import SearchByWorkCat from './components/profile/admin/SearchByWorkCat';
import DeleteWorker from './components/profile/admin/DeleteWorker';
import DeleteCustomer from './components/profile/admin/DeleteCustomer';
import ViewAdminProfile from './components/profile/admin/ViewAdminProfile';
import ViewCustProfile from './components/profile/customer/ViewCustProfile'
import CustomerProfiles from './components/profile/customer/customerProfile.component';
import UpdateAdminProfile from './components/profile/admin/UpdateAdminProfile';
import UpdateCustProfile from './components/profile/customer/UpdateCustProfile';
import CustWorkerList from './components/profile/customer/CustWorkerList';
import SearchCustWorker from './components/profile/customer/SearchCustWorker';
import DisplayJobs from './components/profile/customer/DisplayJobs';
import DeleteJobs from './components/profile/customer/DeleteJobs';
import WorkerProfiles from './components/profile/worker/workerProfile.component';
import ViewProfileWorker from './components/profile/worker/ViewProfileWorker';
import UpdateWorkerProfile from './components/profile/worker/UpdateWorkerProfile';
import RegisterWorkDesc from './components/profile/customer/WorkDesc';
import workerRegister from './components/registration/worker.component';
import JobApplications from './components/profile/customer/JobApplications';
import SuccessJobs from './components/profile/worker/SuccessJobs';
import SearchCustWorkHist from './components/profile/admin/SearchCustWorkHist';
import WorkHistory from './components/profile/customer/WorkHistory';
import contact from './components/resources/contact';

const App = () => {

  return (
    <div>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/contact" component={contact} exact />
        <Route path="/profile/ADMIN" component={AdminProfile} exact />
        <Route path="/profile/CUSTOMER" component={CustomerProfiles} exact />
        <Route path="/profile/WORKER" component={WorkerProfiles} exact />
        <Route path="/profile/ViewAdminProfile/:id" component={ViewAdminProfile} exact />
        <Route path="/profile/ViewProfileCust/:id" component={ViewCustProfile} exact />
        <Route path="/profile/ViewProfileWorker/:id" component={ViewProfileWorker} exact />
        <Route path="/add-customer" component={Register} exact />
        <Route path="/add-worker" component={workerRegister} exact />
        <Route path="/customer-list" component={CustomerList} exact />
        <Route path="/worker-list" component={WorkerList} exact />
        <Route path="/cust-worker-list" component={CustWorkerList} exact />
        <Route path="/profile/add-work/:id" component={RegisterWorkDesc} exact />
        <Route path="/search-customer" component={SearchCustomer} exact />
        <Route path="/search-worker" component={SearchWorker} exact />
        <Route path="/search-cust-worker" component={SearchCustWorker} exact />
        <Route path="/search-worker-cat" component={SearchByWorkCat} exact />
        <Route path="/delete-worker" component={DeleteWorker} exact />
        <Route path="/delete-customer" component={DeleteCustomer} exact />
        <Route path="/display-jobs" component={DisplayJobs} exact />
        <Route path="/delete-jobs" component={DeleteJobs} exact />
        <Route path="/update-admin-profile" component={UpdateAdminProfile} exact />
        <Route path="/update-cust-profile" component={UpdateCustProfile} exact />
        <Route path="/update-worker-profile" component={UpdateWorkerProfile} exact />
        <Route path="/job-notifications" component={JobApplications} exact />
        <Route path="/successful-jobs" component={SuccessJobs} exact />
        <Route path="/search-workhist" component={SearchCustWorkHist} exact />
        <Route path="/user-work-history" component={WorkHistory} exact />
        <Route path="/login" component={Login} exact />
      </Router>
    </div>
  );
}

export default App;
