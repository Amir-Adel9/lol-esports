import express from 'express';
import axios from 'axios';
import LeagueMatch from '../../utilities/interfaces/leagueGameSchema';
import LeagueInfo from '../../utilities/interfaces/leagueInfoSchema';

const lcs = express.Router();

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

const LCS_ID = '98767991299243165';
const LCS_TOUR_ID = '108206581962155974';

const leaguesURL =
  'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US';
const lcsScheduleURL = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${LCS_ID}`;
const lcsStandingsURL = `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${LCS_TOUR_ID}`;

lcs.get('/', async (req, res) => {
  const leagueData = await axios
    .get(leaguesURL, headers)
    .then((res) => res.data.data.leagues)
    .catch((error) => console.log(error));

  const lcsInfo = leagueData.filter(
    (league: LeagueInfo) => league.slug === 'lcs'
  );

  const scheduleData = await axios
    .get(lcsScheduleURL, headers)
    .then((res) => res.data.data.schedule.events)
    .catch((error) => console.log(error));

  const lcsSchedule = scheduleData;

  const unstartedMatches = lcsSchedule.filter((match: LeagueMatch) => {
    return match.state === 'unstarted';
  });

  const standingsData = await axios
    .get(lcsStandingsURL, headers)
    .then((res) => res.data.data.standings)
    .catch((error) => console.log(error));

  const lcsStandings = standingsData;

  const lcsData = {
    info: lcsInfo,
    schedule: lcsSchedule,
    standings: lcsStandings,
  };

  res.send(lcsData);
});

export default lcs;
