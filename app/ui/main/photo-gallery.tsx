import React from 'react';
import PhotoCarousel from './photo-carousel';

type Image = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
};

type MasonryImage = {
  src: string;
  alt: string;
};

type MasonryColumn = {
  column: MasonryImage[];
};

function createMasonryGrid(
  images: Image[],
  numColumns: number = 3,
): MasonryColumn[] {
  const grid: MasonryColumn[] = Array.from({ length: numColumns }, () => ({
    column: [],
  }));

  images.forEach((image, index) => {
    const columnIndex = index % numColumns;
    grid[columnIndex].column.push({
      src: image.secure_url, // or `image.url` if https is not necessary
      alt:
        image.public_id
          .split('/')
          .pop()
          ?.replace(/_/g, ' ')
          .replace(/-\d+$/, '') || '',
    });
  });

  return grid;
}

const PhotoGallery = async ({ postSlug }: { postSlug: string }) => {
  const imagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/cloudinary/${postSlug}`,
  );
  const imagesData = await imagesRes.json();
  const masonryGrid = createMasonryGrid(imagesData.assetsByTag.resources);

  return (
    <>
      <div className="my-8 hidden grid-cols-3 gap-4 md:grid">
        {masonryGrid.map((column, i) => (
          <div key={i} className="grid gap-4">
            {column.column.map((photo, j) => (
              <PhotoCarousel
                key={j}
                photo={photo}
                masonryGrid={masonryGrid}
                i={i}
                j={j}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 md:hidden">
        {imagesData.assetsByTag.resources.map((photo: Image, i: number) => (
          <div key={i} className="grid">
            <img
              className="h-full max-w-full object-cover"
              src={
                photo.secure_url ||
                'https://res.cloudinary.com/drndixnsw/image/upload/v1713722674/Quiet-Space-House-A-Frame-_1_p2e0db.jpg'
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoGallery;
