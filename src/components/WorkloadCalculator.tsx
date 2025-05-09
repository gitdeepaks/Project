import React from 'react';
import FileUpload from './FileUpload';
import WorkloadFromScratch from './WorkloadFromScratch';
import ExistingWorkload from './ExistingWorkload';
import { useWorkload } from '../context/WorkloadContext';

const WorkloadCalculator: React.FC = () => {
  const { isLoading } = useWorkload();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Upload Workload Data</h2>
          <FileUpload />
        </div>
      </section>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Workload from Scratch</h2>
          <WorkloadFromScratch />
        </div>
      </section>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Existing Workload</h2>
          <ExistingWorkload />
        </div>
      </section>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-center font-medium">Calculating recommendations...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkloadCalculator;