import { Image } from './models/image';
import 'dotenv';

function render(image: Image) {
  const { id, path } = image;

  return {
    id,
    url: `${process.env.PUBLIC_HOST}/uploads/${path}`,
  };
}

export function renderMany(images: Array<Image>) {
  if (!images) {
    return;
  }
  return images.map((image) => render(image));
}
