'use client';

import { useEffect, useRef, useState } from 'react';

interface QA {
  Question?: string;
  createdAt?: string;
}

interface Course {
  Title?: string;
  Description?: string;
  _descText?: string;
  _topics?: Array<{ question: string; date: string; courseTitle: string }>;
  question_and_answers?: QA[];
}

interface LearnProps {
  data?: {
    learning_courses?: Course[];
  };
}

const COLOR_CLASSES = ['blue', 'red', 'orange', 'green', 'purple'];

export default function Learn({ data }: LearnProps) {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<any>(null);
  const [domReady, setDomReady] = useState(false);
  const courses = data?.learning_courses || [];

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (!domReady || !swiperContainerRef.current || courses.length === 0) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const initSwiper = () => {
      if (cancelled) return;
      const w = window as any;
      if (typeof w.Swiper === 'undefined') return;

      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }

      const container = swiperContainerRef.current;
      if (!container) return;

      swiperInstance.current = new w.Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        navigation: false,
        effect: 'coverflow',
        grabCursor: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true
        },
        // autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: {
          el: container.querySelector('.swiper-pagination') as HTMLElement,
          clickable: true,
        },
        breakpoints: {
          560: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 1.5
          }
        }
      });
    };

    // Initialize slider after 3 seconds of page load
    timer = setTimeout(initSwiper, 3000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [domReady, courses.length]);

  if (!data) return null;

  // Collect all Q&A topics (pre-parsed on server)
  const allTopics: Array<{ question: string; date: string; courseTitle: string }> = [];
  courses.forEach((course) => {
    (course._topics || []).forEach((t) => allTopics.push(t));
  });

  const seen = new Set<string>();
  const uniqueTopics = allTopics
    .filter((t) => {
      if (seen.has(t.question)) return false;
      seen.add(t.question);
      return true;
    })
    .slice(0, 3);

  return (
    <section className="learn-section">
      <div className="container">
        <div className="learn-header">
          <h2 className="learn-title">
            Learn to <span>Invest Better</span>
          </h2>
          <p className="learn-subtitle">
            Master the fundamentals of investing with our educational resources
          </p>
        </div>
        <div className="learn-content">
          <div className="learn-slider">
            <div ref={swiperContainerRef} className="swiper course-swiper">
              <div className="swiper-wrapper">
                {courses.map((course, i) => {
                  const descText = course._descText || '';
                  const color = COLOR_CLASSES[i % COLOR_CLASSES.length];
                  const qaCount = (course.question_and_answers || []).length;

                  return (
                    <div key={i} className="swiper-slide">
                      <div className={`card ${color}`}>
                        <div className="card-top">
                          <div>
                            <h3>{course.Title}</h3>
                            <p>{descText}</p>
                          </div>
                          <span className="badge">
                            {qaCount > 0 ? 'In Progress' : 'New'}
                          </span>
                        </div>
                        <div>
                          <div className="progress-row">
                            <span>Progress</span>
                            <span>0 of {qaCount} completed</span>
                          </div>
                          <div className="track">
                            <div className="fill" style={{ width: '0%' }} />
                          </div>
                          <button className="resume-btn">Start Learning</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="learn-topics">
            <h3 className="learn-topics-title">Popular Topics</h3>
            <div className="learn-topic-list">
              {uniqueTopics.map((topic, i) => (
                <div key={i} className="learn-topic-item">
                  <div className="learn-topic-info">
                    <h4 className="learn-topic-name">{topic.question}</h4>
                    <p className="learn-topic-date">{topic.date}</p>
                  </div>
                  <span className="learn-topic-badge beginner">{topic.courseTitle}</span>
                </div>
              ))}
            </div>
            <a href="#" className="learn-browse-link">Browse All Topics</a>
          </div>
        </div>
      </div>
    </section>
  );
}
