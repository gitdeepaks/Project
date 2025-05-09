import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useWorkload } from '../context/WorkloadContext';
import Button from './ui/Button';

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { processFileUpload } = useWorkload();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'xls' || extension === 'xlsx' || extension === 'csv') {
      setFile(file);
    } else {
      alert('Please upload only XLS, XLSX, or CSV files');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (file) {
      processFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragging 
            ? 'border-teal-500 bg-teal-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        {!file ? (
          <div className="space-y-3">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700">Upload XLS, CSV formats only</h3>
            <p className="text-sm text-gray-500">Drag and drop your file here or click to browse</p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-10 w-10 text-teal-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept=".xls,.xlsx,.csv"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
      
      {file && (
        <div className="flex justify-end">
          <Button onClick={handleUpload}>
            Process File
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;