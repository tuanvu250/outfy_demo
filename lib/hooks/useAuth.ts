import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import type { LoginCredentials, RegisterData } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => authApi.login(data),
    onSuccess: ({ data }) => {
      setAuth(data.user, data.token);
      router.push("/home");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (_, variables) => {
      router.push(`/otp?email=${encodeURIComponent(variables.email)}`);
    },
  });

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      logout();
      router.push("/login");
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    register: registerMutation.mutate,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
