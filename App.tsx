
import React, { useState, useEffect } from 'react';
import { AppView, FormType, Observation } from './types';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';
import TeacherDashboard from './components/TeacherDashboard';
import ParentView from './components/ParentView';
import HelpScreen from './components/HelpScreen';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [activeFormType, setActiveFormType] = useState<FormType | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [offlineQueue, setOfflineQueue] = useState<Observation[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Sync logic simulation
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load initial mock data
    const saved = localStorage.getItem('green_lab_observations');
    if (saved) setObservations(JSON.parse(saved));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineData = () => {
    if (offlineQueue.length > 0) {
      console.log('Syncing offline data to "Google Sheets"...');
      setObservations(prev => [...prev, ...offlineQueue]);
      setOfflineQueue([]);
      alert('ఆఫ్‌లైన్ డేటా విజయవంతంగా సింక్ చేయబడింది! (Offline data synced!)');
    }
  };

  const handleFormSubmit = (data: Observation) => {
    if (isOnline) {
      const updated = [...observations, data];
      setObservations(updated);
      localStorage.setItem('green_lab_observations', JSON.stringify(updated));
    } else {
      setOfflineQueue([...offlineQueue, data]);
      alert('నెట్‌వర్క్ లేదు. కనెక్షన్ రాగానే డేటా సేవ్ చేయబడుతుంది. (Saved offline)');
    }
    setCurrentView(AppView.HOME);
  };

  const openForm = (type: FormType) => {
    setActiveFormType(type);
    setCurrentView(AppView.OBSERVATION_FORM);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold">Green Lab School</h1>
        {!isOnline && (
          <span className="bg-orange-500 text-xs px-2 py-1 rounded-full animate-pulse">
            ఆఫ్‌లైన్
          </span>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 p-4">
        {currentView === AppView.HOME && (
          <HomeScreen onSelectForm={openForm} />
        )}
        {currentView === AppView.OBSERVATION_FORM && activeFormType && (
          <FormScreen 
            type={activeFormType} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setCurrentView(AppView.HOME)} 
          />
        )}
        {currentView === AppView.TEACHER_DASHBOARD && (
          <TeacherDashboard observations={observations} />
        )}
        {currentView === AppView.PARENT_VIEW && (
          <ParentView observations={observations} />
        )}
        {currentView === AppView.HELP && (
          <HelpScreen />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;
