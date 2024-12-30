// src/recoil/authAtoms.ts
import { atom } from 'recoil';


const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

export const authTokenState = atom<string | null>({
    key: 'authTokenState',
    default: token?token: null,
});

interface UserType {
    name: string,
    userId: string,
    email: string,
    profile?: string
}
export const userInfoState = atom<UserType | null>({
    key: 'userInfoState',
    default: user?JSON.parse(user):null,
});