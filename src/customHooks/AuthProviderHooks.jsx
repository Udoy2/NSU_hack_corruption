import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const AuthProviderHook = () => {
    const context = useContext(AuthContext);
    return context;
};

export default AuthProviderHook;