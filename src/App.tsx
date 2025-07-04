import React, { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import TabBar from './components/TabBar';
import SpreadsheetGrid from './components/SpreadsheetGrid';
import FormulaBar from './components/FormulaBar';
import BottomTabs from './components/BottomTabs';
import { mockData } from './data/mockData';
import { columns } from './data/columns';
import { JobRequest } from './types';

function App() {
  const [data, setData] = useState<JobRequest[]>(mockData);
  const [selectedCell, setSelectedCell] = useState<string>('');
  const [selectedCellValue, setSelectedCellValue] = useState<any>('');
  
  const [tabs] = useState([
    {
      id: 'q3-overview',
      label: 'Q3 Financial Overview',
      color: 'bg-blue-500',
      active: true
    }
  ]);

  const [bottomTabs] = useState([
    { id: 'all-orders', label: 'All Orders', active: true },
    { id: 'pending', label: 'Pending', active: false },
    { id: 'reviewed', label: 'Reviewed', active: false },
    { id: 'arrived', label: 'Arrived', active: false }
  ]);

  const handleToolbarAction = (action: string) => {
    console.log(`Toolbar action: ${action}`);
  };

  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
  };

  const handleTabClose = (tabId: string) => {
    console.log(`Tab closed: ${tabId}`);
  };

  const handleCellChange = (rowId: string, columnId: string, value: any) => {
    console.log(`Cell changed - Row: ${rowId}, Column: ${columnId}, Value: ${value}`);
    
    setData(prevData => 
      prevData.map(row => {
        if (row.id === rowId) {
          const column = columns.find(col => col.id === columnId);
          if (column) {
            return { ...row, [column.accessor]: value };
          }
        }
        return row;
      })
    );
  };

  const handleRowSelect = (rowId: string) => {
    console.log(`Row selected: ${rowId}`);
  };

  const handleFormulaBarChange = (value: string) => {
    console.log(`Formula bar value: ${value}`);
  };

  const handleBottomTabChange = (tabId: string) => {
    console.log(`Bottom tab changed to: ${tabId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-white border-b border-gray-200">
        <Toolbar onAction={handleToolbarAction} />
        <TabBar 
          tabs={tabs} 
          onTabChange={handleTabChange} 
          onTabClose={handleTabClose} 
        />
        <FormulaBar 
          selectedCell={selectedCell}
          cellValue={selectedCellValue}
          onValueChange={handleFormulaBarChange}
        />
      </div>
      
      <div className="flex-1 bg-white">
        <SpreadsheetGrid 
          data={data}
          columns={columns}
          onCellChange={handleCellChange}
          onRowSelect={handleRowSelect}
        />
      </div>

      <BottomTabs 
        tabs={bottomTabs}
        onTabChange={handleBottomTabChange}
      />
    </div>
  );
}

export default App;