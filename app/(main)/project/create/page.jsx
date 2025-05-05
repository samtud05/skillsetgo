"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/app/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/components/org-switcher";
import Papa from "papaparse";

import "./style/CreateProject.css";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [skills, setSkills] = useState("");
  const [suggestedEmployees, setSuggestedEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

    const projectData = {
      ...data,
      requiredSkills: skills.split(",").map((skill) => skill.trim()),
      assignedEmployees: selectedEmployees,
    };

    createProjectFn(projectData);

    await grantAccessToEmployees(selectedEmployees);
  };

  useEffect(() => {
    if (project) router.push(`/project/${project.id}`);
  }, [loading]);

  const fetchSuggestedEmployees = async () => {
    try {
      const response = await fetch("/api/suggest-employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requiredSkills: skills.split(",").map((s) => s.trim()) }),
      });

      const employees = await response.json();
      setSuggestedEmployees(employees);
    } catch (error) {
      console.error("Error fetching suggested employees:", error);
    }
  };

  const fetchEmailsFromCSV = async () => {
    try {
      const response = await fetch("/path-to-your-csv-file.csv");
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const emails = results.data.map((row) => row.email).filter((email) => email);
          setSelectedEmployees(emails);
        },
      });
    } catch (error) {
      console.error("Error fetching emails from CSV:", error);
    }
  };

  const grantAccessToEmployees = async (emails) => {
    try {
      await fetch("/api/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });
    } catch (error) {
      console.error("Error granting access to employees:", error);
    }
  };

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">Oops! Only Admins can create projects.</span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">Create New Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div>
          <Input id="name" {...register("name")} className="bg-white-950" placeholder="Project Name" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Input id="key" {...register("key")} className="bg-white-950" placeholder="Project Key (Ex: RCYT)" />
          {errors.key && <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>}
        </div>
        <div>
          <Textarea id="description" {...register("description")} className="bg-white-950 h-28" placeholder="Project Description" />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <Input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="bg-white-950" placeholder="Required Skills (comma-separated)" />
        </div>
        <Button type="button" size="lg" onClick={fetchSuggestedEmployees} className="bg-blue-300 text-white">Suggest Employees</Button>

        {suggestedEmployees.length > 0 && (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Experience Level</th>
                <th>Workload</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {suggestedEmployees.map((emp) => (
                <tr key={emp.email}>
                  <td>{emp.name}</td>
                  <td>{emp.experienceLevel}</td>
                  <td>{emp.workload}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedEmployees(prev => e.target.checked ? [...prev, emp.email] : prev.filter(email => email !== emp.email));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Button type="button" onClick={fetchEmailsFromCSV} className="bg-green-500 text-white">Invite</Button>
        <Button type="submit" size="lg" disabled={loading} className="bg-blue-900 text-white">{loading ? "Creating..." : "Create Project"}</Button>
      </form>
    </div>
  );
}