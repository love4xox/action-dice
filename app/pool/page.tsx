'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

interface ActionItem {
  id: string;
  category: '개발/작업' | '정리/환경' | '마인드/건강';
  text: string;
}

const PRESETS: ActionItem[] = [
  { id: '1', category: '개발/작업', text: '코드 한 줄 작성 또는 첫 주석 먼저 달기' },
  { id: '2', category: '개발/작업', text: '문서/리드미 첫 문단 1줄 작성하기' },
  { id: '3', category: '개발/작업', text: '함수 1개의 입출력 테스트 케이스만 만들기' },
  { id: '4', category: '정리/환경', text: '책상 위 불필요한 물건 3개만 치우기' },
  { id: '5', category: '정리/환경', text: '브라우저에서 보지 않는 탭 5개 닫기' },
  { id: '6', category: '마인드/건강', text: '시원한 물 한 잔 마시고 깊게 호흡 3번 하기' },
];

export default function PoolPage() {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'개발/작업' | '정리/환경' | '마인드/건강'>('개발/작업');

  useEffect(() => {
    const saved = localStorage.getItem('ad_actions');
    setActions(saved ? JSON.parse(saved) : PRESETS);
  }, []);

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const updated = [{ id: Date.now().toString(), category, text: text.trim() }, ...actions];
    setActions(updated);
    localStorage.setItem('ad_actions', JSON.stringify(updated));
    setText('');
  };

  const removeAction = (id: string) => {
    const updated = actions.filter((a) => a.id !== id);
    setActions(updated);
    localStorage.setItem('ad_actions', JSON.stringify(updated));
  };

  const resetToPresets = () => {
    setActions(PRESETS);
    localStorage.setItem('ad_actions', JSON.stringify(PRESETS));
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>📋</span> 나만의 초소형 액션 풀 관리
            </h1>
            <p className="text-xs text-slate-500 mt-1">주사위를 굴릴 때 추첨되는 15분 단위 행동 목록입니다.</p>
          </div>
          <button
            onClick={resetToPresets}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-200 shadow-2xs cursor-pointer"
          >
            <RotateCcw size={13} /> 기본값 초기화
          </button>
        </div>

        <form onSubmit={addAction} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-sm">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
          >
            <option>개발/작업</option>
            <option>정리/환경</option>
            <option>마인드/건강</option>
          </select>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="새로운 15분 초소형 착수 행동 입력..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
            <Plus size={14} /> 추가
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act) => (
            <div key={act.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {act.category}
                </span>
                <span className="truncate text-slate-800 font-medium">{act.text}</span>
              </div>
              <button onClick={() => removeAction(act.id)} className="text-slate-400 hover:text-rose-500 cursor-pointer p-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}