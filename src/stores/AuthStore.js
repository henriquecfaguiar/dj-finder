import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useDjStore } from './DjStore';

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const isLoggedIn = ref(false);
  const router = useRouter();
  const djStore = useDjStore();

  function setUser(data) {
    userId.value = data.localId;
    token.value = data.idToken;
    isLoggedIn.value = true;
  }

  function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    userId.value = null;
    token.value = null;
    isLoggedIn.value = false;
    router.replace('/djs');
    djStore.getDjData();
  }

  async function auth(data) {
    let url;
    if (data.mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIJbrJpqyIIRp7qe3TSsKsaOJoStdrGYs';
    } else if (data.mode === 'login') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIJbrJpqyIIRp7qe3TSsKsaOJoStdrGYs';
    } else {
      console.log('Should never happen.');
    }
    try {
      isLoading.value = true;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      }

      const expiresIn = responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('tokenExpiration', expirationDate);

      setTimeout(logout, expiresIn);

      setUser(responseData);
      router.replace('/djs');
    } catch (err) {
      error.value =
        'Authentication failed. Please check your login data. ' + err;
    } finally {
      isLoading.value = false;
    }
  }

  function tryLogin() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) return;

    setTimeout(logout, expiresIn);

    if (userId && token) {
      setUser({
        localId: userId,
        idToken: token,
      });
    }
  }

  return {
    auth,
    tryLogin,
    error,
    isLoading,
    userId,
    token,
    isLoggedIn,
    logout,
  };
});

export default {};
