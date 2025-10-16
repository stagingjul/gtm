"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Player } from "@/lib/supabase";

export default function PlayersClient({ team, players }: { team: string; players: Player[] }) {
  const positionColors: { [key: string]: string } = {
    "Forward": "from-red-500 to-orange-500",
    "Midfielder": "from-blue-500 to-cyan-500",
    "Defender": "from-green-500 to-emerald-500",
    "Goalkeeper": "from-purple-500 to-pink-500",
  };

  const positionEmojis: { [key: string]: string } = {
    "Forward": "⚡",
    "Midfielder": "🎯",
    "Defender": "🛡️",
    "Goalkeeper": "🧤",
  };

  const teamLogos: { [key: string]: string } = {
    "Inter Miami": "🦩",
    "Al Nassr": "⚡",
    "Al Hilal": "🌙",
    "Manchester City": "💙",
    "Liverpool": "❤️",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
              opacity: Math.random() * 0.3,
              scale: Math.random(),
            }}
            animate={{
              y: [null, -100, 1180],
              opacity: [null, Math.random() * 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex gap-4 mb-8">
          <Link href="/" data-gtm-nav="back_to_home" id="gtm-back-home">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
            >
              ← Home
            </motion.button>
          </Link>
          <Link href="/teams" data-gtm-nav="back_to_teams" id="gtm-back-teams">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
            >
              ← Back to Teams
            </motion.button>
          </Link>
        </div>

        {/* Team Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            className="text-9xl mb-6 inline-block"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {teamLogos[team] || "⚽"}
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-extrabold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(236, 72, 153, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
              {team}
            </span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-purple-500/20 backdrop-blur-lg border border-purple-500/30 rounded-full px-8 py-4"
          >
            <p className="text-3xl text-purple-200 font-bold">
              {players.length} Players in Squad
            </p>
          </motion.div>
        </motion.div>

        {players.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-4xl text-white/50">No players found for this team</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player: Player, index: number) => {
              const position = player.position || "Forward";
              const colorGradient = positionColors[position] || positionColors["Forward"];
              const positionEmoji = positionEmojis[position] || "⚽";

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  whileHover={{ y: -20, scale: 1.05 }}
                  className="group relative"
                  data-gtm-player={player.name}
                  data-gtm-player-team={player.team}
                  id={`gtm-player-${player.id}`}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${colorGradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity`}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />

                  <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all shadow-2xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />

                    {/* Rank badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.08, type: "spring" }}
                      className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    >
                      #{index + 1}
                    </motion.div>

                    <div className="relative z-10">
                      {/* Position badge */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colorGradient} rounded-full mb-4 shadow-lg`}
                      >
                        <span className="text-2xl">{positionEmoji}</span>
                        <span className="text-white font-bold">{position}</span>
                      </motion.div>

                      {/* Player name */}
                      <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">
                        {player.name}
                      </h2>

                      {/* Stats */}
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between bg-white/5 rounded-2xl p-4 backdrop-blur-sm"
                        >
                          <span className="text-gray-300 font-semibold flex items-center gap-2">
                            <span className="text-2xl">⚽</span> Goals
                          </span>
                          <motion.span
                            className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorGradient}`}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          >
                            {player.goals}
                          </motion.span>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between bg-white/5 rounded-2xl p-4 backdrop-blur-sm"
                        >
                          <span className="text-gray-300 font-semibold flex items-center gap-2">
                            <span className="text-2xl">🏆</span> Team
                          </span>
                          <span className="text-white font-bold text-lg">
                            {player.team}
                          </span>
                        </motion.div>
                      </div>

                      {/* Performance bar */}
                      <div className="mt-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Performance</span>
                          <span>{Math.min(player.goals * 10, 100)}%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(player.goals * 10, 100)}%` }}
                            transition={{ delay: 0.8 + index * 0.08, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${colorGradient} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* Player card footer */}
                      <motion.div
                        className="mt-6 pt-6 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.08 }}
                      >
                        <p className="text-gray-400 text-sm">
                          Joined: {new Date(player.created_at).toLocaleDateString()}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Team Stats Summary */}
        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-20 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-5xl font-extrabold text-white mb-8">Team Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="text-6xl mb-2">👥</div>
                <div className="text-5xl font-bold text-white mb-2">{players.length}</div>
                <div className="text-white/90 font-semibold">Total Players</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="text-6xl mb-2">⚽</div>
                <div className="text-5xl font-bold text-white mb-2">
                  {players.reduce((sum, p) => sum + p.goals, 0)}
                </div>
                <div className="text-white/90 font-semibold">Total Goals</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="text-6xl mb-2">🌟</div>
                <div className="text-5xl font-bold text-white mb-2">
                  {(players.reduce((sum, p) => sum + p.goals, 0) / players.length).toFixed(1)}
                </div>
                <div className="text-white/90 font-semibold">Avg Goals/Player</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

