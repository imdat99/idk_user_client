import { House, RefreshCw, Server } from 'lucide-react';
import { Button } from './Button';

const ErrorScreen = () => {
  return (
    <body className="bg-background min-h-screen flex items-center justify-center p-4">
    <div className="max-w-sm w-full bg-white rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Server className='​text-3xl text-red-500'/>
            <div className="absolute -inset-2 border-4 border-red-400/30 rounded-full animate-ping opacity-75"/>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Server Error</h1>
        
        <p className="text-gray-600 mb-6">
            Something went wrong on our end. <br/> Please try again.
        </p>
        
        <div className="flex space-x-4">
            <Button className='w-full group' onClick={() => window.location.reload()} >
                <RefreshCw className='group-hover:animate-spin'/> Try Again
            </Button>
            <Button className='w-full' variant="outline" onClick={() => {window.location.href = '/'}}>
                <House /> Back to Home
            </Button>
        </div>
        
     
    </div>
</body>
  );
};

export default ErrorScreen;
