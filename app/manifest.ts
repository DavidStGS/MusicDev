import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MusicDev',
    short_name: 'MusicDev',
    description: 'MusicDev',
    start_url: '/', 
    display: 'standalone',
    background_color: '#171717',
    theme_color: 'black',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/svg',
      },
      {
        src: '/images/liked.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}