import type { LocalProfile, MonthlyCalendar } from "./types";

// Four climate profiles cover the ~240-mile radius around Anderson. Each local
// town guide is built from one of these and overrides only what differs.

// ─── North Valley floor (Anderson, Redding, Red Bluff, Chico) — Zone 9b ─────────

const northValleyMonths: MonthlyCalendar = {
  January: {
    plantNow: ["Peas", "Fava beans", "Spinach", "Lettuce", "Kale", "Radishes", "Onion sets", "Garlic (last chance)"],
    startInTrays: ["Onions", "Leeks", "Broccoli", "Cabbage", "Cauliflower"],
    harvest: ["Overwintered kale and chard", "Winter greens", "Citrus", "Root crops in ground"],
    prepareNext: ["Order seeds before they sell out", "Add compost to beds", "Prune dormant fruit trees", "Check irrigation for winter damage"],
  },
  February: {
    plantNow: ["Peas", "Spinach", "Lettuce", "Radishes", "Carrots", "Beets", "Chard", "Cilantro"],
    startInTrays: ["Tomatoes (late month)", "Peppers", "Eggplant", "Basil", "Broccoli"],
    harvest: ["Winter greens", "Kale", "Citrus", "Overwintered brassicas"],
    prepareNext: ["Set up irrigation", "Build pea and bean trellises", "Prep tomato beds with compost", "Test the drip system"],
  },
  March: {
    plantNow: ["Peas", "Potatoes", "Carrots", "Beets", "Chard", "Lettuce", "Onion sets", "Turnips"],
    startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Basil", "Summer squash", "Cucumbers", "Melons"],
    harvest: ["Spring greens", "Peas starting", "Kale", "Broccoli", "Early lettuce"],
    prepareNext: ["Build tomato cages", "Get shade cloth on hand", "Order summer seeds", "Watch last frost dates"],
  },
  April: {
    plantNow: ["Beans (mid-late month, after frost)", "Beets", "Carrots", "Chard", "Summer squash", "Zucchini", "Corn"],
    startInTrays: ["Cucumbers", "Melons", "Winter squash", "Pumpkins", "Sunflowers", "Zinnias", "Marigolds", "Cosmos"],
    harvest: ["Lettuce", "Peas", "Spring greens", "Asparagus", "Early radishes"],
    prepareNext: ["Set tomato cages before plants need them", "Check drip emitters", "Plan the summer water schedule", "Start mulching"],
  },
  May: {
    plantNow: ["Beans (succession)", "Cucumbers", "Summer squash", "Zucchini", "Corn", "Sunflowers", "Zinnias", "Basil", "Okra (late month)"],
    startInTrays: [],
    harvest: ["Peas (final)", "Lettuce (before it bolts)", "Beets", "Carrots", "Spring greens", "Early beans"],
    prepareNext: ["Transplant tomatoes, peppers, eggplant", "Mulch everything — bare soil bakes here", "Lock in the watering schedule", "Pull bolting spring crops"],
  },
  June: {
    plantNow: ["Okra", "Cowpeas", "Armenian cucumbers", "Lemon cucumbers", "Beans (succession)", "Watermelon", "Sunflowers", "Zinnias", "Marigolds"],
    startInTrays: ["Broccoli for fall", "Cabbage for fall", "Cauliflower for fall"],
    harvest: ["Zucchini", "Beans", "Cucumbers", "Early tomatoes", "Herbs", "Beets", "Garlic (late month)"],
    prepareNext: ["Start fall brassicas even though it's hot", "Order garlic for fall", "Plan the fall garden", "Switch to deep, infrequent watering"],
  },
  July: {
    plantNow: ["Cowpeas", "Okra", "Armenian cucumbers", "Beans (last succession)"],
    startInTrays: ["Broccoli for fall", "Cabbage", "Kale", "Cauliflower"],
    harvest: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers", "Zucchini", "Beans", "Melons", "Basil"],
    prepareNext: ["Order fall seeds", "Prep fall beds while you have time", "Place the garlic order", "Turn the compost pile"],
  },
  August: {
    plantNow: ["Cowpeas (last)", "Beans (last succession)", "Radishes (late month)"],
    startInTrays: ["Broccoli", "Cabbage", "Kale", "Chard for fall", "Collards"],
    harvest: ["Tomatoes (peak)", "Peppers", "Watermelon", "Eggplant", "Winter squash", "Sweet corn"],
    prepareNext: ["Clear spent summer beds and compost them", "Order garlic now", "Plan strawberry planting for September", "Build compost from summer debris"],
  },
  September: {
    plantNow: ["Carrots", "Beets", "Chard", "Lettuce", "Radishes", "Turnips", "Spinach (late month)"],
    startInTrays: ["Kale", "Chard", "Spinach", "Pac choi"],
    harvest: ["Tomatoes", "Peppers", "Eggplant", "Winter squash", "Pumpkins", "Sweet potatoes"],
    prepareNext: ["Prep garlic beds for October", "Plant strawberries now", "Dial back irrigation as it cools", "Transplant the fall brassicas"],
  },
  October: {
    plantNow: ["Garlic", "Onion sets", "Radishes", "Spinach", "Lettuce", "Carrots", "Peas (late month)", "Fava beans", "Cover crop mix"],
    startInTrays: ["Onions (late month)"],
    harvest: ["Winter squash and pumpkins", "Fall greens", "Last peppers", "Late tomatoes", "Herbs before frost"],
    prepareNext: ["Cover-crop empty beds", "Save seeds before frost", "Get garlic in the ground", "Order onion seed for January"],
  },
  November: {
    plantNow: ["Garlic (if not done)", "Fava beans", "Peas", "Spinach", "Kale", "Chard", "Lettuce"],
    startInTrays: ["Onions (late month)"],
    harvest: ["Fall greens", "Broccoli", "Chard", "Kale", "Root crops", "Late citrus"],
    prepareNext: ["Mulch beds with straw", "Protect young citrus from frost", "Plan next year's layout", "Order seeds"],
  },
  December: {
    plantNow: ["Garlic (last chance)", "Peas", "Fava beans", "Lettuce", "Spinach"],
    startInTrays: [],
    harvest: ["Winter greens", "Citrus", "Kale", "Chard", "Root crops in ground"],
    prepareNext: ["Order seeds so you get what you want", "Plan the layout", "Flush and service drip lines", "Rest"],
  },
};

export const northValleyProfile: LocalProfile = {
  climateReality: [
    "Long, very hot summers — triple digits are normal in July and August",
    "Mild winters with light frost, but rarely a hard freeze",
    "Bone dry May through October — irrigation is not optional",
    "Spring is short and fast — the window before heat stress is narrow",
    "Fall is long and forgiving — some of the best growing is September through November",
  ],
  growsWell: {
    vegetables: ["Tomatoes", "Peppers", "Eggplant", "Okra", "Cucumbers", "Pumpkins", "Watermelon", "Sweet potatoes", "Squash", "Beans", "Peas", "Brassicas"],
    flowers: ["Sunflowers", "Zinnias", "Cosmos", "Marigolds", "Celosia", "Gomphrena"],
    fruitTrees: ["Figs", "Pomegranates", "Peaches", "Plums"],
    berries: ["Blackberries", "Strawberries", "Grapes"],
    herbs: ["Basil", "Dill", "Cilantro", "Oregano", "Thyme", "Rosemary"],
    coverCrops: ["Clover", "Vetch", "Field peas", "Rye", "Barley"],
  },
  seedsToStock: ["Sunflowers", "Okra", "Cowpeas", "Bush beans", "Pole beans", "Cucumbers", "Watermelon", "Pumpkins", "Winter squash", "Zucchini", "Tomatoes", "Peppers", "Basil", "Zinnias", "Cosmos", "Marigolds", "Kale", "Broccoli", "Cabbage", "Cauliflower", "Lettuce", "Spinach", "Carrots", "Beets", "Radishes", "Peas", "Cilantro", "Dill", "Garlic", "Onion", "Cover crop mix"],
  directSowNow: ["Sunflowers", "Okra", "Cowpeas", "Bush beans", "Cucumbers", "Zinnias", "Cosmos", "Marigolds"],
  startInTraysNow: ["Broccoli (for fall)", "Cabbage (for fall)", "Cauliflower (for fall)", "Kale (for fall)", "Collards (for fall)", "Fall herbs"],
  transplantsToBuy: ["Basil", "Peppers", "Eggplant", "Heat-tolerant flowers", "Sweet potato slips"],
  thisWeeksTasks: [
    "Water early before the heat builds",
    "Mulch any bare soil — exposed ground bakes and dries out fast",
    "Shade new transplants for the first week",
    "Check drip emitters — clogged lines stress plants",
    "Start fall brassicas in trays, even if it still feels too hot",
    "Pull weeds before they set seed",
    "Prep strawberry beds for September planting",
    "Plan the next succession of sunflowers",
  ],
  prepareNext: [
    "Fall garden beds — clear summer crops and add compost",
    "Garlic order — place it early",
    "Onion planning for winter starts",
    "Strawberry patch expansion",
    "Compost system — build or improve it",
    "Cover crops for empty beds",
  ],
  heatNotes: [
    "Heat is the main challenge here, not frost",
    "Deep, infrequent watering trains roots downward and beats daily shallow watering",
    "Fall crops need to start in trays while it still feels too hot — trust the timing",
    "30–50% shade cloth makes a real difference for fall transplants going in during lingering heat",
  ],
  frostNotes: [
    "Frost is light and usually shows up November through February",
    "Hard freezes are rare but possible — watch the forecast in cold snaps",
    "Citrus and basil are the most vulnerable; cover them when frost is called",
  ],
  irrigationNotes: [
    "Drip irrigation is the backbone of a valley garden here",
    "Water deeply two to three times a week in peak summer rather than a little every day",
    "Mulch holds moisture and keeps soil temperature down",
    "Morning watering reduces evaporation loss",
  ],
  commonChallenges: [
    "Extreme summer heat stalling fruit set on tomatoes and peppers",
    "Sunscald on exposed fruit",
    "Spider mites in hot, dusty conditions",
    "Keeping fall starts alive through September heat",
    "Gophers and ground squirrels",
  ],
  recommendedVarieties: [
    { crop: "Tomatoes", varieties: "Heat-setting types like Heatmaster, Phoenix, Solar Fire, and Sun Gold for cherries" },
    { crop: "Peppers", varieties: "Reliable producers like Shishito, Jimmy Nardello, and Big Bertha" },
    { crop: "Cucumbers", varieties: "Armenian, Lemon, and Burpless hold up to heat better than standard slicers" },
    { crop: "Sunflowers", varieties: "ProCut series for cut flowers, Mammoth for seed and height" },
    { crop: "Beans", varieties: "Rattlesnake pole and Provider bush both handle the heat" },
  ],
  months: northValleyMonths,
};

// ─── Sacramento Valley (Sacramento, Davis, Woodland, Yuba City) — Zone 9b ────────

const sacramentoValleyMonths: MonthlyCalendar = {
  ...northValleyMonths,
  January: {
    plantNow: ["Peas", "Fava beans", "Onion sets", "Garlic (last chance)", "Spinach", "Lettuce"],
    startInTrays: ["Onions", "Leeks", "Broccoli", "Cabbage"],
    harvest: ["Winter greens", "Kale", "Overwintered roots", "Citrus"],
    prepareNext: ["Order seeds", "Add compost to beds", "Prune fruit trees", "Wait out the tule fog"],
  },
  December: {
    plantNow: ["Peas", "Fava beans", "Spinach", "Lettuce"],
    startInTrays: [],
    harvest: ["Winter greens", "Kale", "Chard", "Citrus", "Root crops"],
    prepareNext: ["Order seeds", "Plan the layout", "Service irrigation", "Expect weeks of fog"],
  },
};

export const sacramentoValleyProfile: LocalProfile = {
  ...northValleyProfile,
  climateReality: [
    "Hot summers, broadly similar to the north valley but slightly more moderate highs",
    "Tule fog in winter — can sit for weeks and slow cool-season crops",
    "Short spring window before heat sets in",
    "Excellent, long fall growing season",
    "Irrigation required May through October",
  ],
  commonChallenges: [
    "Summer heat stalling fruit set",
    "Tule fog slowing winter crops",
    "Clay soil that needs compost and drainage help",
    "Gophers and ground squirrels",
  ],
  frostNotes: [
    "Light frost possible November through February",
    "Tule fog rarely freezes crops but keeps them cold and slow",
    "Protect basil and citrus in cold snaps",
  ],
  months: sacramentoValleyMonths,
};

// ─── Sierra foothills (Paradise, Oroville, Shasta Lake) — Zone 8b–9a ─────────────

const foothillMonths: MonthlyCalendar = {
  ...northValleyMonths,
  March: {
    plantNow: ["Peas", "Potatoes", "Carrots", "Beets", "Lettuce", "Chard", "Onion sets"],
    startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Basil", "Squash"],
    harvest: ["Spring greens", "Overwintered kale", "Early peas"],
    prepareNext: ["Watch for late frost — foothills run a couple weeks behind the valley", "Build tomato supports", "Prep beds"],
  },
  April: {
    plantNow: ["Beans (late month)", "Beets", "Carrots", "Chard", "Summer squash", "Potatoes"],
    startInTrays: ["Cucumbers", "Melons", "Pumpkins", "Sunflowers", "Zinnias"],
    harvest: ["Lettuce", "Peas", "Spring greens", "Asparagus"],
    prepareNext: ["Hold tender transplants until frost risk passes", "Mulch beds", "Set the summer water plan"],
  },
};

export const foothillProfile: LocalProfile = {
  ...northValleyProfile,
  climateReality: [
    "Hot, dry summers but a touch cooler than the valley floor thanks to elevation",
    "Spring and fall run a week or two behind the valley",
    "More winter rain and slightly later frosts than Anderson or Redding",
    "Good air drainage — cold settles into the valleys below",
    "Irrigation essential through the dry summer",
  ],
  commonChallenges: [
    "Later last-frost dates than the valley floor",
    "Rocky or shallow soil in places — raised beds help",
    "Wildfire smoke can stress plants in late summer",
    "Deer pressure on the garden edge",
  ],
  frostNotes: [
    "Last frost runs a week or two later than the valley floor",
    "First fall frost can arrive earlier — watch October nights",
    "Good cold-air drainage on slopes; valleys and hollows frost first",
  ],
  months: foothillMonths,
};

// ─── Southern Cascades / Intermountain (Mount Shasta, Yreka, Susanville) — 6b–7a ─

const mountainMonths: MonthlyCalendar = {
  January: {
    plantNow: ["Nothing outdoors — soil is frozen or too cold"],
    startInTrays: ["Onions (late month)", "Leeks"],
    harvest: ["Stored squash and roots", "Kale under cover"],
    prepareNext: ["Order seeds", "Plan the short season carefully", "Service tools", "Read seed catalogs"],
  },
  February: {
    plantNow: ["Nothing outdoors yet"],
    startInTrays: ["Onions", "Leeks", "Broccoli", "Cabbage", "Cauliflower", "Celery"],
    harvest: ["Stored crops"],
    prepareNext: ["Start brassicas and onions indoors", "Build or repair cold frames", "Plan the layout"],
  },
  March: {
    plantNow: ["Peas (late month if soil is workable)", "Spinach (under cover)"],
    startInTrays: ["Tomatoes", "Peppers", "Eggplant", "Broccoli", "Cabbage", "Basil"],
    harvest: ["Overwintered hardy greens"],
    prepareNext: ["Prep beds as soil dries", "Set up row cover and cold frames", "Be patient — frost lingers"],
  },
  April: {
    plantNow: ["Peas", "Spinach", "Lettuce", "Radishes", "Kale", "Potatoes (late month)"],
    startInTrays: ["Cucumbers", "Squash", "Sunflowers"],
    harvest: ["First spring greens under cover"],
    prepareNext: ["Harden off cool-season starts", "Keep frost cloth handy — snow is still possible"],
  },
  May: {
    plantNow: ["Peas", "Lettuce", "Spinach", "Beets", "Carrots", "Chard", "Radishes", "Potatoes"],
    startInTrays: ["Short-season melons"],
    harvest: ["Spring greens", "Overwintered crops"],
    prepareNext: ["Wait on warm-season transplants — last frost is often late May or June", "Use cloches to warm soil"],
  },
  June: {
    plantNow: ["Beans (after last frost)", "Summer squash", "Cucumbers", "Corn (short-season)", "Sunflowers", "Zinnias"],
    startInTrays: [],
    harvest: ["Peas", "Lettuce", "Spinach", "Radishes", "Early greens"],
    prepareNext: ["Transplant tomatoes and peppers now, with protection", "Succession-sow lettuce and greens"],
  },
  July: {
    plantNow: ["Beans (succession)", "Beets and carrots for fall", "Lettuce", "Kale"],
    startInTrays: ["Fall broccoli and cabbage"],
    harvest: ["Peas", "Early beans", "Zucchini", "Greens", "Herbs"],
    prepareNext: ["Order fall and overwintering seed", "Plan the short fall window carefully"],
  },
  August: {
    plantNow: ["Spinach", "Lettuce", "Radishes", "Kale", "Turnips", "Cilantro"],
    startInTrays: ["Overwintering onions"],
    harvest: ["Tomatoes (finally)", "Beans", "Zucchini", "Cucumbers", "Early potatoes"],
    prepareNext: ["Plant garlic-bed cover crops", "Get cold frames ready", "Harvest ahead of early frost"],
  },
  September: {
    plantNow: ["Garlic (early)", "Spinach", "Kale", "Lettuce under cover"],
    startInTrays: [],
    harvest: ["Tomatoes", "Winter squash", "Potatoes", "Beans", "Apples"],
    prepareNext: ["Frost can arrive this month — cover tender crops", "Cure and store squash and potatoes"],
  },
  October: {
    plantNow: ["Garlic", "Cover crops"],
    startInTrays: [],
    harvest: ["Last hardy greens", "Stored roots and squash", "Brussels sprouts"],
    prepareNext: ["Mulch garlic heavily", "Clean up the garden before snow", "Protect or harvest everything left"],
  },
  November: {
    plantNow: ["Garlic (last chance, mulched)"],
    startInTrays: [],
    harvest: ["Kale and hardy greens under cover", "Stored crops"],
    prepareNext: ["Heavy mulch on overwintering beds", "Order next year's seed", "Rest"],
  },
  December: {
    plantNow: ["Nothing"],
    startInTrays: [],
    harvest: ["Stored squash, roots, and onions"],
    prepareNext: ["Plan next season", "Order seed early", "Service tools"],
  },
};

export const mountainProfile: LocalProfile = {
  climateReality: [
    "Short, cool summers — the warm-season window is narrow",
    "Cold winters with real freezes and snow",
    "Last frost is often late May or June; first frost can come in September",
    "Big day-to-night temperature swings, even in summer",
    "Cool-season crops are the strength of this climate",
  ],
  growsWell: {
    vegetables: ["Kale", "Chard", "Lettuce", "Spinach", "Broccoli", "Cabbage", "Peas", "Potatoes", "Carrots", "Beets", "Beans (short-season)", "Brassicas"],
    flowers: ["Sunflowers", "Zinnias", "Cosmos", "Calendula", "Bachelor buttons"],
    fruitTrees: ["Apples", "Pears", "Cold-hardy plums"],
    berries: ["Raspberries", "Strawberries", "Currants"],
    herbs: ["Cilantro", "Dill", "Chives", "Parsley", "Mint"],
    coverCrops: ["Field peas", "Rye", "Vetch", "Clover"],
  },
  seedsToStock: ["Kale", "Chard", "Lettuce", "Spinach", "Broccoli", "Cabbage", "Peas", "Beans (short-season)", "Beets", "Carrots", "Potatoes", "Onions", "Garlic", "Radishes", "Turnips", "Sunflowers", "Zinnias", "Calendula", "Cover crop mix"],
  directSowNow: ["Peas", "Spinach", "Lettuce", "Radishes", "Kale", "Beets", "Carrots"],
  startInTraysNow: ["Tomatoes (short-season)", "Peppers", "Broccoli", "Cabbage", "Onions"],
  transplantsToBuy: ["Short-season tomatoes", "Peppers", "Broccoli and cabbage starts", "Cold-hardy herbs"],
  thisWeeksTasks: [
    "Check the frost forecast before planting anything tender",
    "Use row cover or cloches to warm soil and protect starts",
    "Start warm-season crops indoors — the outdoor window is short",
    "Thin direct-sown greens and roots",
    "Watch drainage — cold, soggy soil rots seed",
    "Plan the fall harvest before the first freeze",
  ],
  prepareNext: [
    "Overwintering crops — plant in late summer",
    "Garlic, planted September through October",
    "Cover crops before snow",
    "Cold frame or low tunnel construction",
    "Compost system",
  ],
  heatNotes: [
    "Heat is rarely the limiting factor — the short season is",
    "Brief summer heat spikes can still scorch tender starts; have shade cloth ready",
    "Warm soil with black plastic or cloches to speed early growth",
  ],
  frostNotes: [
    "Frost is the defining challenge — possible September through June",
    "Last spring frost is often late May or June",
    "Row cover and cloches extend the season on both ends",
    "Choose short-season varieties (65 days or fewer) for reliability",
  ],
  irrigationNotes: [
    "Drier summers still need irrigation, but less than the valley floor",
    "Cold mountain water can shock warm-season seedlings — let it warm first",
    "Good drainage matters more than volume in spring",
  ],
  commonChallenges: [
    "Short frost-free window",
    "Late spring and early fall frosts",
    "Cold soil delaying germination",
    "Deer and other wildlife pressure",
  ],
  recommendedVarieties: [
    { crop: "Tomatoes", varieties: "Short-season types like Stupice, Glacier, Early Girl, and Sungold" },
    { crop: "Peppers", varieties: "Early, compact types like Ace and King of the North" },
    { crop: "Beans", varieties: "Provider and Maxibel mature fast enough for the short season" },
    { crop: "Squash", varieties: "Bush summer squash and short-season winter squash like Sweet Dumpling" },
    { crop: "Greens", varieties: "Cold-hardy kale (Winterbor, Red Russian) and spinach for shoulder seasons" },
  ],
  months: mountainMonths,
};
