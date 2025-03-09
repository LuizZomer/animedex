import { useEffect, useState } from "react";
import { api } from "@/services/api";
import jwt from "jsonwebtoken";
import { AuthContext, IDecodedToken } from "./CreateAuthContext";
import { useRouter } from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { "animedex.token": token } = parseCookies();
  const { push } = useRouter();
  const [user, setUser] = useState<IDecodedToken>();
  const isAuth = !!token;

  const signIn = async ({ password, username }: ICredentials) => {
    return api
      .post("/api/auth/login", {
        username,
        password,
      })
      .then(({ data }) => {
        const { accessToken } = data;
        setCookie(null, "animedex.token", accessToken, {
          maxAge: 60 * 60 * 24 * 2, // 2 dias
          path: "/",
        });

        const decoded = jwt.decode(accessToken) as IDecodedToken;

        setUser(decoded);

        return decoded;
      });
  };

  const signOut = () => {
    destroyCookie(null, "animedex.token");
    push("/login");
  };

  useEffect(() => {
    if (!user) {
      const decodedToken = jwt.decode(token) as IDecodedToken;
      console.log(decodedToken);

      setUser(decodedToken);
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ isAuth, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
