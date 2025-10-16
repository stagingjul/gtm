import { supabase } from "@/lib/supabase";
import PlayersClient from "./PlayersClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPlayersByTeam(team: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('team', team)
    .order('goals', { ascending: false });

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return data;
}

export default async function PlayersPage({ params }: { params: Promise<{ team: string }> }) {
  const resolvedParams = await params;
  const team = decodeURIComponent(resolvedParams.team);
  const players = await getPlayersByTeam(team);

  return <PlayersClient team={team} players={players} />;
}

