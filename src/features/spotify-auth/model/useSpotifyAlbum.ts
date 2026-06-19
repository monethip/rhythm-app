'use client';
import { useEffect, useState } from 'react';
import type { Album } from '@/entities/album';
import { ALBUMS } from '@/entities/album';
import { TRACKS } from '@/entities/track';
import type { Track } from '@/entities/track';
import { useSpotifyAuth } from './SpotifyAuthContext';
import { fetchSpotifyAlbum, formatDuration } from './spotify-api';
import type { SpotifyAlbum } from './spotify-api';

export type AlbumStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ResolvedAlbum {
  album: Album;
  tracks: Track[];
  status: AlbumStatus;
  error: string | null;
  source: 'spotify' | 'local';
  raw: SpotifyAlbum | null;
}

function mapSpotifyAlbum(data: SpotifyAlbum, localAlbum: Album): { album: Album; tracks: Track[] } {
  const artist = data.artists.map((a) => a.name).join(', ');
  const year = Number(data.release_date.slice(0, 4));
  const cover = data.images[0]?.url ?? localAlbum.cover;
  const genre = data.genres[0] ?? localAlbum.genre;

  const album: Album = {
    id: localAlbum.id,
    spotifyId: data.id,
    title: data.name,
    artist,
    year,
    cover,
    genre,
    tracks: data.tracks.items.map((t) => t.id),
  };

  const tracks: Track[] = data.tracks.items.map((t) => ({
    id: t.id,
    albumId: localAlbum.id,
    title: t.name,
    artist: t.artists.map((a) => a.name).join(', '),
    album: data.name,
    duration: formatDuration(t.duration_ms),
    plays: '',
    liked: false,
  }));

  return { album, tracks };
}

export function useSpotifyAlbum(localAlbumId: string): ResolvedAlbum {
  const { token } = useSpotifyAuth();
  const localAlbum = ALBUMS.find((a) => a.id === localAlbumId) ?? null;
  const localTracks = TRACKS.filter((t) => t.albumId === localAlbumId);

  const [state, setState] = useState<ResolvedAlbum>({
    album: localAlbum!,
    tracks: localTracks,
    status: 'idle',
    error: null,
    source: 'local',
    raw: null,
  });

  useEffect(() => {
    if (!token || !localAlbum?.spotifyId) return;

    setState((s) => ({ ...s, status: 'loading', error: null }));

    fetchSpotifyAlbum(token.accessToken, localAlbum.spotifyId)
      .then((data) => {
        const { album, tracks } = mapSpotifyAlbum(data, localAlbum);
        setState({ album, tracks, status: 'success', error: null, source: 'spotify', raw: data });
      })
      .catch((err: Error) => {
        setState((s) => ({ ...s, status: 'error', error: err.message }));
      });
  }, [token?.accessToken, localAlbum?.spotifyId]);

  return state;
}
