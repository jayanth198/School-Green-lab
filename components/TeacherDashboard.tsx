
import React, { useState } from 'react';
import { Observation } from '../types';

interface TeacherDashboardProps {
  observations: Observation[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ observations }) => {
  const [filterClass, setFilterClass] = useState('All');

  const filtered = filterClass === 'All' 
    ? observations 
    : observations.filter(o => o.class === filterClass);

  const exportSummary = () => {
    const csv = [
      ['Date', 'Student', 'Class', 'Type', 'Observation', 'Status'].join(','),
      ...filtered.map(o => [o.date, o.studentName, o.class, o.type, `"${o.description}"`, o.changeObserved].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GreenLab_Report_${new Date().toLocaleDateString()}.csv`;
    a.click();
    alert('రిపోర్ట్ ఎగుమతి చేయబడింది! (Report Exported!)');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-emerald-900">ఉపాధ్యాయుల డాష్‌బోర్డ్</h2>
        <button 
          onClick={exportSummary}
          className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-lg font-bold"
        >
          ఎగుమతి (Export)
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', '6', '7', '8', '9', '10'].map(c => (
          <button
            key={c}
            onClick={() => setFilterClass(c)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border-2 ${filterClass === c ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-200'}`}
          >
            {c === 'All' ? 'అన్నీ' : `${c} వ తరగతి`}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic">
            ఇంకా ఎటువంటి అబ్జర్వేషన్లు లేవు.
          </div>
        ) : (
          filtered.map(obs => (
            <div key={obs.id} className="bg-white border-2 border-emerald-100 rounded-2xl overflow-hidden shadow-sm flex">
              <img src={obs.photoUrl} alt="Observation" className="w-24 h-full object-cover" />
              <div className="p-3 flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-emerald-900 leading-tight">{obs.studentName}</h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full uppercase font-bold">{obs.date}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{obs.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-bold">{obs.class} వ తరగతి</span>
                  <span className="text-xs">{obs.changeObserved}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
