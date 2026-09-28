'use client';

import React, { useState, useEffect } from 'react';
import { Dices, Play, Pause, RotateCcw, Plus, Trash2, Flame, Sparkles, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActionItem {
  id: string;
  category: '개발/작업' | '정리/환경' | '마인드/건강';
  text: string;
}

const INITIAL_ACTIONS: ActionItem[] = [
  { id: '1', category: '개발/작업', text: '코드 한 줄 작성 또는 첫 주석 먼저 달기' },
  { id: '2', category: '개발/작업', text: '문서/리드미 첫 문단 1줄 작성하기' },
  { id: '3', category: '개발/작업', text: '함수 1개의 입출력 테스트 케이스만 만들기' },
  { id: '4', category: '정리/환경', text: '책상 위 불필요한 물건 3개만 버리거나 치우기' },
  { id: '5', category: '정리/환경', text: '브라우저에서 보지 않는 탭 5개 닫기' },
  { id: '6', category: '마인드/건강', text: '시원한 물 한 잔 마시고 깊게 호흡 3번 하기' },
  { id: '7', category: '마인드/건강', text: '목과 어깨 1분간 스트레칭하기' },
  { id: '8', category: '개발/작업', text: '오늘 완수할 단 하나의 핵심 목표 포스트잇에 적기' },
];

export default function ActionDiceApp() {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'개발/작업' | '정리/환경' | '마인드/건강'>('개발/작업');

  useEffect(() => {
    const savedActions = localStorage.getItem('ad_actions');
    if (savedActions) {
      try {
        setActions(JSON.parse(savedActions));
      } catch {
        setActions(INITIAL_ACTIONS);
      }
    } else {
      setActions(INITIAL_ACTIONS);
    }

    const savedCount = localStorage.getItem('ad_completed_count');
    if (savedCount) {
      setCompletedCount(parseInt(savedCount, 10) || 0);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      const next = completedCount + 1;
      setCompletedCount(next);
      localStorage.setItem('ad_completed_count', next.toString());
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      alert('🎉 15분 초집중 스프린트 완료! 실행 근육이 단련되었습니다.');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, completedCount]);

  const rollDice = () => {
    if (actions.length === 0 || isRolling) return;
    setIsRolling(true);
    setIsRunning(false);
    setTimeLeft(15 * 60);

    let rolls = 0;
    const interval = setInterval(() => {
      const randNum = Math.floor(Math.random() * 6) + 1;
      const randIdx = Math.floor(Math.random() * actions.length);
      setDiceNumber(randNum);
      setSelectedAction(actions[randIdx]);
      rolls++;

      if (rolls > 12) {
        clearInterval(interval);
        setIsRolling(false);
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.4 } });
      }
    }, 70);
  };

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const newItem: ActionItem = {
      id: Date.now().toString(),
      category: newCategory,
      text: newText.trim(),
    };
    const updated = [newItem, ...actions];
    setActions(updated);
    localStorage.setItem('ad_actions', JSON.stringify(updated));
    setNewText('');
  };

  const removeAction = (id: string) => {
    const updated = actions.filter((a) => a.id !== id);
    setActions(updated);
    localStorage.setItem('ad_actions', JSON.stringify(updated));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 py-10 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* 헤더 */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold shadow-2xs">
            <Sparkles size={14} /> 생각 과잉 탈출 솔루션
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-2">
            <span>🎲</span> 15분 액션 다이스 (Action Dice)
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            망설임은 내려놓고 주사위를 굴리세요. 뽑힌 초소형 액션을 15분 타이머와 함께 즉시 시작합니다.
          </p>
        </header>

        {/* 메인 룰렛 & 타이머 뷰 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* 좌측: 3D 주사위 롤러 */}
          <div className="md:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col items-center justify-between shadow-sm relative overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Dices size={16} className="text-indigo-600" /> 주사위 추첨기
              </span>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono font-semibold">
                Pool: {actions.length}개
              </span>
            </div>

            {/* 주사위 뷰포트 */}
            <div className="py-8 flex flex-col items-center justify-center">
              <div
                className={`w-28 h-28 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-lg flex items-center justify-center text-5xl font-black text-white cursor-pointer select-none transition-transform duration-300 ${
                  isRolling ? 'rotate-180 scale-110' : 'hover:scale-105 active:scale-95'
                }`}
                onClick={rollDice}
              >
                {diceNumber}
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium">클릭하거나 아래 버튼을 눌러 굴리기</p>
            </div>

            {/* 뽑힌 액션 카드 */}
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center min-h-[90px] flex flex-col justify-center">
              {selectedAction ? (
                <div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 mb-1 border border-indigo-200">
                    {selectedAction.category}
                  </span>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    "{selectedAction.text}"
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium">주사위를 굴리면 이곳에 오늘 즉시 실행할 작은 행동이 뜹니다.</p>
              )}
            </div>

            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Dices size={16} className={isRolling ? 'animate-spin' : ''} />
              {isRolling ? '주사위 굴리는 중...' : '다이스 굴리기 (Roll Action)'}
            </button>
          </div>

          {/* 우측: 15분 초집중 타이머 */}
          <div className="md:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col items-center justify-between shadow-sm">
            <div className="w-full flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Flame size={16} className="text-amber-500" /> 15분 초소형 스프린트
              </span>
              <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold border border-indigo-100">
                Timeboxed
              </span>
            </div>

            {/* 타이머 시계 */}
            <div className="py-6 flex flex-col items-center justify-center">
              <span className="text-6xl font-mono font-black text-slate-900 tracking-widest">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs font-bold text-indigo-600 mt-2">
                {isRunning ? '🔥 실행 몰입 가동 중' : '착수 준비 대기'}
              </span>
            </div>

            {/* 타이머 버튼 */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                {isRunning ? '일시 정지' : '15분 타이머 시작'}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(15 * 60);
                }}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold text-xs transition cursor-pointer border border-slate-200"
                title="초기화"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {/* 누적 완수 */}
            <div className="w-full mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Trophy size={14} className="text-amber-500" /> 오늘 완료한 스프린트
              </span>
              <span className="text-sm font-black text-slate-900 font-mono">{completedCount}회 달성</span>
            </div>
          </div>
        </div>

        {/* 하단: 초소형 착수 풀 관리 */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-600" />
              나만의 15분 액션 풀 커스텀 ({actions.length})
            </h2>
            <span className="text-[11px] text-slate-400">원하는 초소형 행동을 자유롭게 등록하세요</span>
          </div>

          {/* 등록 폼 */}
          <form onSubmit={addAction} className="flex flex-col sm:flex-row gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option>개발/작업</option>
              <option>정리/환경</option>
              <option>마인드/건강</option>
            </select>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="15분 안에 즉시 할 수 있는 가벼운 행동 입력..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> 추가하기
            </button>
          </form>

          {/* 리스트 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {actions.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {act.category}
                  </span>
                  <span className="truncate text-slate-800 font-medium">{act.text}</span>
                </div>
                <button
                  onClick={() => removeAction(act.id)}
                  className="text-slate-400 hover:text-rose-500 transition cursor-pointer p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}