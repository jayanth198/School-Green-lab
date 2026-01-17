
import React from 'react';

const HelpScreen: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <h2 className="text-2xl font-bold text-emerald-900">సహాయం (Help)</h2>
      
      <section className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
        <h3 className="font-bold text-emerald-800 mb-2">📸 ఫోటోలు ఎలా తీయాలి?</h3>
        <p className="text-sm text-emerald-700 leading-relaxed">
          కెమెరా బటన్ నొక్కినప్పుడు ఆటోమేటిక్ గా కెమెరా ఓపెన్ అవుతుంది. మొక్క లేదా కంపోస్ట్ ని స్పష్టంగా కనిపించేలా ఫోటో తీయండి.
        </p>
      </section>

      <section className="bg-sky-50 p-4 rounded-2xl border border-sky-100">
        <h3 className="font-bold text-sky-800 mb-2">🎤 వాయిస్ ఇన్‌పుట్</h3>
        <p className="text-sm text-sky-700 leading-relaxed">
          టైప్ చేయడం కష్టంగా ఉంటే 'వాయిస్ ఇన్‌పుట్' బటన్ వాడండి. మైక్రోఫోన్ అనుమతి ఇవ్వండి. మీరు చెప్పే మాటలు టెక్స్ట్ గా మారతాయి.
        </p>
      </section>

      <section className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
        <h3 className="font-bold text-amber-800 mb-2">🔌 ఇంటర్నెట్ లేకపోతే?</h3>
        <p className="text-sm text-amber-700 leading-relaxed">
          పర్వాలేదు! మీరు సేవ్ చేసే డేటా మీ ఫోన్ లోనే ఉంటుంది. ఇంటర్నెట్ రాగానే ఆటోమేటిక్ గా 'సింక్' అవుతుంది.
        </p>
      </section>

      <div className="pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">App Version 1.0.0 (Telugu Edition)</p>
      </div>
    </div>
  );
};

export default HelpScreen;
