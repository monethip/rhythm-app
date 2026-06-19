export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  track_number: number;
  artists: SpotifyArtist[];
  preview_url: string | null;
  explicit: boolean;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  genres: string[];
  label: string;
  popularity: number;
  tracks: {
    items: SpotifyTrack[];
    total: number;
  };
}

const BASE = 'https://api.spotify.com/v1';

async function spotifyFetch<T>(accessToken: string, path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 401) throw new Error('Token expired');
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message ?? `Spotify API error ${res.status}`);
  }
  return res.json();
}

export function fetchSpotifyAlbum(accessToken: string, albumId: string): Promise<SpotifyAlbum> {
  return spotifyFetch<SpotifyAlbum>(accessToken, `/albums/${albumId}`);
}

export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${String(sec).padStart(2, '0')}`;
}
