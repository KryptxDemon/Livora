import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RegistrationData {
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
}

interface RegistrationContextType {
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  resetData: () => void;
}

const initialData: RegistrationData = {
  name: '',
  age: '',
  gender: '',
  skills: [],
  customSkill: '',
  experience: '',
  jobType: '',
  location: '',
  phone: '',
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RegistrationData>(initialData);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <RegistrationContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
