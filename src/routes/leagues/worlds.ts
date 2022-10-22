import express from 'express';
import axios from 'axios';
import LeagueMatch from '../../utilities/interfaces/leagueGameSchema';
import LeagueInfo from '../../utilities/interfaces/leagueInfoSchema';

const worlds = express.Router();

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

const WORLDS_ID = '98767975604431411';
const WORLDS_TOUR_ID = '108998961191900167';

const leaguesURL =
  'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US';
const worldsScheduleURL = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${WORLDS_ID}`;
const worldsStandingsURL = `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${WORLDS_TOUR_ID}`;

worlds.get('/', async (req, res) => {
  const leagueData = await axios
    .get(leaguesURL, headers)
    .then((res) => res.data.data.leagues)
    .catch((error) => console.log(error));

  const worldsInfo = leagueData.filter(
    (league: LeagueInfo) => league.slug === 'worlds'
  );

  const scheduleData = await axios
    .get(worldsScheduleURL, headers)
    .then((res) => res.data.data.schedule.events)
    .catch((error) => console.log(error));

  const worldsSchedule = scheduleData;

  const unstartedMatches = worldsSchedule.filter((match: LeagueMatch) => {
    return match.state === 'unstarted';
  });

  const standingsData = await axios
    .get(worldsStandingsURL, headers)
    .then((res) => res.data.data.standings)
    .catch((error) => console.log(error));

  const worldsStandings = standingsData;

  const worldsData = {
    info: worldsInfo,
    schedule: worldsSchedule,
    standings: worldsStandings,
  };

  res.send(worldsData);
  // res.send(
  //   `${
  //     worldsSchedule[75].match.teams[0].result.outcome != null
  //       ? worldsSchedule[75].match.teams[0].result.outcome.toUpperCase()
  //       : ''
  //   } ${worldsSchedule[75].match.teams[0].code} ${
  //     worldsSchedule[75].match.teams[0].result.gameWins
  //   } -  ${worldsSchedule[75].match.teams[1].result.gameWins} ${
  //     worldsSchedule[75].match.teams[1].code
  //   } ${
  //     worldsSchedule[75].match.teams[1].result.outcome != null
  //       ? worldsSchedule[75].match.teams[1].result.outcome.toUpperCase()
  //       : ''
  //   }(${worldsSchedule[75].state})`
  // );
});

export default worlds;
