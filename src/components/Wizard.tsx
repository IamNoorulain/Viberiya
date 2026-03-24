import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Check, 
  Layout, 
  Zap, 
  Code, 
  Palette, 
  Globe, 
  ShieldCheck, 
  MessageSquare, 
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectRequirements, AppType, PageRequirement } from "../types";

interface WizardProps {
  initialData?: ProjectRequirements;
  onGenerate: (data: ProjectRequirements) => void;
  isLoading: boolean;
}

const DEFAULT_REQUIREMENTS: ProjectRequirements = {
  projectName: "",
  appType: "SaaS",
  description: "",
  targetUsers: "",
  pages: [{ id: "1", name: "Home", purpose: "Landing page", features: "Hero section, features list, CTA" }],
  features: [],
  techStack: {
    frontend: "Next.js",
    backend: "Node",
    database: "PostgreSQL",
    auth: "JWT",
    stateManagement: "Auto decide",
  },
  design: {
    style: "Minimal",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E293B",
    typography: "System",
    responsiveness: "Mobile first",
  },
  integrations: [],
  architectureRules: {
    cleanArchitecture: true,
    reusableComponents: true,
    minimalDependencies: true,
    errorHandling: true,
    loadingStates: true,
    basicValidation: true,
    accessibilityBestPractices: false,
    seoFriendlyStructure: false,
    performanceOptimization: false,
    codeSplitting: false,
    lazyLoading: false,
    cachingStrategies: false,
    internationalizationSupport: false,
    securityBestPractices: false,
    rateLimitingSupport: false,
    loggingSystem: false,
    testingSupport: false,
    typeSafetyEnforcement: false,
  },
  customRequirements: "",
};

const APP_TYPES: AppType[] = [
  "SaaS", "Dashboard", "Admin panel", "CRUD app", "Marketplace", "AI tool", "Landing page", "Ecommerce", "Custom"
];

const FEATURE_OPTIONS = [
  "Authentication", "Database", "Dashboard", "Forms", "Search", "Filters", 
  "File upload", "Notifications", "Admin panel", "Roles", "Dark mode", "API integration",
  "User profiles", "Role-based access", "Admin dashboard", "Settings panel", 
  "Activity logs", "Search system", "Advanced filtering", "Sorting", "Pagination",
  "Image upload", "Media management", "Payment processing", "Subscription system",
  "Multi-tenant support", "Real-time updates", "Commenting system", "Messaging/chat",
  "Export data", "Import data", "SEO optimization", "Accessibility support",
  "Analytics dashboard", "Reporting system", "Email notifications", "Webhook support",
  "Background jobs"
];

const INTEGRATION_OPTIONS = [
  "Stripe", "PayPal", "Google Maps", "OpenAI API", "Gemini API", "Email service",
  "Cloudinary file upload", "AWS S3 storage", "Firebase services", "Slack notifications",
  "Discord webhooks", "Analytics (Google Analytics)", "Search services", "Webhook integrations"
];

export const Wizard: React.FC<WizardProps> = ({ initialData, onGenerate, isLoading }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectRequirements>(initialData || DEFAULT_REQUIREMENTS);

  const totalSteps = 9;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateData = (updates: Partial<ProjectRequirements>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const addPage = () => {
    const newPage: PageRequirement = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      purpose: "",
      features: "",
    };
    updateData({ pages: [...data.pages, newPage] });
  };

  const removePage = (id: string) => {
    updateData({ pages: data.pages.filter((p) => p.id !== id) });
  };

  const updatePage = (id: string, updates: Partial<PageRequirement>) => {
    updateData({
      pages: data.pages.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const toggleFeature = (feature: string) => {
    const features = data.features.includes(feature)
      ? data.features.filter((f) => f !== feature)
      : [...data.features, feature];
    updateData({ features });
  };

  const toggleIntegration = (integration: string) => {
    const integrations = data.integrations.includes(integration)
      ? data.integrations.filter((i) => i !== integration)
      : [...data.integrations, integration];
    updateData({ integrations });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Project Basics</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={data.projectName}
                  onChange={(e) => updateData({ projectName: e.target.value })}
                  placeholder="e.g. Viberiya"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">App Type</label>
                <select
                  value={data.appType}
                  onChange={(e) => updateData({ appType: e.target.value as AppType })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {APP_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => updateData({ description: e.target.value })}
                  placeholder="What does your app do?"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Users</label>
                <input
                  type="text"
                  value={data.targetUsers}
                  onChange={(e) => updateData({ targetUsers: e.target.value })}
                  placeholder="e.g. Developers, Small business owners"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Layout className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Pages</h2>
              </div>
              <button
                onClick={addPage}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Page
              </button>
            </div>
            <div className="space-y-4">
              {data.pages.map((page, index) => (
                <div key={page.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Page {index + 1}</span>
                    {data.pages.length > 1 && (
                      <button
                        onClick={() => removePage(page.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={page.name}
                      onChange={(e) => updatePage(page.id, { name: e.target.value })}
                      placeholder="Page Name (e.g. Dashboard)"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={page.purpose}
                      onChange={(e) => updatePage(page.id, { purpose: e.target.value })}
                      placeholder="Purpose (e.g. Overview of metrics)"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <textarea
                    value={page.features}
                    onChange={(e) => updatePage(page.id, { features: e.target.value })}
                    placeholder="Key features for this page..."
                    rows={2}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Features</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FEATURE_OPTIONS.map((feature) => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                    data.features.includes(feature)
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {feature}
                  {data.features.includes(feature) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Tech Stack</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frontend</label>
                <select
                  value={data.techStack.frontend}
                  onChange={(e) => updateData({ techStack: { ...data.techStack, frontend: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Next.js</option>
                  <option>React</option>
                  <option>Vue</option>
                  <option>Nuxt</option>
                  <option>Svelte</option>
                  <option>SvelteKit</option>
                  <option>Angular</option>
                  <option>SolidJS</option>
                  <option>Astro</option>
                  <option>Vanilla HTML/CSS/JS</option>
                  <option>Auto-select best framework</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backend</label>
                <select
                  value={data.techStack.backend}
                  onChange={(e) => updateData({ techStack: { ...data.techStack, backend: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>None (Frontend only)</option>
                  <option>Node.js (Express)</option>
                  <option>Node.js (Fastify)</option>
                  <option>Node.js (NestJS)</option>
                  <option>Python (FastAPI)</option>
                  <option>Python (Flask)</option>
                  <option>Python (Django)</option>
                  <option>PHP (Laravel)</option>
                  <option>Ruby on Rails</option>
                  <option>Go (Gin)</option>
                  <option>Java (Spring Boot)</option>
                  <option>.NET API</option>
                  <option>Serverless Functions</option>
                  <option>Auto select</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Database</label>
                <select
                  value={data.techStack.database}
                  onChange={(e) => updateData({ techStack: { ...data.techStack, database: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>None</option>
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>MongoDB</option>
                  <option>SQLite</option>
                  <option>Supabase</option>
                  <option>Firebase Firestore</option>
                  <option>Redis</option>
                  <option>PlanetScale</option>
                  <option>Neon</option>
                  <option>Browser Storage (localStorage / IndexedDB)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Authentication</label>
                <select
                  value={data.techStack.auth}
                  onChange={(e) => updateData({ techStack: { ...data.techStack, auth: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>None</option>
                  <option>JWT authentication</option>
                  <option>Session authentication</option>
                  <option>OAuth login</option>
                  <option>Google login</option>
                  <option>GitHub login</option>
                  <option>Email/password authentication</option>
                  <option>Firebase authentication</option>
                  <option>Auth0</option>
                  <option>Magic link authentication</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Palette className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Design</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Style</label>
                <select
                  value={data.design.style}
                  onChange={(e) => updateData({ design: { ...data.design, style: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Minimal</option>
                  <option>Modern SaaS</option>
                  <option>Professional</option>
                  <option>Glassmorphism</option>
                  <option>Neumorphism</option>
                  <option>Material Design</option>
                  <option>Apple-style UI</option>
                  <option>Corporate UI</option>
                  <option>Startup landing style</option>
                  <option>Dark mode focused UI</option>
                  <option>Auto choose best design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typography</label>
                <select
                  value={data.design.typography}
                  onChange={(e) => updateData({ design: { ...data.design, typography: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>System fonts</option>
                  <option>Modern sans serif</option>
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Poppins</option>
                  <option>Montserrat</option>
                  <option>Lato</option>
                  <option>Source Sans Pro</option>
                  <option>Nunito</option>
                  <option>Playfair Display</option>
                  <option>Auto choose best typography</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={data.design.primaryColor}
                    onChange={(e) => updateData({ design: { ...data.design, primaryColor: e.target.value } })}
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={data.design.primaryColor}
                    onChange={(e) => updateData({ design: { ...data.design, primaryColor: e.target.value } })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={data.design.secondaryColor}
                    onChange={(e) => updateData({ design: { ...data.design, secondaryColor: e.target.value } })}
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={data.design.secondaryColor}
                    onChange={(e) => updateData({ design: { ...data.design, secondaryColor: e.target.value } })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Integrations</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTEGRATION_OPTIONS.map((integration) => (
                <button
                  key={integration}
                  onClick={() => toggleIntegration(integration)}
                  className={`px-4 py-4 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                    data.integrations.includes(integration)
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {integration}
                  {data.integrations.includes(integration) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Architecture Rules</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(data.architectureRules).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => updateData({ 
                    architectureRules: { ...data.architectureRules, [key]: !value } 
                  })}
                  className={`w-full px-4 py-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                    value
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <div className={`w-10 h-6 rounded-full transition-colors relative ${value ? "bg-blue-600" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? "left-5" : "left-1"}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Custom Requirements</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions</label>
              <textarea
                value={data.customRequirements}
                onChange={(e) => updateData({ customRequirements: e.target.value })}
                placeholder="Any other specific requirements, constraints, or preferences?"
                rows={10}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Review & Generate</h2>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6 max-h-[60vh] overflow-y-auto border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Project</h4>
                  <p className="text-sm font-semibold text-gray-900">{data.projectName || "Untitled Project"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</h4>
                  <p className="text-sm font-semibold text-gray-900">{data.appType}</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pages</h4>
                <div className="flex flex-wrap gap-2">
                  {data.pages.map(p => (
                    <span key={p.id} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                      {p.name || "Unnamed Page"}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {data.features.map(f => (
                    <span key={f} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tech Stack</h4>
                <p className="text-sm text-gray-700">
                  {data.techStack.frontend} • {data.techStack.backend} • {data.techStack.database}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                Ready to generate your professional build prompt? Gemini will use these details to craft a structured, token-efficient prompt for your coding AI.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-12rem)]">
      {/* Progress Bar */}
      <div className="mb-8 px-4">
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 max-h-[calc(100vh-18rem)] overflow-y-auto custom-scrollbar"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 mt-8 flex items-center justify-between gap-4">
        <button
          onClick={prevStep}
          disabled={step === 1 || isLoading}
          className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={step === 1 && !data.projectName.trim()}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            Next Step
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => onGenerate(data)}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Prompt
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
