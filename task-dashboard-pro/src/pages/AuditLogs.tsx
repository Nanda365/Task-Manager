import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { auditService, AuditLog } from "@/services/auditService";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const getActionBadge = (action: string) => {
  const config: {
    [key: string]: {
      variant: "outline";
      className: string;
      label: string;
    };
  } = {
    TASK_CREATED: {
      variant: "outline",
      className: "bg-success/10 text-success border-success/20",
      label: "Task Created",
    },
    TASK_UPDATED: {
      variant: "outline",
      className: "bg-warning/10 text-warning border-warning/20",
      label: "Task Updated",
    },
    TASK_DELETED: {
      variant: "outline",
      className: "bg-destructive/10 text-destructive border-destructive/20",
      label: "Task Deleted",
    },
    DEFAULT: {
      variant: "outline",
      className: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Unknown Action",
    },
  };

  const actionConfig = config[action] || config.DEFAULT;
  return (
    <Badge variant={actionConfig.variant} className={actionConfig.className}>
      {actionConfig.label}
    </Badge>
  );
};

const getRowClassName = (action: string) => {
  const classNames: { [key: string]: string } = {
    TASK_CREATED: "bg-success/5 hover:bg-success/10",
    TASK_UPDATED: "bg-warning/5 hover:bg-warning/10",
    TASK_DELETED: "bg-destructive/5 hover:bg-destructive/10",
    DEFAULT: "hover:bg-accent/5",
  };
  return classNames[action] || classNames.DEFAULT;
};

const UpdatedContent = ({ details }: { details?: Record<string, any> }) => {
  if (!details || Object.keys(details).length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <div className="space-y-1">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="flex gap-2 text-sm">
          <span className="font-medium text-foreground">{key}:</span>
          <span className="text-muted-foreground">
            {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AuditLogs() {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: () => auditService.getAuditLogs(),
    retry: false,
  });

  return (
    <Layout title="Audit Logs">
      <Card>
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading audit logs...</div>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log, index) => (
                      <TableRow key={log._id} className={cn(getRowClassName(log.action))}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{getActionBadge(log.action)}</TableCell>
                        <TableCell className="font-medium">
                          {log.entityType}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <UpdatedContent details={log.details} />
                        </TableCell>
                        <TableCell>
                          {log.userId || (
                            <span className="text-muted-foreground">System</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
