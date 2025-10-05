import Link from "next/link";
import { getSession } from "@/data/auth/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getHaven } from "@/data/havens/get-havens";
import LogoutButton from "@/components/buttons/logout-button";

export async function HavenTopBar() {
  const [{ user }, haven] = await Promise.all([getSession(), getHaven()]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-10 shrink-0">
              {haven?.logo && (
                <AvatarImage src={haven.logo} alt={`${haven.name} logo`} />
              )}
              <AvatarFallback className="text-sm font-medium">
                {haven?.name?.charAt(0).toUpperCase() ?? "H"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-base truncate">
                {haven?.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {haven?.slug}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-accent transition-colors shrink-0"
                aria-label="Open user menu"
              >
                <Avatar className="size-7">
                  {user?.image && (
                    <AvatarImage src={user.image} alt={user.name || "User"} />
                  )}
                  <AvatarFallback className="text-xs">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline font-medium">
                  {user?.name ?? "User"}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name ?? "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email ?? ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/sanctum" className="cursor-pointer">
                  Sanctum
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
