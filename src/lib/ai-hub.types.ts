export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  moduleName?: string;
  timestamp: Date;
}

export interface UserCredits {
  balance: number;
  transactions: Transaction[];
}

export interface AIModule {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon: string;
  category: 'vision' | 'analysis' | 'search';
  features: string[];
}

export interface AIResponse {
  id: string;
  moduleId: string;
  content: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

export interface ModuleExecutionRequest {
  moduleId: string;
  userId: string;
  payload?: Record<string, unknown>;
}

export interface ModuleExecutionResponse {
  success: boolean;
  response?: AIResponse;
  error?: string;
  creditsDeducted?: number;
}
