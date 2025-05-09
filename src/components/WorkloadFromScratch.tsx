import React, { useState } from 'react';
import { useWorkload } from '../context/WorkloadContext';
import FormInput from './ui/FormInput';
import Button from './ui/Button';

type FormData = {
  totalUsers: string;
  workloadType: string;
  userConcurrency: string;
};

const WorkloadFromScratch: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    totalUsers: '',
    workloadType: '',
    userConcurrency: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { getRecommendations } = useWorkload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.totalUsers) {
      newErrors.totalUsers = 'Total number of users is required';
    } else if (isNaN(Number(formData.totalUsers)) || Number(formData.totalUsers) <= 0) {
      newErrors.totalUsers = 'Please enter a valid number';
    }
    
    if (!formData.workloadType) {
      newErrors.workloadType = 'Type of workload is required';
    }
    
    if (!formData.userConcurrency) {
      newErrors.userConcurrency = 'User concurrency is required';
    } else if (isNaN(Number(formData.userConcurrency)) || Number(formData.userConcurrency) <= 0) {
      newErrors.userConcurrency = 'Please enter a valid number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      getRecommendations({
        type: 'fromScratch',
        data: {
          totalUsers: parseInt(formData.totalUsers),
          workloadType: formData.workloadType,
          userConcurrency: parseInt(formData.userConcurrency)
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Total Number of users"
        name="totalUsers"
        value={formData.totalUsers}
        onChange={handleChange}
        placeholder="e.g., 100"
        error={errors.totalUsers}
      />
      
      <FormInput
        label="Type of Workload"
        name="workloadType"
        value={formData.workloadType}
        onChange={handleChange}
        placeholder="e.g., Database, Web Server, Analytics"
        error={errors.workloadType}
      />
      
      <FormInput
        label="User Concurrency"
        name="userConcurrency"
        value={formData.userConcurrency}
        onChange={handleChange}
        placeholder="e.g., 25"
        error={errors.userConcurrency}
      />
      
      <div className="flex justify-center pt-2">
        <Button type="submit">
          Get Recommendations
        </Button>
      </div>
    </form>
  );
};

export default WorkloadFromScratch;