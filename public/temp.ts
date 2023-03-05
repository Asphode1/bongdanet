import { MatchItemProps } from '../src/components/schedulePage/matchItem'

export interface DataProps {
  league: string
  name: string
  matches: MatchItemProps[]
}

const dat: DataProps[] = [
  {
    league: 'premier-league',
    name: 'Premier League',
    matches: [
      {
        team1: 'Nottingham Forest',
        team2: 'Everton',
        score1: null,
        score2: null,
      },
      {
        team1: 'Liverpool',
        team2: 'Manchester United',
        score1: null,
        score2: null,
      },
    ],
  },
  {
    league: 'la-liga',
    name: 'La Liga',
    matches: [
      {
        team1: 'Real Valladolid',
        team2: 'Espanyol',
        score1: null,
        score2: null,
      },
      {
        team1: 'Barcelona',
        team2: 'Valencia',
        score1: null,
        score2: null,
      },
      {
        team1: 'Rayo Vallecano',
        team2: 'Athletic Club',
        score1: null,
        score2: null,
      },
      {
        team1: 'Real Betis',
        team2: 'Real Madrid',
        score1: null,
        score2: null,
      },
    ],
  },
  {
    league: 'serie-a',
    name: 'Serie A',
    matches: [
      {
        team1: 'Spezia',
        team2: 'Hellas Verona',
        score1: null,
        score2: null,
      },
      {
        team1: 'Sampdoria',
        team2: 'Salernitana',
        score1: null,
        score2: null,
      },
      {
        team1: 'Inter Milan',
        team2: 'Lecce',
        score1: null,
        score2: null,
      },
      {
        team1: 'Roma',
        team2: 'Juventus',
        score1: null,
        score2: null,
      },
    ],
  },
  {
    league: 'bundesliga',
    name: 'Bundesliga',
    matches: [
      {
        team1: 'Bayer Leverkusen',
        team2: 'Hertha BSC',
        score1: null,
        score2: null,
      },
      {
        team1: 'Wolfsburg',
        team2: 'Eintracht Frankfurt',
        score1: null,
        score2: null,
      },
    ],
  },
]

export default dat
