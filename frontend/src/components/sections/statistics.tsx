"use client";

import { useState, useEffect, useRef } from "react";

interface StatisticCounterProps {
  endValue: number;
  decimals: number;
  suffix: string;
  label: string;
}

const StatisticCounter: React.FC<StatisticCounterProps> = ({ endValue, decimals, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = progress * endValue;
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, endValue]);

  const formattedCount = count.toFixed(decimals);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-[#0066cc] lg:text-[42px] leading-tight">
        +{formattedCount}
        <span className="text-4xl lg:text-[42px]">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-text-secondary md:text-base">
        {label}
      </p>
    </div>
  );
};

const statisticsData: StatisticCounterProps[] = [
  { endValue: 1.1, decimals: 1, suffix: 'M', label: 'Giáo viên đăng ký' },
  { endValue: 200, decimals: 0, suffix: 'K', label: 'Giáo viên sử dụng trong tháng' },
  { endValue: 12.3, decimals: 1, suffix: 'M', label: 'Học sinh đăng ký' },
  { endValue: 4.5, decimals: 1, suffix: 'M', label: 'Học sinh sử dụng trong tháng' },
  { endValue: 520.0, decimals: 1, suffix: 'M', label: 'Bài tập và kiểm tra được nộp' },
];

export default function StatisticsSection() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Nền tảng kiểm tra đánh giá luôn được tin cậy
          </h2>
          <div className="mx-auto mt-6 mb-16 h-1 w-20 bg-text-primary"></div>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-y-10 gap-x-4 md:grid-cols-5 md:gap-x-4 lg:gap-x-8">
          {statisticsData.map((stat, index) => (
            <StatisticCounter
              key={index}
              endValue={stat.endValue}
              decimals={stat.decimals}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}