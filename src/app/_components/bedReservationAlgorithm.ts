// bedReservationAlgorithm.ts

import { sampleHospitalizations } from './sampleData'; // 追加

export interface HospitalizationInfo {
  id: number;
  bedId: number;
  patientId: number;
  admissionDate: string;
  dischargeDate: string | null;
}

export interface Bed {
  id: number;
  x: number;
  y: number;
  specialty: string;
  gender: string;
  infectionStatus: string;
  hospitalizations: HospitalizationInfo[];

  getHospitalizations: () => HospitalizationInfo[];
}

export interface PatientInfo {
  id: number;
  name: string;
  specialty: string;
  gender: string;
  infectionStatus: string;
}

// サンプルデータも同様に修正

export const createBed = (id: number, x: number, y: number, specialty: string, gender: string, infectionStatus: string): Bed => {
  return {
    id,
    x,
    y,
    specialty,
    gender,
    infectionStatus,
    hospitalizations: sampleHospitalizations.filter((h) => h.bedId === id), // 初期値として sampleHospitalizations を使用

    getHospitalizations() {
      return this.hospitalizations;
    },
  };
};
  
  export class BedReservationAlgorithm {
    recommendBed(patientInfo: PatientInfo, availableBeds: Bed[]): Bed | null {
      // 患者情報に基づいてベットを選択するロジックを追加
      const sameSpecialtyBeds = this.filterBedsBySpecialty(patientInfo.specialty, availableBeds);
      const genderBalancedBeds = this.filterBedsByGender(patientInfo.gender, sameSpecialtyBeds);
      return this.selectBedByInfectionStatus(patientInfo.infectionStatus, genderBalancedBeds);
    }
  
    private filterBedsBySpecialty(specialty: string, beds: Bed[]): Bed[] {
      // 診療科に基づいてベットを絞り込むロジックを追加
      return beds.filter(bed => bed.specialty === specialty);
    }
  
    private filterBedsByGender(gender: string, beds: Bed[]): Bed[] {
      // 男女のバランスに基づいてベットを絞り込むロジックを追加
    //   const genderCount = beds.reduce((count, bed) => (bed.gender === gender ? count + 1 : count), 0);
    //   const maxGenderCount = beds.length / 2; // 男女均等にするため、最大値をベット数の半分に設定
    //   return beds.filter(bed => bed.gender === gender && genderCount < maxGenderCount);
      return beds
    }
  
    private selectBedByInfectionStatus(infectionStatus: string, beds: Bed[]): Bed | null {
      // 感染症情報に基づいてベットを選択するロジックを追加
      return beds.find(bed => bed.infectionStatus === infectionStatus) || null;
    }
  }
  
    // 他のメソッドもコピー
  
  