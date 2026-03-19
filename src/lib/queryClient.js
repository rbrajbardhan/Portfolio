import { QueryClient } from "@tanstack/react-query";

// Configure a React Query Client with stable default opts
// Cache data for 5 minutes, prevent refetching constantly on window focus to avoid hugging API limits.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});
