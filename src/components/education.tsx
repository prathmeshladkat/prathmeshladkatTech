import Image from "next/image";
import React from "react";

const Education = () => {
  const education = {
    logo: "/collee.jpg",
    university: "Savitribai Phule pune University",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    year: "2019 - 2023",
    link: "#",
  };

  return (
    <div className="w-full max-w-[650px] mx-auto px-6 py-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Education
      </h2>

      <a
        href={education.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 group"
      >
        {/* University Logo */}
        <div className="flex-shrink-0">
          <Image
            width={48}
            height={48}
            src={education.logo}
            alt={education.university}
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>

        {/* Education Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {education.university}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {education.degree}
          </p>
        </div>

        {/* Year */}
        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {education.year}
          </span>
        </div>
      </a>
    </div>
  );
};

export default Education;