import type { Album } from './album.types';

export const ALBUMS: Album[] = [
  {
    id: 'reputation',
    title: 'reputation',
    artist: 'Taylor Swift',
    year: 2017,
    cover: '/albums/reputation.png',
    genre: 'Pop',
    tracks: ['rep-1', 'rep-2', 'rep-3', 'rep-4', 'rep-5', 'rep-6'],
  },
  {
    id: 'lover',
    title: 'Lover',
    artist: 'Taylor Swift',
    year: 2019,
    cover: '/albums/lover.png',
    genre: 'Pop',
    tracks: ['lov-1', 'lov-2', 'lov-3', 'lov-4', 'lov-5'],
  },
  {
    id: 'tortured-poets',
    title: 'The Tortured Poets Department',
    artist: 'Taylor Swift',
    year: 2024,
    cover: '/albums/hotmess.png',
    genre: 'Indie Pop',
    tracks: ['ttp-1', 'ttp-2', 'ttp-3', 'ttp-4', 'ttp-5'],
  },
  {
    id: 'girls',
    title: 'Girls',
    artist: 'Aespa',
    year: 2022,
    cover: '/albums/girls.png',
    genre: 'K-Pop',
    tracks: ['aes-1', 'aes-2', 'aes-3', 'aes-4'],
  },
  {
    id: 'showgirl',
    title: 'Showgirl',
    artist: 'Cortis',
    year: 2023,
    cover: '/albums/showgirl.png',
    genre: 'Electronic',
    tracks: ['sho-1', 'sho-2', 'sho-3', 'sho-4', 'sho-5'],
  },
];
