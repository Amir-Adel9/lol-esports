import express from 'express';
import axios from 'axios';
import LeagueMatch from '../../utilities/interfaces/leagueGameSchema';
import LeagueInfo from '../../utilities/interfaces/leagueInfoSchema';

const lpl = express.Router();

const headers = {
  credentials: 'omit',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0',
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
  },
  referrer: 'https://lolesports.com/',
  method: 'GET',
  mode: 'cors',
};

const LPL_ID = '98767991314006698';
const LPL_TOUR_ID = '108431300950695970';

const leaguesURL =
  'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US';
const lplScheduleURL = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${LPL_ID}`;
const lplStandingsURL = `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${LPL_TOUR_ID}`;

lpl.get('/', async (req, res) => {
  const leagueData = await axios
    .get(leaguesURL, headers)
    .then((res) => res.data.data.leagues)
    .catch((error) => console.log(error));

  const lplInfo = leagueData.filter(
    (league: LeagueInfo) => league.slug === 'lpl'
  );

  const scheduleData = await axios
    .get(lplScheduleURL, headers)
    .then((res) => res.data.data.schedule.events)
    .catch((error) => console.log(error));

  const lplSchedule = scheduleData;

  const unstartedMatches = lplSchedule.filter((match: LeagueMatch) => {
    return match.state === 'unstarted';
  });

  const standingsData = await axios
    .get(lplStandingsURL, headers)
    .then((res) => res.data.data.standings)
    .catch((error) => console.log(error));

  const lplStandings = standingsData;

  const lplData = {
    info: lplInfo,
    schedule: lplSchedule,
    standings: lplStandings,
  };

  res.send(lplData);
});

export default lpl;
