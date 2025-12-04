import { Seeder } from '@concepta/typeorm-seeding';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserMetadataEntity } from './entities/user-metadata.entity';
import { PasswordStorageService } from '@concepta/nestjs-password';

/**
 * Application Seeder
 *
 * Creates essential data for the application:
 * - Admin role
 * - User role (default)
 * - Admin user (admin@conceptatech.com)
 * - User metadata for admin user
 *
 * Uses Concepta's PasswordStorageService to hash passwords,
 * ensuring compatibility with Concepta's authentication modules.
 */
export class AppSeeder extends Seeder {
  private passwordStorageService = new PasswordStorageService();

  async run(): Promise<void> {
    const userRepository = this.repository(UserEntity);
    const roleRepository = this.repository(RoleEntity);
    const userRoleRepository = this.repository(UserRoleEntity);
    const userMetadataRepository = this.repository(UserMetadataEntity);

    // Create admin role
    let adminRole = await roleRepository.findOne({
      where: { name: process.env.ADMIN_ROLE_NAME || 'admin' },
    });

    if (!adminRole) {
      adminRole = roleRepository.create({
        name: process.env.ADMIN_ROLE_NAME || 'admin',
        description: 'Administrator role with full access',
      });
      await roleRepository.save(adminRole);
      console.log('✅ Admin role created');
    }

    // Create default user role
    let userRole = await roleRepository.findOne({
      where: { name: process.env.DEFAULT_ROLE_NAME || 'user' },
    });

    if (!userRole) {
      userRole = roleRepository.create({
        name: process.env.DEFAULT_ROLE_NAME || 'user',
        description: 'Default user role',
      });
      await roleRepository.save(userRole);
      console.log('✅ User role created');
    }

    // Check if admin user already exists
    const adminEmail = 'admin@conceptatech.com';
    const existingAdmin = await userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // NOTE: Hardcoded password is intentional for database seeding/development
      // Hash password using Concepta's PasswordStorageService (same as UserSeeder)
      const hashed = await this.passwordStorageService.hash('Test1234');

      // Create admin user with specific credentials
      const adminUser = userRepository.create({
        email: adminEmail,
        username: 'admin',
        active: true,
        passwordHash: hashed.passwordHash,
        passwordSalt: hashed.passwordSalt,
      });
      await userRepository.save(adminUser);

      // Assign admin role to admin user
      const adminUserRole = userRoleRepository.create({
        assignee: adminUser,
        role: adminRole,
      });
      await userRoleRepository.save(adminUserRole);

      // Create user metadata for admin user
      const adminMetadata = userMetadataRepository.create({
        userId: adminUser.id,
        firstName: 'Admin',
        lastName: 'User',
      });
      await userMetadataRepository.save(adminMetadata);

      console.log(`✅ Admin user created: ${adminEmail} (password: Test1234)`);
      console.log(`✅ Admin user metadata created`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  }
}

