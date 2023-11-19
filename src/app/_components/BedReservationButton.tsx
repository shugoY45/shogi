// BedReservationButton.tsx
"use client";
import React from 'react';
import { BedReservationAlgorithm, Bed, PatientInfo } from './bedReservationAlgorithm';
import { samplePatients, sampleBeds } from './SampleData';

const BedReservationButton: React.FC = () => {
  const handleReservation = () => {
    const algorithm = new BedReservationAlgorithm();
    const recommendedBed = algorithm.recommendBed(samplePatients[0], sampleBeds);
    console.log(recommendedBed);
    // ここで他の処理を追加
  };

  return (
    <button
      onClick={handleReservation}
      style={{
        backgroundColor: '#4CAF50', // 背景色を適宜変更
        color: 'white', // テキスト色を適宜変更
        padding: '10px 20px', // パディングを適宜調整
        border: 'none', // ボーダーをなくす場合
        borderRadius: '5px', // ボーダーの角を丸める場合
        cursor: 'pointer', // カーソルをポインターに変更
      }}
    >
      Reserve Bed
    </button>
  );
};

export default BedReservationButton;
