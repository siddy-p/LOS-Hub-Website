import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

/**
 * Development seed script — populates the DB with representative data.
 * NEVER run this against production directly.
 * Usage: npx tsx prisma/seed.ts
 */

async function main() {
  console.log('🌱 Seeding LOS Hub development database...');

  // ------------------------------------------------------------------
  // Admin / Super Admin
  // ------------------------------------------------------------------
  const adminHash = await bcrypt.hash('Admin@LosHub2025', 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@los-hub.com' },
    update: {},
    create: {
      email: 'admin@los-hub.com',
      name: 'LOS Hub Admin',
      role: 'SUPER_ADMIN' as UserRole,
      status: 'ACTIVE',
      passwordHash: adminHash,
    },
  });
  console.log(`✅ Super Admin: ${superAdmin.email}`);

  // ------------------------------------------------------------------
  // Demo Traveler
  // ------------------------------------------------------------------
  const travelerHash = await bcrypt.hash('Traveler@1234', 12);
  const traveler = await prisma.user.upsert({
    where: { email: 'traveler@demo.los-hub.com' },
    update: {},
    create: {
      email: 'traveler@demo.los-hub.com',
      name: 'Dr. Babatunde Lawal',
      phone: '+234 803 123 4567',
      role: 'TRAVELER' as UserRole,
      status: 'ACTIVE',
      passwordHash: travelerHash,
      travelerProfile: {
        create: {
          preferredAirport: 'MM2',
          loyaltyTier: 'PLATINUM',
        },
      },
    },
  });
  console.log(`✅ Demo Traveler: ${traveler.email}`);

  // ------------------------------------------------------------------
  // Demo Driver
  // ------------------------------------------------------------------
  const driverHash = await bcrypt.hash('Driver@1234', 12);
  const driver = await prisma.user.upsert({
    where: { email: 'driver@demo.los-hub.com' },
    update: {},
    create: {
      email: 'driver@demo.los-hub.com',
      name: 'Samuel Okon',
      phone: '+234 805 777 3344',
      role: 'DRIVER' as UserRole,
      status: 'ACTIVE',
      passwordHash: driverHash,
      staffProfile: {
        create: {
          staffRole: 'DRIVER',
          airportCode: 'MM2',
          vehicleInfo: 'Lexus RX350 • LND-492-AA',
          isAvailable: true,
        },
      },
    },
  });
  console.log(`✅ Demo Driver: ${driver.email}`);

  // ------------------------------------------------------------------
  // Demo Porter
  // ------------------------------------------------------------------
  const porterHash = await bcrypt.hash('Porter@1234', 12);
  const porter = await prisma.user.upsert({
    where: { email: 'porter@demo.los-hub.com' },
    update: {},
    create: {
      email: 'porter@demo.los-hub.com',
      name: 'Emeka Nnamdi',
      phone: '+234 802 888 1122',
      role: 'PORTER' as UserRole,
      status: 'ACTIVE',
      passwordHash: porterHash,
      staffProfile: {
        create: {
          staffRole: 'PORTER',
          airportCode: 'MM2',
          badgeNumber: 'MM2-884',
          isAvailable: true,
        },
      },
    },
  });
  console.log(`✅ Demo Porter: ${porter.email}`);

  // ------------------------------------------------------------------
  // Demo Corporate Account + Admin
  // ------------------------------------------------------------------
  const corpAdminHash = await bcrypt.hash('Corporate@1234', 12);
  const corpAccount = await prisma.corporateAccount.upsert({
    where: { id: 'corp-gtbank-001' },
    update: {},
    create: {
      id: 'corp-gtbank-001',
      companyName: 'GTBank Enterprise',
      industry: 'Financial Services',
      billingEmail: 'travel@gtbank.demo',
      monthlyLimitNGN: 500000,
    },
  });

  const corpAdmin = await prisma.user.upsert({
    where: { email: 'corp-admin@demo.los-hub.com' },
    update: {},
    create: {
      email: 'corp-admin@demo.los-hub.com',
      name: 'Chief Folake Akindele',
      phone: '+234 809 999 0000',
      role: 'CORPORATE_ADMIN' as UserRole,
      status: 'ACTIVE',
      passwordHash: corpAdminHash,
      corporateMember: {
        create: {
          corporateAccountId: corpAccount.id,
          isAdmin: true,
        },
      },
    },
  });
  console.log(`✅ Demo Corporate Admin: ${corpAdmin.email}`);

  // ------------------------------------------------------------------
  // Demo FAAN
  // ------------------------------------------------------------------
  const faanHash = await bcrypt.hash('Faan@1234', 12);
  const faanUser = await prisma.user.upsert({
    where: { email: 'faan@demo.los-hub.com' },
    update: {},
    create: {
      email: 'faan@demo.los-hub.com',
      name: 'Engr. Donald Oladipo',
      phone: '+234 701 234 5678',
      role: 'FAAN_OPS' as UserRole,
      status: 'ACTIVE',
      passwordHash: faanHash,
    },
  });
  console.log(`✅ Demo FAAN Ops: ${faanUser.email}`);

  // ------------------------------------------------------------------
  // Demo Partner + Airline
  // ------------------------------------------------------------------
  const airlineHash = await bcrypt.hash('Airline@1234', 12);
  const airlinePartner = await prisma.partnerOrganization.upsert({
    where: { id: 'partner-airpeace-001' },
    update: {},
    create: {
      id: 'partner-airpeace-001',
      name: 'Air Peace Commercial',
      partnerType: 'AIRLINE',
      airportCodes: ['MM2', 'ABV', 'PHC'],
    },
  });

  const airlineStaff = await prisma.user.upsert({
    where: { email: 'airline@demo.los-hub.com' },
    update: {},
    create: {
      email: 'airline@demo.los-hub.com',
      name: 'Capt. Ibrahim Musa',
      role: 'AIRLINE_STAFF' as UserRole,
      status: 'ACTIVE',
      passwordHash: airlineHash,
      partnerMember: {
        create: {
          partnerOrganizationId: airlinePartner.id,
        },
      },
    },
  });
  console.log(`✅ Demo Airline Staff: ${airlineStaff.email}`);

  // ------------------------------------------------------------------
  // Demo Bookings for the traveler
  // ------------------------------------------------------------------
  const driverStaff = await prisma.staffProfile.findFirst({
    where: { userId: driver.id },
  });
  const porterStaff = await prisma.staffProfile.findFirst({
    where: { userId: porter.id },
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 30, 0, 0);

  const booking1 = await prisma.booking.upsert({
    where: { reference: 'LOB-SEED01' },
    update: {},
    create: {
      reference: 'LOB-SEED01',
      customerId: traveler.id,
      airportCode: 'MM2',
      serviceType: 'PORTER',
      flightNumber: 'P4 7122',
      flightDirection: 'ARRIVAL',
      scheduledAt: tomorrow,
      passengerCount: 1,
      luggageCount: 3,
      basePriceNGN: 5000,
      addonsNGN: 0,
      discountNGN: 0,
      totalPriceNGN: 5000,
      status: 'ASSIGNED',
      paymentStatus: 'PAID',
      assignedStaffId: porterStaff?.id,
    },
  });

  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const booking2 = await prisma.booking.upsert({
    where: { reference: 'LOB-SEED02' },
    update: {},
    create: {
      reference: 'LOB-SEED02',
      customerId: traveler.id,
      airportCode: 'MM2',
      serviceType: 'CAB',
      flightNumber: 'P4 7122',
      flightDirection: 'ARRIVAL',
      scheduledAt: tomorrow,
      passengerCount: 1,
      luggageCount: 0,
      basePriceNGN: 15000,
      addonsNGN: 0,
      discountNGN: 0,
      totalPriceNGN: 15000,
      status: 'IN_PROGRESS',
      paymentStatus: 'PAID',
      assignedStaffId: driverStaff?.id,
    },
  });

  console.log(`✅ Demo Bookings: ${booking1.reference}, ${booking2.reference}`);

  console.log('\n🚀 Seed complete! Development credentials:');
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│ Role           Email                    Password     │');
  console.log('├─────────────────────────────────────────────────────┤');
  console.log('│ Super Admin    admin@los-hub.com        Admin@LosHub2025 │');
  console.log('│ Traveler       traveler@demo.los-hub.com Traveler@1234   │');
  console.log('│ Driver         driver@demo.los-hub.com  Driver@1234      │');
  console.log('│ Porter         porter@demo.los-hub.com  Porter@1234      │');
  console.log('│ Corporate      corp-admin@demo.los-hub.com Corporate@1234│');
  console.log('│ FAAN           faan@demo.los-hub.com    Faan@1234        │');
  console.log('│ Airline        airline@demo.los-hub.com Airline@1234     │');
  console.log('└─────────────────────────────────────────────────────┘');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
