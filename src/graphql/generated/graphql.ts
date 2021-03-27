/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type Artist = {
  __typename?: 'Artist'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  writingDate: Scalars['String']
  content: Scalars['String']
  userName: Scalars['String']
  source: CrawlingSource
  likeCount?: Maybe<Scalars['Int']>
}

export enum CrawlingSource {
  Youtube = 'YOUTUBE',
  Melon = 'MELON',
  Icezam = 'ICEZAM',
}

export type Music = {
  __typename?: 'Music'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  title: Scalars['String']
  artists: Array<Scalars['String']>
  searchCount: Scalars['Int']
  albumImage?: Maybe<Scalars['String']>
  albumColor?: Maybe<Scalars['String']>
  artistImage?: Maybe<Scalars['String']>
  genres?: Maybe<Array<Scalars['String']>>
  lyrics?: Maybe<Array<Scalars['String']>>
  melonLink?: Maybe<Scalars['String']>
  shazamId?: Maybe<Scalars['Int']>
  youtubeLink?: Maybe<Scalars['String']>
  youtubeImage?: Maybe<Scalars['String']>
  /** 이 노래를 부른 가수의 다른 노래를 검색 횟수 순으로 반환한다. # 페이지네이션 필요 */
  artistOtherMusics?: Maybe<Array<Music>>
  /** 이 노래에 해당하는 댓글 목록을 반환한다. # 페이지네이션 필요 */
  comments?: Maybe<Array<Comment>>
  /** 이 노래가 포함된 재생 목록을 반환한다. # 페이지네이션 필요 */
  includedPlaylists?: Maybe<Array<Playlist>>
  /** 이 노래와 비슷한 노래 목록을 반환한다. # 페이지네이션 필요 */
  similarMusics?: Maybe<Array<Music>>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** 이메일과 1번 해싱한 비밀번호를 전송하면 인증 토큰을 반환한다. */
  login?: Maybe<Scalars['String']>
  /** HTTP Header나 쿠키에 인증 토큰 정보를 넣어서 요청하면 로그아웃 성공 여부를 반환한다. */
  logout: Scalars['Boolean']
  createUserTable: Scalars['Boolean']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  passwordHash: Scalars['String']
}

export type Playlist = {
  __typename?: 'Playlist'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  name: Scalars['String']
  musics?: Maybe<Array<Music>>
}

export type Query = {
  __typename?: 'Query'
  /** 사용자 목록을 반환한다. (관리자 전용) */
  users?: Maybe<Array<User>>
  /** 내 정보를 반환한다. 해당 권한이 없으면 오류가 발생한다. */
  me?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  email: Scalars['String']
  token: Scalars['String']
  name: Scalars['String']
  age: Scalars['Int']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Artist: ResolverTypeWrapper<Artist>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Comment: ResolverTypeWrapper<Comment>
  Int: ResolverTypeWrapper<Scalars['Int']>
  CrawlingSource: CrawlingSource
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Music: ResolverTypeWrapper<Music>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Playlist: ResolverTypeWrapper<Playlist>
  Query: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Artist: Artist
  ID: Scalars['ID']
  String: Scalars['String']
  Comment: Comment
  Int: Scalars['Int']
  DateTime: Scalars['DateTime']
  Music: Music
  Mutation: {}
  Boolean: Scalars['Boolean']
  Playlist: Playlist
  Query: {}
  User: User
}

export type ArtistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  writingDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  source?: Resolver<ResolversTypes['CrawlingSource'], ParentType, ContextType>
  likeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MusicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Music'] = ResolversParentTypes['Music']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  artists?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  searchCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  albumImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  albumColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  artistImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  genres?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  lyrics?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  melonLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  shazamId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  youtubeLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  youtubeImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  artistOtherMusics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
  includedPlaylists?: Resolver<Maybe<Array<ResolversTypes['Playlist']>>, ParentType, ContextType>
  similarMusics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'passwordHash'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createUserTable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type PlaylistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  musics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Artist?: ArtistResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Music?: MusicResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Playlist?: PlaylistResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
