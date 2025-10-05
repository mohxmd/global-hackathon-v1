import { getEchoes } from "@/data/echoes/get-echoes";
import { EchoGrid } from "../_components/echo-grid";
import { HavenSidebar } from "../_components/sidebar";
import { getUserHavens } from "@/data/havens/get-havens";
import { getSession } from "@/data/auth/session";

export default async function page() {
  const [echoes, userHavens, { session }] = await Promise.all([
    getEchoes(),
    getUserHavens(),
    getSession(),
  ]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="order-1 lg:order-none">
        <HavenSidebar
          havens={userHavens}
          activeId={session.activeOrganizationId!}
        />
      </div>

      <section aria-label="Echo Feed" className="min-w-0">
        <EchoGrid echoes={echoes} addHref="/echo/new" />
      </section>
    </div>
  );
}
