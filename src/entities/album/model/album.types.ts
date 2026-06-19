export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  genre: string;
  tracks: string[];
  spotifyId?: string;
}
