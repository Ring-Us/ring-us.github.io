// 매핑 로직 제거
// 백엔드와 프론트엔드가 동일한 한국어 문자열만 주고받으므로
// 별도의 English ↔ 한국어 매핑 로직은 더 이상 필요하지 않습니다.

// 필요한 경우 아래와 같이 한국어 필드 옵션만 export하세요.
export {
  fieldOptions,
  subFieldOptions,
} from '@/global/components/JobCategories';

// MentorFields 역시 한국어 문자열을 그대로 사용합니다.
// 추가 매핑 파일은 사용되지 않습니다.
