// ReservationForm.tsx
"use client";
// ReservationForm.tsx

import React, { useState } from 'react';
import { Bed, PatientInfo } from './bedReservationAlgorithm';

interface ReservationFormProps {
  beds: Bed[];
  patients: PatientInfo[];
  onReservation: (bedId: number, patientId: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ beds, patients, onReservation }) => {
  const [selectedBedId, setSelectedBedId] = useState<number | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [admissionDate, setAdmissionDate] = useState<string>(''); // 入院日付を追加

  const handleBedSelection = (bedId: number) => {
    if (admissionDate) {
      setSelectedBedId(bedId);
    }
  };

  const handlePatientSelection = (patientId: number) => {
    setSelectedPatientId(patientId);
  };

  const handleAdmissionDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionDate(event.target.value);
    // 入院日付が選択されたらベッド選択を有効にする
    setSelectedBedId(null);
  };

  const handleReservation = () => {
    if (selectedBedId !== null && selectedPatientId !== null) {
      onReservation(selectedBedId, selectedPatientId);
      setSelectedBedId(null);
      setSelectedPatientId(null);
      setAdmissionDate('');
    }
  };

  // 選択された入院日以降で、かつ退院日が選択された日付より後のベッドを除外
  const selectedDate = new Date(admissionDate).getTime();
  const filteredBeds = beds.filter((bed) => {
    const hospitalizations = bed.getHospitalizations();
    const hasFuturePlan = hospitalizations.some((h) => {
      const admissionDate = new Date(h.admissionDate).getTime();
      const dischargeDate = h.dischargeDate ? new Date(h.dischargeDate).getTime() : false;
    //   console.log("admissionDate <= selectedDate")
    //   console.log(admissionDate <= selectedDate)
    //   console.log("dischargeDate")
    //   console.log(dischargeDate)
    //   console.log(dischargeDate && dischargeDate > selectedDate)
      return admissionDate <= selectedDate && (dischargeDate===false || dischargeDate > selectedDate);
      
    });
    // console.log(hasFuturePlan)

    return !hasFuturePlan;
  });

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
      <h2>Reservation Form</h2>

      <label htmlFor="admissionDate">Admission Date:</label>
      <input
        type="date"
        id="admissionDate"
        value={admissionDate}
        onChange={handleAdmissionDateChange}
        style={{ marginRight: '10px' }}
      />

<label htmlFor="bedSelect">Select a Bed:</label>
<select
  id="bedSelect"
  value={selectedBedId || ''}
  onChange={(e) => handleBedSelection(Number(e.target.value))}
  style={{ marginRight: '10px' }}
  disabled={!admissionDate}
>
  <option value="" disabled>
    Choose a bed
  </option>
  {filteredBeds.map((bed) => (
    <option key={bed.id} value={bed.id}>
      Bed {bed.id}
    </option>
  ))}
</select>

<label htmlFor="patientSelect">Select a Patient:</label>
<select
  id="patientSelect"
  value={selectedPatientId || ''}
  onChange={(e) => handlePatientSelection(Number(e.target.value))}
  style={{ marginRight: '10px' }}
>
  <option value="" disabled>
    Choose a patient
  </option>
  {patients.map((patient) => (
    <option key={patient.id} value={patient.id}>
      {patient.name}
    </option>
  ))}
</select>

      <button onClick={handleReservation} disabled={selectedBedId === null || selectedPatientId === null || !admissionDate} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        Reserve
      </button>
    </div>
  );
};

export default ReservationForm;
