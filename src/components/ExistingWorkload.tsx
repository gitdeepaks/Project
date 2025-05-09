import React, { useState } from 'react';
import { useWorkload } from '../context/WorkloadContext';
import FormInput from './ui/FormInput';
import Button from './ui/Button';

type FormData = {
  cpu: string;
  ram: string;
  hardDisk: string;
};

const ExistingWorkload: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cpu: '',
    ram: '',
    hardDisk: ''
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
    
    if (!formData.cpu) {
      newErrors.cpu = 'CPU information is required';
    }
    
    if (!formData.ram) {
      newErrors.ram = 'RAM information is required';
    }
    
    if (!formData.hardDisk) {
      newErrors.hardDisk = 'Hard disk information is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      getRecommendations({
        type: 'existing',
        data: {
          cpu: formData.cpu,
          ram: formData.ram,
          hardDisk: formData.hardDisk
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="CPU"
        name="cpu"
        value={formData.cpu}
        onChange={handleChange}
        placeholder="e.g., Intel i7 4.2GHz, 8 cores"
        error={errors.cpu}
      />
      
      <FormInput
        label="RAM"
        name="ram"
        value={formData.ram}
        onChange={handleChange}
        placeholder="e.g., 16GB DDR4"
        error={errors.ram}
      />
      
      <FormInput
        label="Hard Disk"
        name="hardDisk"
        value={formData.hardDisk}
        onChange={handleChange}
        placeholder="e.g., 500GB SSD"
        error={errors.hardDisk}
      />
      
      <div className="flex justify-center pt-2">
        <Button type="submit">
          Get Recommendations
        </Button>
      </div>
    </form>
  );
};

export default ExistingWorkload;