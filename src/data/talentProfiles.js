import userPerspectivesRaw from '../../docs/planning/user-perspectives.md?raw';

const STORAGE_KEY = 'hell.customTalentProfiles';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u3131-\uD79D]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function createIntro(persona) {
  const introMap = {
    김도윤: '연차보다 제가 어떤 방식으로 일하는지 같이 봐주는 곳을 찾고 있습니다.',
    박정민: '늦게 시작한 편이라 지금 준비한 내용과 태도를 먼저 봐주는 곳이면 좋겠습니다.',
    이서윤: '계속 지원하기보다 제 소개를 먼저 읽고 연락 주는 곳을 기다리고 있습니다.',
    최현우: '이전 경력보다 지금 준비하고 있는 프론트엔드 쪽 가능성을 보고 싶습니다.',
    한지우: '경력이 많지 않아도 프로젝트랑 글을 보고 판단해주는 곳이면 좋겠습니다.',
    오세훈: '재직 중이라 크게 드러내지 않고 조용히 다음 기회를 보고 있습니다.',
    윤가은: '가능하면 오래 기다리지 않고 바로 검토해볼 수 있는 제안을 받고 싶습니다.',
    정혜진: '공백보다 지금 다시 일할 준비가 되어 있다는 점을 먼저 보여드리고 싶습니다.',
    강민재: '지역이랑 근무 방식이 맞는 자리면 바로 검토해보고 싶습니다.',
    송하린: '원격이나 하이브리드처럼 근무 방식이 맞는 곳 위주로 보고 있습니다.',
    문지환: '짧은 경력 요약보다 제가 어떤 글을 써왔는지 같이 봐주셨으면 합니다.',
    배수아: '기술보다 일하는 태도랑 배우는 속도를 먼저 봐주는 곳이면 좋겠습니다.',
    임도현: '한 방향으로 완전히 정한 건 아니지만, 기획이나 운영 쪽으로 계속 보고 있습니다.',
    유나경: '처음부터 완벽한 소개보다는 지금 할 수 있는 일과 배우고 싶은 방향을 적어봤습니다.',
    조아린: '무차별 제안보다는 제 프로필을 읽고 보낸 연락인지 알 수 있으면 좋겠습니다.',
    신준호: '전공보다 지금까지 준비한 내용과 전환 의지를 봐주셨으면 합니다.',
    류태성: '작은 팀에서 바로 손을 보태며 일할 수 있는 자리를 찾고 있습니다.',
    백서진: '한 역할만 하기보다 여러 일을 같이 맡을 수 있는 팀을 선호합니다.',
    노지훈: '크게 드러내는 방식보다 정리한 글을 보고 먼저 연락 주는 쪽이 편합니다.',
    장하은: '운영, 프로젝트, 고객 대응 경험을 같이 활용할 수 있는 자리를 찾고 있습니다.',
    서민규: '직책보다 실제로 어떤 문제를 풀어왔는지 같이 봐주셨으면 합니다.',
    안유진: '공개 범위가 분명한 상태에서만 조심스럽게 다음 자리를 보고 있습니다.',
    고성민: '업계가 좁아서 노출은 조심스럽지만, 맞는 자리라면 이야기를 나눠보고 싶습니다.',
    진소영: '경력보다 프로젝트 경험과 배우는 속도를 먼저 보여드리고 싶습니다.',
    남기현: '제안만 오고 멈추기보다 진행 상태를 알 수 있는 곳이면 좋겠습니다.',
    허지민: '회사 정보와 공개 범위가 분명한 제안만 천천히 확인하고 싶습니다.',
    권영수: '연차 숫자보다 현장에서 해온 일과 적응력을 같이 봐주셨으면 합니다.',
    전은서: '공백이 있어도 지금 가능한 근무 조건과 의지를 먼저 보여드리고 싶습니다.',
    마태오: '같은 일이라도 다른 업계에서 다시 시작해보고 싶어서 등록했습니다.',
    채다은: '정규 경력은 많지 않지만 프로젝트로 준비한 내용을 봐주셨으면 합니다.',
    손우진: '여러 군데 지원하기보다 제 프로필을 읽고 먼저 연락 주는 곳을 기다리고 있습니다.',
    나예린: '많은 제안보다 정말 맞는 몇 곳과만 이야기해보고 싶습니다.',
    홍지후: '아직 본격적으로 시작 전이라 저와 맞는 방향을 천천히 보고 있습니다.',
    김하영: '지원 전에 공개 범위와 운영 방식이 분명한 곳인지 먼저 보게 됩니다.',
    민서후: '길게 쓰기보다 지금 바로 일할 수 있다는 점부터 먼저 적어두고 싶었습니다.',
    양채린: '한 번에 끝내기보다 계속 다듬으면서 더 나은 프로필로 만들고 있습니다.',
    도윤아: '바로 연락받기보다 제안 내용을 먼저 보고 천천히 판단하고 싶습니다.',
    주현성: '여러 제안을 비교해보면서 저와 맞는 조건을 고르고 싶습니다.',
    배지수: '회사 규모보다 누가 어떤 이유로 제안했는지가 더 중요합니다.',
    심재원: '기술 이름보다 실제로 어떤 문제를 해결했는지 봐주는 곳을 찾고 있습니다.',
    조미래: '제안을 받기 전에 제 소개글이 충분히 읽혔으면 좋겠습니다.',
    탁승민: '프로젝트를 길게 설명해야 할 때도 맥락까지 봐주는 팀이면 좋겠습니다.',
    한보람: '재직 중이라 공개는 조심스럽지만, 다음 기회는 계속 보고 있습니다.',
    이태경: '폭넓게 해온 실무를 정리해서 올렸고, 바로 적응할 수 있는 자리를 찾고 있습니다.',
    서유나: '직무를 조금 더 분명하게 옮기고 싶어서 관련 자리 위주로 보고 있습니다.',
    차민석: '업계는 익숙해서 같은 분야 안에서 역할을 조금 바꿔보고 싶습니다.',
    오지안: '고객 대응과 운영 경험을 같이 살릴 수 있는 자리를 찾고 있습니다.',
    강도윤: '서두르기보다 저랑 맞는 방향인지 비교해보면서 보고 있습니다.',
    문서아: '기록하고 정리하는 일에 강점이 있어서 운영 쪽 자리 위주로 보고 있습니다.',
    정유찬: '실무 경험은 적지만 만든 결과물과 작업 감각을 먼저 보여드리고 싶습니다.',
  };

  return introMap[persona.name] ?? toFormTone(persona.situation[0] ?? '');
}

function createCardIntro(persona) {
  const introMap = {
    김도윤: '연차보다 제가 어떤 방식으로 일하는지 같이 봐주는 곳을 찾고 있습니다.',
    박정민: '늦게 시작한 만큼 지금 준비한 내용과 일하는 태도를 먼저 보여드리고 싶습니다.',
    이서윤: '계속 지원하기보다 제 소개를 읽고 먼저 연락 주는 곳을 기다리고 있습니다.',
    최현우: '이전 경력보다 지금 준비하고 있는 프론트엔드 쪽 가능성을 보고 싶습니다.',
    한지우: '경력이 많지 않아도 프로젝트랑 글을 보고 판단해주는 곳이면 좋겠습니다.',
    오세훈: '재직 중이라 크게 드러내진 않고 조용히 다음 기회를 보고 있습니다.',
  };

  return introMap[persona.name] ?? createIntro(persona);
}

function toFormTone(value) {
  return value
    .replaceAll('`', '')
    .replace(/느낀다\.$/, '느끼고 있습니다.')
    .replace(/원한다\.$/, '원합니다.')
    .replace(/바란다\.$/, '바랍니다.')
    .replace(/싶다\.$/, '싶습니다.')
    .replace(/어렵다\.$/, '어렵습니다.')
    .replace(/크다\.$/, '큽니다.')
    .replace(/적다\.$/, '적습니다.')
    .replace(/중요하다\.$/, '중요합니다.')
    .replace(/필요하다\.$/, '필요합니다.')
    .replace(/떨어진다\.$/, '떨어집니다.')
    .replace(/위축된다\.$/, '위축됩니다.')
    .replace(/답답하다\.$/, '답답합니다.')
    .replace(/망설인다\.$/, '망설이게 됩니다.')
    .replace(/포기할 수 있다\.$/, '포기하게 될 수도 있습니다.')
    .replace(/걱정한다\.$/, '걱정됩니다.')
    .replace(/곤란하다\.$/, '곤란합니다.')
    .replace(/불안하다\.$/, '불안합니다.');
}

function createProfileTitle(persona, desiredRoles) {
  const primaryRole = desiredRoles[0] ?? persona.roles;
  const secondaryRole = desiredRoles[1] ? `, ${desiredRoles[1]}` : '';

  if (persona.careerType.includes('전환')) {
    return `${primaryRole}${secondaryRole} 쪽으로 보고 있습니다`;
  }

  if (persona.careerType.includes('복귀')) {
    return `${primaryRole}${secondaryRole} 쪽으로 복귀 희망합니다`;
  }

  if (persona.careerType === '무경력' || persona.careerType === '신입') {
    return `${primaryRole}${secondaryRole} 신입 포지션 찾고 있습니다`;
  }

  return `${primaryRole}${secondaryRole} 포지션 찾고 있습니다`;
}

function createFormList(items) {
  return items.map((item) => toFormTone(item));
}

function createVisibilityLabel(persona) {
  if (persona.workStyle.includes('원격')) {
    return '조건 맞는 기업에만 공개';
  }

  if (persona.concerns.some((item) => item.includes('안전') || item.includes('공개'))) {
    return '제안 받은 뒤에만 일부 공개';
  }

  if (persona.careerType.includes('전환')) {
    return '조건 맞는 기업에만 공개';
  }

  return '조건 맞는 기업에만 공개';
}

function createStatus(persona) {
  if (persona.totalCareer === '0년' || persona.totalCareer === '1년 미만') {
    return '신규 등록';
  }

  if (persona.careerType.includes('전환')) {
    return '전환 검토';
  }

  if (persona.workStyle.includes('원격')) {
    return '원격 검토';
  }

  return '열람 가능';
}

function buildPersonaProfiles(markdown) {
  const sections = markdown.split(/^###\s+1\.\d+\s+/m).slice(1);

  return sections.map((section, index) => {
    const lines = section.split('\n').map((line) => line.trim());
    const title = lines[0];
    const persona = {
      title,
      name: '',
      age: '',
      gender: '',
      roles: '',
      careerType: '',
      totalCareer: '',
      highlights: '',
      employment: '',
      workStyle: '',
      situation: [],
      expectations: [],
      concerns: [],
    };
    let mode = '';

    lines.slice(1).forEach((line) => {
      if (line === '- 기본 정보') {
        mode = 'basic';
        return;
      }

      if (line === '- 이력서 관점 정보') {
        mode = 'resume';
        return;
      }

      if (line === '- 상황') {
        mode = 'situation';
        return;
      }

      if (line === '- 이 사용자가 사이트에서 기대하는 것') {
        mode = 'expectations';
        return;
      }

      if (line === '- 이 사용자가 불편해할 수 있는 점') {
        mode = 'concerns';
        return;
      }

      if (line.startsWith('- 이름: ')) {
        persona.name = line.replace('- 이름: ', '');
        return;
      }

      if (line.startsWith('- 나이: ')) {
        persona.age = line.replace('- 나이: ', '');
        return;
      }

      if (line.startsWith('- 성별: ')) {
        persona.gender = line.replace('- 성별: ', '');
        return;
      }

      if (line.startsWith('- 선호 종사 직종: ')) {
        persona.roles = line.replace('- 선호 종사 직종: ', '');
        return;
      }

      if (line.startsWith('- 경력 구분: ')) {
        persona.careerType = line.replace('- 경력 구분: ', '');
        return;
      }

      if (line.startsWith('- 총 경력: ')) {
        persona.totalCareer = line.replace('- 총 경력: ', '');
        return;
      }

      if (line.startsWith('- 핵심 경력/경험: ')) {
        persona.highlights = line.replace('- 핵심 경력/경험: ', '');
        return;
      }

      if (line.startsWith('- 희망 고용 형태: ')) {
        persona.employment = line.replace('- 희망 고용 형태: ', '');
        return;
      }

      if (line.startsWith('- 희망 근무 형태: ')) {
        persona.workStyle = line.replace('- 희망 근무 형태: ', '');
        return;
      }

      if (!line.startsWith('- ')) {
        return;
      }

      const item = line.replace('- ', '');

      if (mode === 'situation') {
        persona.situation.push(item);
      }

      if (mode === 'expectations') {
        persona.expectations.push(item);
      }

      if (mode === 'concerns') {
        persona.concerns.push(item);
      }
    });

    const desiredRoles = parseList(persona.roles);

    return {
      id: `persona-${String(index + 1).padStart(2, '0')}-${slugify(persona.name)}`,
      source: 'persona',
      title: createProfileTitle(persona, desiredRoles),
      name: persona.name,
      age: persona.age,
      gender: persona.gender,
      desiredRoles,
      desiredRoleLabel: desiredRoles.slice(0, 2).join(' · '),
      careerType: persona.careerType,
      totalCareer: persona.totalCareer,
      highlights: parseList(persona.highlights),
      highlightLabel: parseList(persona.highlights).slice(0, 2).join(' · '),
      employment: persona.employment,
      workStyle: persona.workStyle,
      conditionLabel: `${persona.employment} · ${persona.workStyle}`,
      intro: createIntro(persona),
      cardIntro: createCardIntro(persona),
      situation: createFormList(persona.situation),
      expectations: createFormList(persona.expectations),
      concerns: createFormList(persona.concerns),
      visibility: createVisibilityLabel(persona),
      status: createStatus(persona),
      updatedAt: `persona-${index + 1}`,
    };
  });
}

const baseTalentProfiles = buildPersonaProfiles(userPerspectivesRaw);

export function getBaseTalentProfiles() {
  return baseTalentProfiles;
}

export function getStoredTalentProfiles() {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllTalentProfiles() {
  return [...getStoredTalentProfiles(), ...getBaseTalentProfiles()];
}

export function getTalentProfileById(talentId) {
  return getAllTalentProfiles().find((profile) => profile.id === talentId) ?? null;
}

export function createTalentProfile(input) {
  const desiredRoles = parseList(input.desiredRoles);
  const highlights = parseList(input.highlights);
  const expectations = input.expectations
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const concerns = input.concerns
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const situation = input.intro
    .split('. ')
    .map((item) => item.trim())
    .filter(Boolean);
  const profile = {
    id: `custom-${Date.now()}-${slugify(input.name)}`,
    source: 'custom',
    title: input.title.trim() || '직접 등록한 프로필',
    name: input.name.trim(),
    age: input.age.trim(),
    gender: input.gender.trim(),
    desiredRoles,
    desiredRoleLabel: desiredRoles.slice(0, 2).join(' · '),
    careerType: input.careerType.trim(),
    totalCareer: input.totalCareer.trim(),
    highlights,
    highlightLabel: highlights.slice(0, 2).join(' · '),
    employment: input.employment.trim(),
    workStyle: input.workStyle.trim(),
    conditionLabel: `${input.employment.trim()} · ${input.workStyle.trim()}`,
    intro: input.intro.trim(),
    situation,
    expectations,
    concerns,
    visibility: input.visibility.trim(),
    status: '등록 완료',
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    const nextProfiles = [profile, ...getStoredTalentProfiles()];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfiles));
  }

  return profile;
}
