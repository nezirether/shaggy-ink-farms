import type { LocalGuide, LocalProfile } from "./types";
import {
  northValleyProfile,
  sacramentoValleyProfile,
  foothillProfile,
  mountainProfile,
} from "./profiles";

// Build a local guide from a shared climate profile plus the few fields that
// actually differ for this town. Optional overrides let individual towns tweak
// a note or recommended variety without copying the whole profile.
function makeGuide(
  base: {
    slug: string;
    name: string;
    zone: string;
    closestRegion: string;
    intro: string;
  },
  profile: LocalProfile,
  overrides: Partial<LocalProfile> = {},
): LocalGuide {
  return { ...profile, ...base, ...overrides };
}

// ─── Shaggy Ink Farms — the actual farm, most specific guide on the site ────────

const shaggyInkFarmsGuide: LocalGuide = {
  ...northValleyProfile,
  slug: "shaggy-ink-farms",
  name: "Shaggy Ink Farms",
  zone: "9b",
  closestRegion: "Anderson, CA",
  intro:
    "This is the farm itself - 3 acres in Anderson, Northern California. Hot summers, well water, a mixed laying flock, Heritage Plymouth Barred Rock breeding work, cut flowers, strawberries, a family vegetable garden, a giant pumpkin project, and an orchard coming together one fruit tree at a time. Everything here is specific to this property, this soil, and what we're actually building.",
  climateReality: [
    "3-acre family farm on the valley floor in Anderson — one of the hottest spots in California",
    "Triple-digit summers are the norm; the whole growing strategy is built around heat management",
    "Well water for all irrigation — no municipal hookup, so timing and efficiency matter a lot",
    "Mild winters with light frost, letting us grow through most of the year",
    "The mixed laying flock can help with pest pressure and fertility when rotated carefully",
    "Deer pressure from the surrounding foothills, especially at the garden edges",
    "Chickens are great for the soil but they will eat or scratch young transplants if not rotated carefully",
  ],
  growsWell: {
    vegetables: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers", "Summer squash", "Pumpkins", "Watermelon", "Beans", "Okra", "Sweet potatoes", "Brassicas (fall/winter)", "Garlic", "Onions"],
    flowers: ["Sunflowers", "Zinnias", "Cosmos", "Marigolds", "Dahlias"],
    fruitTrees: ["Figs", "Pomegranates", "Apricots", "Peaches", "Persimmons", "Asian pears", "Citrus"],
    berries: ["Strawberries", "Blackberries", "Grapes"],
    herbs: ["Basil", "Dill", "Cilantro", "Oregano", "Thyme", "Rosemary", "Lemon verbena"],
    coverCrops: ["Field peas", "Vetch", "Clover", "Barley", "Rye"],
  },
  irrigationNotes: [
    "Well water means we track every gallon — drip irrigation and heavy mulch are not optional",
    "Run drip before dawn to cut evaporation and give plants a full tank before the heat peaks",
    "Water deeply and infrequently — two to three long soaks a week trains roots deep where it stays cooler",
    "Check emitters weekly; hard valley water clogs drip lines and one blocked emitter can kill a plant in a heat wave",
    "Keep a log of pump run times and approximate gallons so water use is visible and improvable",
  ],
  commonChallenges: [
    "Extreme summer heat stalling fruit set on tomatoes and peppers",
    "Well water management during peak summer — irrigation has to be timed and efficient",
    "Deer pressure at the garden edges, especially evenings and early mornings",
    "Chickens will scratch and eat young transplants if rotated into garden beds too soon",
    "Spider mites in hot, dusty conditions",
    "Keeping fall brassica starts alive through September heat before transplanting",
    "Gophers and ground squirrels working under beds",
  ],
  recommendedVarieties: [
    { crop: "Tomatoes", varieties: "Heatmaster and Phoenix for main crop; Sun Gold cherry for season-long picking; Celebrity for reliable slicing and storage" },
    { crop: "Strawberries", varieties: "Albion and Seascape (day-neutral, long season); Chandler for one big early flush" },
    { crop: "Sunflowers", varieties: "ProCut series for cut flowers; Mammoth Grey Stripe for seed, height, and chicken treats at season end" },
    { crop: "Pumpkins", varieties: "Howden for carving and fall sales; Dill's Atlantic Giant for the family pumpkin project" },
    { crop: "Cucumbers", varieties: "Armenian and Lemon — both handle triple-digit heat better than standard slicers" },
    { crop: "Peppers", varieties: "Shishito for easy picking; Jimmy Nardello for frying; Big Bertha for stuffing" },
    { crop: "Beans", varieties: "Rattlesnake pole beans for heat tolerance; Provider bush beans for succession" },
    { crop: "Orchard", varieties: "Blenheim apricot, Fuyu persimmon, Brown Turkey fig, pomegranate — all proven in Zone 9b" },
  ],
  flagshipSections: [
    {
      title: "About the Farm",
      body: [
        "Shaggy Ink Farms is a 3-acre family property in Anderson, at the north end of the Sacramento Valley. The land is flat valley ground with good soil that rewards compost and consistent water.",
        "The farm runs without municipal water — everything comes from a well, which shapes every irrigation decision we make.",
        "Summer temperatures regularly hit 105–112°F. The whole growing strategy is designed around that reality, not around fighting it.",
        "We grow food for the family first — vegetables, fruit, berries, herbs — and we are building out the farm incrementally, season by season.",
        "The mixed laying flock, Barred Rock breeding work, strawberry patch, cut flowers, giant pumpkin project, and orchard are all active projects being developed in the open.",
      ],
    },
    {
      title: "The Mixed Flock and Breeding Work",
      body: [
        "The laying flock is mixed, and the Heritage Plymouth Barred Rock breeding program is being built separately and slowly.",
        "The flock can be rotated through sections of the garden on a schedule - they scratch, eat bugs and weeds, and add manure before the next bed goes in.",
        "Fresh chicken manure is too hot to use directly on plants. We compost all coop bedding and manure for several months before it goes near a growing bed.",
        "Layer manure with carbon - straw, dry leaves, spent garden plants - to keep the pile balanced and cooking properly.",
        "Finished chicken-manure compost is excellent worked into beds before heavy feeders like tomatoes, squash, and the pumpkin patch.",
        "Rotate chickens OUT of a section at least two weeks before transplanting anything. They will eat or scratch seedlings even when they seem settled.",
      ],
    },
    {
      title: "Irrigation Planning",
      body: [
        "Well water is the farm's resource constraint. We design irrigation to be efficient, not just adequate.",
        "All production beds run on drip — no overhead sprinklers in the vegetable garden during peak season. Drip reduces evaporation, keeps foliage dry, and puts water exactly where roots are.",
        "We water deeply two to three times a week in peak summer rather than a little every day. Deep watering trains roots downward where soil stays cooler.",
        "Timers run before dawn — water is in the soil and available before temperatures climb.",
        "Mulch is part of the irrigation system. Every bare inch of bed is mulched to hold moisture and protect soil life from the heat.",
        "Track pump run times. Knowing roughly how much water the farm uses in a week helps catch leaks, overshooting, and seasonal drift.",
      ],
    },
    {
      title: "Managing Deer & Chicken Pressure",
      body: [
        "Deer come in from the foothills, mostly evenings and early mornings. The most vulnerable areas are the edges of the property.",
        "Tall fencing (8 feet or effective double-fence) is the only reliable deer solution. Motion-activated deterrents help but are not enough on their own.",
        "The orchard is the most vulnerable deer target - young trees need protection before they establish.",
        "Chickens are both helpful and destructive. They will eat tomatoes, dig up seedling roots, and scratch out freshly planted rows if given access too soon.",
        "Keep chickens out of any bed with young transplants or freshly direct-sown seed. Rotate them in only after plants are well established and not attractive as scratch material.",
        "Temporary chicken wire panels around individual beds are the easiest way to let the flock forage nearby without losing plants.",
      ],
    },
    {
      title: "Strawberry Patch Planning",
      body: [
        "September is the time to plant or expand the strawberry patch here — the heat breaks and roots establish before winter.",
        "Albion and Seascape (day-neutral) produce across the long season; Chandler (June-bearer) gives one early, heavy flush.",
        "Plant in well-drained beds with the crown right at soil level — buried crowns rot, exposed crowns dry out.",
        "Mulch with straw to keep berries clean, hold moisture, and moderate soil temperature.",
        "Renovate the patch each year, let runners fill gaps, and replace the oldest plants every few seasons.",
        "Keep chickens out of the strawberry patch — they will eat ripe and green berries alike.",
      ],
    },
    {
      title: "Sunflower Production",
      body: [
        "Sunflowers love the Anderson heat and are one of the farm's most reliable crops.",
        "Direct-sow in succession every two to three weeks from April through July for continuous blooms and cut flowers through summer and fall.",
        "For cut flowers, grow single-stem ProCut types planted close (6 inches); for seed, pollinators, and chicken treats, grow Mammoth Grey Stripe with more room to branch.",
        "Sunflowers are heavy feeders and deep rooters — they tolerate heat but still need consistent water while getting established.",
        "Leave several heads to dry on the stalk at season's end — seeds go to the chickens, and some are saved for next year.",
      ],
    },
    {
      title: "Giant Pumpkin Project",
      body: [
        "The giant pumpkin project is a family effort, and it starts the season before with the soil.",
        "Prepare a deep, rich patch in fall — work in heavy compost and aged chicken manure, then cover-crop it through winter to protect and build the bed.",
        "Start Dill's Atlantic Giant seed indoors in April. Transplant one well-spaced plant with plenty of room to run — a giant pumpkin vine can cover 500 square feet.",
        "Provide huge amounts of water and feed. A fast-growing giant pumpkin can put on tens of pounds a day at peak and needs absolutely consistent moisture.",
        "Shade the developing fruit from direct afternoon sun to prevent splitting and sunscald, and protect the vine from our worst heat days.",
        "Bury vine nodes as the vine runs to grow secondary roots and improve the plant's water and nutrient access.",
        "Pick one fruit per plant early in the season and put all that energy into a single giant.",
      ],
    },
    {
      title: "Orchard & Family Fruit",
      body: [
        "The orchard is a long-term project — we are planting and establishing fruit trees season by season.",
        "Zone 9b is excellent for figs, pomegranates, apricots, peaches, Asian pears, persimmons, and citrus. All of these thrive in the heat.",
        "Young trees need reliable water through their first two or three summers to establish a deep root system. After that, established trees are more drought-tolerant.",
        "Protect young trees from deer — a simple wire cage or tube guard works while the trunk is vulnerable.",
        "The chickens should not have free access to the orchard when trees are young. They will damage bark and roots.",
        "Blenheim apricot, Fuyu persimmon, Brown Turkey fig, and pomegranate are reliable performers in this zone and worth planting early.",
      ],
    },
    {
      title: "Build-in-Public Farm Plan",
      body: [
        "Shaggy Ink Farms is being built and documented in the open. The goal is to share what actually works — and what doesn't — for a small family farm in the North Sacramento Valley.",
        "Each season we track what we plant, how it does, what we change, and why. That record is what makes the next year better.",
        "The current priorities are: getting the orchard established, expanding the strawberry patch, dialing in the chicken rotation system, and making the giant pumpkin project a real annual family event.",
        "We are not trying to be a large commercial operation. The goal is a productive, manageable family farm that feeds us well and teaches the kids how food actually grows.",
        "Following along means watching real decisions get made in real time — not a polished result after the fact.",
      ],
    },
  ],
};

// ─── Anderson flagship — the most detailed guide on the site ────────────────────

const andersonFlagship: LocalGuide = {
  ...northValleyProfile,
  slug: "anderson",
  name: "Anderson / Redding / Red Bluff Area",
  zone: "9b",
  closestRegion: "Northern Sacramento Valley",
  intro:
    "This is home ground for Shaggy Ink Farms. Anderson sits on the hot, dry floor of the upper Sacramento Valley between Redding and Red Bluff. Summers are long and brutal, winters are mild, and the whole game here is managing heat and water. Everything below is written from growing on this exact dirt.",
  recommendedVarieties: [
    { crop: "Tomatoes", varieties: "Heat-setting types — Heatmaster, Phoenix, Solar Fire, Celebrity; Sun Gold and Sweet Million for cherries that keep producing through the heat" },
    { crop: "Peppers", varieties: "Shishito and Jimmy Nardello for steady output; Big Bertha and Gypsy for bells that size up before the worst heat" },
    { crop: "Eggplant", varieties: "Ichiban and Orient Express love the heat; Listada de Gandia handles it well too" },
    { crop: "Okra", varieties: "Clemson Spineless and Jambalaya — okra actually wants this weather" },
    { crop: "Cucumbers", varieties: "Armenian, Lemon, and Burpless out-perform standard slicers when it's over 100°F" },
    { crop: "Watermelon", varieties: "Sugar Baby and Crimson Sweet ripen reliably in the long heat" },
    { crop: "Pumpkins", varieties: "Howden and Big Max for carving; Dill's Atlantic Giant for the giant-pumpkin project" },
    { crop: "Sunflowers", varieties: "ProCut series for cut flowers, Mammoth Grey Stripe for seed and height" },
    { crop: "Beans", varieties: "Rattlesnake pole and Provider bush both shrug off the heat" },
    { crop: "Brassicas (fall)", varieties: "Belstar broccoli, Brunswick cabbage, Lacinato and Winterbor kale for the fall garden" },
  ],
  flagshipSections: [
    {
      title: "Extreme Heat Strategy",
      body: [
        "Plan around the heat instead of fighting it. From late June through August, daytime highs sit in the high 90s to 110s, and many summer crops stop setting fruit above about 95°F.",
        "Get warm-season crops established in spring so they are mature and shading their own roots before the worst heat arrives.",
        "Use 30–50% shade cloth over peppers, young transplants, and lettuce. It drops leaf temperature enough to keep plants productive.",
        "Mulch every bare inch of soil. Bare ground in Anderson can hit 140°F and cooks shallow roots.",
        "Harvest in the morning. Fruit picked in afternoon heat is stressed and stores poorly.",
        "Accept a midsummer lull. Tomatoes often pause fruit set in July, then come roaring back in September when nights cool.",
      ],
    },
    {
      title: "Watering Strategy",
      body: [
        "Drip irrigation on a timer is the single most important system in an Anderson garden.",
        "Water deeply and less often — two or three long soaks a week beat a little every day. Deep watering trains roots downward where soil stays cooler and moister.",
        "Run the system before dawn to cut evaporation and give plants a full reservoir before the day heats up.",
        "Check emitters weekly. Our hard valley water clogs drip lines, and one blocked emitter can kill a plant in a heat wave.",
        "Combine drip with heavy mulch. The two together can cut summer water use dramatically and keep soil life alive.",
      ],
    },
    {
      title: "Fall Garden Planning",
      body: [
        "The fall garden is the best-kept secret of this climate, and the timing feels wrong: you start it in the heat of summer.",
        "Start broccoli, cabbage, cauliflower, and kale in trays in June and July, in a shaded spot, and baby them through the heat.",
        "Transplant brassicas in late August and September under shade cloth, then pull the cloth as nights cool.",
        "Direct-sow carrots, beets, lettuce, spinach, and radishes from September into October as the soil cools.",
        "A fall garden here often out-produces the spring one — the plants finish in mild weather instead of racing the heat.",
      ],
    },
    {
      title: "Winter Garden Planning",
      body: [
        "Winters are mild enough to grow straight through with the right crops.",
        "Plant garlic in October and November for a June harvest. It is one of the most reliable crops here.",
        "Keep kale, chard, spinach, lettuce, and cilantro going all winter, with light frost protection in cold snaps.",
        "Sow fava beans and field peas as both food and a soil-building cover crop.",
        "Use the quiet winter months to build compost, prune fruit, and plan the coming year.",
      ],
    },
    {
      title: "Chicken Manure Compost Integration",
      body: [
        "The flock can help build fertility over time. Chicken manure is rich in nitrogen - too rich to use fresh.",
        "Compost coop bedding and manure for several months before it touches a planting bed. Fresh manure will burn plants and can carry pathogens.",
        "Layer high-nitrogen manure with carbon - straw bedding, dry leaves, spent garden plants - to keep the pile balanced and cooking.",
        "Finished chicken-manure compost is excellent worked into beds before heavy feeders like tomatoes, squash, and the pumpkin patch.",
        "Run spent garden plants and kitchen scraps through the run first; the birds turn and pre-process a lot of it for you.",
      ],
    },
    {
      title: "Strawberry Patch Planning",
      body: [
        "September is the time to plant or expand the strawberry patch here.",
        "Day-neutral varieties like Albion and Seascape produce through our long season; June-bearers like Chandler give one big early flush.",
        "Plant in well-drained beds amended with compost, with the crown right at soil level — buried crowns rot, exposed crowns dry out.",
        "Mulch with straw to keep berries clean, hold moisture, and moderate soil temperature.",
        "Renovate the patch each year and let runners fill gaps, replacing the oldest plants every few seasons.",
      ],
    },
    {
      title: "Sunflower Production",
      body: [
        "Sunflowers love Anderson heat and are a signature crop for the farm.",
        "Direct-sow in succession every two to three weeks from April through July for continuous blooms and cut flowers.",
        "For cut flowers, grow single-stem ProCut types planted close together; for seed and pollinators, grow branching and Mammoth types with more room.",
        "Sunflowers are heavy feeders and deep rooters — they handle the heat but still want consistent water while establishing.",
        "Leave a few heads to dry on the stalk for the chickens and for next year's seed.",
      ],
    },
    {
      title: "Giant Pumpkin Project Planning",
      body: [
        "The giant-pumpkin project is a family build, and it starts the season before with soil.",
        "Prepare a deep, rich patch in fall — heavy compost and aged chicken manure worked in, then cover-cropped over winter.",
        "Start Dill's Atlantic Giant seed indoors in April and transplant a single, well-spaced plant with plenty of room to run.",
        "Provide huge amounts of water and feed; a giant pumpkin can put on tens of pounds a day at peak and needs consistent moisture.",
        "Shade the developing fruit from direct afternoon sun to prevent splitting and sunscald, and protect the vine from our worst heat.",
        "Bury vine nodes to grow secondary roots, and pick one fruit per plant to put all that energy into a single giant.",
      ],
    },
  ],
};

// ─── All local guides ───────────────────────────────────────────────────────────

export const localGuides: LocalGuide[] = [
  shaggyInkFarmsGuide,
  andersonFlagship,

  // North valley floor — Zone 9b
  makeGuide(
    { slug: "redding", name: "Redding", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Redding sits at the north end of the Sacramento Valley and routinely posts some of the hottest summer temperatures in California. The growing strategy is the same as Anderson: get established in spring, manage heat and water hard in summer, and lean into a long, productive fall." },
    northValleyProfile,
  ),
  makeGuide(
    { slug: "red-bluff", name: "Red Bluff", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Red Bluff anchors the south end of this hot upper-valley pocket. Expect long triple-digit stretches, dry summers, and mild winters, with strong afternoon winds at times that dry beds out fast." },
    northValleyProfile,
    { irrigationNotes: ["Drip irrigation is essential through the dry summer", "Afternoon winds dry beds quickly — mulch heavily and check soil moisture often", "Water deeply two to three times a week rather than daily", "Run drip before dawn to limit evaporation"] },
  ),
  makeGuide(
    { slug: "cottonwood", name: "Cottonwood", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Cottonwood sits right between Anderson and Red Bluff on the valley floor and shares the same hot, dry summer pattern. Heat and water management are the whole game." },
    northValleyProfile,
  ),
  makeGuide(
    { slug: "corning", name: "Corning", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Corning is olive country at the south edge of the upper valley — proof of how well Mediterranean heat-lovers do here. Long hot summers and mild winters define the year." },
    northValleyProfile,
  ),
  makeGuide(
    { slug: "los-molinos", name: "Los Molinos", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Los Molinos sits on the Sacramento River south of Red Bluff with deep valley soils and the same hot, dry growing season as the rest of the upper valley." },
    northValleyProfile,
  ),
  makeGuide(
    { slug: "orland", name: "Orland", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Orland sits on the west side of the valley with a strong irrigation tradition. Hot dry summers and mild winters make it classic upper-valley growing ground." },
    northValleyProfile,
  ),
  makeGuide(
    { slug: "chico", name: "Chico", zone: "9b", closestRegion: "Northern Sacramento Valley", intro: "Chico sits on the east side of the valley at the foot of the foothills. It runs hot in summer like the rest of the valley floor, with slightly more reliable winter chill for fruit trees." },
    northValleyProfile,
  ),

  // Sierra foothills — Zone 8b–9a
  makeGuide(
    { slug: "palo-cedro", name: "Palo Cedro", zone: "9a", closestRegion: "Northern Sierra Foothills", intro: "Palo Cedro sits just east of Redding where the valley starts to climb. It runs a touch cooler than the valley floor and a little later into spring, but summers are still hot and dry." },
    foothillProfile,
  ),
  makeGuide(
    { slug: "bella-vista", name: "Bella Vista", zone: "9a", closestRegion: "Northern Sierra Foothills", intro: "Bella Vista climbs into the foothills east of Redding. Elevation takes a little edge off the summer heat and pushes the last frost slightly later than the valley." },
    foothillProfile,
  ),
  makeGuide(
    { slug: "shasta-lake", name: "Shasta Lake", zone: "9a", closestRegion: "Northern Sierra Foothills", intro: "Shasta Lake sits north of Redding in rolling foothill terrain. Hot dry summers, mild winters, and slightly later frosts than the valley floor shape the season." },
    foothillProfile,
  ),
  makeGuide(
    { slug: "oroville", name: "Oroville", zone: "9a", closestRegion: "Northern Sierra Foothills", intro: "Oroville sits where the Feather River leaves the foothills. Summers are hot, winters mild, and the foothill setting brings a bit more winter rain than the open valley." },
    foothillProfile,
  ),
  makeGuide(
    { slug: "paradise", name: "Paradise", zone: "8b", closestRegion: "Northern Sierra Foothills", intro: "Paradise sits on a foothill ridge above Chico at around 1,700 feet. Cooler nights, more winter rain, and later frosts than the valley make for a noticeably milder summer and a shorter warm-season window." },
    foothillProfile,
    {
      climateReality: [
        "Hot but milder summers than the valley floor thanks to ridge elevation",
        "Cooler nights help tomatoes and peppers set fruit later into summer",
        "More winter rain and a later last frost than Chico below",
        "Good air drainage on the ridge; cold pools in canyons",
        "Irrigation still essential in the dry summer",
      ],
      frostNotes: ["Last frost runs later than the valley — often well into April", "First fall frost can arrive in October", "Ridge tops drain cold air; protect tender crops on still, clear nights"],
    },
  ),
  makeGuide(
    { slug: "gridley", name: "Gridley", zone: "9a", closestRegion: "Sacramento Valley", intro: "Gridley sits in the valley between the foothills and the river, rice and orchard country. Hot summers and mild, sometimes foggy winters define the season." },
    foothillProfile,
  ),

  // Sacramento Valley — Zone 9b
  makeGuide(
    { slug: "sacramento", name: "Sacramento", zone: "9b", closestRegion: "Sacramento Valley", intro: "Sacramento sits at the heart of the valley where the rivers meet. Hot dry summers, mild winters, and weeks of tule fog shape a long growing year with an excellent fall season." },
    sacramentoValleyProfile,
  ),
  makeGuide(
    { slug: "davis", name: "Davis", zone: "9b", closestRegion: "Sacramento Valley", intro: "Davis sits just west of Sacramento on deep valley soils. Hot summers, mild winters, and tule fog make for classic Sacramento Valley growing, with a long and productive fall." },
    sacramentoValleyProfile,
  ),
  makeGuide(
    { slug: "woodland", name: "Woodland", zone: "9b", closestRegion: "Sacramento Valley", intro: "Woodland sits in rich farmland north of Davis. The pattern is hot dry summers, mild foggy winters, and a generous fall growing window." },
    sacramentoValleyProfile,
  ),
  makeGuide(
    { slug: "yuba-city", name: "Yuba City", zone: "9b", closestRegion: "Sacramento Valley", intro: "Yuba City sits on the Feather River in prime orchard country. Hot summers, mild winters, and winter fog define the season, with strong tree-fruit and warm-season vegetable growing." },
    sacramentoValleyProfile,
  ),
  makeGuide(
    { slug: "marysville", name: "Marysville", zone: "9b", closestRegion: "Sacramento Valley", intro: "Marysville sits across the river from Yuba City at the valley's edge. Hot dry summers and mild foggy winters make it solid valley growing ground." },
    sacramentoValleyProfile,
  ),

  // Southern Cascades / Intermountain — Zone 6b–7a
  makeGuide(
    { slug: "mount-shasta", name: "Mount Shasta", zone: "7a", closestRegion: "Southern Cascades", intro: "Mount Shasta sits high on the mountain's flank at around 3,600 feet. Short cool summers, cold snowy winters, and a late last frost make this real mountain gardening, where cool-season crops shine and warm-season crops need a head start." },
    mountainProfile,
  ),
  makeGuide(
    { slug: "weed", name: "Weed", zone: "7a", closestRegion: "Southern Cascades", intro: "Weed sits in the shadow of Mount Shasta with cold winters, a short summer, and famous wind. The season is brief, so start warm-season crops indoors and lean on cool-season vegetables." },
    mountainProfile,
    { thisWeeksTasks: ["Check the frost forecast before planting anything tender", "Shelter starts from the wind, which can shred and dry transplants", "Use row cover or cloches to warm soil and protect seedlings", "Thin direct-sown greens and roots", "Watch drainage in cold, wet spring soil", "Plan the fall harvest before first freeze"] },
  ),
  makeGuide(
    { slug: "yreka", name: "Yreka", zone: "7a", closestRegion: "Southern Cascades", intro: "Yreka sits in the Shasta Valley near the Oregon border. Cold winters and a short but real summer make for a classic intermountain garden: cool-season crops do well, and warm-season crops need protection and a head start." },
    mountainProfile,
  ),
  makeGuide(
    { slug: "burney", name: "Burney", zone: "6b", closestRegion: "Intermountain Plateau", intro: "Burney sits on the high volcanic plateau east of Redding at around 3,100 feet. Winters are cold and snowy, summers short, and frost can hit in almost any month — plan for a tight warm-season window." },
    mountainProfile,
  ),
  makeGuide(
    { slug: "susanville", name: "Susanville", zone: "6b", closestRegion: "Intermountain Plateau", intro: "Susanville sits high in the northeastern corner at around 4,200 feet, where the climate turns toward the Great Basin. Cold winters, a short summer, and big day-night swings make for demanding mountain gardening focused on cool-season and short-season crops." },
    mountainProfile,
  ),
];

export const flagshipSlug = "anderson";

export function getLocalGuide(slug: string): LocalGuide | undefined {
  return localGuides.find((g) => g.slug === slug);
}

export function getLocalSlugs(): string[] {
  return localGuides.map((g) => g.slug);
}
