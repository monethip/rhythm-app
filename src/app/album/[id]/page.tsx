import { AlbumPage } from '@/page-views/album';
import { ALBUMS } from '@/entities/album';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ id: a.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <AlbumPage albumId={id} />;
}
