import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserRole = "worker" | "employer" | null;

export interface WorkerProfile {
  id: string;
  photo?: string;
  name: string;
  age: string;
  gender?: string;
  skills: string[];
  customSkill?: string;
  experience: string;
  jobType: string;
  location: string;
  idDocument?: string;
  phone: string;
  verified: boolean;
  rating: number;
  badge: "green" | "yellow" | "red";
  createdAt: string;
}

export interface EmployerProfile {
  id: string;
  name: string;
  phone: string;
  nidDocument?: string;
  tradeLicense?: string;
  verified: boolean;
  wallet: number; // Balance for platform fee deductions
  smsCredits: number;
  createdAt: string;
}

export interface Job {
  id: string;
  employerId: string;
  jobType: string;
  location: string;
  numberOfWorkers: number;
  urgency: "normal" | "urgent";
  paymentAmount: number; // Payment offered to workers
  platformFee: number; // 5% of paymentAmount
  smsCost: number; // Cost of SMS notifications
  status: "pending_confirmation" | "confirmed" | "completed" | "expired";
  confirmedWorkerId?: string;
  selectedCandidates: string[]; // Worker IDs selected for SMS
  expiresAt: string; // When job posting expires
  createdAt: string;
}

interface AppContextType {
  // User state
  userRole: UserRole;
  setUserRole: (role: UserRole) => Promise<void>;
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => Promise<void>;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => Promise<void>;

  // Worker state
  workerProfile: WorkerProfile | null;
  setWorkerProfile: (profile: WorkerProfile | null) => Promise<void>;

  // Employer state
  employerProfile: EmployerProfile | null;
  setEmployerProfile: (profile: EmployerProfile | null) => Promise<void>;

  // Jobs
  jobs: Job[];
  createContractedJob: (job: Job) => Promise<boolean>;
  confirmJobAcceptance: (jobId: string, workerId: string) => Promise<void>;
  refundJobFee: (jobId: string) => Promise<void>;
  updateJobStatus: (jobId: string, status: Job["status"]) => Promise<void>;

  // Mock workers for employer view
  mockWorkers: WorkerProfile[];

  // Loading
  isLoading: boolean;

  // Clear all data
  clearAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const KEYS = {
  USER_ROLE: "@livora_user_role",
  FIRST_LAUNCH: "@livora_first_launch",
  ONBOARDING: "@livora_onboarding",
  WORKER_PROFILE: "@livora_worker_profile",
  EMPLOYER_PROFILE: "@livora_employer_profile",
  JOBS: "@livora_jobs",
};

// Mock worker data for demo
const generateMockWorkers = (): WorkerProfile[] => [
  {
    id: "1",
    name: "রহিম মিয়া",
    age: "26-35",
    skills: ["electrician", "plumber"],
    experience: "oneToThreeYears",
    jobType: "fullTime",
    location: "ঢাকা, মিরপুর",
    phone: "01712345678",
    verified: true,
    rating: 4.5,
    badge: "green",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "করিম হোসেন",
    age: "36-45",
    skills: ["mason", "carpenter"],
    experience: "threeYearsPlus",
    jobType: "daily",
    location: "ঢাকা, গুলশান",
    phone: "01812345678",
    verified: true,
    rating: 4.8,
    badge: "green",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "সালমা বেগম",
    age: "26-35",
    skills: ["cleaner", "cook"],
    experience: "oneToThreeYears",
    jobType: "partTime",
    location: "ঢাকা, ধানমন্ডি",
    phone: "01912345678",
    verified: true,
    rating: 4.2,
    badge: "green",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "জাহিদ আলী",
    age: "18-25",
    skills: ["driver"],
    experience: "lessThan1Year",
    jobType: "fullTime",
    location: "ঢাকা, বনানী",
    phone: "01612345678",
    verified: true,
    rating: 3.8,
    badge: "yellow",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "ফাতেমা আক্তার",
    age: "26-35",
    skills: ["cook", "cleaner"],
    experience: "threeYearsPlus",
    jobType: "fullTime",
    location: "ঢাকা, উত্তরা",
    phone: "01512345678",
    verified: true,
    rating: 4.9,
    badge: "green",
    createdAt: new Date().toISOString(),
  },
];

export function AppProvider({children}: {children: ReactNode}) {
  const [userRole, setUserRoleState] = useState<UserRole>(null);
  const [isFirstLaunch, setIsFirstLaunchState] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] =
    useState(false);
  const [workerProfile, setWorkerProfileState] = useState<WorkerProfile | null>(
    null,
  );
  const [employerProfile, setEmployerProfileState] =
    useState<EmployerProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mockWorkers] = useState<WorkerProfile[]>(generateMockWorkers());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [role, firstLaunch, onboarding, worker, employer, savedJobs] =
        await Promise.all([
          AsyncStorage.getItem(KEYS.USER_ROLE),
          AsyncStorage.getItem(KEYS.FIRST_LAUNCH),
          AsyncStorage.getItem(KEYS.ONBOARDING),
          AsyncStorage.getItem(KEYS.WORKER_PROFILE),
          AsyncStorage.getItem(KEYS.EMPLOYER_PROFILE),
          AsyncStorage.getItem(KEYS.JOBS),
        ]);

      if (role === "worker" || role === "employer") {
        setUserRoleState(role);
      }
      setIsFirstLaunchState(firstLaunch !== "false");
      setHasCompletedOnboardingState(onboarding === "true");
      if (worker) setWorkerProfileState(JSON.parse(worker));
      if (employer) setEmployerProfileState(JSON.parse(employer));
      if (savedJobs) setJobs(JSON.parse(savedJobs));
    } catch (error) {
      console.error("Error loading app data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserRole = async (role: UserRole) => {
    try {
      if (role) {
        await AsyncStorage.setItem(KEYS.USER_ROLE, role);
      } else {
        await AsyncStorage.removeItem(KEYS.USER_ROLE);
      }
      setUserRoleState(role);
    } catch (error) {
      console.error("Error saving user role:", error);
    }
  };

  const setIsFirstLaunch = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(KEYS.FIRST_LAUNCH, value ? "true" : "false");
      setIsFirstLaunchState(value);
    } catch (error) {
      console.error("Error saving first launch:", error);
    }
  };

  const setHasCompletedOnboarding = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING, value ? "true" : "false");
      setHasCompletedOnboardingState(value);
    } catch (error) {
      console.error("Error saving onboarding:", error);
    }
  };

  const setWorkerProfile = async (profile: WorkerProfile | null) => {
    try {
      if (profile) {
        await AsyncStorage.setItem(
          KEYS.WORKER_PROFILE,
          JSON.stringify(profile),
        );
      } else {
        await AsyncStorage.removeItem(KEYS.WORKER_PROFILE);
      }
      setWorkerProfileState(profile);
    } catch (error) {
      console.error("Error saving worker profile:", error);
    }
  };

  const setEmployerProfile = async (profile: EmployerProfile | null) => {
    try {
      if (profile) {
        await AsyncStorage.setItem(
          KEYS.EMPLOYER_PROFILE,
          JSON.stringify(profile),
        );
      } else {
        await AsyncStorage.removeItem(KEYS.EMPLOYER_PROFILE);
      }
      setEmployerProfileState(profile);
    } catch (error) {
      console.error("Error saving employer profile:", error);
    }
  };

  const createContractedJob = async (job: Job): Promise<boolean> => {
    try {
      const platformFee = Math.round(job.paymentAmount * 0.05 * 100) / 100;
      const smsCost = job.selectedCandidates.length * 0.5; // ৳0.50 per SMS

      if (!employerProfile) {
        console.error("No employer profile");
        return false;
      }

      const totalDeduction = platformFee + smsCost;

      // Check if employer has sufficient balance
      if (employerProfile.wallet < totalDeduction) {
        console.error("Insufficient wallet balance");
        return false;
      }

      // Create job with calculated fees
      const newJob: Job = {
        ...job,
        platformFee,
        smsCost,
        status: "pending_confirmation",
      };

      // Deduct fees from employer wallet
      const updatedProfile: EmployerProfile = {
        ...employerProfile,
        wallet: employerProfile.wallet - totalDeduction,
      };

      // Save updated profile and job
      const newJobs = [...jobs, newJob];
      await Promise.all([
        setEmployerProfileState(updatedProfile),
        AsyncStorage.setItem(
          KEYS.EMPLOYER_PROFILE,
          JSON.stringify(updatedProfile),
        ),
        AsyncStorage.setItem(KEYS.JOBS, JSON.stringify(newJobs)),
      ]);

      setJobs(newJobs);
      return true;
    } catch (error) {
      console.error("Error creating contracted job:", error);
      return false;
    }
  };

  const updateJobStatus = async (jobId: string, status: Job["status"]) => {
    try {
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, status } : job,
      );
      await AsyncStorage.setItem(KEYS.JOBS, JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const confirmJobAcceptance = async (jobId: string, workerId: string) => {
    try {
      const updatedJobs = jobs.map((job) =>
        job.id === jobId
          ? { ...job, status: "confirmed" as const, confirmedWorkerId: workerId }
          : job,
      );
      await AsyncStorage.setItem(KEYS.JOBS, JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error confirming job acceptance:", error);
    }
  };

  const refundJobFee = async (jobId: string) => {
    try {
      const job = jobs.find((j) => j.id === jobId);
      if (job && employerProfile && job.status === "pending_confirmation") {
        // Refund only platform fee, NOT SMS cost
        const updatedProfile: EmployerProfile = {
          ...employerProfile,
          wallet: employerProfile.wallet + job.platformFee,
        };

        const updatedJobs = jobs.map((j) =>
          j.id === jobId ? { ...j, status: "expired" as const } : j,
        );

        await Promise.all([
          setEmployerProfileState(updatedProfile),
          AsyncStorage.setItem(
            KEYS.EMPLOYER_PROFILE,
            JSON.stringify(updatedProfile),
          ),
          AsyncStorage.setItem(KEYS.JOBS, JSON.stringify(updatedJobs)),
        ]);

        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error("Error refunding job fee:", error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
      setUserRoleState(null);
      setIsFirstLaunchState(true);
      setHasCompletedOnboardingState(false);
      setWorkerProfileState(null);
      setEmployerProfileState(null);
      setJobs([]);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isFirstLaunch,
        setIsFirstLaunch,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        workerProfile,
        setWorkerProfile,
        employerProfile,
        setEmployerProfile,
        jobs,
        createContractedJob,
        confirmJobAcceptance,
        refundJobFee,
        updateJobStatus,
        mockWorkers,
        isLoading,
        clearAllData,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}