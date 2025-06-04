import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, X, Star, MapPin, Briefcase, GraduationCap, MessageCircle, Phone, Flag } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel'

// Mock profile data - in real app this would be fetched based on id
const profile = {
  id: '1',
  name: 'Emma Wilson',
  age: 26,
  photos: [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face'
  ],
  bio: 'Adventure seeker with a love for books and spontaneous road trips 📚✈️ I believe in authentic connections and meaningful conversations. Looking for someone who shares my passion for exploring new places and trying new experiences.',
  location: 'San Francisco, 2 mi away',
  profession: 'Product Designer',
  company: 'Google',
  education: 'Stanford University - MS in HCI',
  interests: ['Travel', 'Photography', 'Hiking', 'Coffee', 'Books', 'Yoga'],
  lookingFor: 'Serious Relationship',
  matchScore: 92,
  tags: ['💍 Looking for Marriage', '🏔️ Adventure Lover', '📚 Bookworm'],
  aboutMe: [
    '🎨 Passionate about creating beautiful user experiences',
    '📚 Currently reading "Educated" by Tara Westover',
    '🏔️ Hiked Half Dome last summer - still proud of that achievement!',
    '☕ Coffee enthusiast - always open to café recommendations',
    '🧘‍♀️ Practice yoga daily for mental clarity',
    '✈️ Dream destination: Japan for cherry blossom season'
  ],
  lifestyle: {
    smoking: 'Never',
    drinking: 'Socially',
    workout: 'Often',
    diet: 'Vegetarian'
  },
  questions: [
    { question: 'What are you looking for?', answer: 'A genuine connection with someone who values growth and adventure' },
    { question: 'What does your perfect weekend look like?', answer: 'Farmers market in the morning, hiking in the afternoon, and cooking dinner together' },
    { question: 'What\'s your love language?', answer: 'Quality time and words of affirmation' }
  ]
}

export default function ProfileDetailPage() {
  // const { id } = useParams() - not used in mock implementation
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Flag className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Photo Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {profile.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={photo} 
                      alt={`${profile.name} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Match Score Overlay */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-sm font-semibold text-gray-800">{profile.matchScore}%</span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}, {profile.age}</h1>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{profile.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{profile.profession} at {profile.company}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>{profile.education}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-rose-light/30 text-rose">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </Card>

          {/* About Me */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">More about me</h3>
            <div className="space-y-2">
              {profile.aboutMe.map((item, index) => (
                <p key={index} className="text-gray-700 text-sm">{item}</p>
              ))}
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Lifestyle */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Lifestyle</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Smoking:</span>
                <span className="ml-2 text-gray-600">{profile.lifestyle.smoking}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Drinking:</span>
                <span className="ml-2 text-gray-600">{profile.lifestyle.drinking}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Workout:</span>
                <span className="ml-2 text-gray-600">{profile.lifestyle.workout}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Diet:</span>
                <span className="ml-2 text-gray-600">{profile.lifestyle.diet}</span>
              </div>
            </div>
          </Card>

          {/* Questions */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Get to know me</h3>
            <div className="space-y-4">
              {profile.questions.map((item, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-800 mb-1">{item.question}</h4>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 p-6 bg-white border-t border-gray-100">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-14 h-14 border-2 border-gray-300 hover:border-gray-400"
        >
          <X className="w-6 h-6 text-gray-500" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12 border-2 border-trust hover:border-trust/80"
        >
          <MessageCircle className="w-5 h-5 text-trust" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12 border-2 border-trust hover:border-trust/80"
        >
          <Phone className="w-5 h-5 text-trust" />
        </Button>
        
        <Button
          onClick={handleLike}
          size="lg"
          className={`rounded-full w-14 h-14 transition-all duration-200 ${
            isLiked 
              ? 'bg-rose scale-110 shadow-lg' 
              : 'bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose shadow-lg'
          }`}
        >
          <Heart className="w-6 h-6 text-white" fill={isLiked ? "currentColor" : "none"} />
        </Button>
      </div>
    </div>
  )
}