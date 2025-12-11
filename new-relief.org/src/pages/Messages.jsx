import React, { useState } from 'react';
import { Search, X, Calendar, User, BookOpen, Play } from 'lucide-react';
import FAITHH from '../assets/images/FAITHH.jpg';
import NextLevel from '../assets/images/NextLevel.jpg';
import MattersOfTheHeart from '../assets/images/MattersOfTheHeart.jpg';

const Messages = () => {
  // Mock sermon data - replace with your actual data from database
  const allSermons = [
    {
      id: 1,
      title: "The Next Level",
      speaker: "Pastor Richmond Korley",
      date: "2025-11-02",
      series: "Next Level Series",
      description: "You can't reach the next level while remaining comfortable and attached to the old level.",
      spotifyUrl: "https://open.spotify.com/embed/episode/6ja8fcuWaKvCH92gqKP88S?utm_source=generator",
      thumbnail: NextLevel
    },
    {
      id: 2,
      title: "TAKE STEPS OF FAITH.",
      speaker: "Pastor Emmanuel Arthur",
      date: "2025-11-08",
      series: "Faith Series",
      description: "We specially welcome you to the month of November and our theme for the month is TAKE STEPS OF FAITH",
      spotifyUrl: "https://open.spotify.com/embed/episode/65ghZFaAootxFfZuHH0s9r?utm_source=generator",
      thumbnail: FAITHH 
    },
    {
        id: 3,
        title: "Matters of The Heart",
        speaker: "Pastor Richmond Korley",
        date: "2025-11-02",
        series: "Next Level Series",
        description: "We often talk about loving God and loving others, but where does that love truly originate?",
        spotifyUrl: "https://open.spotify.com/embed/episode/2YhrQwdiVK4PKJUc1pNqIT?utm_source=generator",
        thumbnail: MattersOfTheHeart
      },
    {
        id: 4,
        title: "TAKE STEPS OF FAITH.",
        speaker: "Pastor Joseph Mensah",
        date: "2025-11-08",
        series: "Faith Series",
        description: "We specially welcome you to the month of November and our theme for the month is TAKE STEPS OF FAITH",
        spotifyUrl:"https://open.spotify.com/embed/episode/65ghZFaAootxFfZuHH0s9r?utm_source=generator",
        thumbnail: FAITHH
      },
      {
        id: 5,
        title: "The Next Level",
        speaker: "Pastor Leonard",
        date: "2025-11-02",
        series: "Next Level Series",
        description: "You can't reach the next level while remaining comfortable and attached to the old level.",
        spotifyUrl: "https://open.spotify.com/embed/episode/6ja8fcuWaKvCH92gqKP88S?utm_source=generator",
        thumbnail: NextLevel
      },
      {
        id: 6,
        title: "TAKE STEPS OF FAITH.",
        speaker: "Pastor Eric Eghan",
        date: "2025-11-08",
        series: "Faith Series",
        description: "We specially welcome you to the month of November and our theme for the month is TAKE STEPS OF FAITH",
        spotifyUrl: "https://open.spotify.com/embed/episode/65ghZFaAootxFfZuHH0s9r?utm_source=generator",
        thumbnail: FAITHH
      }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');
  const [selectedSermon, setSelectedSermon] = useState(null);

  // Get unique series and speakers for filters
  const allSeries = ['All', ...new Set(allSermons.map(s => s.series))];
  const allSpeakers = ['All', ...new Set(allSermons.map(s => s.speaker))];

  // Filter sermons based on search and filters
  const filteredSermons = allSermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = selectedSeries === 'All' || sermon.series === selectedSeries;
    const matchesSpeaker = selectedSpeaker === 'All' || sermon.speaker === selectedSpeaker;
    
    return matchesSearch && matchesSeries && matchesSpeaker;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto mt-12">
          <h1 className="text-5xl font-bold mb-4">Messages</h1>
          <p className="text-xl text-blue-100">Listen to transformative teachings from our pastoral team</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search messages by title, speaker, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="inline mr-2" size={16} />
                Filter by Series
              </label>
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                {allSeries.map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline mr-2" size={16} />
                Filter by Speaker
              </label>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                {allSpeakers.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSermons.length} of {allSermons.length} messages
          </div>
        </div>
      </div>

      {/* Sermon Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map(sermon => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
              onClick={() => setSelectedSermon(sermon)}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
                <img 
                  src={sermon.thumbnail} 
                  alt={sermon.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="text-white" size={48} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {sermon.series}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {sermon.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {sermon.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-700 text-sm">
                    <User size={16} className="mr-1" />
                    <span className="font-medium">{sermon.speaker}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(sermon.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredSermons.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No messages found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Sermon Player Modal */}
      {selectedSermon && (
        <div 
          className="fixed inset-0 bg-black bg-black/35 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSermon(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-full inline-block mb-3">
                    {selectedSermon.series}
                  </span>
                  <h2 className="text-3xl font-bold mb-2">{selectedSermon.title}</h2>
                  <div className="flex items-center gap-4 text-blue-100">
                    <div className="flex items-center">
                      <User size={18} className="mr-2" />
                      <span>{selectedSermon.speaker}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2" />
                      <span>{new Date(selectedSermon.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSermon(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {selectedSermon.description}
              </p>

              {/* Spotify Player */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <iframe
                  src={selectedSermon.spotifyUrl}
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg w-full h-56 sm:h-64 md:h-72"
                  title="Spotify player"
                ></iframe>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> You'll need a Spotify account (free or premium) to listen. If the player doesn't load, try opening Spotify directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;