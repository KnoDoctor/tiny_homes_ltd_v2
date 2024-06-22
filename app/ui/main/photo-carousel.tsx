'use client';

import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';

interface MasonryImage {
  src: string;
  alt: string;
}

interface MasonryColumn {
  column: MasonryImage[];
}

interface PhotoCarouselProps {
  i: number;
  j: number;
  photo: MasonryImage;
  masonryGrid: MasonryColumn[];
}

const updateToNextPhoto = ({
  masonryGrid,
  localI,
  localJ,
  setLocalI,
  setLocalJ,
}: {
  masonryGrid: MasonryColumn[];
  localI: number;
  localJ: number;
  setLocalI: React.Dispatch<React.SetStateAction<number>>;
  setLocalJ: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (localI === 0 && localJ === 0) {
    console.log('AT START');
    setLocalI((prevI) => prevI + 1);
    return;
  }
  if (
    localI === masonryGrid.length - 1 &&
    localJ === masonryGrid[localI]?.column.length - 1
  ) {
    console.log('AT END');
    return;
  }
  if (localJ === masonryGrid[localI]?.column.length - 1) {
    console.log('AT END OF COLUMN');
    setLocalI((prevI) => prevI + 1);
    return;
  }
  if (localI === masonryGrid.length - 1) {
    console.log('AT END OF ROW');
    setLocalI(0);
    setLocalJ((prevJ) => prevJ + 1);
    return;
  }
  console.log('DEFAULT');
  setLocalI((prevI) => prevI + 1);
};

const updateToPrevPhoto = ({
  masonryGrid,
  localI,
  localJ,
  setLocalI,
  setLocalJ,
}: {
  masonryGrid: MasonryColumn[];
  localI: number;
  localJ: number;
  setLocalI: React.Dispatch<React.SetStateAction<number>>;
  setLocalJ: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (localI === 0 && localJ === 0) {
    console.log('AT START');
    return;
  }
  if (
    localI === masonryGrid.length - 1 &&
    localJ === masonryGrid[localI]?.column.length - 1
  ) {
    console.log('AT END');
    setLocalI((prevI) => prevI - 1);
    return;
  }
  if (localI === 0) {
    console.log('AT START OF ROW');
    setLocalI(masonryGrid.length - 1);
    setLocalJ((prevJ) => prevJ - 1);
    return;
  }
  if (localJ === 0) {
    console.log('AT START OF COLUMN');
    setLocalI((prevI) => prevI - 1);
    return;
  }
  console.log('DEFAULT');
  setLocalI((prevI) => prevI - 1);
};

const PhotoCarousel = forwardRef<HTMLDialogElement, PhotoCarouselProps>(
  ({ photo, masonryGrid, i, j }, ref) => {
    const localRef = useRef<HTMLDialogElement | null>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLDialogElement);

    const { onOpen, onClose } = useModal(localRef);
    const [localI, setLocalI] = useState(i);
    const [localJ, setLocalJ] = useState(j);

    useEffect(() => {
      const handleOverlayClick = (event: MouseEvent) => {
        if (localRef.current && event.target === localRef.current) {
          onClose();
        }
      };

      if (localRef.current) {
        localRef.current.addEventListener('click', handleOverlayClick);
      }

      return () => {
        if (localRef.current) {
          localRef.current.removeEventListener('click', handleOverlayClick);
        }
      };
    }, [onClose]);

    return (
      <>
        <div onClick={onOpen}>
          <img
            className="h-full max-w-full object-cover"
            src={
              photo.src ||
              'https://res.cloudinary.com/drndixnsw/image/upload/v1713722674/Quiet-Space-House-A-Frame-_1_p2e0db.jpg'
            }
          />
        </div>

        <dialog ref={localRef} className="photo-carousel-dialog">
          <div className="h-dvh w-full">
            <button
              onClick={() => {
                onClose();
                setLocalI(i);
                setLocalJ(j);
              }}
            >
              &times;
            </button>
            <button
              onClick={() => {
                updateToNextPhoto({
                  masonryGrid,
                  localI,
                  localJ,
                  setLocalI,
                  setLocalJ,
                });
              }}
              style={{ float: 'right' }}
            >
              Next
            </button>
            <button
              onClick={() => {
                updateToPrevPhoto({
                  masonryGrid,
                  localI,
                  localJ,
                  setLocalI,
                  setLocalJ,
                });
              }}
              style={{ float: 'right' }}
            >
              Prev
            </button>
            <div>
              <img
                className="h-full w-full object-cover"
                src={
                  masonryGrid[localI]?.column[localJ]?.src ||
                  'https://res.cloudinary.com/drndixnsw/image/upload/v1713722674/Quiet-Space-House-A-Frame-_1_p2e0db.jpg'
                }
              />
            </div>
          </div>
        </dialog>
      </>
    );
  },
);

PhotoCarousel.displayName = 'PhotoCarousel';

export default PhotoCarousel;

export function useModal(ref: React.RefObject<HTMLDialogElement>) {
  const onOpen = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const onClose = () => {
    if (ref.current) {
      ref.current.className = 'close';
      setTimeout(() => {
        if (ref.current) {
          ref.current.close();
          ref.current.className = '';
        }
      }, 50);
    }
  };

  return { onOpen, onClose };
}
