// Import required modules
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');


// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to load JSON data and append to the Employee table
const loadEmployeesFromJson = async () => {
  try {
    // Read the JSON file
    const data = fs.readFileSync('./actions/output.json', 'utf-8');

    // Parse the JSON data
    const employees = JSON.parse(data);

    // Iterate through each employee in the JSON array
    for (const employee of employees) {
      const { name, skills, experienceLevel, workload } = employee;

      // Create a new employee record in the database
      await prisma.employee.create({
        data: {
          name,
          skills,
          experienceLevel,
          workload,
        },
      });
    }

    console.log('All employees have been added successfully!');
  } catch (error) {
    console.error('Error loading employees:', error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
};

// Call the function
loadEmployeesFromJson();
