export const port = 80
export const domain = 'football.local.com'

export const listLeague = `http://${domain}:${port}/api/league/list`
export const listMatchByDay = 'http://football.local.com:80/api/match/list_matches_by_day'
export const listMatchByLeague = 'http://football.local.com:80/api/match/list_matches_by_league'
export const playerInfo = 'http://football.local.com:80/api/footballer/info'
export const clubInfo = 'http://football.local.com:80/api/club/info'
export const playerOfClub = 'http://football.local.com:80/api/club/listFootballer'
export const listPost = (page: number) => `http://football.local.com:80/api/post/get_post_list?page=${page}`
export const listPostByClub = (id: number) => `http://football.local.com:80/api/post/get_club_post/${id}`
export const listPostByPlayer = (id: number) => `http://football.local.com:80/api/post/get_footballer_post/${id}`
export const followingClub = 'http://football.local.com:80/api/followings/get_followings_club'
export const followingPlayer = 'http://football.local.com:80/api/followings/get_followings_footballer'
export const recommendedClub = 'http://football.local.com:80/api/followings/get_suggested_club'
export const recommendedPlayer = 'http://football.local.com:80/api/followings/get_suggested_player'
export const login = 'http://football.local.com:80/api/auth/login'
export const getComment = 'http://football.local.com:80/api/comment/list_comment'
export const addComment = 'http://football.local.com:80/api/comment/add'
export const logOutUrl = 'http://football.local.com:80/api/auth/logout'
export const signupUrl = 'http://football.local.com:80/api/auth/signup'
