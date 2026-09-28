import React from 'react';
import { Brain, Clock, Sparkles } from 'lucide-react';

export default function GuidePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>📖</span> 15분 초소형 실행 방법론 (Action Methodology)
          </h1>
          <p className="text-xs text-slate-500 mt-1">왜 완벽한 계획보다 15분의 작은 시작이 압도적인가?</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Brain className="text-indigo-600" size={18} /> 1. 작업 착수 마비(Task Paralysis)의 원인
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
              뇌는 작업의 크기가 너무 크거나 모호할 때 '위협'으로 간주하고 방어기제(딴짓, 생각 과잉, 미루기)를 발동합니다. 
              "오늘 프로젝트를 다 끝내야지"라는 생각 자체가 뇌에 과부하를 주어 실행을 지연시킵니다.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="text-amber-500" size={18} /> 2. 15분 타임박싱의 마법
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
              15분은 뇌가 전혀 부담을 느끼지 않는 최소 단위입니다. "딱 15분만 하고 그만둬도 좋다"는 허락을 스스로에게 내리면 
              마찰 저항이 0으로 줄어듭니다. 일단 손을 움직이면 '작업흥분(Work Excitement)' 현상으로 인해 스스로 몰입을 이어가게 됩니다.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={18} /> 3. 주사위(다이스)의 심리학
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
              무엇을 먼저 할지 결정하는 것 자체도 상당한 인지 에너지를 소모합니다. 
              주사위를 굴려 무작위로 선택권을 넘겨버림으로써 '선택의 피로(Decision Fatigue)'를 원천 차단하고 즉각적인 실행 모드로 진입합니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}