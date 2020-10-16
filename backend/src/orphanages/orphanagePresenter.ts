import { Orphanage } from './models/orphanage';
import { renderMany as renderImages } from './imagePresenter';
import 'dotenv';

const { PUBLIC_HOST } = process.env;

export function render(orphanage: Orphanage) {
  const { id, images } = orphanage;
  return {
    ...orphanage,
    images: renderImages(images),
    links: [
      {
        type: 'POST',
        rel: 'image',
        uri: `${PUBLIC_HOST}/api/orphanages/${id}/images`,
      },
    ],
  };
}

export function renderMany(orphanages: Array<Orphanage>) {
  return orphanages.map((orphanage) => {
    const { id, name, latitude, longitude } = orphanage;

    return {
      id,
      name,
      latitude,
      longitude,
      links: [
        {
          type: 'GET',
          rel: 'self',
          uri: `${PUBLIC_HOST}/api/orphanages/${id}`,
        },
        {
          type: 'POST',
          rel: 'image',
          uri: `${PUBLIC_HOST}/api/orphanages/${id}/images`,
        },
      ],
    };
  });
}
