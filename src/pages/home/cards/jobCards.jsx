import {
  MapPin,
  Briefcase,
  Users,
  CalendarDays,
  PlaneTakeoff,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

// Maps the Job schema's `status` enum to a badge color + label.
const STATUS_STYLES = {
  pending: { label: "Pending Review", className: "bg-muted text-muted-foreground" },
  reviewing: { label: "Reviewing", className: "bg-amber-500/15 text-amber-600" },
  shortlisted: { label: "Shortlisted", className: "bg-success/15 text-success" },
  closed: { label: "Closed", className: "bg-destructive/15 text-destructive" },
};

function formatDate(dateStr) {
  if (!dateStr) return "TBD";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JobCard({ job }) {
  const {
    _id,
    roleTitle,
    category,
    numberOfHires,
    destinationCountry,
    startDate,
    description,
    conciergeMobility,
    status,
    createdAt,
  } = job;

  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      {/* Header: title + status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-navy">
          {roleTitle}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${statusStyle.className}`}
        >
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          {statusStyle.label}
        </span>
      </div>

      

      {/* Location + category */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {destinationCountry}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
          {category}
        </span>
        {createdAt && (
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Posted {formatDate(createdAt)}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {/* Stats grid */}
      <dl className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-secondary p-2.5">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="h-3 w-3" aria-hidden="true" />
            Positions
          </dt>
          <dd className="mt-0.5 text-sm font-bold text-navy">
            {numberOfHires}
          </dd>
        </div>
        <div className="rounded-lg bg-secondary p-2.5">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <CalendarDays className="h-3 w-3" aria-hidden="true" />
            Start Date
          </dt>
          <dd className="mt-0.5 text-xs font-semibold text-navy">
            {formatDate(startDate)}
          </dd>
        </div>
        <div className="rounded-lg bg-secondary p-2.5">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <PlaneTakeoff className="h-3 w-3" aria-hidden="true" />
            Concierge
          </dt>
          <dd className="mt-0.5 text-xs font-semibold text-navy">
            {conciergeMobility ? "Included" : "Not Included"}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Employer contact details are shared after your application advances
        to interview or introduction.
      </p>

      <div className="mt-auto pt-5">
        <a
          href={`/submitJobApplication/${_id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View &amp; Apply
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}