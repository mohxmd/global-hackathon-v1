import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Echo } from "@/data/echoes/get-echoes";
import { timeAgo } from "@/lib/utils/date";

export function EchoCard({
  echo: { title, content, hashtags, createdAt: date },
  author,
}: Echo) {
  return (
    <Card
      className={cn(
        "rounded-2xl border bg-card transition-shadow hover:shadow-sm"
      )}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-base md:text-lg text-balance">
          {title}
        </CardTitle>
        {author ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="size-5">
              {author.image && (
                <AvatarImage src={author.image} alt={author.name} />
              )}
              <AvatarFallback>
                {author.name?.charAt(0)?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <span>{author.name}</span>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
        {hashtags && hashtags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {"#"}
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="text-xs text-muted-foreground">{timeAgo(date)}</div>
      </CardContent>
    </Card>
  );
}
