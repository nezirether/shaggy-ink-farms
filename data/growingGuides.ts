// ─────────────────────────────────────────────────────────────────────────────
// Growing Guides Data
//
// Each guide with status:'published' has full content rendered in
// app/learn/growing-guides/[slug]/page.tsx via the GuideLayout component.
// Guides with status:'coming-soon' show a placeholder card.
//
// Content accuracy standard: UC ANR, UC Master Gardeners, USDA Extension,
// Johnny's Seeds, and Territorial Seed publications.
// ─────────────────────────────────────────────────────────────────────────────

export type GuideStatus = 'published' | 'coming-soon';

export type GuideCategory =
  | 'Soil & Fertility'
  | 'Pest & Disease'
  | 'Planting Methods'
  | 'Crop-Specific'
  | 'Season Extension'
  | 'Food Preservation'
  | 'Planning & Layout';

export interface GuideStep {
  title: string;
  body: string;
}

export interface GuideMistake {
  mistake: string;
  fix: string;
}

export interface GuideSource {
  title: string;
  author?: string;
  url?: string;
}

export interface GuideContent {
  introduction: string;
  whoThisIsFor: string;
  bestTime: string;
  toolsAndSupplies: string[];
  steps: GuideStep[];
  commonMistakes: GuideMistake[];
  northernCaliforniaNotes: string;
  zone9Notes: string;
  wateringConsiderations: string;
  heatConsiderations: string;
  checklist: string[];
  relatedSlugs: string[];
  sources: GuideSource[];
}

export interface GrowingGuide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: GuideCategory;
  status: GuideStatus;
  readingTimeMinutes: number;
  lastUpdated: string;
  keywords: string[];
  content?: GuideContent;
}

export const GROWING_GUIDES: GrowingGuide[] = [

  // ── PUBLISHED GUIDES ────────────────────────────────────────────────────────

  {
    slug: 'companion-planting',
    title: 'Companion Planting Guide',
    shortTitle: 'Companion Planting',
    description:
      'Which plants help each other grow — and which ones should never share a bed. Practical companion planting for food gardens, with Northern California timing notes.',
    category: 'Planting Methods',
    status: 'published',
    readingTimeMinutes: 12,
    lastUpdated: '2025-06-01',
    keywords: [
      'companion planting',
      'what to plant together',
      'Three Sisters garden',
      'tomato companion plants',
      'marigolds with vegetables',
      'northern california companion planting',
    ],
    content: {
      introduction: `Companion planting is the practice of growing different crops near each other to gain mutual benefits — pest disruption, improved pollination, more efficient use of space, or nutrient sharing. The idea is ancient. The Haudenosaunee (Iroquois) Confederacy developed the Three Sisters system — corn, beans, and squash grown together — centuries before European settlement, and it remains one of the most well-documented examples of polyculture in the world.

Modern research on companion planting is mixed. Some combinations have strong scientific support (African marigolds reducing nematode populations in adjacent soil, for example). Others are based primarily on traditional practice and observation rather than controlled studies. This guide distinguishes between what is well-documented and what is widely practiced but less thoroughly tested.

At Shaggy Ink Farms, we use companion planting as one tool among many — not a replacement for good soil, adequate water, and pest scouting, but a layer of useful complexity that makes the garden more productive and more interesting.`,

      whoThisIsFor: `This guide is for home gardeners and small-scale food producers who want to improve garden productivity without adding chemical inputs. It is especially useful if you are:\n\n- Planning a new garden bed layout\n- Struggling with recurring pest pressure (aphids, whiteflies, squash vine borers)\n- Trying to maximize yield from limited space\n- Interested in reducing or eliminating pesticide use\n- Growing in Zone 9 or the Sacramento Valley and looking for locally relevant advice`,

      bestTime: `Plan companion planting combinations before the season begins, ideally in February or March for a spring garden and in July for a fall garden. Most decisions happen at planting time, though succession plantings (adding basil near established tomatoes, for example) can happen mid-season.`,

      toolsAndSupplies: [
        'Garden plan or graph paper (for mapping bed layouts)',
        'Seed catalog or seed inventory',
        'Transplant starts for companion herbs and flowers',
        'Marigold seeds or starts (African marigolds preferred)',
        'Dill, fennel, and herb seeds — note: keep fennel isolated',
        'Insect netting for beds where companion plants are not yet established',
      ],

      steps: [
        {
          title: 'Understand the four types of companion planting benefits',
          body: `Before selecting companions, know what you are trying to accomplish:\n\n**Pest disruption:** Some plants repel or confuse pest insects through scent or volatile compounds. Others attract beneficial predatory insects. African marigolds (Tagetes erecta) have well-documented nematode-suppression properties when grown as a dense planting.\n\n**Pollinator attraction:** Flowering companions like dill, fennel (keep it isolated — see Step 6), and borage attract bees and other pollinators, which improves fruit set on cucurbits, tomatoes, peppers, and beans.\n\n**Space efficiency:** Tall plants provide shade for heat-sensitive shorter plants. Sprawling plants cover bare soil, reducing weed pressure. Trellised crops free up ground-level space for low-growing crops.\n\n**Nutrient sharing:** Legumes (beans, peas, clover) fix atmospheric nitrogen through root-dwelling rhizobacteria. This nitrogen becomes available to neighboring plants — most significantly after the legume plant is cut down or incorporated into soil.`,
        },
        {
          title: 'Plant the Three Sisters together',
          body: `The Three Sisters — corn, beans, and squash — is the most well-documented companion planting system in North American agriculture. Here is how it works:\n\n**Corn** provides a vertical structure for beans to climb, eliminating the need for a separate trellis.\n\n**Beans** (pole varieties) fix nitrogen from the air into soil-available form through symbiotic rhizobacteria on their roots. The corn benefits from this nitrogen, and residual nitrogen improves soil for the following season.\n\n**Squash** spreads across the ground between the corn stalks, shading the soil to retain moisture, suppress weeds, and deter pests with its rough, scratchy leaves.\n\n**How to plant:** In Anderson, CA, direct sow corn in mid-April after soil reaches 60°F. When corn is 6–8 inches tall (about 2 weeks after emergence), plant 3–4 bean seeds around each corn stalk at 6-inch spacing. One week later, plant squash in the spaces between corn hills. Do not plant all three at the same time — the corn needs to establish before beans are added, or the beans will outcompete it early.\n\nPlant corn in blocks of at least 4 rows for wind pollination. A single row will produce poorly pollinated ears.`,
        },
        {
          title: 'Plant African marigolds near tomatoes and peppers',
          body: `African marigolds (Tagetes erecta) — not French marigolds (Tagetes patula) — have documented root exudates that suppress soil-dwelling nematodes (Meloidogyne spp.) when planted densely as a cover crop or border planting. French marigolds produce some of the same compounds but at lower concentrations.\n\nFor nematode suppression, research from UC Cooperative Extension indicates that the marigolds need to be planted at high density (not just a few plants as border decoration) and allowed to grow for at least 60 days before the bed is replanted. Using them as an off-season cover crop before a summer tomato bed is one of the most practical applications.\n\nFor in-season planting, place African marigolds at the edges of tomato and pepper beds. They also attract aphid predators (ladybugs, lacewings, parasitic wasps) through nectar and provide a visual indicator of aphid pressure — aphids will often colonize marigolds, making them easy to spot and remove.\n\n**Do not confuse this with a magic cure.** Marigolds planted as a few decorative borders will not meaningfully reduce nematode pressure. Dense, whole-bed plantings for a full season are required for measurable suppression.`,
        },
        {
          title: 'Use herbs to disrupt pest cycles',
          body: `Aromatic herbs planted among vegetables can interfere with pest insect host-finding. The evidence varies by combination:\n\n**Basil near tomatoes** is widely recommended and widely practiced. Controlled studies show mixed results — the mechanism (scent disruption for thrips and aphids) is plausible but not consistently proven. It does not hurt, and the basil is useful in the kitchen. Plant after tomato transplants are established.\n\n**Dill and fennel:** Both attract beneficial parasitic wasps and predatory insects. **Important:** Fennel (Foeniculum vulgare) is allelopathic — it produces root and leaf exudates that inhibit germination and growth of most vegetable crops. Plant fennel in its own isolated container or area, well away from vegetable beds. Dill is not allelopathic and is safe to interplant.\n\n**Catnip (Nepeta cataria):** Several studies have found catnip volatile compounds effective at repelling aphids, Japanese beetles, and some other pests. It is a vigorous grower — contain it or it will spread aggressively.\n\n**Nasturtiums:** Often used as trap crops — aphids, whiteflies, and caterpillars are attracted to them preferentially. Plant at the edges of beds and check weekly. When pest populations are high on nasturtiums, remove and dispose of the plants (do not compost them) before pests move to your food crops.`,
        },
        {
          title: 'Use tall crops to shade heat-sensitive crops',
          body: `In Anderson, CA, summer temperatures regularly exceed 105°F. Strategic use of tall crops as shade sources can extend the productivity of heat-sensitive companions:\n\n**Corn or sunflowers on the west or south side of lettuce:** In late spring, before heat shuts down cool-season crops, tall corn or sunflowers planted on the side of the bed facing the afternoon sun can provide shade during the hottest part of the day. This extends lettuce harvest by 2–3 weeks in a hot spring.\n\n**Trellised tomatoes or beans over spinach or cilantro:** A trellis on the south side of a low-profile bed provides dappled shade. This works best in spring before heat intensifies.\n\nNote: In peak summer (July–August), most cool-season crops will not survive even with shade. The goal is to extend the shoulder seasons, not to grow lettuce in August.`,
        },
        {
          title: 'Keep fennel isolated — it is allelopathic',
          body: `Fennel (Foeniculum vulgare) is one of the most commonly misused companion plants. Many gardeners plant it expecting it to attract beneficial insects (it does attract swallowtail butterfly larvae). The problem: fennel root exudates and leaf litter inhibit the germination and growth of most vegetable crops, including tomatoes, peppers, lettuce, and brassicas.\n\nDo not plant fennel in vegetable beds. Instead:\n- Grow fennel in a large container near the garden\n- Plant it at least 3–4 feet from vegetable beds in a dedicated herb area\n- If you grow it in the ground, do not till fennel roots back into vegetable bed soil\n\nThe beneficial insect attraction is real — just manage the allelopathy risk.`,
        },
        {
          title: 'Plan your layout on paper before planting',
          body: `Draw a simple bed layout before you plant. Note:\n- Which crops are tall (corn, tomatoes, sunflowers) vs. low-growing (basil, lettuce, spinach)\n- Which direction afternoon sun comes from (west to southwest in California)\n- Which crops need pollination (cucurbits, corn) vs. which do not (leafy greens, root vegetables)\n- Where you will establish a permanent marigold border\n- Where your fennel container will sit (isolated)\n\nA bed layout done in advance avoids the common mistake of planting tall crops where they shade shorter crops that need sun, or planting allelopathic plants where they harm neighbors.`,
        },
      ],

      commonMistakes: [
        {
          mistake: 'Planting fennel among vegetable crops',
          fix: 'Grow fennel in an isolated container or a dedicated area at least 3–4 feet from vegetable beds. Its root exudates inhibit most food crops.',
        },
        {
          mistake: 'Using a few marigold border plants and expecting nematode control',
          fix: 'Nematode suppression from marigolds requires dense planting across the entire bed for a full 60-day growing period. A decorative border does not provide this. Use marigolds as a dedicated pre-season cover crop for meaningful nematode management.',
        },
        {
          mistake: 'Planting the Three Sisters at the same time',
          fix: 'Corn must be 6–8 inches tall before beans are added. Plant squash last, about a week after beans. Simultaneous planting lets beans shade and outcompete young corn.',
        },
        {
          mistake: 'Relying on companion plants as the primary pest control strategy',
          fix: 'Companion planting is a layer of support, not a replacement for regular pest scouting, good sanitation, and physical controls (row cover, hand-picking). Check plants weekly and act on what you find.',
        },
        {
          mistake: 'Assuming all companions have equally strong scientific support',
          fix: 'Some combinations (Three Sisters, African marigolds for nematodes) are well-documented. Others (basil near tomatoes) are widely practiced but less proven. Treat unproven companions as useful experiments, not guarantees.',
        },
      ],

      northernCaliforniaNotes: `In the North Sacramento Valley (Anderson, Red Bluff, Redding, Chico), summer heat is the primary constraint on companion planting. Most companion herbs — basil, dill, cilantro — will bolt and die in July–August heat. Plant them with spring transplants, expect to lose them to heat mid-summer, and replant in early September for a fall run.\n\nThe Three Sisters system works extremely well here due to long, hot summers. Start corn in mid-April (soil temperature at or above 60°F) for a productive planting. Summer squash in the Three Sisters system will produce aggressively — do not underestimate how much squash a few plants generate.\n\nNasturtium trap crops are effective here. Aphid pressure is typically high in spring. Plant nasturtiums in February and monitor them closely as temperatures warm.`,

      zone9Notes: `Zone 9b (Anderson, CA) has approximately 290 frost-free days. Last frost is typically late January to mid-February; first frost is mid-December. This long season means:\n\n- Perennial companion plants (comfrey, yarrow, borage) can be established and maintained year-round\n- African marigolds can run a full 90-day nematode-suppression cycle as a pre-summer cover crop\n- Two distinct companion planting configurations are possible: a cool-season spring setup (late January through May) and a warm-season summer setup (April through November)\n\nFor summer: prioritize heat-tolerant companions. Basil handles heat well and can be kept alive through summer with consistent water. Dill tends to bolt quickly in hot summers — use it in spring and fall only.`,

      wateringConsiderations: `Companion planting density means more plants competing for water in the same bed. In a drip-irrigated garden, check that all companion plants receive adequate emitter coverage — it is easy to position drip emitters for the primary crops and leave companion herbs or flowers dry.\n\nFor the Three Sisters specifically, the squash canopy dramatically reduces evaporation from the soil surface, which is part of its function. This means you may need less irrigation than for a bed of the same square footage without the squash ground cover.\n\nIn peak summer (July–August), water requirements for all beds increase significantly. Deep, infrequent watering is better than shallow daily watering. Drip irrigation with a 2–3 inch layer of wood chip mulch reduces water needs by 30–50% compared to unirrigated, bare-soil beds.`,

      heatConsiderations: `At temperatures above 100°F, many companion plants will struggle. Basil is one of the most heat-tolerant companion herbs and is worth keeping watered through summer. Dill, cilantro, and most flowering companions will bolt or die in extreme heat.\n\nShade cloth (30% or 40% shade cloth) over entire beds during heat waves above 108°F can protect both primary crops and companion plantings. Remove shade cloth once temperatures return to normal, as prolonged shading reduces tomato and pepper productivity.\n\nSunflowers used as shade companions for spring lettuce will themselves suffer in extreme summer heat — expect them to perform best March through June in Anderson.`,

      checklist: [
        'Draw bed layout before planting — include height, sun direction, and companion placement',
        'Purchase African marigold starts for nematode management beds',
        'Plant fennel in an isolated container, away from vegetable beds',
        'Establish nasturtium trap crops in February for spring aphid season',
        'Plant corn before adding beans (wait until corn is 6–8 inches tall)',
        'Add squash to Three Sisters planting one week after beans',
        'Install basil transplants alongside tomatoes after last frost',
        'Remove and dispose of nasturtiums (do not compost) when pest populations peak',
        'Replant companion herbs in September for fall garden',
        'Check drip emitter coverage includes companion plant positions',
      ],

      relatedSlugs: [
        'crop-rotation',
        'seed-starting-instructions',
        'pest-control-comparison',
        'spring-garden-layout',
        'tomato-growth-habit',
      ],

      sources: [
        {
          title: 'Companion Planting: Basic Concepts & Resources',
          author: 'University of California Agriculture & Natural Resources',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Marigolds for Vegetable Garden Nematode Control',
          author: 'North Carolina State University Cooperative Extension',
        },
        {
          title: 'The Three Sisters: The Plot Thickens',
          author: 'Robin Wall Kimmerer — Braiding Sweetgrass (2013)',
        },
        {
          title: 'Soil Solarization for the Control of Nematodes and Weeds',
          author: 'UC ANR Publication 21375',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Allelopathy: How Plants Affect Their Neighbors',
          author: 'Oregon State University Extension Service',
        },
      ],
    },
  },

  {
    slug: 'seed-starting-instructions',
    title: 'Seed Starting Instructions',
    shortTitle: 'Seed Starting',
    description:
      'When to start seeds indoors vs. direct sow, what equipment actually matters, germination temperatures by crop, and how to harden off transplants for Northern California heat.',
    category: 'Planting Methods',
    status: 'published',
    readingTimeMinutes: 14,
    lastUpdated: '2025-06-01',
    keywords: [
      'seed starting indoors',
      'when to start seeds',
      'germination temperature',
      'hardening off transplants',
      'seed starting northern california',
      'grow lights for seedlings',
    ],
    content: {
      introduction: `Starting seeds indoors extends the growing season and gives you control over varieties that are rarely available as transplants at nurseries. It also tends to be significantly cheaper than buying starts — once you have basic equipment, a $4 seed packet produces far more plants than $3–5 nursery pots.\n\nFor gardeners in the Sacramento Valley and Northern California, seed starting timing is driven by two variables: the last expected frost date, and the heat sensitivity of the crop. Most seed packets give generic national timing ranges. This guide gives you zone-specific timing for Anderson, CA (Zone 9b), which has a late January to mid-February last frost and triple-digit summer temperatures that can destroy transplants that go out too late in a heat-sensitive window.\n\nNot everything benefits from indoor starting. Many crops (carrots, beets, radishes, beans, corn, peas) do better direct-sown because they develop better root systems without transplant disruption. This guide covers which crops are worth starting indoors, what equipment actually matters, and how to get transplants out of the house and into the ground successfully.`,

      whoThisIsFor: `This guide is for:\n- First-time seed starters who want to know what equipment is genuinely necessary\n- Experienced gardeners troubleshooting leggy seedlings, poor germination, or transplant shock\n- Zone 9 growers who need regionally specific timing\n- Anyone who wants to grow varieties unavailable at local nurseries`,

      bestTime: `In Anderson, CA (Zone 9b):\n\n- **Tomatoes:** Start indoors 6–8 weeks before transplant date. Transplant after last frost (late January to mid-February), typically late March to mid-April. Start seeds: late January to early February.\n- **Peppers:** Start 8–10 weeks before transplant. Transplant late April. Start seeds: mid-to-late February.\n- **Eggplant:** Start 8–10 weeks before transplant. Start seeds: February.\n- **Brassicas (broccoli, cabbage, cauliflower):** Start 6 weeks before transplant. Spring crop transplant: mid-February to early March. Fall crop: start indoors early August.\n- **Lettuce:** Start 4 weeks before transplant. Spring: start January. Fall: start August–September.\n- **Onions:** Start 10–12 weeks before transplant. Start December–January for spring planting.`,

      toolsAndSupplies: [
        'Seed-starting trays (72-cell or 128-cell) with drainage holes',
        'Dome lids for moisture retention during germination',
        'Seedling heat mat (important for peppers, eggplant, and heat-loving crops)',
        'Seed-starting mix — NOT garden soil or potting mix. A fine-textured, sterile, well-draining mix.',
        'Grow lights — a 2-bulb T5 fluorescent or LED grow bar, 2–4 inches above seedlings (windowsills do not provide adequate light in most homes)',
        'Outlet timer for grow lights (14–16 hours of light per day)',
        'Small watering can or spray bottle for gentle watering',
        'Labels and waterproof marker',
        'Liquid fertilizer for seedlings (half-strength fish emulsion or balanced liquid fertilizer)',
        'Larger 4-inch pots for potting up before final transplant',
      ],

      steps: [
        {
          title: 'Choose seed-starting mix, not potting soil',
          body: `Seed-starting mix is fine-textured, lightweight, and sterile — designed to allow delicate roots to penetrate easily and to prevent damping-off (a fungal condition that kills seedlings at the soil line). Standard potting mix is too coarse and too dense for small seedlings. Garden soil taken from beds is too heavy, may carry disease, and compacts in containers.\n\nFill trays to within 1/4 inch of the top. Moisten the mix before sowing — dry seed-starting mix is hydrophobic at first and needs to be thoroughly wet before seeds go in. A dry mix added to a tray and then watered from above tends to wash seeds into a corner.\n\nDo not add fertilizer at this stage. Seed-starting mixes have little to no fertility by design — seedlings do not need nutrients for the first 2 weeks, and excessive nutrients at this stage can burn seedlings.`,
        },
        {
          title: 'Sow seeds at the right depth',
          body: `A general rule: sow seeds at a depth equal to 2–3 times their diameter. Very small seeds (lettuce, basil, celery) are surface-sown or barely covered. Medium seeds (tomatoes, peppers, brassicas) go about 1/4 inch deep. Large seeds (cucurbits, beans) go 1/2 inch to 1 inch deep — though cucurbits are typically better direct-sown.\n\nFor most crops, sow 2 seeds per cell and thin to 1 seedling after germination. This wastes some seed but ensures you have a plant in every cell. Keep the stronger seedling; remove the weaker by snipping at soil level with scissors (pulling can disturb the roots of the seedling you are keeping).\n\nCover seeds with dry seed-starting mix or vermiculite, which holds moisture evenly without crusting over.`,
        },
        {
          title: 'Provide bottom heat for warm-season crops',
          body: `Germination is primarily a function of soil temperature, not air temperature. Many warm-season crops require warmer soil temperatures than a typical house can provide in winter or early spring:\n\n- **Tomatoes:** Optimum germination at 70–80°F soil. Acceptable range: 60–85°F.\n- **Peppers:** Optimum 80–85°F soil. Below 65°F, germination slows dramatically or fails. This is why peppers are notoriously slow to start in a cool room.\n- **Eggplant:** 80–90°F optimal.\n- **Cucumbers, melons, squash:** 75–85°F. These are typically direct-sown but occasionally started indoors in short-season zones.\n- **Lettuce, spinach, brassicas:** 45–75°F — cool-season crops germinate better in cooler conditions. Do not use a heat mat for these.\n\nA seedling heat mat raises tray temperature 10–20°F above room temperature. Use a thermometer in the tray to confirm actual soil temperature. Once seeds germinate and sprouts emerge, remove from the heat mat — most seedlings grow best at 60–70°F air temperature after germination.`,
        },
        {
          title: 'Provide adequate light from day one after germination',
          body: `Light is the most common limiting factor in indoor seed starting. A south-facing window in most homes delivers insufficient light in January and February when most seeds are started — especially for crops like tomatoes and peppers that need high light intensity for compact, strong growth.\n\nSeedlings that do not get enough light become "leggy" — they stretch toward the light source, producing tall, weak stems with large spacing between leaves. Leggy seedlings transplant poorly and are more vulnerable to wind and pest damage.\n\n**What works:** A T5 fluorescent grow bar or LED grow light positioned 2–4 inches above seedling tops, on a timer for 14–16 hours per day. As seedlings grow, raise the light to maintain the 2–4 inch gap. LED grow lights use less energy and produce less heat than fluorescent — both work well.\n\n**What does not work (reliably):** A single south-facing window in a temperate climate, especially in winter. It can work in very bright, unobstructed exposures but fails more often than it succeeds.\n\nMove seedlings into full outdoor sun gradually — see Step 6 on hardening off.`,
        },
        {
          title: 'Water correctly — bottom watering after germination',
          body: `Watering from above with a strong stream can displace small seeds and damage fragile seedlings. Use a gentle spray bottle or a watering can with a rose head during early stages.\n\nAfter germination, transition to bottom watering: set the tray in a shallow container of water and allow the mix to absorb moisture through the drainage holes over 20–30 minutes. Remove and allow to drain. This method:\n- Keeps moisture more consistent throughout the depth of the cell\n- Prevents overwatering the surface (which encourages fungal damping-off)\n- Encourages roots to grow downward toward the water source\n\nAllow trays to dry slightly between waterings — seed-starting mix should feel damp but not wet. Consistently wet soil promotes root rot and fungal disease.\n\nIn Anderson, CA, heated interiors can be quite dry in winter. Check trays daily. A dome lid placed over trays helps retain moisture during germination; remove it after sprouts emerge to prevent fungal problems from reduced airflow.`,
        },
        {
          title: 'Fertilize lightly starting at 2 weeks',
          body: `Seed-starting mix contains little to no nutrition. Once seedlings have developed their first true leaves (the second set of leaves after the initial seed leaves/cotyledons), begin feeding with a dilute liquid fertilizer every 7–10 days.\n\nUse half the recommended rate of a balanced liquid fertilizer (fish emulsion, liquid kelp, or a commercial seedling fertilizer). Full-strength fertilizer on small seedlings can cause nutrient burn.\n\nIf seedlings look yellow but are otherwise healthy, increase fertilizer application. Yellowing is the most common symptom of nitrogen deficiency in container-grown seedlings, which rapidly exhaust the limited nutrients in seed-starting mix.`,
        },
        {
          title: 'Pot up before final transplant if seedlings outgrow their cells',
          body: `If transplant time is still weeks away and seedlings are root-bound in their cells (roots coming out the bottom, growth stalling), move them to individual 4-inch pots. Use regular potting mix (not seed-starting mix) at this stage.\n\nPot up carefully — minimize root disturbance. Fill the new pot with moist potting mix, make a hole the size of the seedling's root ball, set the seedling in, and firm the soil around it. Water gently. Keep under grow lights and at room temperature.\n\nFor tomatoes specifically: you can bury the stem deep during potting up — tomatoes root along buried stem, producing a stronger root system. Bury up to 2/3 of the stem, leaving only the top cluster of leaves above soil.`,
        },
        {
          title: 'Harden off transplants before planting out',
          body: `"Hardening off" is the process of acclimating indoor-grown seedlings to outdoor conditions — direct sun, wind, temperature swings, and reduced humidity — before planting them permanently in the garden. Skipping this step often results in sunburn (pale or white bleached patches on leaves), windburn, or transplant shock.\n\n**Two-week hardening schedule:**\n\n- **Days 1–3:** Set seedlings outdoors in a shaded, sheltered location for 1–2 hours midday. Bring them back in.\n- **Days 4–6:** Increase to 3–4 hours in partial shade.\n- **Days 7–9:** Move to a location with morning sun and afternoon shade for 4–6 hours.\n- **Days 10–12:** Full sun for increasing periods. Watch for wilting — bring in or water if plants look stressed.\n- **Days 13–14:** Leave outdoors overnight if temperatures stay above 50°F (for warm-season crops) or above 35–40°F (for cold-hardy transplants like brassicas).\n\n**In Anderson, CA:** Hardening off in April and May requires attention to sudden heat. If temperatures spike above 95°F during the hardening period, skip outdoor time that day or limit to early morning only.`,
        },
        {
          title: 'Transplant at the right time and in the right conditions',
          body: `In Anderson, CA Zone 9b:\n\n- **Tomatoes:** Transplant late March to mid-April. Soil should be above 60°F. Set plants out in the morning on a calm, overcast day if possible. Avoid transplanting before predicted heat spikes.\n- **Peppers:** Transplant late April to early May. Peppers need warmer soil than tomatoes — wait until soil is above 65°F consistently.\n- **Brassicas:** Spring crop, transplant mid-February to early March. These tolerate frost — a light frost after transplanting is acceptable.\n- **Lettuce:** Transplant February (spring) or August–September (fall). Summer transplanting is not recommended in Anderson — heat will destroy transplants.\n\nWater transplants in with a dilute starter fertilizer solution (fish emulsion or compost tea) to reduce transplant shock. Install drip emitters immediately — do not rely on hand-watering newly transplanted seedlings through their first week in summer conditions.`,
        },
      ],

      commonMistakes: [
        {
          mistake: 'Starting seeds too early',
          fix: 'Calculate backward from your last frost date and target transplant date. Seeds started too early become root-bound and leggy before they can go out. For Zone 9b Anderson, tomato seeds started before mid-January are usually too early for the optimal late March to mid-April transplant window.',
        },
        {
          mistake: 'Using garden soil or potting mix for seed starting',
          fix: 'Use seed-starting mix. Garden soil compacts in containers and may harbor disease. Standard potting mix is too coarse for small seedlings. Seed-starting mix is designed for this specific stage.',
        },
        {
          mistake: 'Relying on a window for light',
          fix: 'Invest in a basic T5 or LED grow bar. A single south-facing window is rarely adequate in winter and early spring for tomatoes and peppers. Leggy seedlings from insufficient light are the most common indoor seed-starting failure.',
        },
        {
          mistake: 'Not hardening off before transplanting',
          fix: 'Follow the two-week hardening schedule. Plants moved directly from indoors to full outdoor sun often suffer sunburn damage and transplant shock. A hardened seedling transplants cleanly.',
        },
        {
          mistake: 'Overwatering seedlings',
          fix: 'Allow the mix to dry slightly between waterings. Consistently wet soil causes root rot and damping-off. Bottom watering after germination helps maintain even moisture without oversaturation.',
        },
      ],

      northernCaliforniaNotes: `The Sacramento Valley has a compressed spring window for warm-season transplants. Late January to mid-February last frost is followed quickly by spring heat waves that can push temperatures into the 90s by May and the 100s by June. This means:\n\n- Tomatoes and peppers should go out by mid-April at the latest for optimal productivity before summer heat stress reduces fruit set\n- Brassica spring crops must be established early — late-planted broccoli transplanted in April often bolts before producing in the Sacramento Valley's rapid spring\n- Fall broccoli and cauliflower started indoors in late July and transplanted in late August are often more productive than spring crops in this region\n\nShade cloth (40%) over seedling trays during hardening off in April and May can prevent heat damage on unusually hot spring days.`,

      zone9Notes: `Zone 9b's long frost-free season means you have two distinct seed-starting windows:\n\n1. **Winter start for spring crops:** December–February for spring transplants\n2. **Summer start for fall crops:** July–August for fall transplants (brassicas, lettuce, spinach, chard)\n\nThe summer start window is less obvious to gardeners who moved here from colder climates. In July, when most gardens are in full summer production, experienced Zone 9 growers are starting broccoli seeds indoors to be ready for September transplanting and October–November harvest.`,

      wateringConsiderations: `Newly transplanted seedlings are vulnerable to drying out before their roots establish in the surrounding soil. In Anderson, CA from April onward, check transplants daily for the first 1–2 weeks. Even with drip irrigation, newly transplanted seedlings may need hand watering for the first few days until root-to-emitter contact is established.

Install drip irrigation before transplanting if possible — setting up drip around newly planted seedlings is more disruptive than having it in place. A 1-gallon-per-hour drip emitter per tomato or pepper plant, running 20–30 minutes daily in May and 45–60 minutes in July–August, is a reasonable starting point. Adjust based on soil type and observed plant health.`,

      heatConsiderations: `In Zone 9b, the most challenging period for transplants is late spring and early summer (May–June) when temperatures can spike unexpectedly. Tactics:\n\n- Transplant in the evening or on overcast days to reduce heat stress at establishment\n- Use a dilute solution of kelp or humic acid as a root drench at transplanting — both have evidence supporting transplant shock reduction\n- A temporary shade cloth (30–40%) for the first week after transplanting can prevent wilting in transplants that have not yet established their root systems\n- Do not transplant tomatoes or peppers the day before a forecast heat spike above 100°F`,

      checklist: [
        'Calculate start dates backward from target transplant date (use last frost date as anchor)',
        'Gather supplies: seed-starting mix, trays with lids, heat mat, grow light, timer',
        'Pre-moisten seed-starting mix before filling trays',
        'Sow 2 seeds per cell; thin to 1 after germination',
        'Set heat mat for warm-season crops; do not use for cool-season crops',
        'Position grow lights 2–4 inches above seedlings on 14–16 hour timer',
        'Begin dilute fertilizer after first true leaves appear',
        'Pot up to 4-inch containers if seedlings outgrow cells before transplant time',
        'Follow two-week hardening schedule before transplanting',
        'Transplant in evening or on overcast days; install drip emitters',
      ],

      relatedSlugs: [
        'companion-planting',
        'spring-garden-layout',
        'seed-starting-chart',
        'crop-rotation',
        'family-garden-planner-guide',
      ],

      sources: [
        {
          title: 'Starting Seeds at Home',
          author: 'UC ANR — University of California Agriculture & Natural Resources',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Vegetable Transplant Production',
          author: 'UC Cooperative Extension, Fresno County',
        },
        {
          title: 'Germination Temperature Tables',
          author: "Johnny's Selected Seeds Growing Library",
          url: 'https://www.johnnyseeds.com/growers-library/',
        },
        {
          title: 'Hardening Off Transplants',
          author: 'Oregon State University Extension Service',
        },
      ],
    },
  },

  {
    slug: 'growing-tomatoes-northern-california',
    title: 'Growing Tomatoes in Northern California',
    shortTitle: 'Tomatoes',
    description:
      'A practical guide to planting, watering, pruning, and harvesting tomatoes in hot Northern California gardens.',
    category: 'Crop-Specific',
    status: 'published',
    readingTimeMinutes: 10,
    lastUpdated: '2026-06-17',
    keywords: [
      'growing tomatoes northern california',
      'tomato planting dates',
      'tomato irrigation',
      'hot weather tomatoes',
    ],
    content: {
      introduction: `Tomatoes are one of the best crops for a Northern California garden, but they are not automatic. In places like Anderson, Redding, Chico, Red Bluff, and the Sacramento Valley, the season is long and hot. That gives tomatoes time to grow big, but it also brings heat stress, blossom drop, dry soil, spider mites, and sunscald.

At Shaggy Ink Farms, we treat tomatoes like a main crop, not a casual extra. They need good timing, deep watering, mulch, strong support, and a plan for July heat. If you get those parts right, a small tomato patch can feed a family, fill sauce jars, and still leave a few tomatoes on the counter for sandwiches.`,

      whoThisIsFor: `This guide is for gardeners growing tomatoes in Northern California, especially Zone 8, Zone 9, and Zone 10 gardens. It is useful if you are planting tomatoes for fresh eating, sauce, salsa, or family food security.

It is also for gardeners who have had tomato plants grow huge but set very little fruit once summer heat arrived.`,

      bestTime: `Start tomato seeds indoors 6 to 8 weeks before transplanting. In much of inland Northern California, that means starting seeds in late January or February.

Transplant tomatoes outside after frost danger has passed and soil has warmed. In Anderson and similar Zone 9b gardens, late March through mid-April is the normal window. Cooler foothill gardens may need to wait until late April or early May.`,

      toolsAndSupplies: [
        'Tomato seedlings or seed-starting supplies',
        'Compost or finished organic matter',
        'Tomato cages, stakes, cattle panel, or trellis',
        'Drip irrigation or soaker hose',
        'Mulch, such as straw, leaves, or wood chips',
        'Pruners or garden scissors',
        'Shade cloth for extreme heat',
      ],

      steps: [
        {
          title: 'Choose the right tomato types',
          body: `Grow a mix of tomatoes instead of betting the whole season on one variety.

Cherry tomatoes are usually the most reliable in high heat. Slicer tomatoes give the classic summer harvest but may stop setting fruit during heat waves. Paste tomatoes are best for sauce and canning because they have less juice.

Indeterminate tomatoes keep growing and producing until frost if they stay healthy. Determinate tomatoes make a shorter, heavier crop and are easier to manage in cages. For a family garden, plant both if you have room.`,
        },
        {
          title: 'Start or buy strong transplants',
          body: `A good tomato transplant is short, sturdy, dark green, and not root-bound. Avoid tall, pale plants that already have flowers in a tiny pot.

If you start seeds indoors, use bright lights and do not start too early. Big root-bound tomato plants do not always beat smaller healthy plants once they go into the garden.

Before planting outside, harden plants off for 7 to 14 days. Move them into outdoor light slowly so they do not get sunburned.`,
        },
        {
          title: 'Plant after the soil warms',
          body: `Tomatoes hate cold soil. A warm week in March does not mean the soil is ready. Wait until nights are mostly above 50 degrees and the soil is near 60 degrees or warmer.

Plant tomatoes deep. Remove the lower leaves and bury part of the stem. Roots can form along buried tomato stems, which helps the plant handle heat later.

Space most tomatoes 24 to 36 inches apart. In hot areas, crowded plants get poor air flow and are harder to water evenly.`,
        },
        {
          title: 'Install support at planting',
          body: `Do not wait until the plant falls over. Put cages, stakes, or trellis panels in the same day you plant.

A basic tomato cage is fine for determinate types. Large indeterminate tomatoes need stronger support. Cattle panel, T-posts, or a Florida weave can work well.

Tie stems loosely. The goal is support, not a tourniquet. Check ties every week as stems grow.`,
        },
        {
          title: 'Water deeply and mulch early',
          body: `Tomatoes need steady moisture. Big swings from dry to soaked can lead to cracked fruit and blossom end rot.

Drip irrigation is best. Water at the soil, not over the leaves. In hot inland valleys, tomatoes often need deep watering 2 to 4 times per week by summer, depending on soil and mulch.

Add 2 to 4 inches of mulch after the soil warms. Mulch keeps roots cooler and slows evaporation. It also keeps soil from splashing onto leaves, which can reduce disease pressure.`,
        },
        {
          title: 'Prune for airflow, not perfection',
          body: `You do not need to strip a tomato plant bare. Remove leaves that touch the soil, broken stems, and crowded growth inside the plant.

For indeterminate tomatoes, removing some suckers can make the plant easier to tie and harvest. For determinate tomatoes, prune lightly. Heavy pruning can reduce the crop.

In our heat, leaves protect fruit from sunscald. A tomato plant should breathe, but it still needs shade from its own leaves.`,
        },
        {
          title: 'Plan for July and August heat',
          body: `When daytime temperatures stay above 95 degrees and nights stay warm, tomato pollen can fail. The plant may flower but not set fruit. That is not always your fault.

Keep plants alive and healthy through the heat. Fruit set often improves again when temperatures ease. Use 30 percent shade cloth during extreme heat over 105 degrees, especially on young plants and exposed fruit.

Use the zone lookup at /learn/know-your-growing-zone and build a planting plan at /garden-planner so your tomatoes go into the ground before the worst heat arrives.`,
        },
      ],

      commonMistakes: [
        {
          mistake: 'Planting too early in cold soil',
          fix: 'Wait for warm soil and steady nights above 50 degrees. Cold-stressed tomatoes sit still and can be weaker all season.',
        },
        {
          mistake: 'Watering shallow every day',
          fix: 'Water deeply so roots grow down. Mulch the bed and adjust drip time as summer heat increases.',
        },
        {
          mistake: 'Using weak cages for large indeterminate tomatoes',
          fix: 'Use strong cages, stakes, cattle panel, or T-post support at planting time.',
        },
        {
          mistake: 'Removing too many leaves',
          fix: 'Prune for airflow and access, but keep enough leaf cover to protect fruit from sunscald.',
        },
        {
          mistake: 'Expecting heavy fruit set during heat waves',
          fix: 'Keep plants alive and watered. Fruit set often returns when temperatures drop below extreme levels.',
        },
      ],

      northernCaliforniaNotes: `Inland Northern California has a fast spring and a hard summer. Tomatoes should be established before the long heat sets in. In valley gardens, planting too late can mean the plant is still small when 100 degree days arrive.

Coastal and foothill gardeners may have cooler nights and a later start. Valley gardeners usually fight heat more than frost once spring is over. Check your own microclimate before copying another garden's dates.`,

      zone9Notes: `In Zone 9b, tomato transplants often go out from late March to mid-April. A second small planting of quick cherry tomatoes can go in during late summer if you have water and shade, but spring planting is the main crop.

First frost may not arrive until late fall or early winter, so healthy indeterminate plants can keep producing for months.`,

      wateringConsiderations: `Tomatoes need consistent water, especially from flowering through harvest. In clay soil, water longer but less often. In sandy soil, water more often. Do not let the root zone go bone dry, then flood it. That pattern causes stress and fruit problems.`,

      heatConsiderations: `Use mulch, steady drip irrigation, and shade cloth during extreme heat. Blossom drop is common during hot spells. Do not overfertilize with nitrogen to fix it. The plant needs cooler weather, not more leaf growth.`,

      checklist: [
        'Start seeds indoors 6 to 8 weeks before transplanting',
        'Transplant after soil warms and frost danger has passed',
        'Plant deep and remove lower leaves',
        'Install strong support at planting',
        'Mulch after soil warms',
        'Water deeply and consistently',
        'Prune lower leaves and crowded growth',
        'Use shade cloth during severe heat',
        'Harvest before fruit overripens on the vine',
      ],

      relatedSlugs: [
        'seed-starting-instructions',
        'companion-planting',
        'tomato-growth-habit',
        'tomato-pepper-spray-program',
        'common-plant-diseases',
      ],

      sources: [
        {
          title: 'Know Your Growing Zone',
          author: 'Shaggy Ink Farms',
          url: '/learn/know-your-growing-zone',
        },
        {
          title: 'Family Food Security Garden Planner',
          author: 'Shaggy Ink Farms',
          url: '/garden-planner',
        },
        {
          title: 'Tomatoes in the Home Garden',
          author: 'UC Agriculture and Natural Resources',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Tomato Growing Guide',
          author: "Johnny's Selected Seeds Growing Library",
          url: 'https://www.johnnyseeds.com/growers-library/',
        },
      ],
    },
  },

  {
    slug: 'growing-cucumbers-northern-california',
    title: 'Growing Cucumbers in Northern California',
    shortTitle: 'Cucumbers',
    description:
      'How to grow crisp cucumbers through Northern California heat with good timing, trellising, irrigation, and pest scouting.',
    category: 'Crop-Specific',
    status: 'published',
    readingTimeMinutes: 9,
    lastUpdated: '2026-06-17',
    keywords: [
      'growing cucumbers northern california',
      'cucumber planting dates',
      'trellising cucumbers',
      'cucumber irrigation',
    ],
    content: {
      introduction: `Cucumbers grow fast, but they are not as tough as they look. In Northern California, they can sprint from seed to harvest, then crash when heat, dry soil, mites, mildew, or cucumber beetles pile on.

The trick is to plant when the soil is warm, give the vines steady water, keep fruit picked, and watch the leaves. A cucumber patch can go from perfect to bitter and tired in a week if it dries out during a heat wave.

At Shaggy Ink Farms, cucumbers are a practical summer crop. They earn their space when they are trellised, watered well, and picked often.`,

      whoThisIsFor: `This guide is for gardeners who want slicing cucumbers, pickling cucumbers, or fresh cucumbers for family meals. It is written for hot Northern California gardens where summer water and shade matter.

It is also useful if your cucumber plants start strong but turn bitter, stop producing, or get dusty-looking leaves in midsummer.`,

      bestTime: `Direct sow cucumbers after the soil is warm, usually April through May in inland Zone 9 gardens. Soil should be at least 60 degrees, with 70 degrees better for quick sprouting.

For a longer harvest, plant a second round 3 to 4 weeks later. In very hot areas, a late summer planting can work if you can protect seedlings from heat and keep them watered.`,

      toolsAndSupplies: [
        'Cucumber seed or healthy transplants',
        'Compost',
        'Trellis, cattle panel, netting, or strong stakes',
        'Drip irrigation or soaker hose',
        'Mulch',
        'Pruners or scissors for harvest',
        'Insect netting for young plants if beetles are a problem',
      ],

      steps: [
        {
          title: 'Pick the right cucumber type',
          body: `Slicing cucumbers are best for fresh eating. Pickling cucumbers are shorter, firm, and better for jars. Armenian cucumbers handle heat well and are worth trying in hot valley gardens, even though they are technically melons.

Look for disease resistance if powdery mildew has been a problem in your garden. A resistant variety does not make the plant bulletproof, but it can buy you more harvest time.`,
        },
        {
          title: 'Plant in warm soil',
          body: `Cucumber seed rots or sits still in cold soil. Wait until the soil is warm and nights are mild.

Direct sow seeds 1 inch deep. Plant 2 to 3 seeds per spot, then thin to the strongest plant. If using transplants, handle roots gently. Cucumbers do not like rough transplanting.

Use /learn/know-your-growing-zone to check your local timing, then plan spacing and harvest goals in /garden-planner before you plant too many vines.`,
        },
        {
          title: 'Use a trellis if you can',
          body: `Trellising cucumbers saves space, improves airflow, and keeps fruit straighter and cleaner. A cattle panel arch, vertical netting, or a strong fence panel can all work.

Set the trellis before or at planting. Do not try to untangle large vines later. Guide young vines toward the support and let tendrils do the rest.

Bush cucumbers can grow on the ground, but even they benefit from mulch and open airflow.`,
        },
        {
          title: 'Feed lightly but steadily',
          body: `Cucumbers like fertile soil, but too much nitrogen gives you giant vines with fewer flowers. Mix compost into the bed before planting.

Once vines begin to run, feed with a balanced organic fertilizer or compost tea if growth looks pale. Do not keep pouring on nitrogen after vines are lush.`,
        },
        {
          title: 'Water before stress shows',
          body: `Cucumbers are mostly water. If the plant wilts hard every afternoon, fruit quality will drop. Bitter cucumbers often come from stress, especially heat and uneven moisture.

Use drip irrigation at the base of the plants. Keep leaves dry when possible. Mulch once seedlings are established.

During hot spells, check soil moisture with your finger under the mulch. The surface can look dry while the root zone is fine, or the top can look damp while roots are dry.`,
        },
        {
          title: 'Scout for pests and mildew',
          body: `Check the underside of leaves every few days. Cucumber beetles chew leaves and can spread disease. Spider mites make leaves look dusty or speckled. Aphids gather on tender growth.

Powdery mildew usually shows as white patches on leaves later in the season. Improve airflow, avoid overhead watering, and remove badly infected leaves.

Young plants can be protected with insect netting, but remove covers when flowers appear so pollinators can reach them.`,
        },
        {
          title: 'Harvest often',
          body: `Pick cucumbers young and often. A vine with oversized yellow fruit thinks its job is done and slows down.

Use scissors or pruners instead of yanking fruit off the vine. Harvest every day or two once production starts.

If fruit tastes bitter, peel the stem end first. If the whole cucumber is bitter, the plant was likely heat or water stressed.`,
        },
      ],

      commonMistakes: [
        {
          mistake: 'Planting before soil is warm',
          fix: 'Wait until soil is at least 60 degrees. Warm soil gives fast germination and stronger plants.',
        },
        {
          mistake: 'Letting vines dry out between waterings',
          fix: 'Use drip irrigation, mulch, and regular soil checks. Cucumbers need steady moisture.',
        },
        {
          mistake: 'Leaving mature fruit on the vine',
          fix: 'Pick every day or two. Overgrown cucumbers slow new production.',
        },
        {
          mistake: 'Keeping row cover on after flowering starts',
          fix: 'Remove insect netting when flowers open unless you are hand pollinating.',
        },
        {
          mistake: 'Planting too many vines without a trellis',
          fix: 'Use vertical support or reduce plant count. Tangled ground vines are harder to water, harvest, and inspect.',
        },
      ],

      northernCaliforniaNotes: `Cucumbers like heat, but they do not like dry heat without water. Inland Northern California gardens can produce excellent cucumbers in late spring and early summer, then struggle in the hottest part of July and August.

A second planting can work, but only if seedlings are protected from severe heat. Morning sun with afternoon shade can help in the hottest valleys.`,

      zone9Notes: `In Zone 9b, direct sow cucumbers from April into May. A second planting in June may work if water is steady. For a fall try, sow in late July or early August and use shade cloth while seedlings are small.

Cucumbers grow quickly, so even a short window can produce food if the plants do not get stressed early.`,

      wateringConsiderations: `Keep cucumber roots evenly moist. Drip irrigation under mulch is the best setup. In hot weather, shallow-rooted cucumber plants may need more frequent watering than tomatoes. Avoid overhead watering late in the day because wet leaves overnight can increase disease pressure.`,

      heatConsiderations: `During heat waves above 100 degrees, cucumber leaves may wilt even with moist soil. If they recover by evening, the plant is coping. If they stay wilted, water is not reaching the root zone. Use shade cloth for young plants during extreme heat.`,

      checklist: [
        'Wait for warm soil before planting',
        'Choose slicer, pickling, or heat-tolerant Armenian types',
        'Install trellis before vines run',
        'Direct sow or transplant gently',
        'Mulch after seedlings establish',
        'Water evenly with drip irrigation',
        'Remove covers once flowers open',
        'Scout for beetles, mites, aphids, and mildew',
        'Harvest every day or two',
      ],

      relatedSlugs: [
        'companion-planting',
        'seed-starting-instructions',
        'pest-control-comparison',
        'common-plant-diseases',
        'warm-season-cover-crops',
      ],

      sources: [
        {
          title: 'Know Your Growing Zone',
          author: 'Shaggy Ink Farms',
          url: '/learn/know-your-growing-zone',
        },
        {
          title: 'Family Food Security Garden Planner',
          author: 'Shaggy Ink Farms',
          url: '/garden-planner',
        },
        {
          title: 'Cucumbers in the Home Garden',
          author: 'UC Agriculture and Natural Resources',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Cucumber Growing Guide',
          author: "Johnny's Selected Seeds Growing Library",
          url: 'https://www.johnnyseeds.com/growers-library/',
        },
      ],
    },
  },

  {
    slug: 'growing-sunflowers-cut-flowers',
    title: 'Growing Sunflowers for Cut Flowers',
    shortTitle: 'Cut Sunflowers',
    description:
      'How to grow sunflowers for cutting, bouquets, and farm stand bunches with good stems, clean blooms, and steady timing.',
    category: 'Crop-Specific',
    status: 'published',
    readingTimeMinutes: 9,
    lastUpdated: '2026-06-17',
    keywords: [
      'growing sunflowers for cut flowers',
      'cut flower sunflowers',
      'sunflower planting dates',
      'sunflower irrigation',
    ],
    content: {
      introduction: `Sunflowers fit the Shaggy Ink Farms style: bright, useful, tough, and a little bold. They are simple to grow, but growing them well for cut flowers takes more planning than tossing seed along a fence.

For bouquets, you want straight stems, clean petals, good vase life, and blooms ready over several weeks. That means choosing the right type, planting in successions, spacing correctly, and cutting at the right stage.

Northern California gives sunflowers plenty of heat and light. The work is keeping them watered, upright, and harvested before the blooms get too old.`,

      whoThisIsFor: `This guide is for gardeners, homesteads, and small farms that want sunflowers for bouquets, farm stand bunches, gifts, or kitchen table flowers.

It is also useful if you have grown giant sunflowers before but ended up with stems too thick, flowers too large, or blooms that dropped pollen all over the house.`,

      bestTime: `Direct sow sunflowers after frost danger has passed and soil has warmed. In Zone 9b Northern California, start sowing in March or April.

For cut flowers, sow small batches every 10 to 14 days from spring into early summer. This gives you waves of blooms instead of one big flush.`,

      toolsAndSupplies: [
        'Pollenless or low-pollen sunflower seed for cutting',
        'Compost',
        'Drip irrigation or soaker hose',
        'Flower netting, stakes, or support twine',
        'Mulch',
        'Clean harvest bucket',
        'Sharp snips or pruners',
        'Shade cloth for young seedlings during extreme heat',
      ],

      steps: [
        {
          title: 'Choose cut flower varieties',
          body: `Not all sunflowers are good cut flowers. Giant seed types are fun, but they often make huge heads and thick stems that do not fit bouquets.

For cutting, look for pollenless or low-pollen varieties. They are cleaner indoors and often have better vase life. Single-stem types make one main flower per plant. Branching types make several smaller blooms over time.

Good bouquet colors include yellow, gold, lemon, orange, bronze, and soft cream. Plant a mix if you want bunches that look less like grocery store flowers and more like a farm table.`,
        },
        {
          title: 'Plan successions before planting',
          body: `Sunflowers bloom fast and then they are done. If you plant one big patch, you get one big harvest window.

For cut flowers, plant a short row every 10 to 14 days. Stop or slow planting when the forecast points toward extreme summer heat unless you can irrigate well.

Use /garden-planner to map how many row feet you can spare. Use /learn/know-your-growing-zone to check your frost and heat timing before you start the first round.`,
        },
        {
          title: 'Direct sow into warm soil',
          body: `Sunflowers prefer direct sowing. Plant seeds about 1 inch deep in warm soil. Keep the bed moist until germination.

For single-stem cut sunflowers, close spacing makes thinner, more useful stems. Space plants 6 to 9 inches apart. For branching types, give more room, usually 12 to 18 inches.

Protect seedlings from birds, slugs, earwigs, and cutworms. A sunflower seedling can disappear overnight.`,
        },
        {
          title: 'Support the crop before stems stretch',
          body: `Cut flower sunflowers should be straight. Wind and uneven water can bend stems.

In a small garden, stakes and twine may be enough. In a larger patch, use flower netting stretched above the bed while plants are young. They will grow through it.

Do not wait until plants are leaning. Support is much easier before the stems get tall.`,
        },
        {
          title: 'Water for steady growth',
          body: `Sunflowers are drought tolerant once established, but cut flower quality is better with steady water. Dry stress can shorten stems, reduce bloom size, and make plants finish too fast.

Use drip irrigation at the base. Avoid frequent overhead watering once buds form. Wet petals and leaves can lead to spotting and disease.

Mulch helps keep the root zone cooler in hot areas.`,
        },
        {
          title: 'Cut at the right stage',
          body: `For best vase life, cut sunflowers when petals just begin to lift from the center. The bloom should not be fully open yet.

Cut early in the morning when stems are hydrated. Strip leaves that will sit below the water line. Put stems into clean water right away.

For branching types, cut the main flower first and keep harvesting side stems as they open.`,
        },
        {
          title: 'Handle heat and harvest windows',
          body: `In hot Northern California weather, sunflowers can move from tight bud to too open very fast. During bloom season, check plants every morning.

If a heat wave is coming, cut blooms a little earlier than normal. They can open in the bucket or vase. Waiting too long gives you tired flowers and shorter vase life.

Succession planting is the real secret. One planting is a nice patch. Repeated plantings are a cut flower crop.`,
        },
      ],

      commonMistakes: [
        {
          mistake: 'Growing giant seed sunflowers for bouquets',
          fix: 'Choose pollenless or low-pollen cut flower varieties with smaller heads and better stems.',
        },
        {
          mistake: 'Planting everything on one day',
          fix: 'Sow every 10 to 14 days for a steady harvest instead of one short bloom window.',
        },
        {
          mistake: 'Spacing plants too far apart for single-stem cuts',
          fix: 'Use closer spacing, about 6 to 9 inches, for thinner bouquet stems.',
        },
        {
          mistake: 'Cutting flowers fully open',
          fix: 'Cut when petals just start to lift. Fully open blooms have shorter vase life.',
        },
        {
          mistake: 'Letting young plants dry out',
          fix: 'Keep soil evenly moist until plants are established. Drought stress early can shorten stems.',
        },
      ],

      northernCaliforniaNotes: `Sunflowers handle Northern California sun better than many flowers, but cut flower quality still depends on water. In valley heat, dry plants may survive but produce shorter stems and rougher blooms.

Spring and early summer plantings are usually the easiest. Mid-summer plantings can work with drip irrigation, mulch, and close attention. Smoke, hot wind, and long heat waves can shorten vase life.`,

      zone9Notes: `In Zone 9b, start direct sowing in March or April after frost danger drops. Continue successions into June if you have water. Later plantings may bloom fast and short during peak heat.

For fall flowers, a late summer sowing can work, but seedlings need protection from heat until they are established.`,

      wateringConsiderations: `Give sunflowers steady water from germination through bloom. Deep watering builds stronger stems. Drip lines are better than sprinklers for cut flowers because dry leaves and petals stay cleaner.`,

      heatConsiderations: `Sunflowers tolerate heat, but bloom timing speeds up during hot spells. Harvest earlier in the morning and cut before flowers are fully open. Use shade cloth only for young seedlings during extreme heat, not over mature plants unless they are wilting badly.`,

      checklist: [
        'Choose pollenless or low-pollen cut flower varieties',
        'Direct sow after frost danger and warm soil',
        'Plant a new batch every 10 to 14 days',
        'Use closer spacing for single-stem bouquet sunflowers',
        'Install support before stems get tall',
        'Water steadily with drip irrigation',
        'Scout seedlings for chewing pests',
        'Cut when petals just begin to open',
        'Harvest early in the morning into clean water',
      ],

      relatedSlugs: [
        'seed-starting-instructions',
        'companion-planting',
        'spring-garden-layout',
        'warm-season-cover-crops',
        'low-sunlight-vegetables',
      ],

      sources: [
        {
          title: 'Know Your Growing Zone',
          author: 'Shaggy Ink Farms',
          url: '/learn/know-your-growing-zone',
        },
        {
          title: 'Family Food Security Garden Planner',
          author: 'Shaggy Ink Farms',
          url: '/garden-planner',
        },
        {
          title: 'Sunflower Production',
          author: 'UC Agriculture and Natural Resources',
          url: 'https://ucanr.edu/',
        },
        {
          title: 'Sunflower Growing Guide',
          author: "Johnny's Selected Seeds Growing Library",
          url: 'https://www.johnnyseeds.com/growers-library/',
        },
      ],
    },
  },

  // ── COMING SOON GUIDES ──────────────────────────────────────────────────────
  // TODO: Write full content for each of the following guides.
  // Structure mirrors the published guides above.

  {
    slug: 'crop-rotation',
    title: 'Crop Rotation Guide',
    shortTitle: 'Crop Rotation',
    description:
      'Why rotating plant families between beds reduces disease, manages pests, and improves soil fertility over time. Practical rotation plans for small gardens.',
    category: 'Planning & Layout',
    status: 'coming-soon',
    readingTimeMinutes: 10,
    lastUpdated: '2025-06-01',
    keywords: ['crop rotation', 'vegetable crop rotation', 'garden rotation plan', 'rotating plant families'],
  },

  {
    slug: 'preserving-your-harvest',
    title: 'Preserving Your Garden Harvest',
    shortTitle: 'Preserving Harvest',
    description:
      'Canning, freezing, dehydrating, and root cellar storage — when and how to use each method to extend the usefulness of your garden harvest through the year.',
    category: 'Food Preservation',
    status: 'coming-soon',
    readingTimeMinutes: 15,
    lastUpdated: '2025-06-01',
    keywords: ['preserving garden harvest', 'canning vegetables', 'freezing vegetables', 'food preservation homestead'],
  },

  {
    slug: 'fertilizer-injector-guide',
    title: 'Fertilizer Injector Guide',
    shortTitle: 'Fertilizer Injectors',
    description:
      'How to use a fertilizer injector (Mazzei, Dosatron) with drip irrigation to fertligate vegetables and fruit trees efficiently in hot, dry climates.',
    category: 'Soil & Fertility',
    status: 'coming-soon',
    readingTimeMinutes: 12,
    lastUpdated: '2025-06-01',
    keywords: ['fertilizer injector', 'fertigation', 'drip irrigation fertilizer', 'Dosatron vegetable garden'],
  },

  {
    slug: 'family-garden-planner-guide',
    title: 'Family Garden Planner Guide',
    shortTitle: 'Garden Planner Guide',
    description:
      'How to use the Shaggy Ink Farms Family Food Security Garden Planner — setting your zone, entering family members, selecting crops, and reading your planting plan.',
    category: 'Planning & Layout',
    status: 'coming-soon',
    readingTimeMinutes: 8,
    lastUpdated: '2025-06-01',
    keywords: ['garden planner guide', 'food security garden', 'family garden planning', 'how many plants to grow'],
  },

  {
    slug: 'spring-garden-layout',
    title: 'Spring Garden Layout Guide',
    shortTitle: 'Spring Garden Layout',
    description:
      'How to design a productive spring garden — bed placement, path width, irrigation before planting, and timing cool-season crops to avoid late heat.',
    category: 'Planning & Layout',
    status: 'coming-soon',
    readingTimeMinutes: 10,
    lastUpdated: '2025-06-01',
    keywords: ['spring garden layout', 'vegetable garden design', 'raised bed layout', 'garden bed planning'],
  },

  {
    slug: 'low-sunlight-vegetables',
    title: 'Low-Sunlight Vegetables Guide',
    shortTitle: 'Low-Light Vegetables',
    description:
      'Which vegetables grow in partial shade — and how much shade is too much. Practical varieties and placement for gardens with less than full sun.',
    category: 'Planting Methods',
    status: 'coming-soon',
    readingTimeMinutes: 9,
    lastUpdated: '2025-06-01',
    keywords: ['vegetables that grow in shade', 'partial shade vegetable garden', 'low light vegetables', 'shade tolerant crops'],
  },

  {
    slug: 'pest-control-comparison',
    title: 'Pest Control Comparison Guide',
    shortTitle: 'Pest Control',
    description:
      'Comparing organic and conventional pest control options for common vegetable garden pests — aphids, whiteflies, spider mites, squash bugs, and more.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 13,
    lastUpdated: '2025-06-01',
    keywords: ['organic pest control vegetables', 'aphid control garden', 'squash bug control', 'vegetable pest management'],
  },

  {
    slug: 'warm-season-cover-crops',
    title: 'Warm Season Cover Crops Guide',
    shortTitle: 'Summer Cover Crops',
    description:
      'Cover crops that grow in summer heat — cowpeas, sorghum-sudangrass, sunn hemp, and buckwheat. How to use them to build soil while beds rest.',
    category: 'Soil & Fertility',
    status: 'coming-soon',
    readingTimeMinutes: 10,
    lastUpdated: '2025-06-01',
    keywords: ['summer cover crops', 'warm season cover crops', 'cowpea cover crop', 'cover crops zone 9'],
  },

  {
    slug: 'cool-season-cover-crops',
    title: 'Cool Season Cover Crops Guide',
    shortTitle: 'Winter Cover Crops',
    description:
      'Cover crops for fall and winter — crimson clover, cereal rye, bell beans, and Austrian winter peas. Timing and termination for California growing conditions.',
    category: 'Soil & Fertility',
    status: 'coming-soon',
    readingTimeMinutes: 10,
    lastUpdated: '2025-06-01',
    keywords: ['winter cover crops', 'cool season cover crops', 'crimson clover', 'cover crops northern california'],
  },

  {
    slug: 'tomato-pepper-spray-program',
    title: 'Tomato & Pepper Spray Program',
    shortTitle: 'Tomato Spray Program',
    description:
      'A preventive and responsive spray program for tomatoes and peppers — covering early blight, Septoria leaf spot, bacterial speck, and common foliar pests.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 11,
    lastUpdated: '2025-06-01',
    keywords: ['tomato spray program', 'tomato blight prevention', 'pepper disease control', 'early blight tomatoes'],
  },

  {
    slug: 'fruit-tree-spray-program',
    title: 'Fruit Tree Spray Program',
    shortTitle: 'Fruit Tree Sprays',
    description:
      'Dormant season, bloom, and growing season spray programs for backyard fruit trees — apples, peaches, plums, and citrus in Northern California.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 12,
    lastUpdated: '2025-06-01',
    keywords: ['fruit tree spray program', 'dormant oil spray', 'peach leaf curl prevention', 'backyard orchard disease control'],
  },

  {
    slug: 'sweet-corn-beans-spray-program',
    title: 'Sweet Corn & Beans Spray Program',
    shortTitle: 'Corn & Beans Spray',
    description:
      'Managing corn earworm, European corn borer, and common bean diseases. Spray timing around silking and pod set for effective, minimal-input pest management.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 9,
    lastUpdated: '2025-06-01',
    keywords: ['corn earworm control', 'bean disease management', 'sweet corn spray program', 'bean rust control'],
  },

  {
    slug: 'nutrient-deficiency-guide',
    title: 'Nutrient Deficiency Guide',
    shortTitle: 'Nutrient Deficiencies',
    description:
      'How to identify and correct the most common nutrient deficiencies in vegetable gardens — nitrogen, iron, magnesium, calcium, and micronutrients.',
    category: 'Soil & Fertility',
    status: 'coming-soon',
    readingTimeMinutes: 11,
    lastUpdated: '2025-06-01',
    keywords: ['plant nutrient deficiency', 'yellow leaves vegetables', 'nitrogen deficiency plants', 'iron deficiency garden'],
  },

  {
    slug: 'squash-variety-guide',
    title: 'Squash Variety Guide',
    shortTitle: 'Squash Varieties',
    description:
      'Summer squash, winter squash, and pumpkin varieties worth growing — flavor, yield, heat tolerance, and storage characteristics compared for home garden use.',
    category: 'Crop-Specific',
    status: 'coming-soon',
    readingTimeMinutes: 10,
    lastUpdated: '2025-06-01',
    keywords: ['squash varieties', 'best summer squash', 'winter squash varieties', 'pumpkin varieties for eating'],
  },

  {
    slug: 'common-plant-diseases',
    title: 'Common Plant Diseases Guide',
    shortTitle: 'Plant Diseases',
    description:
      'Identifying and managing the most common vegetable garden diseases — powdery mildew, early blight, damping off, bacterial wilt, and mosaic viruses.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 13,
    lastUpdated: '2025-06-01',
    keywords: ['vegetable garden diseases', 'powdery mildew treatment', 'early blight tomatoes', 'plant disease identification'],
  },

  {
    slug: 'seed-starting-chart',
    title: 'Seed Starting Chart',
    shortTitle: 'Seed Starting Chart',
    description:
      'A printable seed starting chart with start dates, germination temperatures, days to transplant, and transplant dates for 30+ crops in Zones 7–10.',
    category: 'Planting Methods',
    status: 'coming-soon',
    readingTimeMinutes: 5,
    lastUpdated: '2025-06-01',
    keywords: ['seed starting chart', 'seed starting schedule', 'when to start seeds indoors', 'seed starting dates zone 9'],
  },

  {
    slug: 'tomato-growth-habit',
    title: 'Tomato Growth Habit Guide',
    shortTitle: 'Tomato Growth Habit',
    description:
      'Determinate vs. indeterminate tomatoes — what the difference means for cage size, pruning, succession planting, and overall garden management.',
    category: 'Crop-Specific',
    status: 'coming-soon',
    readingTimeMinutes: 8,
    lastUpdated: '2025-06-01',
    keywords: ['determinate vs indeterminate tomatoes', 'tomato pruning', 'tomato growth habit', 'indeterminate tomato varieties'],
  },

  {
    slug: 'fungicide-comparison',
    title: 'Fungicide Comparison Guide',
    shortTitle: 'Fungicide Comparison',
    description:
      'Organic and synthetic fungicide options for vegetable gardens — copper, sulfur, neem, chlorothalonil, and biologicals compared by disease, use restrictions, and reentry intervals.',
    category: 'Pest & Disease',
    status: 'coming-soon',
    readingTimeMinutes: 11,
    lastUpdated: '2025-06-01',
    keywords: ['organic fungicide vegetables', 'copper fungicide garden', 'sulfur fungicide', 'neem oil disease control'],
  },

];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getGuideBySlug(slug: string): GrowingGuide | undefined {
  return GROWING_GUIDES.find((g) => g.slug === slug);
}

export function getPublishedGuides(): GrowingGuide[] {
  return GROWING_GUIDES.filter((g) => g.status === 'published');
}

export function getGuidesByCategory(category: GuideCategory): GrowingGuide[] {
  return GROWING_GUIDES.filter((g) => g.category === category);
}

export function getRelatedGuides(slugs: string[]): GrowingGuide[] {
  return slugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GrowingGuide => g !== undefined);
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  'Planting Methods',
  'Soil & Fertility',
  'Pest & Disease',
  'Planning & Layout',
  'Crop-Specific',
  'Season Extension',
  'Food Preservation',
];
