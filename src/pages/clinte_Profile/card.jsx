import { 
  Building2, User, Mail, Briefcase, Users, Globe, Calendar, FileText,
  CheckCircle, Clock, AlertCircle, XCircle, CalendarDays, Sparkles, Trash2
} from 'lucide-react';
import { format } from 'date-fns';

const JobCard = ({ job, onDelete, onStatusChange }) => {
  const {
    _id, company, yourName, workEmail, roleTitle, category,
    numberOfHires, destinationCountry, startDate, description,
    conciergeMobility, status, createdAt, updatedAt,
  } = job;

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      reviewing: <AlertCircle className="w-4 h-4" />,
      shortlisted: <CheckCircle className="w-4 h-4" />,
      closed: <XCircle className="w-4 h-4" />
    };
    return icons[status] || icons.pending;
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      reviewing: 'bg-blue-100 text-blue-700 border-blue-200',
      shortlisted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      closed: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Welders': 'bg-orange-100 text-orange-800',
      'Caregivers': 'bg-pink-100 text-pink-800',
      'Heavy Equipment': 'bg-purple-100 text-purple-800',
      'Electricians': 'bg-yellow-100 text-yellow-800',
      'Drivers': 'bg-blue-100 text-blue-800',
      'Mechanics': 'bg-red-100 text-red-800',
      'Carpenters': 'bg-amber-100 text-amber-800',
      'Plumbers': 'bg-cyan-100 text-cyan-800',
      'Forklift': 'bg-emerald-100 text-emerald-800',
      'HVAC': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      return format(dateObj, 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const formatDateTime = (date) => {
    if (!date) return 'Not specified';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      return format(dateObj, 'MMM dd, yyyy • h:mm a');
    } catch {
      return 'Invalid date';
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete job "${roleTitle}"? This can't be undone.`)) {
      onDelete(_id);
    }
  };

  const handleStatusChange = (e) => {
    onStatusChange(_id, e.target.value);
  };

  return (
    <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{roleTitle}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Building2 className="w-4 h-4 text-white/70" />
                <span className="text-white/80 text-sm">{company}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {/* Status Selector (replaces static badge) */}
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${getStatusBadgeColor(status)}`}>
                {getStatusIcon(status)}
                <select
                  value={status || 'pending'}
                  onChange={handleStatusChange}
                  className="bg-transparent text-sm font-medium capitalize border-none focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-200 group"
                  aria-label="Delete job"
                  title="Delete job"
                >
                  <Trash2 className="w-4 h-4 text-white group-hover:text-red-200 transition-colors" />
                </button>
              )}
            </div>
            {category && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryBadgeColor(category)}`}>
                {category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Contact Person</p>
              <p className="text-gray-800 font-medium">{yourName}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Work Email</p>
              {workEmail && workEmail !== 'Not provided' ? (
                <a href={`mailto:${workEmail}`} className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-sm break-all">
                  {workEmail}
                </a>
              ) : (
                <p className="text-gray-700 text-sm">{workEmail}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Hires</p>
              <p className="text-gray-700 font-medium">{numberOfHires} position{numberOfHires !== 1 && 's'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Destination</p>
              <p className="text-gray-700 font-medium">{destinationCountry}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Start Date</p>
              <p className="text-gray-700 font-medium">{formatDate(startDate)}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5">Description</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {conciergeMobility && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-1.5 rounded-full border border-purple-100">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Concierge Mobility</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Posted {formatDateTime(createdAt)}</span>
            </div>
          </div>
          {updatedAt && updatedAt !== createdAt && (
            <span className="text-xs text-gray-400">Updated {formatDateTime(updatedAt)}</span>
          )}
        </div>

        {_id && (
          <div className="text-xs text-gray-400 pt-1 border-t border-gray-50">Job ID: {_id}</div>
        )}
      </div>
    </div>
  );
};

export default JobCard;