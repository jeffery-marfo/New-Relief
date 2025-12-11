import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InfoSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);
  const numbersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial card animations on scroll
      gsap.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Icon animations
      gsap.fromTo(
        iconsRef.current,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Counter animations (if you add numbers later)
      numbersRef.current.forEach((number) => {
        if (number) {
          const target = parseInt(number.dataset.target);
          gsap.fromTo(
            number,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: number,
                start: 'top 80%',
                toggleActions: 'play none none none'
              },
              onUpdate: function() {
                number.innerText = Math.ceil(number.innerText);
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover effect
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    const icon = iconsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distanceX = mouseX - cardCenterX;
    const distanceY = mouseY - cardCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Magnetic effect radius
    const magneticRadius = 200;
    
    if (distance < magneticRadius) {
      const pullStrength = (magneticRadius - distance) / magneticRadius;
      const moveX = distanceX * pullStrength * 0.15;
      const moveY = distanceY * pullStrength * 0.15;
      
      gsap.to(card, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    // 3D tilt effect
    const rotateX = ((mouseY - cardCenterY) / rect.height) * -15;
    const rotateY = ((mouseX - cardCenterX) / rect.width) * 15;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Icon morph on hover
    gsap.to(icon, {
      scale: 1.2,
      rotation: 360,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    const icon = iconsRef.current[index];
    
    gsap.to(card, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  };

  const handleTouchStart = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { scale: 0.98, duration: 0.1, ease: 'power1.out' });
  };

  const handleTouchEnd = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { scale: 1, duration: 0.15, ease: 'power1.out' });
  };

  const cards = [
    {
      icon: Clock,
      title: 'Saturday Services',
      content: (
        <>
          <div className="mb-2">
            <p className="text-gray-600">7:30 PM - <span className="text-gray-800">Moment Of Wisdom</span></p>
          </div>
          <div>
            <p className="text-gray-600">6:30 PM - <span className="text-gray-800">Teens Service</span></p>
          </div>
        </>
      )
    },
    {
      icon: Users,
      title: 'Chapter Meetings',
      content: (
        <>
          <p className="text-gray-600 mb-2">Sundays at 7:00 PM</p>
          <p className="text-gray-600">Various Locations</p>
        </>
      ),
      counter: 15 // Example counter
    },
    {
      icon: MapPin,
      title: 'Location',
      content: (
        <>
          <p className="text-gray-600 mb-2">Yoomo Specs</p>
          <p className="text-gray-600">Teshie, Accra - Ghana</p>
        </>
      )
    }
  ];

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen flex items-center">
      <div
        ref={containerRef}
        className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto"
      >
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white rounded-lg shadow-md p-6 text-center flex-1 w-full min-w-[260px] sm:min-w-72 max-w-80 flex flex-col items-center cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={() => handleTouchEnd(index)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                ref={el => iconsRef.current[index] = el}
                className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center text-amber-600 mb-4"
              >
                <IconComponent size={24} />
              </div>
              <h2 className="mb-4 text-lg font-bold text-gray-800">{card.title}</h2>
              {card.counter && (
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  <span 
                    ref={el => numbersRef.current[index] = el}
                    data-target={card.counter}
                  >
                    0
                  </span>
                  <span>+</span>
                </div>
              )}
              <div>{card.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}