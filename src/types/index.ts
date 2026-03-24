export type AppType = 
  | 'SaaS' 
  | 'Dashboard' 
  | 'Admin panel' 
  | 'CRUD app' 
  | 'Marketplace' 
  | 'AI tool' 
  | 'Landing page' 
  | 'Ecommerce' 
  | 'Custom';

export interface PageRequirement {
  id: string;
  name: string;
  purpose: string;
  features: string;
}

export interface ProjectRequirements {
  projectName: string;
  appType: AppType;
  description: string;
  targetUsers: string;
  pages: PageRequirement[];
  features: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    stateManagement: string;
  };
  design: {
    style: string;
    primaryColor: string;
    secondaryColor: string;
    typography: string;
    responsiveness: string;
  };
  integrations: string[];
  architectureRules: {
    cleanArchitecture: boolean;
    reusableComponents: boolean;
    minimalDependencies: boolean;
    errorHandling: boolean;
    loadingStates: boolean;
    basicValidation: boolean;
    accessibilityBestPractices: boolean;
    seoFriendlyStructure: boolean;
    performanceOptimization: boolean;
    codeSplitting: boolean;
    lazyLoading: boolean;
    cachingStrategies: boolean;
    internationalizationSupport: boolean;
    securityBestPractices: boolean;
    rateLimitingSupport: boolean;
    loggingSystem: boolean;
    testingSupport: boolean;
    typeSafetyEnforcement: boolean;
  };
  customRequirements: string;
}

export interface GeneratedPrompt {
  id: string;
  title: string;
  content: string;
  date: string;
  requirements: ProjectRequirements;
}
