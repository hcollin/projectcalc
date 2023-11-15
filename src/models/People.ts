

export interface Person {
    id: string;
    name?: string;
    roles: [PERSONROLE, SENIORITY][];
    hats: string[]
    
}


export enum PERSONROLE {
    
    Developer = "Developer",
    Designer = "Designer",
    Manager = "Manager",
    Tester = "Tester",

    // BackendDeveloper = "Backend Developer",
    // FrontendDeveloper = "Frontend Developer",
    // InfraDeveloper = "Infra Developer",

    // UXDesigner = "UX Designer",
    // UIDesigner = "UI Designer",
    // ServiceDesigner = "Service Designer",

    // Tester = "Test Developer",
    // SoftwareArchitect = "Software Architect",
    // SolutionArchitect = "Solution Architect",

    // ProjectManager = "Project Manager",
    // ScrumMaster = "Scrum Master",
    // ProductOwner = "Product Owner",
    // DataScientist = "Data Scientist",
    // DataAnalyst = "Data Analyst",
    // DataEngineer = "Data Engineer",
    // DataArchitect = "Data Architect",

    // ProjectDirector = "Project Director",

    // TechnicalWriter = "Technical Writer",
    // BusinessAnalyst = "Business Analyst",
}

export enum SENIORITY {
    all = "all",
    Intern = "Intern",
    Junior = "Junior",
    Mid = "Mid",
    Senior = "Senior",
    Lead = "Lead",
    Principal = "Principal",
}

export enum HATS {
    SCRUMMASTER = "Scrumm Master",
    PRODUCTOWNER = "Product Owner",
    PROJECTMANAGER = "Project Manager",
}