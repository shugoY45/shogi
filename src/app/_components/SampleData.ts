// sampleData.ts

import { Bed, PatientInfo, HospitalizationInfo } from './bedReservationAlgorithm';

export const samplePatients: PatientInfo[] = [
  { id: 1, name: 'John Doe', specialty: 'Orthopedics', gender: 'male', infectionStatus: 'negative' },
  { id: 2, name: 'Jane Smith', specialty: 'Cardiology', gender: 'female', infectionStatus: 'positive' },
    { id: 6, name: 'John Doe', specialty: 'Cardiology', gender: 'Male', infectionStatus: 'negative' },
    { id: 7, name: 'Jane Doe', specialty: 'Orthopedics', gender: 'Female', infectionStatus: 'negative' },
    { id: 3, name: 'Alice Smith', specialty: 'Pediatrics', gender: 'Female', infectionStatus: 'negative' },
    { id: 4, name: 'Bob Johnson', specialty: 'Neurology', gender: 'Male', infectionStatus: 'negative' },
    { id: 5, name: 'Eve Davis', specialty: 'Ophthalmology', gender: 'Female', infectionStatus: 'negative' },
    // ... 追加した他の患者も同様にデータを設定
  // 新しい患者の情報を追加
];

export const sampleHospitalizations: HospitalizationInfo[] = [
  { id: 1, bedId: 1, patientId: 1, admissionDate: '2023-11-01', dischargeDate: null },
  { id: 2, bedId: 2, patientId: 2, admissionDate: '2023-11-05', dischargeDate: '2023-11-25' },
  // ... 他の入院情報も同様にデータを設定
];

export const sampleBeds: Bed[] = [
  {
    id: 1,
    x: 1,
    y: 1,
    specialty: 'Cardiology',
    gender: 'Male',
    infectionStatus: 'negative',
    hospitalizations: sampleHospitalizations.filter((h) => h.bedId === 1),
  },
  {
    id: 2,
    x: 5,
    y: 4,
    specialty: 'Orthopedics',
    gender: 'Female',
    infectionStatus: 'negative',
    hospitalizations: sampleHospitalizations.filter((h) => h.bedId === 2),
  },
  {
    id: 3,
    x: 3,
    y: 7,
    specialty: 'Pediatrics',
    gender: 'Male',
    infectionStatus: 'positive',
    hospitalizations: sampleHospitalizations.filter((h) => h.bedId === 3),
  },
];


// ベッドに入院情報を同期的に組み込む
// ベッドに入院情報を同期的に組み込む
export const syncProcess = () => {
  console.log(1)
  sampleHospitalizations.forEach((hospitalization) => {
    const bed = sampleBeds.find((bed) => bed.id === hospitalization.bedId);
    if (bed) {
      if (!bed.hospitalizations) {
        bed.hospitalizations = [];
      }
      bed.hospitalizations.push(hospitalization);
    }
  });
};

// 同期的に処理
syncProcess();
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// // ベッドに入院情報を非同期的に組み込む
// const asyncProcess = async () => {
//   for (const hospitalization of sampleHospitalizations) {
//     const bed = sampleBeds.find(bed => bed.id === hospitalization.bedId);
//     if (bed) {
//       if (!bed.hospitalizations) {
//         bed.hospitalizations = [];
//       }
//       bed.hospitalizations.push(hospitalization);
//       // 非同期処理を模すための遅延
//       await delay(100);
//     }
//   }
// };

// // asyncProcess関数の呼び出し
// asyncProcess().then(() => {
//   console.log('非同期処理が完了しました。');
// });
