import { useState, useEffect,} from "react";
import axios from "axios"; // Using axios for easier requests
import ApplicationCard from "./dashboardCard.jsx";

// Base URL from your snippet
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/jobapplication`;
const JOB_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/job`;


const JobApplicationDashbord = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndEnrichData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Fetch the list of applications
        const response = await axios.get(BASE_URL);
        const appsList = response.data.applications;

        // Step 2: Use the data from the first request to fetch job details
        // We use Promise.all to fetch all job details in parallel (faster)
        const enrichedDataPromises = appsList.map(async (app) => {
          try {
            // Fetch job details using the job ID from the application
            const jobRes = await axios.get(`${JOB_BASE_URL}/${app.job}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            // Return a new object combining the application and the job data
            return {
              ...app,
              jobData: jobRes.data.data // Assuming your API returns { data: { ...jobDetails } }
            };
          } catch (err) {
            console.error(`Could not fetch job info for ${app.job}`, err);
            return { ...app, jobData: null }; // Return app even if job fetch fails
          }
        });

        const finalResults = await Promise.all(enrichedDataPromises);

        // Step 3: Update state with the complete data
        setApplications(finalResults);
        setFilteredApplications(finalResults);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAndEnrichData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }


  const handleFilter = (category) => {
    console.log(category);
    if (category === "all") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter((app) => app.jobData.category === category);
      setFilteredApplications(filtered);
      
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/60 p-5 md:p-8 font-sans antialiased">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Job Applications</h1>
        {/* search bar */}
            <div class="w-full max-w-sm">
              <label for="job-category" class="mb-1.5 block text-sm font-medium text-slate-700">
                Job category
              </label>

              <div class="group relative">
                <svg class="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25a2 2 0 0 1-2 2H5.75a2 2 0 0 1-2-2v-4.25M20.25 14.15v-3.4a2 2 0 0 0-2-2h-3M20.25 14.15 12 15.5m0 0-8.25-1.35M12 15.5V12m3-3.25V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1.75m6 0h-6m6 0h3a2 2 0 0 1 2 2v1.4M9 8.75H5.75a2 2 0 0 0-2 2v1.4" />
                </svg>

                <select id="job-category" name="category" onChange={(e) => handleFilter(e.target.value)}
                  class="w-full appearance-none rounded-xl border border-slate-200 bg-white
             py-3 pl-11 pr-10 text-sm text-slate-800 shadow-sm
             transition-all duration-150
             hover:border-slate-300
             focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/15
             invalid:text-slate-400">
                  <option value="" selected disabled>Select job category</option>
                  <option value="all">All</option>
                  <option value="Welders">Welders</option>
                  <option value="Caregivers">Caregivers</option>
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Electricians">Electricians</option>
                  <option value="Drivers">Drivers</option>
                  <option value="Mechanics">Mechanics</option>
                  <option value="Carpenters">Carpenters</option>
                  <option value="Plumbers">Plumbers</option>
                  <option value="Forklift">Forklift</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Other">Other</option>
                </select>


                <svg class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform duration-150 group-focus-within:rotate-180 group-focus-within:text-amber-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25 12 15.75 4.5 8.25" />
                </svg>
              </div>
            </div>

        {filteredApplications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {/* Loop through the array and render a card for each application */}
            {console.log(filteredApplications)}

            {
              filteredApplications.map((app) => {
                return <ApplicationCard key={app._id} data={app} />
              }
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationDashbord;