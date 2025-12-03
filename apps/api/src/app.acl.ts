import { AccessControl } from 'accesscontrol';

/**
 * Application roles enum
 * Defines all possible roles in the system
 */
export enum AppRole {
  Admin = 'admin',
  User = 'user',
}

/**
 * Application resources enum
 * Defines all resources that can be access-controlled
 */
export enum AppResource {
  User = 'user',
}

const allResources = Object.values(AppResource);

/**
 * Access Control Rules
 * Uses the accesscontrol library to define role-based permissions
 *
 * Pattern:
 * - .grant(role) - Grant permissions to a role
 * - .resource(resource) - Specify the resource
 * - .create() / .read() / .update() / .delete() - Specify actions
 *
 * @see https://www.npmjs.com/package/accesscontrol
 */
export const acRules: AccessControl = new AccessControl();

// Admin role has full access to all resources
acRules
  .grant([AppRole.Admin])
  .resource(allResources)
  .createAny()
  .readAny()
  .updateAny()
  .deleteAny();

// User role - can only access their own resources (ownership-based)
// The PetAccessQueryService will verify ownership
acRules
  .grant([AppRole.User])
  .resource(allResources)
  .createOwn()
  .readOwn()
  .updateOwn()
  .deleteOwn();
