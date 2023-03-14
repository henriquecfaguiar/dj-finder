import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useDjStore } from './DjStore';

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null);
  const token = ref(null);
  const tokenExpiration = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const isLoggedIn = ref(false);
  const router = useRouter();
  const djStore = useDjStore();

  function setUser(data) {
    userId.value = data.localId;
    token.value = data.idToken;
    tokenExpiration.value = data.expiresIn;
    isLoggedIn.value = true;
    router.replace('/djs');
  }

  function logout() {
    userId.value = null;
    token.value = null;
    tokenExpiration.value = null;
    isLoggedIn.value = false;
    router.replace('/djs');
    djStore.getDjData();
  }

  async function signUp(data) {
    try {
      isLoading.value = true;
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIJbrJpqyIIRp7qe3TSsKsaOJoStdrGYs',
        {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      }
      setUser(responseData);
    } catch (err) {
      error.value =
        'Authentication failed. Please check our login data. ' + err;
    } finally {
      isLoading.value = false;
    }
  }

  async function login(data) {
    try {
      isLoading.value = true;
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIJbrJpqyIIRp7qe3TSsKsaOJoStdrGYs',
        {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      }
      setUser(responseData);
    } catch (err) {
      error.value =
        'Authentication failed. Please check your login data. ' + err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    signUp,
    error,
    isLoading,
    login,
    userId,
    token,
    tokenExpiration,
    isLoggedIn,
    logout,
  };
});

export default {};
