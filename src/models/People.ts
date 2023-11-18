

export interface Person {
    id: string;
    name?: string;
    pricegroup: string;
    roles: [PERSONROLE, SENIORITY][];  // The role, seniority
    allocation: number;
    
}


export enum PERSONROLE {
    
    Architect = "Architect",
    Developer = "Developer",
    Designer = "Designer",
    Manager = "Manager",
    Tester = "Tester",
    Agile = "Agile",
    Data = "Data",

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
