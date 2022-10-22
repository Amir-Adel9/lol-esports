export default interface LeagueMatch {
  startTime: string;
  state: string;
  match: {
    id: string;
    teams: [
      {
        name: string;
        code: string;
        image: string;
        result: {
          outcome: string | null;
          gameWins: number;
        };
        record: {
          wins: number;
          losses: number;
        };
      },
      {
        name: string;
        code: string;
        image: string;
        result: {
          outcome: string | null;
          gameWins: number;
        };
        record: {
          wins: number;
          losses: number;
        };
      }
    ];
    strategy: {
      type: string;
      count: number | null;
    };
  };
}
