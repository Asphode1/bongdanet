export interface MatchProps {
	team1: string
	team2: string
	date: string
	team1Rate: number
	team2Rate: number
	drawRate: number
}

export interface DataProps {
	league: string
	name: string
	matches: MatchProps[]
}

const dat: DataProps[] = [
	{
		league: 'premier-league',
		name: 'Premier League',
		matches: [
			{
				team1: 'Nottingham Forest',
				team2: 'Everton',
				team1Rate: 0.5,
				team2Rate: 0.25,
				drawRate: 0.25,
				date: '5-3-2023',
			},
			{
				team1: 'Liverpool',
				team2: 'Manchester United',
				team1Rate: 0.4,
				team2Rate: 0.4,
				drawRate: 0.2,
				date: '5-3-2023',
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
				team1Rate: 0.15,
				team2Rate: 0.77,
				drawRate: 0.08,
				date: '5-3-2023',
			},
			{
				team1: 'Barcelona',
				team2: 'Valencia',
				team1Rate: 0.83,
				team2Rate: 0.07,
				drawRate: 0.1,
				date: '5-3-2023',
			},
			{
				team1: 'Rayo Vallecano',
				team2: 'Athletic Club',
				team1Rate: 0.22,
				team2Rate: 0.7,
				drawRate: 0.08,
				date: '5-3-2023',
			},
			{
				team1: 'Real Betis',
				team2: 'Real Madrid',
				team1Rate: 0.1,
				team2Rate: 0.73,
				drawRate: 0.17,
				date: '5-3-2023',
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
				team1Rate: 0.25,
				team2Rate: 0.29,
				drawRate: 0.46,
				date: '5-3-2023',
			},
			{
				team1: 'Sampdoria',
				team2: 'Salernitana',
				team1Rate: 0.39,
				team2Rate: 0.47,
				drawRate: 0.14,
				date: '5-3-2023',
			},
			{
				team1: 'Inter Milan',
				team2: 'Lecce',
				team1Rate: 0.59,
				team2Rate: 0.15,
				drawRate: 0.26,
				date: '5-3-2023',
			},
			{
				team1: 'Roma',
				team2: 'Juventus',
				team1Rate: 0.22,
				team2Rate: 0.4,
				drawRate: 0.36,
				date: '5-3-2023',
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
				team1Rate: 0.54,
				team2Rate: 0.27,
				drawRate: 0.19,
				date: '5-3-2023',
			},
			{
				team1: 'Wolfsburg',
				team2: 'Eintracht Frankfurt',
				team1Rate: 0.34,
				team2Rate: 0.4,
				drawRate: 0.26,
				date: '5-3-2023',
			},
		],
	},
]

export default dat
