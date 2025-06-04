import { Heart, MessageCircle, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

const mockMatches = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    matchScore: 92,
    isOnline: true,
    lastActive: '2 hours ago',
    bio: 'Adventure seeker with a love for books'
  },
  {
    id: '2',
    name: 'Sophia Chen',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face',
    matchScore: 88,
    isOnline: false,
    lastActive: '1 day ago',
    bio: 'Yoga instructor who believes in mindful living'
  },
  {
    id: '3',
    name: 'Jessica Rodriguez',
    age: 31,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
    matchScore: 85,
    isOnline: true,
    lastActive: 'Just now',
    bio: 'Art lover and weekend chef'
  }
]

export default function MatchesPage() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-light/10 to-teal-light/10 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Matches</h2>
          <p className="text-gray-600 text-sm">{mockMatches.length} people liked you back</p>
        </div>
        <div className="bg-rose/10 p-3 rounded-full">
          <Heart className="w-6 h-6 text-rose" fill="currentColor" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {mockMatches.map((match) => (
          <Card key={match.id} className="p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={match.photo} 
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {match.isOnline && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{match.name}, {match.age}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-sm font-medium text-gray-700">{match.matchScore}%</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">{match.bio}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {match.isOnline ? 'Online now' : `Active ${match.lastActive}`}
                  </span>
                  
                  <Button size="sm" className="bg-rose hover:bg-rose-dark text-white">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Matches Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">New Matches Today</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {mockMatches.slice(0, 3).map((match) => (
            <div key={`new-${match.id}`} className="flex-shrink-0 text-center">
              <div className="relative mb-2">
                <img 
                  src={match.photo} 
                  alt={match.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" fill="currentColor" />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700">{match.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}