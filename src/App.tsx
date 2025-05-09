import React from 'react';
import WorkloadCalculator from './components/WorkloadCalculator';
import { WorkloadProvider } from './context/WorkloadContext';

function App() {
  return (
    <WorkloadProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-slate-800 text-white py-4 px-6 shadow-md">
          <h1 className="text-2xl font-semibold">Workload Calculator</h1>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <WorkloadCalculator />
        </main>
        <footer className="bg-slate-800 text-white py-3 text-center text-sm">
          <p>&copy; 2025 Workload Calculator. All rights reserved.</p>
        </footer>
      </div>
    </WorkloadProvider>
  );
}

export default App;