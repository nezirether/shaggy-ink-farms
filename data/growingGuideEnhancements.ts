import type { GrowingGuide, GuideCategory, GuideContent } from './growingGuides';

type GuideEnhancement = Partial<Omit<GrowingGuide, 'slug' | 'status'>> & {
  status: 'published';
  category: GuideCategory;
  content: GuideContent;
};

const LAST_UPDATED = '2026-06-18';

const sources = {
  ucAnr: { title: 'UC Agriculture and Natural Resources', author: 'University of California', url: 'https://ucanr.edu/' },
  ucIpm: { title: 'UC Integrated Pest Management', author: 'University of California', url: 'https://ipm.ucanr.edu/' },
  ucMg: { title: 'UC Master Gardener Program', author: 'University of California', url: 'https://mg.ucanr.edu/' },
  nchfp: { title: 'National Center for Home Food Preservation', author: 'University of Georgia Extension', url: 'https://nchfp.uga.edu/' },
  johnnys: { title: "Johnny's Selected Seeds Grower's Library", author: "Johnny's Selected Seeds", url: 'https://www.johnnyseeds.com/growers-library/' },
  usda: { title: 'USDA Plant Hardiness Zone Map', author: 'United States Department of Agriculture', url: 'https://planthardiness.ars.usda.gov/' },
  extension: { title: 'University Extension Vegetable Gardening Publications', author: 'Cooperative Extension', url: 'https://extension.org/' },
};

function content(input: GuideContent): GuideContent {
  return input;
}

function publish(
  category: GuideCategory,
  readingTimeMinutes: number,
  guideContent: GuideContent,
  updates: Partial<Omit<GrowingGuide, 'slug' | 'content' | 'status' | 'category'>> = {},
): GuideEnhancement {
  return {
    ...updates,
    category,
    readingTimeMinutes,
    lastUpdated: LAST_UPDATED,
    status: 'published',
    content: guideContent,
  };
}

export const GUIDE_CONTENT_ENHANCEMENTS: Record<string, GuideEnhancement> = {
  'preserving-your-harvest': publish(
    'Food Preservation',
    13,
    content({
      introduction:
        'A good harvest is only useful if you can keep up with it. This guide walks through practical preserving choices for a home garden: freezing, dehydrating, fermenting, refrigerator storage, and safe canning when tested recipes exist.',
      whoThisIsFor:
        'Home gardeners, homesteads, and first-year market garden families who need a simple way to handle tomatoes, peppers, beans, herbs, fruit, squash, and extra greens without wasting food.',
      bestTime:
        'Plan storage before the harvest rush. Wash bins, freezer bags, jars, dehydrator trays, and labels before summer crops peak. For Northern California, that usually means getting ready in May and June, then preserving hard from July through October.',
      toolsAndSupplies: [
        'Clean harvest bins and towels',
        'Freezer bags or containers',
        'Dehydrator or low-temperature oven',
        'Canning jars, lids, rings, and a jar lifter',
        'Pressure canner for low-acid foods',
        'Labels with crop, method, and date',
      ],
      steps: [
        {
          title: 'Sort crops by the safest preserving method',
          body:
            'Freeze peppers, berries, sweet corn, green beans, chopped herbs, pesto, tomato sauce, and roasted summer vegetables. Dehydrate herbs, tomatoes, peppers, onions, fruit slices, and zucchini chips. Can only with tested recipes from USDA, NCHFP, university extension, or a current Ball-style tested source.',
        },
        {
          title: 'Handle low-acid foods with care',
          body:
            'Green beans, corn, carrots, squash, meat, and most mixed vegetables are low-acid foods. They require pressure canning if canned. A boiling-water bath is not enough. If you do not own a tested pressure canner and understand the process, freeze or dehydrate instead.',
        },
        {
          title: 'Preserve at peak quality',
          body:
            'Do not wait until produce is soft, sunburned, or half-spoiled. Preserve firm, clean produce the same day you harvest when possible. Trim blemishes generously, and compost anything moldy.',
        },
        {
          title: 'Use small batches',
          body:
            'A small, clean batch you finish is better than a giant counter pile that sits too long. Work in batches you can wash, cut, process, cool, label, and put away in one session.',
        },
        {
          title: 'Keep a harvest log',
          body:
            'Write down crop, variety, pounds or quarts, preserving method, recipe source, and whether your family actually ate it. That record improves next year garden planning more than memory does.',
        },
      ],
      commonMistakes: [
        { mistake: 'Canning from a random internet recipe.', fix: 'Use USDA, NCHFP, or university extension tested recipes. Do not change jar size, acid level, processing time, or pressure.' },
        { mistake: 'Trying to preserve everything the same way.', fix: 'Match the crop to the method. Freeze for easy meals, dry for herbs and snacks, can only where tested directions exist.' },
        { mistake: 'Letting harvests sit too long.', fix: 'Create a two-day rule: eat, share, freeze, dry, or process within 48 hours.' },
        { mistake: 'Forgetting labels.', fix: 'Label every package with crop, variety if useful, method, and date. Mystery bags do not help in February.' },
      ],
      northernCaliforniaNotes:
        'Hot inland summers can push harvests fast. Tomatoes, peppers, basil, cucumbers, beans, and summer squash can all arrive at once. Plan freezer and dehydrator space before July.',
      zone9Notes:
        'Zone 9 gardeners can get spring, summer, fall, and winter harvests. That means preserving is not only a late-summer job. Citrus, greens, herbs, brassicas, and root crops may need storage attention outside the classic summer rush.',
      wateringConsiderations:
        'Deep, even watering improves harvest quality before preserving. Drought-stressed cucumbers can turn bitter, tomatoes split after irregular watering, and greens get tough fast in heat.',
      heatConsiderations:
        'Bring produce out of the sun quickly. Field heat shortens shelf life. Harvest early, shade the bins, and cool produce before freezing or processing.',
      checklist: [
        'Choose preserving method by crop and food-safety risk',
        'Use tested canning recipes only',
        'Preserve clean, peak-quality produce',
        'Work in small batches',
        'Label everything',
        'Keep notes for next year planting amounts',
      ],
      relatedSlugs: ['family-garden-planner-guide', 'seed-starting-chart', 'crop-rotation'],
      sources: [sources.nchfp, sources.ucAnr, sources.ucMg],
    }),
    {
      title: 'Preserving Your Garden Harvest',
      shortTitle: 'Preserving Harvests',
      description:
        'A practical guide to freezing, drying, storing, fermenting, and safely canning garden produce without guessing on food safety.',
      keywords: ['preserving garden harvest', 'safe home canning', 'freezing garden vegetables', 'dehydrating herbs'],
    },
  ),

  'fertilizer-injector-guide': publish(
    'Soil & Fertility',
    11,
    content({
      introduction:
        'A fertilizer injector can save labor when a garden gets large enough, but it is not magic. It simply meters soluble fertilizer into irrigation water. Used carefully, it can keep crops fed through drip irrigation. Used carelessly, it can overfeed plants, clog lines, or waste money.',
      whoThisIsFor:
        'Gardeners running drip irrigation in larger home gardens, seedling areas, small cut-flower plots, or small market-garden trials who want to understand injectors before buying one.',
      bestTime:
        'Set up fertigation before heavy-feeding crops enter fast growth. In hot Northern California, test the system in spring before tomatoes, cucumbers, squash, corn, flowers, and melons are demanding water every day.',
      toolsAndSupplies: [
        'Drip system with filter and pressure regulator',
        'Fertilizer injector rated for your flow range',
        'Water-soluble fertilizer appropriate for the crop',
        'Measuring container and clean mixing bucket',
        'Backflow prevention device',
        'pH and EC meter if you are managing nutrients closely',
      ],
      steps: [
        { title: 'Start with soil and crop need', body: 'Do not use an injector to guess your way out of poor soil. Start with compost, soil testing when possible, and crop-specific needs. Heavy feeders may need regular light feeding; legumes and healthy soil may need little.' },
        { title: 'Match the injector to your water flow', body: 'Injectors have minimum and maximum flow rates. If your drip zone does not move enough water, the injector may not dose correctly. Measure gallons per minute before buying.' },
        { title: 'Protect the water supply', body: 'Use proper backflow prevention. Fertilizer solution should never be able to siphon into a household or well water system.' },
        { title: 'Mix weaker than you think at first', body: 'Start at a mild concentration, run it through a test zone, and watch plant response. More fertilizer is not always better, especially in heat.' },
        { title: 'Flush the lines', body: 'After feeding, run clean water long enough to clear fertilizer from the injector, mainline, and drip tape. This reduces clogging and salt buildup.' },
        { title: 'Keep records', body: 'Write down product, rate, crop, date, run time, and weather. If plants respond poorly, you need a record to troubleshoot.' },
      ],
      commonMistakes: [
        { mistake: 'Skipping backflow protection.', fix: 'Install the correct backflow prevention for your system before fertigation.' },
        { mistake: 'Feeding every watering.', fix: 'Use fertigation as a planned feeding, not a reflex. Water needs and nutrient needs are not always the same.' },
        { mistake: 'Ignoring salts.', fix: 'Flush lines and avoid heavy feeding during extreme heat when plants may be stressed.' },
        { mistake: 'Buying before measuring flow.', fix: 'Measure your zone flow and pressure, then choose an injector that fits.' },
      ],
      northernCaliforniaNotes:
        'In hot inland gardens, drip runs often get longer in summer. That does not mean crops need more fertilizer every time. Separate irrigation scheduling from nutrient scheduling.',
      zone9Notes:
        'Long seasons can create long nutrient demand, especially for tomatoes, peppers, cucumbers, basil, flowers, and strawberries. Light, steady feeding is usually safer than big corrections.',
      wateringConsiderations:
        'Fertigation only works if the irrigation system wets the root zone evenly. Fix leaks, clogged emitters, and dry spots before adding fertilizer.',
      heatConsiderations:
        'Avoid strong fertilizer applications during heat waves. Stressed plants can burn, wilt, or stop taking up nutrients well.',
      checklist: [
        'Measure drip zone flow',
        'Use filter, pressure regulator, and backflow prevention',
        'Start with mild rates',
        'Flush with clean water',
        'Keep feeding records',
        'Use soil tests where possible',
      ],
      relatedSlugs: ['nutrient-deficiency-guide', 'family-garden-planner-guide', 'warm-season-cover-crops'],
      sources: [sources.ucAnr, sources.extension, sources.johnnys],
    }),
    {
      keywords: ['fertilizer injector garden', 'fertigation drip irrigation', 'drip fertilizer setup', 'small farm fertigation'],
    },
  ),

  'family-garden-planner-guide': publish(
    'Planning & Layout',
    10,
    content({
      introduction:
        'A family food garden works best when it starts with meals, not seed packets. This guide helps you decide what to grow, how much space to give it, and how to use the Shaggy Ink Farms Garden Planner without overbuilding the first year.',
      whoThisIsFor:
        'Families, backyard gardeners, and homesteads who want more homegrown food without turning the garden into a second full-time job.',
      bestTime:
        'Plan winter through early spring for the main warm-season garden. In Zone 9, also plan fall crops in June and July so transplants are ready when the weather begins to turn.',
      toolsAndSupplies: [
        'List of meals your family actually eats',
        'Garden bed or row measurements',
        'Seed catalogs or saved seed inventory',
        'The Shaggy Ink Farms Garden Planner',
        'Notebook for harvest and planting records',
      ],
      steps: [
        { title: 'Start with the food your family eats', body: 'Write down the vegetables, herbs, fruit, and staple crops your household uses every week. Prioritize crops that save money, taste better fresh, or preserve well.' },
        { title: 'Pick a realistic garden size', body: 'A smaller garden that gets weeded and watered beats a huge plan that fails in July. Start with the beds or rows you can manage after work, chores, and family life.' },
        { title: 'Separate fresh eating from storage crops', body: 'Lettuce, cucumbers, herbs, tomatoes, and beans feed the table now. Garlic, potatoes, winter squash, dry beans, onions, and preserved tomatoes feed later. Plan both if you have space.' },
        { title: 'Use succession planting carefully', body: 'Stagger quick crops like beans, cucumbers, lettuce, cilantro, radishes, and summer squash. Do not succession-plant everything unless you know you can keep up with harvest.' },
        { title: 'Build the plan in the Garden Planner', body: 'Enter family size, zone, crop choices, safety margin, and successive plantings. Treat the output as a starting point, then adjust for your real space and water.' },
      ],
      commonMistakes: [
        { mistake: 'Growing too many novelty crops.', fix: 'Give most of the space to food you already cook, then trial a few new crops.' },
        { mistake: 'Planning only spring.', fix: 'In hot Zone 9 areas, fall can be just as valuable as spring.' },
        { mistake: 'Ignoring harvest labor.', fix: 'If a crop needs picking every day, decide who will do it before planting a long row.' },
        { mistake: 'Overestimating water.', fix: 'Plan around your actual irrigation capacity, not the garden you wish you had.' },
      ],
      northernCaliforniaNotes:
        'Inland Northern California gardens need irrigation planning early. Water, shade, and mulch often matter more than squeezing in one more crop.',
      zone9Notes:
        'Zone 9 gives you a long calendar, but summer heat narrows what is enjoyable to manage. Plan spring, heat-season, and fall as separate windows.',
      wateringConsiderations:
        'Group crops by water need. Melons, tomatoes, basil, and cucumbers do not belong on the same watering rhythm as established herbs or dry beans near harvest.',
      heatConsiderations:
        'Leave room in the plan for shade cloth, airflow, and paths. Crowding crops in a hot climate makes pests, disease, and harvest work harder.',
      checklist: [
        'List foods your family actually eats',
        'Measure beds or row feet',
        'Choose spring, summer, and fall crops',
        'Plan irrigation before planting',
        'Use the Garden Planner',
        'Save harvest notes for next year',
      ],
      relatedSlugs: ['crop-rotation', 'spring-garden-layout', 'seed-starting-chart'],
      sources: [sources.ucAnr, sources.ucMg, sources.extension],
    }),
    {
      title: 'Family Garden Planner Guide',
      description:
        'How to turn family meals, garden space, water, and planting windows into a practical food-garden plan.',
      keywords: ['family vegetable garden planner', 'how much to plant for a family', 'food security garden plan', 'zone 9 garden planner'],
    },
  ),

  'spring-garden-layout': publish(
    'Planning & Layout',
    9,
    content({
      introduction:
        'A spring garden layout should make watering, harvesting, crop rotation, and summer heat easier. This guide gives you a simple way to place crops before the beds get crowded.',
      whoThisIsFor:
        'Beginner and intermediate gardeners laying out raised beds, in-ground rows, or a small homestead garden for spring and early summer.',
      bestTime:
        'Sketch the layout 4 to 8 weeks before your main planting date. In warm Northern California valleys, that often means January or February for spring crops and March for warm-season transplants.',
      toolsAndSupplies: [
        'Bed or row measurements',
        'Sun and shade notes',
        'Crop list',
        'Seed starting calendar',
        'Irrigation plan',
        'Stakes, labels, or row markers',
      ],
      steps: [
        { title: 'Map sun and water first', body: 'Place heat-loving crops where they get full sun and steady irrigation. Use partial shade edges for lettuce, herbs, chard, or nursery trays.' },
        { title: 'Group by plant family', body: 'Keep tomatoes, peppers, eggplant, and potatoes together when possible; brassicas together; cucurbits together; legumes together. That makes rotation easier next season.' },
        { title: 'Put tall crops where they will not shade short crops', body: 'Corn, trellised beans, tomatoes, cucumbers, and sunflowers can cast heavy shade. Use that intentionally, not accidentally.' },
        { title: 'Leave work paths', body: 'You need space to harvest, weed, add compost, repair drip, and pull a wheelbarrow through. A beautiful layout that cannot be worked will fail.' },
        { title: 'Plan for summer replacements', body: 'Spring peas, lettuce, radishes, and cilantro will finish early. Decide what follows them before the space opens.' },
      ],
      commonMistakes: [
        { mistake: 'Planting by packet order.', fix: 'Plant by crop family, height, water need, and harvest rhythm.' },
        { mistake: 'Forgetting paths.', fix: 'Give yourself enough working room before plants reach full size.' },
        { mistake: 'Mixing drip needs.', fix: 'Put crops with similar watering needs on the same zone when possible.' },
        { mistake: 'No follow-up crop.', fix: 'Mark early spring crops as temporary and plan what replaces them.' },
      ],
      northernCaliforniaNotes:
        'Spring can move fast in the Sacramento Valley. Cool-season crops may bolt quickly once heat arrives, so a layout should already have a second act.',
      zone9Notes:
        'Zone 9 gardeners can use spring beds twice: first for cool-season crops, then for heat crops, then sometimes again for fall.',
      wateringConsiderations:
        'Run drip lines where full-size plants will be, not just where seedlings are. Small spring plants hide future spacing problems.',
      heatConsiderations:
        'Plan airflow and shade. A tight, humid tomato wall is more likely to have pest and disease trouble than a layout with access and air.',
      checklist: [
        'Map sun, shade, wind, and irrigation',
        'Group plant families',
        'Place tall crops carefully',
        'Leave real paths',
        'Plan succession spaces',
        'Record the layout for rotation',
      ],
      relatedSlugs: ['crop-rotation', 'family-garden-planner-guide', 'companion-planting'],
      sources: [sources.ucAnr, sources.ucMg, sources.johnnys],
    }),
  ),

  'low-sunlight-vegetables': publish(
    'Heat & Climate',
    8,
    content({
      introduction:
        'Most fruiting vegetables need full sun, but a shaded yard can still grow useful food. The key is choosing leaf, root, and herb crops that tolerate less light and adjusting expectations.',
      whoThisIsFor:
        'Gardeners with trees, fences, porches, winter shade, small yards, or hot-climate beds that only get morning sun.',
      bestTime:
        'Use low-light spaces for cool-season crops in fall, winter, and spring. In hot Northern California summers, afternoon shade can help lettuce, chard, parsley, cilantro, mint, and green onions last longer.',
      toolsAndSupplies: [
        'Sun tracker notes or a simple hourly observation',
        'Compost',
        'Containers or raised beds if tree roots compete',
        'Leafy green, herb, and root crop seed',
        'Drip or hand-watering plan',
      ],
      steps: [
        { title: 'Count actual sun hours', body: 'Watch the spot every couple of hours for one day. Full sun is usually 6 or more direct hours. Partial sun is 4 to 6. Bright shade is less, but still useful for some crops.' },
        { title: 'Choose crops for leaves and roots', body: 'Try lettuce, spinach, chard, kale, arugula, parsley, cilantro, mint, green onions, radishes, beets for greens, and baby carrots. Do not expect heavy tomato, pepper, melon, or corn production.' },
        { title: 'Improve soil without overfeeding', body: 'Shade slows growth. Compost helps, but extra nitrogen will not replace missing light.' },
        { title: 'Use containers under tree shade', body: 'Tree roots can steal water and nutrients. Containers or lined raised beds make shade gardening easier near established trees.' },
        { title: 'Harvest young', body: 'Low-light crops often taste best as baby leaves, bunching onions, or small roots rather than full-size storage crops.' },
      ],
      commonMistakes: [
        { mistake: 'Trying to grow heat crops in deep shade.', fix: 'Save tomatoes, peppers, melons, okra, and corn for the sunniest spaces.' },
        { mistake: 'Calling dappled shade full sun.', fix: 'Measure direct sun hours, not brightness.' },
        { mistake: 'Overwatering cool shaded soil.', fix: 'Check moisture before watering. Shade dries slower than full sun.' },
        { mistake: 'Ignoring tree competition.', fix: 'Use containers or raised beds where roots are thick.' },
      ],
      northernCaliforniaNotes:
        'In Anderson, Redding, Red Bluff, Chico, and Sacramento, afternoon shade can be an asset for greens during heat. Morning sun plus afternoon shade is often better than all-day exposure for tender leaves.',
      zone9Notes:
        'Winter sun angles can make shady spots even darker. A bed that works in summer shade may not produce much in December.',
      wateringConsiderations:
        'Shade reduces evaporation, but tree roots can dry soil fast. Check the actual root zone before assuming the bed is wet or dry.',
      heatConsiderations:
        'Afternoon shade is useful during triple-digit spells. It will not make cool-season crops happy in extreme heat, but it can buy time.',
      checklist: [
        'Measure direct sun hours',
        'Grow leaves, herbs, and small roots',
        'Avoid fruiting crops in deep shade',
        'Watch tree-root competition',
        'Harvest young',
        'Use afternoon shade during heat',
      ],
      relatedSlugs: ['seed-starting-instructions', 'spring-garden-layout', 'family-garden-planner-guide'],
      sources: [sources.ucMg, sources.extension, sources.johnnys],
    }),
  ),

  'pest-control-comparison': publish(
    'Pest, Disease & Weeds',
    12,
    content({
      introduction:
        'Pest control should start with identification, prevention, and tolerance. This guide compares cultural controls, barriers, beneficial insects, hand removal, traps, soaps, oils, biologicals, and conventional products without pretending one method fits every problem.',
      whoThisIsFor:
        'Gardeners who want to protect vegetables and flowers while using the least disruptive method that actually matches the pest.',
      bestTime:
        'Before pests peak. Scout weekly from transplanting through harvest. In hot Northern California gardens, aphids, mites, squash bugs, cucumber beetles, hornworms, and leaf-footed bugs can build quickly.',
      toolsAndSupplies: [
        'Hand lens or phone camera',
        'Notebook for scouting',
        'Floating row cover or insect netting',
        'Gloves and bucket for hand removal',
        'UC IPM pest pages',
        'Any pesticide label before use',
      ],
      steps: [
        { title: 'Identify the pest first', body: 'Do not spray because a plant looks bad. Find the insect, mite, disease sign, or damage pattern. UC IPM photos and local Master Gardener help are better than guessing.' },
        { title: 'Decide whether action is needed', body: 'A few chewed leaves are not a crisis. Young seedlings, fruiting crops, and fast-spreading pests deserve quicker action than mature plants with light damage.' },
        { title: 'Use cultural controls', body: 'Rotate crops, remove crop debris, manage weeds, plant at the right time, keep plants watered, and avoid overfertilizing with nitrogen.' },
        { title: 'Use physical controls early', body: 'Row cover, collars, netting, hand-picking, pruning out damaged leaves, and removing egg masses often solve small problems without sprays.' },
        { title: 'Choose least-toxic products only when needed', body: 'Soaps, oils, Bt, spinosad, sulfur, copper, and other products each have specific targets and risks. Read the label and UC IPM guidance before using any product.' },
        { title: 'Protect pollinators and yourself', body: 'Avoid spraying open flowers, follow PPE, reentry intervals, preharvest intervals, and local rules. The label is the law.' },
      ],
      commonMistakes: [
        { mistake: 'Spraying before identifying the pest.', fix: 'Scout, photograph, compare with UC IPM, then choose a control.' },
        { mistake: 'Using broad-spectrum products first.', fix: 'Start with prevention and targeted least-toxic options when possible.' },
        { mistake: 'Spraying flowers during pollinator activity.', fix: 'Avoid treating blooms and follow label restrictions.' },
        { mistake: 'Thinking organic means harmless.', fix: 'Organic products can still harm beneficial insects or plants if misused.' },
      ],
      northernCaliforniaNotes:
        'Hot, dusty conditions favor spider mites. Water stress makes pest pressure worse. Keep paths managed, reduce dust where possible, and avoid creating weak plants with irregular irrigation.',
      zone9Notes:
        'Long seasons mean pest generations can overlap. Clean up finished crops quickly and rotate families to reduce carryover.',
      wateringConsiderations:
        'Healthy, evenly watered plants tolerate pests better. Overhead water may reduce dust but can encourage disease if used late in the day.',
      heatConsiderations:
        'Many soaps, oils, and sulfur products can damage plants in hot weather. Check labels for temperature limits before use.',
      checklist: [
        'Identify pest or disease first',
        'Check whether damage is serious',
        'Use rotation, sanitation, and timing',
        'Try barriers or hand removal early',
        'Read UC IPM and the product label',
        'Protect pollinators, harvest safety, and yourself',
      ],
      relatedSlugs: ['common-plant-diseases', 'crop-rotation', 'tomato-pepper-spray-program'],
      sources: [sources.ucIpm, sources.ucAnr, sources.ucMg],
    }),
    {
      title: 'Pest Control Comparison Guide',
      description:
        'An IPM-first comparison of pest control options for vegetable gardens, from prevention and barriers to least-toxic products.',
    },
  ),

  'warm-season-cover-crops': publish(
    'Soil & Fertility',
    9,
    content({
      introduction:
        'Warm-season cover crops protect soil when beds would otherwise bake. They can add biomass, feed soil life, compete with weeds, and hold ground through summer gaps.',
      whoThisIsFor:
        'Gardeners and small growers with empty summer beds, future fall planting areas, or soil that needs shade and organic matter.',
      bestTime:
        'Plant after soil is warm and frost risk is gone. In inland Northern California, that usually means late spring through midsummer if irrigation is available.',
      toolsAndSupplies: [
        'Cowpea, buckwheat, millet, sorghum-sudangrass, sunn hemp, or summer cover crop mix',
        'Rake or broadfork',
        'Irrigation',
        'Mower, string trimmer, sickle, or shears',
        'Compost if soil is very poor',
      ],
      steps: [
        { title: 'Pick the cover crop for the job', body: 'Use buckwheat for quick weed cover and pollinator flowers. Use cowpeas for heat and nitrogen fixation. Use millet or sorghum-sudangrass for biomass. Use mixes when you want several benefits.' },
        { title: 'Prepare a clean seedbed', body: 'Remove large weeds, rake the bed, and water before sowing if soil is dry. Good seed-soil contact matters.' },
        { title: 'Sow thick enough to shade soil', body: 'Cover crops work by closing canopy quickly. Thin, patchy stands do not suppress weeds well.' },
        { title: 'Irrigate until established', body: 'Warm-season covers still need water in hot valleys. Once rooted, some tolerate heat better, but dry seedbeds fail.' },
        { title: 'Terminate before seed set', body: 'Cut or mow before the cover crop makes mature seed. Let residue mulch the bed or incorporate lightly if the next crop allows time.' },
      ],
      commonMistakes: [
        { mistake: 'Planting without irrigation.', fix: 'In dry Northern California summers, plan water or wait for the right season.' },
        { mistake: 'Letting cover crops go to seed.', fix: 'Cut at flowering or earlier, especially buckwheat.' },
        { mistake: 'Choosing a huge biomass crop for a tiny bed.', fix: 'Match termination tools to the crop. Sorghum-sudangrass can be a lot of material.' },
        { mistake: 'Planting too close to the next crop.', fix: 'Allow time for residue to break down before direct seeding small seeds.' },
      ],
      northernCaliforniaNotes:
        'Summer cover crops can be valuable, but only where water is available. In drought-sensitive areas, a mulch or tarp may be more practical for idle beds.',
      zone9Notes:
        'Long warm seasons make it possible to grow a quick cover crop between spring crops and fall planting.',
      wateringConsiderations:
        'Water deeply to establish roots, then reduce if the cover crop is only holding soil. Do not steal water from food crops that matter more.',
      heatConsiderations:
        'Buckwheat can struggle in severe heat. Cowpeas and sorghum-sudangrass handle heat better once established.',
      checklist: [
        'Choose crop by purpose',
        'Prepare clean seedbed',
        'Sow thickly',
        'Water to establish',
        'Cut before seed set',
        'Allow breakdown before planting small seeds',
      ],
      relatedSlugs: ['cool-season-cover-crops', 'crop-rotation', 'spring-garden-layout'],
      sources: [sources.ucAnr, sources.johnnys, sources.extension],
    }),
  ),

  'cool-season-cover-crops': publish(
    'Soil & Fertility',
    9,
    content({
      introduction:
        'Cool-season cover crops keep winter soil covered, add roots and organic matter, and help prepare beds for spring. They are especially useful after summer crops are removed.',
      whoThisIsFor:
        'Gardeners with fallow winter beds, future tomato or flower rows, small orchards, and family gardens that need better soil structure.',
      bestTime:
        'Sow in fall after summer crops finish and before cold, wet weather slows germination. In Zone 9 areas, October and November are often useful windows.',
      toolsAndSupplies: [
        'Cereal rye, oats, barley, vetch, peas, fava beans, clover, or a cool-season mix',
        'Rake',
        'Irrigation if fall rain is late',
        'Mower, shears, or crimping/termination plan',
        'Compost if soil crusts badly',
      ],
      steps: [
        { title: 'Choose grass, legume, or mix', body: 'Grasses add roots and biomass. Legumes can fix nitrogen when inoculated and grown well. Mixes balance soil cover and fertility.' },
        { title: 'Remove crop debris and weeds', body: 'Start clean so the cover crop wins. Diseased tomato, squash, or brassica debris should not be left to carry problems forward.' },
        { title: 'Sow before soil gets cold', body: 'Even in mild climates, short days slow growth. Earlier fall planting gives stronger roots before winter.' },
        { title: 'Terminate early enough for spring planting', body: 'Cut covers several weeks before planting if you plan to direct seed. Thick residues can tie up nitrogen or keep soil too cool.' },
        { title: 'Use covers in rotation', body: 'Follow heavy feeders with legumes or mixed covers. Use grasses where soil needs structure and erosion protection.' },
      ],
      commonMistakes: [
        { mistake: 'Waiting until midwinter to sow.', fix: 'Plant in fall while soil is still warm enough for quick growth.' },
        { mistake: 'No termination plan.', fix: 'Know how you will cut, mow, or incorporate the crop before it gets tall.' },
        { mistake: 'Planting a cover before a tiny-seeded crop without enough breakdown time.', fix: 'Terminate earlier or transplant into residue.' },
        { mistake: 'Assuming legumes always add nitrogen.', fix: 'They need the right inoculation, growth time, and termination timing.' },
      ],
      northernCaliforniaNotes:
        'Fall rain can be late. A light irrigation after sowing may be the difference between a stand and bare soil.',
      zone9Notes:
        'Mild winters allow meaningful growth, but spring warms quickly. Terminate early enough to avoid delaying tomatoes, peppers, cucumbers, and flowers.',
      wateringConsiderations:
        'Once winter rains begin, covers may need little irrigation. In dry falls, keep the seedbed damp until germination.',
      heatConsiderations:
        'Do not let cool-season covers occupy beds too late into spring heat if you need warm-season crops planted on time.',
      checklist: [
        'Choose grass, legume, or mix',
        'Sow in fall',
        'Water if rains are late',
        'Terminate before seed set',
        'Allow breakdown time',
        'Record where covers grew for rotation',
      ],
      relatedSlugs: ['warm-season-cover-crops', 'crop-rotation', 'family-garden-planner-guide'],
      sources: [sources.ucAnr, sources.johnnys, sources.extension],
    }),
  ),

  'tomato-pepper-spray-program': publish(
    'Pest, Disease & Weeds',
    12,
    content({
      introduction:
        'This is not a fixed spray calendar. Tomatoes and peppers need observation, prevention, and targeted action only when a real pest or disease is present. The best program is an IPM routine you can repeat every week.',
      whoThisIsFor:
        'Gardeners growing tomatoes and peppers in hot climates who see hornworms, aphids, mites, blossom-end rot, sunscald, leaf spots, or fruit problems and want a safer decision path.',
      bestTime:
        'Start scouting when transplants go outside. Continue through harvest, especially during heat waves, after overhead irrigation, or when plants become crowded.',
      toolsAndSupplies: [
        'UC IPM tomato and pepper problem references',
        'Pruners',
        'Mulch and drip irrigation',
        'Cages or trellis',
        'Hand lens',
        'Any product label before use',
      ],
      steps: [
        { title: 'Prevent the common problems first', body: 'Use rotation, mulch, drip irrigation, airflow, resistant varieties when available, and steady watering. Many tomato and pepper problems start with stress, crowding, or splash.' },
        { title: 'Scout leaves, stems, flowers, and fruit', body: 'Look under leaves for aphids, mites, eggs, caterpillars, and disease spots. Check fruit for sunscald, cracking, rot, and chewing.' },
        { title: 'Separate pests from stress problems', body: 'Blossom-end rot is usually linked to calcium movement and irregular watering, not a bug. Sunscald is exposure. Blossom drop often follows heat. Sprays do not fix those.' },
        { title: 'Use non-spray controls when possible', body: 'Prune lightly for airflow, remove diseased leaves, handpick hornworms, support plants, mulch soil, and reduce dust.' },
        { title: 'Use products only for matched targets', body: 'Bt targets caterpillars, soaps and oils can target soft-bodied insects, and fungicides are preventative rather than curative. Always follow UC IPM and the label.' },
        { title: 'Respect harvest safety', body: 'Follow preharvest intervals, reentry intervals, temperature limits, and pollinator precautions. The label is the law.' },
      ],
      commonMistakes: [
        { mistake: 'Using a calendar spray no matter what.', fix: 'Scout first. Treat only a real problem with a matched tool.' },
        { mistake: 'Trying to spray away heat stress.', fix: 'Use shade, mulch, timing, and water management for heat-related problems.' },
        { mistake: 'Crowding plants.', fix: 'Space and support tomatoes and peppers so leaves dry and harvest is easy.' },
        { mistake: 'Ignoring label temperature limits.', fix: 'Many products can burn plants in hot weather. Read before applying.' },
      ],
      northernCaliforniaNotes:
        'During Sacramento Valley heat, tomatoes and peppers may pause fruit set. That is normal when temperatures are too high. Keep plants alive and healthy for the late-summer rebound.',
      zone9Notes:
        'Early planting plus fall production can work better than trying to force fruit set through the hottest weeks.',
      wateringConsiderations:
        'Steady drip irrigation reduces cracking, blossom-end rot risk, and drought stress. Avoid wetting foliage late in the day.',
      heatConsiderations:
        'Avoid oils, soaps, sulfur, and many sprays during high heat unless the label clearly allows it.',
      checklist: [
        'Rotate tomato and pepper beds',
        'Use mulch and drip',
        'Scout weekly',
        'Identify before treating',
        'Use UC IPM and labels',
        'Do not treat heat stress as a pest',
      ],
      relatedSlugs: ['growing-tomatoes-northern-california', 'pest-control-comparison', 'common-plant-diseases'],
      sources: [sources.ucIpm, sources.ucAnr, sources.ucMg],
    }),
    {
      title: 'Tomato & Pepper Spray Program',
      description:
        'An IPM-first tomato and pepper problem guide focused on prevention, scouting, and safe targeted action instead of a fixed spray calendar.',
    },
  ),

  'fruit-tree-spray-program': publish(
    'Orchard & Perennials',
    12,
    content({
      introduction:
        'Backyard fruit trees do not need a blind spray schedule. They need good variety choice, pruning, sanitation, pest identification, and careful timing when UC IPM shows a treatment is justified.',
      whoThisIsFor:
        'Home orchard growers with apples, stone fruit, citrus, figs, plums, or mixed backyard trees who want practical care without overclaiming or overspraying.',
      bestTime:
        'Plan during dormancy. Prune, clean up, and review pest history in winter. Scout from bloom through harvest, and use local extension or UC IPM timing for any treatment.',
      toolsAndSupplies: [
        'Pruners and loppers',
        'Tree labels and records',
        'Sanitation bucket or tarp',
        'UC IPM fruit tree pages',
        'Dormant oil or other product only if label and UC IPM match the pest',
        'Protective equipment listed on the label',
      ],
      steps: [
        { title: 'Know the tree and the problem history', body: 'A peach leaf curl issue is not the same as codling moth, scale, aphids, fire blight, citrus leafminer, or sunburn. Write down what happened last season.' },
        { title: 'Prune for structure and airflow', body: 'Good pruning improves light, airflow, harvest access, and spray coverage if a product is ever needed. Avoid removing too much at once.' },
        { title: 'Use sanitation', body: 'Remove mummified fruit, diseased twigs, fallen fruit, and pest-harboring debris. Sanitation is often the least expensive orchard pest control.' },
        { title: 'Time any treatment to the pest', body: 'Fruit tree products are highly timing-specific. Dormant, delayed dormant, bloom, petal fall, and summer timings mean different things. Use UC IPM and the label.' },
        { title: 'Avoid treating during bloom unless the label and situation allow it', body: 'Pollinators matter. Many products should not be applied to blooming trees or while bees are active.' },
        { title: 'Keep records by tree', body: 'Record bloom, pest signs, fruit damage, pruning, harvest, and any treatments. Orchard decisions improve slowly over years.' },
      ],
      commonMistakes: [
        { mistake: 'Using one spray schedule for every tree.', fix: 'Match the crop, pest, season, and local guidance.' },
        { mistake: 'Spraying after damage is already done.', fix: 'Many orchard treatments are preventative or timing-based. Learn the pest life cycle first.' },
        { mistake: 'Ignoring sanitation.', fix: 'Remove mummies, fallen fruit, and infected material before reaching for products.' },
        { mistake: 'Overclaiming organic safety.', fix: 'Organic orchard products can still harm bees, leaves, or fruit when misused.' },
      ],
      northernCaliforniaNotes:
        'Hot summers add sunburn and water stress to pest pressure. Young trees need trunk protection, mulch, and deep irrigation more than complicated spray routines.',
      zone9Notes:
        'Low chill and mild winters affect variety choice. Choose fruit trees suited to your chill hours and heat, not only your USDA zone.',
      wateringConsiderations:
        'Deep, infrequent watering helps young trees establish. Keep mulch away from trunks and avoid constant shallow watering.',
      heatConsiderations:
        'Avoid spraying during hot conditions unless the label allows it. Protect young trunks and exposed limbs from sunburn.',
      checklist: [
        'Identify tree and pest',
        'Prune for structure and airflow',
        'Clean up fallen fruit and mummies',
        'Use UC IPM timing',
        'Protect pollinators',
        'Keep records by tree',
      ],
      relatedSlugs: ['pest-control-comparison', 'common-plant-diseases', 'nutrient-deficiency-guide'],
      sources: [sources.ucIpm, sources.ucAnr, sources.ucMg],
    }),
    {
      description:
        'A safe, UC IPM-style backyard fruit tree care guide for pruning, sanitation, scouting, and careful pest decisions.',
    },
  ),

  'sweet-corn-beans-spray-program': publish(
    'Pest, Disease & Weeds',
    9,
    content({
      introduction:
        'Sweet corn and beans are better managed with timing, variety choice, scouting, and sanitation than a generic spray calendar. This guide focuses on practical IPM for earworms, beetles, aphids, mites, rust, and heat stress.',
      whoThisIsFor:
        'Gardeners planting small blocks of sweet corn, pole beans, bush beans, dry beans, or succession beans in home and homestead gardens.',
      bestTime:
        'Start before planting by choosing timing and spacing. Scout weekly once corn tassels and silks, and once beans begin flowering and setting pods.',
      toolsAndSupplies: [
        'Crop rotation notes',
        'Corn or bean varieties suited to your season',
        'Drip irrigation',
        'Hand lens',
        'UC IPM references',
        'Any label for any product considered',
      ],
      steps: [
        { title: 'Plant at the right time', body: 'Corn and beans need warm soil. Stressed seedlings are more vulnerable. In hot-summer areas, avoid planting cool-season timing by mistake.' },
        { title: 'Use enough spacing and airflow', body: 'Beans need airflow to reduce disease. Corn needs block planting for pollination, but dense, weedy blocks make scouting harder.' },
        { title: 'Scout at key stages', body: 'Check corn silks for earworm pressure and bean leaves for mites, aphids, beetles, and disease spots. Early detection matters.' },
        { title: 'Use sanitation and rotation', body: 'Remove spent bean vines and corn residue after harvest. Rotate legumes and grasses if space allows.' },
        { title: 'Use targeted controls only when needed', body: 'If damage is serious, match the control to the pest and follow UC IPM plus the product label. Do not treat without identification.' },
      ],
      commonMistakes: [
        { mistake: 'Planting a tiny corn patch in one long row.', fix: 'Plant corn in blocks for better pollination.' },
        { mistake: 'Letting beans dry out in bloom.', fix: 'Maintain even water during flowering and pod set.' },
        { mistake: 'Spraying without scouting.', fix: 'Check pest levels first and use a matched control only if needed.' },
        { mistake: 'Leaving diseased vines in the bed.', fix: 'Remove and dispose of problem debris after harvest.' },
      ],
      northernCaliforniaNotes:
        'Beans can produce well in heat with steady water, but extreme heat can reduce flower set. Corn needs strong irrigation during tasseling and ear fill.',
      zone9Notes:
        'Succession plantings can work, but late summer plantings need enough time to finish before cool weather and shortening days slow growth.',
      wateringConsiderations:
        'Corn is a heavy water user. Beans need even moisture, especially during flowering. Drip plus mulch helps keep both steady.',
      heatConsiderations:
        'Avoid oil or soap sprays during high heat unless labels permit. Heat stress can look like pest damage, so inspect carefully.',
      checklist: [
        'Plant warm soil crops after soil warms',
        'Block plant corn',
        'Keep beans evenly watered',
        'Scout silks, leaves, and pods',
        'Rotate and clean up residue',
        'Use UC IPM before any product',
      ],
      relatedSlugs: ['pest-control-comparison', 'crop-rotation', 'warm-season-cover-crops'],
      sources: [sources.ucIpm, sources.ucAnr, sources.johnnys],
    }),
    {
      description:
        'An IPM-first sweet corn and bean guide focused on timing, scouting, water, and safe targeted controls.',
    },
  ),

  'nutrient-deficiency-guide': publish(
    'Soil & Fertility',
    11,
    content({
      introduction:
        'Yellow leaves do not always mean a nutrient deficiency. Water stress, heat, root damage, disease, herbicide drift, and normal aging can look similar. This guide helps you slow down and diagnose before adding fertilizer.',
      whoThisIsFor:
        'Gardeners seeing yellowing, purple leaves, poor growth, blossom-end rot, weak transplants, or confusing leaf symptoms in vegetables and flowers.',
      bestTime:
        'Diagnose while plants are actively growing. For long-term fixes, test soil before the season or after harvest so amendments have time to work.',
      toolsAndSupplies: [
        'Soil test from a reputable lab when possible',
        'Plant photos over time',
        'Notebook',
        'pH test or soil report',
        'Compost',
        'Balanced fertilizer only after diagnosis',
      ],
      steps: [
        { title: 'Check water and roots first', body: 'Overwatering, underwatering, compacted soil, damaged roots, and heat can all cause nutrient-like symptoms. Dig gently and inspect moisture and roots.' },
        { title: 'Notice where symptoms appear', body: 'Older leaves yellowing may point to mobile nutrients like nitrogen or magnesium. New growth problems may involve iron, sulfur, calcium movement, pH, or root trouble.' },
        { title: 'Check the whole pattern', body: 'One plant may have root damage. A whole bed may have pH, irrigation, fertility, or disease trouble. Patterns matter.' },
        { title: 'Use soil tests for big corrections', body: 'Do not guess on lime, sulfur, phosphorus, or micronutrients. Soil pH affects availability, and over-application can cause new problems.' },
        { title: 'Correct gently', body: 'Use compost, appropriate fertilizer, improved irrigation, and mulch. Recheck response over 1 to 2 weeks instead of piling on more inputs.' },
      ],
      commonMistakes: [
        { mistake: 'Adding nitrogen to every yellow plant.', fix: 'Check water, roots, age of leaves, and disease signs first.' },
        { mistake: 'Confusing blossom-end rot with missing calcium in soil.', fix: 'Improve even watering and root health. Calcium movement is often the issue.' },
        { mistake: 'Ignoring pH.', fix: 'Nutrients can be present but unavailable when pH is off.' },
        { mistake: 'Overcorrecting with micronutrients.', fix: 'Use soil or tissue testing for serious corrections.' },
      ],
      northernCaliforniaNotes:
        'Heat and irrigation problems are common causes of deficiency-looking symptoms in inland gardens. Diagnose water and roots before fertilizing.',
      zone9Notes:
        'Long seasons can deplete container mixes and high-production beds. Light, regular feeding may be needed, but soil building still comes first.',
      wateringConsiderations:
        'Nutrients move with water. Uneven watering can cause deficiency symptoms even when fertility is adequate.',
      heatConsiderations:
        'Heat-stressed roots do not take up nutrients well. Fertilizing during severe stress can make problems worse.',
      checklist: [
        'Check water and roots',
        'Identify old-leaf vs new-growth symptoms',
        'Look for bed-wide patterns',
        'Use soil tests for major corrections',
        'Correct gently',
        'Track plant response',
      ],
      relatedSlugs: ['fertilizer-injector-guide', 'common-plant-diseases', 'crop-rotation'],
      sources: [sources.ucAnr, sources.ucMg, sources.extension],
    }),
  ),

  'squash-variety-guide': publish(
    'Crop-Specific',
    10,
    content({
      introduction:
        'Squash can be easy, wildly productive, or a sprawling headache. The right type depends on your space, heat, pest pressure, storage goals, and how your family actually cooks.',
      whoThisIsFor:
        'Gardeners choosing between zucchini, yellow squash, pattypan, winter squash, pumpkins, butternut, delicata, and storage squash.',
      bestTime:
        'Direct sow or transplant after soil is warm. In hot Northern California, spring and early summer plantings are common, with fall timing depending on days to maturity.',
      toolsAndSupplies: [
        'Seed packets with days to maturity',
        'Compost',
        'Drip irrigation',
        'Mulch',
        'Trellis for selected small-fruited types',
        'Harvest knife or pruners',
      ],
      steps: [
        { title: 'Choose summer or winter squash first', body: 'Summer squash is harvested young and keeps producing. Winter squash matures on the vine and stores. They behave differently in space, harvest, and kitchen use.' },
        { title: 'Match habit to space', body: 'Bush zucchini fits small gardens. Vining winter squash needs room or a strong trellis. Compact varieties help where paths are tight.' },
        { title: 'Plant for airflow', body: 'Squash leaves get large. Good spacing reduces mildew pressure and makes it easier to inspect stems and harvest.' },
        { title: 'Harvest often', body: 'Pick summer squash small and frequent. Oversized fruits slow production and get seedy. Let winter squash mature fully before curing.' },
        { title: 'Plan for pest pressure', body: 'Cucumber beetles, squash bugs, vine borers in some regions, and powdery mildew can all matter. Healthy plants, timing, row cover before bloom, and cleanup help.' },
      ],
      commonMistakes: [
        { mistake: 'Planting too many zucchini plants.', fix: 'One or two healthy plants can feed a family. Plant more only if you preserve or share.' },
        { mistake: 'Underestimating vines.', fix: 'Read the packet and give winter squash real space.' },
        { mistake: 'Harvesting winter squash too early.', fix: 'Wait for mature color, hard rind, and proper curing.' },
        { mistake: 'Ignoring powdery mildew until leaves collapse.', fix: 'Use airflow, watering at soil level, and resistant varieties where possible.' },
      ],
      northernCaliforniaNotes:
        'Squash handles heat better than many crops if watered deeply. Powdery mildew often arrives later in the season as plants age and nights shift.',
      zone9Notes:
        'Long seasons allow succession summer squash, but pest and disease buildup may make a fresh planting better than nursing tired plants.',
      wateringConsiderations:
        'Large leaves need steady water. Drip under mulch keeps soil moisture more even and leaves drier.',
      heatConsiderations:
        'Fruit can sunscald if leaves are removed heavily. Prune only what is needed for access and disease management.',
      checklist: [
        'Pick summer or winter type',
        'Match bush or vine habit to space',
        'Use warm soil',
        'Water deeply',
        'Harvest summer squash young',
        'Cure winter squash before storage',
      ],
      relatedSlugs: ['crop-rotation', 'common-plant-diseases', 'pest-control-comparison'],
      sources: [sources.ucAnr, sources.johnnys, sources.extension],
    }),
  ),

  'common-plant-diseases': publish(
    'Pest, Disease & Weeds',
    13,
    content({
      introduction:
        'Plant disease management starts before a leaf spot appears. Resistant varieties, spacing, watering, sanitation, and rotation do more for a family garden than panic spraying after plants are already failing.',
      whoThisIsFor:
        'Gardeners dealing with damping off, powdery mildew, early blight, bacterial spots, root rots, mosaic symptoms, wilt, and other common vegetable disease problems.',
      bestTime:
        'Begin prevention at seed starting and planting. Scout weekly once crops are growing, especially after rain, overhead watering, crowded growth, or humid weather.',
      toolsAndSupplies: [
        'Clean seed-starting trays',
        'Drip irrigation',
        'Pruners',
        'Trash bag for diseased material',
        'UC IPM disease references',
        'Crop rotation records',
      ],
      steps: [
        { title: 'Start clean', body: 'Use clean trays, fresh seed-starting mix, healthy seed, and good airflow. Damping off is easier to prevent than rescue.' },
        { title: 'Water the soil, not the leaves', body: 'Drip irrigation reduces leaf wetness. If overhead watering is necessary, do it early so leaves dry quickly.' },
        { title: 'Space for airflow', body: 'Crowded plants dry slowly and are harder to inspect. Prune lightly where appropriate, but do not strip protective leaf cover in hot sun.' },
        { title: 'Remove problem tissue early', body: 'Pinch or prune diseased leaves when the problem is small. Do not compost heavily diseased material unless your compost gets hot enough.' },
        { title: 'Use fungicides only as prevention when justified', body: 'Many fungicides prevent infection; they do not cure dead tissue. If considering a product, match it to the disease, crop, and label, then check UC IPM.' },
        { title: 'Rotate and clean up', body: 'Do not leave diseased crop debris in place. Rotate plant families when possible, especially tomatoes, peppers, potatoes, cucurbits, and brassicas.' },
      ],
      commonMistakes: [
        { mistake: 'Waiting until disease is everywhere.', fix: 'Scout early and remove small problems quickly.' },
        { mistake: 'Watering leaves at dusk.', fix: 'Water at the soil level or early in the day.' },
        { mistake: 'Using a fungicide as a cure.', fix: 'Understand whether the product prevents or treats and follow the label.' },
        { mistake: 'Saving seed from diseased plants.', fix: 'Avoid saving seed where seed-borne disease is possible.' },
      ],
      northernCaliforniaNotes:
        'Dry heat can reduce some foliar diseases, but irrigation, dense canopies, and cool nights can still create disease pockets.',
      zone9Notes:
        'Long seasons let diseases build over time. Fresh fall plantings and cleanup matter more than keeping exhausted summer crops alive forever.',
      wateringConsiderations:
        'Inconsistent watering stresses plants and can mimic disease. Confirm moisture before diagnosing.',
      heatConsiderations:
        'Do not remove too many leaves during summer. Exposed fruit and stems can sunburn quickly.',
      checklist: [
        'Start with clean trays and healthy plants',
        'Use drip where possible',
        'Space for airflow',
        'Scout weekly',
        'Remove diseased material early',
        'Use UC IPM before any product',
      ],
      relatedSlugs: ['pest-control-comparison', 'crop-rotation', 'fungicide-comparison'],
      sources: [sources.ucIpm, sources.ucAnr, sources.ucMg],
    }),
  ),

  'seed-starting-chart': publish(
    'Planting Methods',
    7,
    content({
      introduction:
        'A seed-starting chart keeps you from starting tomatoes in January, brassicas too late, or cucumbers so early they outgrow the tray. Use this as a practical Zone 9-friendly timing guide, then adjust for your microclimate.',
      whoThisIsFor:
        'Gardeners starting vegetables, herbs, and flowers indoors or in protected space before transplanting outdoors.',
      bestTime:
        'Build the chart before the season starts. For inland Northern California, start cool-season planning in summer for fall crops and warm-season planning in winter for spring planting.',
      toolsAndSupplies: [
        'Local frost date estimate',
        'Seed packets',
        'Seed trays and labels',
        'Seed-starting mix',
        'Light source',
        'Heat mat for warm crops only',
      ],
      steps: [
        { title: 'Start with frost and heat dates', body: 'Use last frost for spring planting, but also mark when extreme heat usually arrives. In Zone 9b, heat can matter more than frost.' },
        { title: 'Work backward from transplant date', body: 'Tomatoes often need 6 to 8 weeks, peppers 8 to 10, brassicas 4 to 6, lettuce 3 to 4, and cucurbits only 2 to 4 if started indoors.' },
        { title: 'Group crops by temperature', body: 'Peppers and eggplant like warm germination. Lettuce and brassicas do not need the same heat.' },
        { title: 'Label every tray', body: 'Write crop, variety, sow date, and target transplant date. A chart only works if trays stay identified.' },
        { title: 'Start fall crops earlier than feels normal', body: 'In hot Zone 9 areas, fall brassicas and greens often need indoor or shaded starting while summer crops are still producing.' },
      ],
      commonMistakes: [
        { mistake: 'Starting everything on the same weekend.', fix: 'Use crop-specific weeks before transplanting.' },
        { mistake: 'Starting cucumbers and squash too early.', fix: 'Direct sow or start only a few weeks before transplanting.' },
        { mistake: 'Ignoring fall starts.', fix: 'Plan brassicas, greens, and herbs before summer ends.' },
        { mistake: 'Using heat mats for cool crops.', fix: 'Use heat mats only where warmer soil helps germination.' },
      ],
      northernCaliforniaNotes:
        'Anderson, Redding, Red Bluff, Chico, and Sacramento gardeners can plant early, but summer heat changes the real calendar. Plan to beat heat, not just frost.',
      zone9Notes:
        'Zone 9 can support two major seed-starting waves: late winter for spring and midsummer for fall.',
      wateringConsiderations:
        'Seedlings need even moisture, not soggy trays. Bottom watering helps keep stems drier.',
      heatConsiderations:
        'Midsummer seed starting needs shade, airflow, and careful watering. Cool-season seedlings can fail quickly in hot trays.',
      checklist: [
        'Know frost and heat windows',
        'Work backward from transplant date',
        'Group crops by germination temperature',
        'Label trays',
        'Start fall crops on time',
        'Harden off before transplanting',
      ],
      relatedSlugs: ['seed-starting-instructions', 'family-garden-planner-guide', 'growing-tomatoes-northern-california'],
      sources: [sources.ucAnr, sources.johnnys, sources.usda],
    }),
  ),

  'tomato-growth-habit': publish(
    'Crop-Specific',
    8,
    content({
      introduction:
        'Determinate and indeterminate tomatoes grow differently, and that changes spacing, pruning, cages, harvest rhythm, and garden planning. Choose the habit that matches your goal.',
      whoThisIsFor:
        'Gardeners choosing tomato varieties for fresh eating, sauce, preserving, containers, raised beds, trellises, or small market rows.',
      bestTime:
        'Choose growth habit before starting seed or buying transplants. The decision affects support and spacing from day one.',
      toolsAndSupplies: [
        'Seed catalog or transplant labels',
        'Cages, stakes, Florida weave, or trellis',
        'Pruners',
        'Mulch',
        'Drip irrigation',
      ],
      steps: [
        { title: 'Understand determinate tomatoes', body: 'Determinate plants grow to a more limited size and set much of their fruit in a shorter window. They are useful for sauce batches, containers, and smaller supports.' },
        { title: 'Understand indeterminate tomatoes', body: 'Indeterminate plants keep growing and flowering until heat, disease, frost, or age slows them. They need stronger support and more season management.' },
        { title: 'Match support to habit', body: 'Small cages may work for compact determinates. Indeterminates need tall cages, staking, trellis, or weave support.' },
        { title: 'Prune for the system, not fashion', body: 'Heavy pruning can expose fruit to sunscald in hot climates. Prune for airflow and access, not to copy a greenhouse method that does not fit your garden.' },
        { title: 'Plan harvest rhythm', body: 'Use determinates for canning or sauce waves. Use indeterminates for steady fresh eating when weather allows fruit set.' },
      ],
      commonMistakes: [
        { mistake: 'Using weak cages for indeterminates.', fix: 'Support the plant you will have in July, not the transplant you have in April.' },
        { mistake: 'Pruning too hard in hot sun.', fix: 'Keep enough leaf cover to protect fruit from sunscald.' },
        { mistake: 'Expecting determinates to produce all season.', fix: 'Succession plant or add indeterminates for longer harvest.' },
        { mistake: 'Ignoring heat-related blossom drop.', fix: 'Choose timing and heat-tolerant varieties, then wait for fruit set to resume as temperatures ease.' },
      ],
      northernCaliforniaNotes:
        'In hot valleys, indeterminates may pause fruit set during peak heat and resume later. Determinates can be useful for harvesting before the worst heat.',
      zone9Notes:
        'Long seasons support both types, but water, shade, and support are what keep plants productive.',
      wateringConsiderations:
        'Tomatoes need steady moisture. Irregular watering increases cracking and blossom-end rot risk.',
      heatConsiderations:
        'Leave leaf cover during triple-digit weather. Sunscald can ruin exposed fruit fast.',
      checklist: [
        'Choose determinate or indeterminate by harvest goal',
        'Match support to plant size',
        'Space for airflow',
        'Prune lightly in heat',
        'Use steady drip irrigation',
        'Plan sauce and fresh-eating varieties separately',
      ],
      relatedSlugs: ['growing-tomatoes-northern-california', 'seed-starting-chart', 'tomato-pepper-spray-program'],
      sources: [sources.ucAnr, sources.johnnys, sources.extension],
    }),
  ),

  'fungicide-comparison': publish(
    'Pest, Disease & Weeds',
    10,
    content({
      introduction:
        'Fungicides are not a cure-all, and many are preventative tools with strict labels. This guide explains how to think about disease prevention, when product comparison is appropriate, and why UC IPM and the label matter more than a garden rumor.',
      whoThisIsFor:
        'Gardeners comparing copper, sulfur, biologicals, oils, and other disease-management options for vegetables, fruit trees, herbs, and flowers.',
      bestTime:
        'Before disease is severe. If a product is justified, many disease tools work best before infection spreads. Prevention, sanitation, and airflow should already be in place.',
      toolsAndSupplies: [
        'Disease identification',
        'UC IPM crop and disease page',
        'Product label',
        'Protective gear listed by label',
        'Clean sprayer if using any product',
        'Notebook for timing and weather',
      ],
      steps: [
        { title: 'Identify the disease', body: 'Powdery mildew, downy mildew, early blight, rust, bacterial spot, and viral symptoms are different problems. A fungicide will not fix viruses or most bacterial issues.' },
        { title: 'Fix conditions first', body: 'Improve airflow, remove infected tissue, reduce leaf wetness, rotate crops, and avoid overhead watering late in the day.' },
        { title: 'Understand preventative vs curative', body: 'Many fungicides protect healthy tissue but do not repair infected leaves. Dead or badly infected leaves should be removed when appropriate.' },
        { title: 'Compare by crop, disease, and label', body: 'Copper, sulfur, biologicals, oils, and synthetic products have different allowed crops, disease targets, temperature limits, and harvest intervals. The label is the law.' },
        { title: 'Avoid high-heat damage', body: 'Some products burn foliage in hot weather or when combined with oils. Check temperature and mixing restrictions.' },
      ],
      commonMistakes: [
        { mistake: 'Treating every leaf spot the same.', fix: 'Identify the disease before choosing any product.' },
        { mistake: 'Applying after plants are badly infected.', fix: 'Use prevention, sanitation, and early scouting.' },
        { mistake: 'Ignoring preharvest intervals.', fix: 'Read and follow harvest timing on the label.' },
        { mistake: 'Mixing products casually.', fix: 'Never tank-mix unless labels allow it.' },
      ],
      northernCaliforniaNotes:
        'Dry summers do not eliminate disease. Dense canopies, overhead watering, and cool nights can still create mildew and leaf-spot pressure.',
      zone9Notes:
        'Long seasons make prevention important. Removing old crops and rotating beds can reduce disease carryover.',
      wateringConsiderations:
        'Drip irrigation is one of the best disease-prevention tools in vegetable gardens because it keeps leaves drier.',
      heatConsiderations:
        'Hot weather can make product injury worse. Respect label temperature limits and avoid treating stressed plants.',
      checklist: [
        'Identify disease first',
        'Improve airflow and sanitation',
        'Use drip when possible',
        'Compare products only by crop and disease',
        'Follow label, PPE, PHI, and REI',
        'Keep records',
      ],
      relatedSlugs: ['common-plant-diseases', 'pest-control-comparison', 'tomato-pepper-spray-program'],
      sources: [sources.ucIpm, sources.ucAnr, sources.ucMg],
    }),
    {
      description:
        'A safety-first fungicide comparison guide that explains disease prevention, product limits, labels, and UC IPM decision-making.',
    },
  ),

  'crop-rotation': publish(
    'Planning & Layout',
    12,
    content({
      introduction:
        'Crop rotation is a simple habit that keeps a garden healthier over time. It will not solve everything, especially in small spaces, but it helps reduce repeated pest and disease pressure and makes soil planning easier.',
      whoThisIsFor:
        'Home gardeners, homesteads, and beginner market gardeners who grow tomatoes, peppers, cucurbits, brassicas, legumes, roots, herbs, flowers, and cover crops in repeated beds.',
      bestTime:
        'Plan rotation before the season starts, then update it after each crop finishes. Winter is the easiest time to review last year and sketch the next one.',
      toolsAndSupplies: [
        'Map of beds or rows',
        'Plant family list',
        'Last year planting records',
        'Compost and soil amendments',
        'Cover crop seed if using rest periods',
      ],
      steps: [
        { title: 'Group crops by family', body: 'Nightshades include tomatoes, peppers, eggplant, and potatoes. Cucurbits include squash, cucumbers, melons, and pumpkins. Brassicas include cabbage, broccoli, kale, and radishes. Legumes include beans and peas.' },
        { title: 'Avoid repeating heavy problem families', body: 'Try not to plant tomatoes after tomatoes, squash after squash, or brassicas after brassicas in the same bed year after year.' },
        { title: 'Use a simple sequence', body: 'A practical pattern is fruiting crops, then legumes or cover crops, then leafy/root crops, then cucurbits or another heavy feeder, adjusted for your space.' },
        { title: 'Accept small-garden limits', body: 'If you only have a few beds, perfect rotation is impossible. Rotate what you can, use compost, remove diseased debris, and choose resistant varieties.' },
        { title: 'Use cover crops as reset space', body: 'A cover crop can protect soil between families and add roots when a bed would otherwise sit bare.' },
        { title: 'Keep records', body: 'A photo, sketch, or planner export is enough. Without records, rotation becomes guesswork by the second year.' },
      ],
      commonMistakes: [
        { mistake: 'Rotating by fruit type instead of family.', fix: 'Know plant families. Tomatoes and peppers are both nightshades.' },
        { mistake: 'Expecting rotation to fix bad sanitation.', fix: 'Remove diseased plants and old fruit too.' },
        { mistake: 'Ignoring cover crops.', fix: 'Use covers where beds need rest, roots, and soil cover.' },
        { mistake: 'Trying to be perfect in a tiny garden.', fix: 'Do the best rotation possible and strengthen other practices.' },
      ],
      northernCaliforniaNotes:
        'Long Zone 9 seasons can put two or three crops through the same bed each year. Record each planting, not only the spring crop.',
      zone9Notes:
        'Because fall and winter crops are real production windows, include brassicas, garlic, peas, and cover crops in the rotation plan.',
      wateringConsiderations:
        'Crop rotation and irrigation work together. Grouping crops by family and water need makes drip zones easier to manage.',
      heatConsiderations:
        'In hot summers, use cover crops, mulch, or tarps to keep resting beds protected instead of leaving bare soil to bake.',
      checklist: [
        'Map each bed',
        'Group crops by family',
        'Avoid repeating families',
        'Use cover crops or rest periods',
        'Remove diseased debris',
        'Record spring, summer, and fall plantings',
      ],
      relatedSlugs: ['companion-planting', 'warm-season-cover-crops', 'cool-season-cover-crops'],
      sources: [sources.ucAnr, sources.extension, sources.johnnys],
    }),
  ),
};
