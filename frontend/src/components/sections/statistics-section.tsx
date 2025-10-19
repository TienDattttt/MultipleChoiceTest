"use client";

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const animationFrame = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const currentCount = progress * end;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};


const statistics = [
  { prefix: "+", end: 1.1, suffix: "M", label: "Giáo viên đăng ký", decimals: 1 },
  { prefix: "+", end: 200, suffix: "K", label: "Giáo viên sử dụng trong tháng", decimals: 0 },
  { prefix: "+", end: 12.3, suffix: "M", label: "Học sinh đăng ký", decimals: 1 },
  { prefix: "+", end: 4.5, suffix: "M", label: "Học sinh sử dụng trong tháng", decimals: 1 },
  { prefix: "+", end: 520.0, suffix: "M", label: "Bài tập và kiểm tra được nộp", decimals: 1 },
];

export default function StatisticsSection() {
  return (
    <section className="bg-gradient-to-b from-[#E0F7FA]/30 via-white to-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text tracking-tight">
            Nền tảng kiểm tra đánh giá luôn được tin cậy
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <AnimatedCounter
                prefix={stat.prefix}
                end={stat.end}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-5xl lg:text-6xl font-bold text-primary"
              />
              <p className="mt-2 text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}