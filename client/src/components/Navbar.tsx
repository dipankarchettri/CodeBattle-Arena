import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, Menu, X, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Custom link helper to break out of wouter's nested base path when on /admin pages
const NavLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => {
  const isAdminPage = window.location.pathname.startsWith("/admin");
  if (isAdminPage) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const getUserInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">CodeBattle Arena</span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/problems" data-testid="link-problems">
              <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                Problems
              </div>
            </NavLink>
            <NavLink href="/leaderboard" data-testid="link-leaderboard">
              <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                Leaderboard
              </div>
            </NavLink>
            {user && (
              <NavLink href="/submissions" data-testid="link-submissions">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                  My Submissions
                </div>
              </NavLink>
            )}
            {user && user.role === "admin" && (
              <NavLink href="/admin" data-testid="link-admin">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium text-accent-competitive font-semibold">
                  Admin Panel
                </div>
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getUserInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.username}</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} data-testid="button-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <NavLink href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Login
                  </Button>
                </NavLink>
                <NavLink href="/register">
                  <Button data-testid="button-register">
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <NavLink href="/problems">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                  Problems
                </div>
              </NavLink>
              <NavLink href="/leaderboard">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                  Leaderboard
                </div>
              </NavLink>
              {user && (
                <NavLink href="/submissions">
                  <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                    My Submissions
                  </div>
                </NavLink>
              )}
              {user && user.role === "admin" && (
                <NavLink href="/admin">
                  <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block text-accent-competitive font-semibold">
                    Admin Panel
                  </div>
                </NavLink>
              )}
              <div className="pt-2 mt-2 border-t border-border">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="px-3 py-2">
                      <div className="font-semibold">{user.username}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => logout()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <NavLink href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Login
                      </Button>
                    </NavLink>
                    <NavLink href="/register">
                      <Button className="w-full justify-start">
                        Register
                      </Button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
