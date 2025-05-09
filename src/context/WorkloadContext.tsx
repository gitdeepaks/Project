import React, { createContext, ReactNode, useContext, useState } from "react";

type FromScratchData = {
  totalUsers: number;
  workloadType: string;
  userConcurrency: number;
};

type ExistingData = {
  cpu: string;
  ram: string;
  hardDisk: string;
};

type RecommendationRequest =
  | { type: "fromScratch"; data: FromScratchData }
  | { type: "existing"; data: ExistingData }
  | { type: "file"; data: File };

type Recommendation = {
  id: string;
  title: string;
  description: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    network: string;
  };
  estimatedCost: string;
};

interface WorkloadContextType {
  isLoading: boolean;
  recommendations: Recommendation[] | null;
  processFileUpload: (file: File) => void;
  getRecommendations: (request: RecommendationRequest) => void;
  clearRecommendations: () => void;
}

const WorkloadContext = createContext<WorkloadContextType | undefined>(
  undefined
);

export const WorkloadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  // Simulated API call for recommendations
  const fetchRecommendations = (
    request: RecommendationRequest
  ): Promise<Recommendation[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock recommendations based on request type
        const mockRecommendations: Recommendation[] = [
          {
            id: "1",
            title: "Recommended Configuration",
            description: "Optimal balance of performance and cost",
            specs: {
              cpu: "4 vCPUs",
              ram: "16 GB",
              storage: "500 GB SSD",
              network: "10 Gbps",
            },
            estimatedCost: "$120/month",
          },
          {
            id: "2",
            title: "Performance Configuration",
            description: "Higher performance for demanding workloads",
            specs: {
              cpu: "8 vCPUs",
              ram: "32 GB",
              storage: "1 TB SSD",
              network: "20 Gbps",
            },
            estimatedCost: "$240/month",
          },
          {
            id: "3",
            title: "Economy Configuration",
            description: "Cost-effective solution for basic workloads",
            specs: {
              cpu: "2 vCPUs",
              ram: "8 GB",
              storage: "250 GB SSD",
              network: "5 Gbps",
            },
            estimatedCost: "$60/month",
          },
        ];

        resolve(mockRecommendations);
      }, 1500); // 1.5 second delay
    });
  };

  const processFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // Here you would normally parse the file and process its data
      console.log(`Processing file: ${file.name}`);

      // For demo purposes, we'll just fetch mock recommendations
      const results = await fetchRecommendations({ type: "file", data: file });
      setRecommendations(results);
    } catch (error) {
      console.error("Error processing file:", error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async (request: RecommendationRequest) => {
    setIsLoading(true);
    try {
      const results = await fetchRecommendations(request);
      setRecommendations(results);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations(null);
  };

  return (
    <WorkloadContext.Provider
      value={{
        isLoading,
        recommendations,
        processFileUpload,
        getRecommendations,
        clearRecommendations,
      }}
    >
      {children}
      {recommendations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">
                  Recommendations
                </h2>
                <button
                  onClick={clearRecommendations}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-medium text-teal-700">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{rec.description}</p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Specifications
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <span className="font-medium">CPU:</span>{" "}
                          {rec.specs.cpu}
                        </li>
                        <li>
                          <span className="font-medium">RAM:</span>{" "}
                          {rec.specs.ram}
                        </li>
                        <li>
                          <span className="font-medium">Storage:</span>{" "}
                          {rec.specs.storage}
                        </li>
                        <li>
                          <span className="font-medium">Network:</span>{" "}
                          {rec.specs.network}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Cost Estimate
                      </h4>
                      <p className="text-xl font-semibold text-slate-800">
                        {rec.estimatedCost}
                      </p>
                      <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                        Deploy this configuration
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </WorkloadContext.Provider>
  );
};

export const useWorkload = (): WorkloadContextType => {
  const context = useContext(WorkloadContext);
  if (context === undefined) {
    throw new Error("useWorkload must be used within a WorkloadProvider");
  }
  return context;
};
