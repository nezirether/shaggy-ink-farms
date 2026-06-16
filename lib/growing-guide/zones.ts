import type { ZoneGuide, MonthlyCalendar } from "./types";

// USDA zone guides are intentionally generalized — a national gardener lands
// here, a local gardener gets routed to a far more detailed local guide. Each
// zone's monthly calendar is built around its average last/first frost window.

const zone3Months: MonthlyCalendar = {
  January: { plantNow: ["Nothing outdoors"], startInTrays: ["Onions", "Leeks"], harvest: ["Stored roots and squash"], prepareNext: ["Order seeds", "Plan the short season", "Read catalogs"] },
  February: { plantNow: ["Nothing outdoors"], startInTrays: ["Onions", "Celery", "Broccoli", "Cabbage"], harvest: ["Stored crops"], prepareNext: ["Start brassicas indoors", "Service tools"] },
  March: { plantNow: ["Nothing outdoors yet"], startInTrays: ["Tomatoes", "Peppers", "Broccoli", "Lettuce"], harvest: ["Stored crops"], prepareNext: ["Set up grow lights", "Plan beds"] },
  April: { plantNow: ["Peas (late, if soil thaws)", "Spinach under cover"], startInTrays: ["Squash", "Cucumbers", "Tomatoes (continue)"], harvest: ["Overwintered greens under cover"], prepareNext: ["Harden off cool-season starts", "Prep beds as snow melts"] },
  May: { plantNow: ["Peas", "Lettuce", "Spinach", "Radishes", "Kale", "Potatoes (late)"], startInTrays: ["Short-season melons"], harvest: ["First spring greens"], prepareNext: ["Wait on warm crops — frost lingers into June", "Warm soil with plastic"] },
  June: { plantNow: ["Beans", "Summer squash", "Cucumbers", "Sunflowers", "Carrots", "Beets"], startInTrays: [], harvest: ["Spring greens", "Radishes"], prepareNext: ["Transplant tomatoes with protection", "Succession-sow greens"] },
  July: { plantNow: ["Beans (succession)", "Lettuce", "Beets and carrots for fall"], startInTrays: ["Fall brassicas"], harvest: ["Peas", "Greens", "Early zucchini"], prepareNext: ["Plan a short fall window", "Order fall seed"] },
  August: { plantNow: ["Spinach", "Lettuce", "Radishes", "Kale"], startInTrays: [], harvest: ["Tomatoes", "Beans", "Zucchini", "Cucumbers", "Potatoes"], prepareNext: ["Harvest ahead of early frost", "Plant garlic late this month"] },
  September: { plantNow: ["Garlic"], startInTrays: [], harvest: ["Winter squash", "Potatoes", "Last warm crops", "Apples"], prepareNext: ["Cover or harvest tender crops — frost is here", "Cure and store the harvest"] },
  October: { plantNow: ["Garlic (mulched)"], startInTrays: [], harvest: ["Hardy greens", "Stored roots"], prepareNext: ["Heavy mulch on garlic", "Clean up before snow"] },
  November: { plantNow: ["Nothing"], startInTrays: [], harvest: ["Stored crops"], prepareNext: ["Order seed", "Plan next year"] },
  December: { plantNow: ["Nothing"], startInTrays: [], harvest: ["Stored crops"], prepareNext: ["Rest", "Read catalogs", "Service tools"] },
};

// Zones 4 and 5 follow the same short-season rhythm, shifted a few weeks earlier.
const zone4Months: MonthlyCalendar = {
  ...zone3Months,
  April: { plantNow: ["Peas", "Spinach", "Radishes (late month)"], startInTrays: ["Squash", "Cucumbers", "Tomatoes (continue)"], harvest: ["Overwintered greens"], prepareNext: ["Harden off cool-season starts", "Prep beds"] },
  May: { plantNow: ["Peas", "Lettuce", "Spinach", "Radishes", "Kale", "Carrots", "Beets", "Potatoes"], startInTrays: ["Short-season melons"], harvest: ["First spring greens"], prepareNext: ["Wait on warm crops until late May", "Warm soil"] },
};

const zone5Months: MonthlyCalendar = {
  ...zone4Months,
  March: { plantNow: ["Peas (late month, if workable)"], startInTrays: ["Tomatoes", "Peppers", "Broccoli", "Lettuce", "Onions"], harvest: ["Overwintered greens"], prepareNext: ["Set up grow lights", "Prep beds as soil dries"] },
  May: { plantNow: ["Beans (late month)", "Lettuce", "Spinach", "Radishes", "Carrots", "Beets", "Potatoes"], startInTrays: ["Melons"], harvest: ["Spring greens", "Asparagus"], prepareNext: ["Transplant warm crops late May after frost", "Mulch"] },
};

const zone6Months: MonthlyCalendar = {
  January: { plantNow: ["Nothing outdoors"], startInTrays: ["Onions", "Leeks"], harvest: ["Stored crops", "Kale under cover"], prepareNext: ["Order seeds", "Plan beds"] },
  February: { plantNow: ["Nothing outdoors"], startInTrays: ["Onions", "Broccoli", "Cabbage", "Celery"], harvest: ["Stored crops"], prepareNext: ["Start brassicas indoors", "Prune fruit trees"] },
  March: { plantNow: ["Peas", "Spinach", "Radishes (late month)"], startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Lettuce"], harvest: ["Overwintered greens"], prepareNext: ["Prep beds", "Set up cold frames"] },
  April: { plantNow: ["Peas", "Lettuce", "Spinach", "Radishes", "Carrots", "Beets", "Potatoes", "Onion sets"], startInTrays: ["Cucumbers", "Squash", "Melons"], harvest: ["Spring greens", "Asparagus"], prepareNext: ["Harden off warm-season starts", "Watch late frost"] },
  May: { plantNow: ["Beans", "Summer squash", "Cucumbers", "Corn", "Sunflowers", "Zinnias"], startInTrays: [], harvest: ["Lettuce", "Peas starting", "Radishes"], prepareNext: ["Transplant tomatoes after mid-month", "Mulch beds"] },
  June: { plantNow: ["Beans (succession)", "Cucumbers", "Summer squash", "Basil", "Sunflowers"], startInTrays: ["Fall brassicas"], harvest: ["Peas", "Lettuce", "Spinach", "Beets"], prepareNext: ["Succession-sow greens", "Stake tomatoes"] },
  July: { plantNow: ["Beans (succession)", "Carrots and beets for fall", "Lettuce"], startInTrays: ["Fall broccoli and cabbage"], harvest: ["Zucchini", "Beans", "Cucumbers", "Early tomatoes"], prepareNext: ["Order fall seed", "Plan fall garden"] },
  August: { plantNow: ["Spinach", "Lettuce", "Radishes", "Kale", "Turnips", "Cilantro"], startInTrays: [], harvest: ["Tomatoes", "Peppers", "Beans", "Corn", "Cucumbers"], prepareNext: ["Order garlic", "Start fall plantings"] },
  September: { plantNow: ["Garlic (late month)", "Spinach", "Lettuce", "Kale"], startInTrays: [], harvest: ["Tomatoes", "Winter squash", "Potatoes", "Peppers"], prepareNext: ["Harvest before first frost", "Cure squash"] },
  October: { plantNow: ["Garlic", "Cover crops"], startInTrays: [], harvest: ["Fall greens", "Root crops", "Late squash"], prepareNext: ["Mulch garlic", "Clean up beds"] },
  November: { plantNow: ["Garlic (last chance, mulched)"], startInTrays: [], harvest: ["Hardy greens", "Stored crops"], prepareNext: ["Mulch overwintering beds", "Order seed"] },
  December: { plantNow: ["Nothing"], startInTrays: [], harvest: ["Stored crops", "Kale under cover"], prepareNext: ["Plan next year", "Rest"] },
};

const zone7Months: MonthlyCalendar = {
  ...zone6Months,
  February: { plantNow: ["Peas (late month)", "Spinach"], startInTrays: ["Onions", "Broccoli", "Cabbage", "Tomatoes (late month)"], harvest: ["Overwintered greens"], prepareNext: ["Prep beds", "Prune fruit trees"] },
  March: { plantNow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Potatoes"], startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Basil"], harvest: ["Overwintered greens", "Early peas"], prepareNext: ["Prep summer beds", "Set up irrigation"] },
  April: { plantNow: ["Beans (late month)", "Lettuce", "Carrots", "Beets", "Chard", "Potatoes"], startInTrays: ["Cucumbers", "Squash", "Melons"], harvest: ["Spring greens", "Peas", "Asparagus"], prepareNext: ["Harden off warm crops", "Mulch beds"] },
};

const zone8Months: MonthlyCalendar = {
  January: { plantNow: ["Peas", "Spinach", "Lettuce", "Kale", "Onion sets", "Garlic (last chance)"], startInTrays: ["Onions", "Broccoli", "Cabbage"], harvest: ["Winter greens", "Citrus (warm areas)", "Root crops"], prepareNext: ["Order seeds", "Prune fruit trees", "Add compost"] },
  February: { plantNow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets"], startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Broccoli"], harvest: ["Winter greens", "Brassicas"], prepareNext: ["Prep summer beds", "Set up irrigation", "Build trellises"] },
  March: { plantNow: ["Peas", "Potatoes", "Carrots", "Beets", "Lettuce", "Chard", "Onion sets"], startInTrays: ["Tomatoes", "Peppers", "Squash", "Cucumbers", "Melons"], harvest: ["Spring greens", "Peas starting"], prepareNext: ["Build tomato cages", "Watch last frost"] },
  April: { plantNow: ["Beans", "Summer squash", "Cucumbers", "Corn", "Sunflowers", "Zinnias"], startInTrays: ["Melons", "Pumpkins"], harvest: ["Lettuce", "Peas", "Spring greens", "Asparagus"], prepareNext: ["Transplant tomatoes and peppers", "Mulch beds"] },
  May: { plantNow: ["Beans (succession)", "Cucumbers", "Squash", "Corn", "Okra", "Sunflowers", "Basil"], startInTrays: [], harvest: ["Peas", "Lettuce", "Beets", "Carrots"], prepareNext: ["Mulch everything", "Set summer watering schedule"] },
  June: { plantNow: ["Beans (succession)", "Okra", "Cowpeas", "Cucumbers", "Watermelon", "Sunflowers"], startInTrays: ["Fall broccoli and cabbage"], harvest: ["Zucchini", "Beans", "Cucumbers", "Early tomatoes", "Garlic"], prepareNext: ["Order garlic", "Plan fall garden"] },
  July: { plantNow: ["Cowpeas", "Okra", "Beans (last succession)"], startInTrays: ["Fall brassicas", "Kale"], harvest: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers", "Melons"], prepareNext: ["Order fall seed", "Prep fall beds"] },
  August: { plantNow: ["Beans (last)", "Radishes (late month)"], startInTrays: ["Broccoli", "Cabbage", "Kale", "Chard"], harvest: ["Tomatoes (peak)", "Peppers", "Watermelon", "Squash"], prepareNext: ["Order garlic", "Clear spent beds"] },
  September: { plantNow: ["Carrots", "Beets", "Lettuce", "Radishes", "Chard", "Spinach"], startInTrays: ["Kale", "Pac choi"], harvest: ["Tomatoes", "Peppers", "Pumpkins", "Sweet potatoes"], prepareNext: ["Prep garlic beds", "Transplant fall brassicas"] },
  October: { plantNow: ["Garlic", "Onion sets", "Peas", "Spinach", "Lettuce", "Carrots"], startInTrays: [], harvest: ["Fall greens", "Winter squash", "Late peppers"], prepareNext: ["Cover-crop empty beds", "Save seeds", "Mulch garlic"] },
  November: { plantNow: ["Garlic (if not done)", "Fava beans", "Peas", "Spinach", "Kale"], startInTrays: ["Onions"], harvest: ["Fall greens", "Broccoli", "Kale", "Root crops"], prepareNext: ["Mulch beds", "Protect tender plants", "Order seed"] },
  December: { plantNow: ["Peas", "Fava beans", "Spinach", "Lettuce"], startInTrays: [], harvest: ["Winter greens", "Kale", "Citrus (warm areas)"], prepareNext: ["Order seeds", "Plan layout", "Service irrigation"] },
};

const zone9Months: MonthlyCalendar = {
  ...zone8Months,
  January: { plantNow: ["Peas", "Spinach", "Lettuce", "Kale", "Radishes", "Beets", "Carrots", "Onions", "Garlic"], startInTrays: ["Tomatoes", "Peppers (late month)", "Broccoli"], harvest: ["Winter greens", "Citrus", "Brassicas", "Root crops"], prepareNext: ["Order summer seeds", "Amend beds", "Prune fruit trees"] },
  February: { plantNow: ["Peas", "Beets", "Carrots", "Lettuce", "Spinach", "Potatoes (late month)"], startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Basil", "Cucumbers"], harvest: ["Citrus", "Winter greens", "Brassicas"], prepareNext: ["Set up irrigation", "Build tomato cages", "Prep summer beds"] },
  December: { plantNow: ["Peas", "Fava beans", "Lettuce", "Spinach", "Kale", "Onions"], startInTrays: ["Onions", "Tomatoes (late month, early start)"], harvest: ["Winter greens", "Citrus", "Broccoli", "Root crops"], prepareNext: ["Order seeds early", "Plan spring layout", "Keep growing"] },
};

const zone10Months: MonthlyCalendar = {
  ...zone9Months,
  June: { plantNow: ["Cowpeas", "Okra", "Sweet potatoes", "Armenian cucumbers", "Heat-loving herbs"], startInTrays: ["Fall brassicas (late summer)"], harvest: ["Tomatoes", "Peppers", "Cucumbers", "Melons starting"], prepareNext: ["Plan around peak heat", "Order garlic"] },
  July: { plantNow: ["Cowpeas", "Okra", "Sweet potatoes"], startInTrays: ["Fall brassicas"], harvest: ["Tomatoes (peak)", "Peppers", "Melons", "Eggplant"], prepareNext: ["Prep fall beds", "Order fall seed"] },
  August: { plantNow: ["Beans (last)", "Cucumbers (last chance)", "Radishes (late month)"], startInTrays: ["Broccoli", "Cauliflower", "Kale", "Chard"], harvest: ["Tomatoes", "Peppers", "Watermelon", "Eggplant"], prepareNext: ["Order garlic", "Plan the big fall garden"] },
  December: { plantNow: ["Peas", "Fava beans", "Lettuce", "Spinach", "Kale", "Radishes", "Onions", "Carrots", "Beets"], startInTrays: ["Onions", "Tomatoes (early start)"], harvest: ["Winter greens", "Citrus (peak)", "Broccoli", "Root crops"], prepareNext: ["Order seeds early", "Plan spring", "Keep growing year-round"] },
};

export const zoneGuides: ZoneGuide[] = [
  {
    zone: "3",
    title: "USDA Zone 3",
    blurb: "Cold winters, a very short summer. Cool-season crops and fast warm-season varieties.",
    climateOverview: [
      "Bitterly cold winters with deep, lasting snow",
      "A short frost-free window — roughly 90 to 120 days",
      "Last frost often late May to early June; first frost early September",
      "Warm-season crops need to be started indoors and chosen for speed",
    ],
    growsWell: ["Kale", "Cabbage", "Broccoli", "Peas", "Potatoes", "Carrots", "Beets", "Lettuce", "Spinach", "Short-season beans", "Hardy herbs", "Rhubarb"],
    seedsToStock: ["Peas", "Kale", "Cabbage", "Broccoli", "Lettuce", "Spinach", "Carrots", "Beets", "Radishes", "Short-season beans", "Potatoes", "Onions", "Garlic"],
    directSow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Kale (after thaw)"],
    trayStart: ["Tomatoes (short-season)", "Peppers", "Broccoli", "Cabbage", "Onions", "Lettuce"],
    commonChallenges: ["Very short growing season", "Late spring and early fall frosts", "Cold soil delaying germination", "Choosing fast-maturing varieties"],
    months: zone3Months,
  },
  {
    zone: "4",
    title: "USDA Zone 4",
    blurb: "Cold winters and a short but workable summer. Plan around an early-fall frost.",
    climateOverview: [
      "Cold, snowy winters",
      "Frost-free window of roughly 110 to 140 days",
      "Last frost mid-to-late May; first frost mid-September",
      "Warm-season crops do best started indoors and transplanted",
    ],
    growsWell: ["Tomatoes (short-season)", "Beans", "Summer squash", "Kale", "Cabbage", "Broccoli", "Peas", "Potatoes", "Carrots", "Beets", "Lettuce", "Hardy herbs"],
    seedsToStock: ["Tomatoes (short-season)", "Beans", "Squash", "Peas", "Kale", "Cabbage", "Broccoli", "Lettuce", "Carrots", "Beets", "Potatoes", "Onions", "Garlic"],
    directSow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Beans (after frost)"],
    trayStart: ["Tomatoes", "Peppers", "Squash", "Broccoli", "Cabbage", "Onions"],
    commonChallenges: ["Short season for warm-season crops", "Late and early frosts", "Cold spring soil", "Cold-hardy variety selection"],
    months: zone4Months,
  },
  {
    zone: "5",
    title: "USDA Zone 5",
    blurb: "Cold winters with a solid summer. Most common vegetables work with timing care.",
    climateOverview: [
      "Cold winters, reliably below freezing",
      "Frost-free window of roughly 140 to 160 days",
      "Last frost mid-May; first frost early-to-mid October",
      "A full range of warm-season crops works with a head start indoors",
    ],
    growsWell: ["Tomatoes", "Peppers", "Beans", "Squash", "Cucumbers", "Corn", "Kale", "Broccoli", "Cabbage", "Peas", "Carrots", "Beets", "Lettuce", "Most herbs"],
    seedsToStock: ["Tomatoes", "Peppers", "Beans", "Squash", "Cucumbers", "Corn", "Peas", "Kale", "Broccoli", "Lettuce", "Carrots", "Beets", "Onions", "Garlic"],
    directSow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Beans (after frost)", "Corn"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Squash", "Broccoli", "Onions"],
    commonChallenges: ["Spring frost risk into May", "Cold soil early", "Fitting long-season crops in", "Fall frost timing"],
    months: zone5Months,
  },
  {
    zone: "6",
    title: "USDA Zone 6",
    blurb: "Moderate winters and a generous summer. A wide range of crops thrive.",
    climateOverview: [
      "Cold but moderate winters",
      "Frost-free window of roughly 160 to 180 days",
      "Last frost mid-April to early May; first frost mid-October",
      "Long enough for nearly all common vegetables",
    ],
    growsWell: ["Tomatoes", "Peppers", "Eggplant", "Beans", "Squash", "Cucumbers", "Corn", "Melons", "Brassicas", "Peas", "Root crops", "Lettuce", "All common herbs"],
    seedsToStock: ["Tomatoes", "Peppers", "Eggplant", "Beans", "Squash", "Cucumbers", "Corn", "Melons", "Broccoli", "Kale", "Lettuce", "Carrots", "Beets", "Peas", "Onions", "Garlic"],
    directSow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Beans", "Corn", "Squash"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers", "Squash", "Broccoli", "Onions"],
    commonChallenges: ["Spring frost into early May", "Summer heat and humidity in some areas", "Fall frost mid-October", "Disease pressure in wet summers"],
    months: zone6Months,
  },
  {
    zone: "7",
    title: "USDA Zone 7",
    blurb: "Mild winters and a long summer. Year-round growing is possible with cool-season crops.",
    climateOverview: [
      "Mild winters with occasional hard freezes",
      "Frost-free window of roughly 180 to 210 days",
      "Last frost early-to-mid April; first frost late October to November",
      "Cool-season crops can grow through much of the winter",
    ],
    growsWell: ["Tomatoes", "Peppers", "Eggplant", "Okra", "Beans", "Squash", "Cucumbers", "Melons", "Sweet potatoes", "Brassicas", "Greens", "All herbs"],
    seedsToStock: ["Tomatoes", "Peppers", "Okra", "Beans", "Squash", "Cucumbers", "Melons", "Sweet potatoes", "Broccoli", "Kale", "Lettuce", "Carrots", "Beets", "Peas", "Garlic", "Onions"],
    directSow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Beans", "Corn", "Squash", "Okra"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers", "Squash", "Broccoli", "Onions"],
    commonChallenges: ["Late spring frost surprises", "Summer heat and humidity", "Disease pressure in wet climates", "Timing two growing seasons"],
    months: zone7Months,
  },
  {
    zone: "8",
    title: "USDA Zone 8",
    blurb: "Hot summers and short mild winters. Two strong growing seasons, spring and fall.",
    climateOverview: [
      "Short, mild winters with light frost",
      "Long, hot summers",
      "Last frost early-to-mid March; first frost late November",
      "Spring and fall are the prime windows; high summer can be brutal",
    ],
    growsWell: ["Tomatoes", "Peppers", "Eggplant", "Okra", "Cucumbers", "Squash", "Melons", "Sweet potatoes", "Beans", "Brassicas (fall)", "Greens", "All herbs", "Figs"],
    seedsToStock: ["Tomatoes", "Peppers", "Okra", "Cucumbers", "Squash", "Melons", "Beans", "Sweet potatoes", "Broccoli", "Kale", "Lettuce", "Carrots", "Beets", "Peas", "Garlic", "Onions", "Sunflowers"],
    directSow: ["Beans", "Cucumbers", "Squash", "Corn", "Okra", "Sunflowers", "Carrots", "Beets", "Lettuce (cool months)"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Broccoli (fall)", "Cabbage (fall)"],
    commonChallenges: ["Intense summer heat stalling fruit set", "Humidity and disease in the Southeast", "Watering through dry summers in the West", "Timing fall brassicas in lingering heat"],
    months: zone8Months,
  },
  {
    zone: "9",
    title: "USDA Zone 9",
    blurb: "Hot summers, very mild winters. Long seasons and near year-round growing.",
    climateOverview: [
      "Very mild winters, frost light and occasional",
      "Long, hot summers — often the limiting factor",
      "Last frost January to February; first frost November to December",
      "Cool-season crops grow right through winter",
    ],
    growsWell: ["Tomatoes", "Peppers", "Eggplant", "Okra", "Cucumbers", "Melons", "Watermelon", "Sweet potatoes", "Squash", "Beans", "Citrus", "Figs", "Pomegranates", "Brassicas (fall/winter)", "Greens"],
    seedsToStock: ["Tomatoes", "Peppers", "Okra", "Cucumbers", "Watermelon", "Squash", "Beans", "Sweet potatoes", "Sunflowers", "Broccoli", "Kale", "Lettuce", "Carrots", "Beets", "Garlic", "Onions", "Cover crop mix"],
    directSow: ["Beans", "Cucumbers", "Squash", "Corn", "Okra", "Sunflowers", "Cowpeas", "Carrots", "Beets", "Lettuce (cool months)"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Broccoli (fall)", "Cabbage (fall)"],
    commonChallenges: ["Extreme summer heat stalling fruit set", "Long dry season demanding irrigation", "Keeping fall starts alive through late-summer heat", "Sunscald and spider mites"],
    months: zone9Months,
  },
  {
    zone: "10",
    title: "USDA Zone 10",
    blurb: "Hot to warm year-round, essentially frost-free. Grow something every month.",
    climateOverview: [
      "Frost is rare to nonexistent",
      "Warm to hot all year; high summer can be too hot for some crops",
      "Cool season (fall through spring) is the prime vegetable window",
      "Tropical and subtropical fruit thrive in much of the zone",
    ],
    growsWell: ["Tomatoes", "Peppers", "Eggplant", "Okra", "Sweet potatoes", "Cucumbers", "Melons", "Beans", "Citrus", "Avocado", "Figs", "Bananas (warm pockets)", "Brassicas (cool season)", "Greens"],
    seedsToStock: ["Tomatoes", "Peppers", "Okra", "Cucumbers", "Melons", "Beans", "Sweet potatoes", "Squash", "Sunflowers", "Broccoli", "Kale", "Lettuce", "Carrots", "Beets", "Garlic", "Onions"],
    directSow: ["Beans", "Cucumbers", "Squash", "Corn", "Okra", "Sunflowers", "Cowpeas", "Carrots (cool months)", "Lettuce (cool months)"],
    trayStart: ["Tomatoes", "Peppers", "Eggplant", "Broccoli (cool season)", "Cabbage (cool season)"],
    commonChallenges: ["Summer heat too high for some crops", "Year-round pest pressure", "Constant irrigation needs", "Reversed calendar — best growing is fall to spring"],
    months: zone10Months,
  },
];

export function getZoneGuide(zone: string): ZoneGuide | undefined {
  return zoneGuides.find((z) => z.zone === zone);
}

export function getZoneNumbers(): string[] {
  return zoneGuides.map((z) => z.zone);
}
