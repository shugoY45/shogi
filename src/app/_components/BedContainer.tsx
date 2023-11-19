// BedContainer.tsx
"use client";


import React from 'react';
import BedDisplay from './BedDisplay';
import ReservationForm from './ReservationForm';
import { Bed, PatientInfo } from './bedReservationAlgorithm';

interface BedContainerProps {
  beds: Bed[];
  patients: PatientInfo[];
  onReservation: (bedId: number, patient: PatientInfo) => void;
}

const BedContainer: React.FC<BedContainerProps> = ({ beds, patients, onReservation }) => {
  return (
    <div>
      <h1>Hospital Bed Reservation</h1>
      <div style={{ display: 'flex' }}>
        <BedDisplay beds={beds} patients={patients} />
        <ReservationForm beds={beds} patients={patients} onReservation={onReservation} />
      </div>
    </div>
  );
};

export default BedContainer;

