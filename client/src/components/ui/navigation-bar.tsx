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
          <Button variant="ghost" asChild>
            <a
              href="https://msxbocachica.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/apply">Apply</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/auth">Login / Register</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}