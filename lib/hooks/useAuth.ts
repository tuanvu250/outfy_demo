import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import type { LoginRequest, RegisterRequest } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, accessToken, isAuthenticated, setAuth, logout } =
    useAuthStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response.success) {
        setAuth(response.data);
        router.push("/home");
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        router.push(`/otp?email=${encodeURIComponent(variables.email)}`);
      }
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
    token: accessToken,
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
