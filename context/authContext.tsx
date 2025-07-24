'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'

type AuthState = {
  user: string | null
  isAuthenticated: boolean
  isInitialized: boolean
}

type AuthAction =
  | { type: 'INIT'; payload: string | null }
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
} | null>(null)

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'INIT':
      return {
        user: action.payload,
        isAuthenticated: !!action.payload,
        isInitialized: true,
      }
    case 'LOGIN':
      return {
        user: action.payload,
        isAuthenticated: true,
        isInitialized: true,
      }
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('currentUser')

    if (storedToken && storedUser) {
      dispatch({ type: 'INIT', payload: storedUser })
    } else {
      dispatch({ type: 'INIT', payload: null })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
