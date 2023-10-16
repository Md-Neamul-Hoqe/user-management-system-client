import PropTypes from "prop-types";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase.config";

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userInfo = {
    users,
    setUsers,
    loading,
    createUser,
    signInUser,
  };

  return (
    <AuthProvider.Provider value={userInfo}>{children}</AuthProvider.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
