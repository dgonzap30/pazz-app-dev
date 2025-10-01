import { ComingSoon as ComingSoonUI } from '@/ui/coming-soon';

interface ComingSoonPageProps {
  feature?: string;
}

export default function ComingSoon({
  feature = 'Esta funcionalidad',
}: ComingSoonPageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <ComingSoonUI feature={feature} />
    </div>
  );
}
