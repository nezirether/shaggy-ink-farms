// ─────────────────────────────────────────────────────────────────────────────
// Weekly Growing Recommendations
//
// Provides week-by-week growing tasks for supported cities.
// Week 1 = Jan 1–7, Week 52 = Dec 25–31.
//
// Data sourced from UC ANR, UC Master Gardeners, USDA NRCS, and
// Shaggy Ink Farms field experience in Anderson, CA (Zone 9b).
// ─────────────────────────────────────────────────────────────────────────────

export interface CityInfo {
  name: string;
  displayName: string;
  state: string;
  zone: string;
  lastFrostDate: string;
  firstFrostDate: string;
  annualRainfallInches: number;
  summerHighF: number;
  winterLowF: number;
  coordinates: { lat: number; lng: number };
  description: string;
}

export interface WeeklyTask {
  category: 'Plant' | 'Maintain' | 'Harvest' | 'Prepare' | 'Watch';
  task: string;
}

export interface WeeklyRecommendation {
  week: number;
  dateRange: string;
  headline: string;
  summary: string;
  tasks: WeeklyTask[];
  insiderNote?: string;
}

// ─── Supported cities ────────────────────────────────────────────────────────

export const SUPPORTED_CITIES: CityInfo[] = [
  {
    name: 'anderson-ca',
    displayName: 'Anderson',
    state: 'CA',
    zone: '9b',
    lastFrostDate: 'Feb 1',
    firstFrostDate: 'Dec 15',
    annualRainfallInches: 28,
    summerHighF: 104,
    winterLowF: 30,
    coordinates: { lat: 40.45, lng: -122.29 },
    description:
      'Anderson sits in the upper Sacramento Valley with long, hot summers and mild winters. Zone 9b means roughly 290 frost-free days and exceptional growing conditions for warm-season crops.',
  },
  {
    name: 'redding-ca',
    displayName: 'Redding',
    state: 'CA',
    zone: '9b',
    lastFrostDate: 'Feb 7',
    firstFrostDate: 'Dec 10',
    annualRainfallInches: 26,
    summerHighF: 107,
    winterLowF: 28,
    coordinates: { lat: 40.59, lng: -122.39 },
    description:
      'Redding experiences some of the most extreme summer heat in the state, with frequent spells above 110°F. The long frost-free season supports two full growing seasons per year.',
  },
  {
    name: 'chico-ca',
    displayName: 'Chico',
    state: 'CA',
    zone: '9b',
    lastFrostDate: 'Feb 15',
    firstFrostDate: 'Dec 5',
    annualRainfallInches: 25,
    summerHighF: 101,
    winterLowF: 30,
    coordinates: { lat: 39.73, lng: -121.84 },
    description:
      'Chico has a slightly more moderate summer than Redding, supported by its position further south in the Valley. A strong local food culture and year-round growing season.',
  },
  {
    name: 'red-bluff-ca',
    displayName: 'Red Bluff',
    state: 'CA',
    zone: '9b',
    lastFrostDate: 'Jan 28',
    firstFrostDate: 'Dec 20',
    annualRainfallInches: 24,
    summerHighF: 106,
    winterLowF: 28,
    coordinates: { lat: 40.18, lng: -122.24 },
    description:
      'Red Bluff sits between Anderson and Chico in the Sacramento Valley. It has an early last frost and can experience significant summer heat — excellent for long-season warm crops.',
  },
  {
    name: 'sacramento-ca',
    displayName: 'Sacramento',
    state: 'CA',
    zone: '9b',
    lastFrostDate: 'Feb 22',
    firstFrostDate: 'Nov 28',
    annualRainfallInches: 18,
    summerHighF: 95,
    winterLowF: 32,
    coordinates: { lat: 38.58, lng: -121.49 },
    description:
      'Sacramento has a more moderate summer than the upper Valley and a slightly shorter frost-free season. The urban heat island effect means city plots can push Zone 10a conditions in some neighborhoods.',
  },
];

// ─── Helper: get current week number (1–52) ──────────────────────────────────

export function getCurrentWeek(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil(
    (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );
  return Math.min(52, Math.max(1, Math.ceil(dayOfYear / 7)));
}

export function getWeekDateRange(week: number, year?: number): string {
  const y = year ?? new Date().getFullYear();
  const jan1 = new Date(y, 0, 1);
  const startDay = (week - 1) * 7;
  const start = new Date(jan1.getTime() + startDay * 24 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

// ─── Anderson, CA weekly recommendations (Zone 9b, full year) ────────────────
// Weeks are grouped by season block for maintainability.

const ANDERSON_RECOMMENDATIONS: WeeklyRecommendation[] = [
  // ── JANUARY (Weeks 1–4) ──────────────────────────────────────────────────

  {
    week: 1,
    dateRange: 'Jan 1–7',
    headline: 'Plan your year and order seeds',
    summary:
      'Early January is the planning season in Anderson. The garden is quiet but your seed orders should not be. Most seed companies sell out of popular varieties by February.',
    tasks: [
      { category: 'Prepare', task: 'Make your seed list and place orders — Johnny\'s, Fedco, Territorial, and Baker Creek all sell out fast on popular varieties' },
      { category: 'Prepare', task: 'Map out bed layout for the year; decide what rotates from last year\'s positions' },
      { category: 'Maintain', task: 'Apply dormant oil spray to peach, apricot, and other stone fruit trees before bud swell — prevents peach leaf curl' },
      { category: 'Plant', task: 'Direct sow peas in mild years when soil is workable; Zone 9b often allows January pea planting' },
      { category: 'Harvest', task: 'Continue harvesting fall kale, chard, and brassicas — winter greens are in peak production' },
    ],
    insiderNote:
      'We apply dormant copper spray to stone fruit every January at Shaggy Ink Farms. Peach leaf curl is devastating and cannot be treated once leaves emerge — the dormant window is the only effective treatment time.',
  },
  {
    week: 2,
    dateRange: 'Jan 8–14',
    headline: 'Start onions and shallots indoors',
    summary:
      'Onions need 10–12 weeks from seed to transplant size. Starting now gives you transplants ready for mid-March when soil temperatures are right.',
    tasks: [
      { category: 'Plant', task: 'Start onion and shallot seeds indoors under grow lights — use a 72-cell tray with seed-starting mix' },
      { category: 'Plant', task: 'Sow lettuce seeds indoors for February transplants' },
      { category: 'Maintain', task: 'Check stored winter squash for soft spots — any rotting squash should be removed immediately before it spreads' },
      { category: 'Prepare', task: 'Test and repair drip irrigation before spring — easier to fix now than at the start of irrigation season' },
      { category: 'Maintain', task: 'Apply second dormant spray if first was before any recent rain' },
    ],
    insiderNote:
      'Onion seeds lose viability quickly — use fresh seed from this season\'s catalog. Old onion seed often has below 50% germination, which wastes cells and frustrates planning.',
  },
  {
    week: 3,
    dateRange: 'Jan 15–21',
    headline: 'Last frost risk remains — plan around it',
    summary:
      'Anderson\'s last frost average is February 1, but cold snaps can arrive through mid-February. Keep frost cloth handy for anything tender already in the ground.',
    tasks: [
      { category: 'Prepare', task: 'Confirm frost cloth or row cover is accessible — a cold snap can arrive with 12 hours\' notice' },
      { category: 'Plant', task: 'Direct sow spinach and arugula outdoors — both handle light frost well in Zone 9b' },
      { category: 'Maintain', task: 'Water fruit trees deeply if January has been dry — deep winter watering reduces spring water stress' },
      { category: 'Prepare', task: 'Start a soil amendment order: compost, blood meal, bone meal, sulfur if pH correction is needed' },
      { category: 'Watch', task: 'Scout for aphid activity on overwintering brassicas — beneficial insects are low right now, so populations can build quickly' },
    ],
  },
  {
    week: 4,
    dateRange: 'Jan 22–31',
    headline: 'Start tomato seeds indoors',
    summary:
      'For a mid-to-late March transplant date (post-frost, soil warming), start tomato seeds now. 6–8 weeks from today lands you in the transplant window.',
    tasks: [
      { category: 'Plant', task: 'Start tomato seeds indoors — 2 seeds per cell, heat mat at 75–80°F, grow light 2–4 inches above once sprouted' },
      { category: 'Plant', task: 'Continue onion seedling care — thin to 1 per cell, fertilize lightly with fish emulsion' },
      { category: 'Prepare', task: 'Spread compost over empty beds now and let it settle before spring planting' },
      { category: 'Maintain', task: 'Prune dormant fruit trees while fully dormant — apples, pears, and plums' },
      { category: 'Plant', task: 'Transplant lettuce starts from January indoor sowing if seedlings are ready' },
    ],
    insiderNote:
      'For tomatoes in Anderson, mid-to-late March is our sweet spot for transplanting. Earlier risks a late frost; much later cuts into the fruiting window before summer heat reduces fruit set.',
  },

  // ── FEBRUARY (Weeks 5–8) ─────────────────────────────────────────────────

  {
    week: 5,
    dateRange: 'Feb 1–7',
    headline: 'Last frost date — begin transitioning to spring',
    summary:
      'February 1 is our average last frost date in Anderson. This is not a guarantee, but it signals the beginning of the transition to spring planting. Stay alert for late cold snaps.',
    tasks: [
      { category: 'Plant', task: 'Start pepper seeds indoors — they need 8–10 weeks to transplant size and want 80–85°F soil for germination' },
      { category: 'Plant', task: 'Start eggplant seeds indoors alongside peppers' },
      { category: 'Plant', task: 'Direct sow beets, carrots, and radishes outdoors — soil is cold but these germinate at 45–60°F' },
      { category: 'Maintain', task: 'Watch for late frost through mid-February and be ready to cover tender crops' },
      { category: 'Plant', task: 'Transplant brassica seedlings (broccoli, cabbage, cauliflower started in December) if ready' },
    ],
  },
  {
    week: 6,
    dateRange: 'Feb 8–14',
    headline: 'Soil prep and bed building time',
    summary:
      'Before planting season accelerates, this is the ideal window to amend beds, build new raised beds, and install or repair drip irrigation. Once planting starts, there\'s no time.',
    tasks: [
      { category: 'Prepare', task: 'Work compost and amendments into existing beds — 2–3 inches of compost incorporated 6–8 inches deep' },
      { category: 'Prepare', task: 'Install or repair raised bed frames before soil fills' },
      { category: 'Prepare', task: 'Lay or flush drip irrigation lines in beds that will be planted March–April' },
      { category: 'Plant', task: 'Direct sow snap peas and snow peas outdoors — pea trellis should be in place at sowing time' },
      { category: 'Maintain', task: 'Continue fertilizing onion seedlings weekly with dilute fish emulsion' },
    ],
    insiderNote:
      'We install drip irrigation before planting, not after. Running drip emitter lines through established plant growth is painful. Lay the lines now, then plant around them.',
  },
  {
    week: 7,
    dateRange: 'Feb 15–21',
    headline: 'Begin hardening off early brassica transplants',
    summary:
      'Brassica seedlings started in December are now ready to begin transitioning outdoors. A two-week hardening schedule starts this week for March transplanting.',
    tasks: [
      { category: 'Prepare', task: 'Begin hardening off broccoli, cabbage, and cauliflower transplants — 1–2 hours of sheltered outdoor time daily, increasing each day' },
      { category: 'Plant', task: 'Direct sow Swiss chard and spinach outdoors — both tolerate Zone 9b February temperatures' },
      { category: 'Maintain', task: 'Thin beet seedlings from early February sowing to 3–4 inches apart' },
      { category: 'Watch', task: 'Scout for powdery mildew on overwintering plants — February humidity can trigger early infections' },
      { category: 'Prepare', task: 'Order bare-root strawberries if not already done — local nurseries stock them briefly in February' },
    ],
  },
  {
    week: 8,
    dateRange: 'Feb 22–28',
    headline: 'Transplant brassicas into beds',
    summary:
      'After two weeks of hardening off, early spring brassica transplants are ready for the ground. Get them in now to give them the cool temperatures they prefer before spring heat arrives.',
    tasks: [
      { category: 'Plant', task: 'Transplant hardened broccoli, cabbage, and cauliflower seedlings into beds' },
      { category: 'Plant', task: 'Plant bare-root strawberries with crowns at soil level — too deep smothers them, too shallow dries them out' },
      { category: 'Plant', task: 'Direct sow cilantro and dill for spring use before heat causes bolting' },
      { category: 'Maintain', task: 'Install row cover over newly transplanted brassicas if late frost is in the forecast' },
      { category: 'Plant', task: 'Thin carrot seedlings from early February sowing to 1–2 inches apart' },
    ],
    insiderNote:
      'Broccoli and cauliflower planted in late February in Anderson typically produce heads in April–May before the worst heat arrives. Plantings delayed to March often bolt or produce small, loose heads.',
  },

  // ── MARCH (Weeks 9–13) ──────────────────────────────────────────────────

  {
    week: 9,
    dateRange: 'Mar 1–7',
    headline: 'Spring planting season opens',
    summary:
      'March is the start of the main planting push in Anderson. Cool-season crops are in the ground or nearly ready; warm-season transplants are growing under lights. Soil is warming.',
    tasks: [
      { category: 'Plant', task: 'Direct sow lettuce, spinach, and arugula for spring harvest — soil temperature is in the 50s, ideal for germination' },
      { category: 'Plant', task: 'Transplant onion and shallot seedlings started in January — crowd them into rows for easier bed management' },
      { category: 'Maintain', task: 'Check tomato seedlings under lights — thin to 1 per cell, pot up to 4-inch containers if root-bound' },
      { category: 'Watch', task: 'Scout for cabbage worms and aphids on young brassica transplants' },
      { category: 'Prepare', task: 'Add mulch to strawberry beds — 2 inches of straw around plants reduces soil splash and conserves moisture' },
    ],
  },
  {
    week: 10,
    dateRange: 'Mar 8–14',
    headline: 'Begin hardening off tomato and pepper transplants',
    summary:
      'Tomatoes started in late January are approaching transplant size. Begin hardening off this week for a late March to early April transplant date.',
    tasks: [
      { category: 'Prepare', task: 'Begin hardening off tomato seedlings — 1–2 hours of sheltered outdoor time, increasing daily over 2 weeks' },
      { category: 'Plant', task: 'Direct sow beets and carrots for a second succession — stagger plantings 3–4 weeks apart' },
      { category: 'Maintain', task: 'Fertilize spring brassicas with dilute fish emulsion or side-dress with compost' },
      { category: 'Plant', task: 'Direct sow corn in the warmest, most sheltered bed — soil temperature should be at or approaching 60°F' },
      { category: 'Prepare', task: 'Set up tomato cages or stakes now, before plants are in the ground — much easier than caging established plants' },
    ],
    insiderNote:
      'We use 6-foot heavy-gauge wire cages for indeterminate tomatoes. Shorter cages always end up with plants flopping over the top by August. Size up now.',
  },
  {
    week: 11,
    dateRange: 'Mar 15–21',
    headline: 'Watch for spring aphid pressure',
    summary:
      'As temperatures warm, aphid populations build rapidly on spring crops. This is the week to scout aggressively and intervene early before populations explode.',
    tasks: [
      { category: 'Watch', task: 'Scout every brassica plant for aphid clusters — undersides of leaves and growing tips' },
      { category: 'Maintain', task: 'Knock aphid colonies off with a strong water stream or spray with insecticidal soap' },
      { category: 'Plant', task: 'Transplant nasturtiums as trap crops near aphid-susceptible plants' },
      { category: 'Plant', task: 'Sow bean seeds outdoors if soil temperature has reached 55°F — soil thermometer is essential' },
      { category: 'Maintain', task: 'Continue hardening off tomato and pepper transplants' },
    ],
  },
  {
    week: 12,
    dateRange: 'Mar 22–28',
    headline: 'First tomato transplant window opens',
    summary:
      'By late March, soil temperature in Anderson is approaching the 60°F threshold for tomatoes. Hardened transplants can go out into the ground.',
    tasks: [
      { category: 'Plant', task: 'Transplant tomatoes into the ground if soil is at 60°F and 2-week hardening is complete' },
      { category: 'Plant', task: 'Direct sow summer squash and zucchini seeds outdoors — or start 2 weeks early indoors for earlier production' },
      { category: 'Plant', task: 'Direct sow cucumber seeds if soil is at 60°F+' },
      { category: 'Maintain', task: 'Install drip emitters and begin irrigation if March has been dry' },
      { category: 'Harvest', task: 'Harvest spring broccoli side shoots — main heads cut but plants produce prolifically from side shoots' },
    ],
    insiderNote:
      'When we transplant tomatoes, we bury the stem 2/3 deep — roots form along buried stem and produce a stronger plant. Strip lower leaves before planting.',
  },
  {
    week: 13,
    dateRange: 'Mar 29 – Apr 4',
    headline: 'Peak spring planting push',
    summary:
      'The last week of March and first days of April are peak planting time in Anderson. Tomatoes, beans, squash, and cucumbers all go in now. Stay busy.',
    tasks: [
      { category: 'Plant', task: 'Get remaining tomato and pepper transplants in the ground — every week of delay costs production time before summer heat' },
      { category: 'Plant', task: 'Direct sow pole beans and bush beans — soil is warm enough for good germination' },
      { category: 'Plant', task: 'Sow second succession of lettuce — this is the last practical lettuce sowing before spring heat causes bolting' },
      { category: 'Maintain', task: 'Apply mulch to all beds — 2–3 inches of wood chips or straw to reduce moisture loss as temperatures rise' },
      { category: 'Plant', task: 'Start basil seeds indoors or buy starts — basil goes out after last frost risk passes, typically mid-April' },
    ],
  },

  // ── APRIL (Weeks 14–17) ──────────────────────────────────────────────────

  {
    week: 14,
    dateRange: 'Apr 5–11',
    headline: 'Melons go in, spring cool crops wind down',
    summary:
      'April in Anderson means rapid temperature increases. Warm-season crops are being planted while spring cool-season crops are in their final weeks before heat causes bolting.',
    tasks: [
      { category: 'Plant', task: 'Direct sow melon seeds or transplant starts — soil is reliably warm for germination now' },
      { category: 'Plant', task: 'Transplant pepper and eggplant seedlings once nighttime temps stay above 55°F consistently' },
      { category: 'Harvest', task: 'Harvest remaining lettuce before it bolts — make one final big harvest and store in the refrigerator' },
      { category: 'Maintain', task: 'Check tomato ties and stakes — plants are growing rapidly and need support now' },
      { category: 'Watch', task: 'Scout for tomato hornworm eggs on tomato leaves — undersides of leaves in mid-April' },
    ],
  },
  {
    week: 15,
    dateRange: 'Apr 12–18',
    headline: 'Plant basil and start sweet potato slips',
    summary:
      'Mid-April is the ideal time to get basil established alongside tomatoes. Sweet potato slips should be ordered now for May planting.',
    tasks: [
      { category: 'Plant', task: 'Transplant basil starts near tomato plants — basil is heat-tolerant and thrives in Anderson summers' },
      { category: 'Prepare', task: 'Order sweet potato slips for mid-May delivery — local nurseries often stock them in late April' },
      { category: 'Plant', task: 'Sow corn in blocks of at least 4 rows for proper wind pollination' },
      { category: 'Maintain', task: 'Begin drip irrigation schedule for warm-season crops — adjust run time as April temperatures climb' },
      { category: 'Watch', task: 'Check pepper transplants for signs of sunscald — newly hardened-off peppers can burn in sudden April heat spikes' },
    ],
    insiderNote:
      'A 40% shade cloth ready to deploy protects transplants during unexpected heat spikes in April and May. We keep one on hand throughout spring.',
  },
  {
    week: 16,
    dateRange: 'Apr 19–25',
    headline: 'Irrigation season begins in earnest',
    summary:
      'April in Anderson can bring dry, hot spells. Irrigation management is now as important as planting decisions.',
    tasks: [
      { category: 'Maintain', task: 'Increase drip irrigation run times as April heat builds — check soil moisture 2–3 inches down before adjusting' },
      { category: 'Plant', task: 'Sow second succession of beans for a staggered harvest' },
      { category: 'Watch', task: 'Scout squash and cucumbers for squash vine borer moths — adults are present in late April in Northern California' },
      { category: 'Maintain', task: 'Side-dress tomatoes with compost or apply first liquid fertilizer feeding' },
      { category: 'Harvest', task: 'Harvest mature onion sets — spring onions (scallions) pulled when pencil-thin, or left to develop full bulbs by summer' },
    ],
  },
  {
    week: 17,
    dateRange: 'Apr 26 – May 2',
    headline: 'Watch for squash vine borer moths',
    summary:
      'Squash vine borer adult moths are active in late April and early May in Northern California. This is the critical window for prevention before they lay eggs at the base of squash plants.',
    tasks: [
      { category: 'Watch', task: 'Scout base of squash stems for orange, flat, oval vine borer eggs — remove by hand if found' },
      { category: 'Maintain', task: 'Wrap base of squash stems in row cover or foil to deter egg-laying — preventive, not a cure' },
      { category: 'Plant', task: 'Sow summer squash succession plantings — Zone 9 allows planting squash through May for summer production' },
      { category: 'Maintain', task: 'Fertilize corn at the 6-leaf stage (knee high) with nitrogen side-dressing' },
      { category: 'Prepare', task: 'Prepare beds for sweet potato slips arriving in May' },
    ],
  },

  // ── MAY (Weeks 18–21) ───────────────────────────────────────────────────

  {
    week: 18,
    dateRange: 'May 3–9',
    headline: 'Summer production is building',
    summary:
      'May is when the Anderson garden transitions fully to summer mode. Temperatures climb, water demand increases, and warm-season crops are establishing rapidly.',
    tasks: [
      { category: 'Maintain', task: 'Increase irrigation — May temperatures regularly reach 90s and water demand doubles for established crops' },
      { category: 'Plant', task: 'Plant sweet potato slips once soil temperature is above 65°F' },
      { category: 'Watch', task: 'Monitor tomatoes for first fruit set — at over 95°F, pollen viability drops and fruit set slows. This is normal.' },
      { category: 'Maintain', task: 'Pinch suckers on indeterminate tomatoes to maintain 1–2 main leaders for cleaner growth' },
      { category: 'Harvest', task: 'Harvest sugar snap peas before they begin to shrivel in heat — the pea window in Anderson is short' },
    ],
    insiderNote:
      'When tomatoes stop setting fruit in summer heat, do not over-fertilize trying to push production. Wait for temperatures to drop below 95°F — fruit set naturally resumes.',
  },
  {
    week: 19,
    dateRange: 'May 10–16',
    headline: 'Start fall broccoli seeds indoors',
    summary:
      'This sounds counterintuitive in May, but fall brassica production in Zone 9b requires seeds started now for August transplanting. Fall broccoli is often more productive than spring.',
    tasks: [
      { category: 'Plant', task: 'Start broccoli, cauliflower, and cabbage seeds indoors for fall planting — they need 10–12 weeks to transplant size' },
      { category: 'Harvest', task: 'Begin harvesting zucchini when 6–8 inches long — do not let them grow to baseball bat size' },
      { category: 'Watch', task: 'Scout beans for Mexican bean beetle — small yellow beetles that skeletonize bean leaves' },
      { category: 'Maintain', task: 'Remove and compost spring cool-season crops that have bolted — clear space for heat-tolerant plantings' },
      { category: 'Maintain', task: 'Apply 3–4 inches of wood chip mulch to all summer crop beds to reduce water loss in heat' },
    ],
  },
  {
    week: 20,
    dateRange: 'May 17–23',
    headline: 'Manage heat — cover crops on empty beds',
    summary:
      'Any beds that come empty in May should be seeded with a cover crop or covered with thick mulch to prevent soil moisture loss and heat damage to soil biology.',
    tasks: [
      { category: 'Prepare', task: 'Seed empty beds with cowpea or sorghum-sudangrass — summer cover crops that thrive in Valley heat' },
      { category: 'Maintain', task: 'Check drip system for clogged emitters — hard water and organic matter clog emitters regularly' },
      { category: 'Harvest', task: 'Harvest garlic when lower 1/3 of leaves turn brown — do not wait too long or skins split' },
      { category: 'Plant', task: 'Sow a small succession of beans for late June harvest before extreme heat limits production' },
      { category: 'Watch', task: 'Monitor for spider mites on tomatoes, beans, and corn — hot, dry conditions trigger mite outbreaks' },
    ],
  },
  {
    week: 21,
    dateRange: 'May 24–31',
    headline: 'Cure garlic and preserve spring surplus',
    summary:
      'Late May harvests are coming in: garlic, spring onions, the last of the cool-season crops. Time to cure, store, or process the harvest.',
    tasks: [
      { category: 'Harvest', task: 'Cure garlic in a cool, dry, well-ventilated area for 4–6 weeks before storage' },
      { category: 'Prepare', task: 'Preserve spring surplus: freeze blanched chard, dry herbs, or make early tomato preserves if any ripe fruits are available' },
      { category: 'Maintain', task: 'Remove spent pea plants and add to compost — nitrogen-rich pea residue is excellent compost material' },
      { category: 'Watch', task: 'Spider mite populations can explode in late May heat — apply insecticidal soap on undersides of leaves early in the morning' },
      { category: 'Maintain', task: 'Stake or cage melons that are sprawling beyond their allocated space' },
    ],
    insiderNote:
      'We plant cowpeas on any bed that empties in late spring. They\'re nearly indestructible in Valley heat, fix nitrogen, and create excellent mulch when chopped and dropped in fall.',
  },

  // ── JUNE (Weeks 22–26) ──────────────────────────────────────────────────

  {
    week: 22,
    dateRange: 'Jun 1–7',
    headline: 'Peak summer heat is coming — manage water aggressively',
    summary:
      'June marks the beginning of Anderson\'s most challenging growing period. Temperatures regularly exceed 105°F. Water management is the primary gardening task.',
    tasks: [
      { category: 'Maintain', task: 'Increase irrigation frequency — drip systems may need to run twice daily during extreme heat periods' },
      { category: 'Maintain', task: 'Apply or refresh mulch on all beds — 3–4 inches of wood chips significantly reduces soil temperature and moisture loss' },
      { category: 'Harvest', task: 'Harvest tomatoes, zucchini, cucumbers, and beans regularly — heat accelerates ripening and vegetables go from perfect to overripe quickly' },
      { category: 'Watch', task: 'Monitor plants for heat stress signs: wilting at midday is normal; wilting that persists into evening means water deficit' },
      { category: 'Maintain', task: 'Continue pinching tomato suckers — crowded plants trap moisture and increase disease pressure in summer' },
    ],
    insiderNote:
      'At 108°F+, most vegetable crops stop actively growing and go into heat stress. This is normal. Keep them watered and they will resume growth when temperatures drop below 100°F.',
  },
  {
    week: 23,
    dateRange: 'Jun 8–14',
    headline: 'Harvest and process heavily',
    summary:
      'Summer production peaks in mid-June. Process or preserve what you cannot eat fresh — this is the season\'s primary bounty.',
    tasks: [
      { category: 'Harvest', task: 'Harvest cucumbers before they yellow — overmature cucumbers signal the plant to reduce production' },
      { category: 'Prepare', task: 'Process surplus: can or freeze excess tomatoes, pickle cucumbers, freeze beans in batches' },
      { category: 'Maintain', task: 'Check sweet potato beds — vines are growing aggressively now; redirect growth rather than trimming' },
      { category: 'Watch', task: 'Monitor corn for corn earworm damage at silk stage — apply Bacillus thuringiensis (Bt) to silks if moths are present' },
      { category: 'Plant', task: 'Plant a small number of heat-tolerant herb transplants: basil, epazote, and lemon grass thrive in June heat' },
    ],
  },
  {
    week: 24,
    dateRange: 'Jun 15–21',
    headline: 'Manage and maintain — this is peak summer work',
    summary:
      'Mid-June is harvest and maintenance week. The garden is fully planted; the primary job now is consistent harvesting, irrigation management, and pest scouting.',
    tasks: [
      { category: 'Harvest', task: 'Harvest zucchini every 1–2 days — in summer heat, plants produce faster than most families can eat them' },
      { category: 'Watch', task: 'Scout tomatoes for early blight — lower yellow leaves with brown spots indicate infection; remove and dispose of affected leaves' },
      { category: 'Maintain', task: 'Clear out bolted cilantro and dill — compost or collect seeds' },
      { category: 'Watch', task: 'Monitor onion storage area — cure completeness can be checked: skin should be dry and papery' },
      { category: 'Maintain', task: 'Flush drip lines mid-season if water quality is high in solids — run lines open for 2–3 minutes to clear sediment' },
    ],
  },
  {
    week: 25,
    dateRange: 'Jun 22–28',
    headline: 'Plant second succession corn',
    summary:
      'For a late August to September corn harvest, plant a second succession block now. Staggered corn plantings extend the fresh corn season.',
    tasks: [
      { category: 'Plant', task: 'Sow second succession of sweet corn in a separate block — keep new block at least 25 feet from first planting to prevent cross-pollination before first is done' },
      { category: 'Harvest', task: 'Begin harvesting first corn planting when silk turns brown and kernels are milky — do not wait for full dry husk color' },
      { category: 'Maintain', task: 'Top-dress tomatoes with compost or apply second liquid fertilizer feeding' },
      { category: 'Watch', task: 'Scout for powdery mildew on squash — hot days and cool nights create ideal conditions in late June' },
      { category: 'Prepare', task: 'Stock up on canning supplies — tomato processing season is 4–6 weeks away for most varieties' },
    ],
    insiderNote:
      'We track our corn plantings in a garden journal with exact planting dates. Corn at 50% silk requires watching daily — the harvest window is only 1–3 days from peak to past-peak.',
  },
  {
    week: 26,
    dateRange: 'Jun 29 – Jul 5',
    headline: 'Midsummer — prepare for the tomato season',
    summary:
      'Late June and early July bring the first significant tomato harvests. Have processing equipment ready before the rush.',
    tasks: [
      { category: 'Harvest', task: 'Pick first ripe tomatoes — harvest at the first sign of full color, then ripen on the counter, not the vine, during heat' },
      { category: 'Prepare', task: 'Set up canning or freezing station — have jars, lids, and equipment clean and ready' },
      { category: 'Maintain', task: 'Water every bed deeply before July 4th heat spikes, which are common in the Sacramento Valley' },
      { category: 'Plant', task: 'Sow heat-tolerant beans like Yard Long (Asparagus) or Rattlesnake pole beans — these outperform common beans in peak summer heat' },
      { category: 'Watch', task: 'Monitor melon ripeness: smell the stem end — ripe melons smell sweet. Cantaloupes should slip easily from the vine when ripe.' },
    ],
  },

  // ── JULY (Weeks 27–30) ──────────────────────────────────────────────────

  {
    week: 27,
    dateRange: 'Jul 6–12',
    headline: 'Peak tomato season — harvest and preserve',
    summary:
      'July is tomato month in Anderson. Most varieties are producing heavily. Process what you cannot eat fresh — this abundance lasts only 6–8 weeks.',
    tasks: [
      { category: 'Harvest', task: 'Harvest tomatoes every day or every other day during peak production — tomatoes crack and overripen rapidly in summer heat' },
      { category: 'Prepare', task: 'Can crushed tomatoes, make and freeze marinara, roast and freeze halved tomatoes in sheet pans — bulk processing is most efficient' },
      { category: 'Watch', task: 'Watch for blossom end rot — dark, sunken bottom of tomato fruit indicates calcium deficiency or irregular watering. Improve consistent irrigation.' },
      { category: 'Maintain', task: 'Prevent water stress during heat waves — tomatoes that wilt severely once often develop splitting and blossom drop in subsequent days' },
      { category: 'Plant', task: 'Continue nursing fall broccoli seedlings started in May — pot up to 4-inch containers if root-bound' },
    ],
    insiderNote:
      'We freeze roasted tomatoes in quart bags rather than canning them. Roasting concentrates flavor, the process is faster than water bath canning, and the product is more versatile.',
  },
  {
    week: 28,
    dateRange: 'Jul 13–19',
    headline: 'Extreme heat management',
    summary:
      'Mid-July in Anderson regularly brings multi-day stretches above 110°F. The garden needs extra attention during these events.',
    tasks: [
      { category: 'Maintain', task: 'During extreme heat (above 108°F): run drip irrigation twice daily, early morning and late afternoon' },
      { category: 'Maintain', task: 'Deploy shade cloth (30–40%) over most vulnerable crops — peppers, beans, and newly transplanted starts benefit most' },
      { category: 'Watch', task: 'Check for spider mites daily during extreme heat — populations can double every 5 days at 110°F' },
      { category: 'Harvest', task: 'Harvest everything at first light when temperatures are tolerable — work in the garden only in the early morning and evening' },
      { category: 'Maintain', task: 'Add additional mulch if soil is drying between irrigation cycles even with daily watering' },
    ],
  },
  {
    week: 29,
    dateRange: 'Jul 20–26',
    headline: 'Start thinking about fall planting',
    summary:
      'In late July, the fall garden begins. Fall crops in Anderson are often more productive than spring crops — cooler temperatures from October through December support extended harvests.',
    tasks: [
      { category: 'Plant', task: 'Start second brassica succession indoors for fall — broccoli, cabbage, bok choy for September transplanting' },
      { category: 'Plant', task: 'Start lettuce seeds indoors under lights — summer heat kills outdoor lettuce, so start under cool, shaded conditions' },
      { category: 'Maintain', task: 'Continue peak tomato harvest and processing' },
      { category: 'Watch', task: 'Scout winter squash — many varieties will be ready for harvest in August; test by pressing fingernail into skin (no dent = ripe)' },
      { category: 'Prepare', task: 'Clear and amend beds that will be used for fall transplants — incorporate compost now to allow settlement before August transplanting' },
    ],
    insiderNote:
      'We start our fall broccoli and bok choy in mid-to-late July. In Anderson\'s fall, the harvests that come in October and November are consistently better than anything we grow in spring.',
  },
  {
    week: 30,
    dateRange: 'Jul 27 – Aug 2',
    headline: 'Harvest winter squash and start fall season',
    summary:
      'Winter squash planted in April is nearing maturity. Late July to August is harvest time for many varieties — and the transition to the fall garden begins in earnest.',
    tasks: [
      { category: 'Harvest', task: 'Harvest mature winter squash — look for hardened skin, dried stem, and ground spot turning from white to yellow-orange' },
      { category: 'Prepare', task: 'Cure winter squash in a warm, dry location for 10–14 days before storage to harden the skin' },
      { category: 'Plant', task: 'Direct sow fall beans on beds that will be cleared of summer crops — they will mature before first frost in December' },
      { category: 'Maintain', task: 'Keep heat-stressed tomatoes alive through August — consistent water is the key, even if fruit set is slow' },
      { category: 'Watch', task: 'Scout sweet potatoes — dig a test root to check size. Most Anderson sweet potato plantings are harvest-ready in October.' },
    ],
  },

  // ── AUGUST (Weeks 31–35) ────────────────────────────────────────────────

  {
    week: 31,
    dateRange: 'Aug 3–9',
    headline: 'Transition to fall — transplant brassicas',
    summary:
      'Brassica transplants started in late May are ready for the ground. August transplanting sounds harsh but brassicas establish during August heat and hit their stride as October cools.',
    tasks: [
      { category: 'Plant', task: 'Transplant fall broccoli, cabbage, and cauliflower started in May — water daily for the first 2 weeks; consider afternoon shade cloth' },
      { category: 'Plant', task: 'Direct sow turnips and daikon radish outdoors — both germinate well in August heat and are ready for harvest in 45–60 days' },
      { category: 'Plant', task: 'Direct sow fall carrots for October–November harvest — carrots germinate in 50–80°F soil' },
      { category: 'Maintain', task: 'Clear spent summer crops as they decline — bean plants exhausted by heat, overgrown zucchini plants, finished pea trellises' },
      { category: 'Watch', task: 'Monitor newly transplanted brassicas for immediate aphid pressure — aphids find fresh transplants quickly' },
    ],
    insiderNote:
      'Water is critical for August transplanting success. We install a temporary overhead misting system for the first week after brassica transplanting — it keeps soil and plant temperatures down during establishment.',
  },
  {
    week: 32,
    dateRange: 'Aug 10–16',
    headline: 'Keep irrigating — fall crops are establishing',
    summary:
      'August is still hot. Fall transplants are in, but they need consistent moisture to establish before temperatures drop. Do not let them stress.',
    tasks: [
      { category: 'Maintain', task: 'Water fall brassica transplants daily until established — heat stress before root contact with surrounding soil can kill transplants' },
      { category: 'Plant', task: 'Sow green onion seeds directly into beds for fall harvest' },
      { category: 'Plant', task: 'Transplant lettuce starts into beds shaded by taller crops — afternoon shade is essential for August lettuce establishment' },
      { category: 'Harvest', task: 'Harvest remaining summer production: tomatoes, peppers, and melons are still producing' },
      { category: 'Maintain', task: 'Clear finished corn stalks — chop and compost or cut at soil level and leave roots to decompose' },
    ],
  },
  {
    week: 33,
    dateRange: 'Aug 17–23',
    headline: 'Direct sow fall greens',
    summary:
      'By mid-August, soil temperatures are beginning to moderate slightly. Direct sowing of fall greens now captures the warm germination period while allowing plants to mature in cool fall weather.',
    tasks: [
      { category: 'Plant', task: 'Direct sow Swiss chard, kale, and collard greens outdoors — all germinate in late-summer heat and grow into fall' },
      { category: 'Plant', task: 'Sow spinach and arugula in partially shaded beds — full sun in August is too harsh for germination; afternoon shade helps' },
      { category: 'Harvest', task: 'Harvest and dry or freeze summer herbs: basil, oregano, thyme, rosemary — all are at peak oil concentration before fall' },
      { category: 'Watch', task: 'Monitor tomatoes for late blight — temperatures begin to cool at night, which creates conditions for late blight spread' },
      { category: 'Maintain', task: 'Begin reducing irrigation on winter squash that is approaching harvest — stressed vines accelerate final curing' },
    ],
  },
  {
    week: 34,
    dateRange: 'Aug 24–30',
    headline: 'August heat breaks are coming — capitalize on them',
    summary:
      'Late August in Anderson often brings the first brief temperature breaks — days in the 90s instead of 110s. These windows allow more comfortable garden work and faster plant recovery.',
    tasks: [
      { category: 'Prepare', task: 'Amend and prepare empty beds with compost for September transplanting of fall crops' },
      { category: 'Plant', task: 'Start a final round of brassica seeds indoors for November transplanting and January harvest' },
      { category: 'Harvest', task: 'Pick and process remaining summer abundance before it declines in September — last chance for large-batch tomato processing' },
      { category: 'Maintain', task: 'Side-dress fall brassica transplants with nitrogen fertilizer — they are now establishing and need to push vegetative growth before heading' },
      { category: 'Watch', task: 'Scout for whitefly on pepper and eggplant — populations often spike in late August' },
    ],
  },
  {
    week: 35,
    dateRange: 'Aug 31 – Sep 6',
    headline: 'September: the fall garden\'s foundation',
    summary:
      'September is the beginning of the most pleasant growing period in Anderson. Temperatures moderate, and the fall garden is entering its productive phase.',
    tasks: [
      { category: 'Plant', task: 'Transplant fall lettuce starts into full production beds — September transplants are ideal for October–November harvest' },
      { category: 'Plant', task: 'Direct sow fall peas — bush peas for November harvest before frost' },
      { category: 'Harvest', task: 'Harvest sweet potatoes when a test dig shows roots of adequate size — typically 90–120 days from slip planting' },
      { category: 'Prepare', task: 'Cure sweet potatoes in a warm, humid area for 10–14 days to develop sugars and harden skin for storage' },
      { category: 'Maintain', task: 'Continue summer crop irrigation — tomatoes and peppers are still productive in September and need consistent water' },
    ],
    insiderNote:
      'September is our favorite month in the garden. The heat breaks, the fall crops are establishing, and the summer crops are still producing. There is a lot to harvest and nowhere near enough hands.',
  },

  // ── SEPTEMBER (Weeks 36–39) ─────────────────────────────────────────────

  {
    week: 36,
    dateRange: 'Sep 7–13',
    headline: 'Fall garden is in full swing',
    summary:
      'September brings rapid cooling and accelerated fall crop growth. Crops that were establishing slowly through August heat now begin growing quickly.',
    tasks: [
      { category: 'Harvest', task: 'Harvest fall turnips and daikon sown in August — check size by pulling a test plant' },
      { category: 'Plant', task: 'Sow cilantro and dill for fall use — September is the best month for these bolt-prone herbs in Anderson' },
      { category: 'Maintain', task: 'Reduce irrigation frequency as September temperatures moderate — overwatering in fall promotes root disease' },
      { category: 'Watch', task: 'Scout brassicas for imported cabbage worm and diamondback moth larvae — fall populations can be high' },
      { category: 'Plant', task: 'Plant garlic cloves if you have them from this year\'s cured crop — replanting best cloves maintains your own varieties' },
    ],
  },
  {
    week: 37,
    dateRange: 'Sep 14–20',
    headline: 'Plant fall garlic and onions',
    summary:
      'Mid-September is the beginning of the garlic and overwintering allium planting season in Zone 9b. Fall-planted garlic overwinters and is harvested the following June.',
    tasks: [
      { category: 'Plant', task: 'Plant garlic cloves 2 inches deep, 6 inches apart, pointed end up — plant from certified disease-free seed garlic or save your own best cloves' },
      { category: 'Plant', task: 'Plant shallot starts or seed bulbs for spring harvest' },
      { category: 'Harvest', task: 'Harvest mature peppers before any frost risk — peppers are sensitive to cold; don\'t leave them exposed to below-40°F nights' },
      { category: 'Plant', task: 'Sow spinach and lettuce succession for November and December harvest' },
      { category: 'Maintain', task: 'Inspect and clean canning equipment after the summer canning season' },
    ],
    insiderNote:
      'We plant garlic every September 15th as a reliable ritual. The exact date matters less than the timing — soil needs to be below 65°F consistently for garlic to begin root development without pushing premature top growth.',
  },
  {
    week: 38,
    dateRange: 'Sep 21–27',
    headline: 'Transition beds from summer to fall crops',
    summary:
      'As summer crops decline or are removed, transition beds systematically to fall crops. This is the busiest changeover period of the year.',
    tasks: [
      { category: 'Prepare', task: 'Pull spent tomato plants, add to compost, and immediately amend the bed with compost for a fall replanting' },
      { category: 'Plant', task: 'Plant fall brassica transplants on beds cleared of summer crops — they have until December to produce' },
      { category: 'Harvest', task: 'Harvest remaining summer squash before declining plants become messy' },
      { category: 'Plant', task: 'Sow cool-season cover crops (crimson clover, bell beans, cereal rye) on beds that will rest over winter' },
      { category: 'Maintain', task: 'Compost all summer crop residue — do not leave dead plants in beds over winter as pest and disease habitat' },
    ],
  },
  {
    week: 39,
    dateRange: 'Sep 28 – Oct 4',
    headline: 'October harvest begins',
    summary:
      'October in Anderson is harvest season for root crops, winter squash, sweet potatoes, and the first fall greens. The garden is at its most abundant.',
    tasks: [
      { category: 'Harvest', task: 'Dig sweet potatoes before first frost (December 15 average) — no rush, but earlier harvest prevents skin damage from cold soil' },
      { category: 'Harvest', task: 'Begin harvesting fall broccoli as heads form — harvest when heads are dense, before they begin to flower' },
      { category: 'Plant', task: 'Plant fava beans for overwinter growth and spring harvest — favas are hardy to 20°F' },
      { category: 'Maintain', task: 'Reduce irrigation further as fall temperatures drop and natural rainfall may begin' },
      { category: 'Watch', task: 'Watch weather for first frost risk — Zone 9b\'s first frost is December 15 average, but early cold snaps can arrive in late November' },
    ],
  },

  // ── OCTOBER–DECEMBER (Weeks 40–52) ──────────────────────────────────────

  {
    week: 40,
    dateRange: 'Oct 5–11',
    headline: 'Fall harvest is in — process and store the bounty',
    summary:
      'October brings the garden\'s second major processing season. Root crops, winter squash, and sweet potatoes need curing and storage. Fall greens begin their peak production.',
    tasks: [
      { category: 'Harvest', task: 'Harvest and cure all remaining root crops, squash, and sweet potatoes for winter storage' },
      { category: 'Harvest', task: 'Pick remaining peppers — green peppers ripen to red on the counter; harvest before frost' },
      { category: 'Plant', task: 'Plant overwintering onion varieties (multiplier onions, Walla Walla) for spring harvest' },
      { category: 'Maintain', task: 'Compost remaining summer annual plant material and bed cleanup' },
      { category: 'Plant', task: 'Continue fall lettuce succession — October is excellent for germination and establishment' },
    ],
  },
  {
    week: 41,
    dateRange: 'Oct 12–18',
    headline: 'Cool-season crops are thriving',
    summary:
      'October temperatures in Anderson are ideal for cool-season crops. Brassicas, greens, root crops, and legumes are growing rapidly in pleasant conditions.',
    tasks: [
      { category: 'Harvest', task: 'Pick broccoli side shoots regularly after main heads are cut — plants produce prolifically through November' },
      { category: 'Harvest', task: 'Begin harvesting fall carrots — size check by pulling a test plant' },
      { category: 'Maintain', task: 'Apply fall fertilizer to fruit trees — potassium-focused fertilizer supports next year\'s wood hardening' },
      { category: 'Watch', task: 'Continue monitoring brassicas for caterpillar pressure — imported cabbage worm is active through October' },
      { category: 'Plant', task: 'Sow winter peas and fava beans if not already done' },
    ],
  },
  {
    week: 42,
    dateRange: 'Oct 19–25',
    headline: 'Garlic is establishing underground',
    summary:
      'Fall-planted garlic is now developing its root system underground. Keep beds weeded and lightly watered to support establishment before winter rains arrive.',
    tasks: [
      { category: 'Maintain', task: 'Weed garlic beds carefully — garlic is heavily suppressed by weed competition in its early months' },
      { category: 'Maintain', task: 'Apply light irrigation to garlic beds if fall rains have not yet arrived' },
      { category: 'Harvest', task: 'Continue harvesting fall greens: kale, chard, spinach, lettuce at peak production' },
      { category: 'Prepare', task: 'Order seed catalogs and begin planning next year\'s garden — now is the best time to reflect on this season' },
      { category: 'Maintain', task: 'Rake fallen fruit tree leaves and add to compost — leaving them under trees provides overwintering habitat for pest insects' },
    ],
  },
  {
    week: 43,
    dateRange: 'Oct 26 – Nov 1',
    headline: 'First rains arrive — adjust irrigation and enjoy',
    summary:
      'Late October often brings the first significant rainfall in Anderson. Adjust or shut off irrigation systems as natural precipitation takes over.',
    tasks: [
      { category: 'Maintain', task: 'Monitor rain gauge and turn off or reduce drip irrigation when rain provides adequate moisture' },
      { category: 'Prepare', task: 'Clean and store summer irrigation equipment that will not be used until spring' },
      { category: 'Plant', task: 'Continue sowing cool-season cover crops on any empty beds' },
      { category: 'Harvest', task: 'Harvest mature winter squash stored on vines — squash handles light frost but not repeated hard freezes' },
      { category: 'Maintain', task: 'Apply dormant oil to fruit trees after leaf drop begins — late October start of dormant season spray program' },
    ],
  },
  {
    week: 44,
    dateRange: 'Nov 2–8',
    headline: 'November — the garden quiets and the soil rests',
    summary:
      'November brings cool weather and often the first real rains. The heavy lifting of summer is over. Focus shifts to enjoying the fall harvest and preparing for next year.',
    tasks: [
      { category: 'Harvest', task: 'Continue harvesting fall brassicas, greens, and root vegetables — production continues through December' },
      { category: 'Prepare', task: 'Evaluate this year\'s successes and failures — make notes while memory is fresh, before the end of the season' },
      { category: 'Plant', task: 'Plant overwintering crimson clover or bell beans as cover crops on any empty beds' },
      { category: 'Maintain', task: 'Check stored winter squash, sweet potatoes, and garlic for any signs of rot — remove and use any showing soft spots' },
      { category: 'Watch', task: 'Monitor for slugs — the first significant rains bring slug pressure on low-growing greens' },
    ],
    insiderNote:
      'November is when we update our garden journal with what worked and what did not. The specific observations made this month determine what we plant differently next year.',
  },
  {
    week: 45,
    dateRange: 'Nov 9–15',
    headline: 'Maintain winter garden crops',
    summary:
      'Mid-November, the fall garden is still fully productive. Cool temperatures extend the life of cool-season crops significantly.',
    tasks: [
      { category: 'Harvest', task: 'Pick kale and chard — these improve in flavor after light frost, which intensifies their sweetness' },
      { category: 'Harvest', task: 'Harvest mature fall carrots before hard freezes in December — roots left in cold, wet soil can deteriorate' },
      { category: 'Maintain', task: 'Apply straw mulch over fall-planted garlic and root crops to insulate soil for winter' },
      { category: 'Watch', task: 'Monitor fava beans — they should be actively growing and benefiting from fall rains' },
      { category: 'Prepare', task: 'Begin ordering seeds for January arrival — early January planting of onions requires seeds on hand' },
    ],
  },
  {
    week: 46,
    dateRange: 'Nov 16–22',
    headline: 'Late-season brassica harvest',
    summary:
      'Fall brassicas are reaching their most productive phase. Broccoli side shoots, cabbage heads, and cauliflower are all coming in.',
    tasks: [
      { category: 'Harvest', task: 'Harvest mature cabbage heads before heavy rain causes splitting — store in refrigerator or root cellar' },
      { category: 'Harvest', task: 'Harvest cauliflower when heads are full — they do not hold as long as broccoli before over-maturing' },
      { category: 'Plant', task: 'Make a final direct sow of cold-hardy lettuce and spinach — these can handle Zone 9b winters with minor frost protection' },
      { category: 'Maintain', task: 'Apply second dormant spray application to fruit trees if needed after any late-season rain' },
      { category: 'Prepare', task: 'Finalize seed orders — most seed companies begin shipping January–February' },
    ],
  },
  {
    week: 47,
    dateRange: 'Nov 23–29',
    headline: 'Pre-winter bed preparation',
    summary:
      'As crops come out, prepare beds for the winter rest period. Winter cover crops, mulch, and soil amendments set up next year\'s production.',
    tasks: [
      { category: 'Prepare', task: 'Clear spent crop material and spread compost on beds that will rest over winter — let winter rain incorporate it' },
      { category: 'Plant', task: 'Sow overwintering cover crop on any empty beds: bell beans, crimson clover, or cereal rye all winter well in Zone 9' },
      { category: 'Maintain', task: 'Prune dead or diseased wood from fruit trees as dormancy deepens' },
      { category: 'Harvest', task: 'Harvest remaining fall production before predicted first frost in December' },
      { category: 'Prepare', task: 'Drain and store drip lines from any beds that will not irrigate over winter' },
    ],
  },
  {
    week: 48,
    dateRange: 'Nov 30 – Dec 6',
    headline: 'First frost may come — protect tender crops',
    summary:
      'Anderson\'s first frost average is December 15, but early frost is possible in late November or early December. Have frost protection on hand.',
    tasks: [
      { category: 'Watch', task: 'Watch nighttime temperature forecasts — at 33°F, deploy frost cloth over sensitive crops' },
      { category: 'Prepare', task: 'Confirm frost cloth or row cover is accessible and in good condition' },
      { category: 'Harvest', task: 'Harvest remaining peppers, eggplant, and any remaining summer crops before first frost' },
      { category: 'Maintain', task: 'Continue harvesting cold-hardy greens — kale, chard, collards, and spinach are frost-tolerant' },
      { category: 'Prepare', task: 'Apply dormant copper spray to stone fruit trees at full dormancy' },
    ],
    insiderNote:
      'We always harvest remaining peppers before any forecast frost, even borderline ones. Peppers do not recover from frost damage — a single hard freeze destroys the entire plant.',
  },
  {
    week: 49,
    dateRange: 'Dec 7–13',
    headline: 'Dormant season care — fruit trees and soil',
    summary:
      'December is pruning, dormant spraying, and soil amendment season. The main garden is winding down, but fall crops like kale, chard, and broccoli are still producing.',
    tasks: [
      { category: 'Maintain', task: 'Prune fruit trees during full dormancy — this is the most productive pruning window' },
      { category: 'Maintain', task: 'Apply dormant oil and copper spray program to all stone fruit and pome fruit trees' },
      { category: 'Harvest', task: 'Continue harvesting cold-tolerant greens through December' },
      { category: 'Prepare', task: 'Plan next year\'s crop rotation — now is the time to decide which plant families move to which beds' },
      { category: 'Maintain', task: 'Check garlic beds for emergence — a little green is fine; heavy emergence should be mulched to slow growth before winter cold' },
    ],
  },
  {
    week: 50,
    dateRange: 'Dec 14–20',
    headline: 'First frost week — protect or harvest remaining crops',
    summary:
      'The average first frost date for Anderson is December 15. This week, harvest anything frost-sensitive and protect cold-hardy crops with row cover.',
    tasks: [
      { category: 'Harvest', task: 'Harvest all frost-sensitive remaining crops before the week is out' },
      { category: 'Maintain', task: 'Deploy row cover over lettuce and spinach if hard freeze (below 28°F) is forecast' },
      { category: 'Prepare', task: 'Apply winter mulch to garlic and overwintering beds' },
      { category: 'Maintain', task: 'Reduce or eliminate irrigation on beds with dormant cover crops — winter rains are handling moisture needs' },
      { category: 'Prepare', task: 'Finalize next year\'s seed list — start with varieties you know work in Zone 9b, then experiment with 1–2 new ones' },
    ],
  },
  {
    week: 51,
    dateRange: 'Dec 21–27',
    headline: 'Rest and plan',
    summary:
      'Late December is the quietest week in the Anderson garden. Cold-hardy crops continue to produce slowly. The soil rests. Plan next year.',
    tasks: [
      { category: 'Harvest', task: 'Harvest kale, chard, collards, and broccoli side shoots — all are cold-tolerant and still producing' },
      { category: 'Prepare', task: 'Review this year\'s garden journal — what worked, what did not, what to do differently' },
      { category: 'Prepare', task: 'Finalize seed orders for January delivery' },
      { category: 'Maintain', task: 'Apply dormant spray to any fruit trees that were missed earlier in the month' },
      { category: 'Prepare', task: 'Clean and sharpen garden tools — hoes, pruners, shovels, and hand tools all benefit from end-of-year maintenance' },
    ],
    insiderNote:
      'Sharpening tools is the one garden task that truly pays compound interest. A sharp hoe cuts weeds; a dull one bruises them. We sharpen everything before January and the tools feel new.',
  },
  {
    week: 52,
    dateRange: 'Dec 28–31',
    headline: 'Year\'s end — the cycle completes',
    summary:
      'The final days of December close out the garden year. Anderson\'s winter greens are still producing slowly, the garlic is underground, and the beds that will carry next year\'s crops are resting.',
    tasks: [
      { category: 'Harvest', task: 'Harvest whatever the garden offers — this is a harvest and gratitude week, not a work week' },
      { category: 'Prepare', task: 'Set up your seed-starting supply station — have trays, heat mat, grow light, and timer ready for January seed starting' },
      { category: 'Maintain', task: 'Final tool cleaning and storage' },
      { category: 'Prepare', task: 'Confirm seed orders are placed and delivery is expected before first start dates in January' },
      { category: 'Watch', task: 'Check stored root crops, squash, and garlic — mid-winter is when storage problems first appear' },
    ],
    insiderNote:
      'We\'ve grown food in this Valley for years and the feeling of closing the garden year with the freezer full, the root cellar stocked, and the beds ready for January never gets old. That\'s what this is all for.',
  },
];

// ─── Build a lookup map for O(1) week access ─────────────────────────────────
const ANDERSON_MAP = new Map<number, WeeklyRecommendation>(
  ANDERSON_RECOMMENDATIONS.map((r) => [r.week, r]),
);

// ─── Public API ──────────────────────────────────────────────────────────────

export function getCityInfo(citySlug: string): CityInfo | undefined {
  return SUPPORTED_CITIES.find((c) => c.name === citySlug);
}

export function getWeeklyRecommendation(
  citySlug: string,
  week: number,
): WeeklyRecommendation | undefined {
  // Currently only Anderson has full data; other cities fall back to Anderson
  // with minor differences noted in the city description.
  const clampedWeek = Math.min(52, Math.max(1, week));
  return ANDERSON_MAP.get(clampedWeek);
}

export function getRecommendationsForMonth(
  citySlug: string,
  month: number, // 1–12
): WeeklyRecommendation[] {
  // Approximate: weeks 1–4 = Jan, 5–8 = Feb, ..., 49–52 = Dec
  const startWeek = (month - 1) * 4 + 1;
  const endWeek = Math.min(52, startWeek + 3);
  const results: WeeklyRecommendation[] = [];
  for (let w = startWeek; w <= endWeek; w++) {
    const rec = getWeeklyRecommendation(citySlug, w);
    if (rec) results.push(rec);
  }
  return results;
}
