import React, { useState } from "react";
import useSWR, { SWRConfig, mutate } from "swr";
import { fetchUsers, addUser, User } from "./api";
import './App.css'

// Fetcher function
const fetcher = async () => fetchUsers();

function Users() {
  // 1. Basic useSWR with refresh and focus revalidation
  const { data, error, isValidating } = useSWR<User[]>(
    "users", // Key
    fetcher,
    {
      refreshInterval: 5000, // auto refresh every 5s
      revalidateOnFocus: true, // refetch on window focus
      dedupingInterval: 2000, // avoid duplicate fetches
    }
  );

  const [newName, setNewName] = useState("");

  const handleAdd = async () => {
    // Optimistic update: update cache immediately
    mutate(
      "users",
      (oldData: User[] | undefined) => [
        ...(oldData ?? []),
        { id: Date.now(), name: newName },
      ],
      false // don't revalidate yet
    );

    // Perform server write
    await addUser(newName);

    // Revalidate from server to sync
    mutate("users");
    setNewName("");
  };

  if (error) return <p>Error loading users.</p>;
  if (!data) return <p>Loading…</p>;

  return (
    <div>
      <h3>
        Users
      </h3>
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New user name"
      />
      <button onClick={handleAdd}>{isValidating ? <span className="spinner"></span> : <span>Add User</span>}</button>
    </div>
  );
}

// Optional: fallback for SSR / initial data
const initialData = [{ id: 999, name: "SSR User" }];

export default function App() {
  return (
    <SWRConfig
      value={{
        fallback: { users: initialData },
      }}
    >
      <Users />
    </SWRConfig>
  );
}
