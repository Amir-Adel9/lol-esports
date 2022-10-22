import express from 'express';
import axios from 'axios';
import LeagueMatch from '../../utilities/interfaces/leagueGameSchema';
import LeagueInfo from '../../utilities/interfaces/leagueInfoSchema';

const lec = express.Router();

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

const LEC_ID = '98767991302996019';
const LEC_TOUR_ID = '108998961191900167';

const leaguesURL =
  'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US';
const lecScheduleURL = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${LEC_ID}`;
const lecStandingsURL = `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${LEC_TOUR_ID}`;

lec.get('/', async (req, res) => {
  const leagueData = await axios
    .get(leaguesURL, headers)
    .then((res) => res.data.data.leagues)
    .catch((error) => console.log(error));

  const lecInfo = leagueData.filter(
    (league: LeagueInfo) => league.slug === 'lec'
  );

  const scheduleData = await axios
    .get(lecScheduleURL, headers)
    .then((res) => res.data.data.schedule.events)
    .catch((error) => console.log(error));

  const lecSchedule = scheduleData;

  const unstartedMatches = lecSchedule.filter((match: LeagueMatch) => {
    return match.state === 'unstarted';
  });

  const standingsData = await axios
    .get(lecStandingsURL, headers)
    .then((res) => res.data.data.standings)
    .catch((error) => console.log(error));

  const lecStandings = standingsData;

  const lecData = {
    info: lecInfo,
    schedule: lecSchedule,
    standings: lecStandings,
  };

  res.send(lecData);
});

export default lec;
