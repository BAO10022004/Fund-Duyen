// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import QuyPhong from './Pages/QuyPhong';
import ManagePersons from './Pages/ManagePersons';
import AdminLayout from './Pages/AdminLayout';
import ManageTransactions from './Pages/ManageTransaction';
import Login from './Pages/Login';
import ManageAccounts from './Pages/ManageAccount';
import EditAccount from './Pages/EditAccount';
import ManageAction from './Pages/ManageAction';
import { Auth } from './Auth';
import DiaryPage from './Pages/ManageDiary';
import ManageHistory from './Pages/ManageHistory';
// Global auth instance
export const auth = new Auth();

// Protected Route Component - Sử dụng auth global
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = auth.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
import { addDoc, collection, Timestamp } from "firebase/firestore";
import type { Account } from "./models/Account";
import { db } from './firebase';

export const sampleAccounts: Account[] = [
  {
    id: "acc_001",
    username: "admin01",
    userName: "admin01",
    password: "123456",
    role: "admin",
    codePerson: "P001",
    personName: "Nguyễn Văn A",
    createdAt: Timestamp.now()
  },
  {
    id: "acc_002",
    username: "user01",
    userName: "user01",
    password: "123456",
    role: "user",
    codePerson: "P002",
    personName: "Trần Thị B",
    createdAt: Timestamp.now()
  },
  {
    id: "acc_003",
    username: "user02",
    userName: "user02",
    password: "123456",
    role: "user",
    codePerson: "P003",
    personName: "Lê Văn C",
    createdAt: Timestamp.now()
  }
];
export const seedAccounts = async () => {
  for (const acc of sampleAccounts) {
    const { id, ...data } = acc; // bỏ id vì Firestore tự tạo
    await addDoc(collection(db, "accounts_duyen"), data);
  }
};
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* Route login - DUY NHẤT route công khai */}
        <Route path="/login" element={<Login />} />
        
        {/* Route login - DUY NHẤT route công khai */}
        <Route path="/login" element={<Login />} />
        
        {/* TẤT CẢ routes khác đều yêu cầu đăng nhập */}
        
        {/* Dashboard - Trang chủ với 3D Atom */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/quy-phong" 
          element={
            <ProtectedRoute>
              <QuyPhong />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <ManageHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/accounts" 
          element={
            <ProtectedRoute>
              <ManageAccounts />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/accounts/edit" 
          element={
            <ProtectedRoute>
              <EditAccount />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/persons" 
          element={
            <ProtectedRoute>
              <ManagePersons />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/transactions" 
          element={
            <ProtectedRoute>
              <ManageTransactions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/action" 
          element={
            <ProtectedRoute>
              <ManageAction />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/diary" 
          element={
            <ProtectedRoute>
              <DiaryPage />
            </ProtectedRoute>
          } 
        />
        {/* ✅ Catch all: Redirect mọi route không tồn tại về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);