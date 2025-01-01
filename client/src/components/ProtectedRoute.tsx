import { userInfoState } from '@/recoil/authAtoms'
import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const ProtectedRoute = ({children}:{children:ReactElement}) => {

    const user = useRecoilValue(userInfoState)
    if (!user) {
        return <Navigate to='/' />
      }
      return children
}

export default ProtectedRoute