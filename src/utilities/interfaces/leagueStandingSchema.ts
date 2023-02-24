export default interface LeagueStanding {
  stages: {
    playInGroups?: {
      groups: [{ rankings: [] }, { rankings: [] }];
    };
    playInKnockouts?: {
      rounds: [{ rankings: [] }, { rankings: [] }];
    };
    groups?: {
      groups: [
        { rankings: [] },
        { rankings: [] },
        { rankings: [] },
        { rankings: [] }
      ];
    };
    knockouts?: {
      stages: [{ rankings: [] }, { rankings: [] }, { rankings: [] }];
    };
  };
}
