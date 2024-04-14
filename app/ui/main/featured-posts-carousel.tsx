'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { PrevButton, NextButton, usePrevNextButtons } from './embla-buttons';
import Image from 'next/image';
import { PostField } from '@/app/lib/definitions';

interface FeaturedPostsCarouselProps {
  posts: PostField[];
}

const FeaturedPostsCarousel = ({ posts }: FeaturedPostsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {posts.map((post) => {
          return (
            <div className="embla__slide" key={post.id}>
              <div className="relative h-full w-full">
                <Image
                  src={post.image_url || '/homes/1.jpg'}
                  fill
                  alt="Feature Post 1"
                  objectFit="cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  );
};

export default FeaturedPostsCarousel;
