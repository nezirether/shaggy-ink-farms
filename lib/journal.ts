import { farmImages } from "@/lib/images";
import { absoluteUrl, siteConfig } from "@/lib/site";

type JournalBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    };

type SourceNote = {
  label: string;
  url: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
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
    dek: "A first field note on family, oak pasture, Barred Rocks, and the long work of building a Northern California homestead from the ground up.",
    excerpt:
      "The opening note from Shaggy Ink Farms: why we started, what we are building, and how chickens, eggs, projects, and YouTube fit into the family homestead ahead.",
    publishedAt: "2026-06-11",
    author: siteConfig.name,
    category: "Farm Journal",
    image: farmImages.oakPasture,
    content: [
      {
        type: "paragraph",
        text: "Welcome to Shaggy Ink Farms. If you are finding us at the beginning, that is the best place to arrive. The fences are still being improved, the systems are still being tuned, the flock is still teaching us, and the farm is becoming itself one project at a time. We are a Northern California family homestead set among mature oak trees and open pastureland, with Plymouth Barred Rock chickens at the center of the story.",
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
        text: "That is also why we are building this as a media brand. A homestead has a thousand small stories, and most of them are easy to lose if nobody records them. The first egg from a young hen. The first time a child confidently carries feed. The first storm that tests a roofline. The first version of a label that finally feels right. The first video that turns a regular chore into something useful for somebody else.",
      },
      {
        type: "paragraph",
        text: "We want Shaggy Ink Farms to feel personal without feeling small. The aim is a serious farm brand with family at the center: premium in its care, but not precious; thoughtful in its design, but still practical; rooted in tradition, but built for the way people discover farms now, through websites, videos, photos, newsletters, and the quiet trust that grows over time.",
      },
      {
        type: "heading",
        text: "Why Northern California Shapes the Farm",
      },
      {
        type: "paragraph",
        text: "Northern California gives this place its visual language. Mature oaks, dry grass, warm light, wildlife edges, weathered fence posts, and wide pastureland are not background decoration. They are the frame. We are not trying to copy a generic farm postcard. We are building from the land we have, the climate we live in, and the rural character of this part of California.",
      },
      {
        type: "paragraph",
        text: "The oaks slow everything down in the best way. They make you look up. They mark the seasons. They hold shade in summer and shape the way a pasture feels at golden hour. Mule deer moving through the edge of the property, chickens scratching near a fence, and the long line of an evening shadow all become part of the brand because they are part of the place.",
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
        text: "Our flagship livestock is the Plymouth Barred Rock chicken. There are practical reasons for that choice, and there are emotional ones. Barred Rocks are a classic American farm breed: useful, sturdy, familiar, and beautiful in a way that feels earned. Their black-and-white barring gives the farm an immediate visual pattern. Their presence gives the brand a living icon.",
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
        text: "A lot of what we are building will happen in layers. First come the essential systems: safe coops, better fencing, feed storage, water routines, predator awareness, seasonal egg handling, and record keeping. Then come the parts that turn a working homestead into a brand people can follow: field notes, photography, video, packaging, farm goods, educational articles, and a store that feels like it belongs to the land.",
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
        text: "The future plan is simple in direction and large in scope: care for the flock, build the homestead, share the work, offer seasonal eggs, develop farm goods, and create videos and articles that help people feel closer to the process. We want Shaggy Ink Farms to become a place people return to because it feels trustworthy, useful, beautiful, and alive.",
      },
      {
        type: "paragraph",
        text: "If you are here early, thank you. Early supporters matter because they give a young farm its first circle of witnesses. We are not asking you to believe in a finished thing. We are inviting you to follow the making of it: the first flock notes, the first egg updates, the first videos, the first store pieces, the first lessons learned the hard way, and the first glimpses of what this place can become.",
      },
      {
        type: "paragraph",
        text: "This is the opening field note. The gate is open. Welcome to Shaggy Ink Farms.",
      },
    ],
  },
  {
    slug: "legacy-of-the-plymouth-barred-rock",
    title: "The Legacy of the Plymouth Barred Rock",
    dek: "A careful look at the American farm breed behind our flagship flock, why heritage poultry conservation matters, and why Shaggy Ink Farms chose Barred Rocks.",
    excerpt:
      "The Plymouth Barred Rock is more than a handsome farm chicken. Its history runs through nineteenth-century American poultry shows, practical dual-purpose farm life, and modern conservation work.",
    publishedAt: "2026-06-11",
    author: siteConfig.name,
    category: "Heritage Poultry",
    image: farmImages.barredRockFlock,
    content: [
      {
        type: "paragraph",
        text: "The Plymouth Barred Rock is one of those farm animals that feels familiar even before you know its history. The black-and-white barring is instantly recognizable. The body is sturdy. The look is practical, almost architectural. It is a chicken that seems to belong near a fence line, under an old tree, or in the margin of a seed catalog from another century.",
      },
      {
        type: "paragraph",
        text: "At Shaggy Ink Farms, the Plymouth Barred Rock is our flagship breed. That choice is partly visual, partly practical, and partly historical. We chose Barred Rocks because they carry the kind of American farm identity we want the homestead to honor: useful, durable, family-scale, and rooted in a time when poultry was selected for more than speed and uniformity.",
      },
      {
        type: "paragraph",
        text: "It is important to say this carefully. We are not claiming that our flock descends from a specific conservation line unless and until we can document that clearly. We are not claiming Good Shepherd Conservancy genetics. We are saying that the Plymouth Barred Rock as a breed deserves respect, and that the broader work of heritage poultry conservation has shaped how we think about keeping, documenting, and talking about our birds.",
      },
      {
        type: "heading",
        text: "Origins in Nineteenth-Century America",
      },
      {
        type: "paragraph",
        text: "The Plymouth Rock was developed in the United States during the middle of the nineteenth century. The Livestock Conservancy notes that birds called Plymouth Rocks were first exhibited in Boston in 1849, then effectively disappeared from view for about two decades before reappearing at a poultry show in Worcester, Massachusetts, in 1869. The later Worcester birds are generally treated as the ancestors of the Plymouth Rocks known today.",
      },
      {
        type: "paragraph",
        text: "Like many old farm breeds, the origin story is not perfectly tidy. The Livestock Conservancy's breed history connects the breed to multiple contributors and possible crosses, including birds such as Dominiques, Javas, Cochins, Brahmas, and Spanish chickens. That kind of layered development is typical of practical nineteenth-century livestock breeding.",
      },
      {
        type: "paragraph",
        text: "That uncertain origin is not a weakness. It is part of how many practical farm breeds came into being. Before genetic testing, national databases, and modern hatchery catalogs, breeds were formed by people selecting birds that worked: birds with the right size, vigor, feathering, temperament, body type, and utility. The Plymouth Rock became a breed because poultry people kept choosing and refining a useful kind of bird.",
      },
      {
        type: "paragraph",
        text: "The original Plymouth Rock was barred, which is why the Barred Rock carries such authority inside the larger Plymouth Rock family. Other color varieties came later. The American Poultry Association accepted the breed into its Standard of Excellence in 1874, a date that matters because standardization helped turn local breeding work into a nationally recognized breed identity.",
      },
      {
        type: "heading",
        text: "A Chicken Built for the American Farm",
      },
      {
        type: "paragraph",
        text: "The Plymouth Rock became popular because it fit real farm needs. The Livestock Conservancy describes the breed as hardy, docile, broody, a good producer of brown eggs, and valued for meat qualities. In plain language, it was a dual-purpose bird: useful for eggs and table birds, not only one or the other.",
      },
      {
        type: "paragraph",
        text: "That dual-purpose identity is central to its legacy. On small farms and family homesteads, specialization was not always a virtue. A bird that could lay, forage, tolerate weather, reproduce, and carry enough body to be useful at the table had lasting value. The Plymouth Rock's popularity before World War II reflected that practical fit. It was not just a pretty bird. It was a working bird.",
      },
      {
        type: "paragraph",
        text: "The breed also played a role in the development of the modern broiler industry. The Livestock Conservancy notes that Plymouth Rocks were among the foundation breeds for broiler development in the 1920s. Later industrial poultry systems moved toward specialized hybrids, especially birds selected for rapid growth, uniformity, and efficiency at enormous scale. That shift changed the meaning of poultry breeding in America.",
      },
      {
        type: "paragraph",
        text: "The Barred Rock, in that context, becomes a bridge. It connects the era of family farm utility to the era of modern poultry production. It reminds us that today's poultry industry did not appear from nowhere. It grew out of older breeds, older breeders, and older farm systems, then narrowed its priorities around the demands of industrial scale.",
      },
      {
        type: "heading",
        text: "What Heritage Poultry Conservation Is Trying to Protect",
      },
      {
        type: "paragraph",
        text: "The phrase heritage poultry can be used loosely in marketing, so definitions matter. The Livestock Conservancy's heritage chicken definition centers on several requirements: recognized standard breeds, natural mating, long productive outdoor lifespans, and slow growth. The definition is meant to protect more than nostalgia. It protects functional traits that can disappear when breeding is narrowed to a few commercial goals.",
      },
      {
        type: "paragraph",
        text: "For a family homestead, those traits are not abstract. Natural mating matters because a breed should be able to reproduce without constant intervention. Outdoor vigor matters because a bird should be able to live a real chicken life with movement, weather, forage, and seasonal change. Slow growth matters because bodies need time to develop soundly. Longevity matters because breeding knowledge depends on watching birds over time.",
      },
      {
        type: "paragraph",
        text: "Conservation also protects options. Rare and traditional livestock breeds can carry genetic diversity that may matter for future farming: disease resistance, hardiness, mothering ability, foraging behavior, climate adaptation, and body types that suit different production systems. Losing those traits would be a permanent narrowing of the agricultural toolbox.",
      },
      {
        type: "paragraph",
        text: "This is where heritage poultry conservation becomes more than sentiment. It is not only about saving the look of old breeds. It is about preserving living populations with enough quality, numbers, and breeder knowledge to remain useful. A breed in a photograph is history. A breed in a carefully managed flock is possibility.",
      },
      {
        type: "heading",
        text: "Frank Reese, Good Shepherd, and the Standardbred Conversation",
      },
      {
        type: "paragraph",
        text: "Any respectful conversation about American heritage poultry eventually comes to Frank Reese of Good Shepherd Poultry Ranch in Kansas and the Good Shepherd Conservancy. Reese is widely discussed as one of the most important living advocates for Standardbred poultry and old production lines. Reporting and partner organizations have described his work as focused on preserving pre-industrial poultry genetics and keeping old breeds in active agricultural use.",
      },
      {
        type: "paragraph",
        text: "Good Shepherd's work is often framed around Standardbred poultry, a term that emphasizes breeding to the American Poultry Association Standard and maintaining functional, historic lines. That distinction matters. A bird can have the name of an old breed and still be poorly selected. Conservation work depends on type, vigor, reproduction, records, and a breeder's willingness to make hard choices for the long-term health of the flock.",
      },
      {
        type: "paragraph",
        text: "The Anne Saxelby Legacy Fund describes Good Shepherd Poultry Ranch as a major stronghold for important American market breeds, including Plymouth Rock, and connects the ranch to a wider conservation effort. Heritage Foods has also written about Frank Reese's work preserving poultry biodiversity and bringing older poultry genetics back into meaningful agricultural use.",
      },
      {
        type: "paragraph",
        text: "For Shaggy Ink Farms, the lesson is not to borrow prestige from someone else's genetics. The lesson is humility. If we are going to use words like heritage, conservation, and bloodline, we need to use them carefully. We need to document what we know, avoid claims we cannot support, and respect the difference between owning birds of a breed and stewarding a proven conservation line.",
      },
      {
        type: "heading",
        text: "Why Bloodlines Matter",
      },
      {
        type: "paragraph",
        text: "A breed name is not the whole story. Within any breed, different flocks can vary widely in type, productivity, temperament, size, vigor, and historical selection. Bloodlines matter because they carry the decisions of breeders across generations. They are living records of what people selected for, what they ignored, and what they protected.",
      },
      {
        type: "paragraph",
        text: "Preserving bloodlines does not mean freezing animals in time. Good breeding is active. It requires selection, culling, observation, and records. It asks breeders to balance appearance with function, individual birds with population health, and short-term convenience with long-term resilience. The goal is not to keep every bird. The goal is to keep a breed strong enough to remain itself.",
      },
      {
        type: "paragraph",
        text: "That is why unsupported claims can do harm. If every flock is advertised as rare, historic, pure, or conservation-grade without evidence, the language loses meaning. Serious breeders and conservation organizations rely on clarity. Buyers and new flock owners need to know whether they are buying hatchery-quality backyard birds, exhibition stock, production-selected stock, or birds connected to a documented conservation program.",
      },
      {
        type: "paragraph",
        text: "At our scale, the honest path is to start with respect and keep learning. We can choose a historic breed, observe our birds carefully, improve our husbandry, study the standard, learn from conservation sources, and be transparent about what we are and are not claiming. That is the foundation for better stewardship later.",
      },
      {
        type: "heading",
        text: "Why We Chose Barred Rocks",
      },
      {
        type: "paragraph",
        text: "We chose Plymouth Barred Rocks because they make sense for the kind of farm Shaggy Ink Farms is becoming. They are visually iconic, historically American, practical for a family homestead, and connected to a conservation conversation that deserves more attention. They photograph beautifully in oak pasture, but they also give us a daily reason to practice actual animal care.",
      },
      {
        type: "paragraph",
        text: "Their barred feathers fit the visual world of the brand: rustic fencing, cream paper, charcoal ink, forest green, barn red, and warm gold light. Their history fits the storytelling world: American agriculture, family farms, breed standards, egg baskets, and the long tension between practical husbandry and industrial efficiency.",
      },
      {
        type: "paragraph",
        text: "Most of all, Barred Rocks give us a starting point with depth. A flock can be charming on day one, but a breed with history gives you something to study for years. Where did it come from? What traits made it useful? What has modern poultry gained and lost? How do small farms talk honestly about conservation? How can a family homestead honor an old breed without overstating its own role?",
      },
      {
        type: "paragraph",
        text: "Those are the questions we want to keep asking. The Plymouth Barred Rock is our flagship because it holds beauty, utility, and history in one bird. It belongs in a pasture, but it also belongs in a larger conversation about the future of small farms, food, biodiversity, and the breeds that helped build American agriculture.",
      },
      {
        type: "paragraph",
        text: "At Shaggy Ink Farms, the Barred Rock is not a mascot pasted onto a brand. It is the beginning of a discipline. We are starting with a bird that asks us to pay attention, tell the truth, and build slowly enough that the story can carry weight.",
      },
    ],
    sourceNotes: [
      {
        label: "The Livestock Conservancy: Plymouth Rock Chicken",
        url: "https://livestockconservancy.org/plymouth-rock-chicken/",
      },
      {
        label: "The Livestock Conservancy: Heritage Chicken Definition",
        url: "https://livestockconservancy.org/heritage-chicken-definition/",
      },
      {
        label: "Heritage Foods: Frank Reese, Savior of Biodiversity",
        url: "https://heritagefoods.com/blogs/news/frank-reese-biodiversity-savior",
      },
      {
        label: "Farm Forward: High Welfare Meets High Tech",
        url: "https://www.farmforward.com/news/high-welfare-meets-high-tech/",
      },
      {
        label: "Anne Saxelby Legacy Fund: Good Shepherd Poultry Ranch",
        url: "https://www.annesaxelbylegacyfund.org/good-shepherd-ranch",
      },
    ],
  },
];

export const featuredArticle = journalArticles[0];

export function getArticleBySlug(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}

export function getArticleHref(article: JournalArticle) {
  return `/farm-journal/${article.slug}`;
}

export function getArticleUrl(article: JournalArticle) {
  return absoluteUrl(getArticleHref(article));
}

export function getArticleText(article: JournalArticle) {
  return article.content.map((block) => block.text).join(" ");
}

export function getReadingTime(article: JournalArticle) {
  const words = getArticleText(article)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
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
    description: article.excerpt,
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
