import { RouterProvider } from "react-router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appRouter } from "./app.router"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from 'sonner'
import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    //refetchOnWindowFocus: true //hace el refresh cuando la persona regrese
  });
  if (isLoading) return <CustomFullScreenLoading />
  return children;
  // return <CustomFullScreenLoading />
};

export const TesloShopApp = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}
