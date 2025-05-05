// // 

// import { NextApiRequest, NextApiResponse } from "next";
// import { getSuggestedEmployees } from "../../lib/employeeService";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { requiredSkills } = req.body; // Get skills from request body


//       const employees = await getSuggestedEmployees(requiredSkills); // Pass skills for filtering
//       console.log(employees);
      
//       res.status(200).json(employees);
//     } catch (error) {
//       res.status(500).json({
//         message: "Failed to fetch suggested employees",
//         error: error.message,
//       });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }


import { NextApiRequest, NextApiResponse } from "next";
import { getSuggestedEmployees } from "@/lib/employeeService";

export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method Not Allowed" });
  // }

  try {
  //   const { requiredSkills } = req.body;

  //   if (!requiredSkills || !Array.isArray(requiredSkills)) {
  //     return res.status(400).json({ message: "Invalid skills input" });
  //   }

  //   const employees = await getSuggestedEmployees(requiredSkills);

  //   if (!employees || employees.length === 0) {
  //     return res.status(404).json({ message: "No employees found" });
  //   }

  //   return res.status(200).json(employees);
  const { requiredSkills } = req.body

  console.log(requiredSkills);
  if (!requiredSkills || !Array.isArray(requiredSkills)) {
        return res.status(400).json({ message: "Invalid skills input" });
      }

      const employees = await getSuggestedEmployees(requiredSkills);
      console.log(employees);
      

         if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    return res.status(200).json(employees);
      

  } catch (error) {
    console.error("Error fetching suggested employees:", error);
    return res.status(500).json({
      message: "Failed to fetch suggested employees",
      error: error.message,
    });
  }
}
