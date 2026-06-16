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
        "The flock is a built-in fertility engine. Barred Rock manure is rich in nitrogen — too rich to use fresh.",
        "Compost coop bedding and manure for several months before it touches a planting bed. Fresh manure will burn plants and can carry pathogens.",
        "Layer high-nitrogen manure with carbon — straw bedding, dry leaves, spent garden plants — to keep the pile balanced and cooking.",
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
