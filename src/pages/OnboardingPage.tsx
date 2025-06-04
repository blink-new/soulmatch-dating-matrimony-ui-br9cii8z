import { useState } from 'react'
import { ChevronRight, ChevronLeft, Upload, MapPin, Heart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

interface OnboardingData {
  name: string
  age: string
  location: string
  photos: string[]
  bio: string
  interests: string[]
  lookingFor: string
  religion: string
  education: string
  profession: string
}

interface OnboardingPageProps {
  onComplete: (data: OnboardingData) => void
}

const LOOKING_FOR_OPTIONS = [
  'Dating',
  'Serious Relationship', 
  'Marriage',
  'New Friends'
]

const INTEREST_OPTIONS = [
  'Travel', 'Photography', 'Hiking', 'Coffee', 'Yoga', 'Reading',
  'Cooking', 'Movies', 'Music', 'Art', 'Sports', 'Gaming',
  'Dancing', 'Fitness', 'Nature', 'Technology', 'Writing', 'Pets'
]

const RELIGION_OPTIONS = [
  'Christian', 'Muslim', 'Hindu', 'Buddhist', 'Jewish', 'Sikh',
  'Other', 'Non-religious', 'Spiritual', 'Prefer not to say'
]

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    age: '',
    location: '',
    photos: [],
    bio: '',
    interests: [],
    lookingFor: '',
    religion: '',
    education: '',
    profession: ''
  })

  const totalSteps = 6

  const updateFormData = (field: keyof OnboardingData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    updateFormData('interests', newInterests)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.name && formData.age && formData.location
      case 1: return formData.photos.length > 0
      case 2: return formData.bio.length > 0
      case 3: return formData.interests.length > 0
      case 4: return formData.lookingFor
      case 5: return true // Optional details
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
              <p className="text-gray-600">Tell us a bit about yourself</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  placeholder="25"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your photos</h2>
              <p className="text-gray-600">Show your personality with great photos</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <Card 
                  key={index}
                  className="aspect-square border-2 border-dashed border-gray-300 hover:border-rose cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    // Mock photo upload - in real app would handle file upload
                    const mockPhoto = `https://images.unsplash.com/photo-${1494790108755 + index}?w=400&h=600&fit=crop&crop=face`
                    if (formData.photos.length > index) {
                      const newPhotos = [...formData.photos]
                      newPhotos[index] = mockPhoto
                      updateFormData('photos', newPhotos)
                    } else {
                      updateFormData('photos', [...formData.photos, mockPhoto])
                    }
                  }}
                >
                  {formData.photos[index] ? (
                    <img 
                      src={formData.photos[index]} 
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Tap to add photos. You need at least one photo to continue.
            </p>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell your story</h2>
              <p className="text-gray-600">Write a bio that shows your personality</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About you ({formData.bio.length}/500)
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="I love adventure, good coffee, and meaningful conversations. Looking for someone to explore life with..."
                className="w-full h-32 resize-none"
                maxLength={500}
              />
            </div>

            <div className="bg-rose-light/20 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">💡 Bio Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Be authentic and specific</li>
                <li>• Mention your hobbies and interests</li>
                <li>• Share what you're looking for</li>
                <li>• Keep it positive and engaging</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your interests</h2>
              <p className="text-gray-600">Choose at least 3 interests to help us find better matches</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-rose text-white hover:bg-rose-dark'
                      : 'hover:bg-rose-light/20'
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Selected: {formData.interests.length} interests
            </p>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
              <p className="text-gray-600">This helps us show you to the right people</p>
            </div>

            <div className="space-y-3">
              {LOOKING_FOR_OPTIONS.map((option) => (
                <Card
                  key={option}
                  className={`p-4 cursor-pointer transition-colors ${
                    formData.lookingFor === option
                      ? 'border-rose bg-rose-light/20'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateFormData('lookingFor', option)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.lookingFor === option
                        ? 'bg-rose border-rose'
                        : 'border-gray-300'
                    }`}>
                      {formData.lookingFor === option && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option}</h4>
                      <p className="text-sm text-gray-600">
                        {option === 'Dating' && 'Casual dating and getting to know people'}
                        {option === 'Serious Relationship' && 'Long-term relationship with the right person'}
                        {option === 'Marriage' && 'Ready to find a life partner'}
                        {option === 'New Friends' && 'Looking to expand your social circle'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">A little more about you</h2>
              <p className="text-gray-600">These details help improve your matches (optional)</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <div className="flex flex-wrap gap-2">
                  {RELIGION_OPTIONS.map((religion) => (
                    <Badge
                      key={religion}
                      variant={formData.religion === religion ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        formData.religion === religion
                          ? 'bg-trust text-white'
                          : 'hover:bg-trust/20'
                      }`}
                      onClick={() => updateFormData('religion', religion)}
                    >
                      {religion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <Input
                  value={formData.education}
                  onChange={(e) => updateFormData('education', e.target.value)}
                  placeholder="University, degree, etc."
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <Input
                  value={formData.profession}
                  onChange={(e) => updateFormData('profession', e.target.value)}
                  placeholder="Your job title"
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-trust/10 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 text-trust mr-2" />
                <h4 className="font-medium text-gray-900">Almost done!</h4>
              </div>
              <p className="text-sm text-gray-700">
                You're ready to start meeting amazing people. You can always update your profile later.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-light/20 via-white to-teal-light/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose to-rose-dark h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <Card className="p-6">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex-1 mr-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose"
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
            {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}