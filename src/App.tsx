
import { Box, Card, CardContent, Container, Drawer, Typography, createTheme } from '@mui/material';
import './App.css';
import ProjectPeople from './views/ProjectPeople';
import { ThemeProvider } from '@emotion/react';
import { Draw } from '@mui/icons-material';
import PriceSlider from './components/PriceSlider';
import { useState } from 'react';
import { PriceItem, Project } from './models/Project';
import { PERSONROLE, SENIORITY } from './models/People';
import Prices from './components/Prices';
import { exampleProject } from './data/exampleData';
import TotalPrice from './components/TotalPrice';
import Phases from './components/Phases';
import ProjectSummary from './views/ProjectSummary';
import MainMenuRight from './views/MainMenuRight';
import PricesView from './views/PricesView';
import PhasesView from './views/PhasesView';
import TeamsView from './views/TeamsView';



function App() {

  const [project, setProject] = useState<Project>(exampleProject);

  const [activeView, setActiveView] = useState<string>("prices");

  function updateProject(project: Project) {
    setProject(project);
  }

  function updateActiveView(view: string) {
    setActiveView(view);
  }

  return (
    <>

      <MainMenuRight active={activeView} onUpdate={updateActiveView} />


      {activeView === "prices" && <PricesView project={project} onUpdate={updateProject} />}
      {activeView === "phases" && <PhasesView project={project} onUpdate={updateProject} />}
      {activeView === "teams" && <TeamsView project={project} onUpdate={updateProject} />}

    </>

  );
}

export default App;
