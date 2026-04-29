import { getPayload as getPayloadInstance } from 'payload';
import config from '@payload-config';

/**
 * Singleton Payload client για server components.
 * Όλα τα server-side queries γίνονται μέσω αυτού.
 *
 * Χρήση:
 *   const payload = await getPayload();
 *   const products = await payload.find({ collection: 'products', locale: 'el' });
 */
export async function getPayload() {
  return getPayloadInstance({ config });
}
