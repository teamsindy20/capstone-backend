import { GraphQLResolveInfo } from 'graphql'

/**
 * 선택된 GraphQL 필드를 처리하기 위해 필요한 데이터베이스 테이블 컬럼 목록을 반환한다.
 * @param info
 * @param fieldColumnMapping GraphQL 필드 이름과 선택할 테이블 컬럼 이름의 맵핑 함수
 * @returns 선택할 컬럼 이름 배열
 */
export function selectColumnFromField(
  info: GraphQLResolveInfo,
  fieldColumnMapping: (field: any) => string | string[]
) {
  return [
    ...new Set(
      info.fieldNodes[0].selectionSet?.selections
        .map((selection) => fieldColumnMapping((selection as any).name.value))
        .filter((field) => field !== '')
        .flat()
    ),
  ]
}
