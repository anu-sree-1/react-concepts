// api.ts
export type User = { id: number; name: string };

let users: User[] = [{ id: 1, name: "First User" }];

export async function fetchUsers(): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 500));
  return users;
}

export async function addUser(name: string) {
  await new Promise((r) => setTimeout(r, 300));
  users = [...users, { id: Date.now(), name }];
}
