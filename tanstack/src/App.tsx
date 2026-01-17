import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, addUser, User } from "./api";
import './App.css'

export default function App() {
  const queryClient = useQueryClient();

  // READ: server state
  const { data, isLoading, isFetching, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5_000,
  });

  // WRITE: server mutation
  const mutation = useMutation<void, Error, string>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <p>Loading users…</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h3>Users</h3>

      <ul>
        {data!.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <button onClick={() => mutation.mutate("New User")}>  {isFetching ?
        <span className="spinner"></span> : <span>Add user</span>
      }</button>
    </div>
  );
}
