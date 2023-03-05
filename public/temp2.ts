import { DataProps } from './temp'

const dat: DataProps[] = [
  {
    league: 'premier-league',
    name: 'Premier League',
    matches: [
      {
        team1: 'Southampton',
        team2: 'Leicester City',
        score1: 1,
        score2: 0,
      },
    ],
  },
  {
    league: 'la-liga',
    name: 'La Liga',
    matches: [
      {
        team1: 'Mallorca',
        team2: 'Elche',
        score1: 0,
        score2: 1,
      },
      {
        team1: 'Atlético Madrid',
        team2: 'Sevilla',
        score1: 6,
        score2: 1,
      },
    ],
  },
  {
    league: 'league-1',
    name: 'League 1',
    matches: [
      {
        team1: 'PSG',
        team2: 'Nantes',
        score1: 4,
        score2: 2,
      },
    ],
  },

  {
    league: 'serie-a',
    name: 'Serie A',
    matches: [
      {
        team1: 'Fiorentina',
        team2: 'Milan',
        score1: 2,
        score2: 1,
      },
    ],
  },
  {
    league: 'bundesliga',
    name: 'Bundesliga',
    matches: [
      {
        team1: 'Stuttgart',
        team2: 'Bayern München',
        score1: 1,
        score2: 2,
      },
    ],
  },
]

export default dat
