import BlogGrid from '../components/projects/BlogGrid';
import SectionHeader from '../components/ui/SectionHeader';

export default function Blog() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Technical Writing"
          title="Blog"
          subtitle="In-depth guides on embedded systems, PCB design, and RF communications — published on Hackster.io and Arduino Project Hub."
          centered
        />
        <BlogGrid />
      </div>
    </div>
  );
}
