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
  EmailAddress: any
  JWT: any
  NonEmptyString: any
  URL: any
}

export type Coupon = {
  __typename?: 'Coupon'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  type: Scalars['String']
  discountAmount: Scalars['Int']
  minimumOrderAmount: Scalars['Int']
  expirationStartDate: Scalars['DateTime']
  expirationEndDate: Scalars['DateTime']
  isUsed: Scalars['Boolean']
  orderId?: Maybe<Scalars['ID']>
  storeId?: Maybe<Scalars['ID']>
  userId?: Maybe<Scalars['ID']>
  order?: Maybe<Order>
  store?: Maybe<Store>
  user?: Maybe<User>
}

export type Menu = {
  __typename?: 'Menu'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  price: Scalars['Int']
  deliciousReviewCount: Scalars['Int']
  deliciousReviewRatio: Scalars['Int']
  fineReviewCount: Scalars['Int']
  fineReviewRatio: Scalars['Int']
  positiveReviewCount: Scalars['Int']
  positiveReviewRatio: Scalars['Int']
  badReviewCount: Scalars['Int']
  badReviewRatio: Scalars['Int']
  totalReviewCount: Scalars['Int']
  newOrderCount: Scalars['Int']
  newOrderRatio: Scalars['Int']
  reorderCount: Scalars['Int']
  reorderRatio: Scalars['Int']
  totalOrderCount: Scalars['Int']
  newCustomerCount: Scalars['Int']
  newCustomerRatio: Scalars['Int']
  regularCustomerCount: Scalars['Int']
  regularCustomerRatio: Scalars['Int']
  totalCustomerCount: Scalars['Int']
  favoriteCount: Scalars['Int']
  clickCount: Scalars['Int']
  storePostCount: Scalars['Int']
  isDiscounted: Scalars['Boolean']
  canBePicked: Scalars['Boolean']
  canBeReserved: Scalars['Boolean']
  categoryId: Scalars['ID']
  storeId: Scalars['ID']
  content?: Maybe<Scalars['String']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  themeId?: Maybe<Scalars['ID']>
  /** 해당 메뉴의 카테고리를 반환한다. */
  category: Scalars['String']
  /** 로그인 상태일 때 요청하면 사용자가 해당 메뉴를 찜한 여부를 반환한다. */
  favorite: Scalars['Boolean']
  /** 해당 메뉴가 속한 매장 정보를 반환한다. */
  store: Store
  /** 해당 메뉴가 가진 해시태그 목록을 반환한다. */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  /** 메뉴에 달린 옵션 카테고리을 반환한다. */
  optionCategories?: Maybe<Array<MenuOptionCategory>>
  /** 해당 메뉴가 속한 테마를 반환한다. */
  theme?: Maybe<Scalars['String']>
}

export type MenuCreationInput = {
  storeId: Scalars['ID']
  name: Scalars['String']
  price: Scalars['Int']
  category: Scalars['String']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  hashtags?: Maybe<Array<Scalars['String']>>
  options?: Maybe<Array<MenuOptionInput>>
}

export type MenuModificationInput = {
  storeId: Scalars['ID']
  name?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Int']>
  category?: Maybe<Scalars['String']>
  /**
   * 기존 이미지 주소 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /**
   * 기존 해시태그 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  hashtags?: Maybe<Array<Scalars['String']>>
  /**
   * 기존 메뉴 옵션 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  options?: Maybe<Array<MenuOptionInput>>
}

export type MenuOption = {
  __typename?: 'MenuOption'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  price: Scalars['Int']
  categoryId: Scalars['ID']
  category: MenuOptionCategory
}

export type MenuOptionCategory = {
  __typename?: 'MenuOptionCategory'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  type: MenuOptionCategoryType
  isNecessary: Scalars['Boolean']
  menuId: Scalars['ID']
  menu: Menu
  menuOptions: Array<MenuOption>
}

export enum MenuOptionCategoryType {
  BinarySelection = 'BINARY_SELECTION',
  SingleSelection = 'SINGLE_SELECTION',
  MultiSelection = 'MULTI_SELECTION',
  Text = 'TEXT',
}

export type MenuOptionInput = {
  name: Scalars['String']
  price: Scalars['Int']
  isNecessary: Scalars['Boolean']
  category?: Maybe<Scalars['String']>
}

export type MenuOptionSelectionInput = {
  id: Scalars['ID']
  text?: Maybe<Scalars['String']>
}

export type MenuSelectionInput = {
  id: Scalars['ID']
  count: Scalars['Int']
  menuOptions?: Maybe<Array<MenuOptionSelectionInput>>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** 자신이 소유하고 있는 매장에 새로운 메뉴를 생성합니다. */
  createMenu: Scalars['ID']
  createOrder: Scalars['ID']
  createPost: Scalars['ID']
  createReview: Scalars['ID']
  createStore: Scalars['ID']
  /** 게시글을 '좋아요' 한다. */
  likePost: Scalars['ID']
  /** 이메일과 1번 해싱한 비밀번호를 전송하면 인증 토큰을 반환한다. */
  login: Scalars['JWT']
  /** 인증 토큰과 같이 요청하면 로그아웃 성공 여부를 반환한다. */
  logout: Scalars['Boolean']
  modifyMenu: Scalars['ID']
  /**
   * 해당 메뉴를 찜하거나 이미 찜한 메뉴를 해제한다.
   *
   * `True`: 찜 성공
   *
   * `False`: 찜 해제
   */
  pickMenu: Scalars['Boolean']
  /**
   * 해당 매장을 찜하거나 이미 찜한 매장을 헤제한다.
   *
   * True: 찜 성공, False: 찜 해제
   */
  pickStore: Scalars['Boolean']
  /** 회원가입에 필요한 정보를 주면 성공했을 때 인증 토큰을 반환한다. */
  register: Scalars['JWT']
  searchMenuCategory?: Maybe<Array<Scalars['String']>>
  /** 회원탈퇴 시 사용자 정보가 모두 초기화된다. */
  unregister: Scalars['Boolean']
  /** 사용자 배달 주소를 업데이트한다. */
  updateDeliveryAddress: Scalars['Boolean']
  /** 주문 상태 변경에 대한 적절한 권한이 있으면 주문 상태를 업데이트한다. */
  updateOrderStatus: Scalars['ID']
  /** 사용자 선호 해시태그를 입력값 그대로 설정한다. */
  updatePreferences: Array<Scalars['NonEmptyString']>
  updatePrimaryDeliveryAddress: Scalars['Boolean']
}

export type MutationCreateMenuArgs = {
  input: MenuCreationInput
}

export type MutationCreateOrderArgs = {
  input: OrderCreationInput
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationCreateReviewArgs = {
  input: ReviewCreationInput
}

export type MutationCreateStoreArgs = {
  input: StoreCreationInput
}

export type MutationLikePostArgs = {
  id: Scalars['ID']
}

export type MutationLoginArgs = {
  email: Scalars['EmailAddress']
  passwordHash: Scalars['String']
}

export type MutationModifyMenuArgs = {
  input: MenuModificationInput
}

export type MutationPickMenuArgs = {
  id: Scalars['ID']
}

export type MutationPickStoreArgs = {
  id: Scalars['ID']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationSearchMenuCategoryArgs = {
  searchTerm: Scalars['String']
}

export type MutationUpdateDeliveryAddressArgs = {
  input: Scalars['String']
}

export type MutationUpdateOrderStatusArgs = {
  orderStatus: OrderStatus
}

export type MutationUpdatePreferencesArgs = {
  preferences: Array<Scalars['NonEmptyString']>
}

export type MutationUpdatePrimaryDeliveryAddressArgs = {
  deliveryAddress: Scalars['String']
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  orderTotal: Scalars['Int']
  menuTotal: Scalars['Int']
  deliveryCharge: Scalars['Int']
  paymentDate: Scalars['DateTime']
  deliveryAddress: Scalars['String']
  orderStatus: OrderStatus
  pointUsed: Scalars['Int']
  pointSaved: Scalars['Int']
  paymentId: Scalars['ID']
  storeId: Scalars['ID']
  userId: Scalars['ID']
  storeRequest?: Maybe<Scalars['String']>
  reviewReward?: Maybe<Scalars['String']>
  regularReward?: Maybe<Scalars['String']>
  deliveryRequest?: Maybe<Scalars['String']>
  couponId?: Maybe<Scalars['ID']>
  promotionId?: Maybe<Scalars['ID']>
  selectedMenus: Array<Menu>
  payment: Payment
  store: Store
  user: User
  coupon?: Maybe<Coupon>
  review?: Maybe<Array<Review>>
}

export type OrderCreationInput = {
  menus: Array<MenuSelectionInput>
  payment: PaymentInput
  user: UserInfoInput
}

export enum OrderStatus {
  OrderWaiting = 'ORDER_WAITING',
  CookingInProgress = 'COOKING_IN_PROGRESS',
  DeliveryInProgress = 'DELIVERY_IN_PROGRESS',
  DeliveryCompletion = 'DELIVERY_COMPLETION',
}

export type Payment = {
  __typename?: 'Payment'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
}

export type PaymentInput = {
  paymentId: Scalars['ID']
  paymentDate: Scalars['DateTime']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  contents: Array<Scalars['String']>
  commentCount: Scalars['Int']
  likeCount: Scalars['Int']
  storeId: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 해당 글을 작성한 매장 정보를 반환한다. */
  store: Store
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type PostCreationInput = {
  /** 글 내용 중에 줄 바꿈 1개 당 `\n`을 1개 사용한다. */
  content: Scalars['String']
  storeId: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type PromotionInput = {
  promotionId: Scalars['ID']
  name: Scalars['String']
  amount: Scalars['Int']
}

/** OAuth 공급자 */
export enum Provider {
  DessertFit = 'DESSERT_FIT',
  Google = 'GOOGLE',
  Naver = 'NAVER',
  Kakao = 'KAKAO',
}

export type Query = {
  __typename?: 'Query'
  /** 인증 토큰과 같이 요청하면 사용자 정보를 반환한다. */
  me: User
  /** 특정 메뉴의 세부 정보를 반환한다. */
  menu?: Maybe<Menu>
  /** 특정 메뉴의 세부 정보를 반환한다. */
  menuByName?: Maybe<Menu>
  /** 메뉴 카테고리 목록을 반환한다. */
  menuCategories: Array<Scalars['String']>
  /** 메뉴 테마 목록을 반환한다. */
  menuThemes: Array<Scalars['String']>
  /** 로그인 시 사용자 맞춤 메뉴 목록을 반환한다. 비로그인 시 일반 메뉴 목록을 반환한다. */
  menus: Array<Menu>
  /** 특정 카테고리에 속하는 메뉴 목록을 반환한다. */
  menusByCategory: Array<Menu>
  /** 특정 매장에서 판매하는 메뉴 목록을 반환한다. */
  menusByStore: Array<Menu>
  /** 특정 테마에 속하는 메뉴 목록을 반환한다. */
  menusByTheme: Array<Menu>
  /** 특정 주문에 대한 상세 정보를 반환한다. */
  order?: Maybe<Order>
  /** 사용자의 주문 목록을 반환한다. */
  orders?: Maybe<Array<Order>>
  /** 특정 글 정보를 반환한다. */
  post?: Maybe<Post>
  /** 특정 주소 기반 여러 매장이 쓴 글을 반환한다. */
  postsByAddress: Array<Post>
  /** 특정 매장이 쓴 글을 반환한다. */
  postsByStore: Array<Post>
  /** 특정 글 정보를 반환한다. */
  review?: Maybe<Post>
  /** 사용자가 작성한 리뷰 목록을 반환한다. */
  reviews?: Maybe<Array<Post>>
  /** 여러 메뉴의 리뷰 목록을 반환한다. */
  reviewsByMenu?: Maybe<Array<Post>>
  /** 특정 매장의 리뷰 목록을 반환한다. */
  reviewsByStore?: Maybe<Array<Post>>
  searchMenus?: Maybe<Array<Menu>>
  searchPosts?: Maybe<Array<Post>>
  searchReviews?: Maybe<Array<Review>>
  searchStores?: Maybe<Array<Store>>
  /** 특정 매장을 반환한다. */
  store?: Maybe<Store>
  /** 매장 목록을 반환한다. */
  stores?: Maybe<Array<Store>>
  /**
   * 이메일 중복 여부를 검사한다.
   *
   * `True`: 중복되지 않은 이메일
   *
   * `False`: 중복된 이메일
   */
  verifyUniqueEmail: Scalars['Boolean']
}

export type QueryMenuArgs = {
  id: Scalars['ID']
}

export type QueryMenuByNameArgs = {
  storeId: Scalars['ID']
  name: Scalars['String']
}

export type QueryMenusByCategoryArgs = {
  category: Scalars['String']
}

export type QueryMenusByStoreArgs = {
  storeId: Scalars['ID']
}

export type QueryMenusByThemeArgs = {
  theme: Scalars['String']
}

export type QueryOrderArgs = {
  id: Scalars['ID']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsByAddressArgs = {
  address: Scalars['String']
}

export type QueryPostsByStoreArgs = {
  storeId: Scalars['ID']
}

export type QueryReviewArgs = {
  id: Scalars['ID']
}

export type QueryReviewsByMenuArgs = {
  menuIds: Array<Scalars['ID']>
}

export type QueryReviewsByStoreArgs = {
  storeId: Scalars['ID']
}

export type QuerySearchMenusArgs = {
  hashtag: Scalars['NonEmptyString']
}

export type QuerySearchPostsArgs = {
  hashtag: Scalars['NonEmptyString']
}

export type QuerySearchReviewsArgs = {
  hashtag: Scalars['NonEmptyString']
}

export type QuerySearchStoresArgs = {
  hashtag: Scalars['NonEmptyString']
}

export type QueryStoreArgs = {
  id: Scalars['ID']
}

export type QueryVerifyUniqueEmailArgs = {
  email: Scalars['EmailAddress']
}

export enum Rating {
  Delicious = 'DELICIOUS',
  Good = 'GOOD',
  Bad = 'BAD',
}

export type RegisterInput = {
  email: Scalars['EmailAddress']
  passwordHash: Scalars['String']
  name?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['DateTime']>
  imageUrl?: Maybe<Scalars['URL']>
  deliveryAddress?: Maybe<Scalars['String']>
  preference?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type Review = {
  __typename?: 'Review'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  helpingOthersCount: Scalars['Int']
  rating: Rating
  isReviewEvent: Scalars['Boolean']
  userId: Scalars['ID']
  goodPointContent?: Maybe<Scalars['String']>
  desiredPointContent?: Maybe<Scalars['String']>
  menus: Array<Menu>
  order: Order
  store: Store
  user: User
}

export type ReviewCreationInput = {
  menuIds: Scalars['ID']
  rating: Rating
  orderId: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  goodPointContent?: Maybe<Scalars['String']>
  desiredPointContent?: Maybe<Scalars['String']>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type Store = {
  __typename?: 'Store'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  address: Scalars['String']
  businessRegistrationName: Scalars['String']
  businessRegistrationNumber: Scalars['String']
  businessRegistrationAddress: Scalars['String']
  businessRepresentativeName: Scalars['String']
  isFranchise: Scalars['Boolean']
  deliveryCharge: Scalars['Int']
  minimumDeliveryAmount: Scalars['Int']
  deliciousReviewCount: Scalars['Int']
  deliciousReviewRatio: Scalars['Int']
  fineReviewCount: Scalars['Int']
  fineReviewRatio: Scalars['Int']
  positiveReviewCount: Scalars['Int']
  positiveReviewRatio: Scalars['Int']
  badReviewCount: Scalars['Int']
  badReviewRatio: Scalars['Int']
  totalReviewCount: Scalars['Int']
  newOrderCount: Scalars['Int']
  newOrderRatio: Scalars['Int']
  reorderCount: Scalars['Int']
  reorderRatio: Scalars['Int']
  totalOrderCount: Scalars['Int']
  newCustomerCount: Scalars['Int']
  newCustomerRatio: Scalars['Int']
  regularCustomerCount: Scalars['Int']
  regularCustomerRatio: Scalars['Int']
  totalCustomerCount: Scalars['Int']
  favoriteCount: Scalars['Int']
  clickCount: Scalars['Int']
  postCount: Scalars['Int']
  userId: Scalars['ID']
  reviewEventContent?: Maybe<Scalars['String']>
  regularCustomerEventContent?: Maybe<Scalars['String']>
  minimumDeliveryTime?: Maybe<Scalars['Int']>
  maximumDeliveryTime?: Maybe<Scalars['Int']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 로그인 상태일 때 요청하면 사용자가 해당 매장을 찜한 여부를 반환한다. */
  favorite: Scalars['Boolean']
  /** 해당 매장에서 판매 중인 메뉴 목록을 반환한다. */
  menus: Array<Menu>
  /** 로그인 상태일 때 요청하면 사용자가 해당 매장의 단골인지를 반환한다. */
  regular: Scalars['Boolean']
  /** 해당 매장을 소유한 사용자 정보를 반환한다. */
  user: User
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  posts?: Maybe<Array<Post>>
}

export type StoreCreationInput = {
  name: Scalars['String']
  address: Scalars['String']
  reviewEventContent?: Maybe<Scalars['String']>
  regularCustomerEventContent?: Maybe<Scalars['String']>
  deliveryTimeMin?: Maybe<Scalars['Int']>
  deliveryTimeMax?: Maybe<Scalars['Int']>
  imageUrls?: Maybe<Array<Scalars['String']>>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  email: Scalars['EmailAddress']
  providers: Array<Provider>
  point: Scalars['Int']
  isEmailVerified: Scalars['Boolean']
  name?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['DateTime']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  deliveryAddresses?: Maybe<Scalars['String']>
  representativeDeliveryAddress?: Maybe<Scalars['String']>
  coupons?: Maybe<Array<Coupon>>
  favoriteMenus?: Maybe<Array<Menu>>
  favoriteStores?: Maybe<Array<Store>>
  orders?: Maybe<Array<Order>>
  preferences?: Maybe<Array<Scalars['NonEmptyString']>>
  regularStores?: Maybe<Array<Store>>
}

export type UserInfoInput = {
  deliveryAddress: Scalars['String']
  deliveryPhoneNumber: Scalars['String']
  storeRequest?: Maybe<Scalars['String']>
  reviewReward?: Maybe<Scalars['String']>
  regularReward?: Maybe<Scalars['String']>
  deliveryRequest?: Maybe<Scalars['String']>
  point?: Maybe<Scalars['Int']>
  promotion?: Maybe<Array<PromotionInput>>
  couponId?: Maybe<Scalars['ID']>
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
  Coupon: ResolverTypeWrapper<Coupon>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>
  JWT: ResolverTypeWrapper<Scalars['JWT']>
  Menu: ResolverTypeWrapper<Menu>
  MenuCreationInput: MenuCreationInput
  MenuModificationInput: MenuModificationInput
  MenuOption: ResolverTypeWrapper<MenuOption>
  MenuOptionCategory: ResolverTypeWrapper<MenuOptionCategory>
  MenuOptionCategoryType: MenuOptionCategoryType
  MenuOptionInput: MenuOptionInput
  MenuOptionSelectionInput: MenuOptionSelectionInput
  MenuSelectionInput: MenuSelectionInput
  Mutation: ResolverTypeWrapper<{}>
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>
  Order: ResolverTypeWrapper<Order>
  OrderCreationInput: OrderCreationInput
  OrderStatus: OrderStatus
  Payment: ResolverTypeWrapper<Payment>
  PaymentInput: PaymentInput
  Post: ResolverTypeWrapper<Post>
  PostCreationInput: PostCreationInput
  PromotionInput: PromotionInput
  Provider: Provider
  Query: ResolverTypeWrapper<{}>
  Rating: Rating
  RegisterInput: RegisterInput
  Review: ResolverTypeWrapper<Review>
  ReviewCreationInput: ReviewCreationInput
  Store: ResolverTypeWrapper<Store>
  StoreCreationInput: StoreCreationInput
  URL: ResolverTypeWrapper<Scalars['URL']>
  User: ResolverTypeWrapper<User>
  UserInfoInput: UserInfoInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Coupon: Coupon
  ID: Scalars['ID']
  String: Scalars['String']
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  DateTime: Scalars['DateTime']
  EmailAddress: Scalars['EmailAddress']
  JWT: Scalars['JWT']
  Menu: Menu
  MenuCreationInput: MenuCreationInput
  MenuModificationInput: MenuModificationInput
  MenuOption: MenuOption
  MenuOptionCategory: MenuOptionCategory
  MenuOptionInput: MenuOptionInput
  MenuOptionSelectionInput: MenuOptionSelectionInput
  MenuSelectionInput: MenuSelectionInput
  Mutation: {}
  NonEmptyString: Scalars['NonEmptyString']
  Order: Order
  OrderCreationInput: OrderCreationInput
  Payment: Payment
  PaymentInput: PaymentInput
  Post: Post
  PostCreationInput: PostCreationInput
  PromotionInput: PromotionInput
  Query: {}
  RegisterInput: RegisterInput
  Review: Review
  ReviewCreationInput: ReviewCreationInput
  Store: Store
  StoreCreationInput: StoreCreationInput
  URL: Scalars['URL']
  User: User
  UserInfoInput: UserInfoInput
}

export type CouponResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Coupon'] = ResolversParentTypes['Coupon']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  discountAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  minimumOrderAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  expirationStartDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  expirationEndDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  isUsed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  orderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  storeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT'
}

export type MenuResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deliciousReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deliciousReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fineReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fineReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  positiveReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  positiveReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  badReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  badReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newOrderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newOrderRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  reorderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  reorderRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalOrderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newCustomerRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  regularCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  regularCustomerRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  favoriteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  clickCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  storePostCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  isDiscounted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  canBePicked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  canBeReserved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  categoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  storeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  themeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  favorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>
  hashtags?: Resolver<Maybe<Array<ResolversTypes['NonEmptyString']>>, ParentType, ContextType>
  optionCategories?: Resolver<
    Maybe<Array<ResolversTypes['MenuOptionCategory']>>,
    ParentType,
    ContextType
  >
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MenuOptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MenuOption'] = ResolversParentTypes['MenuOption']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  categoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  category?: Resolver<ResolversTypes['MenuOptionCategory'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MenuOptionCategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MenuOptionCategory'] = ResolversParentTypes['MenuOptionCategory']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['MenuOptionCategoryType'], ParentType, ContextType>
  isNecessary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  menuId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType>
  menuOptions?: Resolver<Array<ResolversTypes['MenuOption']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createMenu?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMenuArgs, 'input'>
  >
  createOrder?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrderArgs, 'input'>
  >
  createPost?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  createReview?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReviewArgs, 'input'>
  >
  createStore?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateStoreArgs, 'input'>
  >
  likePost?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationLikePostArgs, 'id'>
  >
  login?: Resolver<
    ResolversTypes['JWT'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'passwordHash'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  modifyMenu?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyMenuArgs, 'input'>
  >
  pickMenu?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationPickMenuArgs, 'id'>
  >
  pickStore?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationPickStoreArgs, 'id'>
  >
  register?: Resolver<
    ResolversTypes['JWT'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'input'>
  >
  searchMenuCategory?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType,
    RequireFields<MutationSearchMenuCategoryArgs, 'searchTerm'>
  >
  unregister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  updateDeliveryAddress?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDeliveryAddressArgs, 'input'>
  >
  updateOrderStatus?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrderStatusArgs, 'orderStatus'>
  >
  updatePreferences?: Resolver<
    Array<ResolversTypes['NonEmptyString']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferencesArgs, 'preferences'>
  >
  updatePrimaryDeliveryAddress?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePrimaryDeliveryAddressArgs, 'deliveryAddress'>
  >
}

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString'
}

export type OrderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  orderTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  menuTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deliveryCharge?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  paymentDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  orderStatus?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>
  pointUsed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  pointSaved?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  paymentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  storeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  storeRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  reviewReward?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  regularReward?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  deliveryRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  couponId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  promotionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  selectedMenus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType>
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  coupon?: Resolver<Maybe<ResolversTypes['Coupon']>, ParentType, ContextType>
  review?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  contents?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  storeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>
  hashtags?: Resolver<Maybe<Array<ResolversTypes['NonEmptyString']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  menu?: Resolver<
    Maybe<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryMenuArgs, 'id'>
  >
  menuByName?: Resolver<
    Maybe<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryMenuByNameArgs, 'storeId' | 'name'>
  >
  menuCategories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  menuThemes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  menus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType>
  menusByCategory?: Resolver<
    Array<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryMenusByCategoryArgs, 'category'>
  >
  menusByStore?: Resolver<
    Array<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryMenusByStoreArgs, 'storeId'>
  >
  menusByTheme?: Resolver<
    Array<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryMenusByThemeArgs, 'theme'>
  >
  order?: Resolver<
    Maybe<ResolversTypes['Order']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrderArgs, 'id'>
  >
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'id'>
  >
  postsByAddress?: Resolver<
    Array<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsByAddressArgs, 'address'>
  >
  postsByStore?: Resolver<
    Array<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsByStoreArgs, 'storeId'>
  >
  review?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryReviewArgs, 'id'>
  >
  reviews?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>
  reviewsByMenu?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QueryReviewsByMenuArgs, 'menuIds'>
  >
  reviewsByStore?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QueryReviewsByStoreArgs, 'storeId'>
  >
  searchMenus?: Resolver<
    Maybe<Array<ResolversTypes['Menu']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchMenusArgs, 'hashtag'>
  >
  searchPosts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchPostsArgs, 'hashtag'>
  >
  searchReviews?: Resolver<
    Maybe<Array<ResolversTypes['Review']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchReviewsArgs, 'hashtag'>
  >
  searchStores?: Resolver<
    Maybe<Array<ResolversTypes['Store']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchStoresArgs, 'hashtag'>
  >
  store?: Resolver<
    Maybe<ResolversTypes['Store']>,
    ParentType,
    ContextType,
    RequireFields<QueryStoreArgs, 'id'>
  >
  stores?: Resolver<Maybe<Array<ResolversTypes['Store']>>, ParentType, ContextType>
  verifyUniqueEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryVerifyUniqueEmailArgs, 'email'>
  >
}

export type ReviewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  helpingOthersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>
  isReviewEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  goodPointContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  desiredPointContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  menus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType>
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type StoreResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  businessRegistrationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  businessRegistrationNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  businessRegistrationAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  businessRepresentativeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isFranchise?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  deliveryCharge?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  minimumDeliveryAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deliciousReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deliciousReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fineReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fineReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  positiveReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  positiveReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  badReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  badReviewRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newOrderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newOrderRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  reorderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  reorderRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalOrderCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  newCustomerRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  regularCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  regularCustomerRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalCustomerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  favoriteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  clickCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  postCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  reviewEventContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  regularCustomerEventContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  minimumDeliveryTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  maximumDeliveryTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  favorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  menus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType>
  regular?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  hashtags?: Resolver<Maybe<Array<ResolversTypes['NonEmptyString']>>, ParentType, ContextType>
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  modificationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  providers?: Resolver<Array<ResolversTypes['Provider']>, ParentType, ContextType>
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  birthDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  deliveryAddresses?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  representativeDeliveryAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  coupons?: Resolver<Maybe<Array<ResolversTypes['Coupon']>>, ParentType, ContextType>
  favoriteMenus?: Resolver<Maybe<Array<ResolversTypes['Menu']>>, ParentType, ContextType>
  favoriteStores?: Resolver<Maybe<Array<ResolversTypes['Store']>>, ParentType, ContextType>
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>
  preferences?: Resolver<Maybe<Array<ResolversTypes['NonEmptyString']>>, ParentType, ContextType>
  regularStores?: Resolver<Maybe<Array<ResolversTypes['Store']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Coupon?: CouponResolvers<ContextType>
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  JWT?: GraphQLScalarType
  Menu?: MenuResolvers<ContextType>
  MenuOption?: MenuOptionResolvers<ContextType>
  MenuOptionCategory?: MenuOptionCategoryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  NonEmptyString?: GraphQLScalarType
  Order?: OrderResolvers<ContextType>
  Payment?: PaymentResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Review?: ReviewResolvers<ContextType>
  Store?: StoreResolvers<ContextType>
  URL?: GraphQLScalarType
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
