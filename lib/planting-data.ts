/**
 * Zone 9b planting data for the Sacramento Valley (Anderson, CA)
 *
 * Sources:
 * - UC ANR Vegetable Planting Guide (anr.ucanr.edu)
 * - UC Cooperative Extension Shasta/Tehama County
 * - USDA NRCS Zone 9b hardiness data
 * - NOAA frost probability data for Anderson, CA (station USW00024257 / Redding area)
 * - Botanical Interests planting charts (botanicalinterests.com)
 * - Johnny's Selected Seeds zone planting guide (johnnyseeds.com)
 * - High Mowing Organic Seeds planting calendar
 * - UC Davis IPM Online (ipm.ucanr.edu)
 * - National Gardening Association Zone Finder
 *
 * Frost dates (50% probability, Anderson CA ~365 ft elevation):
 *   Last spring frost:  Feb 5–15
 *   First fall frost:   Nov 18–28
 *   Frost-free season:  ~275–295 days
 */

export type Season = "warm" | "cool" | "perennial";
export type SowMethod = "indoor" | "direct" | "transplant" | "sets" | "cloves";

export type CropEntry = {
  crop: string;
  category: string;
  season: Season;
  indoorStart?: string;     // month range, e.g. "Feb–Mar"
  directSow?: string;
  transplant?: string;
  daysToMaturity: string;
  notes: string;
  sources: string[];
};

export const SEED_STARTING_DATA: CropEntry[] = [
  // ── WARM SEASON — Start Indoors ──────────────────────────────────────────
  {
    crop: "Tomato",
    category: "Fruiting",
    season: "warm",
    indoorStart: "Feb 15–Mar 15",
    transplant: "Apr 1–May 1",
    daysToMaturity: "60–85",
    notes:
      "Start 6–8 weeks before last frost. Harden off 7–10 days. Plant deep — bury 2/3 of stem. Avoid transplanting until nights are consistently above 50°F.",
    sources: ["UC ANR", "Johnny's Selected Seeds", "Botanical Interests"],
  },
  {
    crop: "Pepper (sweet & hot)",
    category: "Fruiting",
    season: "warm",
    indoorStart: "Feb 1–Mar 1",
    transplant: "Apr 15–May 15",
    daysToMaturity: "70–90",
    notes:
      "Slow germination (14–21 days); bottom heat 80–85°F recommended. Needs warmer soil than tomatoes — wait until soil is 65°F+. Never transplant into cold soil.",
    sources: ["UC ANR", "Johnny's Selected Seeds", "Botanical Interests"],
  },
  {
    crop: "Eggplant",
    category: "Fruiting",
    season: "warm",
    indoorStart: "Feb 1–Mar 1",
    transplant: "Apr 15–May 15",
    daysToMaturity: "65–85",
    notes:
      "Requires soil temps of 70°F+ to thrive. Zone 9b summers are ideal. Start indoors 8–10 weeks before transplant date.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Basil",
    category: "Herb",
    season: "warm",
    indoorStart: "Mar 1–Apr 1",
    directSow: "Apr 15–Jun 1",
    transplant: "Apr 15–May 15",
    daysToMaturity: "25–35 (to harvest)",
    notes:
      "Cold-sensitive — never transplant below 50°F nights. Direct sow after soil warms. Pinch flowers to extend harvest.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Tomatillo",
    category: "Fruiting",
    season: "warm",
    indoorStart: "Feb 15–Mar 15",
    transplant: "Apr 1–May 1",
    daysToMaturity: "75–100",
    notes:
      "Same timing as tomatoes. Needs two plants for pollination. Extremely heat-tolerant — thrives in Zone 9b summers.",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Celery",
    category: "Vegetable",
    season: "cool",
    indoorStart: "Jan 1–Feb 1",
    transplant: "Feb 15–Mar 15",
    daysToMaturity: "100–120",
    notes:
      "Very long season. Needs consistent moisture. Start 10–12 weeks before transplant. Thin seedlings carefully.",
    sources: ["UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Broccoli (spring)",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jan 1–Feb 1",
    transplant: "Feb 15–Mar 15",
    daysToMaturity: "60–80",
    notes:
      "Spring crop must be established and heading before summer heat. In Zone 9b, spring window is narrow — prioritize fall crop.",
    sources: ["UC ANR", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Broccoli (fall)",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jul 1–Aug 1",
    transplant: "Aug 1–Sep 1",
    daysToMaturity: "60–80",
    notes:
      "Fall crop is the primary Zone 9b brassica window. Start from seed in July in trays; transplant when 3–4 weeks old.",
    sources: ["UC ANR", "UC Cooperative Extension Shasta County"],
  },
  {
    crop: "Cabbage (spring)",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jan 1–Feb 1",
    transplant: "Feb 15–Mar 15",
    daysToMaturity: "65–90",
    notes:
      "Choose fast-maturing varieties (Golden Acre, Farao) for spring. Fall cabbage (Aug transplant) is more reliable in Zone 9b.",
    sources: ["UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Cabbage (fall)",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jul 1–Aug 1",
    transplant: "Aug 1–Sep 1",
    daysToMaturity: "65–90",
    notes:
      "Prefers maturing in cool weather. Fall transplants harvest Oct–Dec. Good storage crop.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Cauliflower",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jul 1–Aug 1",
    transplant: "Aug 1–Sep 1",
    daysToMaturity: "70–85",
    notes:
      "Fall is the best window in Zone 9b. Sensitive to both frost and heat. Blanch heads by tying outer leaves when curd is 2–3 inches.",
    sources: ["UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Kale (fall)",
    category: "Brassica",
    season: "cool",
    indoorStart: "Jul 15–Aug 15",
    directSow: "Aug 1–Sep 1",
    transplant: "Aug 15–Sep 15",
    daysToMaturity: "55–75",
    notes:
      "Frost improves flavor. Lacinato (dinosaur) and Red Russian perform well in Zone 9b winters. Can direct sow or transplant.",
    sources: ["Botanical Interests", "High Mowing Organic Seeds"],
  },
  {
    crop: "Onion (from seed)",
    category: "Allium",
    season: "cool",
    indoorStart: "Nov 1–Dec 15",
    transplant: "Jan 15–Mar 1",
    daysToMaturity: "100–120 (from transplant)",
    notes:
      "Long-day varieties for Zone 9b (Walla Walla, Yellow Sweet Spanish). Start 10–12 weeks before transplant. Thin to pencil thickness before planting out.",
    sources: ["Johnny's Selected Seeds", "Botanical Interests", "UC ANR"],
  },
  {
    crop: "Leek",
    category: "Allium",
    season: "cool",
    indoorStart: "Nov 1–Jan 15",
    transplant: "Jan 15–Mar 1",
    daysToMaturity: "105–130",
    notes:
      "Very long season; start early. Plant in trenches and hill up soil as they grow to blanch shanks.",
    sources: ["Johnny's Selected Seeds", "UC ANR"],
  },
  {
    crop: "Parsley",
    category: "Herb",
    season: "cool",
    indoorStart: "Jan 1–Feb 15",
    directSow: "Feb 1–Apr 1",
    transplant: "Feb 15–Mar 15",
    daysToMaturity: "70–90",
    notes:
      "Slow to germinate (14–28 days). Soak seeds overnight before sowing. Biennial — if overwintered, bolts in second spring.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds"],
  },

  // ── WARM SEASON — Direct Sow ────────────────────────────────────────────
  {
    crop: "Bush Bean",
    category: "Legume",
    season: "warm",
    directSow: "Apr 1–Jul 15",
    daysToMaturity: "50–60",
    notes:
      "Sow 1\" deep, 3–4\" apart. Soil must be 60°F+. Succession plant every 3 weeks through July for continuous harvest. Last sow by Jul 15 for fall harvest before frost.",
    sources: ["Botanical Interests", "UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Pole Bean",
    category: "Legume",
    season: "warm",
    directSow: "Apr 1–Jul 1",
    daysToMaturity: "60–70",
    notes:
      "More heat-tolerant than bush beans. Provide 6–8 ft trellis. Higher yield per sq ft. Keep well-watered in Zone 9b heat.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Sweet Corn",
    category: "Grain",
    season: "warm",
    directSow: "Apr 1–Jun 15",
    daysToMaturity: "65–90",
    notes:
      "Sow in blocks (4+ rows) for wind pollination. Soil temp 55°F+ required. Separate sweet corn varieties by 400+ ft or stagger timing by 10 days to prevent cross-pollination.",
    sources: ["UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Cucumber",
    category: "Cucurbit",
    season: "warm",
    indoorStart: "Mar 15–Apr 15",
    directSow: "Apr 15–Jul 1",
    transplant: "Apr 1–Jun 1",
    daysToMaturity: "50–70",
    notes:
      "Cucumbers resent root disturbance — use biodegradable pots if starting indoors. Direct sow is usually easier. Needs consistent moisture; irregular watering causes bitterness.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Summer Squash / Zucchini",
    category: "Cucurbit",
    season: "warm",
    directSow: "Apr 1–Jul 1",
    daysToMaturity: "48–60",
    notes:
      "Highly productive in Zone 9b heat. Harvest frequently (every 1–2 days at peak) to prevent oversizing. Powdery mildew common in late summer — choose resistant varieties.",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Winter Squash / Pumpkin",
    category: "Cucurbit",
    season: "warm",
    directSow: "Apr 15–Jun 1",
    daysToMaturity: "80–115",
    notes:
      "Plant early enough to mature before first frost (Nov 18). Butternut, Delicata, and Hubbard are reliable Zone 9b performers. One plant needs 25–50 sq ft.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds", "UC ANR"],
  },
  {
    crop: "Watermelon",
    category: "Cucurbit",
    season: "warm",
    indoorStart: "Mar 15–Apr 15",
    directSow: "May 1–Jun 1",
    transplant: "Apr 15–Jun 1",
    daysToMaturity: "80–90",
    notes:
      "Zone 9b heat is ideal for watermelons. Needs consistently warm soil (70°F+). Space hills 6 ft apart. Stop irrigation 1–2 weeks before harvest for sweetest fruit.",
    sources: ["UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Cantaloupe / Muskmelon",
    category: "Cucurbit",
    season: "warm",
    indoorStart: "Mar 15–Apr 15",
    transplant: "Apr 15–Jun 1",
    directSow: "May 1–Jun 1",
    daysToMaturity: "75–90",
    notes:
      "Thrives in Sacramento Valley heat. Ripe when stem slips easily from fruit. Reduce water in final 2 weeks of ripening.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Okra",
    category: "Fruiting",
    season: "warm",
    directSow: "May 1–Jun 15",
    daysToMaturity: "50–65",
    notes:
      "Requires sustained heat — ideal for Zone 9b July–August. Soak seeds 12–24 hours before planting. Harvest pods at 3–4\" to keep plants producing.",
    sources: ["Botanical Interests", "UC ANR"],
  },

  // ── COOL SEASON — Direct Sow ──────────────────────────────────────────
  {
    crop: "Lettuce",
    category: "Green",
    season: "cool",
    directSow: "Feb 1–Apr 15 / Sep 1–Nov 15",
    daysToMaturity: "45–60 (head) / 30–40 (leaf)",
    notes:
      "Two prime windows in Zone 9b: spring (Feb–Apr) and fall (Sep–Nov). Germinates best at 60–70°F. Bolts quickly in heat above 80°F. Succession sow every 2–3 weeks.",
    sources: ["UC ANR", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Spinach",
    category: "Green",
    season: "cool",
    directSow: "Feb 1–Mar 31 / Sep 1–Oct 31",
    daysToMaturity: "40–50",
    notes:
      "Best cool-season green for Zone 9b fall. Germinates poorly above 75°F. Savoy types are more cold-hardy. Spring crop is very short in Zone 9b — fall is primary.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Arugula",
    category: "Green",
    season: "cool",
    directSow: "Feb 1–Apr 15 / Sep 1–Nov 30",
    daysToMaturity: "35–45",
    notes:
      "Fastest cool-season crop. Bolt-resistant varieties (Astro) last longer into spring. Fall arugula often overwinters in Zone 9b. Direct sow thickly and thin or cut-and-come-again.",
    sources: ["Johnny's Selected Seeds", "Botanical Interests"],
  },
  {
    crop: "Peas (snap / snow / shelling)",
    category: "Legume",
    season: "cool",
    directSow: "Jan 15–Mar 15",
    daysToMaturity: "60–70",
    notes:
      "Plant as soon as soil can be worked. Zone 9b spring heats up fast — early January planting gives the longest harvest window. Provide trellis for snap/snow types. Inoculate seed with rhizobium for nitrogen fixation.",
    sources: ["Botanical Interests", "UC ANR", "Johnny's Selected Seeds"],
  },
  {
    crop: "Carrot",
    category: "Root",
    season: "cool",
    directSow: "Feb 1–Apr 15 / Sep 1–Oct 31",
    daysToMaturity: "70–80",
    notes:
      "Sow shallowly (1/4\") in fine soil. Keep surface moist until germination (10–21 days). Nantes and Chantenay types perform well in Sacramento Valley clay. Fall carrots sweetened by frost.",
    sources: ["UC ANR", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Beet",
    category: "Root",
    season: "cool",
    directSow: "Feb 1–Apr 30 / Sep 1–Oct 31",
    daysToMaturity: "55–70",
    notes:
      "Each seed cluster contains 2–4 seeds — thin to 3–4\" for best root development. Young thinnings are edible greens. Both roots and tops are harvestable.",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Radish",
    category: "Root",
    season: "cool",
    directSow: "Feb 1–Apr 30 / Sep 1–Nov 30",
    daysToMaturity: "22–30",
    notes:
      "Fastest harvest of any vegetable. Useful as row markers for slow-germinating crops. Succession sow every 10–14 days. Harvest promptly — overmature radishes become pithy.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Turnip",
    category: "Root",
    season: "cool",
    directSow: "Feb 1–Apr 1 / Sep 1–Oct 15",
    daysToMaturity: "45–60",
    notes:
      "Both roots and greens are edible. Tokyo Cross and Hakurei are mild, fast-maturing varieties suited to Zone 9b. Fall turnips are sweeter.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Swiss Chard",
    category: "Green",
    season: "cool",
    directSow: "Feb 1–Apr 30 / Sep 1–Oct 31",
    transplant: "Feb 15–Apr 30",
    daysToMaturity: "50–60",
    notes:
      "More heat-tolerant than spinach — can bridge into Zone 9b summer if well-watered. Harvest outer leaves. Mulch heavily in summer to extend into fall.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Kale (spring)",
    category: "Brassica",
    season: "cool",
    directSow: "Feb 1–Mar 31",
    daysToMaturity: "55–75",
    notes:
      "Spring kale bolts in Zone 9b heat by June. Plant early and harvest heavily. Red Russian is more heat-tolerant. Fall kale (direct sow Aug–Sep) is the primary crop.",
    sources: ["Botanical Interests", "High Mowing Organic Seeds"],
  },
  {
    crop: "Cilantro",
    category: "Herb",
    season: "cool",
    directSow: "Feb 1–Apr 15 / Sep 1–Nov 30",
    daysToMaturity: "50–55",
    notes:
      "Bolts rapidly in heat above 80°F. Crush seeds lightly before planting to improve germination. Succession sow every 2–3 weeks during cool weather. Allow some to bolt for coriander seed.",
    sources: ["Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Dill",
    category: "Herb",
    season: "cool",
    directSow: "Mar 1–May 15 / Sep 1–Oct 31",
    daysToMaturity: "40–50 (leaf) / 70–90 (seed)",
    notes:
      "Direct sow only — taproot makes transplanting difficult. Allow some plants to bolt for seed harvest. Attracts beneficial insects (swallowtail butterflies, predatory wasps).",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Garlic",
    category: "Allium",
    season: "cool",
    directSow: "Oct 1–Dec 1 (plant cloves)",
    daysToMaturity: "240–270 (harvest Jun–Jul)",
    notes:
      "Plant individual cloves 2\" deep, pointed end up. Softneck varieties (Inchelium Red, Silverskin) perform well in Zone 9b. Hardneck types need more cold — possible in Anderson's mild winters. Harvest when lower 1/3 of leaves brown.",
    sources: ["UC ANR", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Onion (from sets/transplants)",
    category: "Allium",
    season: "cool",
    transplant: "Jan 15–Mar 1",
    daysToMaturity: "100–120",
    notes:
      "Long-day onion varieties required for Zone 9b (bulbing triggered by 14+ hours of daylight). Plant sets or transplants Jan–Mar. Stop watering when tops fall over; cure 2–3 weeks before storage.",
    sources: ["UC ANR", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Strawberry",
    category: "Fruit",
    season: "perennial",
    transplant: "Oct–Jan (June-bearing) / Mar–Apr (day-neutral)",
    daysToMaturity: "Harvest following spring (June-bearing)",
    notes:
      "June-bearing (Chandler, Seascape) planted Oct–Jan produce heavily the following May–Jun. Day-neutral varieties (Albion, San Andreas) produce spring through fall. Mulch well; renovate beds every 3 years.",
    sources: ["UC ANR", "UC Cooperative Extension Shasta County", "Botanical Interests"],
  },

  // ── PERENNIAL HERBS ───────────────────────────────────────────────────
  {
    crop: "Rosemary",
    category: "Perennial Herb",
    season: "perennial",
    transplant: "Mar–May / Sep–Oct",
    daysToMaturity: "Perennial (established in first season)",
    notes:
      "Thrives in Zone 9b heat and drought. Plant in well-drained soil. Prostrate varieties good for borders. Can grow 4–6 ft tall in Zone 9b — prune annually.",
    sources: ["UC ANR", "Botanical Interests"],
  },
  {
    crop: "Thyme",
    category: "Perennial Herb",
    season: "perennial",
    transplant: "Mar–May / Sep–Oct",
    daysToMaturity: "Perennial",
    notes: "Drought-tolerant once established. Good companion for brassicas. Divide every 3–4 years. English thyme and lemon thyme both perform well.",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Sage",
    category: "Perennial Herb",
    season: "perennial",
    transplant: "Mar–May / Sep–Oct",
    daysToMaturity: "Perennial",
    notes:
      "Extremely heat and drought tolerant in Zone 9b. Excellent insect repellent near brassicas and carrots. Prune hard in spring to prevent woodiness.",
    sources: ["Botanical Interests", "UC ANR"],
  },
  {
    crop: "Oregano",
    category: "Perennial Herb",
    season: "perennial",
    transplant: "Mar–May / Sep–Oct",
    daysToMaturity: "Perennial",
    notes:
      "Greek oregano (Origanum vulgare subsp. hirtum) is most flavorful. Very drought tolerant once established. Harvest before flowers fully open for best flavor.",
    sources: ["Botanical Interests"],
  },
  {
    crop: "Chives",
    category: "Perennial Herb",
    season: "perennial",
    directSow: "Feb–Apr",
    transplant: "Mar–May",
    daysToMaturity: "60–90 (first season); perennial after",
    notes:
      "Divide clumps every 3 years. Flowers are edible and attract pollinators. Excellent aphid deterrent near roses and carrots.",
    sources: ["Botanical Interests", "UC ANR"],
  },
];

export type MonthlyTask = {
  month: string;
  tasks: string[];
  sow: string[];
  plant: string[];
  harvest: string[];
};

export const MONTHLY_CALENDAR: MonthlyTask[] = [
  {
    month: "January",
    tasks: [
      "Order seeds — prioritize warm-season varieties before they sell out",
      "Plan crop rotation — avoid planting same family in same bed as prior year",
      "Prepare soil amendments: add compost to beds being prepped for spring",
      "Prune dormant fruit trees before buds swell (before Feb 15)",
      "Plant bare-root fruit trees, roses, and asparagus crowns",
    ],
    sow: [
      "Onion (seed, indoors — start now for spring transplants)",
      "Leek (seed, indoors)",
      "Celery (seed, indoors — very slow, needs 10–12 weeks)",
      "Broccoli / Cabbage (seed, indoors — for early spring transplants)",
    ],
    plant: [
      "Onion sets or transplants (mid-to-late January)",
      "Garlic (if not planted in Oct–Nov — last chance)",
      "Strawberry (June-bearing crowns)",
      "Peas (direct sow — soil workable, low 40s°F overnight is fine)",
    ],
    harvest: [
      "Citrus (navel oranges, mandarins — peak season)",
      "Overwintering greens (kale, chard, arugula, lettuce)",
      "Root vegetables planted in fall (carrots, beets, turnips)",
      "Broccoli side shoots from fall-planted plants",
    ],
  },
  {
    month: "February",
    tasks: [
      "Last frost risk Feb 5–25 — protect transplants with frost cloth on cold nights",
      "Begin hardening off any seedlings started in January",
      "Finish dormant pruning before buds break",
      "Apply dormant oil spray to fruit trees for scale and overwintering pests",
      "Top-dress beds with compost before spring planting",
      "Set up irrigation systems and check emitters",
    ],
    sow: [
      "Tomato (seed, indoors — 6–8 weeks before Apr transplant)",
      "Pepper / Eggplant (seed, indoors — slow, start now)",
      "Broccoli / Cabbage / Cauliflower (indoors, for Mar transplant)",
      "Parsley (seed, indoors or direct — slow to germinate)",
      "Lettuce (direct sow outside — soil is ready)",
      "Spinach, Arugula (direct sow)",
      "Carrots, Beets, Radishes (direct sow)",
      "Peas (direct sow — priority, before soil warms)",
      "Swiss Chard (direct sow or transplant)",
    ],
    plant: [
      "Onion transplants (Feb 15 onward)",
      "Asparagus crowns (early Feb)",
      "Broccoli / Cabbage transplants (started in Jan, if 4–5 weeks old)",
    ],
    harvest: [
      "Citrus (continues)",
      "Overwintering greens",
      "Peas planted in January (last weeks of Feb if early start)",
      "Fall-planted root vegetables",
    ],
  },
  {
    month: "March",
    tasks: [
      "Last frost risk mostly passed by Mar 1 — use frost cloth only for sensitive transplants",
      "Harden off tomato/pepper seedlings started in Feb (takes 7–10 days)",
      "Mulch all beds 2–3 inches to conserve moisture before heat arrives",
      "Install drip irrigation if not already in place — critical for Zone 9b summer",
      "Watch for aphids on spring brassicas; introduce ladybugs or spray with neem",
      "Plant summer squash / cucumber starts indoors for early April transplant",
    ],
    sow: [
      "Tomato, Pepper, Eggplant (last call for indoor starts)",
      "Basil (indoors — still too cold for direct sow)",
      "Cucumber (indoors for early transplant, or wait for Apr direct sow)",
      "Summer Squash (indoors for early Apr transplant)",
      "Lettuce, Arugula, Spinach (direct sow — last chance before heat)",
      "Carrots, Beets, Radishes, Turnips (direct sow)",
      "Cilantro (direct sow)",
      "Dill (direct sow)",
      "Kale (direct sow for spring)",
    ],
    plant: [
      "Broccoli, Cabbage, Cauliflower transplants (early March)",
      "Onion transplants",
      "Peas (direct sow — last call)",
      "Potatoes (mid-March onward — plant seed potatoes)",
    ],
    harvest: [
      "Peas (from Jan/Feb sow)",
      "Overwintering greens",
      "Spring radishes (from Feb sow)",
      "Early spring lettuce (from Feb sow)",
      "Broccoli heads (from Aug fall plantings still producing)",
    ],
  },
  {
    month: "April",
    tasks: [
      "Frost risk essentially zero by Apr 1 in Zone 9b",
      "Transplant tomatoes, peppers, eggplant after Apr 1 (nights 50°F+)",
      "Install tomato cages, stakes, or trellis before plants need them",
      "Set up shade cloth for lettuce extension (30–40% shade delays bolting)",
      "Begin regular deep watering schedule (1–2× per week, deep)",
      "Monitor for cucumber beetles, squash vine borers (emerging Apr–May)",
      "Succession sow beans every 3 weeks through July",
    ],
    sow: [
      "Bush Beans, Pole Beans (direct sow — soil 60°F+)",
      "Cucumber (direct sow after Apr 15)",
      "Summer Squash, Zucchini (direct sow)",
      "Sweet Corn (direct sow after Apr 1 — soil 55°F+)",
      "Carrots, Beets, Radishes (last reliable spring window)",
      "Basil (direct sow after Apr 15)",
      "Dill (direct sow)",
      "Cilantro (last spring window — heat coming)",
    ],
    plant: [
      "Tomato transplants (Apr 1–May 1)",
      "Pepper / Eggplant transplants (Apr 15–May 15 — wait for warmth)",
      "Cucumber transplants",
      "Summer Squash transplants",
      "Watermelon / Cantaloupe transplants (Apr 15+)",
    ],
    harvest: [
      "Peas (peak season — May be ending by late April in heat)",
      "Lettuce, Spinach, Arugula (spring crop)",
      "Radishes (succession harvests)",
      "Asparagus (peak harvest season)",
      "Strawberries (first harvest from June-bearing)",
      "Broccoli, Cabbage heads",
    ],
  },
  {
    month: "May",
    tasks: [
      "Soil temps consistently 65–70°F+ — all warm-season crops actively growing",
      "Deep water tomatoes 1–2× per week; mulch base to retain moisture",
      "Thin corn to 12\" spacing when 6\" tall",
      "Pinch suckers on indeterminate tomatoes for better fruit set",
      "Begin fertilizing heavy feeders (corn, tomatoes, squash) monthly",
      "Watch for tomato hornworm, whitefly — inspect undersides of leaves",
      "Bolting prevention: harvest lettuce/spinach frequently; shade cloth helps",
    ],
    sow: [
      "Bush Beans (succession sow — 2nd round)",
      "Cucumber (succession sow)",
      "Basil (direct sow outdoors — ideal conditions)",
      "Okra (direct sow May 1+ — needs sustained heat)",
      "Sweet Corn (succession planting)",
      "Winter Squash / Pumpkin (last call — needs 80–115 days before frost)",
    ],
    plant: [
      "Pepper / Eggplant (final transplants)",
      "Sweet Potato slips (May 1–Jun 1)",
      "Watermelon, Cantaloupe transplants or direct sow",
    ],
    harvest: [
      "Lettuce (last of spring crop before bolting)",
      "Peas (end of season)",
      "Asparagus (winding down)",
      "Strawberries (peak June-bearing harvest)",
      "Broccoli (spring crop finishing)",
      "Radishes, Beets, Turnips",
      "Sugar snap peas",
    ],
  },
  {
    month: "June",
    tasks: [
      "Temperatures rising toward 95–105°F peak — protect young transplants with shade cloth",
      "Switch to deep, infrequent watering (2–3 gal per plant, 2× per week for tomatoes)",
      "Mulch all beds 3–4 inches — critical for water retention and root temperature",
      "Remove spent spring crops; rest beds or plant heat-tolerant summer crops",
      "Harvest zucchini and squash daily — prevents oversizing and keeps plants producing",
      "Set up water on timer if not already automated",
      "Monitor for powdery mildew on squash (common in summer) — treat early with neem or baking soda spray",
    ],
    sow: [
      "Bush Beans (3rd succession — last reliable planting for summer)",
      "Sweet Corn (last opportunity for summer harvest before heat peak)",
      "Winter Squash / Pumpkin (final call — must finish by Nov 15)",
    ],
    plant: [
      "Sweet Potato slips (last call)",
    ],
    harvest: [
      "Zucchini / Summer Squash (peak production begins)",
      "Cucumber (first harvests from Apr sow)",
      "Tomatoes (first early varieties ripening — Celebrity, Early Girl)",
      "Bush Beans (from Apr sow)",
      "Garlic (harvest when lower 1/3 of leaves brown — typically June)",
      "Onions (harvest when tops fall over)",
      "Strawberries (day-neutral varieties continuing)",
    ],
  },
  {
    month: "July",
    tasks: [
      "Peak Zone 9b heat — 100–110°F days possible; most planting paused",
      "Water tomatoes deeply; watch for blossom drop above 105°F (normal — resumes when cooler)",
      "Harvest all crops regularly; overripe fruit attracts pests",
      "Begin planning fall garden — order fall brassica and cool-season seeds",
      "Cure garlic and onions in warm, dry, shaded area 2–3 weeks",
      "Take cuttings of basil and herbs before heat stress sets in",
    ],
    sow: [
      "Broccoli / Cabbage / Cauliflower (indoors — start for Aug transplant)",
      "Kale (indoors — for Aug/Sep transplant)",
      "Bush Beans (last succession planting — Jul 15 deadline for fall harvest)",
    ],
    plant: [],
    harvest: [
      "Tomatoes (all varieties — peak season begins)",
      "Peppers and Eggplant (peak production)",
      "Zucchini and Squash (peak — harvest every 1–2 days)",
      "Cucumbers (peak season)",
      "Corn (from Apr/May sow)",
      "Basil (harvest regularly to delay bolting)",
      "Watermelon, Cantaloupe (taste-test frequently)",
      "Pole Beans",
    ],
  },
  {
    month: "August",
    tasks: [
      "Heat begins tapering in late August — fall planting window approaches",
      "Prepare fall beds: add 2–3\" compost, loosen soil, establish irrigation",
      "Transplant fall brassica starts (started in July) — broccoli, cabbage, cauliflower",
      "Direct sow fall greens Aug 15+ as temperatures moderate",
      "Save seed from open-pollinated varieties — tomatoes, beans, squash",
      "Watch for late-season aphid pressure on brassica transplants",
    ],
    sow: [
      "Broccoli / Cabbage / Kale / Cauliflower (transplant outdoors from July starts)",
      "Lettuce (direct sow Aug 15+ — wait for soil below 75°F for germination)",
      "Arugula (direct sow Aug 15+)",
      "Swiss Chard (direct sow)",
      "Beets, Carrots (direct sow Aug 15+)",
      "Cilantro (direct sow)",
      "Onion (seed, indoors — for winter/spring transplants)",
      "Spinach (direct sow late August if temps moderate)",
    ],
    plant: [
      "Broccoli, Cabbage, Cauliflower transplants (from July starts)",
      "Kale transplants",
    ],
    harvest: [
      "Tomatoes (continued peak — process and preserve excess)",
      "Peppers, Eggplant (continued)",
      "Squash, Cucumber, Beans (continued)",
      "Melons (watermelon, cantaloupe — finishing up)",
      "Corn (from later plantings)",
      "Basil (last heavy harvests before fall)",
      "Sweet Potatoes (early Aug — check size by digging test root)",
    ],
  },
  {
    month: "September",
    tasks: [
      "Fall planting season opens — best growing weather of the year (Sep–Nov)",
      "Temperatures 80–90°F days, 55–65°F nights — ideal for transplants and germination",
      "Remove finished summer crops; compost all disease-free material",
      "Plant cover crops in empty beds (crimson clover, field peas, winter rye)",
      "Reduce tomato watering — direct energy to ripening remaining fruit",
      "Install row cover or low tunnel framework for winter protection",
    ],
    sow: [
      "Lettuce (direct sow — best fall window opens)",
      "Spinach (direct sow — excellent germination Sep–Oct)",
      "Arugula (direct sow — prolific in fall cool)",
      "Carrots, Beets, Radishes (direct sow — fall roots sweeten with frost)",
      "Turnips (direct sow)",
      "Swiss Chard (direct sow)",
      "Kale (direct sow for established fall plants)",
      "Cilantro (direct sow — will produce through winter)",
      "Dill (direct sow)",
      "Peas (direct sow late September for early Nov harvest)",
      "Cover crops (empty beds)",
    ],
    plant: [
      "Broccoli, Cabbage, Cauliflower (transplant — Sep 1–15 for December harvest)",
      "Garlic (last 2 weeks of Sep / early Oct — start of planting window)",
      "Strawberry crowns (June-bearing planting begins)",
    ],
    harvest: [
      "Tomatoes (final ripening — green tomatoes can ripen indoors off vine)",
      "Winter Squash and Pumpkins (harvest when stems dry and rind is hard)",
      "Peppers (final harvests — freeze or dry excess)",
      "Sweet Potatoes (harvest Sep–Oct)",
      "Eggplant (continuing)",
      "Basil (final harvest before first frost)",
      "Grapes (if grown on property)",
    ],
  },
  {
    month: "October",
    tasks: [
      "First frost possible Nov 18 — cool-season crops are fully in place by now",
      "Plant garlic cloves 2\" deep before soil cools below 50°F",
      "Dig and store sweet potatoes before frost; cure 10 days at 85°F",
      "Row cover ready for frost events — protect brassicas during any dips below 28°F",
      "Collect and store winter squash in cool, dry location (55–60°F ideal)",
      "Clean up summer debris to reduce disease and pest overwintering",
      "Plant spring-blooming bulbs (daffodil, tulip) and cover crop empty beds",
    ],
    sow: [
      "Garlic (plant cloves Oct 1–Nov 30)",
      "Onion (seed, indoors — Nov–Dec start for spring transplants)",
      "Carrots, Beets (direct sow — Oct 15 is last reliable date for fall root harvest)",
      "Radishes (direct sow — fast harvest before cold deepens)",
      "Fava Beans (direct sow — winter legume for Zone 9b)",
      "Cover crops (crimson clover, hairy vetch, winter rye)",
    ],
    plant: [
      "Garlic (cloves — main planting month)",
      "Strawberry crowns (prime month for June-bearing)",
      "Spring-blooming bulbs",
      "Perennial herbs (rosemary, thyme, sage — fall planting establishes well)",
    ],
    harvest: [
      "Lettuce, Arugula, Spinach (from Sep sow — first harvests)",
      "Broccoli, Cabbage (from Aug transplants — heading up)",
      "Kale, Swiss Chard (good production begins)",
      "Radishes (from Sep/Oct sow — fast harvest)",
      "Winter Squash (storage crop)",
      "Persimmons, Pomegranates (Zone 9b fall fruit peak)",
      "Citrus begins (early mandarins, lemon)",
    ],
  },
  {
    month: "November",
    tasks: [
      "First frost arrives Nov 18–28 — Zone 9b lows drop to 30–35°F on frost nights",
      "Protect brassicas with row cover during frost events (tolerate 25–28°F with cover)",
      "Harvest remaining tomatoes before frost; ripen green tomatoes indoors",
      "Cut back perennial herbs to prevent frost damage to woody stems",
      "Mulch garlic beds 2–3\" after planting or after soil cools",
      "Pull summer annuals; add to compost or till in as green manure",
      "Maintain cover crops in empty beds through winter",
    ],
    sow: [
      "Garlic (plant cloves through end of November)",
      "Fava Beans (direct sow — excellent winter cover crop + harvest)",
      "Cover crops (last opportunity)",
      "Onion (seed, indoors — Nov 1–15 for February transplants)",
    ],
    plant: [
      "Garlic (cloves — close of main window)",
      "Strawberry crowns (last call for June-bearing)",
      "Bare-root fruit trees (if available early in nurseries)",
    ],
    harvest: [
      "Broccoli (from Aug transplants — peak harvest Oct–Dec)",
      "Cabbage, Cauliflower (maturing)",
      "Kale, Swiss Chard, Arugula (cold improves flavor)",
      "Lettuce, Spinach (protected or under row cover)",
      "Carrots, Beets (frost-sweetened — can leave in ground with mulch)",
      "Citrus (navel oranges beginning, lemons year-round)",
      "Persimmons (final harvest)",
    ],
  },
  {
    month: "December",
    tasks: [
      "Coldest nights of the year (low 30s°F in Anderson, CA) — frost cloth on hand",
      "Garden is largely dormant or in cool-season production mode",
      "Review the year: what worked, what failed, what to adjust for 2027",
      "Order seed catalogs and begin planning next season",
      "Prune dormant deciduous trees and vines (after leaves drop)",
      "Protect citrus during hard freeze events (rare but possible)",
      "Maintain soil moisture — winter rains are irregular in Sacramento Valley",
    ],
    sow: [
      "Onion (seed, indoors — Dec 1–15 for Feb/Mar transplants)",
      "Leek (seed, indoors)",
      "Fava Beans (direct sow — if soil still workable)",
    ],
    plant: [
      "Bare-root fruit trees, roses, cane berries (Dec–Feb is ideal planting window)",
      "Garlic (last call — plant before soil freezes hard)",
    ],
    harvest: [
      "Broccoli (prime harvest — Dec is the best month in Zone 9b)",
      "Cabbage heads (mature)",
      "Kale, Swiss Chard (cold-sweetened)",
      "Citrus (navel oranges peak; mandarins peaking; lemons year-round)",
      "Root vegetables (carrots, beets — frost-sweetened, leave in ground with mulch)",
      "Overwintering greens under row cover",
    ],
  },
];

export type CompanionEntry = {
  crop: string;
  goodCompanions: { plant: string; reason: string }[];
  badCompanions: { plant: string; reason: string }[];
  notes: string;
  sources: string[];
};

export const COMPANION_PLANTING_DATA: CompanionEntry[] = [
  {
    crop: "Tomato",
    goodCompanions: [
      { plant: "Basil", reason: "Repels thrips, aphids, whitefly; some evidence of improved flavor; attracts pollinators" },
      { plant: "Marigold (French)", reason: "Root secretions repel root-knot nematodes; flowers deter whitefly" },
      { plant: "Borage", reason: "Repels tomato hornworm; attracts beneficial pollinators and predatory insects" },
      { plant: "Carrot", reason: "Loosens compacted soil around tomato roots; compatible spacing" },
      { plant: "Parsley", reason: "Attracts predatory wasps and other beneficial insects" },
      { plant: "Chives", reason: "Deters aphids; attracts pollinators" },
    ],
    badCompanions: [
      { plant: "Fennel", reason: "Fennel is allelopathic — root secretions inhibit tomato growth" },
      { plant: "Brassicas (broccoli, cabbage, kale)", reason: "Compete for nutrients; may share pest pressure" },
      { plant: "Corn", reason: "Both attract tomato/corn earworm (Helicoverpa zea); concentrate pest pressure" },
      { plant: "Dill (mature)", reason: "Mature dill inhibits tomato; young dill is acceptable as a beneficial insect attractant" },
    ],
    notes: "Plant basil at the base of tomatoes; marigolds as a border or interplanted throughout bed. In Zone 9b, borage self-sows readily and provides season-long benefit.",
    sources: ["UC Davis IPM", "Rodale's Companion Planting", "Botanical Interests", "Cornell Cooperative Extension"],
  },
  {
    crop: "Pepper",
    goodCompanions: [
      { plant: "Basil", reason: "Repels aphids and spider mites; Zone 9b heat suits both crops equally" },
      { plant: "Carrot", reason: "Compatible root depths; carrots loosen soil" },
      { plant: "Marigold", reason: "Deters aphids, nematodes, whitefly" },
      { plant: "Parsley", reason: "Attracts predatory wasps; compatible size and water needs" },
      { plant: "Spinach / Lettuce", reason: "Short-season cool companions can occupy space before peppers fill out; provide living mulch" },
    ],
    badCompanions: [
      { plant: "Fennel", reason: "Allelopathic to peppers; inhibits growth" },
      { plant: "Brassicas", reason: "Different water and nutrient needs; space competition" },
    ],
    notes: "Peppers and tomatoes have similar cultural needs and companion plant relationships. In Zone 9b, peppers benefit from afternoon shade from taller companions during peak summer heat.",
    sources: ["UC Davis IPM", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Cucumber",
    goodCompanions: [
      { plant: "Nasturtium", reason: "Trap crop for aphids; repels cucumber beetles and squash bugs; edible flowers" },
      { plant: "Radish", reason: "Deters cucumber beetles when planted nearby; quick harvest before cucumbers spread" },
      { plant: "Dill (young)", reason: "Attracts beneficial predatory insects (braconid wasps) that parasitize cucumber pests" },
      { plant: "Marigold", reason: "Deters whitefly, aphids, and nematodes" },
      { plant: "Bush Bean", reason: "Fixes nitrogen; compatible growth habits" },
      { plant: "Sunflower", reason: "Provides structural support as trellis; attracts pollinators critical for cucumber fruit set" },
    ],
    badCompanions: [
      { plant: "Sage", reason: "Inhibits cucumber growth; keep separate" },
      { plant: "Potato", reason: "Both susceptible to blight; planting together concentrates disease pressure" },
      { plant: "Aromatic herbs (strong)", reason: "Strong-scented herbs (except dill) can interfere with cucumber pollination by confusing beneficial insects" },
    ],
    notes: "Consistent pollinator access is critical for cucumber fruit set. Plant bee-attracting flowers (borage, dill, marigold) within 10 feet of cucumber beds.",
    sources: ["UC Davis IPM", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Squash & Zucchini",
    goodCompanions: [
      { plant: "Nasturtium", reason: "Strong trap crop for squash bugs and aphids; also repels cucumber beetles" },
      { plant: "Borage", reason: "Strongly deters squash bugs; attracts bees for pollination (critical for squash)" },
      { plant: "Marigold", reason: "Deters nematodes and squash vine borers; border planting effective" },
      { plant: "Radish", reason: "Repels squash vine borer (plant near stem base); quick harvest before squash spreads" },
      { plant: "Corn + Beans (Three Sisters)", reason: "Traditional polyculture: corn provides trellis for beans, beans fix nitrogen for corn and squash, squash leaves shade soil and suppress weeds" },
    ],
    badCompanions: [
      { plant: "Potato", reason: "Both are heavy feeders competing for same nutrients; shared disease risks" },
      { plant: "Brassicas", reason: "Space competition; different water timing needs" },
    ],
    notes: "Squash vine borer is a significant Zone 9b pest. Row cover from transplant through early July, then remove for pollination. Nasturtiums planted at base serve as sacrificial trap crop for squash bugs.",
    sources: ["UC Davis IPM", "UC ANR", "Botanical Interests"],
  },
  {
    crop: "Bean (Bush & Pole)",
    goodCompanions: [
      { plant: "Carrot", reason: "Different root depths; beans fix nitrogen that benefits heavy carrot crop the following season" },
      { plant: "Squash", reason: "Classic Three Sisters combination; squash shades soil and deters weeds" },
      { plant: "Corn", reason: "Beans climb corn in Three Sisters; beans fix nitrogen for heavy corn demand" },
      { plant: "Strawberry", reason: "Nitrogen fixation benefits strawberry; compatible moisture needs" },
      { plant: "Marigold", reason: "Deters bean beetle; border planting recommended" },
      { plant: "Cucumber", reason: "Both benefit from shared nitrogen fixation in soil" },
    ],
    badCompanions: [
      { plant: "Onion / Garlic / Chives", reason: "Alliums inhibit bean germination and growth; keep 12\"+ apart" },
      { plant: "Fennel", reason: "Allelopathic to most vegetables including beans" },
      { plant: "Beet", reason: "Reported to inhibit bean growth when in direct contact" },
    ],
    notes: "Beans fix atmospheric nitrogen via rhizobium bacteria — inoculate seeds at planting for best results, especially in new beds. Rotate bean family (Fabaceae) through beds annually.",
    sources: ["UC Davis IPM", "Rodale's Encyclopedia of Organic Gardening", "Johnny's Selected Seeds"],
  },
  {
    crop: "Corn",
    goodCompanions: [
      { plant: "Bean (pole)", reason: "Fixes nitrogen for corn's heavy feeding needs; climbs corn stalk" },
      { plant: "Squash", reason: "Shades soil to reduce moisture loss; large leaves suppress weeds" },
      { plant: "Cucumber", reason: "Compatible; cucumbers sprawl under corn" },
      { plant: "Borage", reason: "Deters corn earworm; attracts beneficial wasps" },
      { plant: "Dill", reason: "Attracts predatory insects that attack aphids and corn earworm" },
    ],
    badCompanions: [
      { plant: "Tomato", reason: "Shared pest (Helicoverpa zea — tomato/corn earworm); concentrates pressure" },
      { plant: "Celery", reason: "Competition; allelopathic effects reported" },
    ],
    notes: "Plant corn in blocks of at least 4 rows for wind pollination. Succession plant every 10–14 days for continuous harvest (not in same block — separate by distance or timing to prevent cross-pollination).",
    sources: ["UC ANR", "Johnny's Selected Seeds", "UC Davis IPM"],
  },
  {
    crop: "Brassica (Broccoli, Cabbage, Kale, Cauliflower)",
    goodCompanions: [
      { plant: "Dill", reason: "Attracts predatory wasps (Cotesia glomerata) that parasitize cabbage worm (Pieris rapae)" },
      { plant: "Nasturtium", reason: "Trap crop for aphids; keeps aphid pressure off brassica leaves" },
      { plant: "Rosemary", reason: "Strong scent confuses and deters cabbage moth; deters aphids" },
      { plant: "Sage", reason: "Repels cabbage looper and imported cabbageworm moths" },
      { plant: "Thyme", reason: "Repels cabbage worm; attracts beneficial insects" },
      { plant: "Celery", reason: "Repels white cabbage butterfly; compatible moisture needs" },
      { plant: "Onion", reason: "Repels cabbage worm; different root depth" },
      { plant: "Marigold", reason: "Deters imported cabbageworm, aphids" },
    ],
    badCompanions: [
      { plant: "Strawberry", reason: "Inhibits each other; avoid planting in same bed" },
      { plant: "Tomato", reason: "Compete for nutrients; different companion needs" },
      { plant: "Pole Bean", reason: "Brassicas reportedly inhibit bean germination and growth" },
      { plant: "Basil", reason: "Some evidence of growth inhibition" },
    ],
    notes: "Cabbage worm (Pieris rapae) and cabbage looper (Trichoplusia ni) are the primary Zone 9b brassica pests. Row cover from transplant through establishment is the most effective physical barrier. Bt (Bacillus thuringiensis) is effective organic treatment.",
    sources: ["UC Davis IPM", "UC ANR", "Cornell Cooperative Extension"],
  },
  {
    crop: "Lettuce & Salad Greens",
    goodCompanions: [
      { plant: "Radish", reason: "Loosens soil; quick harvest acts as row marker; deters flea beetles" },
      { plant: "Carrot", reason: "Different root depth; carrots benefit from lettuce's ground-level shading of soil surface" },
      { plant: "Chive", reason: "Deters aphids; attracts pollinators" },
      { plant: "Strawberry", reason: "Classic combination; lettuce fills gaps, provides living mulch around strawberry crowns" },
      { plant: "Marigold", reason: "Deters aphids and nematodes" },
      { plant: "Tall crops (tomato, sunflower)", reason: "Provide afternoon shade that significantly extends Zone 9b lettuce season into late spring" },
    ],
    badCompanions: [
      { plant: "Celery", reason: "Competition; inhibitory effects reported" },
      { plant: "Fennel", reason: "Allelopathic; inhibits most vegetables" },
    ],
    notes: "In Zone 9b, afternoon shade from taller plants is valuable for extending lettuce harvest into late spring. Plant lettuce on the north or east side of tomatoes/sunflowers. Heat-tolerant varieties (Muir, Jericho, Nevada) extend the spring window.",
    sources: ["UC Davis IPM", "Botanical Interests", "Johnny's Selected Seeds"],
  },
  {
    crop: "Carrot",
    goodCompanions: [
      { plant: "Onion / Leek / Chive", reason: "Allium scent strongly repels carrot fly (Psila rosae); interplanting rows is most effective" },
      { plant: "Rosemary", reason: "Deters carrot fly; aromatic confusion strategy" },
      { plant: "Sage", reason: "Deters carrot fly; compatible" },
      { plant: "Lettuce", reason: "Shades soil surface, reduces soil crusting that inhibits carrot germination" },
      { plant: "Tomato", reason: "Tomatoes release solanine which deters carrot fly; carrots loosen soil" },
      { plant: "Peas", reason: "Fix nitrogen; different root zones; peas finish before carrots need full space" },
    ],
    badCompanions: [
      { plant: "Dill (mature)", reason: "Mature dill inhibits carrot growth; young dill is acceptable" },
      { plant: "Parsnip", reason: "Attracts same pests; concentrates carrot fly pressure" },
      { plant: "Anise", reason: "Inhibits carrot germination" },
    ],
    notes: "Carrot fly is less severe in Zone 9b's dry Mediterranean climate than in humid regions. Main pests are gophers and wireworms — raised beds and good soil drainage are the primary controls.",
    sources: ["UC Davis IPM", "Cornell Cooperative Extension", "Botanical Interests"],
  },
  {
    crop: "Onion & Garlic",
    goodCompanions: [
      { plant: "Carrot", reason: "Classic pairing: carrot fly repelled by allium scent; onion fly repelled by carrot scent; mutual benefit" },
      { plant: "Tomato", reason: "Onion deters aphids; garlic specifically repels spider mites from tomatoes" },
      { plant: "Pepper", reason: "Onions deter aphids; compatible water/space needs" },
      { plant: "Beet", reason: "Compatible root depths; beets reportedly benefit from onion proximity" },
      { plant: "Chamomile", reason: "Accumulates calcium; companion evidence suggests growth improvement in onion" },
      { plant: "Lettuce", reason: "Different root zones; space-efficient companion" },
      { plant: "Rose", reason: "Garlic strongly deters aphids and black spot on roses; classic companion" },
    ],
    badCompanions: [
      { plant: "Bean (all types)", reason: "Alliums inhibit bean and pea germination and growth; keep 18\"+ away" },
      { plant: "Pea", reason: "Same as beans — alliums inhibit legume nodulation" },
      { plant: "Asparagus", reason: "Competition; long-term crops interfere with each other" },
    ],
    notes: "Garlic as a spray (blended garlic water) is a broad-spectrum deterrent for soft-bodied insects. Planted garlic provides ongoing protection for neighboring crops throughout its 8–9 month growing season.",
    sources: ["UC Davis IPM", "Botanical Interests", "Rodale's Encyclopedia"],
  },
  {
    crop: "Strawberry",
    goodCompanions: [
      { plant: "Borage", reason: "Strongly deters slugs and aphids; attracts pollinators essential for fruit set; improves strawberry flavor (traditional)" },
      { plant: "Thyme", reason: "Deters pests; attractive low-growing companion that suppresses weeds" },
      { plant: "Sage", reason: "Deters pests; drought-tolerant once established alongside strawberries" },
      { plant: "Chive", reason: "Deters aphids and spider mites; easy to establish at strawberry bed edges" },
      { plant: "Lettuce", reason: "Fills space between strawberry crowns; provides living mulch; harvested before crowns fill in" },
      { plant: "Spinach", reason: "Compatible cool-season companion; different harvest timing" },
      { plant: "Bush Bean", reason: "Fixes nitrogen; compatible row planting" },
    ],
    badCompanions: [
      { plant: "Brassica", reason: "Inhibit each other; avoid in same bed" },
      { plant: "Fennel", reason: "Allelopathic to strawberries" },
      { plant: "Verticillium-susceptible crops (tomato, pepper, eggplant, potato)", reason: "Share Verticillium wilt fungus; rotate beds away from these crops for 3+ years" },
    ],
    notes: "Verticillium wilt is the most serious long-term threat to Sacramento Valley strawberries. Renovate beds every 3 years and rotate to a site not recently planted with solanaceous crops. UC ANR recommends certified disease-free planting stock.",
    sources: ["UC ANR", "UC Cooperative Extension Shasta County", "Botanical Interests"],
  },
  {
    crop: "Herb Garden (General)",
    goodCompanions: [
      { plant: "Marigold (French / Tagetes patula)", reason: "Broad-spectrum beneficial: nematode suppression, whitefly deterrent, attracts beneficial insects; plant throughout vegetable garden" },
      { plant: "Borage", reason: "Attracts bees and predatory insects; repels tomato hornworm, squash bugs, aphids; self-sows readily in Zone 9b" },
      { plant: "Nasturtium", reason: "Excellent trap crop for aphids; deters cucumber beetles, squash bugs; edible; self-sows" },
      { plant: "Sweet Alyssum", reason: "Attracts syrphid flies (aphid predators); fills gaps as living mulch; reseeds annually in Zone 9b" },
      { plant: "Dill / Fennel (isolated)", reason: "Attracts parasitic wasps and syrphid flies; plant fennel isolated from vegetable beds due to allelopathic effects" },
    ],
    badCompanions: [],
    notes: "A diverse planting of flowering herbs at 5–10% of total garden area significantly reduces pest pressure by supporting beneficial insect populations. UC Davis IPM research supports 'ecological services' of floral diversity in vegetable gardens.",
    sources: ["UC Davis IPM", "UC ANR", "Rodale's Encyclopedia"],
  },
];
