import React from "react";

const Skills = () => {
  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Kafka",
    "C++",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "GCP",
    "Redis",
  ];

  return (
    <div className="w-full max-w-[650px] mx-auto px-6 py-4">
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
  );
};

export default Skills;