import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { MainTrainerPage } from "./features/trainer";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { QueryClient,QueryClientProvider } from "react-query";
import ReportList from "./features/trainer/components/ReportList";
import TraineeList from "./features/trainer/components/TraineeList";
import LandingPage from "./features/landing/LandingPage";
import TraineeDetails from "./features/trainer/components/trainee-details/TraineeDetails";
import MentorshipList from "./features/trainer/components/memberships/MentorshipList";
import Layout from "./features/nav/Layout";
import MentorshipDetails from "./features/trainer/components/trainee-details/components/MentorshipDetails";
import TrainerDetails from "./features/trainer/components/TrainerDetails";
import AddTrainee from "./features/trainer/components/trainee-details/components/AddTrainee";
import MainTraineePage from "./features/trainee/pages/MainTraineePage";
import EditTrainee from "./features/trainer/components/trainee-details/EditTrainee";
import ReportDetails from "./features/trainer/components/reports/ReportDetails";
import AddMentorship from "./features/trainer/components/memberships/AddMentorship";
import MentorshipDetailsPage from "./features/trainer/components/memberships/MentorshipDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/trainer/dashboard",
    element: <MainTrainerPage/>,
  },
  {
    path: "/trainer/trainee-list",
    element: <TraineeList/>,
  },
  {
    path: "/trainer/reports",
    element: <ReportList/>,
  },
  {
    path: "/trainer/trainee-details/:id",
    element: <TraineeDetails />,
  },
  {
    path:"/trainer/memberships",
    element: <MentorshipList/>
  },
  {
    path:"/trainer/profile",
    element: <TrainerDetails/>
  },
  {
    path:"/trainer/new-trainee",
    element: <AddTrainee/>
  },
  {
    path:"/trainee/dashboard",
    element: <MainTraineePage/>
  },
  {
    path: "/trainer/edit-trainee/:id",  
    element: <EditTrainee />,
  },
  {
    path: "/reports/:id",
    element: <ReportDetails/>
  },{
    path:"/trainer/:trainerId/mentorship/add",
    element: <AddMentorship/>
  },
  {
    path:"/mentorship/details/:mentorshipId",
    element: <MentorshipDetailsPage/>
  }
]);


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>
    <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>
    </Layout>
  </React.StrictMode>
);