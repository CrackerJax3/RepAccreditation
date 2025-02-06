import { NavigationBar } from "@/components/ui/navigation-bar";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { ApplicationStatus } from "@/components/ui/application-status";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: applications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user?.institutionName}</h1>
            <p className="text-muted-foreground">
              Institution Type: {user?.type.charAt(0).toUpperCase() + user?.type.slice(1)}
            </p>
          </div>
          <Button onClick={() => setLocation("/apply")}>
            New Application
          </Button>
        </div>

        <div className="grid gap-6">
          {applications?.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Applications Yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start your accreditation journey by submitting your first application.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications?.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>#{application.id}</TableCell>
                        <TableCell>
                          {application.submissionDate
                            ? new Date(application.submissionDate).toLocaleDateString()
                            : "Not submitted"}
                        </TableCell>
                        <TableCell>
                          <ApplicationStatus status={application.status} />
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
