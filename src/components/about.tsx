import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="w-full max-w-[660px] mx-auto px-6 pt-20 pb-12">
      <div className="flex items-start gap-6 mb-12">
        {/* Text Content */}
        <div className="flex-1">
          <h1
            className="font-bold mb-2 leading-tight text-gray-900 dark:text-white whitespace-nowrap"
            style={{ fontSize: "50px" }}
          >
            Hi, I&apos;m Prathmesh{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p
            className="text-gray-900 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: "18px" }}
          >
            Web3 Developer with a Web2 day job - building, learning, and sharing
            on X.
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            width={"200"}
            height={"200"}
            src="/mine1.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>
      </div>

      {/* About Section */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          About
        </h2>
        <p
          className="text-gray-500 dark:text-gray-300 leading-relaxed"
          style={{ fontSize: "14px" }}
        >
          I&apos;m a Full Stack Developer passionate about building scalable
          SaaS and decentralized apps. I&apos;ve developed projects like a
          Kafka-based notification system and BizzyBee, a social platform.
          Focused on TypeScript, distributed systems, and Web3, I aim to create
          developer-first tools that bridge innovation, scalability, and
          real-world impact.
        </p>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          10%,
          30% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }
        .animate-wave {
          animation: wave 2.5s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default About;
