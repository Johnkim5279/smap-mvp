(() => {
  const data = [
    {id:'equipment',name:'반도체 장비',icon:'⚙',tag:'장비·설비·유지보수',intro:'반도체 장비의 구조와 동작을 이해하고, 설비 운영과 유지보수 역량을 배우는 분야입니다.',courses:['반도체 장비 기초','전기·전자 기초','설비 제어'],practice:['장비 구조 관찰','센서·제어 실습','설비 점검 실습'],equipment:['진공 실습 장치','제어 실습 장치','계측 장비'],jobs:['장비 유지보수','설비 기술','필드 서비스']},
    {id:'process',name:'반도체 공정',icon:'◉',tag:'공정·제조·품질',intro:'반도체 제조 흐름을 이해하고, 공정 조건과 결과를 관찰하며 제조·품질 역량을 배우는 분야입니다.',courses:['반도체 공정기술','공정 실습','품질관리 기초'],practice:['공정 흐름 이해','박막·패턴 관찰','공정 결과 분석'],equipment:['공정 실습 장비','현미경','두께 측정 장비'],jobs:['공정 기술','제조 운영','품질관리']},
    {id:'materials',name:'반도체 소재',icon:'◇',tag:'소재·측정·분석',intro:'반도체 소재의 특성과 분석 방법을 이해하고, 측정 데이터를 해석하는 역량을 배우는 분야입니다.',courses:['반도체 소재 기초','재료 분석','측정 데이터 해석'],practice:['소재 특성 관찰','시료 분석','측정 결과 비교'],equipment:['소재 분석 장비','현미경','측정 장비'],jobs:['소재 분석','품질 시험','소재 생산기술']},
    {id:'electronics',name:'반도체 전자',icon:'▦',tag:'회로·설계·시스템',intro:'전자회로와 반도체 소자의 원리를 이해하고 회로 설계·측정·검증 역량을 배우는 분야입니다.',courses:['전자회로','디지털 논리','회로 설계'],practice:['회로 구성','신호 측정','회로 시뮬레이션'],equipment:['오실로스코프','회로 실습 보드','설계 소프트웨어'],jobs:['회로 설계 지원','전자 시스템 시험','테스트 기술']},
    {id:'software',name:'반도체 소프트웨어',icon:'⌘',tag:'프로그래밍·데이터·자동화',intro:'소프트웨어와 데이터를 활용해 반도체 현장의 정보 탐색, 장비 제어와 업무 자동화를 배우는 분야입니다.',courses:['Python 프로그래밍','데이터베이스','웹 서비스 개발'],practice:['데이터 분석','장비 데이터 연계','팀 프로젝트'],equipment:['개발용 컴퓨터','데이터 실습 환경','제어 실습 키트'],jobs:['소프트웨어 개발','데이터 처리','자동화 시스템 개발']}
  ];
  const labels=['학과 소개','교과목','실습사진','실습장비','교수진','진로·취업'];
  let selected=data[0], active=0;
  const list=document.querySelector('#departments'),detail=document.querySelector('#detail');
  function cards(items,copy){return `<div class="cards">${items.map((name,i)=>`<article class="card"><span class="item-number">0${i+1}</span><h3>${name}</h3><p>${copy}</p>${active===1?`<button class="course-open" data-course="${i}">학습 내용 살펴보기 ↗</button>`:''}</article>`).join('')}</div>`;}
  function renderList(query=''){
    const found=data.filter(d=>(d.name+d.tag).includes(query.trim()));
    list.innerHTML=found.length?found.map(d=>`<button class="department" data-id="${d.id}" aria-pressed="${selected.id===d.id}"><span aria-hidden="true">${d.icon}</span><b>${d.name}</b><small>${d.tag}</small></button>`).join(''):'<p role="status">일치하는 학과가 없습니다. 다른 검색어를 입력해 주세요.</p>';
    list.querySelectorAll('button').forEach(b=>b.onclick=()=>{selected=data.find(d=>d.id===b.dataset.id);active=0;renderList(document.querySelector('#departmentSearch').value);renderDetail();});
  }
  function renderDetail(){
    detail.dataset.view=String(active);
    let body='';
    const scenes=[['반도체 공정 실습','클린룸에서 제조 공정의 흐름을 경험해요.'],['반도체 장비 실습','장비 구조를 살펴보고 운영 원리를 배워요.'],['반도체 설계 · SW 실습','코드와 회로로 반도체 시스템을 구현해요.'],['소재 · 분석 실습','웨이퍼와 박막의 특성을 관찰해요.'],['측정 · 분석 실습','측정 결과를 해석하고 품질을 이해해요.'],['프로젝트 기반 수업','함께 만들고 문제를 해결하는 경험을 쌓아요.']];
    const gallery=`<div class="photo-grid">${scenes.map(([title,copy],i)=>`<button class="photo-card" data-photo="${i}"><div class="photo p${i}" role="img" aria-label="${title} AI 생성 예시 사진"></div><h3>${title}</h3><p>${copy}</p></button>`).join('')}</div>`;
    if(active===0)body=`<div class="subheading"><h3>실습으로 배우는 반도체 기술</h3><button data-go="2">실습 둘러보기 ↗</button></div>${gallery}<div class="subheading"><h3>주요 교과목과 학습 콘텐츠</h3><button data-go="1">전체 보기 →</button></div><div class="course-row">${selected.courses.map((name,i)=>`<button class="course-item" data-go="1"><span class="course-thumb p${i}"></span><span><b>${name}</b><small>이론에서 현장 실습까지</small></span></button>`).join('')}</div><div class="subheading"><h3>캠퍼스 현장 스토리</h3></div><div class="story-row"><div class="story p0"><b>우리의 클린룸 실습 이야기</b></div><div class="story p1"><b>장비와 만나는 첫 번째 수업</b></div><div class="story p5"><b>함께 만드는 팀 프로젝트</b></div></div>`;
    if(active===1)body=cards(selected.courses,'교과목 구성 예시입니다. 실제 개설 학기·학습목표·담당 교수는 확인 후 등록합니다.');
    if(active===2)body=`<p class="note">${selected.intro}</p>${gallery}`;
    if(active===3)body=cards(selected.equipment,'교육용 장비 예시입니다. 해당 캠퍼스의 실제 보유 장비와 위치를 확인한 뒤 반영합니다.');
    if(active===4)body='<article class="card"><h3>교수진 소개 준비 중</h3><p>캠퍼스에서 확인한 교수 성명·전문분야·담당 교과목·승인된 사진을 등록할 예정입니다.</p></article>';
    if(active===5)body=cards(selected.jobs,'관련 직무 예시입니다. 실제 채용 조건과 필요한 역량은 공식 채용 안내로 확인합니다.')+'<p class="note">취업지원 담당 부서와 공식 채용 링크는 캠퍼스 확인 후 연결합니다.</p>';
    detail.innerHTML=`<div class="detail-head"><div><span class="detail-eyebrow">YOUR NEXT CHAPTER</span><h2>${selected.name}</h2><p>${selected.intro}</p></div><span class="badge">${selected.tag}</span></div><nav class="tabs" aria-label="학과 상세 메뉴">${labels.map((l,i)=>`<button data-tab="${i}" aria-pressed="${i===active}">${l}</button>`).join('')}</nav><div aria-live="polite">${body}</div><div class="related"><button id="nextSection">${active===5?'학과 소개 다시 보기':labels[active+1]+' 이어서 보기'} →</button><a href="/">이 배움은 어떤 공정으로 이어질까요? ↗</a></div>`;
    detail.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.tab);renderDetail();});
    detail.querySelector('#nextSection').onclick=()=>{active=(active+1)%labels.length;renderDetail();};
    detail.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.go);renderDetail();});
    detail.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>{
      const i=Number(b.dataset.course),popup=document.createElement('dialog');
      popup.className='course-dialog';
      popup.innerHTML=`<button class="dialog-close" aria-label="상세 닫기">닫기 ×</button><span class="detail-eyebrow">COURSE EXPLORER · 시연 예시</span><h2>${selected.courses[i]}</h2><p>${selected.intro}</p><h3>이런 실습으로 배워요</h3><p>${selected.practice[i]}</p><h3>함께 살펴볼 장비</h3><p>${selected.equipment[i]}</p><h3>연결되는 진로</h3><p>${selected.jobs[i]}</p><small>실제 교과목·담당 교수·개설 학기는 캠퍼스 확인 후 등록합니다.</small>`;
      document.body.append(popup);popup.querySelector('button').onclick=()=>popup.close();popup.addEventListener('close',()=>popup.remove());popup.showModal();
    });
    detail.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>{
      const i=Number(b.dataset.photo), popup=document.createElement('dialog');
      popup.style.cssText='border:0;border-radius:16px;padding:20px;max-width:850px;width:90vw;color:#163458';
      popup.innerHTML=`<button style="float:right;padding:10px 18px;border:0;border-radius:8px" aria-label="사진 닫기">닫기 ×</button><h3>${scenes[i][0]}</h3><div class="photo p${i}" style="height:420px"></div><p>${scenes[i][1]}</p><small>AI 생성 실습 이미지</small>`;
      document.body.append(popup);popup.querySelector('button').onclick=()=>popup.close();popup.addEventListener('close',()=>popup.remove());popup.showModal();
    });
  }
  document.querySelector('#departmentSearch').addEventListener('input',e=>renderList(e.target.value));
  renderList();renderDetail();
  document.querySelectorAll('[data-section]').forEach(a=>a.addEventListener('click',()=>{active=Number(a.dataset.section);renderDetail();}));
})();

