import express from 'express';
import axios from 'axios';
import LeagueMatch from '../../utilities/interfaces/leagueGameSchema';
import LeagueInfo from '../../utilities/interfaces/leagueInfoSchema';

const lck = express.Router();

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

const LCK_ID = '98767991310872058';
const LCK_TOUR_ID = '108195478954601542';

const leaguesURL =
  'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US';
const lckScheduleURL = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${LCK_ID}`;
const lckStandingsURL = `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${LCK_TOUR_ID}`;

lck.get('/', async (req, res) => {
  const leagueData = await axios
    .get(leaguesURL, headers)
    .then((res) => res.data.data.leagues)
    .catch((error) => console.log(error));

  const lckInfo = leagueData.filter(
    (league: LeagueInfo) => league.slug === 'lck'
  );

  const scheduleData = await axios
    .get(lckScheduleURL, headers)
    .then((res) => res.data.data.schedule.events)
    .catch((error) => console.log(error));

  const lckSchedule = scheduleData;

  const unstartedMatches = lckSchedule.filter((match: LeagueMatch) => {
    return match.state === 'unstarted';
  });

  const standingsData = await axios
    .get(lckStandingsURL, headers)
    .then((res) => res.data.data.standings)
    .catch((error) => console.log(error));

  const lckStandings = standingsData;

  const lckData = {
    info: lckInfo,
    schedule: lckSchedule,
    standings: lckStandings,
  };

  res.send(lckData);
});

export default lck;
