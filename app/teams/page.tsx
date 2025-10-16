import { supabase } from "@/lib/supabase";
import TeamsClient from "./TeamsClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Team = {
  name: string;
  playerCount: number;
  totalGoals: number;
};

async function getTeams(): Promise<Team[]> {
  const { data, error } = await supabase
    .from('players')
    .select('team, goals')
    .not('team', 'is', null);

  if (error) {
    console.error('Error fetching teams:', error);
    return [];
  }

  // Group by team and calculate stats
  const teamStats = data.reduce((acc: Record<string, Team>, player: { team: string; goals: number | null }) => {
    if (!acc[player.team]) {
      acc[player.team] = {
        name: player.team,
        playerCount: 0,
        totalGoals: 0,
      };
    }
    acc[player.team].playerCount += 1;
    acc[player.team].totalGoals += player.goals || 0;
    return acc;
  }, {} as Record<string, Team>);

  return Object.values(teamStats);
}

export default async function Teams() {
  const teams = await getTeams();

  return <TeamsClient teams={teams} />;
}

