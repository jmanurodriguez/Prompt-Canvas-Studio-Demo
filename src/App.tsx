import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PromptBuilder from './pages/PromptBuilder'
import Gallery from './pages/Gallery'
import Learn from './pages/Learn'
import Profile from './pages/Profile'
import FundamentalsGuide from './pages/guides/FundamentalsGuide'
import AdvancedTechniquesGuide from './pages/guides/AdvancedTechniquesGuide'
import UseCasesGuide from './pages/guides/UseCasesGuide'
import BestPracticesGuide from './pages/guides/BestPracticesGuide'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/builder" 
            element={
              <ProtectedRoute>
                <PromptBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/builder/:id" 
            element={
              <ProtectedRoute>
                <PromptBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/fundamentals" element={<FundamentalsGuide />} />
          <Route path="/learn/advanced" element={<AdvancedTechniquesGuide />} />
          <Route path="/learn/use-cases" element={<UseCasesGuide />} />
          <Route path="/learn/best-practices" element={<BestPracticesGuide />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
