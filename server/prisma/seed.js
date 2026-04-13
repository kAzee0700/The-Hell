import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.viewHistory.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('admin1234', 10);
  await prisma.user.create({
    data: {
      email: 'admin@hell.local',
      password: adminPassword,
      name: '관리자',
      role: 'admin',
      termsAgree: true,
      policyAgree: true
    }
  });
  console.log('✅ Admin: admin@hell.local / admin1234');

  const userPassword = await bcrypt.hash('user1234', 10);
  await prisma.user.create({
    data: {
      email: 'user@hell.local',
      password: userPassword,
      name: '홍길동',
      role: 'individual',
      phone: '01012345678',
      postcode: '12345',
      address: '서울특별시 강남구',
      detailAddress: '테헤란로 123',
      termsAgree: true,
      policyAgree: true,
      marketingAgree: true
    }
  });
  console.log('✅ User: user@hell.local / user1234');

  const companyPassword = await bcrypt.hash('company1234', 10);
  const company = await prisma.user.create({
    data: {
      email: 'company@hell.local',
      password: companyPassword,
      name: '김대표',
      role: 'company',
      companyName: '(주) 지옥테크',
      businessNumber: '123-45-67890',
      department: '인사팀',
      position: '채용 담당자',
      phone: '01098765432',
      postcode: '54321',
      address: '서울특별시 강남구',
      detailAddress: '삼성로 456',
      termsAgree: true,
      policyAgree: true,
      marketingAgree: false,
      verificationStatus: 'verified'
    }
  });
  console.log('✅ Company: company@hell.local / company1234 (verified)');

  console.log('\n🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
