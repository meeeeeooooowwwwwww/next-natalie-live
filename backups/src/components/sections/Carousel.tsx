'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import path from 'path';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  appendDots: (dots: React.ReactNode) => (
    <div
      style={{
        backgroundColor: "#ddd",
        borderRadius: "10px",
        padding: "10px"
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  customPaging: (i: number) => (
    <div
      style={{
        width: "30px",
        color: "#fff",
        border: "1px solid #fff",
        borderRadius: "50%",
        padding: "5px"
      }}
    >
      {i + 1}
    </div>
  )
};

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section style={{ position: 'relative', backgroundColor: '#f8f8f8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} style={{ position: 'relative', height: '250px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', backgroundColor: '#fff' }} onClick={() => openModal(item.image)}>
              <Image
                src={item.image}
                alt={item.title}
                width={240}
                height={160}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && selectedImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ position: 'relative', width: '80%', height: '80vh', borderRadius: '10px', overflow: 'hidden' }}>
            <Image
              src={selectedImage}
              alt="Enlarged Image"
              layout="fill"
              objectFit="contain"
              style={{ boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}
            />
            <button onClick={closeModal} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'pink', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 