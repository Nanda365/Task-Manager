import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/taskService";

export default function Dashboard() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getTasks(),
    retry: false,
  });

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: isLoading ? "..." : totalTasks.toString(),
      icon: CheckSquare,
      color: "text-primary",
    },
    {
      title: "Pending",
      value: isLoading ? "..." : pendingTasks.toString(),
      icon: Clock,
      color: "text-warning",
    },
    {
      title: "In Progress",
      value: isLoading ? "..." : inProgressTasks.toString(),
      icon: AlertCircle,
      color: "text-accent",
    },
    {
      title: "Completed",
      value: isLoading ? "..." : completedTasks.toString(),
      icon: CheckCircle2,
      color: "text-success",
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Task Manager Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage your tasks efficiently with our intuitive dashboard. Navigate
              to the Tasks page to create, edit, and track your tasks, or check
              the Audit Logs to view all system activities.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
