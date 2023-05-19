import { Route, Routes } from 'react-router-dom'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import Dashboard from './pages/Dashboard'

function App() {


  return (

    <>
   
      
      <Routes>
     
    
        {/* public routes */}
       
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth  />}>
        <Route path="dashboard" element={<Dashboard />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>

     
    </Routes>
    
    </>
  )
}

export default App;
