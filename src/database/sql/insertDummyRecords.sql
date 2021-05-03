INSERT INTO "user" (
    email,
    password_hash_hash,
    name,
    phone_number,
    gender,
    birth_date,
    image_urls,
    delivery_addresses
  )
VALUES (
    'asdf@asdf.com',
    'asdfasdf',
    'name',
    'phone_number',
    'gender',
    '2021-01-01',
    array ['image_url'],
    array ['delivery_address']
  );

SELECT create_store (
    '스노우플라워',
    '동작구 흑석동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://mp-seoul-image-production-s3.mangoplate.com/879146_1528178423311716.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80'],
    ARRAY ['#얼죽이', '#팥빙수맛집']
  );

SELECT create_store (
    '프랑세즈',
    '동작구 흑석동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://mblogthumb-phinf.pstatic.net/MjAyMDA4MDlfNCAg/MDAxNTk2OTQ5Njc3OTc3.3zFvcpUO_CcP09zL4yRd6GRP2V0sgyFjkMNgVHlwinsg.yaEiCjPejdDhbjze1TG-WREiO6zXugTQj4F4YCuWBREg.JPEG.jwani84/1596949677506.jpg?type=w800'],
    ARRAY ['#빵돌이빵순이', '#달달한케이크']
  );

SELECT create_store (
    '스타벅스',
    '동작구 흑석동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png'],
    ARRAY ['#무난', '#인테리어']
  );

SELECT create_store (
    '디저트정',
    '동작구 흑석동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjlfMjQy/MDAxNTk1OTg1ODAwNzUx.wtdCVsi3ovwvKe2Hsd6Spdillfz1ft_4vZ_gtG3lPtcg.jGfhSclKGmI0thYN3hOlE4NYDBUcKCObL-diY0EKBccg.JPEG.hyeminsecond/IMG_8474.JPG?type=w800'],
    ARRAY ['#갓성비', '#마카마카']
  );

SELECT create_store (
    '콜렉티보',
    '영등포구 영등포동 타임스퀘어',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDdfMjU3/MDAxNjE1MDQ0OTQwMDkz.mF-dURiMV6Pdo11mPU5v_D8C4NSHjnOM4VXH5dOe_X8g.6Atvg8SW7qUMr1Sqcadr0yPAzVQZ73xcjhylNSE_OsQg.JPEG.artforlove/SE-e19bde1b-e94c-49a3-af7a-e063cf4f157c.jpg?type=w800'],
    ARRAY ['#다양', '#개성']
  );

SELECT create_store (
    '마얘',
    '영등포구 여의동 더현대',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://post-phinf.pstatic.net/MjAyMTAzMDlfNDMg/MDAxNjE1MjcwOTEzMDkx.iKy7VXccfQrXFJ9xcLZfYFD0uRVmKGXBNG2mnVZIoi8g.bncAOnbR4jmo9vf2kYJUuyDE5yobf0IBJK06HJ38g8gg.JPEG/seoultravel_1565899068128458059680254575519669482261410n.jpg?type=w1200'],
    ARRAY ['#디저트천국', '#신규오픈']
  );

SELECT create_store (
    '나미네양과점',
    '영등포구 문래동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://blogfiles.pstatic.net/MjAyMTA0MTBfMjMx/MDAxNjE4MDI4Mzk3OTI3.OLfRvBjTY62aZV3Lw2zndsPuEIAqXT8HyB4P5WZiT0Qg.g5o0ca3OIX5oYKOQ4QNZMeaIxu4yXB0SrdOofgMEX24g.JPEG.imina74/2021-03-31-13-08-06-268.jpg?type=w2'],
    ARRAY ['#마카롱맛집', '#문래동디저트맛집', '#뚱카롱', '#존맛', '#달달']
  );

SELECT create_store (
    '브릿지엣지',
    '동작구 상도동',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://postfiles.pstatic.net/MjAyMDAyMjNfMjA2/MDAxNTgyNDUxNTMwMTcz.I9I8KLwnx2moUXzkN5PFmS4FIx-psMhuP6Agv9ZC2hUg.B5CsQEIxY2aUAp5EZoQyOOeQIMtxivQxtGJaaw4Km4Qg.JPEG.lisagracie7762/SE-c61185a0-07e4-4ddb-bdb9-337af4449f7d.jpg?type=w966'],
    ARRAY ['#스콘맛집', '#브릿지엣지', '#공정무역커피', '#수제스콘', '#스콘']
  );

SELECT create_store (
    '플디',
    '압구정동 압구정로',
    1,
    '',
    '',
    10,
    19,
    ARRAY ['https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMTBfMTIz%2FMDAxNjEyOTMwNDQ2Mjk3.z59nOVeZvFpgma9c0S5zXRwilAvu5FGL8zlycCxFbhcg.bEbuGyY99Vgdf-_lW2UKCqJ8MebT1ATN1vKKVoUzbpog.JPEG.njkmj51%2FIMG_5104.jpg&type=sc960_832'],
    ARRAY ['#디저트맛집', '#plate_d', '#딸기케이크', '#압구정', '#플디']
  );

SELECT create_menu (
    '팥빙수',
    5900,
    '아이스크림',
    1,
    ARRAY ['https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg'],
    ARRAY ['#달달', '#비건', '#다이어트']
  );

SELECT create_menu (
    '메리딸기',
    6500,
    '음료',
    2,
    ARRAY ['https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg'],
    ARRAY ['#달달', '#딸기', '#라떼']
  );

SELECT create_menu (
    '나이트로 콜드 브루 톨',
    5800,
    '음료',
    3,
    ARRAY ['https://globalassets.starbucks.com/assets/55525cd1303a4b18958b05f0705b4cbb.jpg?impolicy=1by1_wide_1242'],
    ARRAY ['#거품', '#콜드브루', '#부드러운']
  );

SELECT create_menu (
    '제주 한라봉 뺑오쇼콜라',
    5800,
    '빵',
    3,
    ARRAY ['https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTFfMTQ4/MDAxNTc2MDMxODQ5ODUw.9Dy4J1joxSrAXoqIp-z2HIOqkdyG3oEPP5bRE3E0d7Mg.PAqtcuA6XKqYALGCX-LjsH8RDuxZNXfiYkiGJ2oebcsg.JPEG.zzzzzangg/SE-092ff13a-3dfa-4f66-ae6f-4fbe2f0663b2.jpg?type=w800'],
    ARRAY ['#한라봉필', '#초코스틱', '#패스츄리']
  );

SELECT create_menu (
    '슈크림 라떼',
    3000,
    '커피',
    3,
    ARRAY ['https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg'],
    ARRAY ['#슈크림', '#달달', '#봄음료', '#달콤']
  );

SELECT create_menu (
    '춘천 감자빵',
    3000,
    '빵',
    4,
    ARRAY ['http://belocal.kr/Files/28/News/202006/2101_20200610163604331.JPG'],
    ARRAY ['#춘천', '#감자빵', '#고소']
  );

SELECT create_menu (
    '바질 크림치즈 쌀스콘',
    3500,
    '빵',
    4,
    ARRAY ['https://postfiles.pstatic.net/MjAyMTAzMDZfMjA3/MDAxNjE1MDMzMDcxMjU4.jsLW4PCR04SnvzxPS55P1J9us3XcQOpJEaM-cQKuPIUg.gdOW0njAObQ2Aq9nu73IytCKLVWQX6w-wIDgOxPywGMg.JPEG.luckygirl1004/SE-dff220a3-229b-45e3-a5c5-0d2d47ef2075.jpg?type=w966'],
    ARRAY ['#바질', '#크림치즈', '#쌀', '#스콘', '#건강']
  );

SELECT create_menu (
    '뽀또 스콘',
    4500,
    '빵',
    5,
    ARRAY ['https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDZfMjQ0/MDAxNTgzNDk0NTQ5MjA4.sDVpAX6sdb0oo_CIv8Q02F5g0rLxP2ZdCOsoTsXA2Isg.1JBtd0JHisESQdUhqzpPXdymuzUf45JpMbaDr66MBlQg.JPEG.jenny0228/IMG_0040.JPG?type=w800'],
    ARRAY ['#뽀또', '#개성', '#치즈']
  );

SELECT create_menu (
    '밀푀유 바니',
    9500,
    '빵',
    6,
    ARRAY ['https://post-phinf.pstatic.net/MjAxOTA4MjJfMjc3/MDAxNTY2NDQwMjY4MDA1.iuAYTuWj97NoOtuI5ha2cPrtO0V2zCLv5U8VPe8GNuwg.LMKtLv4P4rU8d3Ow-NBkFZJDNNJMDuES14lsvohKLU4g.JPEG/%EB%B0%80%ED%91%80%EC%9C%A0%EB%B0%94%EB%8B%88.jpg?type=w1200'],
    ARRAY ['#마얘', '#정통프렌치디저트', '#바닐라크림', '#패스츄리', '#고소', '#달달']
  );

SELECT create_post (
    '오늘은 다음 주 준비 중인 온라인 행사를 위한 외부 촬영으로, 흑석동 오프라인 스토어는 운영하지 않습니다. 멋진 공간에서 촬영 중입니다. #결과물이 #두근두근 💛🤓💛',
    2,
    ARRAY ['https://post-phinf.pstatic.net/MjAxNzAzMDJfMzIg/MDAxNDg4NDQwNzg5NjQz.PjCwCa-LsK0JhSj-YWuoMMQlhxNfOg5_fgzyCYHCPysg.aTQVrQ5QFduqEfsKc8BCh0CblDOf_vfezzM-dp7Qo3Ig.JPEG/image_4562399321488440004463.jpg?type=w1200'],
    ARRAY ['#결과물이', '#두근두근', '#일정']
  );

SELECT create_post (
    '재판매 요청이 많아서 딸기 프레지에 소량 준비해뒀어요!\n금,토,일 3 일간 프레지에 홀케이크 미니사이즈로 판매합니다😁\n예쁜 하트초 같이 넣어드릴게요❤️\n\n오늘의 라인업 입니다!\n\n딸기요거생크림케이크, 딸기미니우유케이크, 초코크런치케이크, 다쿠아즈(앙버터, 초코, 그린티, 핑크소금), 바닐라마카롱, 솔티카라멜마카롱, 스모어쿠키, 클래식월넛, 피넛버터, 말차초코볼, 흑임자마카롱, 크림브륄레마카롱',
    4,
    ARRAY ['https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200726_219%2F1595757353365bKuBp_JPEG%2FiT6243NPDzm9e0aPxell_Nsj.jpg&type=sc960_832'],
    ARRAY ['#라인업', '#디저트정']
  );

SELECT create_post (
    '오늘의 마카롱&디저트 라인업이에요!💛\n파베생초코, 레드벨벳, 크림브륄레, 투게더바닐라, 피넛버터크런치,오레오, 찰떡인절미, 바나나누텔라, 블루베리크림치즈, 치즈케이크, 황치즈샌드, 뽀또황치즈, 쏠티드카라멜, 생딸기요거트\n\n나미네양과점은 전 제품에 프랑스산 최고급 천연발효 버터만을 사용하고 있어요 😊',
    7,
    ARRAY ['https://postfiles.pstatic.net/MjAyMTAzMDZfMjk0/MDAxNjE1MDMzMDQyNzA4.jPJOE8sRiVbwwjWyPOjXp50sHg2MX77adLnTU4IsqMcg.UK5yXB6p44sIB00sUzsrMJ7-oEnitai16uMwWwjvpW4g.JPEG.luckygirl1004/SE-86ed3f06-c723-449b-966b-4985cd3a10da.jpg?type=w966'],
    ARRAY ['#라인업', '#나미네양과점']
  );

SELECT create_post (
    '오늘의 스콘이 모두 소진되었습니당!😅\n고메플레인, 옥수수, 얼그레이, 체다치즈파슬리, 오레오, 로투스, 녹차\n\n넘나 빠른 소진,,🤣\n여러분들의 성원에 힘입어 스콘이 모두 소진되었습니다..\n이 공지 꼭 보시고 헛된 발걸음 하시지 않길 바라요 🙏🏻\n내일 더 맛있는 스콘으로 찾아뵐게요! 오늘도 좋은 하루 보내세요 :)',
    8,
    ARRAY ['https://postfiles.pstatic.net/MjAyMDAyMjNfMSAg/MDAxNTgyNDUxNTAyNjg0.YRIRqMCLjopSGmTimCWEBs56u_G8MzIpQxFbXNm18dkg.gkD4Gkt1frAPAwWpKp9AOkaYkxppHYDaxri5q2UTN9kg.JPEG.lisagracie7762/SE-250bf5e3-3e63-45c1-8cdd-9b90ed3a5b85.jpg?type=w966'],
    ARRAY ['#공지', '#품절', '#브릿지엣지']
  );

SELECT create_post (
    '4월 일정 공지합니다!\n💛 = 베이킹 클래스\n🖤 = 카페 정상 운영 기간\n일정 꼭 확인하셔서 헛걸음 없으시길 바라요🙏🏻\n오늘도 좋은 하루 보내세요 :)',
    9,
    ARRAY ['https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/83008531_824166611387598_471126081900830500_n.jpg'],
    ARRAY ['#공지', '#일정', '#플디', '#plate_d']
  );