'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { PrevButton, NextButton, usePrevNextButtons } from './embla-buttons';
import Image from 'next/image';

const FeaturedPostsCarousel = () => {
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
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/1.jpg"
              fill
              alt="Feature Post 1"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/2.jpg"
              fill
              alt="Feature Post 2"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/3.jpg"
              fill
              alt="Feature Post 3"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/4.jpg"
              fill
              alt="Feature Post 4"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/5.jpg"
              fill
              alt="Feature Post 5"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <Image
              src="/homes/6.jpg"
              fill
              alt="Feature Post 6"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  );
};

export default FeaturedPostsCarousel;
