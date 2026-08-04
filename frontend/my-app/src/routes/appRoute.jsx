import {Routes, Route} from "react-router-dom";
import AuthLogin from "../pages/authLogin.jsx";
import AuthRegister from "../pages/authRegister.jsx";
import NotFound from "../pages/notFound.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Users from "../pages/dashboard/users.jsx";
import Planes from "../pages/dashboard/planes.jsx";
import { ProtectedRouter } from "./protectedRouter.jsx";
import AdminLayout from "../components/layout/adminLayout.jsx";
import GetUsers from "../pages/dashboard/getUsers.jsx";
import AuthLoginCliente from "../pages/authLoginCliente.jsx";
import MenuCliente from "../pages/clienteProfile/clienteMenu.jsx"
import Escanear from "../pages/dashboard/escanear.jsx"
import EstadisticasClinte from "../pages/clienteProfile/estadisticas.jsx"
 
function AppRoute() {
    return (
        <Routes>
        
        <Route path='/login' element={<AuthLogin />} />
          <Route path='/register' element={<AuthRegister />} />
          
          <Route path='/dashboard' element={
             <ProtectedRouter redirect="/register">
                <AdminLayout>
                     <Dashboard />
                </AdminLayout>
            </ProtectedRouter>
          } />
          <Route path='/users' element={
             <ProtectedRouter redirect="/register">
                <AdminLayout>
                     <Users />
                </AdminLayout>
            </ProtectedRouter>
          } />
          <Route path='/planes' element={
             <ProtectedRouter redirect="/register">
                <AdminLayout>
                     <Planes />
                </AdminLayout>
            </ProtectedRouter>
          } />
          <Route path='/getUsers' element={
               <ProtectedRouter redirect="/register">
                  <AdminLayout>
                       <GetUsers />
                  </AdminLayout>
              </ProtectedRouter>
          } />
          <Route path='/loginClient' element={    
                       <AuthLoginCliente />
          } />
               <Route path='/mainClient' element={
               <ProtectedRouter redirect="/register">
                 
                       <MenuCliente />
               
              </ProtectedRouter>
          } />
          <Route path='/escanear' element={
               <ProtectedRouter redirect="/register">
                  <AdminLayout>
                           <Escanear />
                    </AdminLayout>
                 </ProtectedRouter>
          } />
          <Route path='/estadisticas' element={
               <ProtectedRouter redirect="/register">
                   
                           <EstadisticasClinte />
               
                 </ProtectedRouter>
          } />
           
         <Route path='*' element={<NotFound />} />
      </Routes>
    );
}
export default AppRoute;