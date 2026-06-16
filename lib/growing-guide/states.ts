// State-level USDA zone data used as a fallback when a city isn't in the
// dataset. Zones are representative of the most-populated part of each state.

export type StateInfo = {
  abbr: string;
  name: string;
  zone: string;       // representative zone for the main population center
  zoneRange: string;  // full range seen in the state
};

const STATE_LIST: StateInfo[] = [
  { abbr: "AL", name: "Alabama",        zone: "8a",  zoneRange: "7b–9a"  },
  { abbr: "AK", name: "Alaska",         zone: "4b",  zoneRange: "1a–8b"  },
  { abbr: "AZ", name: "Arizona",        zone: "9b",  zoneRange: "5a–10b" },
  { abbr: "AR", name: "Arkansas",       zone: "8a",  zoneRange: "6b–8a"  },
  { abbr: "CA", name: "California",     zone: "9b",  zoneRange: "5b–11a" },
  { abbr: "CO", name: "Colorado",       zone: "6a",  zoneRange: "3b–7a"  },
  { abbr: "CT", name: "Connecticut",    zone: "6b",  zoneRange: "5b–7a"  },
  { abbr: "DE", name: "Delaware",       zone: "7a",  zoneRange: "6b–7b"  },
  { abbr: "FL", name: "Florida",        zone: "9b",  zoneRange: "8a–12a" },
  { abbr: "GA", name: "Georgia",        zone: "8a",  zoneRange: "6b–9b"  },
  { abbr: "HI", name: "Hawaii",         zone: "12a", zoneRange: "9b–13a" },
  { abbr: "ID", name: "Idaho",          zone: "7a",  zoneRange: "4b–7b"  },
  { abbr: "IL", name: "Illinois",       zone: "6a",  zoneRange: "5a–7a"  },
  { abbr: "IN", name: "Indiana",        zone: "6a",  zoneRange: "5b–6b"  },
  { abbr: "IA", name: "Iowa",           zone: "5b",  zoneRange: "4a–6a"  },
  { abbr: "KS", name: "Kansas",         zone: "6a",  zoneRange: "5b–7a"  },
  { abbr: "KY", name: "Kentucky",       zone: "6b",  zoneRange: "6a–7b"  },
  { abbr: "LA", name: "Louisiana",      zone: "9a",  zoneRange: "8a–10a" },
  { abbr: "ME", name: "Maine",          zone: "5b",  zoneRange: "3b–6b"  },
  { abbr: "MD", name: "Maryland",       zone: "7a",  zoneRange: "6a–8a"  },
  { abbr: "MA", name: "Massachusetts",  zone: "6b",  zoneRange: "5b–7a"  },
  { abbr: "MI", name: "Michigan",       zone: "6a",  zoneRange: "4a–6b"  },
  { abbr: "MN", name: "Minnesota",      zone: "4b",  zoneRange: "3a–5b"  },
  { abbr: "MS", name: "Mississippi",    zone: "8a",  zoneRange: "7b–9a"  },
  { abbr: "MO", name: "Missouri",       zone: "6a",  zoneRange: "5b–7b"  },
  { abbr: "MT", name: "Montana",        zone: "5a",  zoneRange: "3a–6a"  },
  { abbr: "NE", name: "Nebraska",       zone: "5b",  zoneRange: "4b–6b"  },
  { abbr: "NV", name: "Nevada",         zone: "7a",  zoneRange: "4a–10a" },
  { abbr: "NH", name: "New Hampshire",  zone: "5b",  zoneRange: "4a–6b"  },
  { abbr: "NJ", name: "New Jersey",     zone: "7a",  zoneRange: "6a–7b"  },
  { abbr: "NM", name: "New Mexico",     zone: "7b",  zoneRange: "5a–9a"  },
  { abbr: "NY", name: "New York",       zone: "6a",  zoneRange: "3b–7b"  },
  { abbr: "NC", name: "North Carolina", zone: "8a",  zoneRange: "6a–9a"  },
  { abbr: "ND", name: "North Dakota",   zone: "4a",  zoneRange: "3a–5a"  },
  { abbr: "OH", name: "Ohio",           zone: "6b",  zoneRange: "5b–6b"  },
  { abbr: "OK", name: "Oklahoma",       zone: "7a",  zoneRange: "6a–8a"  },
  { abbr: "OR", name: "Oregon",         zone: "8b",  zoneRange: "5a–9b"  },
  { abbr: "PA", name: "Pennsylvania",   zone: "6b",  zoneRange: "5a–7a"  },
  { abbr: "RI", name: "Rhode Island",   zone: "6b",  zoneRange: "6a–7a"  },
  { abbr: "SC", name: "South Carolina", zone: "8a",  zoneRange: "7b–9a"  },
  { abbr: "SD", name: "South Dakota",   zone: "4b",  zoneRange: "3b–5b"  },
  { abbr: "TN", name: "Tennessee",      zone: "7a",  zoneRange: "6a–8a"  },
  { abbr: "TX", name: "Texas",          zone: "8b",  zoneRange: "6a–10a" },
  { abbr: "UT", name: "Utah",           zone: "7a",  zoneRange: "4a–9a"  },
  { abbr: "VT", name: "Vermont",        zone: "5a",  zoneRange: "3b–6a"  },
  { abbr: "VA", name: "Virginia",       zone: "7b",  zoneRange: "5b–8a"  },
  { abbr: "WA", name: "Washington",     zone: "8b",  zoneRange: "5b–9b"  },
  { abbr: "WV", name: "West Virginia",  zone: "6b",  zoneRange: "5b–7a"  },
  { abbr: "WI", name: "Wisconsin",      zone: "5a",  zoneRange: "3b–6a"  },
  { abbr: "WY", name: "Wyoming",        zone: "5a",  zoneRange: "3a–6b"  },
  { abbr: "DC", name: "District of Columbia", zone: "7b", zoneRange: "7b" },
];

const byAbbr = new Map<string, StateInfo>();
const byName = new Map<string, StateInfo>();

for (const s of STATE_LIST) {
  byAbbr.set(s.abbr.toLowerCase(), s);
  byName.set(s.name.toLowerCase(), s);
}

export function findState(query: string): StateInfo | undefined {
  const q = query.trim().toLowerCase();
  return byAbbr.get(q) ?? byName.get(q);
}

// Try to extract a state from the end of a longer query like "sumter sc"
// or "sumter south carolina". Returns { stateInfo, remainingCity }.
export function extractState(
  normalized: string,
): { stateInfo: StateInfo; remainingCity: string } | undefined {
  const parts = normalized.split(" ");

  // Last token might be a 2-letter abbreviation
  if (parts.length >= 2) {
    const lastToken = parts[parts.length - 1];
    const stateByAbbr = byAbbr.get(lastToken);
    if (stateByAbbr) {
      return {
        stateInfo: stateByAbbr,
        remainingCity: parts.slice(0, -1).join(" "),
      };
    }
  }

  // Last 2 tokens might form a state name (e.g. "south carolina")
  if (parts.length >= 3) {
    const lastTwo = `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
    const stateByTwo = byName.get(lastTwo);
    if (stateByTwo) {
      return {
        stateInfo: stateByTwo,
        remainingCity: parts.slice(0, -2).join(" "),
      };
    }
  }

  // Last 3 tokens (e.g. "district of columbia")
  if (parts.length >= 4) {
    const lastThree = parts.slice(-3).join(" ");
    const stateByThree = byName.get(lastThree);
    if (stateByThree) {
      return {
        stateInfo: stateByThree,
        remainingCity: parts.slice(0, -3).join(" "),
      };
    }
  }

  // Whole query might just be a state name or abbreviation
  const wholeState = byAbbr.get(normalized) ?? byName.get(normalized);
  if (wholeState) {
    return { stateInfo: wholeState, remainingCity: "" };
  }

  return undefined;
}
