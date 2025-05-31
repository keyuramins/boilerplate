import { SupabaseClient } from '@supabase/supabase-js';

// Define a type for the user object returned by listUsers
interface SupabaseAdminUser {
    id: string;
    email?: string;
    app_metadata: { [key: string]: any };
    // Add other properties as needed
}

/**
 * Lists all users from Supabase auth.users table with pagination.
 * Note: This requires a Supabase client initialized with a service role key
 * or equivalent admin privileges.
 *
 * @param supabaseAdmin - Supabase client with admin privileges.
 * @param limit - The number of users to fetch per page (default 100).
 * @returns A promise resolving to an array of all users.
 */
export async function listAllUsersPaginated(
  supabaseAdmin: SupabaseClient,
  limit: number = 100
): Promise<SupabaseAdminUser[]> {
  let allUsers: SupabaseAdminUser[] = [];
  let offset = 0;
  let count = 0;
  const MAX_USERS_TO_FETCH = 10000; // Prevent infinite loops, set a reasonable cap

  do {
    const { data, error, count: currentCount } = await supabaseAdmin.auth.admin.listUsers({
      limit: limit,
      offset: offset,
    });

    if (error) {
      console.error('Error fetching users with pagination:', error);
      throw error; // Propagate the error
    }

    if (data && data.users) {
      allUsers = allUsers.concat(data.users as SupabaseAdminUser[]);
      count = currentCount ?? allUsers.length; // Use returned count if available, otherwise list length
      offset += limit;
    } else {
        // No data or users array, stop fetching
        break;
    }

    // Stop if we have fetched more than the theoretical count or hit the safety cap
  } while (allUsers.length < count && allUsers.length < MAX_USERS_TO_FETCH);

  return allUsers;
} 