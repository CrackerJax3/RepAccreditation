import { Link } from "wouter";
import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function NavigationBar() {
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Navigation items */}
        <div className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-background md:bg-transparent p-4 md:p-0 border-b md:border-0`}>
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