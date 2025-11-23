import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Configuração para SSR (Server Side Rendering)
Amplify.configure(awsconfig, { ssr: true });
