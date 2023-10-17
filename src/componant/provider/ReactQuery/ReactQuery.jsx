"use client" 
import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query";
export default function ReactQuery({children}) {
    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
 </QueryClientProvider>
  )
}
