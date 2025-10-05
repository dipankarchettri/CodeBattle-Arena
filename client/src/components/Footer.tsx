import { Code, Github, Linkedin, Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">CodeBattle Arena</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Empowering developers with fair, competitive programming and debugging challenges.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/dipankarchettri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-background hover-elevate flex items-center justify-center"
                data-testid="link-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dipankarchettri/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-background hover-elevate flex items-center justify-center"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-background hover-elevate flex items-center justify-center"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded-md">
                  About Event
                </a>
              </li>
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded-md">
                  Rules & Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded-md">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded-md">
                  Past Winners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact & Organizers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:dipankarchettri12345@gmail.com" className="hover-elevate inline-block px-2 py-1 rounded-md">
                  dipankarchettri12345@gmail.com
                </a>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">Platform Organizers</p>
                <p>CodeBattle Arena Team</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CodeBattle Arena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
