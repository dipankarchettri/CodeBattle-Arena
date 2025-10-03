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
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">CodeBattle Arena</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/problems" data-testid="link-problems">
              <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                Problems
              </div>
            </Link>
            <Link href="/leaderboard" data-testid="link-leaderboard">
              <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                Leaderboard
              </div>
            </Link>
            {user && (
              <Link href="/submissions" data-testid="link-submissions">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium">
                  My Submissions
                </div>
              </Link>
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
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="button-register">
                    Register
                  </Button>
                </Link>
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
              <Link href="/problems">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                  Problems
                </div>
              </Link>
              <Link href="/leaderboard">
                <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                  Leaderboard
                </div>
              </Link>
              {user && (
                <Link href="/submissions">
                  <div className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium block">
                    My Submissions
                  </div>
                </Link>
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
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full justify-start">
                        Register
                      </Button>
                    </Link>
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
