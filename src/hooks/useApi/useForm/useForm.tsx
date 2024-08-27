import { useState, ChangeEvent } from 'react';

function useForm<FormModel>(initialValues: FormModel) {
  const [formData, setFormData] = useState<FormModel>(initialValues);

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const resetForm = (initialValues: FormModel) => {
    setFormData(initialValues);
  };

  return {
    formData,
    handleInputChange,
    resetForm,
  };
};

export default useForm;
