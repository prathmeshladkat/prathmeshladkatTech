import Image from "next/image";
import React from "react";

const Experience = () => {
  const experiences = [
    {
      logo: "/company1.jpg", // put your company logo in public/
      company: "RawRecruit",
      role: "Software Engineering Intern",
      duration: "Nov 2025 - Mar 2026",
      description:
        "Built and shipped X feature using React and Node.js. Worked closely with the backend team to integrate REST APIs and reduced page load time by 30%.",
      link: "https://www.linkedin.com/company/rawrecruit-campustocubicle/",
    },
  ];

  return (
    <div className="w-full max-w-[650px] mx-auto px-6 py-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Experience
      </h2>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <a
            key={index}
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <Image
                width={48}
                height={48}
                src={exp.logo}
                alt={exp.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exp.company}
              </h3>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                {exp.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {exp.description}
              </p>
            </div>

            {/* Duration */}
            <div className="flex-shrink-0">
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {exp.duration}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Experience;