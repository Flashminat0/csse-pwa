import {createSlice} from '@reduxjs/toolkit'

const DEFAULT_PROFILE_PIC = 'https://firebasestorage.googleapis.com/v0/b/susty-next.appspot.com/o/default_profile_pic.png?alt=media&token=ddfbe30b-a94f-4390-94cf-416285ac2fde'

const initialAuthState = {
	isAuthenticated: false,
	user: {
		name: '',
		email: '',
		photoURL: DEFAULT_PROFILE_PIC,
	},
	token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true
			state.user = {
				name: action.payload.user.name,
				email: action.payload.user.email,
				photoURL: action.payload.user.image || DEFAULT_PROFILE_PIC,
			}
			state.token = action.payload.token
		},
		logout: (state) => {
			state.isAuthenticated = false
			state.user = {
				name: '',
				email: '',
				photoURL: DEFAULT_PROFILE_PIC,
			}
			state.token = null
		},
	},
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer
