export type User = { id: number; name: string };

let users: User[] = [{ id: 1, name: "First User" }];

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  console.log('fetching users from db')
  await new Promise((r) => setTimeout(r, 500));
  return users;
}

// Add a new user
export async function addUser(name: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  users = [...users, { id: Date.now(), name }];
}
