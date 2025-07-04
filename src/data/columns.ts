import { Column } from '../types';

export const columns: Column[] = [
  {
    id: 'job-request',
    header: 'Job Request',
    accessor: 'jobRequest',
    width: 'w-80',
    sortable: true
  },
  {
    id: 'submitted',
    header: 'Submitted',
    accessor: 'submitted',
    width: 'w-32',
    sortable: true
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    width: 'w-36',
    sortable: true
  },
  {
    id: 'submitter',
    header: 'Submitter',
    accessor: 'submitter',
    width: 'w-40',
    sortable: true
  },
  {
    id: 'url',
    header: 'URL',
    accessor: 'url',
    width: 'w-48',
    sortable: false
  },
  {
    id: 'assigned',
    header: 'Assigned',
    accessor: 'assigned',
    width: 'w-40',
    sortable: true
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    width: 'w-28',
    sortable: true
  },
  {
    id: 'due-date',
    header: 'Due Date',
    accessor: 'dueDate',
    width: 'w-32',
    sortable: true
  },
  {
    id: 'est-value',
    header: 'Est. Value',
    accessor: 'estValue',
    width: 'w-32',
    sortable: true
  }
];