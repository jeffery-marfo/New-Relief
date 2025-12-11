

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heRo2 from '../assets/images/hero2.png';

gsap.registerPlugin(ScrollTrigger);

const LiquidGlassImage = ({ src, alt, className = "" }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    
    if (!canvas || !image || !isLoaded) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let imageData = null;
    let originalData = null;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    const distortImage = () => {
      if (!imageData || !originalData) return;

      ctx.putImageData(originalData, 0, 0);
      
      const { x: mouseX, y: mouseY } = mousePos.current;
      
      if (mouseX < 0 || mouseY < 0 || mouseX > canvas.width || mouseY > canvas.height) {
        animationRef.current = requestAnimationFrame(distortImage);
        return;
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const distortionRadius = 120;
      const distortionStrength = 35;
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const tempImageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < distortionRadius) {
            const distortAmount = (1 - distance / distortionRadius) * distortionStrength;
            const angle = Math.atan2(dy, dx);
            const wave = Math.sin(distance * 0.1 - Date.now() * 0.005) * distortAmount;
            
            const srcX = Math.floor(x + Math.cos(angle) * wave);
            const srcY = Math.floor(y + Math.sin(angle) * wave);
            
            if (srcX >= 0 && srcX < canvas.width && srcY >= 0 && srcY < canvas.height) {
              const destIndex = (y * canvas.width + x) * 4;
              const srcIndex = (srcY * canvas.width + srcX) * 4;
              
              pixels[destIndex] = tempImageData.data[srcIndex];
              pixels[destIndex + 1] = tempImageData.data[srcIndex + 1];
              pixels[destIndex + 2] = tempImageData.data[srcIndex + 2];
              pixels[destIndex + 3] = tempImageData.data[srcIndex + 3];
              
              const shimmer = (1 - distance / distortionRadius) * 30;
              pixels[destIndex] = Math.min(255, pixels[destIndex] + shimmer);
              pixels[destIndex + 1] = Math.min(255, pixels[destIndex + 1] + shimmer);
              pixels[destIndex + 2] = Math.min(255, pixels[destIndex + 2] + shimmer);
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, distortionRadius * 0.8, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, distortionRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(distortImage);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    distortImage();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg cursor-pointer"
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
      {!isLoaded && (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default function AboutUs() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          pin: false,
        }
      });

      tl.fromTo(
        imageRef.current,
        {
          x: -200,
          opacity: 0,
          scale: 0.8,
          rotation: -5
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'power3.out'
        },
        0
      );

      tl.fromTo(
        contentRef.current,
        {
          x: 200,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        },
        0
      );

      tl.fromTo(
        titleRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        },
        0.3
      );

      tl.fromTo(
        paragraphsRef.current,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out'
        },
        0.5
      );

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
        scale: 1.05,
        rotation: 2,
        ease: 'none'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about-section" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Image Container with Liquid Glass Effect */}
        <div 
          ref={imageRef}
          className="w-full md:w-1/2 h-72 md:h-96"
        >
          <LiquidGlassImage
            src={heRo2}
            alt="About New Relief"
            className="w-full h-full"
          />
        </div>
        
        {/* Content Container */}
        <div ref={contentRef} className="w-full md:w-1/2 mt-8 md:mt-0">
          <h1 ref={titleRef} className="text-4xl font-bold text-gray-800 mb-6 relative">
            About New Relief International
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-500 -mb-2"></span>
          </h1>
          
          <p 
            ref={el => paragraphsRef.current[0] = el}
            className="text-lg text-gray-700 mb-4"
          >
            New Relief International is a Christian organization established in 2003. Reaching out to people with the Gospel and nurturing them into maturity in their walk with Jesus Christ is the mission of the organization.
          </p>
          
          <p 
            ref={el => paragraphsRef.current[1] = el}
            className="text-lg text-gray-700 mb-4"
          >
            Our vision is to become an organization with global reach and relevance, and our membership comprises of students, workers, children and professionals from all walks of life. Salvation, service, integrity and leadership are the core values of the organization.
          </p>
          
          <p 
            ref={el => paragraphsRef.current[2] = el}
            className="text-lg text-gray-700 mb-6"
          >
            We are committed to authentic worship, biblical teaching, meaningful 
            relationships, and compassionate service to our community and beyond.
          </p>
          
          <a 
            ref={el => paragraphsRef.current[3] = el}
            href="#" 
            className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded transition-colors duration-300 ease-in-out"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}