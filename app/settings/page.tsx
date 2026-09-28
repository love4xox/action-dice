'use client';

import React from 'react';
import { Download, AlertOctagon } from 'lucide-react';

export default function SettingsPage() {
  const handleExportData = () => {
    const actions = localStorage.getItem('ad_actions') || '[]';
    const count = localStorage.getItem('ad_completed_count') || '0';
    const data = JSON.stringify({ actions: JSON.parse(actions), count: parseInt(count, 10) }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `action_dice_backup_${Date.now()}.json`;
    a.click();
  };

  const handleClearAll = () => {
    if (confirm('정말로 모든 액션 풀과 완료 기록을 초기화하시겠습니까?')) {
      localStorage.clear();
      alert('모든 데이터가 초기화되었습니다.');
      window.location.reload();
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>⚙️</span> 환경 설정 & 데이터 관리
          </h1>
          <p className="text-xs text-slate-500 mt-1">스프린트 환경과 로컬 데이터를 제어합니다.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900">데이터 백업 내보내기</h3>
              <p className="text-xs text-slate-500 mt-0.5">내가 추가한 액션 풀과 완수 기록을 JSON 파일로 저장합니다.</p>
            </div>
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Download size={14} /> 백업 다운로드
            </button>
          </div>

          <div className="p-5 bg-white border border-rose-200 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-rose-600 flex items-center gap-1.5">
                <AlertOctagon size={16} /> 데이터 완전 초기화
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">로컬스토리지에 저장된 모든 기록을 영구 삭제합니다.</p>
            </div>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              초기화 실행
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}