import Realm from "realm";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import app from "../RealmApp";

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// Create the Provider Component
const AuthProvider = ({ children }) => {
  // State to manage authentication status
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const realmRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Function to handle user login
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const creds = Realm.Credentials.emailPassword(email, password);
      const newUser = await app.logIn(creds);
      setCurrentUser(app.currentUser);
      // setUser(newUser);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error (e.g., display error message to the user)
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign up
  const signUp = async (email, password) => {
    setLoading(true);
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      // Optionally, you can automatically sign in the user after successful registration
      await signIn(email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error (e.g., display error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    if (currentUser == null) {
      console.log("Not logged in, can't log out!");
      return;
    }
    app.currentUser?.logOut();
    setCurrentUser(null);
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("NO USER Logged In");
      return;
    }
    const config = {
      sync: {
        user: currentUser,
        partitionValue: `user=${currentUser.id}`,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the links that the logged in user added
    // (instead of all the links stored for all the users)
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
    });

    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  useEffect(() => {
    setCurrentUser(app?.currentUser);
  }, []);

  // Provide the context value to the children components
  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, user, loading, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
