import { useState } from 'react';
import {
    Mail, MapPin, Briefcase, Code,
    ChevronDown,
    X, ExternalLink, Building2, Users, Award, Loader2, AlertCircle, Download, FileText
} from 'lucide-react';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/job`;

const ApplicationCard = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showJobDetails, setShowJobDetails] = useState(false);

    // New states for Job Data
    const [jobData, setJobData] = useState(null);
    const [loadingJob, setLoadingJob] = useState(false);
    const [jobError, setJobError] = useState(null);

    if (!data) return null;

    // 1. Fetch function for Job Details
    const handleViewJob = async () => {
        setShowJobDetails(true);
        if (jobData) return; // Don't fetch if we already have it

        setLoadingJob(true);
        setJobError(null);

        try {
           
            const jobId = data.jobId || data.job; // Depends on your Application schema

            const response = await fetch(`${BASE_URL}/${jobId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();

            if (result.success) {
                setJobData(result.data);
                
            } else {
                setJobError(result.message || "Failed to load job");
            }
        } catch (err) {
            console.error("Error fetching job:", err);
            setJobError("Network error. Please try again.");
        } finally {
            setLoadingJob(false);
        }
    };

    const isSubmitted = data.status === 'submitted';
    const statusBg = isSubmitted ? 'bg-emerald-50/80' : 'bg-slate-100/70';
    const statusText = isSubmitted ? 'text-emerald-800' : 'text-slate-700';

    return (
        <>
            {/* Compact Card View (Remains the same) */}
            {!isExpanded && (
                <div
                    className="group relative bg-white/90 rounded-xl p-3 shadow-md border border-white/60 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setIsExpanded(true)}
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white text-xs font-medium uppercase">
                                {data.fullName?.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-800">{data.fullName}</h4>
                                <span className={`text-[0.6rem] px-1.5 py-0.5 rounded-full ${statusBg} ${statusText} border`}>
                                    ● {data.status}
                                </span>
                            </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                </div>
            )}

            {/* Main Application Modal */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsExpanded(false)}>
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>

                        <button className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200" onClick={() => setIsExpanded(false)}>
                            <X className="w-5 h-5 text-slate-600" />
                        </button>

                        {/* Header with the Job Button */}
                        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-2xl font-bold">
                                    {data.fullName?.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{data.fullName}</h2>
                                    <div className="mt-2">
                                        <button
                                            onClick={handleViewJob}
                                            className="group text-xs bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2 transition-all font-semibold"
                                        >
                                            <Briefcase className="w-3.5 h-3.5" />
                                            View Job Details
                                            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ... Rest of Application Grid (Experience, Skills, etc. from previous code) ... */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> Email
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.email}</div>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" /> Skills
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.relevantsSkills}</div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" /> phone
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.phone}</div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" /> nationality
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.nationality}</div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" /> currentLocation
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.currentLocation}</div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" /> Exprience
                                </div>
                                <div className="text-sm font-medium text-slate-800 truncate">{data.yearsExperience}</div>
                            </div>

                            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col justify-between">
                                <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1 flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Resume / CV
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                                        {data.resume?.fileName || "Attachment"}
                                    </div>
                                    {data.resume?.url ? (
                                        <a
                                            href={data.resume.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 bg-white rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                            title="Download/View Resume"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                        </a>
                                    ) : (
                                        <span className="text-[10px] text-slate-400 italic">Not provided</span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* SECONDARY MODAL: Job Details (Fetched from API) */}
            {showJobDetails && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowJobDetails(false)}>
                    <div className="bg-white rounded-[2rem] w-full max-w-xl p-8 shadow-2xl relative border border-white animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>

                        <button className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 hover:bg-slate-100" onClick={() => setShowJobDetails(false)}>
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        {loadingJob ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                <p className="text-slate-500 font-medium">Fetching job data...</p>
                            </div>
                        ) : jobError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
                                    <AlertCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Oops!</h3>
                                <p className="text-slate-500 max-w-[250px]">{jobError}</p>
                                <button onClick={handleViewJob} className="mt-6 text-sm text-indigo-600 font-bold underline">Try Again</button>
                            </div>
                        ) : jobData && (
                            <div className="animate-in fade-in duration-500">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-4">
                                    <Award className="w-3 h-3" /> Featured Job
                                </div>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{jobData.roleTitle}</h3>
                                <div className="flex flex-wrap gap-4 text-slate-500 mb-8">
                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                        <Building2 className="w-4 h-4 text-slate-400" /> {jobData.company || 'Verified Company'}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-slate-400" /> {jobData.destinationCountry}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                                    {/* Category Card */}
                                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                                        <div className="text-[10px] font-bold text-purple-600 uppercase mb-1 tracking-wider">
                                            Category
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-900 font-bold truncate">
                                            <Users className="w-4 h-4 text-purple-500 shrink-0" />
                                            <span className="truncate">{jobData.category || 'Tech'}</span>
                                        </div>
                                    </div>

                                    {/* Email Card - Changed to Blue for visual distinction */}
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                        <div className="text-[10px] font-bold text-blue-600 uppercase mb-1 tracking-wider">
                                            Work Email
                                        </div>
                                        <div className="flex items-center gap-2 text-blue-900 font-bold truncate">
                                            <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                            <span className="truncate text-sm sm:text-base" title={jobData.workEmail}>
                                                {jobData.workEmail}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Description</h4>
                                    <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm leading-relaxed max-h-48 overflow-y-auto">
                                        {jobData.description}
                                    </div>
                                </div>


                                <button
                                    onClick={() => setShowJobDetails(false)}
                                    className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all"
                                >
                                    Close Job Details
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicationCard;