import { jobCategoryMapping, detailedJobMapping } from "@/global/components/JobCategories";

// 직무 (한글로)
export const reverseJobCategoryMapping: { [key: string]: string } = Object.entries(jobCategoryMapping)
  .reduce((acc, [kor, eng]) => {
    acc[eng] = kor;
    return acc;
  }, {} as { [key: string]: string });


// 세부 직무 (한글로)
export const reverseDetailedJobMapping: { [key: string]: string } = Object.entries(detailedJobMapping)
  .reduce((acc, [kor, eng]) => {
    acc[eng] = kor;
    return acc;
  }, {} as { [key: string]: string });



// 멘토링 분야 (영어로)
export const mentoringFieldMapping: Record<string, string> = {
  '취업 준비': 'JOB_PREPARATION',
  '면접 대비': 'INTERVIEW_PREPARATION',
  '업계 동향': 'PRACTICAL_SKILLS',
  '커리어 고민': 'PORTFOLIO',
};

// 멘토링 분야 (한글로)
export const reverseMentoringFieldMapping: Record<string, string> = Object.entries(mentoringFieldMapping).reduce((acc, [kor, eng]) => {
  acc[eng] = kor;
  return acc;
}, {} as Record<string, string>);



// 요일 (영어로)
export const dayMapping: Record<string, string> = {
  '월': 'MON',
  '화': 'TUE',
  '수': 'WED',
  '목': 'THU',
  '금': 'FRI',
  '토': 'SAT',
  '일': 'SUN',
};

// 요일 (한글로)
export const reverseDayMapping: Record<string, string> = Object.entries(dayMapping).reduce((acc, [kor, eng]) => {
  acc[eng] = kor;
  return acc;
}, {} as Record<string, string>);