// const employees = [
//     { name: "Employee_1", skills: ["Java", "Docker", "Django", "React", "Azure"], experienceLevel: "Mid", workload: 0 },
//     { name: "Employee_2", skills: [".NET", "C#", "Django", "Java"], experienceLevel: "Senior", workload: 5 },
//     { name: "Employee_3", skills: ["Redis", "HTML", "Next.js", "Flutter"], experienceLevel: "Junior", workload: 3 },
//     { name: "Employee_4", skills: ["TypeScript", "Spring"], experienceLevel: "Senior", workload: 1 },
//     { name: "Employee_5", skills: ["PyTorch", "Redis", "Java", "React", "TensorFlow"], experienceLevel: "Senior", workload: 0 }
// ];

// export async function getSuggestedEmployees(requiredSkills) {
//     // Normalize required skills for case-insensitive comparison
//     const normalizedSkills = requiredSkills.map(skill => skill.toLowerCase());

//     // Map experience levels to a numerical value for sorting (higher is better)
//     const experienceRanking = { "Junior": 1, "Mid": 2, "Senior": 3 };

//     // Filter employees based on skills and workload
//     let matchingEmployees = employees.filter(employee => {
//         const employeeSkills = employee.skills.map(skill => skill.toLowerCase());

//         // Check if employee has at least one required skill
//         const hasRequiredSkills = normalizedSkills.some(skill => employeeSkills.includes(skill));

//         // Employee is eligible if they have at least one required skill and a manageable workload
//         return hasRequiredSkills && employee.workload < 4;  // Allowing workload up to 3
//     });

//     // Sort employees based on workload (lower is better) and experience level (higher is better)
//     matchingEmployees.sort((a, b) => {
//         if (a.workload !== b.workload) {
//             return a.workload - b.workload; // Prioritize lower workload
//         }
//         return experienceRanking[b.experienceLevel] - experienceRanking[a.experienceLevel]; // Prioritize higher experience
//     });

//     // Return only necessary details
//     return matchingEmployees.map(({ name, skills, experienceLevel, workload }) => ({
//         name,
//         skills,
//         experienceLevel,
//         workload
//     }));
// }


import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const csvFilePath = path.join(process.cwd(), "data", "employees.csv");

export async function getSuggestedEmployees(requiredSkills) {
    return new Promise((resolve, reject) => {
        const employees = [];
        
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on("data", (row) => {
                employees.push({
                    name: row.name,
                    skills: row.skills.split(",").map(skill => skill.trim()), // Convert CSV string to array
                    experienceLevel: row.experienceLevel,
                    workload: parseInt(row.workload, 10) // Convert workload to a number
                });
            })
            
            .on("end", () => {
                // Normalize required skills for case-insensitive comparison
                const normalizedSkills = requiredSkills.map(skill => skill.toLowerCase());

                // Experience level ranking
                const experienceRanking = { "Junior": 1, "Mid": 2, "Senior": 3 };

                // Filter employees based on required skills and workload
                let matchingEmployees = employees.filter(employee => {
                    const employeeSkills = employee.skills.map(skill => skill.toLowerCase());

                    // Check if the employee has at least one required skill
                    const hasRequiredSkills = normalizedSkills.some(skill => employeeSkills.includes(skill));

                    // Allow workload up to 3
                    return hasRequiredSkills && employee.workload < 4;
                });

                // Sort by workload (lower is better) and experience level (higher is better)
                matchingEmployees.sort((a, b) => {
                    if (a.workload !== b.workload) {
                        return a.workload - b.workload; // Prioritize lower workload
                    }
                    return experienceRanking[b.experienceLevel] - experienceRanking[a.experienceLevel]; // Higher experience first
                });

                // Return only necessary details
                resolve(matchingEmployees.map(({ name, skills, experienceLevel, workload }) => ({
                    name,
                    skills,
                    experienceLevel,
                    workload
                })));
            })
            .on("error", (error) => reject(error));
    });
}
