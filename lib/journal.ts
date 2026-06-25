import { farmImages } from "@/lib/images";
import { absoluteUrl, siteConfig } from "@/lib/site";

type JournalBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

type SourceNote = {
  label: string;
  url?: string;
};

export type JournalContentType = "Journal" | "Article" | "Entry";

export type JournalArticle = {
  slug: string;
  legacySlugs?: string[];
  title: string;
  seoTitle?: string;
  dek: string;
  excerpt: string;
  metaDescription?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  contentType?: JournalContentType;
  tags?: string[];
  image: {
    src: string;
    alt: string;
  };
  content: JournalBlock[];
  sourceNotes?: SourceNote[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "welcome-to-shaggy-ink-farms",
    title: "Welcome to Shaggy Ink Farms",
    dek: "A first field note on family, oak pasture, a mixed laying flock, Barred Rock breeding work, and the long work of building a Northern California homestead from the ground up.",
    excerpt:
      "The opening note from Shaggy Ink Farms: why we started, what we are building, and how chickens, eggs, gardens, flowers, orchard work, projects, and YouTube fit into the family homestead ahead.",
    publishedAt: "2026-06-11",
    author: siteConfig.name,
    category: "Farm Journal",
    contentType: "Entry",
    tags: ["Family", "Farm Build", "Garden", "Poultry"],
    image: farmImages.oakPasture,
    content: [
      {
        type: "paragraph",
        text: "Welcome to Shaggy Ink Farms. If you are finding us at the beginning, that is the best place to arrive. The fences are still being improved, the systems are still being tuned, the flock is still teaching us, and the farm is becoming itself one project at a time. We are a Northern California family homestead set among mature oak trees and open pastureland, with a mixed laying flock now and a Heritage Plymouth Barred Rock breeding program being built slowly.",
      },
      {
        type: "paragraph",
        text: "We started this farm because we wanted our daily life to have more weight to it. Not heavier in the sense of burden, but heavier in the sense of meaning. We wanted our children to grow up close to chores that mattered, seasons that could not be rushed, animals that required attention, and land that asked for patience. We wanted work that left evidence: a better gate, a stronger coop, a full egg basket, a garden bed ready for rain, a child who knows how to notice tracks near the fence line.",
      },
      {
        type: "paragraph",
        text: "There is a particular kind of hope in building from the ground up. It is not polished hope. It comes with mud, mistakes, receipts, and late evenings. But it is real. Every small improvement changes the shape of the place. Every decision becomes part of the next decision. Where should the chickens be safest? How does the afternoon sun move through the oaks? Which project needs to happen before winter? What can be made, repaired, reused, or learned before we buy something new?",
      },
      {
        type: "heading",
        text: "Family First, Farm Second, Story Always",
      },
      {
        type: "paragraph",
        text: "Shaggy Ink Farms is a family homestead before it is anything else. That matters because the farm has to serve real life. It has to make room for school days, meals, chores, birthdays, tired evenings, new ideas, and the ordinary rhythm of a family trying to build something honest. The work is not separate from family life. It is woven through it.",
      },
      {
        type: "paragraph",
        text: "That is also why we are keeping a record of the work. A homestead has a thousand small stories, and most of them are easy to lose if nobody writes them down. The first egg from a young hen. The first time a child confidently carries feed. The first storm that tests a roofline. The first version of a label that finally feels right. The first video that turns a regular chore into something useful for somebody else.",
      },
      {
        type: "paragraph",
        text: "We want Shaggy Ink Farms to feel personal and honest. The aim is simple: take good care of the place, raise useful birds, grow food and flowers, teach the kids real work, and share enough of the process that people can follow along without us pretending the farm is finished.",
      },
      {
        type: "heading",
        text: "Why Northern California Shapes the Farm",
      },
      {
        type: "paragraph",
        text: "Northern California shapes this place. Mature oaks, dry grass, warm light, wildlife edges, weathered fence posts, and wide pastureland are not background decoration. They are daily conditions. We are not trying to copy a generic farm postcard. We are building from the land we have, the climate we live in, and the rural character of this part of California.",
      },
      {
        type: "paragraph",
        text: "The oaks slow everything down in the best way. They make you look up. They mark the seasons. They hold shade in summer and shape the way a pasture feels at golden hour. Mule deer moving through the edge of the property, chickens scratching near a fence, and the long line of an evening shadow are part of the place because we see them every day.",
      },
      {
        type: "paragraph",
        text: "We want the farm to reflect a conservation-minded respect for that setting. That does not mean pretending to have everything figured out. It means paying attention. It means making choices that protect animals, improve systems, reduce waste where we can, and keep the land in mind when we make plans. A homestead is never just a collection of projects. It is a relationship with a place.",
      },
      {
        type: "heading",
        text: "The Chickens That Started the Pattern",
      },
      {
        type: "paragraph",
        text: "Our long-term poultry focus is the Heritage Plymouth Barred Rock chicken. There are practical reasons for that choice, and there are emotional ones. Barred Rocks are a classic American farm breed: useful, sturdy, familiar, and beautiful in a way that feels earned. At the same time, our laying flock is mixed, with Rhode Island Reds, Salmon Faverolles, Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks, and other birds all part of the current farm rhythm.",
      },
      {
        type: "paragraph",
        text: "But a good chicken is more than a logo. The flock creates daily rhythm. Feeding, watering, checking birds, watching behavior, collecting eggs, improving housing, and learning the needs of individual birds all turn an idea of a farm into actual husbandry. Chickens are a beginning that keeps beginning. They are accessible enough for a family to start with and serious enough to reward deep study.",
      },
      {
        type: "paragraph",
        text: "The Barred Rocks also connect us to a wider American farm history. They remind us that poultry was once bred for families, small farms, local food, and practical resilience. As Shaggy Ink Farms grows, we want to honor that history carefully. We will be clear about what we know, honest about what we are still learning, and respectful of the breeders and conservationists who have done the long work before us.",
      },
      {
        type: "heading",
        text: "Building the Homestead in Public",
      },
      {
        type: "paragraph",
        text: "A lot of what we are building will happen in layers. First come the essential systems: safe coops, better fencing, feed storage, water routines, predator awareness, seasonal egg handling, and record keeping. Alongside that come the gardens, cut flowers, strawberries, orchard trees, field notes, photography, video, and small farm goods if they fit the real work of the place.",
      },
      {
        type: "paragraph",
        text: "We are especially excited about YouTube because video can show the honest middle of a project. A finished coop looks clean in a photograph, but a video can show the wrong measurement, the second trip for hardware, the reason we changed a detail, and the family conversation that happened while the work was getting done. That kind of record is useful. It also keeps us accountable to the real version of the farm.",
      },
      {
        type: "paragraph",
        text: "Eggs will be seasonal and small-flock by nature. We are not building an industrial egg operation. We are building trust around a limited product that comes from living birds, real weather, daylight, molts, feed, and care. When eggs are available, we want them to feel connected to the place they came from: the flock, the pasture, the carton, the note in the box, and the family work behind it.",
      },
      {
        type: "paragraph",
        text: "Projects will be part of the story too. Coops, fencing, garden beds, labels, workbench repairs, seasonal improvements, and small handmade goods all belong here. Some projects will be practical. Some will be beautiful. The best ones will be both. We want the farm to carry a sense of craftsmanship that feels more like a well-used field journal than a showroom.",
      },
      {
        type: "heading",
        text: "What Comes Next",
      },
      {
        type: "paragraph",
        text: "The future plan is simple in direction and large in scope: care for the flock, build the Barred Rock program carefully, grow food for the family, establish flowers, strawberries, and orchard trees, offer seasonal eggs when we have them, and make videos and articles that tell the truth about the process.",
      },
      {
        type: "paragraph",
        text: "If you are here early, thank you. We are not asking you to believe in a finished thing. We are inviting you to follow the making of it: the first flock notes, the first egg updates, the first videos, the first garden wins, the first store pieces if they make sense, and the first lessons learned the hard way.",
      },
      {
        type: "paragraph",
        text: "This is the opening field note. The gate is open. Welcome to Shaggy Ink Farms.",
      },
    ],
  },
  {
    slug: "plymouth-barred-rock-heritage-genetics",
    legacySlugs: ["legacy-of-the-plymouth-barred-rock"],
    title:
      "From Good Shepherd to Our Pasture: The Heritage Genetics Behind Our Plymouth Barred Rock Flock",
    seoTitle:
      "Plymouth Barred Rock Heritage Genetics: The Frank Reese Lineage Behind Our Flock | Shaggy Ink Farms",
    dek: "Our Barred Rock breeding stock descends from Frank Reese and Good Shepherd Poultry Ranch -- a well-known Standardbred poultry line. Here's why that lineage matters.",
    excerpt:
      "Our Barred Rock breeding stock descends from Frank Reese and Good Shepherd Poultry Ranch -- a well-known Standardbred poultry line. Here's why that lineage matters.",
    metaDescription:
      "Our Barred Rock breeding stock descends from Frank Reese and Good Shepherd Poultry Ranch -- a well-known Standardbred poultry line. Here's why that lineage matters.",
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    author: siteConfig.name,
    category: "Heritage Poultry",
    contentType: "Article",
    tags: ["Poultry", "Farm Build"],
    image: farmImages.barredRockFlock,
    content: [
      {
        type: "paragraph",
        text: "There is a hen at the far end of our pasture who does not know what she is.",
      },
      {
        type: "paragraph",
        text: "She is working a seam of overturned ground near the fence line, the way Barred Rocks have worked ground for a hundred and fifty years -- head down, deliberate, unbothered by us. The morning light comes in low across the oaks and catches the barring on her back, that black-and-white ladder of feather that any farm kid in 1910 would have recognized on sight. She is, by every appearance, an ordinary American chicken.",
      },
      {
        type: "paragraph",
        text: "She is not ordinary. The genetics moving through her body trace back to a small ranch in Lindsborg, Kansas, and to a man who has spent roughly half a century doing one of the most difficult and least celebrated jobs in American agriculture: keeping old birds old. Keeping them true. Refusing, year after year, to let them become something easier and emptier than what they were bred to be.",
      },
      {
        type: "paragraph",
        text: "This is the story of that hen -- where she comes from, why it took us a long time to be able to say it honestly, and why we now believe a small family homestead has a real, if modest, part to play in keeping a living line of American poultry alive.",
      },
      {
        type: "quote",
        text: "There is a hen at the far end of our pasture who does not know what she is. The farm does. That is the whole point.",
      },
      {
        type: "heading",
        text: "The Plymouth Rock: An American Breed Built for Real Farms",
      },
      {
        type: "paragraph",
        text: "The Plymouth Rock did not arrive from anywhere fashionable. It was built, piece by piece, by working people in nineteenth-century New England who needed a bird that earned its keep.",
      },
      {
        type: "paragraph",
        text: "The history is gloriously imperfect. A bird called the Plymouth Rock was first exhibited in Boston in 1849, then promptly lost its identity and disappeared from the record for two decades, before reappearing -- recognizably itself this time -- at a poultry show in Worcester, Massachusetts, in 1869. Those later Worcester birds are the true ancestors of the Plymouth Rocks we keep today. Several men claimed credit for inventing the breed, working from crosses that likely included Dominiques, Black Javas, Cochins, Brahmas, and Spanish chickens. No single origin survives the scrutiny. The breed came together the way most good farm animals did: through a lot of people, over a lot of seasons, all selecting for a bird that worked.",
      },
      {
        type: "paragraph",
        text: "In 1874 the American Poultry Association admitted the Plymouth Rock into its Standard, and that date matters more than it looks. Standardization is what turned a scattering of regional barred birds into a breed -- a defined ideal of type, size, carriage, and color that a breeder in Vermont and a breeder in Ohio could both aim at and recognize. The original Plymouth Rock was barred, which is why, within the larger Plymouth Rock family, the Barred Rock carries a kind of founding authority. It was the first. The other colors came after.",
      },
      {
        type: "paragraph",
        text: "What made the breed iconic was not its looks, though the looks helped. It was that the Barred Rock was a complete farm animal in an age when completeness was the whole point. It laid a respectable number of brown eggs. It carried enough body to matter at the table. It foraged. It went broody and raised its own chicks. It tolerated cold and damp and the ordinary chaos of a family farmyard. It was calm enough for children to handle and hardy enough to survive a New England winter in a drafty coop. Before the Second World War, the Barred Rock was very nearly the default American chicken -- not because anyone marketed it, but because it did everything a farm needed one bird to do.",
      },
      {
        type: "quote",
        text: "The Barred Rock was a complete farm animal in an age when completeness was the whole point.",
      },
      {
        type: "heading",
        text: 'How Industrial Poultry Changed the Breed -- and What "Recovery" Actually Measures',
      },
      {
        type: "paragraph",
        text: "Then American agriculture made a decision, and the decision was scale.",
      },
      {
        type: "subheading",
        text: "What the Shift to Hybrids Removed",
      },
      {
        type: "paragraph",
        text: "After the war, poultry stopped being a farm animal and became an industry. The single dual-purpose bird was split in two. One branch was driven relentlessly toward eggs; the other toward meat -- and that meat branch produced the Cornish Cross, the fast-growing hybrid that now fills nearly every supermarket case in the country. The Plymouth Rock was actually a foundation stone of that broiler revolution; the modern industrial chicken was built, in part, on the back of the very breed it would go on to make obsolete.",
      },
      {
        type: "paragraph",
        text: "The trade was efficiency for everything else. The modern broiler reaches slaughter weight in around six weeks, but it does so at a cost the industry rarely advertises: many of these birds can barely carry their own weight by maturity and no longer reproduce naturally at all. To get the bird, you need the system -- the breeders, the inputs, the controlled environment. Industrial selection optimized for a single number, growth rate, and in doing so quietly discarded the traits that had made the old breeds animals rather than products: the ability to mate naturally, to range outdoors and thrive, to grow slowly enough to develop sound bodies, to live long productive lives, to set a nest and mother a clutch. Those traits don't show up on a feed-conversion spreadsheet. So they were allowed to fade.",
      },
      {
        type: "subheading",
        text: 'Why "The Breed Recovered" Is the Wrong Comfort',
      },
      {
        type: "paragraph",
        text: "Here is where the honest version of the story matters, and where we have to resist the easy emotional beat.",
      },
      {
        type: "paragraph",
        text: "You will sometimes hear that the Plymouth Rock was endangered and was saved. There's truth in it. The breed did decline sharply from its prewar peak, and The Livestock Conservancy placed it on its Conservation Priority List as a breed worth watching. But in 2023 the Plymouth Rock graduated off that list. Thanks largely to the explosion of backyard chicken-keeping, the global purebred population recovered -- to an estimated thirty-odd thousand birds -- enough that the breed is no longer counted among the threatened.",
      },
      {
        type: "paragraph",
        text: "That is genuinely good news. It is also not the news that matters most.",
      },
      {
        type: "paragraph",
        text: "Because a population count measures bodies, not integrity. \"There are enough Barred Rocks\" is a different statement from \"the old Barred Rock still exists.\" The breed name has recovered. The lines -- the carefully bred, standard-true, naturally reproducing, slow-grown production strains that made the Barred Rock worth keeping in the first place -- were never on that headcount, and they are still held in very few hands. A breed can be statistically safe and genetically hollowing out at the same time, as hatchery selection drifts toward whatever's quick and pretty and crossbreeding blurs the type. The danger to the heritage Barred Rock is not extinction. It is dilution -- the slow conversion of a working breed into a costume.",
      },
      {
        type: "paragraph",
        text: "That distinction is the entire reason a man in Kansas has spent his life doing what he does.",
      },
      {
        type: "quote",
        text: "A population count measures bodies, not integrity. The breed name recovered. The old lines were never on that count.",
      },
      {
        type: "heading",
        text: "Frank Reese, Good Shepherd Poultry Ranch, and the Fight to Keep the Old Lines True",
      },
      {
        type: "subheading",
        text: "What Standardbred Means",
      },
      {
        type: "paragraph",
        text: "To understand the flock at our farm, you have to understand a word: Standardbred.",
      },
      {
        type: "paragraph",
        text: "A Standardbred bird is one bred to the American Poultry Association Standard -- to the documented ideal of the breed, generation after generation, for genuine function rather than novelty. It is the opposite of a bird that merely happens to be labeled a Barred Rock. Standardbred breeding is slow, expensive, and unglamorous. It demands real culling, careful records, and the willingness to make hard decisions against your own short-term convenience for the sake of the line's long-term health. You cannot fake it, and you cannot rush it, and almost no one does it at any commercial scale.",
      },
      {
        type: "paragraph",
        text: "In the United States, very nearly one person still does it commercially: Frank Reese, Jr., of Good Shepherd Poultry Ranch in Lindsborg, Kansas.",
      },
      {
        type: "subheading",
        text: "A Half-Century in Lindsborg",
      },
      {
        type: "paragraph",
        text: "For roughly fifty years, Reese has done a deceptively simple thing every single day. He raises old poultry the old way. On a property of well over a hundred acres, his birds -- chickens, turkeys, and more, across roughly ten heritage breeds -- free-range on pasture, mate naturally, grow at the pace their bodies were built for, and trace back through some of the oldest continuously bred flocks left in the country, with turkey lines documented to the 1830s. He is widely described, by conservation organizations and food writers alike, as the last remaining commercial breeder of certified Standardbred poultry in America. His work has been covered by the New York Times, National Geographic, and Vogue; he has partnered with Slow Food, supplied the chefs who launched Heritage Foods, and been named by the Anne Saxelby Legacy Fund as a stronghold for irreplaceable American market breeds -- the Plymouth Rock among them.",
      },
      {
        type: "paragraph",
        text: "What makes Reese matter is not nostalgia. It is that he kept the knowledge and the genetics together in one working place when nearly everyone else let one or both go. As he has put it, when you lose the old breeders and the old lines, it is gone forever -- and you will never know what you lost. The breeds in his barns are not museum pieces. They are working animals he has kept at work, because he understood that a breed only survives as long as someone keeps asking it to be a breed.",
      },
      {
        type: "quote",
        text: "He raises old poultry the old way. Every day. For fifty years. That sentence is easy to write and almost impossible to live.",
      },
      {
        type: "subheading",
        text: "Why This Is the Decisive Moment",
      },
      {
        type: "paragraph",
        text: "Reese is now in his seventies, and approaching retirement. In recent years he has deliberately downsized -- concentrating on a smaller, higher-quality flock of grandparent stock, the genetic wellspring everything else flows from -- while a wider network steps up to carry the production forward. Good Shepherd East took over the main chicken production in 2023; new breeder flocks have been established in Pennsylvania; partnerships are pushing the genetics outward into more hands, on purpose, while there is still time.",
      },
      {
        type: "paragraph",
        text: "This is the part most people miss. The danger isn't only that one man might stop. It's that genetics this rare cannot survive in a single location. They survive by being distributed -- by being placed, carefully and accountably, with enough stewards that no single failure can end the line. The most important conservation work happening around Good Shepherd right now is precisely this handoff: moving these birds off one Kansas ranch and into a wider circle of farms willing to keep them honestly.",
      },
      {
        type: "paragraph",
        text: "That is the circle we set out to join.",
      },
      {
        type: "heading",
        text: "Why Bloodlines Matter: Not All Barred Rocks Are the Same",
      },
      {
        type: "subheading",
        text: "A Breed Name Is a Starting Point, Not a Guarantee",
      },
      {
        type: "paragraph",
        text: "If you take one idea from this whole piece, take this one: the breed name on a chicken tells you almost nothing about what's inside it.",
      },
      {
        type: "paragraph",
        text: "Within the single name \"Barred Rock,\" there is enormous range. Two birds can both be honestly called Plymouth Barred Rocks and share little beyond their feather pattern -- different in body type, in laying ability, in temperament, in how well they hold up outdoors, in whether they can even reproduce without help. The difference between them is bloodline: the accumulated record of every selection decision a chain of breeders did or did not make. A bloodline is a living document. It is the sum of what people chose to keep and what they let go, written into the animal itself.",
      },
      {
        type: "subheading",
        text: "Hatchery Barred Rock vs. Conservation-Line Barred Rock",
      },
      {
        type: "paragraph",
        text: "We want to be fair here, because the contrast is often drawn unfairly. A good mail-order hatchery is not the enemy of heritage poultry -- hatcheries have, in fact, helped recover breeds like the Plymouth Rock by putting birds in millions of backyards. If you want friendly brown-egg layers for the coop, a hatchery Barred Rock is a fine and honest choice, and we'd never tell you otherwise.",
      },
      {
        type: "paragraph",
        text: "But the two birds are bred for different ends, and it shows.",
      },
      {
        type: "paragraph",
        text: "A typical hatchery Barred Rock is selected for high-volume hatching: chicks that ship well, lay reliably, look the part, and move quickly through a commercial pipeline. Over generations, that pressure tends to drift the bird away from the Standard -- lighter in body, less consistent in type, selected for the convenience of mass production rather than the integrity of the breed.",
      },
      {
        type: "paragraph",
        text: "A conservation-line Barred Rock -- a Standardbred bird carrying lineage like Good Shepherd's -- is selected for the opposite. For correct body type that matches the historic dual-purpose ideal. For the vigor to live a real outdoor life. For natural mating and natural mothering. For sound, unhurried growth. For the longevity that lets a breeder actually evaluate an animal over time. These birds carry, in their genes, decisions made for the breed rather than for the pipeline.",
      },
      {
        type: "subheading",
        text: "The Chain of Custody Problem",
      },
      {
        type: "paragraph",
        text: "Here is the hard part, and the reason this matters: conservation genetics cannot be reverse-engineered. You cannot take ordinary hatchery stock and breed your way back to a true Standardbred line by buying the right book. The information that makes the line what it is took generations to accumulate, and if the chain of breeders is broken -- if enough farms stop maintaining the line honestly -- that information is simply gone. There is no backup. There is no archive that restores it.",
      },
      {
        type: "paragraph",
        text: "So a heritage line survives the way a relay survives: only as long as each runner hands the baton to the next. Every farm that keeps these birds true is a link. Drop enough links and the whole thing hits the ground, and no amount of caring afterward picks it back up.",
      },
      {
        type: "quote",
        text: "You cannot breed your way back to a heritage line from ordinary stock. Once the chain breaks, the information is gone. There is no archive that restores it.",
      },
      {
        type: "heading",
        text: "Why Shaggy Ink Farms Chose Good Shepherd-Lineage Birds",
      },
      {
        type: "paragraph",
        text: "We need to be plain about who we are, because the honesty of this story depends on it.",
      },
      {
        type: "paragraph",
        text: "Shaggy Ink Farms is a small family homestead. We are not a conservation institution. We are not a commercial Standardbred operation. We are not Frank Reese, and nothing we will ever do will be confused with what he has done. When we first wrote about our Barred Rocks, we deliberately declined to claim any connection to Good Shepherd, because at the time we could not document one, and a heritage claim you can't stand behind is worse than no claim at all.",
      },
      {
        type: "paragraph",
        text: "That has changed. Our foundation flock descends from Frank Reese and Good Shepherd Poultry Ranch conservation genetics. We can say that now because it is true, and because we chose it on purpose.",
      },
      {
        type: "paragraph",
        text: "The choice took longer and cost more than buying a box of chicks would have. It meant deciding, early, that we cared more about what was inside the bird than about getting birds in the ground fast. It meant sourcing deliberately rather than conveniently, and building our husbandry around what these birds actually need: room to range, the conditions to mate and brood naturally, the patience to let them grow at their own pace, and the discipline to keep records and to cull honestly toward the Standard rather than toward whatever is easiest to sell.",
      },
      {
        type: "paragraph",
        text: "We did not do this to borrow someone else's prestige. We did it because of the handoff described above -- because the single most useful thing a small farm can do for a line like this is to become one more accountable link in the chain. The genetics that need to leave Lindsborg need somewhere honest to land. A family homestead, kept with integrity, is exactly the kind of place they can land. Not impressive. Just real, and durable, and willing to tell the truth about itself.",
      },
      {
        type: "paragraph",
        text: "That last part is the responsibility, and we take it seriously. Carrying this lineage obligates us to document what we have, to represent it accurately, to never inflate our role, and to breed toward the bird the line is supposed to be -- not the bird that would be most convenient for us. We are at the beginning of that discipline, not the end of it. But we know what we are holding, and we know we did not make it. We were handed it.",
      },
      {
        type: "quote",
        text: "The single most useful thing a small farm can do for a line like this is to become one more accountable link in the chain.",
      },
      {
        type: "heading",
        text: "What Heritage Poultry Sourcing Means for Your Flock",
      },
      {
        type: "paragraph",
        text: "If this story has done its job, you're now looking at your own coop a little differently -- and wondering what any of it has to do with you. Here is the practical part.",
      },
      {
        type: "paragraph",
        text: "Where you get your birds is a decision with consequences beyond your own backyard. Every heritage chick bought from a breeder who keeps a line true is a small vote for that line's survival. It is one of the few places where an ordinary keeper's choices feed directly back into national conservation.",
      },
      {
        type: "subheading",
        text: "Questions to Ask Any Heritage Breeder",
      },
      {
        type: "paragraph",
        text: "You don't need to be an expert to source well. You need to ask better questions:",
      },
      {
        type: "list",
        items: [
          "What line are these birds from, and can you tell me its history? A serious breeder can answer this without flinching.",
          "Do they mate and brood naturally? This is the dividing line between a heritage animal and an industrial one.",
          "Are you breeding to the Standard? Ask what they cull for. The answer tells you everything.",
          "How do these birds perform outdoors, over a full life? Heritage value lives in longevity and vigor, not just in early lays.",
          "Can you document any of this? Not as a gotcha -- but because the breeders worth buying from want to talk about it.",
        ],
      },
      {
        type: "subheading",
        text: "Where to Look",
      },
      {
        type: "paragraph",
        text: "Start with The Livestock Conservancy, which maintains breeder and hatchery directories and remains the central clearinghouse for heritage breed conservation in America. From there, look toward breed clubs, regional Standardbred breeders, and the small but growing network of farms now carrying Good Shepherd genetics outward. And if you keep hatchery birds and love them -- keep them. Loving your chickens is where every heritage keeper started. Just ask the next question, the next time, of the next bird.",
      },
      {
        type: "heading",
        text: "A Living Chain: Conservation, One Generation at a Time",
      },
      {
        type: "paragraph",
        text: "Go back to the hen at the end of the pasture.",
      },
      {
        type: "paragraph",
        text: "She is still working that seam of ground, still indifferent to all of it -- to Worcester in 1869, to the broiler revolution, to the Conservation Priority List, to a man in Kansas opening barn doors at sunrise for fifty years. She does not know that her barred feathers are a kind of inheritance, or that the way she sets a nest and raises her own chicks is a trait that whole industries discarded as inefficient, or that the patient, slow-growing soundness of her body is the residue of ten thousand quiet decisions made by people she will never meet.",
      },
      {
        type: "paragraph",
        text: "She doesn't have to know. That is what we are for.",
      },
      {
        type: "paragraph",
        text: "The largest story in American agriculture turns out to live in the smallest places -- in specific birds, on specific ground, in the hands of specific people willing to keep asking an animal to remain itself. Frank Reese made those decisions, daily, for half a century, and built a place where the old lines could survive long enough to be handed forward. Now the handing-forward is the work. The chain extends -- carefully, honestly, one farm and one generation at a time -- and a small homestead under the oaks has been given a link to hold.",
      },
      {
        type: "paragraph",
        text: "We intend to hold it true. That is the discipline behind the breeding work, and the reason there is a chicken at the end of our pasture worth writing three thousand words about. She is the beginning of a long obedience: to pay attention, to tell the truth, and to build slowly enough that the story can carry weight.",
      },
      {
        type: "paragraph",
        text: "She doesn't know what she is.",
      },
      {
        type: "paragraph",
        text: "We do. And we are not going to be the ones who let it go.",
      },
      {
        type: "paragraph",
        text: "Shaggy Ink Farms represents its flock's lineage in good faith and to the best of its documentation. We describe our birds as descending from Good Shepherd conservation genetics; we do not claim to be a conservation institution, and we make no claim to speak for Frank Reese or Good Shepherd Poultry Ranch.",
      },
    ],
    sourceNotes: [
      {
        label:
          "The Livestock Conservancy -- Plymouth Rock Chicken (breed history; graduated from the Conservation Priority List, 2023)",
      },
      {
        label:
          "The Livestock Conservancy -- Heritage Chicken Definition and 2025 Conservation Priority List",
      },
      {
        label: "Anne Saxelby Legacy Fund -- Good Shepherd Poultry Ranch",
      },
      {
        label: "Heritage Foods -- Frank Reese, Savior of Biodiversity",
      },
      {
        label:
          "Good Shepherd Conservancy / Good Shepherd Poultry Farms -- ranch history and succession (Good Shepherd East, 2023; Pennsylvania breeder flocks)",
      },
      {
        label:
          "Socially Responsible Agriculture Project -- Beyond Factory Farming: Frank Reese",
      },
    ],
  },
  {
    slug: "field-notes-001-inspecting-barred-rocks",
    title: "Field Notes #001 — Inspecting Plymouth Barred Rocks",
    seoTitle: "Field Notes #001: Inspecting Plymouth Barred Rocks (APA Standard Quick Reference) | Shaggy Ink Farms",
    dek: "A one-page inspection checklist for Plymouth Barred Rocks — body type, barring quality, condition, and common faults. Summarized from APA Standard criteria for use in the field.",
    excerpt: "Quick-reference field guide for evaluating Plymouth Barred Rocks against Standard criteria. Covers overall type, head, body, legs, barring, condition, temperament, and common faults. Print it. Take it to the yard.",
    metaDescription: "Field Notes #001: a printable inspection checklist for Plymouth Barred Rocks. Covers body type, barring, condition, and common faults based on APA Standard of Perfection criteria. From Shaggy Ink Farms.",
    publishedAt: "2026-06-25",
    author: siteConfig.name,
    category: "Field Notes",
    contentType: "Article",
    tags: ["Poultry", "Heritage Poultry"],
    image: {
      src: "/images/farm/20260613_184002.jpg",
      alt: "Heritage Standard Bred Barred Rock rooster showing classic barring pattern",
    },
    content: [
      {
        type: "paragraph",
        text: "Print this. Take it to the yard. These notes summarize Plymouth Barred Rock evaluation criteria in plain language for use during actual bird inspection. The underlying framework comes from the American Poultry Association Standard of Perfection — this document paraphrases those criteria in practical terms and does not reproduce APA text.",
      },
      {
        type: "heading",
        text: "Before You Catch the Bird",
      },
      {
        type: "list",
        items: [
          "Observe from outside the pen first — at least 60 seconds.",
          "Watch how the bird carries itself at rest and moving.",
          "Note alertness — eyes tracking, head up, aware of surroundings.",
          "Watch for limp, hunch, labored breathing, isolation from flock.",
          "A good bird should look like it belongs in the middle of the flock, not the edge.",
        ],
      },
      {
        type: "heading",
        text: "Overall Impression (5-second check)",
      },
      {
        type: "paragraph",
        text: "Before you look at any single part, look at the whole bird.",
      },
      {
        type: "list",
        items: [
          "□  Correct body shape — broad, deep, slightly rectangular, not round or narrow",
          "□  Balanced proportions — nothing obviously oversized or undersized",
          "□  Strong stance — standing square, not crouching or listing",
          "□  Active and alert — not puffed, not drooping",
          "□  Healthy feather condition — tight, clean, no obvious damage",
        ],
      },
      {
        type: "heading",
        text: "Head",
      },
      {
        type: "subheading",
        text: "Comb",
      },
      {
        type: "list",
        items: [
          "Single comb, medium size, straight and upright on male — never falling to the side.",
          "Five even points. The rear point follows the neck line.",
          "Red and well-developed in laying hens. Pale comb can signal low production or health issue.",
          "Fault: rose comb, twisted comb, side sprig.",
        ],
      },
      {
        type: "subheading",
        text: "Eyes, Beak, Wattles, Ear lobes",
      },
      {
        type: "list",
        items: [
          "Eyes: bay red (reddish-orange). Bright, full, clear. No discharge.",
          "Beak: yellow (may show horn tint), medium length, slightly curved. Not crossed.",
          "Wattles: medium, red, matching — no significant size difference side to side.",
          "Ear lobes: red. White ear lobes are a disqualification in exhibition birds.",
          "Face: red, smooth. Not overly feathered at the face.",
        ],
      },
      {
        type: "heading",
        text: "Body",
      },
      {
        type: "list",
        items: [
          "Back: medium length, broad, slightly sloped toward the tail.",
          "Breast: broad, full, and carried forward — not flat or narrow.",
          "Depth: good depth through the keel. Breed is dual-purpose; substance matters.",
          "Width: wide through the saddle and shoulders. Narrow birds fail the standard.",
          "Tail: moderate angle, not too high (squirrel) or too low (wry). Coverts tight.",
          "Wings: carried tight against the body, tips not drooping.",
        ],
      },
      {
        type: "heading",
        text: "Legs & Feet",
      },
      {
        type: "list",
        items: [
          "Shanks: yellow, clean, no feathering.",
          "Four toes, straight, well-spread.",
          "Legs set wide apart — indicates good width and body substance.",
          "No scaliness, swelling, or bumblefoot.",
          "Fault: crooked toes, feathered shanks, green or dark shank color.",
        ],
      },
      {
        type: "heading",
        text: "Barring",
      },
      {
        type: "paragraph",
        text: "Barring is the defining feature of the breed. Evaluate it on the saddle, breast, and wing bay where bars are most visible.",
      },
      {
        type: "subheading",
        text: "Males",
      },
      {
        type: "list",
        items: [
          "Black and white bars should be nearly equal in width.",
          "Bars run across the feather, parallel, without bleeding or blurring.",
          "Color appears lighter overall than females due to double barring gene.",
          "Fault: smudgy bars, mossiness (irregular spots), excessive white leakage, dark feathers without barring.",
        ],
      },
      {
        type: "subheading",
        text: "Females",
      },
      {
        type: "list",
        items: [
          "Darker overall than males — single copy of the barring gene.",
          "Black bars wider than white bars.",
          "Even pattern across feather still required — no mossiness.",
          "Fault: same as males. Also watch for females that appear too light (may indicate barring gene issues).",
        ],
      },
      {
        type: "heading",
        text: "Condition",
      },
      {
        type: "list",
        items: [
          "□  Proper weight — breast muscle firm, keel not sharp",
          "□  Bright eyes — no discharge, no swelling around eye",
          "□  Clean vent — no pastiness, no soiling",
          "□  No mites or lice — check under wings, at vent, along feather shafts",
          "□  Healthy breathing — no wheezing, no open-mouth breathing",
          "□  No injuries or wounds — check comb tips, toes, wattles",
        ],
      },
      {
        type: "heading",
        text: "Temperament",
      },
      {
        type: "list",
        items: [
          "Should tolerate handling without extreme panic.",
          "Calm and curious is ideal — not flighty, not torpid.",
          "Overly aggressive cocks are a management problem and a temperament fault.",
          "Note temperament in records. Temperament is heritable.",
        ],
      },
      {
        type: "heading",
        text: "Breeder's Decision",
      },
      {
        type: "list",
        items: [
          "☐  Keep for breeding",
          "☐  Watch for another season",
          "☐  Place with another flock / sell",
          "☐  Harvest",
          "☐  Cull from program — record the reason",
        ],
      },
      {
        type: "paragraph",
        text: "Notes: ____________________________________________",
      },
      {
        type: "heading",
        text: "Common Faults",
      },
      {
        type: "list",
        items: [
          "Narrow body — fails the dual-purpose standard, do not breed",
          "High tail (squirrel tail) — disqualification in show; deprioritize in breeding",
          "Wry tail — feathers twisted to one side; do not breed",
          "Mossiness in barring — irregular spotting instead of clean bars",
          "White ear lobes — disqualification in exhibition",
          "Pale shanks — yellow shanks required; greenish or dark shanks are a fault",
          "Crossed beak — disqualify from breeding",
          "Poor barring contrast — bars bleed together, no clean edge",
          "Soft, loose feathering — breed should carry tight feathers",
          "Light body weight — insufficient muscle for a dual-purpose breed",
        ],
      },
      {
        type: "heading",
        text: "Field Tip",
      },
      {
        type: "quote",
        text: "Start at the tail. A squirrel tail or wry tail tells you immediately that the bird is not a breeding candidate. Don't spend ten minutes on a bird the tail already disqualified.",
      },
      {
        type: "paragraph",
        text: "This is a summary document for field use. The American Poultry Association Standard of Perfection is the authoritative source for breed standards and exhibition disqualifications. This document paraphrases and interprets those criteria and does not substitute for the full APA Standard.",
      },
    ],
    sourceNotes: [
      {
        label: "American Poultry Association Standard of Perfection — Plymouth Rock, Barred variety (current edition)",
      },
      {
        label: "Good Shepherd Poultry Ranch — breeding and selection criteria documentation",
      },
    ],
  },
  {
    slug: "ringlet-line",
    title: "The Birds in My Yard Have a History Worth Knowing",
    seoTitle: "The Ringlet Line: Barred Rock Breeding History at Shaggy Ink Farms",
    dek: "Walk into any feed store in Northern California this spring and you'll find Barred Rock chicks labeled heritage. They won't be Standard Bred. Here's why that difference matters — and what the Ringlet line has to do with the birds on this farm.",
    excerpt: "The Ringlet line, E.B. Thompson, Ralph Sturgeon, and why the birds ranging on three acres in Anderson, California have a documented breeding history most 'heritage' flocks don't.",
    publishedAt: "2026-06-25",
    author: siteConfig.name,
    category: "Poultry / Breeding Program",
    contentType: "Article",
    tags: ["Poultry", "Heritage Poultry"],
    image: {
      src: "/images/farm/20260612_174103.jpg",
      alt: "Standard Bred Barred Rock rooster at Shaggy Ink Farms, Anderson California",
    },
    content: [
      {
        type: "paragraph",
        text: "Walk into any feed store in Northern California this spring and you'll find Barred Rock chicks in the brooder. They'll be labeled heritage. They'll look the part. And they'll be fine birds for a backyard flock.",
      },
      {
        type: "paragraph",
        text: "But they won't be Standard Bred. And the difference matters more than most people realize.",
      },
      {
        type: "heading",
        text: "What Happened to the Barred Rock",
      },
      {
        type: "paragraph",
        text: "Over the last seventy years, commercial hatcheries selected Barred Rocks for one thing — egg production. The body depth is gone. The barring is loose. The genetics that made them genuinely productive as both layers and meat birds got traded away for higher egg counts in confinement.",
      },
      {
        type: "paragraph",
        text: "The American Poultry Association Standard of Perfection describes what a Barred Rock is actually supposed to be: equal-width black and white bars on every feather, sharply defined. A five-pointed single comb, upright and red. A deep, broad body built to work. Yellow legs, clean.",
      },
      {
        type: "paragraph",
        text: "That bird still exists. But you have to know where to find it.",
      },
      {
        type: "heading",
        text: "The Ringlet Line",
      },
      {
        type: "paragraph",
        text: "In serious Barred Rock breeding circles, one of the most important strains ever developed was called the Ringlet — built by a breeder named E.B. Thompson. He selected specifically for barring quality: tight, fine, parallel bars that wrap cleanly around every feather. Thompson wasn't breeding for egg numbers. He was breeding toward the Standard.",
      },
      {
        type: "paragraph",
        text: "The Ringlet line became foundational for exhibition Barred Rocks in America. When Frank Reese built his program at Good Shepherd Poultry Ranch — one of the most respected Standard Bred programs in the country — Thompson's Ringlet genetics were in the mix.",
      },
      {
        type: "heading",
        text: "Ralph Sturgeon and the Line That Survived",
      },
      {
        type: "paragraph",
        text: "Serious breeding programs are hard to maintain. Most don't survive a generation. Ralph Sturgeon was one of the breeders who kept the Ringlet line alive — working with birds that traced directly to Thompson's strain during the decades when the hatchery industry was busy discarding everything the Standard called for.",
      },
      {
        type: "paragraph",
        text: "My flock traces back through that lineage. Ringlet genetics, maintained through Sturgeon's program, are the foundation of what's ranging on my three acres in Anderson right now.",
      },
      {
        type: "heading",
        text: "What That Means",
      },
      {
        type: "paragraph",
        text: "My roosters run a little lighter than a textbook SOP bird — wider white bars than ideal. That's a known characteristic of the Ringlet line in roosters. Thompson's strain was selected heavily through the hens, where the barring shows tightest. The roosters look lighter because the genetics express differently by sex.",
      },
      {
        type: "paragraph",
        text: "Every generation I'm selecting toward the Standard. Tightest-barring hens. Most correct roosters. Keep building.",
      },
      {
        type: "paragraph",
        text: "But the foundation is real. Documented. Historically significant in a way that most flocks sold as \"heritage\" simply aren't.",
      },
      {
        type: "heading",
        text: "Why It Matters",
      },
      {
        type: "paragraph",
        text: "When you buy hatching eggs from a hatchery, you're buying birds optimized for industrial confinement. When you buy from a documented Standard Bred program, you're buying genetics selected for exactly what a small farm needs — consistent laying, good foraging, useful carcass weight, breeds true.",
      },
      {
        type: "paragraph",
        text: "The Barred Rock that built American homesteads is still out there. Mine trace back to E.B. Thompson's Ringlet line through Ralph Sturgeon.",
      },
      {
        type: "quote",
        text: "That's not marketing. That's just the history of the birds in my yard.",
      },
    ],
  },
];

export const featuredArticle = journalArticles[0];

export function getArticleBySlug(slug: string) {
  return journalArticles.find(
    (article) => article.slug === slug || article.legacySlugs?.includes(slug),
  );
}

export function getArticleHref(article: JournalArticle) {
  return `/journal/${article.slug}`;
}

export function getArticleUrl(article: JournalArticle) {
  return absoluteUrl(getArticleHref(article));
}

export function getArticleText(article: JournalArticle) {
  return article.content
    .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
    .join(" ");
}

export function getReadingTime(article: JournalArticle) {
  const words = getArticleText(article)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}

export function getArticleContentType(article: JournalArticle): JournalContentType {
  return article.contentType ?? "Journal";
}

export function getArticleTags(article: JournalArticle) {
  if (article.tags?.length) {
    return article.tags;
  }

  const text = `${article.category} ${article.title} ${article.excerpt}`.toLowerCase();
  const tags = new Set<string>();

  if (text.includes("poultry") || text.includes("flock") || text.includes("barred")) {
    tags.add("Poultry");
  }
  if (text.includes("garden") || text.includes("growing")) {
    tags.add("Garden");
  }
  if (text.includes("strawberr")) {
    tags.add("Strawberries");
  }
  if (text.includes("flower")) {
    tags.add("Flowers");
  }
  if (text.includes("orchard") || text.includes("tree")) {
    tags.add("Orchard");
  }
  if (text.includes("learn") || text.includes("plan")) {
    tags.add("Learn & Plan");
  }
  if (text.includes("build") || text.includes("project") || text.includes("infrastructure")) {
    tags.add("Farm Build");
  }
  if (text.includes("family")) {
    tags.add("Family");
  }
  if (text.includes("wildlife") || text.includes("deer")) {
    tags.add("Wildlife");
  }

  return [...tags];
}

export function getWordCount(article: JournalArticle) {
  return getArticleText(article)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function articleJsonLd(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    image: `${siteConfig.url}${article.image.src}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${farmImages.badge.src}`,
      },
    },
    mainEntityOfPage: getArticleUrl(article),
  };
}
