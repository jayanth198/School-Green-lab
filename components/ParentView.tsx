
import React from 'react';
import { Observation } from '../types';

interface ParentViewProps {
  observations: Observation[];
}

const ParentView: React.FC<ParentViewProps> = ({ observations }) => {
  // Get latest observation for each student
  const students = Array.from(new Set(observations.map(o => o.studentName)));
  const latestByStudent = students.map(name => {
    return observations.filter(o => o.studentName === name).sort((a, b) => Number(b.id) - Number(a.id))[0];
  });

  const shareReport = (obs: Observation) => {
    const text = `చూడండి! మా పాప/బాబు ${obs.studentName} గ్రీన్ ల్యాబ్‌లో ఇలా గమనించారు: ${obs.changeObserved}. #GreenLabSchool`;
    if (navigator.share) {
      navigator.share({ title: 'School Observation', text }).catch(() => {});
    } else {
      alert('లింక్ కాపీ చేయబడింది! (Share link copied!)');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-sky-900">తల్లిదండ్రుల వ్యూ</h2>
      <p className="text-sm text-gray-600">మీ పిల్లల తాజా అబ్జర్వేషన్లను ఇక్కడ చూడండి.</p>

      {latestByStudent.length === 0 ? (
        <div className="text-center py-20 text-gray-400">డేటా ఏమీ లేదు.</div>
      ) : (
        latestByStudent.map(obs => (
          <div key={obs.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-sky-100">
            <img src={obs.photoUrl} alt="Kid's Work" className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-bold uppercase">{obs.date}</span>
                <span className="text-lg font-black text-sky-900">{obs.studentName}</span>
              </div>
              <blockquote className="italic text-gray-700 bg-gray-50 p-3 rounded-xl mb-4 text-sm">
                "{obs.description}"
              </blockquote>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-sky-800">స్థితి: {obs.changeObserved}</span>
                <button 
                  onClick={() => shareReport(obs)}
                  className="bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md active:bg-sky-600"
                >
                  షేర్ చేయండి 🔗
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ParentView;
