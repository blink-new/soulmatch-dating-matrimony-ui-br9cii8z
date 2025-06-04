import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MatchesPage from './pages/MatchesPage'
import ChatPage from './pages/ChatPage'
import MatrimonyPage from './pages/MatrimonyPage'
import ProfilePage from './pages/ProfilePage'
import ProfileDetailPage from './pages/ProfileDetailPage'
import OnboardingPage from './pages/OnboardingPage'

// Mock user state - in real app this would come from auth context
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  age: 28,
  photos: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
  ],
  bio: 'Love hiking, yoga, and meaningful conversations. Looking for someone genuine.',
  location: 'San Francisco, CA',
  interests: ['Travel', 'Yoga', 'Photography', 'Cooking'],
  lookingFor: 'Serious Relationship',
  religion: 'Christian',
  education: 'Masters in Marketing',
  profession: 'Digital Marketing Manager',
  isCompleted: true
}

function App() {
  const [user, setUser] = useState(mockUser)
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('soulmate_onboarded')
    if (!hasOnboarded) {
      setIsFirstTime(true)
    }
  }, [])

  const completeOnboarding = (userData: Partial<typeof mockUser>) => {
    setUser({ ...user, ...userData, isCompleted: true })
    setIsFirstTime(false)
    localStorage.setItem('soulmate_onboarded', 'true')
  }

  if (isFirstTime) {
    return <OnboardingPage onComplete={completeOnboarding} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rose-light/20 via-white to-teal-light/20">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="matches" element={<MatchesPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="matrimony" element={<MatrimonyPage />} />
            <Route path="profile" element={<ProfilePage user={user} />} />
            <Route path="profile/:id" element={<ProfileDetailPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App