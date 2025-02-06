import { Link } from "wouter";
import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";

export function NavigationBar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <a className="text-lg font-bold leading-tight">
            MakerSpace<br />
            Exploration<br />
            Accreditation
          </a>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://msxbocachica.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </a>
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/apply">
                <Button variant="ghost">Apply</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}