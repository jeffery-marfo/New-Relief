import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Music, Heart, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurMinistries() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  const ministries = [
    {
      title: "Children's Ministry",
      description: "Nurturing faith in our youngest members through age-appropriate activities.",
      icon: Users
    },
    {
      title: "Worship Ministry",
      description: "Leading our congregation in worship through music and creative arts.",
      icon: Music
    },
    {
      title: "Outreach & Missions",
      description: "Serving our local community and supporting global mission efforts.",
      icon: Heart
    },
    {
      title: "Bible Study Groups",
      description: "Small groups meeting regularly to study scripture and grow in faith.",
      icon: BookOpen
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Cards fly in alternately from left and right with elastic easing
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const fromLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            {
              x: fromLeft ? -300 : 300,
              y: 100,
              opacity: 0,
              scale: 0.8,
              rotation: fromLeft ? -15 : 15
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              delay: index * 0.15,
              ease: 'elastic.out(1, 0.6)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // Icon bounce animation with elastic
      gsap.fromTo(
        iconsRef.current,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover animations
  const handleCardHover = (index) => {
    const card = cardsRef.current[index];
    const icon = iconsRef.current[index];

    gsap.to(card, {
      scale: 1.05,
      y: -10,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(icon, {
      scale: 1.2,
      rotation: 360,
      duration: 0.6,
      ease: 'back.out(2)'
    });
  };

  const handleCardLeave = (index) => {
    const card = cardsRef.current[index];
    const icon = iconsRef.current[index];

    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: 'back.out(2)'
    });
  };

  const handleCardTouchStart = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { scale: 0.98, y: -4, duration: 0.1, ease: 'power1.out' });
  };

  const handleCardTouchEnd = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { scale: 1, y: 0, duration: 0.15, ease: 'power1.out' });
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 ref={titleRef} className="text-4xl font-bold text-gray-900 mb-4">
          Our Ministries
        </h2>
        <p ref={subtitleRef} className="text-lg text-gray-700 max-w-3xl mx-auto">
          We offer various ministries to help you connect, grow, and serve in our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministries.map((ministry, index) => {
          const IconComponent = ministry.icon;
          return (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              onTouchStart={() => handleCardTouchStart(index)}
              onTouchEnd={() => handleCardTouchEnd(index)}
            >
              <div 
                ref={el => iconsRef.current[index] = el}
                className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center text-amber-500 mb-4"
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{ministry.title}</h3>
              <p className="text-gray-600">{ministry.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}