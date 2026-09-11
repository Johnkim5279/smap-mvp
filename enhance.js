setTimeout(async () => {
  const response = await fetch('/api/etching');
  if (!response.ok) return;
  const data = await response.json();
  const create = (item, symbol) => `<button class="relation-item" data-name="${item.name}"><i>${symbol}</i><b>${item.name}</b><small>${item.description}</small></button>`;
  const equipmentRow = document.querySelector('#equipmentRow');
  const companyRow = document.querySelector('#companyRow');
  equipmentRow.innerHTML = data.equipment.map((item, index) => create(item, ['▦', '◉', '⚙'][index])).join('');
  companyRow.innerHTML = data.companies.map((item, index) => create(item, ['LAM', 'TEL', 'S', 'SK'][index])).join('');
  equipmentRow.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => openRelation('equipment', button.dataset.name)));
  companyRow.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => openRelation('companies', button.dataset.name)));
  const processPhotos = {
    '산화': ['https://assets.st-note.com/production/uploads/images/32375054/picture_pc_723ace8b61fc604d88aa5eee38fdfcc3.jpg?fit=bounds&height=2000&quality=85&width=2000', '실리콘 웨이퍼'],
    '포토': ['https://www.bridgetronic.com/cdn/shop/files/1_b8a4fdb3-78cf-4ac7-808a-fa4f7614205e.jpg?v=1743799500', '포토 공정 웨이퍼 스테퍼'],
    '식각': ['https://nffnews.hkust.edu.hk/sites/default/files/2025-11/samco2_600x900_0.jpg', '식각 공정 ICP-RIE 장비'],
    '증착': ['https://www.ll.mit.edu/sites/default/files/styles/masonry_grid_generic/public/facility/image/2022-01/Novellus-Altuspng.jpg?itok=IP7N3u3f', '증착 공정 CVD 장비'],
    '이온주입': ['https://cdn.caeonline.com/images/varian_350d_11087734.jpg', '이온주입 장비'],
    '금속배선': ['https://iap.snu.ac.kr/webdata/equipment/b88z114z447z21bz9baz4e7z2d1z591zfbez467ze3.jpg', '금속배선용 스퍼터링 장비'],
    '패키징': ['https://img.digitimes.com/newsshow/20230302vl201_files/2_b.jpg', '반도체 패키징 라인'],
    '테스트': ['https://www.gj-test.com/uploads/allimg/20241009/3217b8cf082618d1ad1266a1dd6c9bf6.png', '웨이퍼 프로브 테스트 장비']
  };
  document.querySelectorAll('#processRail .process').forEach((button) => {
    const name = button.dataset.process;
    const photo = processPhotos[name];
    if (!photo) return;
    const icon = button.querySelector('.process-icon');
    icon.classList.add('process-photo');
    icon.innerHTML = `<img src="${photo[0]}" alt="${photo[1]}" referrerpolicy="no-referrer">`;
  });
  document.querySelector('#processRail').addEventListener('click', () => setTimeout(() => {
    document.querySelectorAll('#processRail .process').forEach((button) => {
      const photo = processPhotos[button.dataset.process];
      if (!photo) return;
      const icon = button.querySelector('.process-icon');
      icon.classList.add('process-photo');
      icon.innerHTML = `<img src="${photo[0]}" alt="${photo[1]}" referrerpolicy="no-referrer">`;
    });
  }, 0));
  const workspace = document.querySelector('.workspace');
  const navButtons = Array.from(document.querySelectorAll('.sidebar nav button'));
  const processButton = navButtons.find((button) => button.textContent.includes('공정맵'));
  const companyButton = navButtons.find((button) => button.textContent.includes('기업'));
  const equipmentButton = navButtons.find((button) => button.textContent.includes('장비'));
  const setNavigation = (selected) => navButtons.forEach((button) => button.classList.toggle('selected', button === selected));
  const companyInfo = data.companies.map((company, index) => ({
    ...company, icon: ['LAM', 'TEL', 'S', 'SK'][index], process: index < 2 ? '식각 장비' : '반도체 제조', equipment: index < 2 ? '식각 장비 · 플라즈마 식각기' : '반도체 공정 정보'
  }));
  const equipmentInfo = data.equipment.map((equipment, index) => ({
    ...equipment, icon: ['▦', '◉', '⚙'][index], material: index === 0 ? '식각 가스' : index === 1 ? '플라즈마·공정 가스' : 'ESC · Valve · RF Generator'
  }));
  function renderMvp(type) {
    const isCompany = type === 'company';
    const items = isCompany ? companyInfo : equipmentInfo;
    const title = isCompany ? '기업 정보 탐색' : '장비 정보 탐색';
    const description = isCompany ? '기업을 선택하면 관련 공정과 장비 정보를 연결해 확인합니다.' : '장비를 선택하면 연결된 공정·소재·부품 정보를 확인합니다.';
    workspace.innerHTML = `<section class="mvp-page"><header class="mvp-page-head"><div><h1>${title}</h1><p>${description}</p></div><label class="mvp-search"><input placeholder="${isCompany ? '기업명을 검색하세요' : '장비명을 검색하세요'}"><button>검색</button></label></header><section class="mvp-summary"><article><b>${items.length}</b><span>${isCompany ? '연결 기업 예시' : '연결 장비 예시'}</span></article><article><b>식각</b><span>현재 연결 공정</span></article><article><b>${isCompany ? '기업 → 공정' : '장비 → 소재'}</b><span>관계 기반 탐색</span></article></section><section class="mvp-layout"><article class="mvp-catalog"><h2>${isCompany ? '관련 기업 목록' : '식각 공정 관련 장비'}</h2><p>${isCompany ? '카드를 눌러 해당 기업과 식각 공정의 연결을 확인하세요.' : '카드를 눌러 장비와 소재·부품의 연결을 확인하세요.'}</p><div class="mvp-cards">${items.map((item, index) => `<button class="mvp-card ${index === 0 ? 'active' : ''}" data-index="${index}"><i>${item.icon}</i><b>${item.name}</b><small>${item.description}</small></button>`).join('')}</div></article><aside class="mvp-detail" id="mvpDetail"></aside></section><button class="mvp-back" id="mvpBack">← 공정맵으로 돌아가기</button></section>`;
    const detail = document.querySelector('#mvpDetail');
    const renderDetail = (item) => {
      const first = isCompany ? item.name : '식각 공정';
      const second = isCompany ? item.process : item.name;
      const third = isCompany ? item.equipment : item.material;
      detail.innerHTML = `<p class="detail-label">SELECTED ${isCompany ? 'COMPANY' : 'EQUIPMENT'}</p><h2>${item.name}</h2><p>${item.description}</p><div class="relation-flow"><div>${first}</div><i>›</i><div>${second}</div><i>›</i><div>${third}</div></div><div class="detail-company"><div><b>연결 공정</b><span>식각(Etch) 공정</span></div><div><b>${isCompany ? '관련 장비' : '관련 소재·부품'}</b><span>${isCompany ? item.equipment : item.material}</span></div><div><b>탐색 방향</b><span>선택 항목에서 연결된 산업정보로 확장</span></div></div>`;
    };
    renderDetail(items[0]);
    document.querySelectorAll('.mvp-card').forEach((card) => card.addEventListener('click', () => { document.querySelectorAll('.mvp-card').forEach((item) => item.classList.remove('active')); card.classList.add('active'); renderDetail(items[Number(card.dataset.index)]); }));
    document.querySelector('#mvpBack').addEventListener('click', () => location.reload());
    setNavigation(isCompany ? companyButton : equipmentButton);
  }
  companyButton.addEventListener('click', () => renderMvp('company'));
  equipmentButton.addEventListener('click', () => renderMvp('equipment'));
  processButton.addEventListener('click', () => location.reload());
  const industryButton = navButtons.find((button) => button.textContent.includes('산업동향'));
  const locationButton = document.createElement('button');
  locationButton.innerHTML = '⌖ <span>해외거점 진출 가이드</span>';
  industryButton.after(locationButton);
  navButtons.push(locationButton);

  function renderLocationMvp() {
    workspace.innerHTML = `<section class="location-page">
      <header class="location-head">
        <div class="location-title"><p class="location-badge">MVP · 진출 사전 검토</p><h1>해외거점 진출 가이드</h1><p>공정·고객·공급망 정보를 기준으로 해외 생산거점의 진출 가능성을 검토합니다.</p></div>
        <label class="location-search"><input id="locationSearch" placeholder="국가·도시·산업 키워드를 검색하세요" value="말레이시아"><button id="locationSearchButton">분석</button></label>
        <button class="mvp-back" id="locationBack">← 공정맵으로 돌아가기</button>
      </header>
      <section class="location-filter-panel" aria-label="세부 검색">
        <div class="filter-intro"><p>세부 검색</p><b>진출 검토 조건 설정</b></div>
        <label>공정<select id="processFilter"><option value="전체 공정">전체 공정</option><option value="산화">산화</option><option value="포토">포토</option><option value="식각">식각</option><option value="증착">증착</option><option value="이온주입">이온주입</option><option value="금속배선">금속배선</option><option value="패키징">패키징</option><option value="테스트">테스트</option></select></label>
        <label>장비<select id="equipmentFilter"><option value="전체 장비">전체 장비</option><option value="Dry Etcher">Dry Etcher</option><option value="플라즈마 식각기">플라즈마 식각기</option><option value="ICP 식각 시스템">ICP 식각 시스템</option><option value="CVD 장비">CVD 장비</option><option value="Ion Implanter">Ion Implanter</option><option value="Sputtering 장비">Sputtering 장비</option></select></label>
        <button id="locationFilterButton">조건 적용</button>
      </section>
      <section class="location-hero">
        <article class="location-target"><div class="location-target-copy"><p>후보지</p><h2 id="locationCountry">말레이시아</h2><b>반도체 생산거점 진출 사전 검토</b><span>고객 접근성·운영 인프라·공급망·비용·정책을 같은 기준으로 비교합니다.</span><small id="locationScope">세부 조건: 전체 공정 · 전체 장비</small><small id="locationResult">현재 검토 기준: 말레이시아 국가 단위</small></div><div class="malaysia-map" aria-label="말레이시아 후보지 지도"><svg viewBox="0 0 320 170" role="img" aria-label="말레이시아 지도"><path class="map-land" d="M44 36l24-16 34 4 17 20-8 23-26 9-7 26-24 9-20-16 7-23-15-17z"/><path class="map-land" d="M193 49l28-22 43 8 24 28-13 19-33-2-20 24-36-13-4-25z"/><path class="map-river" d="M69 35c10 16 12 36 4 53M237 43c-2 19 1 37 14 50"/><circle class="map-point" data-place="페낭" cx="56" cy="48" r="5"/><circle class="map-point" data-place="쿨림" cx="67" cy="62" r="5"/><circle class="map-point" data-place="조호르" cx="90" cy="99" r="5"/><text x="38" y="34">Penang</text><text x="69" y="77">Kulim</text><text x="92" y="117">Johor</text><text x="211" y="122">Sabah · Sarawak</text></svg><p>후보 지역 예시</p></div></article>
        <article class="location-policy"><p>POLICY CHECK</p><h2>제조업 투자 인센티브 확인</h2><span>MIDA의 제조업 투자 프레임워크와 공식 인센티브 가이드를 확인하는 단계입니다.</span><a href="https://www.mida.gov.my/media-release/new-incentive-framework-nif/" target="_blank" rel="noreferrer">MIDA 공식 정책 안내 보기 ↗</a></article>
      </section>
      <section class="strategy-result" id="strategyResult" aria-live="polite">
        <div class="strategy-result-head"><p>STRATEGY SNAPSHOT <em id="strategyStatus">예시 결과</em></p><h2>선택 조건별 진출 전략 요약</h2><span>공정·장비·국가를 선택하면 우선 검토할 판단 포인트를 정리합니다.</span></div>
        <div class="strategy-result-grid"><article><b>진출 우선순위</b><strong>고객 접근성 확인</strong><span>현지 고객과 납품시장 확보 여부를 먼저 검증합니다.</span></article><article><b>운영 체크</b><strong>인프라·공급망 확인</strong><span>전력·용수와 장비 부품 조달 리드타임을 비교합니다.</span></article><article><b>의사결정</b><strong>투자 타당성 검토</strong><span>투자비·인센티브·국가 리스크를 종합해 판단합니다.</span></article></div>
      </section>
      <section class="location-grid">
        <article class="location-card"><img class="location-card-image" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="반도체 회로 기판"><div class="location-card-body"><i>⌖</i><p>고객·수요</p><h2>주요 고객과 납품시장 접근성</h2><span>현지 고객·잠재 고객의 위치와 납품 거리, 시장 성장성을 먼저 확인합니다.</span><b>수요 확보 가능성</b></div></article>
        <article class="location-card"><img class="location-card-image" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="제조 현장 작업자"><div class="location-card-body"><i>▦</i><p>운영 인프라</p><h2>전력 · 용수 · 물류 · 전문인력</h2><span>반도체 생산에 필요한 안정적인 유틸리티와 물류·인력 확보 여건을 비교합니다.</span><b>가동 안정성</b></div></article>
        <article class="location-card"><img class="location-card-image" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="물류 창고 선반"><div class="location-card-body"><i>◇</i><p>공급망·리스크</p><h2>소재·부품·장비 조달과 대체 가능성</h2><span>현지 협력사, 조달 리드타임, 국가·운송 리스크를 함께 검토합니다.</span><b>공급망 회복력</b></div></article>
        <article class="location-card"><img class="location-card-image" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80" alt="현대적인 사무실과 도시"><div class="location-card-body"><i>↗</i><p>투자·정책</p><h2>투자비 · 운영비 · 세제·인센티브</h2><span>설립·운영 비용과 외국인 투자 제도, 세금·지원금의 실효성을 비교합니다.</span><b id="filterSummary">전체 공정 · 전체 장비 기준</b></div></article>
      </section>
      <section class="location-decision"><div><p>EXPANSION INTELLIGENCE</p><h2>해외거점 진출 판단 흐름</h2><span>고객을 확보할 수 있는지, 안정적으로 운영할 수 있는지, 투자비와 리스크를 감당할 수 있는지 순서대로 검토합니다.</span></div><div class="decision-steps"><b><i>01</i>후보지 설정<small>말레이시아</small></b><b><i>02</i>고객·수요 확인<small>시장·납품 대응</small></b><b><i>03</i>운영·공급망 검토<small>전력·용수·조달</small></b><b><i>04</i>비용·정책 비교<small>투자비·인센티브·리스크</small></b></div></section>
      <p class="location-disclaimer">정책·세제 혜택은 수시로 변경될 수 있으며, 최종 적용 여부는 MIDA 공식 가이드와 전문 자문을 통해 확인해야 합니다.</p>
    </section>`;
    const mapSvg = document.querySelector('.malaysia-map svg');
    if (mapSvg) {
      mapSvg.insertAdjacentHTML('beforeend', '<circle class="map-point" data-place="셀랑고르" cx="74" cy="83" r="5"/><circle class="map-point" data-place="사바" cx="271" cy="71" r="5"/><circle class="map-point" data-place="사라왁" cx="229" cy="71" r="5"/><path class="map-route" d="M56 48L67 62L74 83L90 99"/><text x="78" y="82">Selangor</text><text x="213" y="58">Sarawak</text><text x="272" y="65">Sabah</text>');
      mapSvg.insertAdjacentHTML('afterend', '<div class="map-legend"><span><i class="legend-dot"></i>주요 후보 거점</span><span><i class="legend-line"></i>서부 산업축</span></div>');
    }
    document.querySelector('#locationBack').addEventListener('click', () => window.location.reload());
    const searchInput = document.querySelector('#locationSearch');
    const searchResult = document.querySelector('#locationResult');
    const countryHeading = document.querySelector('#locationCountry');
    const processFilter = document.querySelector('#processFilter');
    const equipmentFilter = document.querySelector('#equipmentFilter');
    const locationScope = document.querySelector('#locationScope');
    const filterSummary = document.querySelector('#filterSummary');
    const strategyResult = document.querySelector('#strategyResult');
    const strategyStatus = document.querySelector('#strategyStatus');
    const filterButton = document.querySelector('#locationFilterButton');
    const runLocationSearch = () => {
      const query = searchInput.value.trim();
      const supported = ['말레이시아', '페낭', '쿨림', '셀랑고르', '조호르', '사바', '사라왁', '반도체', '공급망', '인센티브'];
      document.querySelectorAll('.map-point').forEach((point) => point.classList.remove('selected'));
      const point = [...document.querySelectorAll('.map-point')].find((item) => query.includes(item.dataset.place));
      if (point) point.classList.add('selected');
      countryHeading.textContent = point ? `말레이시아 · ${point.dataset.place}` : '말레이시아';
      const detail = `${processFilter.value} · ${equipmentFilter.value}`;
      locationScope.textContent = `세부 조건: ${detail}`;
      filterSummary.textContent = `${detail} 기준 공급망 탐색`;
      const processName = processFilter.value === '전체 공정' ? '전체 공정' : processFilter.value;
      const equipmentName = equipmentFilter.value === '전체 장비' ? '전체 장비' : equipmentFilter.value;
      const placeName = point ? point.dataset.place : (query || '말레이시아');
      strategyResult.classList.remove('is-updated');
      void strategyResult.offsetWidth;
      strategyResult.classList.add('is-updated');
      strategyStatus.textContent = `분석 완료 · ${detail}`;
      filterButton.textContent = '분석 완료 ✓';
      window.setTimeout(() => { filterButton.textContent = '조건 적용'; }, 1800);
      strategyResult.querySelector('.strategy-result-head span').textContent = `${placeName}의 ${processName} · ${equipmentName} 조건을 기준으로 우선 검토 항목을 정리했습니다.`;
      strategyResult.querySelector('.strategy-result-grid').innerHTML = `<article><b>진출 우선순위</b><strong>${placeName} 고객·수요 검증</strong><span>${processName} 관련 고객과 납품시장 접근성을 먼저 확인합니다.</span></article><article><b>운영 체크</b><strong>${equipmentName} 운영 조건</strong><span>전력·용수, 전문인력, 장비 설치·유지보수 여건을 비교합니다.</span></article><article><b>의사결정</b><strong>투자비·리스크 종합</strong><span>공급망 대체 가능성, 인센티브, 회수 가능성을 함께 검토합니다.</span></article>`;
      searchResult.textContent = query
        ? (supported.some((item) => query.includes(item)) ? `검색 결과: “${query}” · ${detail} 조건을 표시했습니다.` : `“${query}”는 후보지·산업 키워드로 저장되었습니다. ${detail} 조건은 상세 데이터 연동 후 비교할 수 있습니다.`)
        : `${detail} 조건으로 해외거점 진출 검토 항목을 확인하세요.`;
    };
    document.querySelector('#locationSearchButton').addEventListener('click', runLocationSearch);
    document.querySelector('#locationFilterButton').addEventListener('click', runLocationSearch);
    searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') runLocationSearch(); });
    setNavigation(locationButton);
  }
  locationButton.addEventListener('click', renderLocationMvp);
}, 120);
