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
    'asdf@google.com',
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
    ARRAY ['#무난', '#인테리어', '#갬성']
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
    '조이마카롱',
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
    '앳더블랑',
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
    '페이브베이커리',
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
    '샌드위드',
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
    '메이카페',
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
    '토크넌센스',
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
    '흑석커피',
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
    '오후홍콩',
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
    '브런치로뎀',
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
    '베러댄와플',
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
    '띵똥와플',
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
    '그랩커피',
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
    '베브릿지',
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
    '다카페',
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
    '스마일꽈배기',
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
    '리앤홍',
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
    '카페그리지',
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
    '카페출국',
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
    '언니네식빵',
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
    '뚜스뚜스',
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

SELECT create_store (
    '어글리베이커리',
    '마포구 망원동',
    1,
    '',
    '',
    15,
    20,
    ARRAY ['https://gramho.com/hosted-by-instagram/url=https%3A%7C%7C%7C%7Cinstagram.fiev22-2.fna.fbcdn.net%7C%7Cv%7C%7Ct51.2885-19%7C%7Cs150x150%7C%7C80597625_2342545629368935_267113400641781760_n.jpg%3Ftp%3D1%26_nc_ht%3Dinstagram.fiev22-2.fna.fbcdn.net%26_nc_ohc%3D3viFoOWESBUAX9r6XJD%26edm%3DABfd0MgBAAAA%26ccb%3D7-4%26oh%3D39d161b5342ecaa518df7b620f0e49b3%26oe%3D60BE270A%26_nc_sid%3D7bff83'],
    ARRAY ['#망원동빵대장', '#망원동','#맘모스빵', '#스콘맛집']
  );

SELECT toggle_user_favorite_store(1, 9);

SELECT toggle_user_favorite_store(1, 2);

SELECT toggle_user_favorite_store(1, 3);

SELECT toggle_user_favorite_store(1, 4);

SELECT create_menu (
    '말차달고나스콘',
    3500,
    '스콘',
    1,
    ARRAY ['https://i.pinimg.com/564x/e5/41/d1/e541d1856ab5061172c250225d247ae5.jpg'],
    ARRAY ['#녹차', '#말차','#달고나','#비건', '#비건스콘','#다이어트']
  );

SELECT create_menu (
    '말차초코맘모스빵',
    4000,
    '스콘',
    30,
    ARRAY ['https://t1.daumcdn.net/cfile/tistory/9956113D5E3F830718'],
    ARRAY ['#녹차', '#말차','#초코','#맘모스빵']
  );

SELECT create_menu (
    '딸기초코마카롱',
    2500,
    '스콘',
    1,
    ARRAY ['https://img.insight.co.kr/static/2019/12/12/700/6490208yeeh514wh4t0l.jpg'],
    ARRAY ['#딸기', '#초코','#마카롱','#봄', '#달콤']
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
    ARRAY ['data:image/jpeg;base64,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'],
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

SELECT create_menu (
    '춘천 감자빵',
    3000,
    '빵',
    4,
    ARRAY ['https://shop3.daumcdn.net/thumb/R500x500/?fname=http%3A%2F%2Fshop3.daumcdn.net%2Fshophow%2Fp%2FZ12777260102.jpg%3Fut%3D20210329180551'],
    ARRAY ['#춘천', '#감자빵', '#고소']
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