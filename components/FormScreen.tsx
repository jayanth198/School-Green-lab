
import React, { useState, useRef } from 'react';
import { FormType, Observation } from '../types';

interface FormScreenProps {
  type: FormType;
  onSubmit: (data: Observation) => void;
  onCancel: () => void;
}

const FormScreen: React.FC<FormScreenProps> = ({ type, onSubmit, onCancel }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('6');
  const [description, setDescription] = useState('');
  const [changeObserved, setChangeObserved] = useState('🌱 బాగుంది');
  const [reasoning, setReasoning] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTitle = () => {
    switch(type) {
      case FormType.SEE: return "ఈరోజు చూశాను (Observations)";
      case FormType.CHANGE: return "ఏం మారింది? (Changes)";
      case FormType.THOUGHT: return "నాకు అనిపించింది (Thoughts)";
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newObs: Observation = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('te-IN'),
      class: selectedClass,
      studentName,
      photoUrl: photo || "https://picsum.photos/200/200?random=" + Math.random(),
      description,
      changeObserved,
      reasoning,
      type
    };
    onSubmit(newObs);
  };

  return (
    <div className="pb-10">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onCancel} className="text-emerald-700 font-bold">← వెనక్కి</button>
        <h2 className="text-xl font-bold text-emerald-900">{getTitle()}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">తరగతి (Class)</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border-2 border-emerald-200 p-3 rounded-xl focus:border-emerald-500 outline-none"
          >
            {[6, 7, 8, 9, 10].map(c => <option key={c} value={c}>{c} వ తరగతి</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">విద్యార్థి పేరు (Student Name)</label>
          <input 
            type="text" 
            required
            placeholder="మీ పేరు రాయండి..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full border-2 border-emerald-200 p-3 rounded-xl focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">ఫోటో తీయండి (Capture Photo)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center bg-emerald-50 cursor-pointer overflow-hidden relative"
          >
            {photo ? (
              <img src={photo} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <span className="text-4xl mb-2">📸</span>
                <span className="text-emerald-700 text-sm font-bold">కెమెరా ఓపెన్ చేయండి</span>
              </>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handlePhotoCapture}
              className="hidden" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">మీరు ఏం చూశారు? (Description)</label>
          <textarea 
            rows={3}
            placeholder="వాయిస్ లేదా టెక్స్ట్ ఉపయోగించండి..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-emerald-200 p-3 rounded-xl focus:border-emerald-500 outline-none"
          />
          <button type="button" className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
            🎤 వాయిస్ ఇన్‌పుట్
          </button>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">మీకు ఏమనిపిస్తుంది? (Status)</label>
          <div className="grid grid-cols-2 gap-2">
            {['🌱 బాగుంది', '🍂 ఎండిపోయింది', '💧 నీరు కావాలి', '🐛 పురుగులు ఉన్నాయి'].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setChangeObserved(opt)}
                className={`p-3 rounded-xl border-2 text-sm text-center font-bold ${changeObserved === opt ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-700'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">ఎందుకు అలా జరిగింది? (Reasoning)</label>
          <textarea 
            rows={2}
            placeholder="మీ ఆలోచన..."
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            className="w-full border-2 border-emerald-200 p-3 rounded-xl focus:border-emerald-500 outline-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white p-4 rounded-xl text-lg font-bold shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
        >
          సేవ్ చేయండి (Submit)
        </button>
      </form>
    </div>
  );
};

export default FormScreen;
