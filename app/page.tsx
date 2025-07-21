
'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Heart, Download, Star, Sparkles, Ban, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TwoGisIcon from './icons/2gis';
import YandexIcon from './icons/yandex';
import GoogleIcon from './icons/google';
import AppleCalendar from './icons/AppleCalendar';

export default function Home() {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isJackboxSheetOpen, setIsJackboxSheetOpen] = useState(false);

  // Native JS date formatting functions
  const formatDateForCalendar = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeForDisplay = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Event details - customize these for your event
  const eventDetails = {
    title: "Скайлер получил зарплату! ",
    subtitle: "Отмечаем мою первую официальную зарплату с размахом!",
    date: new Date(2025, 7, 7, 20, 0),
    location: "Дом Скайлера",
    address: "Микрорайон 12, Дом 2, квартира 19",
    description: "Я получил свою первую официальную зарплату и хочу отметить это с вами! Будет уютно, весело и вкусно. Приходите — без вашей компании не обойдусь! 💸",
    mapLinks: {
      gis2: "https://go.2gis.com/XZHXd", // Add your 2GIS link here
      yandex: "https://yandex.kz/maps/-/CHHLRZ~H" // Add your Yandex Maps link here
    },
    tableGames: [
      { id: 1, name: "Бункер", image: "https://simg.marwin.kz/media/catalog/product/6/0/mir_hobbi_bunker.jpg" },
      { id: 2, name: "500 злобных карт", image: "https://simg.marwin.kz/media/catalog/product/3/_/cosmodrome_games_500_zlobnyh_kart_versiya_30.jpg" },
      { id: 3, name: "Манчкин", image: "https://hobbygames.kz/image/cache/hobbygames_beta/data/HobbyWorld/Munchkin/Munchkin/Munchkin00-1024x1024-wm.jpg" },
      // { id: 4, name: "Игра 4", image: "/api/placeholder/150/100" }
    ],
    jackboxImages: [
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000166/e2a2fbd908e1d5f21de9c673211deeb8ab78d82f01df82c6b8e9e98048e7f12e", // Add your first Jackbox game screenshot URL here
      "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/ca6171a0201cf35dca269ea20c41d58f.jpg"  // Add your second Jackbox game screenshot URL here
    ]
  };

  const generateGoogleCalendarUrl = () => {
    const startDate = formatDateForCalendar(eventDetails.date);
    const endDate = formatDateForCalendar(new Date(eventDetails.date.getTime() + 3 * 60 * 60 * 1000)); // 3 hours later

    const details = `${eventDetails.description}\n\nLocation: ${eventDetails.address}`;

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.title,
      dates: `${startDate}/${endDate}`,
      details: details,
      location: eventDetails.address,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICSFile = () => {
    const startDate = formatDateForCalendar(eventDetails.date);
    const endDate = formatDateForCalendar(new Date(eventDetails.date.getTime() + 3 * 60 * 60 * 1000));

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Personal Invitation//EN
BEGIN:VEVENT
UID:${Date.now()}@personalinvite.com
DTSTAMP:${formatDateForCalendar(new Date())}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}\\n\\nLocation: ${eventDetails.address}
LOCATION:${eventDetails.address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invitation.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRSVP = () => {
    setIsRSVPed(true);
    // Here you could integrate with a backend to store RSVP responses
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-red-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 4 }}
        ></motion.div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header with decorative elements */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-red-400 absolute -top-2 -left-2" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-12 h-12 text-red-500" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6 text-white/80 absolute -bottom-1 -right-1" />
                </motion.div>
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-red-500 via-white to-red-400 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {eventDetails.title}
            </motion.h1>
            <motion.p
              className="text-xl text-white/80 font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {eventDetails.subtitle}
            </motion.p>
          </motion.div>

          {/* Main invitation card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 ring-1 ring-red-500/20"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {/* Event details */}
            <div className="space-y-6 mb-8">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <motion.div
                  className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="w-6 h-6 text-red-400" />
                </motion.div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {formatDateForDisplay(eventDetails.date).charAt(0).toUpperCase() + formatDateForDisplay(eventDetails.date).slice(1)}
                  </p>
                  <p className="text-white/70">Сохраните дату!</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <motion.div
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Clock className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {formatTimeForDisplay(eventDetails.date)}
                  </p>
                  <p className="text-white/70">Опаздывайте!</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              >
                <motion.div
                  className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="w-6 h-6 text-red-400" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{eventDetails.location}</p>
                  <p className="text-white/70 mb-3">{eventDetails.address}</p>

                  {/* Map links */}
                  <div className="flex flex-wrap gap-2">
                    <motion.a
                      href={eventDetails.mapLinks.gis2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-sm border border-green-500/30 text-green-300 hover:text-green-200 px-3 py-1 rounded-full text-sm transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-4 h-4">
                        <TwoGisIcon />
                      </div>
                      <span>2ГИС</span>
                    </motion.a>
                    <motion.a
                      href={eventDetails.mapLinks.yandex}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/30 text-red-300 hover:text-red-200 px-3 py-1 rounded-full text-sm transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-4 h-4">
                        <YandexIcon />
                      </div>
                      <span>Яндекс.Карты</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              className="bg-gradient-to-r from-red-500/10 to-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
            >
              <p className="text-white/90 leading-relaxed text-center text-lg">
                {eventDetails.description}
              </p>
            </motion.div>

            {/* No Alcohol Notice */}
            <motion.div
              className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-red-500/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.1, type: "spring", bounce: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <motion.div
                  className="p-2 bg-red-500/20 rounded-full"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Ban className="w-6 h-6 text-red-400" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold text-red-300 mb-1">Безалкогольная вечеринка</h3>
                  <p className="text-white/70 text-sm">Веселимся без алкоголя! 🎉</p>
                </div>
              </div>
            </motion.div>

            {/* Games Section */}
            <motion.div
              className="mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.3 }}
            >
              <motion.h3
                className="text-xl font-semibold text-white text-center mb-6 flex items-center justify-center space-x-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2.5, type: "spring", bounce: 0.4 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Gamepad2 className="w-6 h-6 text-red-400" />
                </motion.div>
                <span>Что нас ждёт?</span>
              </motion.h3>

              {/* Table Games */}
              <div className="mb-6">
                <motion.h4
                  className="text-lg font-semibold text-white/90 mb-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.7 }}
                >
                  Настольные игры
                </motion.h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {eventDetails.tableGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:border-red-500/30 transition-all duration-200 hover:bg-white/15"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="aspect-[3/2] bg-gradient-to-br from-red-500/20 to-white/20 rounded-lg mb-2 flex items-center justify-center border border-white/20 overflow-hidden relative"
                        whileHover={{
                          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(255, 255, 255, 0.3))"
                        }}
                      >
                        {game.image && !game.image.includes('/api/placeholder') ? (
                          <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-white/50 text-xs text-center">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            >
                              <Gamepad2 className="w-6 h-6 mx-auto mb-1" />
                            </motion.div>
                            <span>Фото игры</span>
                          </div>
                        )}
                      </motion.div>
                      <p className="text-white/80 text-sm text-center font-medium">{game.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Jackbox Games */}
              <motion.div
                className="bg-gradient-to-br from-purple-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 cursor-pointer relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 3.3, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsJackboxSheetOpen(true)}
              >
                {/* Click me indicator */}
                <motion.div
                  className="absolute top-3 right-3 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CLICK ME! 👆
                </motion.div>

                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-red-500/20 rounded-full mb-4 border border-purple-500/30"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Gamepad2 className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <motion.h4
                    className="text-xl font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.5 }}
                  >
                    JACKBOX PARTY GAMES!
                  </motion.h4>
                  <motion.p
                    className="text-purple-300 font-semibold mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.7 }}
                  >
                    🎮 Играем онлайн всей компанией!
                  </motion.p>
                  <motion.p
                    className="text-white/70 text-sm leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.9 }}
                  >
                    Весёлые мини-игры на телефоне и компьютере.<br />
                    Викторины, рисование, импровизация и много смеха!
                  </motion.p>
                  <motion.div
                    className="mt-4 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 4.1, type: "spring", bounce: 0.5 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-purple-500/20 to-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(168, 85, 247, 0.4)",
                          "0 0 0 10px rgba(168, 85, 247, 0)",
                          "0 0 0 0 rgba(168, 85, 247, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-purple-300 text-sm font-medium">Готовьтесь к веселью! 🎉</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Calendar integration buttons */}
            <motion.div
              className="space-y-4 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.3 }}
            >
              <h3 className="text-lg font-semibold text-white text-center mb-4">
                Добавить в календарь
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
                  className="flex items-center justify-center space-x-2 bg-blue-500/80 hover:bg-blue-500 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 4.5 }}
                >
                  <div className="w-5 h-5">
                    <GoogleIcon />
                  </div>
                  <span>Google</span>
                </motion.button>
                <motion.button
                  onClick={generateICSFile}
                  className="flex items-center justify-center space-x-2 bg-gray-700/80 hover:bg-gray-700 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-600/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 4.7 }}
                >
                  <div className="w-5 h-5">
                    <AppleCalendar />
                  </div>
                  <span>Apple</span>
                </motion.button>
              </div>
            </motion.div>

            {/* RSVP Button */}
            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.9 }}
            >
              <AnimatePresence mode="wait">
                {!isRSVPed ? (
                  <motion.button
                    key="rsvp-button"
                    onClick={handleRSVP}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 backdrop-blur-sm text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-500/30"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(255,255,255,0)",
                          "0 0 10px rgba(255,255,255,0.5)",
                          "0 0 0px rgba(255,255,255,0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Подтвердить участие ✨
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="rsvp-success"
                    className="text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
                  >
                    <motion.div
                      className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm text-green-300 px-6 py-3 rounded-full border border-green-500/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.4)",
                          "0 0 0 15px rgba(34, 197, 94, 0)",
                          "0 0 0 0 rgba(34, 197, 94, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.div>
                      <span className="font-semibold">Спасибо за подтверждение!</span>
                    </motion.div>
                    <motion.p
                      className="text-white/70 mt-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Ждём вас на празднике!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 5.1 }}
          >
            <motion.p
              className="text-sm"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Увидимся там! 💕
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Jackbox Info Bottom Sheet */}
      <AnimatePresence>
        {isJackboxSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJackboxSheetOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-purple-950/90 to-red-950/90 backdrop-blur-xl border-t border-white/20 z-50 max-h-[85vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>

              <div className="px-6 pb-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/30 to-red-500/30 rounded-full mb-4 border border-purple-500/40"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Gamepad2 className="w-10 h-10 text-purple-300" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                    JACKBOX PARTY PACK
                  </h2>
                  <p className="text-white/80 text-lg">Самые крутые игры для вечеринок! 🎉</p>
                </div>

                {/* Content */}
                <div className="space-y-8 max-w-2xl mx-auto">
                  {/* Image 1 */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden border border-purple-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {eventDetails.jackboxImages[0] ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={eventDetails.jackboxImages[0]}
                          alt="Jackbox Party Games Screenshot 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-red-500/20 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <Gamepad2 className="w-16 h-16 mx-auto mb-2" />
                          <p className="text-sm">Jackbox Screenshot 1</p>
                          <p className="text-xs">Add URL to eventDetails.jackboxImages[0]</p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Paragraph 1 */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-white/90 leading-relaxed text-lg">
                      <span className="text-purple-300 font-bold">Внимание, геймеры!</span> 🎮
                      Jackbox Party Pack — это не просто игры, это целая вселенная безумного веселья!
                      Представьте: вы рисуете что-то невообразимое, а друзья пытаются угадать, что это.
                      Или отвечаете на вопросы викторины настолько нелепо, что все падают от смеха!
                      <span className="text-red-300 font-semibold">Это магия интерактивных развлечений!</span> ✨
                    </p>
                  </motion.div>

                  {/* Image 2 */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden border border-red-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {eventDetails.jackboxImages[1] ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={eventDetails.jackboxImages[1]}
                          alt="Jackbox Party Games Screenshot 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <Heart className="w-16 h-16 mx-auto mb-2" />
                          <p className="text-sm">Jackbox Screenshot 2</p>
                          <p className="text-xs">Add URL to eventDetails.jackboxImages[1]</p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Paragraph 2 */}
                  <motion.div
                    className="bg-gradient-to-r from-red-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-white/90 leading-relaxed text-lg">
                      <span className="text-red-300 font-bold">Секрет успеха?</span> 🎯
                      Все очень просто! Никаких сложных правил или долгих объяснений.
                      Достаёте телефон, заходите на сайт, вводите код комнаты — и вуаля!
                      Вы уже в игре! <span className="text-purple-300 font-semibold">От 3 до 10 игроков одновременно</span>,
                      каждый со своим устройством. Идеально для любой компании! 🚀
                    </p>
                  </motion.div>

                  {/* Paragraph 3 */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-white/90 leading-relaxed text-lg">
                      <span className="text-pink-300 font-bold">Готовьтесь к эмоциям!</span> 😂
                      Мы будем играть в самые хитовые игры из коллекции:
                      <span className="text-yellow-300 font-semibold">Quiplash</span> (битва остроумия),
                      <span className="text-green-300 font-semibold">Drawful</span> (рисовалки-угадайки),
                      и <span className="text-blue-300 font-semibold">Fibbage</span> (ложь и правда)!
                      Поверьте, после этого вечера у нас будет много новых мемов и внутренних шуток!
                      <span className="text-purple-300 font-bold">Приготовьтесь смеяться до слёз!</span> 🤣💖
                    </p>
                  </motion.div>

                  {/* Close Button */}
                  <motion.div
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button
                      onClick={() => setIsJackboxSheetOpen(false)}
                      className="bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Понятно, жду не дождусь! 🎉
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* Enhanced glassmorphism effects */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
