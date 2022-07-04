import { getAuth, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { defineStore } from "pinia";

interface UserStore {
    loading: boolean
    user: User | null
    authProvider: GoogleAuthProvider
}

export const useUserStore = defineStore("user", {
    state: (): UserStore => {
        const googleAuthProvider = new GoogleAuthProvider()
        return {
            loading: false,
            user: null,
            authProvider: googleAuthProvider
        }
    },

    actions: {
        async signIn() {
            this.loading = true
            const auth = getAuth();
            if (auth.currentUser) {
                return
            }

            try {
                signInWithPopup(auth, this.authProvider);
            } catch (error) {
                console.error(`Error while trying to login the user: ${error}`)
            } finally {
                this.loading = false
            }
        },

        fetchUser() {
            this.loading = true;
            const auth = getAuth()
            if (auth.currentUser) {
                this.user = auth.currentUser;
                this.loading = false;
                return
            }

            auth.onAuthStateChanged((user) => {
                this.loading = true
                if (user) {
                    if (this.user !== user) {
                        this.user = user
                    }
                } else {
                    this.user = null
                }

                this.loading = false
            })
        },

        signOut: () => {
            const auth = getAuth();
            if (auth.currentUser) {
                return auth.signOut()
            }
        }
    }
})