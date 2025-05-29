
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = async <T>(
    asyncFn: () => Promise<T>,
    successMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    setIsLoading(true);
    try {
      const result = await asyncFn();
      if (successMessage) {
        toast({
          title: "Successo",
          description: successMessage,
        });
      }
      return result;
    } catch (error) {
      console.error('Error in withLoading:', error);
      toast({
        title: "Errore",
        description: errorMessage || "Si è verificato un errore imprevisto.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, setIsLoading, withLoading };
};
