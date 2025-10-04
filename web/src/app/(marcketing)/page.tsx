import { FeatureReactions } from "./_components/feature-reactions";
import { FeatureSharedHavens } from "./_components/feature-shared-havens";
import { FeatureTagline } from "./_components/feature-tagline";
import { FeatureTimeCapsule } from "./_components/feature-timecapsule";

export default function page() {
  return (
    <section className="px-4 py-16 md:py-32">
      <div className="mx-auto grid max-w-5xl border md:grid-cols-2">
        <FeatureSharedHavens />
        <FeatureReactions />
        <FeatureTagline />
        <FeatureTimeCapsule />
      </div>
    </section>
  );
}
