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
  return toFormTone(persona.situation[0] ?? '');
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
