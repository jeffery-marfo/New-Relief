import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ChevronRight, X, Heart, Globe, Theater, Cross, Star, Gift, CheckCircle, Ticket } from 'lucide-react';
import EaglesWings from '../assets/images/EaglesWings.png';
import DramaFest from '../assets/images/DramaFest.jpg';
import Missions from '../assets/images/Missions.jpg';
import ServiceOnTheBlood from '../assets/images/ServiceOnTheBlood.jpg';
import { Link } from 'react-router';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Eagles Wings",
      tagline: "Soar to New Heights",
      category: "Youth Empowerment",
      date: "Annual Event",
      time: "Full Day Conference",
      location: "Main Auditorium",
      icon: Star,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: EaglesWings,
      description: "Eagles Wings is our annual Christian event focused on youth empowerment and evangelism. We believe in raising a generation of young believers who will soar like eagles, reaching new heights in their faith and impacting their world for Christ.",
      highlights: [
        "Dynamic worship and praise sessions",
        "Powerful youth-focused teachings",
        "Evangelistic outreach opportunities",
        "Networking with other young believers",
        "Interactive workshops and seminars"
      ],
      audience: "Youth and Young Adults",
      bookingUrl: "https://lu.ma/eagles-wings-2025",
      lumaEventId: "evt-3MElAbMQHAuItSd",
      registrationOpen: true
    },
    {
      id: 2,
      title: "DramaFest",
      tagline: "Stories That Transform Lives",
      category: "Drama & Arts",
      date: "Annual Festival",
      time: "Evening Performances",
      location: "Theater Hall",
      icon: Theater,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: DramaFest,
      description: "DramaFest is our annual event featuring powerful stage performances and stories designed to teach, inspire, and change lives. Using drama as a medium for evangelism, we present life-transforming lessons based on Christian principles through captivating theatrical productions.",
      highlights: [
        "Professional stage performances",
        "Biblical stories brought to life",
        "Evangelistic messages through drama",
        "Creative arts presentations",
        "Gospel-centered storytelling"
      ],
      audience: "All Ages Welcome",
      bookingUrl: "https://lu.ma/dramafest-2025",
      lumaEventId: "evt-XXXXX",
      registrationOpen: true
    },
    {
      id: 3,
      title: "Missions Outreach",
      tagline: "Taking the Gospel to the Nations",
      category: "Evangelism",
      date: "Annual Program",
      time: "Multi-Day Campaign",
      location: "Communities Across Ghana & Beyond",
      icon: Globe,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: Missions,
      description: "Our annual evangelical outreach program aimed at winning and nurturing souls in communities across Ghana and around the world. We take the Great Commission seriously, going into neighborhoods, villages, and cities to share the love of Christ and disciple new believers.",
      highlights: [
        "Door-to-door evangelism",
        "Open-air crusades and meetings",
        "Community service projects",
        "Discipleship and follow-up programs",
        "Church planting initiatives"
      ],
      audience: "Everyone - Join Us in Reaching the Lost",
      bookingUrl: "https://www.eventbrite.com/e/your-event-id",
      registrationOpen: true
    },
    {
      id: 4,
      title: "Service on the Blood",
      tagline: "The Power of the Blood",
      category: "Easter Convention",
      date: "Easter Weekend",
      time: "Good Friday & Resurrection Sunday",
      location: "Main Sanctuary",
      icon: Cross,
      color:"from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: ServiceOnTheBlood,
      description: "Our Easter convention focused on the Christian concept of the blood of Jesus. This spiritual event aims to have attendees experience the life-transforming power of the Blood that still speaks through teachings, prayers, and worship, celebrating the resurrection of Jesus Christ.",
      highlights: [
        "Deep biblical teachings on the Blood",
        "Powerful prayer and intercession sessions",
        "Worship celebrating the Resurrection",
        "Communion service",
        "Testimonies of transformation"
      ],
      audience: "All Believers & Seekers",
      bookingUrl: "https://www.eventbrite.com/e/your-event-id",
      registrationOpen: true
    },
    {
      id: 5,
      title: "Let God Arise",
      tagline: "When God Arises, Mountains Move",
      category: "Power Convention",
      date: "Annual Conference",
      time: "3-Day Program",
      location: "Convention Center",
      icon: Heart,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=500&fit=crop",
      description: "Let God Arise is a powerful annual conference where we gather to experience God's manifest presence and power. Through fervent worship, prophetic ministry, and anointed teachings, we witness God arising in the lives of His people, bringing breakthrough, healing, and deliverance.",
      highlights: [
        "Intensive worship and prayer",
        "Prophetic declarations",
        "Miraculous testimonies",
        "Anointed preaching",
        "Corporate breakthrough sessions"
      ],
      audience: "Believers Seeking Breakthrough",
      bookingUrl: "https://www.eventbrite.com/e/your-event-id",
      registrationOpen: true
    },
    {
      id: 6,
      title: "Christmas Service",
      tagline: "Celebrating the Birth of Our Savior",
      category: "Christmas Celebration",
      date: "December 25th",
      time: "Morning & Evening Services",
      location: "Main Sanctuary",
      icon: Gift,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=500&fit=crop",
      description: "Join us as we celebrate the birth of Jesus Christ, the greatest gift ever given to humanity. Our Christmas service is a joyful gathering filled with worship, carols, nativity presentations, and powerful messages about the true meaning of Christmas and God's love for the world.",
      highlights: [
        "Christmas carols and worship",
        "Nativity presentations",
        "Children's programs",
        "Special music performances",
        "Message on the birth of Christ",
        "Gift distribution to the community"
      ],
      audience: "Families & Community",
      bookingUrl: "https://www.eventbrite.com/e/your-event-id",
      registrationOpen: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Calendar className="mx-auto mb-4" size={64} />
          <h1 className="text-5xl font-bold mb-4">Our Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join us throughout the year as we gather to worship, learn, grow, and reach out with the Gospel. 
            Every event is an opportunity to experience God's presence and be part of His mission.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Icon className="text-gray-700" size={24} />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-blue-600 font-semibold mb-4 italic">{event.tagline}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-2 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${event.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                  >
                    Learn More
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <Users className="mx-auto mb-4" size={64} />
          <h2 className="text-4xl font-bold mb-4">Be Part of Something Greater</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every event is an opportunity to grow in faith, connect with believers, and impact lives for eternity. 
            Don't miss out on what God is doing through New Relief International!
          </p>
          <Link to="/contact-us" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
            Contact Us for More Info
          </Link>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/35 bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-72">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-black/20 opacity-80`}></div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-700" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                  {selectedEvent.category}
                </span>
                <h2 className="text-4xl font-bold mb-2">{selectedEvent.title}</h2>
                <p className="text-xl italic">{selectedEvent.tagline}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Event Info */}
              <div className={`grid md:grid-cols-3 gap-4 mb-8 p-6 ${selectedEvent.bgColor} border-2 ${selectedEvent.borderColor} rounded-xl`}>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-700" size={24} />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Date</p>
                    <p className="font-bold text-gray-900">{selectedEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-700" size={24} />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Time</p>
                    <p className="font-bold text-gray-900">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-700" size={24} />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Location</p>
                    <p className="font-bold text-gray-900">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedEvent.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Highlights</h3>
                <ul className="space-y-3">
                  {selectedEvent.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className={`text-blue-600 flex-shrink-0 mt-1`} size={20} />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audience */}
              <div className={`p-6 ${selectedEvent.bgColor} border-2 ${selectedEvent.borderColor} rounded-xl mb-6`}>
                <div className="flex items-center gap-3">
                  <Users className="text-gray-700" size={24} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Who Should Attend</p>
                    <p className="text-lg font-bold text-gray-900">{selectedEvent.audience}</p>
                  </div>
                </div>
              </div>

              {/* Registration Section */}
              <div className="space-y-4">
                {selectedEvent.registrationOpen && selectedEvent.lumaEventId ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Register for This Event</h3>
                    
                    {/* Embedded Luma Registration */}
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                      <iframe
                        src={`https://lu.ma/embed/event/${selectedEvent.lumaEventId}/simple`}
                        width="100%"
                        height="450"
                        frameBorder="0"
                        style={{ border: '1px solid #bfcbda88', borderRadius: '8px' }}
                        allow="fullscreen; payment"
                        aria-hidden="false"
                        tabIndex="0"
                      ></iframe>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                        <div className="text-sm text-green-800">
                          <p className="font-bold mb-2">✓ What Happens After Registration:</p>
                          <ul className="space-y-1 ml-4 list-disc">
                            <li><strong>Instant confirmation email</strong> with your unique ticket ID</li>
                            <li><strong>Calendar invite</strong> automatically added (Google, Apple, Outlook)</li>
                            <li><strong>Event reminders</strong> sent before the date</li>
                            <li><strong>Digital ticket</strong> - show on your phone or print it</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      href={selectedEvent.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full bg-gradient-to-r ${selectedEvent.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all text-center`}
                    >
                      Register Now - Get Your Ticket
                    </a>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                        <div className="text-sm text-green-800">
                          <p className="font-bold mb-1">✓ What You'll Get:</p>
                          <ul className="space-y-1 ml-4 list-disc">
                            <li>Instant email confirmation with unique ticket ID</li>
                            <li>Automatic calendar sync (Google, Apple, Outlook)</li>
                            <li>Event reminders before the date</li>
                            <li>Digital ticket (show on phone or print)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;