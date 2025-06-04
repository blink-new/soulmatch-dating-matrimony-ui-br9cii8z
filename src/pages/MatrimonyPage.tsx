import { useState } from 'react'
import { Grid3X3, List, MapPin, GraduationCap, Briefcase, Users, Download, Phone } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

const matrimonyProfiles = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Mumbai, Maharashtra',
    education: 'MBA - Finance',
    profession: 'Senior Financial Analyst',
    company: 'Goldman Sachs',
    salary: '₹15-20 LPA',
    height: '5\'4"',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    maritalStatus: 'Never Married',
    family: {
      father: 'Businessman',
      mother: 'Homemaker',
      siblings: '1 Sister (Married)',
      familyType: 'Nuclear Family',
      familyValues: 'Traditional'
    },
    horoscope: {
      rashi: 'Virgo',
      nakshatra: 'Hasta',
      manglik: 'No'
    },
    expectations: 'Looking for someone who values family traditions and has a stable career.',
    interests: ['Classical Music', 'Reading', 'Cooking', 'Travel'],
    verified: true
  },
  {
    id: '2',
    name: 'Ananya Reddy',
    age: 25,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hyderabad, Telangana',
    education: 'MBBS, MD - Pediatrics',
    profession: 'Pediatrician',
    company: 'Apollo Hospitals',
    salary: '₹18-25 LPA',
    height: '5\'6"',
    religion: 'Hindu',
    caste: 'Reddy',
    motherTongue: 'Telugu',
    maritalStatus: 'Never Married',
    family: {
      father: 'Retired Government Officer',
      mother: 'Professor',
      siblings: '1 Brother (Engineer)',
      familyType: 'Nuclear Family',
      familyValues: 'Moderate'
    },
    horoscope: {
      rashi: 'Libra',
      nakshatra: 'Chitra',
      manglik: 'Yes'
    },
    expectations: 'Seeking a well-educated partner who supports career aspirations.',
    interests: ['Medicine', 'Classical Dance', 'Painting', 'Social Work'],
    verified: true
  }
]

export default function MatrimonyPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sage/20 to-beige/30">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Matrimony</h2>
            <p className="text-gray-600 text-sm">Find your life partner</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 bg-white border-b border-gray-100">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Profiles */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'space-y-4'}>
          {matrimonyProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {viewMode === 'grid' ? (
                <div className="flex">
                  {/* Photo Section */}
                  <div className="w-32 h-40 relative">
                    <img 
                      src={profile.photos[0]} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                    {profile.verified && (
                      <div className="absolute top-2 right-2 bg-trust text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Info Section */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                      <Badge variant="secondary" className="text-xs">{profile.age} years</Badge>
                    </div>
                    
                    <div className="space-y-1 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        <span>{profile.education}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-3 h-3 mr-1" />
                        <span>{profile.profession}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          <Download className="w-3 h-3 mr-1" />
                          Biodata
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          <Phone className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button size="sm" className="bg-trust hover:bg-trust/90 text-white text-xs px-3">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img 
                        src={profile.photos[0]} 
                        alt={profile.name}
                        className="w-20 h-24 object-cover rounded-lg"
                      />
                      {profile.verified && (
                        <div className="absolute -top-2 -right-2 bg-trust text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{profile.name}, {profile.age}</h3>
                        <Badge className="bg-sage text-gray-700">{profile.height}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          <span>{profile.education}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{profile.profession}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{profile.religion} - {profile.caste}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{profile.expectations}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download Biodata
                          </Button>
                          <Button size="sm" variant="outline">
                            Request Family Contact
                          </Button>
                        </div>
                        <Button className="bg-trust hover:bg-trust/90 text-white">
                          Express Interest
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Family Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Family Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <span>Father: {profile.family.father}</span>
                      <span>Mother: {profile.family.mother}</span>
                      <span>Siblings: {profile.family.siblings}</span>
                      <span>Family Type: {profile.family.familyType}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}