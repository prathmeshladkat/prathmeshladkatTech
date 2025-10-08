import React from "react";

const EducationSkills = () => {
  const education = {
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=64&h=64&fit=crop",
    university: "Savitribai Phule pune University",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    year: "2019 - 2023",
    link: "#",
  };

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Kafka",
    "C++",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Redis",
  ];

  return (
    <div className="w-full max-w-[650px] mx-auto px-6 py-4">
      {/* Education Section */}
      <div className="mb-12">
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
            <img
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

      {/* Skills Section */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full"
              style={{ height: "25px", display: "flex", alignItems: "center" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSkills;
