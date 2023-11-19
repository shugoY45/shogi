// BedDisplay.tsx

import React from 'react';
import { Bed, PatientInfo, HospitalizationInfo } from './bedReservationAlgorithm';

interface BedDisplayProps {
  beds: Bed[];
  patients: PatientInfo[];
}

const BedDisplay: React.FC<BedDisplayProps> = ({ beds, patients }) => {
  const gridSize = 60; // マスのサイズ

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {/* マス目の描画 */}
      {Array.from({ length: 9 }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{
            position: 'absolute',
            left: '0',
            top: `${rowIndex * gridSize}px`,
            width: '100%',
            height: '1px',
            backgroundColor: '#ddd', // マスの色
          }}
        />
      ))}
      {Array.from({ length: 9 }).map((_, colIndex) => (
        <div
          key={`col-${colIndex}`}
          style={{
            position: 'absolute',
            left: `${colIndex * gridSize}px`,
            top: '0',
            width: '1px',
            height: '100%',
            backgroundColor: '#ddd', // マスの色
          }}
        />
      ))}

      {/* ベッドの描画 */}
      {beds.map((bed) => {
        console.log(bed)
        const occupiedPatient = getOccupiedPatient(bed.hospitalizations, patients);
        return (
          <div
            key={bed.id}
            style={{
              width: `${gridSize}px`,
              height: `${gridSize}px`,
              backgroundColor: bed.infectionStatus === 'positive' ? 'red' : 'green',
              position: 'absolute',
              left: `${(bed.x - 1) * gridSize}px`,  // ここを修正
              top: `${(bed.y - 1) * gridSize}px`,  // ここを修正
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            {occupiedPatient ? occupiedPatient.name : 'Vacant'}
          </div>
        );
      })}
    </div>
  );
};

// 入院情報から現在使用中の患者を取得するユーティリティ関数
const getOccupiedPatient = (hospitalizations: HospitalizationInfo[], patients: PatientInfo[]): PatientInfo | null => {
  const currentHospitalization = hospitalizations.find((hosp) => !hosp.dischargeDate);
  if (currentHospitalization) {
    return patients.find((patient) => patient.id === currentHospitalization.patientId) || null;
  }
  return null;
};

export default BedDisplay;
