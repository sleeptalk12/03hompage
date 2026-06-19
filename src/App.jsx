import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminRoute from './components/routes/AdminRoute'

// Pages
import HomePage from './pages/HomePage'

// Auth
import LoginPage from './pages/auth/LoginPage'
import LoginCompletePage from './pages/auth/LoginCompletePage'
import SignupPage from './pages/auth/SignupPage'
import MyPage from './pages/auth/MyPage'

// Company
import CompanyAbout from './pages/company/CompanyAbout'
import CompanyCeo from './pages/company/CompanyCeo'
import CompanyVision from './pages/company/CompanyVision'
import CompanyHistory from './pages/company/CompanyHistory'
import CompanyLocation from './pages/company/CompanyLocation'

// Products
import ProductListPage from './pages/products/ProductListPage'
import ProductDetailPage from './pages/products/ProductDetailPage'

// Posts
import PostListPage from './pages/posts/PostListPage'
import PostDetailPage from './pages/posts/PostDetailPage'
import PostCreatePage from './pages/posts/PostCreatePage'
import PostEditPage from './pages/posts/PostEditPage'

// Inquiry
import InquiryCreatePage from './pages/inquiry/InquiryCreatePage'
import InquiryListPage from './pages/inquiry/InquiryListPage'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminPosts from './pages/admin/AdminPosts'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/login/complete" element={<Layout><ProtectedRoute><LoginCompletePage /></ProtectedRoute></Layout>} />
          <Route path="/signup" element={<Layout><SignupPage /></Layout>} />

          {/* Company */}
          <Route path="/company/about" element={<Layout><CompanyAbout /></Layout>} />
          <Route path="/company/ceo" element={<Layout><CompanyCeo /></Layout>} />
          <Route path="/company/vision" element={<Layout><CompanyVision /></Layout>} />
          <Route path="/company/history" element={<Layout><CompanyHistory /></Layout>} />
          <Route path="/company/location" element={<Layout><CompanyLocation /></Layout>} />

          {/* Products */}
          <Route path="/products" element={<Layout><ProductListPage /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />

          {/* Posts */}
          <Route path="/posts" element={<Layout><PostListPage /></Layout>} />
          <Route path="/posts/create" element={<Layout><ProtectedRoute><PostCreatePage /></ProtectedRoute></Layout>} />
          <Route path="/posts/:id/edit" element={<Layout><ProtectedRoute><PostEditPage /></ProtectedRoute></Layout>} />
          <Route path="/posts/:id" element={<Layout><PostDetailPage /></Layout>} />

          {/* Inquiry */}
          <Route path="/inquiry" element={<Layout><ProtectedRoute><InquiryCreatePage /></ProtectedRoute></Layout>} />
          <Route path="/inquiry/list" element={<Layout><ProtectedRoute><InquiryListPage /></ProtectedRoute></Layout>} />

          {/* MyPage */}
          <Route path="/mypage" element={<Layout><ProtectedRoute><MyPage /></ProtectedRoute></Layout>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProducts /></AdminLayout></AdminRoute>} />
          <Route path="/admin/products/create" element={<AdminRoute><AdminLayout><AdminProductForm /></AdminLayout></AdminRoute>} />
          <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminLayout><AdminProductForm /></AdminLayout></AdminRoute>} />
          <Route path="/admin/posts" element={<AdminRoute><AdminLayout><AdminPosts /></AdminLayout></AdminRoute>} />
          <Route path="/admin/inquiries" element={<AdminRoute><AdminLayout><AdminInquiries /></AdminLayout></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminLayout><AdminSettings /></AdminLayout></AdminRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
