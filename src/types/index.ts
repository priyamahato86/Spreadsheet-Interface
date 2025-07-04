export interface JobRequest {
  id: string;
  jobRequest: string;
  submitted: string;
  status: 'In-progress' | 'Needs to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  estValue: number;
}

export interface Column {
  id: string;
  header: string;
  accessor: keyof JobRequest;
  width?: string;
  sortable?: boolean;
}