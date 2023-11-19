// ReservationContainer.tsx
"use client";
import React from 'react';
import ReservationForm from './ReservationForm';
import BedContainer from './BedContainer';
import { sampleBeds, samplePatients } from './sampleData';
import { BedReservationAlgorithm, Bed, PatientInfo } from './bedReservationAlgorithm';

// App.tsx や別の初期化ファイル

import { createBed } from './bedReservationAlgorithm';
// import { sampleBeds } from './sampleData';

// サンプルデータを初期化
const initializedBeds = sampleBeds.map((bed) =>
  createBed(bed.id, bed.x, bed.y, bed.specialty, bed.gender, bed.infectionStatus)
);

// initializedBeds を使ってアプリケーションを初期化
// ...

// あるいは、新しいベッドが必要な時に createBed を呼び出して利用
const newBed = createBed(100, 5, 5, 'Neurology', 'Female', 'negative');


const ReservationContainer: React.FC = () => {
  const [beds, setBeds] = React.useState(initializedBeds);
  const [patients, setPatients] = React.useState(samplePatients);

  const handleReservation = (bedId: number, patient: PatientInfo) => {
    const updatedBeds = beds.map((bed) => {
      if (bed.id === bedId) {
        const updatedHospitalizations = bed.hospitalizations.concat({
          id: 1001, // 仮のID。実際のアプリでは一意のIDを生成する方法を使用してください。
          bedId,
          patientId: patient.id,
          admissionDate: '2023-01-20', // 仮の入院日。実際のアプリでは適切な方法で設定してください。
        });
        return { ...bed, hospitalizations: updatedHospitalizations };
      }
      return bed;
    });

    const updatedPatients = patients.concat(patient);

    setBeds(updatedBeds);
    setPatients(updatedPatients);
  };

  return (
    <div>
      <h1>Hospital Bed Reservation</h1>
      <BedContainer beds={beds} patients={patients} onReservation={handleReservation} />
    </div>
  );
};

export default ReservationContainer;
