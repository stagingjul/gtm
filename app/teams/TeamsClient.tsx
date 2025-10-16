"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type Team = {
  name: string;
  playerCount: number;
  totalGoals: number;
};

export default function TeamsClient({ teams }: { teams: Team[] }) {
  const colors = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
  ];

  const teamLogos: { [key: string]: string } = {
    "Inter Miami": "🦩",
    "Al Nassr": "⚡",
    "Al Hilal": "🌙",
    "Manchester City": "💙",
    "Liverpool": "❤️",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * 1080],
              opacity: [null, Math.random() * 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/" data-gtm-nav="back_to_home_from_teams" id="gtm-teams-back-home">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-7xl md:text-9xl font-extrabold text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(249, 115, 22, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.5)",
                "0 0 20px rgba(249, 115, 22, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
              ⚽ Teams
            </span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-orange-500/20 backdrop-blur-lg border border-orange-500/30 rounded-full px-6 py-3"
          >
            <p className="text-2xl text-orange-200 font-semibold">
              {teams.length} Teams Available
            </p>
          </motion.div>
        </motion.div>

        {teams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-4xl text-white/50">No teams found</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team: Team, index: number) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${colors[index % colors.length]} rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />

                <Link 
                  href={`/players/${encodeURIComponent(team.name)}`}
                  data-gtm-team={team.name}
                  id={`gtm-team-${team.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all shadow-2xl h-full overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />

                    <div className="relative z-10">
                      <motion.div
                        className="text-8xl mb-6 text-center"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {teamLogos[team.name] || "⚽"}
                      </motion.div>

                      <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
                        <motion.span
                          className={`bg-clip-text text-transparent bg-gradient-to-r ${colors[index % colors.length]}`}
                        >
                          {team.name}
                        </motion.span>
                      </h2>

                      <div className="space-y-4 mb-6">
                        <motion.div
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between bg-white/5 rounded-2xl p-4 backdrop-blur-sm"
                        >
                          <span className="text-gray-300 font-semibold flex items-center gap-2">
                            <span className="text-2xl">👥</span> Players
                          </span>
                          <motion.span
                            className="text-3xl font-bold text-white"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          >
                            {team.playerCount}
                          </motion.span>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between bg-white/5 rounded-2xl p-4 backdrop-blur-sm"
                        >
                          <span className="text-gray-300 font-semibold flex items-center gap-2">
                            <span className="text-2xl">⚽</span> Goals
                          </span>
                          <motion.span
                            className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors[index % colors.length]}`}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3 + 0.5,
                            }}
                          >
                            {team.totalGoals}
                          </motion.span>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-4 bg-gradient-to-r ${colors[index % colors.length]} text-white rounded-2xl font-bold text-lg shadow-2xl text-center group-hover:shadow-3xl transition-all flex items-center justify-center gap-2`}
                      >
                        <span>View Players</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Total Teams", value: teams.length, icon: "🏆" },
            {
              label: "Total Players",
              value: teams.reduce((sum: number, team: Team) => sum + team.playerCount, 0),
              icon: "⚽",
            },
            {
              label: "Total Goals",
              value: teams.reduce((sum: number, team: Team) => sum + team.totalGoals, 0),
              icon: "🎯",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <motion.div
                className="text-5xl font-bold text-white mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

