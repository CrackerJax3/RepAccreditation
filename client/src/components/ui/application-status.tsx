import { cn } from "@/lib/utils";
import { Badge } from "./badge";

type Status = "draft" | "submitted" | "under_review" | "approved" | "rejected";

const statusConfig: Record<
  Status,
  { label: string; className: string; }
> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  submitted: {
    label: "Submitted",
    className: "bg-blue-100 text-blue-800",
  },
  under_review: {
    label: "Under Review",
    className: "bg-yellow-100 text-yellow-800",
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800",
  },
};

export function ApplicationStatus({ status }: { status: Status }) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="secondary" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
