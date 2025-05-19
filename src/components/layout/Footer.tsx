import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} LogiCRM Dashboard. All rights reserved.</p>
          <p className="mt-1">
            Built with React, TypeScript, Tailwind CSS, React Query, and Vite by{' '}
            <a 
              href="https://github.com/KiriManii" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Lewis Kimani (KiriManii)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
