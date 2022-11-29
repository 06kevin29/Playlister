import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR: "ERROR",
    VIEW_HOME: "VIEW_HOME",
    VIEW_ALL_LISTS: "VIEW_ALL_LISTS",
    VIEW_USERS: "VIEW_USERS",
    GUEST: "GUEST"
}

const view = {
    NONE : "NONE",
    HOME: "HOME",
    ALL_LISTS : "ALL_LISTS",
    USERS: "USERS"
}
const visitor  = {
    NONE: "NONE",
    REGISTERED: "REGISTERED",
    GUEST: "GUEST"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: "",
        view: view.NONE,
        visitor: visitor.NONE,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: "",
                    view: auth.view,
                    visitor: auth.visitor
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: "",
                    view: view.HOME,
                    visitor: visitor.REGISTERED
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: "",
                    view: view.NONE,
                    visitor: visitor.NONE
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: "",
                    view: view.NONE,
                    visitor: visitor.NONE
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    view: auth.view,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_HOME: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.HOME,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_ALL_LISTS: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.ALL_LISTS,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_USERS: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.USERS,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.GUEST: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: "",
                    view: view.ALL_LISTS,
                    visitor: visitor.GUEST
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                //auth.loginUser(email,password);
                history.push('/login');
            }
        } catch (error) {
            console.log(error.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR,
                payload: {
                    errorMessage: error.response.data.errorMessage
                }
            });
        }
    }

    auth.loginUser = async function(email, password) {
        try {
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (error) {
            console.log(error.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR,
                payload: {
                    errorMessage: error.response.data.errorMessage
                }
            });
        }
    }
    auth.useAsGuest = async function () {
        try {
            let response = await api.registerUser("Guest", "Guest", "User", "guest@playlister.stonybrook.org", "password", "password");
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GUEST,
                    payload: {
                        user: response.data.user
                    }
                })
                response = await api.loginUser("guest@playlister.stonybrook.org","password");
                if (response.status === 200) {
                    authReducer({
                        type: AuthActionType.GUEST,
                        payload: {
                            user: response.data.user
                        }
                    })
                    history.push("/");
                }
            }
        } catch (error) {
            let response2 = await api.loginUser("guest@playlister.stonybrook.org","password");
            if (response2.status === 200) {
                authReducer({
                    type: AuthActionType.GUEST,
                    payload: {
                        user: response2.data.user
                    }
                })
                history.push("/");
            }
        }
    }

    auth.hideModal = () => {
        authReducer({
            type: AuthActionType.ERROR,
            payload: {
                errorMessage: ""
            }
        });
    }

    auth.isErrorModalOpen = () => {
        return auth.errorMessage !== "";
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        return initials;
    }
    auth.goHome = function() {
        authReducer( {
            type: AuthActionType.VIEW_HOME,
            payload: {}
        })
        history.push("/");
    }
    auth.goAllLists = function() {
        authReducer( {
            type: AuthActionType.VIEW_ALL_LISTS,
            payload: {}
        })
        history.push("/");
    }
    auth.goUsers = function() {
        authReducer( {
            type: AuthActionType.VIEW_USERS,
            payload: {}
        })
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };