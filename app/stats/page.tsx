'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Flame, CheckCircle, Zap } from 'lucide-react';

export default function StatsPage() {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('ad_completed_count');
    setCompletedCount(saved ? parseInt(saved, 10) : 0);
  }, []);

  const totalMinutes = completedCount * 15;
  const level = Math.floor(completedCount / 4) + 1;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>📊</span> 누적 실행 통계 대시보드
          </h1>
          <p className="text-xs text-slate-500 mt-1">15분 단위로 차곡차곡 쌓인 실행 근육의 결과물입니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" /> 완수한 15분 세션
            </span>
            <p className="text-3xl font-black text-slate-900 font-mono">{completedCount}회</p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Flame size={14} className="text-rose-500" /> 누적 몰입 시간
            </span>
            <p className="text-3xl font-black text-slate-900 font-mono">{totalMinutes}분</p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Zap size={14} className="text-indigo-600" /> 실행 레벨
            </span>
            <p className="text-3xl font-black text-indigo-600 font-mono">Lv. {level}</p>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" /> 실행 등급 현황
          </h2>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (completedCount % 4) * 25 || (completedCount > 0 ? 100 : 0))}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 font-medium">
            다음 레벨까지 <strong className="text-slate-900 font-bold">{4 - (completedCount % 4)}번</strong>의 15분 스프린트가 남았습니다.
          </p>
        </div>
      </div>
    </main>
  );
}