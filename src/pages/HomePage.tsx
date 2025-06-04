import { useState, useRef } from 'react'
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Coffee } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'

// Mock data for profiles
const mockProfiles = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 26,
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
    ],
    bio: 'Adventure seeker with a love for books and spontaneous road trips 📚✈️',
    location: 'San Francisco, 2 mi away',
    profession: 'Product Designer',
    education: 'Stanford University',
    interests: ['Travel', 'Photography', 'Hiking', 'Coffee'],
    lookingFor: 'Serious Relationship',
    matchScore: 92,
    tags: ['💍 Looking for Marriage', '🏔️ Adventure Lover', '📚 Bookworm']
  },
  {
    id: '2',
    name: 'Sophia Chen',
    age: 29,
    photos: [
      'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face'
    ],
    bio: 'Yoga instructor who believes in mindful living and genuine connections 🧘‍♀️',
    location: 'Palo Alto, 5 mi away',
    profession: 'Yoga Instructor',
    education: 'UC Berkeley',
    interests: ['Yoga', 'Meditation', 'Cooking', 'Nature'],
    lookingFor: 'Marriage',
    matchScore: 88,
    tags: ['💍 Looking for Marriage', '🧘‍♀️ Spiritual', '🌱 Wellness Enthusiast']
  },
  {
    id: '3',
    name: 'Jessica Rodriguez',
    age: 31,
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
    ],
    bio: 'Art lover and weekend chef looking for someone to share beautiful moments with 🎨',
    location: 'San Jose, 8 mi away',
    profession: 'Art Director',
    education: 'Art Institute',
    interests: ['Art', 'Cooking', 'Museums', 'Wine'],
    lookingFor: 'Serious Relationship',
    matchScore: 85,
    tags: ['🎨 Creative Soul', '👋 Casual Dating', '🍷 Wine Enthusiast']
  }
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentProfile = mockProfiles[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    // Animate card out
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${direction === 'right' ? '100%' : '-100%'}) rotate(${direction === 'right' ? '15deg' : '-15deg'})`
      cardRef.current.style.opacity = '0'
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockProfiles.length)
      setIsAnimating(false)
      
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0)'
        cardRef.current.style.opacity = '1'
      }
    }, 300)
  }

  const handleLike = () => handleSwipe('right')
  const handlePass = () => handleSwipe('left')

  if (!currentProfile) return null

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-light/10 to-teal-light/10 p-4">
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Discover</h2>
        <Button variant="outline" size="sm" className="rounded-full">
          Filters
        </Button>
      </div>

      {/* Profile Card */}
      <div className="flex-1 relative">
        <Card 
          ref={cardRef}
          className="h-full swipe-card transition-all duration-300 ease-out overflow-hidden relative bg-white card-shadow"
        >
          {/* Photo */}
          <div className="relative h-3/5">
            <img 
              src={currentProfile.photos[0]} 
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Match Score */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-sm font-semibold text-gray-800">{currentProfile.matchScore}%</span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Profile Info */}
          <div className="p-6 h-2/5 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {currentProfile.name}, {currentProfile.age}
              </h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{currentProfile.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="text-sm">{currentProfile.profession}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span className="text-sm">{currentProfile.education}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {currentProfile.bio}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProfile.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-rose-light/30 text-rose hover:bg-rose-light/50">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-800">Interests</span>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 mt-6 pb-2">
        <Button
          onClick={handlePass}
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          disabled={isAnimating}
        >
          <X className="w-6 h-6 text-gray-500" />
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-12 h-12 border-2 border-trust hover:border-trust/80 hover:bg-trust/5"
          disabled={isAnimating}
        >
          <Coffee className="w-5 h-5 text-trust" />
        </Button>
        
        <Button
          onClick={handleLike}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose shadow-lg"
          disabled={isAnimating}
        >
          <Heart className="w-6 h-6 text-white" fill="currentColor" />
        </Button>
      </div>
    </div>
  )
}