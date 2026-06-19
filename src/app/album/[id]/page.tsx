import { AlbumPage } from '@/page-views/album';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <AlbumPage albumId={id} />;
}
