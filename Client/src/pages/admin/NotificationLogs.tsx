import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../components/ui/Card";
import { timeAgo } from "../../utils/formatDate";
import api from "../../services/api";

const typeColors: Record<string, any> = {
  goal_assigned: "primary",
  report_submitted: "warning",
  report_approved: "success",
  reminder: "gray",
};

export default function NotificationLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/notifications");
        const logsData = res.data.data || res.data;
        setLogs(Array.isArray(logsData) ? logsData : []);
      } catch (err) {
        console.error("Failed to load notification logs:", err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">
          Notification Logs
        </h2>
        <p className="text-sm text-muted mt-1">
          All platform notification history
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
                  />
                ))}
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className={`flex items-start gap-3 p-4 rounded-xl ${!log.isRead ? "bg-primary-50 dark:bg-primary-900/10" : ""}`}
                >
                  <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Bell size={16} className="text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-secondary dark:text-gray-200">
                      {log.message}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {timeAgo(log.createdAt)}
                    </p>
                  </div>
                  <Badge variant={typeColors[log.type] || "gray"}>
                    {log.type.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
