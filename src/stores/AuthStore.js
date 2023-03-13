import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const userId = ref('');
  const token = ref('');
  const tokenExpiration = ref('');
  const isLoading = ref(false);
  const error = ref(null);

  function setUser(data) {
    userId.value = data.localId;
    token.value = data.idToken;
    tokenExpiration.value = data.expiresIn;
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

  return { signUp, error, isLoading };
});

export default {};
