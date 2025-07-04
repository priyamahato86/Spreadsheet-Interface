import { JobRequest } from '../types';

export const mockData: JobRequest[] = [
  {
    id: '1',
    jobRequest: 'Launch social media campaign for product launch',
    submitted: '15-01-2024',
    status: 'In-progress',
    submitter: 'Alisha Patel',
    url: 'www.aishapattel.com',
    assigned: 'Sophie Choudhury',
    priority: 'Medium',
    dueDate: '20-11-2024',
    estValue: 6200000
  },
  {
    id: '2',
    jobRequest: 'Update press release for company rebrand',
    submitted: '29-10-2024',
    status: 'Needs to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Parekh',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: 3400000
  },
  {
    id: '3',
    jobRequest: 'Finalize user testing feedback for app',
    submitted: '06-12-2024',
    status: 'In-progress',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    estValue: 4750000
  },
  {
    id: '4',
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    estValue: 5900000
  },
  {
    id: '5',
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    estValue: 2800000
  }
];