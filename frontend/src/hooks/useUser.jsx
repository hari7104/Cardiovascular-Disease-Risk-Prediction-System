import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return { user, setUser };
}
