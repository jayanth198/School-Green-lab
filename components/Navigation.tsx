
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const tabs = [
    { view: AppView.HOME, icon: '🏠', label: 'హోమ్' },
    { view: AppView.TEACHER_DASHBOARD, icon: '👨‍🏫', label: 'టీచర్' },
    { view: AppView.PARENT_VIEW, icon: '👨‍👩‍👧', label: 'పేరెంట్' },
    { view: AppView.HELP, icon: 'ℹ️', label: 'సహాయం' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-2 pb-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] max-w-md mx-auto z-50">
      {tabs.map(tab => (
        <button
          key={tab.view}
          onClick={() => setView(tab.view)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === tab.view ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className="text-[10px] font-bold">{tab.label}</span>
          {currentView === tab.view && (
            <div className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
