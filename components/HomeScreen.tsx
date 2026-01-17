
import React from 'react';
import { FormType } from '../types';

interface HomeScreenProps {
  onSelectForm: (type: FormType) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectForm }) => {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="text-center mb-4">
        <img 
          src="https://picsum.photos/id/11/400/200" 
          alt="School Garden" 
          className="rounded-2xl shadow-md w-full h-40 object-cover"
        />
        <p className="text-emerald-800 mt-4 text-lg font-bold">
          మన పాఠశాల పర్యావరణ మిత్రులు
        </p>
      </div>

      <button 
        onClick={() => onSelectForm(FormType.SEE)}
        className="flex items-center gap-4 bg-emerald-100 border-2 border-emerald-500 p-6 rounded-2xl hover:bg-emerald-200 transition-colors shadow-sm"
      >
        <span className="text-4xl">👀</span>
        <div className="text-left">
          <h2 className="text-xl font-bold text-emerald-900">ఈరోజు చూశాను</h2>
          <p className="text-emerald-700 text-sm">నేను గమనించిన విశేషాలు</p>
        </div>
      </button>

      <button 
        onClick={() => onSelectForm(FormType.CHANGE)}
        className="flex items-center gap-4 bg-sky-100 border-2 border-sky-500 p-6 rounded-2xl hover:bg-sky-200 transition-colors shadow-sm"
      >
        <span className="text-4xl">🔄</span>
        <div className="text-left">
          <h2 className="text-xl font-bold text-sky-900">ఏం మారింది?</h2>
          <p className="text-sky-700 text-sm">మార్పులను నమోదు చేయండి</p>
        </div>
      </button>

      <button 
        onClick={() => onSelectForm(FormType.THOUGHT)}
        className="flex items-center gap-4 bg-amber-100 border-2 border-amber-500 p-6 rounded-2xl hover:bg-amber-200 transition-colors shadow-sm"
      >
        <span className="text-4xl">🤔</span>
        <div className="text-left">
          <h2 className="text-xl font-bold text-amber-900">నాకు అనిపించింది</h2>
          <p className="text-amber-700 text-sm">నా ఆలోచనలు మరియు కారణాలు</p>
        </div>
      </button>
    </div>
  );
};

export default HomeScreen;
