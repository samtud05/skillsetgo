"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ChatIcon from "@/components/bot/chaticon";
import ChatWindow from "@/components/bot/chatwindow";

// const faqs = [
//   {
//     question: "What is ZCRUM?",
//     answer:
//       "ZCRUM is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.",
//   },
//   {
//     question: "How does ZCRUM compare to other project management tools?",
//     answer:
//       "ZCRUM offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.",
//   },
//   {
//     question: "Is ZCRUM suitable for small teams?",
//     answer:
//       "Absolutely! ZCRUM is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from ZCRUM's features.",
//   },
//   {
//     question: "What key features does ZCRUM offer?",
//     answer:
//       "ZCRUM provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.",
//   },
//   {
//     question: "Can ZCRUM handle multiple projects simultaneously?",
//     answer:
//       "Yes, ZCRUM is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes ZCRUM ideal for organizations juggling multiple projects or clients.",
//   },
//   {
//     question: "Is there a learning curve for new users?",
//     answer:
//       "While ZCRUM is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.",
//   },
// ];

// const features = [
//   {
//     title: "Intuitive Kanban Boards",
//     description:
//       "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
//     icon: Layout,
//   },
//   {
//     title: "Powerful Sprint Planning",
//     description:
//       "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
//     icon: Calendar,
//   },
//   {
//     title: "Comprehensive Reporting",
//     description:
//       "Gain insights into your team's performance with detailed, customizable reports and analytics.",
//     icon: BarChart,
//   },
// ];

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline Your Workflow <br />
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            with {" "}
            {/* <Image
              src={"/logo2.png"}
              alt="Zscrum Logo"
              width={400}
              height={80}
              className="h-14 sm:h-24 w-auto object-contain"
            /> */}
            <span className="gradient-title-logo">Skill-Set-GO</span>
            
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Empower your team with our intuitive project management solution.
        </p>
        <p className="text-xl mb-12 max-w-2xl mx-auto"></p>
        <Link href="/onboarding">
          <Button size="lg" className="mr-4">
            Get Started <ChevronRight size={18} className="ml-1" />
          </Button>
        </Link>
        <Link href="#features">
          {/* <Button size="lg" variant="outline">
            Learn More
          </Button> */}
        </Link>
       
      </section>

     
    </div>
  );
}
