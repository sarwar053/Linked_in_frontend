
import { Route, Routes } from "react-router-dom"
import SignupForm from "./auth/signUp"
import LoginForm from "./auth/login"
import TermsOfService from "./Term_services/term_services"
import Home from "./pages/home/home"
import Browse_talent from "./pages/browse_talent/browse_talent"
import BorwsJobs from "./pages/browse_jobs/borwsJobs"
import How_it_works from "./pages/How_it_works/how_it_works"
import Pricing from "./pages/pricing/pricing"
import Post_jobs from "./pages/post_jobs/post_jobs.jsx"
import Worker_profile from "./worker_profile/worker_profile.jsx"
import WorkerDataInput from "./pages/workerDataInput/workerDataInput.jsx"
import ProtectedRoute from "./protectPage/protectPage.jsx"
import AdminDashboard from "./adminDashboard/adminDashboard.jsx"
import MessageInputPage from "./pages/contact/contact.jsx"
import Worker_details from "./pages/worker_details/workerDetails.jsx"
import ClientProfile from "./pages/clinte_Profile/clinteProfile.jsx"
import JobApplicationForm from "./pages/submitJobApplication/submitJobApplication.jsx"

import JobApplicationDashbord from "./adminDashboard/jobApplicationDashbord.jsx"

import AdminLogin from "./adminLogin/adminLogin.jsx"
import AdminProtectedRoute from "./adminProtect/adminProtect.jsx"
import ContactDashboard from "./adminDashboard/messageDashbord.jsx"


import ContactPage from "./pages/message/message.jsx"

function App() {
  return (
    <>
      <Routes>

        {/* public routes */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/term_services" element={<TermsOfService />} />
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse_talent />} />
        <Route path="/jobs" element={<BorwsJobs />} />
        <Route path="/how-it-works" element={<How_it_works />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/user/:id" element={<Worker_profile />} />

        {/* protected routes */}
        <Route path="/workerprofile" element={
          <ProtectedRoute>
            <WorkerDataInput />
          </ProtectedRoute>
        } />

        <Route path="/clintprofile" element={
          <ProtectedRoute>
            <ClientProfile />
          </ProtectedRoute>
        } />

        <Route path="/post-job" element={
          <ProtectedRoute>
            <Post_jobs />
          </ProtectedRoute>
        } />

        {/* submitJobApplication */}

        <Route path="/submitJobApplication/:jobId" element={
          <ProtectedRoute>
            <JobApplicationForm />
          </ProtectedRoute>
        } />


        <Route path="/adminlogin" element={<AdminLogin />} />


        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="jobApplicationDashboard" element={<JobApplicationDashbord />} />
          <Route path="messageDashboard" element={<ContactDashboard />} />
        </Route>




        <Route path="/request_interview/:userId" element={<MessageInputPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/worker_details/:id" element={<Worker_details />} />




      </Routes>
    </>
  )
}

export default App
