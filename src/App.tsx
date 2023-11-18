import { useState } from 'react';
import { Project } from './models/Project';


import { exampleProject } from './data/exampleData';
import { emptyProjectData } from './data/emptyProject';

import PricesView from './views/PricesView';
import PhasesView from './views/PhasesView';
import TeamsView from './views/TeamsView';
import ProjectTimelineView from './views/ProjectTimelineView';
import MainMenuTop from './views/MainMenuTop';

import './App.css';
import ChartsView from './views/ChartsView';

function App() {

  const [project, setProject] = useState<Project>(exampleProject);

  const [activeView, setActiveView] = useState<string>("prices");

  // const [menuState, setMenuState] = useState<boolean>(false);

  // function changeMenuState(state: boolean) {
  //   setMenuState(state);
  // }

  function updateProject(project: Project) {
    setProject(project);
  }

  function updateActiveView(view: string) {
    setActiveView(view);
  }

  return (
    <>
      <MainMenuTop active={activeView} onViewModeUpdate={updateActiveView} project={project} updateProject={updateProject}/>
      {/* <MainMenuRight active={activeView} onUpdate={updateActiveView} isOpen={menuState} /> */}


      {activeView === "prices" && <PricesView project={project} onUpdate={updateProject} />}
      {activeView === "phases" && <PhasesView project={project} onUpdate={updateProject} />}
      {activeView === "teams" && <TeamsView project={project} onUpdate={updateProject} />}
      {activeView === "charts" && <ChartsView project={project} onUpdate={updateProject} />}
      {/* {activeView === "timeline" && <ProjectTimelineView project={project} onUpdate={updateProject} />} */}


      {/* <ProjectSummary project={project} /> */}

    </>

  );
}

export default App;
