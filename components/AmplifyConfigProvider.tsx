"use client";

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/src/aws-exports';

export default function AmplifyConfigProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configura o Amplify usando o formato Gen 1 (compatível com aws-exports.js)
    Amplify.configure(awsconfig);
    
    console.log('✅ Amplify configurado com acesso guest');
  }, []);

  return <>{children}</>;
}
