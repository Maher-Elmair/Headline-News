// Mock data for the news platform

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  views: number;
  isFeatured?: boolean;
  isBreaking?: boolean;
  tags: string[];
}

export const categories = [
  "World",
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Culture",
  "Opinion",
];

/**
 * Helper function to get mock articles
 */
export function getMockArticles(count: number = 10): Article[] {
  return mockArticles.slice(0, count);
}

/**
 * Helper function to get mock articles by category
 */
export function getMockArticlesByCategory(
  category: string,
  count: number = 10,
): Article[] {
  const filtered = mockArticles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase(),
  );
  if (filtered.length > 0) {
    return filtered.slice(0, count);
  }
  // If no articles found for this category, return generic articles with modified category
  return mockArticles.slice(0, count).map((article) => ({
    ...article,
    category: category.charAt(0).toUpperCase() + category.slice(1),
  }));
}

export const mockArticles: Article[] = [
  // Original 8 articles (keep as provided)
  {
    id: "1",
    title:
      "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    slug: "global-climate-summit-carbon-emissions",
    excerpt:
      "World leaders have committed to unprecedented reductions in greenhouse gas emissions by 2030, marking a pivotal moment in climate action.",
    content: `In a landmark decision that environmental advocates are calling "a turning point for humanity," representatives from 195 countries have agreed to binding targets for carbon emission reductions.

The agreement, reached after two weeks of intensive negotiations in Geneva, sets aggressive targets that go beyond previous commitments made in Paris. Under the new framework, developed nations have committed to achieving net-zero emissions by 2035, five years earlier than previously planned.

"This is not just about numbers on paper," said UN Climate Chief Maria Santos. "This is about the future of our planet and the legacy we leave for generations to come." The summit's breakthrough came after smaller island nations, facing existential threats from rising sea levels, staged a powerful demonstration that captured global attention.

Key provisions of the agreement include:

- A global carbon tax mechanism to fund clean energy transitions in developing nations
- Mandatory phase-out of coal power plants by 2032 in G20 countries  
- Investment of $500 billion annually in renewable energy infrastructure
- Protection of 30% of global land and ocean areas by 2030
- Technology transfer commitments to help developing nations leapfrog fossil fuels

The business community has responded with cautious optimism. "We've been waiting for this kind of clarity and commitment," said James Chen, CEO of Global Energy Solutions. "Now we can plan long-term investments in clean technology with confidence."

However, implementation challenges remain significant. Critics point out that previous climate agreements have often fallen short of their ambitions when it comes to actual emissions reductions. Environmental groups are calling for robust monitoring and enforcement mechanisms to ensure countries follow through on their commitments.

Youth climate activists, who have been instrumental in building public pressure for action, celebrated the agreement while emphasizing the need for continued vigilance. "This is a victory, but our work is far from over," said 19-year-old activist Sophie Anderson. "We'll be watching closely to make sure these promises become reality."

The economic implications are profound. Analysts predict the agreement will accelerate the already-rapid transition to renewable energy, potentially creating 50 million new jobs globally while disrupting traditional energy sectors. Countries that move quickly to adapt may gain significant competitive advantages in the emerging green economy.

As the summit concluded, delegates acknowledged that the real work begins now. The first progress review is scheduled for 2027, when countries will report on their implementation efforts and potentially strengthen their commitments based on latest climate science.`,
    imageUrl:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=800&fit=crop",
    category: "World",
    author: {
      name: "Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T08:00:00Z",
    readingTime: 8,
    views: 45200,
    isFeatured: true,
    isBreaking: true,
    tags: ["Climate Change", "Environment", "Global Politics"],
  },
  {
    id: "2",
    title:
      "Breakthrough in Quantum Computing Promises Revolutionary Speed Gains",
    slug: "quantum-computing-breakthrough-speed-gains",
    excerpt:
      "Researchers have achieved quantum error correction at room temperature, removing a major barrier to practical quantum computers.",
    content: `Scientists at the Quantum Research Institute have announced a breakthrough that could bring quantum computing into mainstream use within the next five years.

The team has successfully demonstrated quantum error correction operating at room temperature, eliminating the need for expensive cooling systems that have been a major obstacle to widespread quantum computer deployment.

"This changes everything," explained lead researcher Dr. Amanda Zhang. "Until now, quantum computers required cooling to near absolute zero, making them prohibitively expensive and impractical for most applications. Our new approach uses specially engineered materials that maintain quantum coherence at normal temperatures."

The implications extend far beyond cost savings. Room-temperature quantum computers could be integrated into existing data centers and even potentially miniaturized for specialized applications. Industries from pharmaceuticals to finance are already exploring how this technology could transform their operations.

In drug discovery, quantum computers could simulate molecular interactions with unprecedented accuracy, potentially reducing the time to develop new medicines from years to months. Financial institutions are interested in using quantum computing for risk analysis and fraud detection at scales impossible with classical computers.

The technology relies on a novel class of topological materials that protect quantum states from environmental interference. While the current prototype is modest in scale, the researchers believe it can be scaled up significantly. "We're targeting 1,000 stable qubits within two years," said Dr. Zhang.

However, some experts urge caution about overly optimistic timelines. "This is definitely promising, but there's still substantial engineering work needed to create commercially viable systems," noted quantum computing analyst Robert Hayes.

The research team has already secured $200 million in funding from technology companies and government agencies to accelerate development. They plan to release detailed specifications later this year, potentially opening the door for broader industry participation in advancing the technology.`,
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop",
    category: "Technology",
    author: {
      name: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T06:30:00Z",
    readingTime: 6,
    views: 32100,
    isFeatured: true,
    tags: ["Quantum Computing", "Technology", "Science"],
  },
  {
    id: "3",
    title:
      "New Study Reveals Unexpected Benefits of Mediterranean Diet on Brain Health",
    slug: "mediterranean-diet-brain-health-study",
    excerpt:
      "Long-term research shows significant cognitive improvements in adults following Mediterranean eating patterns.",
    content: `A comprehensive 10-year study published in the Journal of Neuroscience has provided compelling evidence that the Mediterranean diet may significantly slow cognitive decline and reduce the risk of dementia.

The research, which followed 7,000 participants aged 55-75, found that those who closely adhered to Mediterranean eating patterns showed 35% less cognitive decline compared to control groups. Perhaps most remarkably, the protective effects appeared to increase over time, suggesting cumulative benefits from long-term adherence.

"What surprised us most was the magnitude of the effect," said principal investigator Dr. Elena Rodriguez. "We expected to see some benefit, but the differences in cognitive testing were substantial and clinically meaningful."

The Mediterranean diet emphasizes whole grains, fruits, vegetables, fish, olive oil, and moderate wine consumption while limiting red meat and processed foods. Researchers believe the combination of anti-inflammatory compounds, healthy fats, and antioxidants creates a synergistic protective effect on brain tissue.

Brain imaging studies conducted on a subset of participants revealed that Mediterranean diet followers had better preserved brain volume in areas associated with memory and learning. Blood tests also showed lower levels of inflammatory markers and better metabolic health indicators.

The findings have particular significance given rising rates of dementia globally. "If we can delay dementia onset by even a few years through dietary changes, the impact on individuals and healthcare systems would be enormous," noted Dr. Rodriguez.

Nutrition experts emphasize that the diet's benefits likely come from the overall pattern rather than individual components. "It's not just about adding olive oil or eating more fish," explained nutritionist Lisa Chen. "It's about a fundamental shift toward plant-based, minimally processed foods prepared and enjoyed in a mindful way."

The research team is now investigating whether starting the diet at younger ages might provide even greater long-term brain health benefits. They're also exploring how the diet might be adapted for different cultural contexts while maintaining its protective properties.

Public health officials are already incorporating these findings into dietary recommendations, though they stress that the Mediterranean diet is one component of a broader healthy lifestyle that includes physical activity, social engagement, and mental stimulation.`,
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop",
    category: "Health",
    author: {
      name: "Dr. Emily Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T14:00:00Z",
    readingTime: 7,
    views: 28400,
    isFeatured: true,
    tags: ["Health", "Nutrition", "Research"],
  },
  {
    id: "4",
    title:
      "Stock Markets Rally as Tech Giants Report Strong Quarterly Earnings",
    slug: "stock-markets-rally-tech-earnings",
    excerpt:
      "Major indices reach new highs following better-than-expected results from leading technology companies.",
    content: `Global stock markets surged to record highs today as major technology companies reported quarterly earnings that far exceeded analyst expectations, easing concerns about a potential economic slowdown.

The S&P 500 rose 2.3%, while the NASDAQ gained 3.1%, led by strong performances from semiconductor and cloud computing companies. International markets followed suit, with European and Asian indices posting solid gains.

The rally was sparked by a series of impressive earnings reports that demonstrated robust demand for technology products and services despite macroeconomic uncertainties. Cloud computing revenue grew at double-digit rates, while AI-related product lines showed particularly strong momentum.

"These results confirm that the digital transformation of the economy is accelerating, not slowing down," said market strategist Jennifer Liu. "Companies are continuing to invest heavily in technology even as they're cautious about other expenditures."

Semiconductor stocks were among the biggest winners, with several companies reporting order backlogs extending well into next year. The sustained strength in chip demand reflects continued strong sales of everything from smartphones to data center equipment.

However, some analysts are urging caution despite the positive news. Valuations in the technology sector have reached levels that historically have preceded corrections, and geopolitical tensions continue to pose risks to global supply chains.

"The fundamentals are certainly strong, but at these price levels, there's not much room for disappointment," noted economist Michael Foster. "Investors should be prepared for increased volatility."

Looking ahead, market participants will be closely watching inflation data and central bank communications for signals about the future direction of interest rates. For now, though, the prevailing sentiment is decidedly bullish as the earnings season continues to deliver positive surprises.`,
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
    category: "Business",
    author: {
      name: "Michael Torres",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T20:00:00Z",
    readingTime: 5,
    views: 19800,
    tags: ["Stock Market", "Technology", "Economy"],
  },
  {
    id: "5",
    title:
      "Historic Discovery: Ancient City Uncovered Beneath Amazon Rainforest",
    slug: "ancient-city-amazon-rainforest-discovery",
    excerpt:
      "Archaeologists using lidar technology have revealed a massive pre-Columbian urban center in the Brazilian Amazon.",
    content: `In what's being hailed as one of the most significant archaeological discoveries in decades, researchers have uncovered evidence of a sophisticated ancient city deep in the Amazon rainforest that may have housed tens of thousands of people.

Using advanced lidar (light detection and ranging) technology that can penetrate dense forest canopy, the team identified an extensive network of structures, roads, and agricultural systems covering more than 1,000 square kilometers. The city appears to date from around 1,000-1,500 CE, challenging previous assumptions about pre-Columbian civilization in the Amazon.

"This completely changes our understanding of what was possible in Amazonian societies," said lead archaeologist Dr. Carlos Mendez. "We're looking at urban planning and engineering on a scale comparable to contemporary European cities."

The lidar scans revealed a highly organized settlement with clear evidence of social stratification, including what appear to be elite residential areas, ceremonial centers, and defensive fortifications. An intricate system of canals and reservoirs suggests sophisticated water management capabilities.

Perhaps most intriguingly, the city was built using what researchers describe as "Amazonian dark earth" or terra preta - a human-modified soil that's highly fertile and could have supported intensive agriculture. This discovery adds to growing evidence that indigenous peoples actively managed and transformed Amazon ecosystems on a massive scale.

"For too long, the Amazon was viewed as a pristine wilderness that humans barely touched," explained Dr. Mendez. "We now know it was home to complex civilizations that developed sustainable ways of living in this environment."

The discovery has profound implications for conservation efforts. If ancient Amazonians successfully managed large populations while maintaining forest health, their techniques might offer valuable lessons for modern sustainable development in the region.

Initial excavations are planned for next year, pending permits from Brazilian authorities and consultation with indigenous communities who consider the area ancestral territory. Researchers are hopeful that on-the-ground investigation will reveal artifacts, burial sites, and other material culture that can further illuminate this lost civilization.

The findings have already sparked renewed interest in reassessing other areas of dense tropical forest that might conceal similar archaeological treasures, with several new survey projects already in planning stages across Central and South America.`,
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop",
    category: "Science",
    author: {
      name: "Dr. Rachel Morrison",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T10:00:00Z",
    readingTime: 7,
    views: 41200,
    tags: ["Archaeology", "Amazon", "History"],
  },
  {
    id: "6",
    title:
      "Championship Final Delivers Dramatic Finish in Front of Record Crowd",
    slug: "championship-final-dramatic-finish",
    excerpt:
      "Underdog team secures victory in the final seconds, completing one of sport's greatest comeback stories.",
    content: `In a match that will be remembered for generations, the underdog United squad secured a stunning 3-2 victory over heavily favored Champions FC in the championship final, scoring the winning goal in the 94th minute before a record crowd of 95,000 spectators.

The dramatic finish capped a remarkable season for United, who were nearly relegated just two years ago and began this campaign with odds of 500-1 to win the championship. Their journey from the brink of disaster to ultimate glory has captivated sports fans worldwide.

"I don't think anyone could have written a script better than this," said United's manager Sarah Williams, fighting back tears during the post-match interview. "These players have shown incredible heart and determination all season."

The match itself was a rollercoaster. Champions FC took an early 2-0 lead within the first 20 minutes, and most observers assumed the final was effectively over. But United pulled one back just before halftime through a brilliant individual effort from midfielder Alex Rodriguez, giving them hope heading into the break.

The second half saw United dominate possession but struggle to break down Champions FC's organized defense. As the clock ticked past 90 minutes, it seemed the comeback would fall just short. Then, in the 94th minute, substitute forward Jamie Chen received a perfect through ball and calmly slotted it past the goalkeeper to level the score.

Before Champions FC could even restart the match, the referee's whistle blew for full time. In the ensuing extra time period, United continued their momentum, and it was Chen again who became the hero, heading in the winner from a corner kick with just seconds remaining.

The victory sparked wild celebrations among United's supporters, who have waited 30 years for a championship title. City officials are already planning a victory parade that's expected to draw hundreds of thousands of fans.

The win also has significant financial implications, with United securing a place in next season's prestigious Continental League and an estimated $50 million in prize money and commercial revenue. More importantly, it validates the club's long-term rebuilding strategy and their commitment to developing young talent.

For Champions FC, it's a devastating loss that will lead to inevitable questions about whether complacency played a role in their collapse. Despite the disappointment, their manager acknowledged United's achievement: "They deserved it. They never gave up, and that's what champions do."

The match drew a global television audience estimated at over 200 million viewers, cementing its place as one of the most-watched sporting events of the year. Already, analysts are calling it the greatest final in the competition's history.`,
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop",
    category: "Sports",
    author: {
      name: "James Cooper",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T22:30:00Z",
    readingTime: 6,
    views: 67300,
    tags: ["Sports", "Championship", "Soccer"],
  },
  {
    id: "7",
    title:
      "Renewable Energy Surpasses Fossil Fuels for First Time in Major Economy",
    slug: "renewable-energy-surpasses-fossil-fuels",
    excerpt:
      "Government data shows clean energy generated 51% of electricity in 2024, marking historic transition.",
    content: `For the first time in its industrial history, renewable energy sources generated more than half of the nation's electricity in 2024, according to data released today by the National Energy Agency.

Wind, solar, and hydroelectric power combined to produce 51% of the country's electricity, with fossil fuels dropping to 42% and nuclear power accounting for the remaining 7%. The milestone represents a dramatic acceleration in the clean energy transition that few experts predicted even five years ago.

"This is a testament to how quickly the energy landscape can change when policy, technology, and economics align," said Energy Secretary Thomas Wright. "Ten years ago, renewables accounted for less than 20% of our electricity mix."

The surge in renewable energy has been driven by several factors. The cost of solar and wind power has plummeted, making them cheaper than fossil fuel alternatives in most regions. Government incentives and corporate sustainability commitments have accelerated deployment, while improved battery storage technology has addressed the intermittency challenges that previously limited renewable adoption.

Wind power led the growth, with offshore wind farms contributing significantly to the increase. The country's offshore wind capacity quadrupled in 2024, with several massive projects coming online ahead of schedule. Solar installations also grew rapidly, with both utility-scale solar farms and residential rooftop systems seeing record deployments.

The transition has not been without challenges. Some regions have experienced grid stability issues as they've integrated large amounts of variable renewable energy. Energy officials are investing heavily in grid modernization, including advanced battery storage systems and improved transmission infrastructure.

The economic impact has been substantial. The renewable energy sector now employs more than 500,000 people, surpassing employment in fossil fuel industries for the first time. However, this transition has been difficult for communities traditionally dependent on coal and natural gas, prompting calls for enhanced support for workers and regions affected by the shift.

Environmental groups celebrated the milestone while emphasizing the need for continued progress. "This is proof that a clean energy future is not just possible—it's happening," said environmental advocate Maria Gonzalez. "But we need to maintain this momentum to meet our climate goals."

Industry analysts predict that renewable energy's share will continue to grow in coming years. Several major utilities have announced plans to achieve 100% clean energy by 2035, and technological improvements are expected to further reduce costs and improve reliability.

The achievement has also sparked international interest, with several countries studying the policies and market conditions that enabled the rapid transition. Energy Minister Wright noted that the country is already sharing its experiences with international partners interested in accelerating their own clean energy deployments.`,
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop",
    category: "Business",
    author: {
      name: "Alexandra Green",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-24T09:00:00Z",
    readingTime: 6,
    views: 22100,
    tags: ["Renewable Energy", "Environment", "Economy"],
  },
  {
    id: "8",
    title:
      "New Exhibition Explores the Evolution of Digital Art in the Modern Era",
    slug: "digital-art-exhibition-modern-era",
    excerpt:
      "Major museum unveils comprehensive retrospective spanning three decades of digital artistic innovation.",
    content: `The Museum of Contemporary Art has opened "Pixels to Reality: 30 Years of Digital Art," a groundbreaking exhibition that traces the evolution of digital art from early computer graphics to today's immersive virtual reality experiences.

Featuring works from over 100 artists across six continents, the exhibition demonstrates how digital tools have fundamentally transformed artistic expression and challenged traditional notions of what art can be. The show runs through September and has already attracted record attendance.

"Digital art has moved from the margins to the mainstream," explained chief curator Dr. Patricia Wong. "This exhibition shows how artists have pushed technological boundaries while grappling with timeless questions about creativity, meaning, and human experience."

The exhibition is organized chronologically, beginning with pioneering works from the 1990s when artists first began seriously exploring computers as creative tools. Early pieces include algorithmic compositions and pixelated images that now look charmingly retro but were revolutionary for their time.

Subsequent sections explore the explosion of possibilities that came with improved computing power, internet connectivity, and sophisticated software. Works range from generative art that creates itself through programmed rules to interactive installations that respond to viewer movement and choice.

A particularly compelling section focuses on NFTs and blockchain art, examining both the creative possibilities and controversies surrounding these recent developments. The museum commissioned several artists to create new works specifically for the exhibition, using technologies that didn't exist when planning began.

The exhibition's centerpiece is a stunning virtual reality environment where visitors can experience immersive digital sculptures and environments. "VR allows artists to create experiences that simply aren't possible in physical space," noted Wong. "It's expanding the definition of what we consider sculpture and installation art."

Social media's influence on digital art receives significant attention, with works exploring how platforms like Instagram have shaped both the creation and consumption of visual culture. Some pieces critically examine surveillance, data privacy, and the commercialization of online spaces.

Educational programming accompanying the exhibition includes workshops where visitors can try digital art tools themselves, artist talks exploring creative processes, and symposiums examining digital art's cultural impact. The museum has also created an extensive online component, making portions of the exhibition accessible to remote viewers.

Art critics have praised the exhibition for its comprehensive scope and thoughtful curation. "This isn't just a technology showcase," wrote critic Robert Hayes. "It's a serious examination of how digital tools have changed the way we make meaning through images and experiences."

The museum reports that the exhibition has attracted an unusually diverse audience, including many first-time visitors intrigued by the digital focus. Museum officials are already discussing the possibility of a touring version that could bring the exhibition to other cities.

As digital technologies continue to evolve rapidly, the exhibition raises questions about what comes next. Artificial intelligence is already beginning to play a role in artistic creation, and several works in the show explore the creative possibilities and ethical questions that arise when machines become collaborators in the artistic process.`,
    imageUrl:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=800&fit=crop",
    category: "Culture",
    author: {
      name: "Rebecca Foster",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-24T11:00:00Z",
    readingTime: 7,
    views: 15600,
    tags: ["Art", "Culture", "Technology"],
  },
  // New articles from id 9 to 30
  {
    id: "9",
    title: "NASA's James Webb Telescope Captures Never-Before-Seen Details of Distant Galaxy",
    slug: "james-webb-telescope-distant-galaxy-details",
    excerpt: "New images reveal intricate structures and star formation patterns in a galaxy 13 billion light-years away.",
    content: `Astronomers using the James Webb Space Telescope have released stunning new images of a galaxy formed just 400 million years after the Big Bang, providing unprecedented insights into the early universe. The images show intricate details of gas clouds, star clusters, and what appears to be a supermassive black hole at the galaxy's center.

"We're seeing structures we never thought would be resolvable at such distances," said Dr. Amir Khan of the Space Telescope Science Institute. "The telescope's sensitivity and resolution are rewriting textbooks on galaxy formation."

The galaxy, designated GLASS-z13, was first detected by Hubble but appeared only as a faint smudge. Webb's infrared instruments pierced through cosmic dust and revealed a complex, rotating disk with spiral-like features, challenging the notion that early galaxies were chaotic and irregular.

Researchers also detected signs of ionized oxygen, indicating that early star formation was more rapid and intense than previously believed. "These stars were forming at a rate hundreds of times faster than in our Milky Way," noted Khan.

The discovery has profound implications for understanding how the first galaxies evolved and how elements necessary for life were dispersed. The team plans to follow up with spectroscopic analysis to determine the galaxy's chemical composition.

The images have sparked excitement across the scientific community, with several follow-up proposals already approved for the next observation cycle.`,
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=800&fit=crop",
    category: "Science",
    author: {
      name: "Dr. Amir Khan",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T12:00:00Z",
    readingTime: 6,
    views: 38900,
    isFeatured: true,
    tags: ["Astronomy", "Space", "James Webb"],
  },
  {
    id: "10",
    title: "AI System Achieves Human-Level Reasoning in Complex Mathematical Problems",
    slug: "ai-human-level-reasoning-mathematics",
    excerpt: "New artificial intelligence model solves advanced mathematical theorems, passing a milestone in AI development.",
    content: `Researchers at DeepMind have unveiled an AI system capable of solving complex mathematical problems at a level comparable to top human mathematicians. The system, named "TheoremSolver," successfully proved 30 of 50 challenging theorems from the International Mathematical Olympiad and generated novel proofs for unsolved problems in number theory.

"This is not just pattern recognition—it's genuine reasoning," said lead researcher Dr. Olivia Chen. "The AI constructs logical chains and explores multiple approaches, similar to how a human mathematician works."

TheoremSolver uses a combination of deep learning and symbolic reasoning, trained on a vast corpus of mathematical literature. Its ability to generate intermediate steps and explain its reasoning in human-readable format sets it apart from previous systems.

The implications extend beyond mathematics. Such reasoning capabilities could accelerate scientific discovery, improve formal verification of software, and enable more robust AI systems in critical applications. Mathematicians are already using TheoremSolver as a collaborative tool to explore new conjectures.

However, some caution that the system still struggles with intuitive leaps and creative insights that characterize truly groundbreaking mathematics. The team acknowledges that while it can solve known problem types, genuine mathematical creativity remains a frontier.

The research has been published in Nature and has ignited debates about the future role of AI in scientific discovery.`,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Technology",
    author: {
      name: "Dr. Olivia Chen",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T09:15:00Z",
    readingTime: 7,
    views: 45200,
    isFeatured: true,
    tags: ["Artificial Intelligence", "Mathematics", "DeepMind"],
  },
  {
    id: "11",
    title: "WHO Approves First-Every Malaria Vaccine with 80% Efficacy",
    slug: "who-approves-first-malaria-vaccine",
    excerpt: "Long-awaited vaccine developed by Oxford University shows unprecedented protection in clinical trials.",
    content: `The World Health Organization has granted prequalification to R21/Matrix-M, the first malaria vaccine to achieve 80% efficacy in large-scale trials. The vaccine, developed by the University of Oxford and manufactured by Serum Institute of India, is set to be rolled out across sub-Saharan Africa starting next month.

"This is a historic moment in the fight against malaria, which kills over 600,000 people annually, mostly children under five," said WHO Director-General Dr. Tedros Adhanom. "An 80% effective vaccine can save hundreds of thousands of lives each year."

The vaccine's efficacy remained above 70% even after two years, with a favorable safety profile. It is also inexpensive to produce, costing approximately $5 per dose. Serum Institute has committed to supplying 200 million doses annually at cost.

Health officials are planning mass vaccination campaigns in 15 high-burden countries. The vaccine will be integrated with existing interventions like bed nets and antimalarial drugs. However, challenges remain in reaching remote communities and maintaining cold chains.

The development marks a triumph of global collaboration, with funding from multiple governments and philanthropic organizations. Researchers are now exploring whether the same technology platform could be adapted for other parasitic diseases.

The announcement has been hailed by humanitarian groups as a potential game-changer for child survival in Africa.`,
    imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Health",
    author: {
      name: "Dr. Amina Diallo",
      avatar: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    publishedAt: "2025-01-26T16:20:00Z",
    readingTime: 6,
    views: 56700,
    isBreaking: true,
    tags: ["Malaria", "Vaccine", "Global Health"],
  },
  {
    id: "12",
    title: "Global Inflation Drops to 2.5% as Central Banks Halt Rate Hikes",
    slug: "global-inflation-drops-central-banks",
    excerpt: "Cooling energy prices and supply chain improvements bring relief to consumers worldwide.",
    content: `Inflation rates across major economies have fallen to an average of 2.5%, the lowest level in three years, prompting central banks to pause further interest rate increases. The decline is attributed to stabilizing energy prices, easing supply chain bottlenecks, and moderating demand.

The U.S. Consumer Price Index rose 2.4% year-over-year, while the Eurozone reported 2.2% and Japan 1.9%. This marks a sharp reversal from the double-digit inflation seen in 2023. "We're seeing a broad-based moderation," said IMF Chief Economist Gita Gopinath. "The global economy is finally returning to pre-pandemic patterns."

However, analysts warn that core inflation, excluding food and energy, remains sticky in some sectors. Services inflation, driven by rising wages, continues to hover around 4%. Central bankers are cautious about declaring victory prematurely.

Financial markets responded positively, with stock indices climbing on hopes that rate cuts could come later this year. Bond yields fell as investors priced in a more dovish monetary policy outlook.

Consumers are beginning to feel the relief, with real wages growing for the first time in two years. Retail sales have rebounded, suggesting that household spending power is recovering. Yet, housing affordability remains a concern due to elevated mortgage rates.

The data will be closely watched by policymakers as they balance the risks of premature easing against the need to support growth.`,
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Business",
    author: {
      name: "Robert Hayes",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T10:30:00Z",
    readingTime: 5,
    views: 31200,
    tags: ["Economy", "Inflation", "Central Banks"],
  },
  {
    id: "13",
    title: "Massive Ocean Cleanup Project Removes 100,000 Tons of Plastic",
    slug: "ocean-cleanup-project-plastic-removal",
    excerpt: "The Ocean Cleanup organization achieves its biggest milestone, with plans to scale operations globally.",
    content: `The Ocean Cleanup, a nonprofit environmental organization, announced that it has removed over 100,000 tons of plastic from the Great Pacific Garbage Patch, surpassing its cumulative goal two years ahead of schedule. The project uses a fleet of floating barriers and extraction systems to collect debris.

"This is a proof of concept that cleanup at scale is possible," said founder Boyan Slat. "But it's also a reminder that we must stop more plastic from entering the ocean."

The removed plastic is sorted and recycled into products, with some being used in ocean-friendly packaging. The organization has also deployed river interceptors in 10 major rivers to capture plastic before it reaches the sea.

Environmental groups have praised the achievement but emphasize that prevention is key. Global plastic production continues to rise, and only 9% of all plastic ever produced has been recycled. The UN is currently negotiating a global plastics treaty to address the issue.

The success has attracted new funding from governments and corporations, enabling The Ocean Cleanup to expand to other ocean gyres and polluted waterways. The long-term goal is to reduce floating plastic by 90% by 2040.

Scientists are monitoring the ecological impact of the cleanup, noting that care must be taken to avoid harming marine life. So far, the organization reports minimal bycatch due to careful design and monitoring.`,
    imageUrl: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Environment",
    author: {
      name: "Elena Rossi",
      avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    publishedAt: "2025-01-25T14:45:00Z",
    readingTime: 6,
    views: 28900,
    tags: ["Ocean", "Plastic Pollution", "Environment"],
  },
  {
    id: "14",
    title: "Foldable Phone Market Surges 200% as New Models Hit Shelves",
    slug: "foldable-phone-market-surge",
    excerpt: "Improved durability and lower prices drive consumer adoption, with Samsung and Huawei leading the race.",
    content: `Global shipments of foldable smartphones more than tripled in 2024, reaching 50 million units, according to IDC. The surge is attributed to significant improvements in hinge durability, display technology, and competitive pricing, with several models now available under $1,000.

Samsung remains the market leader with its Galaxy Z Fold and Flip series, but Chinese manufacturers Huawei, Oppo, and Xiaomi are gaining ground with innovative designs. "The foldable form factor is no longer a niche—it's becoming mainstream," said analyst Marina Zhang.

Consumers are drawn to the combination of portability and larger screen real estate, particularly for media consumption and multitasking. App developers are increasingly optimizing their software for foldable displays, enhancing the user experience.

The growth has boosted the entire supply chain, from flexible OLED panels to hinge components. Display makers like BOE and Samsung Display are ramping up production. However, concerns remain about long-term durability and the environmental impact of more complex devices.

Apple is rumored to be working on a foldable iPad, though a foldable iPhone may still be years away. Meanwhile, Google's Android team has integrated native foldable support, making it easier for developers to adapt.

With competition intensifying, prices are expected to continue falling, potentially reaching mainstream levels within two years.`,
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&h=800&fit=crop",
    category: "Technology",
    author: {
      name: "Marina Zhang",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T08:00:00Z",
    readingTime: 5,
    views: 24300,
    tags: ["Smartphones", "Foldable", "Consumer Electronics"],
  },
  {
    id: "15",
    title: "Ethiopian Prime Minister Wins Nobel Peace Prize for Regional Diplomacy",
    slug: "ethiopian-pm-nobel-peace-prize",
    excerpt: "Recognition for brokering peace deal between Eritrea and Ethiopia and mediating Sudan conflict.",
    content: `Ethiopian Prime Minister Abiy Ahmed has been awarded the Nobel Peace Prize for his efforts to resolve conflicts in the Horn of Africa, including the historic peace agreement with Eritrea and his recent mediation in the Sudanese civil war. The Norwegian Nobel Committee praised his "decisive initiative" to end a 20-year stalemate.

"Peace does not come from the barrel of a gun, but from dialogue and reconciliation," Abiy said in his acceptance speech. He announced that the prize money would be donated to a fund for displaced families in the region.

The prime minister's tenure has seen significant democratic reforms, though critics note ongoing ethnic tensions and human rights challenges. The Nobel Committee acknowledged these issues but emphasized that the prize recognizes his contributions to peace, not a blanket endorsement.

The peace deal with Eritrea reopened borders and restored diplomatic relations, though implementation has been slow. In Sudan, Abiy's mediation helped establish a transitional government, though violence persists in some areas.

Regional leaders welcomed the award, seeing it as recognition of Africa's efforts to solve its own problems. The prize is expected to boost Abiy's standing internationally as he seeks investment and support for development initiatives.

However, some analysts warn that the prime minister faces difficult domestic challenges, including upcoming elections and economic reforms. The Nobel may strengthen his hand but also raises expectations.`,
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=800&fit=crop",
    category: "World",
    author: {
      name: "Kwame Asante",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T07:30:00Z",
    readingTime: 7,
    views: 52100,
    isFeatured: true,
    tags: ["Nobel Prize", "Ethiopia", "Diplomacy"],
  },
  {
    id: "16",
    title: "Breakthrough Gene Therapy Cures Sickle Cell Disease in Clinical Trial",
    slug: "gene-therapy-cures-sickle-cell",
    excerpt: "CRISPR-based treatment shows 100% success rate in small group of patients, offering hope for millions.",
    content: `A new gene-editing therapy has effectively cured sickle cell disease in 12 out of 12 patients in a phase 2 clinical trial, researchers announced at the American Society of Hematology conference. The treatment uses CRISPR-Cas9 to reactivate fetal hemoglobin, compensating for the defective adult hemoglobin.

"These patients are now living normal lives, free from pain crises and hospitalizations," said Dr. Julie Kanter of the University of Alabama, a lead investigator. "It's transformative."

The therapy involves collecting patients' stem cells, editing them in the lab, and infusing them back after mild chemotherapy. All participants remain symptom-free up to two years post-treatment, with stable hemoglobin levels.

Sickle cell disease affects millions worldwide, predominantly people of African descent. Current treatments include blood transfusions and hydroxyurea, but only a bone marrow transplant offers a cure, and few have matching donors.

The therapy, developed by CRISPR Therapeutics and Vertex Pharmaceuticals, is now under review by the FDA. If approved, it could become the first commercial CRISPR-based treatment. However, its cost—estimated at $1–2 million per patient—raises access concerns, especially in low-income countries where the disease is most prevalent.

Patient advocacy groups are calling for tiered pricing and technology transfer to enable local production. Meanwhile, researchers are exploring similar approaches for other genetic disorders like beta-thalassemia.`,
    imageUrl: "https://images.unsplash.com/photo-1674702727317-d29b2788dc4a?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Health",
    author: {
      name: "Dr. Julie Kanter",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T18:00:00Z",
    readingTime: 7,
    views: 47600,
    isBreaking: true,
    tags: ["Gene Therapy", "CRISPR", "Sickle Cell"],
  },
  {
    id: "17",
    title: "Global Tourism Rebounds to Pre-Pandemic Levels, Led by Asia",
    slug: "global-tourism-rebounds-asia",
    excerpt: "International arrivals hit 1.5 billion in 2024, with China and Southeast Asia seeing explosive growth.",
    content: `Global tourism has fully recovered from the COVID-19 pandemic, with international arrivals reaching 1.5 billion in 2024, according to the UNWTO. Asia led the rebound, with countries like Thailand, Japan, and Vietnam seeing record numbers, fueled by pent-up demand and new flight connections.

"Travelers are back, and they're spending more than ever," said UNWTO Secretary-General Zurab Pololikashvili. "But they're also more conscious of sustainability and authentic experiences."

European destinations also thrived, though overtourism concerns prompted measures like visitor caps in Venice and Amsterdam. The cruise industry returned to full operation, with new ships emphasizing eco-friendly technologies.

The rebound has boosted economies heavily dependent on tourism, such as Greece, the Maldives, and Caribbean nations. However, labor shortages persist in many places, and the industry faces pressure to improve wages and working conditions.

Digital nomad trends continue, with countries offering long-term visas to remote workers. Meanwhile, business travel remains below pre-pandemic levels due to the rise of virtual meetings, but hybrid events are gaining traction.

Looking ahead, the UNWTO projects continued growth, though geopolitical tensions and climate change pose risks. Sustainable tourism initiatives, including carbon offset programs and community-based tourism, are becoming mainstream.`,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop",
    category: "Travel",
    author: {
      name: "Sofia Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T11:15:00Z",
    readingTime: 6,
    views: 35700,
    tags: ["Tourism", "Travel", "Economy"],
  },
  {
    id: "18",
    title: "Online Learning Platform Launches Free University-Level Courses in 50 Languages",
    slug: "online-learning-free-courses-languages",
    excerpt: "Nonprofit initiative aims to democratize education by translating top university courses for global access.",
    content: `A new online platform, "OpenEd Global," has launched with over 1,000 free courses from leading universities, translated into 50 languages using AI-powered tools. The initiative, backed by a coalition of foundations and tech companies, seeks to break down language barriers in education.

Courses range from computer science and engineering to humanities and business, all taught by professors from institutions like MIT, Stanford, and Oxford. Learners can earn certificates and even full degrees through partner universities for a nominal fee.

"Education is a human right, yet language remains a huge obstacle," said founder Salman Khan (no relation to Khan Academy). "With AI translation, we can make the world's best courses accessible to anyone with an internet connection."

The platform uses neural machine translation optimized for academic content, ensuring terminology accuracy. Native speakers review courses to maintain quality. Early users in Africa, Latin America, and Southeast Asia report enthusiastic uptake.

Critics point out that internet access remains limited in many regions, and the digital divide persists. The initiative includes partnerships with local organizations to provide offline access and community learning centers.

Governments and NGOs are exploring integration with national education systems. The platform also offers tools for teachers to adapt materials for local contexts. If successful, it could reshape global higher education, reducing reliance on expensive study abroad programs.`,
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop",
    category: "Education",
    author: {
      name: "Salman Khan",
      avatar: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    publishedAt: "2025-01-24T13:00:00Z",
    readingTime: 6,
    views: 21900,
    tags: ["Education", "Online Learning", "AI Translation"],
  },
  {
    id: "19",
    title: "Scientists Create Synthetic Human Embryo Model Without Eggs or Sperm",
    slug: "synthetic-human-embryo-model",
    excerpt: "Breakthrough raises ethical questions as stem cell–derived structures mimic early development.",
    content: `Researchers at the University of Cambridge have created synthetic human embryo-like structures from stem cells, bypassing the need for eggs and sperm. The models, called "blastoids," resemble blastocysts—the stage just after implantation—and could revolutionize understanding of early development and pregnancy loss.

"We can now observe the earliest steps of human development in a dish," said lead scientist Professor Magdalena Zernicka-Goetz. "This could lead to insights into infertility, birth defects, and the effects of drugs on embryos."

The structures are not identical to natural embryos and cannot develop into fetuses, but they exhibit similar cellular organization and gene expression. They were grown to a stage equivalent to 14 days, the legal limit for embryo research in many countries.

The work has sparked ethical debates about the status of synthetic embryos and the need for updated regulations. Some bioethicists argue that if these models become too similar to embryos, they should be subject to the same rules. Others see them as a way to reduce the use of donated embryos in research.

Currently, the guidelines vary by country. The International Society for Stem Cell Research has called for public engagement to inform policy. The Cambridge team has voluntarily stopped growing the structures beyond 14 days pending ethical review.

The research could also aid in developing contraceptives and improving IVF success rates. Meanwhile, similar work in mice has already produced live pups from synthetic embryos, though human applications remain distant.`,
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&h=800&fit=crop",
    category: "Science",
    author: {
      name: "Prof. Magdalena Zernicka-Goetz",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T05:45:00Z",
    readingTime: 7,
    views: 63200,
    isFeatured: true,
    tags: ["Stem Cells", "Embryo", "Ethics"],
  },
  {
    id: "20",
    title: "Summer Olympics 2024: Paris Prepares for Historic Opening Ceremony",
    slug: "paris-olympics-2024-opening-ceremony",
    excerpt: "City transforms with floating parade on the Seine, as security and sustainability take center stage.",
    content: `Paris is putting the final touches on what promises to be the most ambitious Olympic opening ceremony in history: a flotilla of 160 boats carrying athletes along the Seine, past iconic landmarks like Notre-Dame and the Eiffel Tower. The event, set for July 26, will be watched by an estimated 1 billion viewers.

Organizers are touting the Games as the most sustainable ever, with 95% existing or temporary venues, renewable energy, and plant-based catering. The Athletes' Village features geothermal cooling and furniture made from recycled materials.

However, security concerns loom large, with 45,000 police and military personnel deployed. The opening ceremony's open-air format poses unique challenges, and anti-terrorism measures include drone surveillance and riverbed checks.

Athletes from 206 nations are set to compete, with new sports like breakdancing debuting. Ukraine's participation is confirmed, though Russian and Belarusian athletes will compete as neutrals under strict conditions.

The Games are expected to boost tourism and showcase French culture, but some Parisians grumble about disruptions. Organizers emphasize the long-term legacy, including new bike lanes and cleaned-up riverbanks.

Economic forecasts predict a modest boost, with infrastructure investments already benefiting the city. Ticket sales have been strong, though some events remain available.`,
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop",
    category: "Sports",
    author: {
      name: "Jean-Luc Dubois",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T09:00:00Z",
    readingTime: 7,
    views: 84100,
    isBreaking: true,
    tags: ["Olympics", "Paris 2024", "Sports"],
  },
  {
    id: "21",
    title: "Startup Funding Rebounds in 2025 as VCs Focus on AI and Climate Tech",
    slug: "startup-funding-rebounds-2025",
    excerpt: "Global venture capital investment rises 25% after two-year slump, with mega-deals returning.",
    content: `Venture capital funding for startups reached $450 billion in 2024, a 25% increase from the previous year, signaling a recovery from the post-pandemic downturn. AI and climate tech startups captured the largest shares, with several unicorn births and high-profile IPOs.

"Investors are back, but they're more selective," said PitchBook analyst Cameron Miller. "They want startups with clear paths to profitability and sustainable business models, not just growth at any cost."

AI companies raised over $100 billion, led by generative AI and enterprise automation startups. Climate tech attracted $80 billion, with breakthroughs in battery storage, carbon capture, and sustainable agriculture. Biotech and fintech also saw strong activity, though down from peak levels.

The IPO market reopened with several successful listings, including a renewable energy company that now trades at a $20 billion valuation. Acquisitions by big tech firms also picked up, providing exit opportunities.

However, early-stage funding remains constrained compared to 2021, and valuations are more realistic. Diversity in funding improved, with more female and minority founders receiving checks, though progress is slow.

Europe and Asia saw increased activity, while the U.S. maintained its lead. Corporate venture arms played a significant role, particularly in AI and deep tech. Experts caution that macroeconomic uncertainties, including interest rates and geopolitical tensions, could temper the recovery.`,
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=800&fit=crop",
    category: "Business",
    author: {
      name: "Cameron Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T16:30:00Z",
    readingTime: 6,
    views: 28700,
    tags: ["Startups", "Venture Capital", "AI"],
  },
  {
    id: "22",
    title: "Vinyl Records Sales Surpass CDs for First Time Since 1980s",
    slug: "vinyl-records-sales-surpass-cds",
    excerpt: "Nostalgia and audiophile quality drive analog revival, with Taylor Swift and Beatles top sellers.",
    content: `In a milestone for the music industry, vinyl record sales in 2024 exceeded CD sales for the first time since 1987, according to the Recording Industry Association of America. Vinyl generated $1.8 billion in revenue, compared to $1.2 billion for CDs, as collectors and younger listeners embrace the format.

"Vinyl offers a tangible, immersive experience that streaming can't replicate," said music analyst Amanda Green. "It's about ownership, artwork, and ritual."

Taylor Swift was the year's top vinyl seller, with her re-recorded albums dominating charts. The Beatles, Fleetwood Mac, and new artists like Olivia Rodrigo also saw strong vinyl sales. Independent record stores thrived, while major retailers expanded their vinyl sections.

Production capacity has struggled to keep up, with pressing plants running 24/7. New plants are opening globally, and technology is improving to meet demand. However, supply chain issues for raw materials persist.

Streaming remains the dominant format overall, accounting for 84% of music revenue. But physical sales have found a loyal niche, with vinyl now comprising 10% of total revenue. Cassettes are also seeing a modest revival.

Critics note that vinyl's environmental impact—PVC production and heavy shipping—raises concerns. Some labels are experimenting with eco-friendly alternatives like recycled vinyl and plant-based materials.

The trend shows no signs of slowing, with younger consumers driving growth. Record Store Day events continue to draw crowds, and turntable sales are booming.`,
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1200&h=800&fit=crop",
    category: "Culture",
    author: {
      name: "Amanda Green",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-24T15:20:00Z",
    readingTime: 5,
    views: 19800,
    tags: ["Music", "Vinyl", "Culture"],
  },
  {
    id: "23",
    title: "UN Report: Extreme Weather Events Increased 500% in 20 Years",
    slug: "un-report-extreme-weather-increase",
    excerpt: "Climate change drives more frequent and intense disasters, with developing nations hardest hit.",
    content: `A comprehensive report from the UN Office for Disaster Risk Reduction reveals that extreme weather events have increased fivefold over the past two decades, from 1,200 in 2000–2004 to 6,000 in 2020–2024. Floods, storms, and heatwaves account for most of the rise.

"This is the new normal," said UNDRR chief Mami Mizutori. "But it's not just about numbers—each event represents lost lives, destroyed homes, and shattered livelihoods."

The report highlights that developing countries suffer disproportionately, with 90% of deaths from climate-related disasters occurring in low-income nations. Lack of early warning systems, infrastructure, and insurance exacerbates the impact.

Economic losses have surged to $500 billion annually, though actual figures are likely higher due to underreporting. The report calls for increased investment in adaptation, including resilient infrastructure, nature-based solutions, and social protection programs.

The findings come as COP29 approaches, with pressure on wealthy nations to deliver on $100 billion annual climate finance commitments. Developing countries argue that adaptation funding remains insufficient and that loss and damage mechanisms are urgently needed.

Some progress has been made: early warning systems now cover half the world's population, up from a third in 2010. But the report warns that without drastic emissions cuts, extreme events will continue to escalate, overwhelming adaptive capacity.`,
    imageUrl: "https://images.unsplash.com/photo-1506111583091-becfd4bfa05d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "World",
    author: {
      name: "Mami Mizutori",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T11:00:00Z",
    readingTime: 7,
    views: 41200,
    isFeatured: true,
    tags: ["Climate Change", "Extreme Weather", "UN"],
  },
  {
    id: "24",
    title: "6G Research Achieves 1 Terabit per Second in Field Trial",
    slug: "6g-research-terabit-per-second",
    excerpt: "Next-generation wireless technology demo promises 100x faster speeds than 5G, with commercial rollout expected by 2030.",
    content: `Engineers at a joint university-industry consortium have achieved a wireless data transmission speed of 1 terabit per second over a distance of 300 meters in a field trial in Japan. The milestone brings 6G technology closer to reality, with potential applications in holographic communications, real-time AI, and immersive extended reality.

"This is like going from a garden hose to a fire hose," said project lead Dr. Hiroshi Tanaka. "At these speeds, you could download dozens of 4K movies in a second."

The trial used terahertz frequencies (above 100 GHz) and advanced beamforming antennas to overcome signal attenuation. Researchers also demonstrated new modulation schemes and AI-based signal processing that adapts to environmental conditions.

6G is expected to be 100 times faster than 5G, with ultra-low latency and massive connectivity. It could enable seamless integration of physical and digital worlds, including digital twins of cities, autonomous systems, and brain-computer interfaces.

However, significant challenges remain, including hardware miniaturization, power consumption, and regulatory spectrum allocation. The terahertz band is currently unlicensed, but international coordination will be needed to avoid interference.

Industry groups are working toward a draft standard by 2028, with commercial deployments around 2030. Meanwhile, countries including China, the US, South Korea, and Finland are investing heavily in 6G research. The technology is also expected to play a role in bridging the digital divide through satellite-based 6G networks.`,
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop",
    category: "Technology",
    author: {
      name: "Dr. Hiroshi Tanaka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T23:00:00Z",
    readingTime: 6,
    views: 35600,
    tags: ["6G", "Wireless", "Telecom"],
  },
  {
    id: "25",
    title: "Egypt Announces Discovery of 3,500-Year-Old Tomb Near Luxor",
    slug: "egypt-tomb-discovery-luxor",
    excerpt: "Archaeologists uncover well-preserved burial chamber of a nobleman, complete with wall paintings and funerary artifacts.",
    content: `Egypt's Ministry of Tourism and Antiquities has announced the discovery of a remarkably intact tomb dating to the 18th Dynasty (circa 1500 BCE) near Luxor. The tomb belongs to a nobleman named Ptah-em-wia, a royal seal bearer, and features vivid wall paintings depicting his journey to the afterlife.

"This is one of the most significant finds in recent years," said Dr. Mostafa Waziri, Secretary-General of the Supreme Council of Antiquities. "The colors are almost as fresh as the day they were painted."

The burial chamber contains wooden coffins, shabti figurines, and offering trays, providing insights into funerary practices and art of the period. Hieroglyphic texts include spells from the Book of the Dead. Researchers believe the tomb was robbed in antiquity but still retains much of its original contents.

The discovery was made by a joint Egyptian-British team working on the west bank of the Nile. Excavations are ongoing, with more chambers possibly yet to be uncovered. The team plans to use non-invasive techniques to explore further without damaging structures.

The find is expected to boost tourism, which has been recovering after years of instability. Egypt hopes such discoveries will draw visitors back to its ancient sites. The tomb will eventually be opened to the public after conservation.

Meanwhile, other missions continue to work across Egypt, with new finds reported regularly. The country's rich archaeological heritage remains a source of national pride and scientific inquiry.`,
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Science",
    author: {
      name: "Dr. Mostafa Waziri",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-25T18:30:00Z",
    readingTime: 6,
    views: 52100,
    tags: ["Archaeology", "Egypt", "Tomb"],
  },
  {
    id: "26",
    title: "Electric Vehicles Now Account for 25% of New Car Sales Globally",
    slug: "electric-vehicles-25-percent-sales",
    excerpt: "China leads the charge as EV adoption accelerates, driven by falling prices and expanding charging networks.",
    content: `Electric vehicles (EVs) captured a quarter of global new car sales in 2024, according to the International Energy Agency, up from 18% in 2023. China remains the largest market, with EVs accounting for 40% of sales, followed by Europe at 30% and the US at 15%.

The growth is fueled by falling battery costs, which dropped below $100/kWh for the first time, making EVs price-competitive with internal combustion vehicles. Government incentives, emissions regulations, and expanding charging infrastructure also play key roles.

Chinese manufacturers like BYD and Geely have gained market share, offering affordable models with long ranges. Tesla remains a leader, but legacy automakers like Volkswagen, GM, and Ford are ramping up production. New entrants from Vietnam and India are also emerging.

However, challenges persist: charging infrastructure in rural areas remains sparse, and grid capacity needs upgrades to handle increased demand. Battery supply chains face geopolitical tensions, with dependence on critical minerals from a few countries.

The shift to EVs is reducing oil demand and cutting emissions, but environmental concerns around battery production and disposal remain. Recycling technologies are advancing, and second-life applications for batteries are being explored.

The IEA projects that EVs could reach 40% of sales by 2030 if policies remain supportive. Meanwhile, some countries are phasing out internal combustion engine sales by 2035, accelerating the transition.`,
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Business",
    author: {
      name: "IEA Analyst",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T03:15:00Z",
    readingTime: 6,
    views: 29800,
    tags: ["Electric Vehicles", "Automotive", "Energy"],
  },
  {
    id: "27",
    title: "World's Largest Offshore Wind Farm Begins Operation in UK",
    slug: "largest-offshore-wind-farm-uk",
    excerpt: "Hornsea Project 3 can power 2 million homes, cementing UK's leadership in renewable energy.",
    content: `The Hornsea Project 3 offshore wind farm, located off the Yorkshire coast, has officially started full operations, becoming the world's largest with a capacity of 3.6 gigawatts. The facility, comprising 300 turbines, can generate enough electricity to power 2 million British homes.

"This is a monumental achievement for renewable energy," said UK Energy Secretary Claire Coutinho. "It shows that offshore wind can deliver at scale and contribute significantly to our energy security."

The project, developed by Ørsted, covers an area of 700 square kilometers and uses turbines with 250-meter rotors. It is expected to reduce carbon emissions by 5 million tons annually, equivalent to taking 2 million cars off the road.

Construction involved thousands of workers and a complex supply chain, with many components sourced from UK manufacturers. The wind farm will operate for at least 25 years, with plans for eventual repowering.

The UK now has over 15 GW of offshore wind capacity, with a target of 50 GW by 2030. The government is also investing in floating wind technology to access deeper waters.

Environmental groups welcomed the milestone but stressed the need for holistic marine planning to protect ecosystems. The industry is working on reducing impacts on seabirds and marine mammals through careful siting and mitigation measures.

Hornsea 3 is part of a global surge in offshore wind, with projects also expanding in the US, China, and Europe. The sector is expected to play a key role in decarbonizing electricity grids and achieving net-zero goals.`,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop",
    category: "Environment",
    author: {
      name: "Claire Coutinho",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-24T07:45:00Z",
    readingTime: 5,
    views: 24600,
    tags: ["Wind Power", "Renewable Energy", "UK"],
  },
  {
    id: "28",
    title: "New York City FC Wins MLS Cup in Penalty Shootout Thriller",
    slug: "nycfc-wins-mls-cup-penalties",
    excerpt: "Goalkeeper Sean Johnson makes two saves as New York edges LAFC in dramatic final.",
    content: `In a tense MLS Cup final that went the distance, New York City FC defeated LAFC 5-4 on penalties after a 1-1 draw through extra time. Goalkeeper Sean Johnson was the hero, saving two spot-kicks to secure the club's first championship.

"It's the moment you dream of as a kid," said Johnson, who was named MVP. "The guys fought so hard, and to come through in penalties is incredible."

The match at Yankee Stadium saw NYCFC take an early lead through Taty Castellanos, but LAFC equalized in the second half through Carlos Vela. Both teams had chances in extra time, but goalkeepers dominated. The shootout was flawless until Johnson's saves.

The victory caps a remarkable season for NYCFC, who finished third in the Eastern Conference and knocked out top seeds en route to the final. The team's possession-based style, coached by Ronny Deila, has won plaudits.

For LAFC, it's a heartbreaking loss in their first MLS Cup appearance since 2019. Despite a star-studded squad, they couldn't break through NYCFC's defense. The match drew a sellout crowd and strong TV ratings.

The win also secures NYCFC a spot in the CONCACAF Champions League, where they'll face top clubs from Mexico and Central America. The club hopes to build on this success and establish itself as a perennial contender.

Fans celebrated into the night in the Bronx, with a victory parade planned for later in the week. The championship is a milestone for the club, founded in 2015, and for soccer in New York.`,
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sports",
    author: {
      name: "James Cooper",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T02:30:00Z",
    readingTime: 5,
    views: 43100,
    tags: ["MLS", "Soccer", "NYCFC"],
  },
  {
    id: "29",
    title: "Cryptocurrency Market Stabilizes After Landmark SEC Regulations",
    slug: "crypto-market-stabilizes-sec-regulations",
    excerpt: "New rules bring clarity and institutional investment, but critics warn of over-regulation.",
    content: `The cryptocurrency market has entered a period of relative stability following the implementation of comprehensive regulations by the U.S. Securities and Exchange Commission (SEC). The rules classify most digital assets as securities, requiring exchanges to register and comply with investor protections.

Bitcoin and Ethereum have seen reduced volatility, with Bitcoin hovering around $60,000. Institutional investors, including pension funds and asset managers, have increased allocations, citing clearer legal frameworks. The total market capitalization has settled near $3 trillion.

"We finally have guardrails," said Caitlin Long, CEO of Custodia Bank. "This allows responsible innovation while protecting consumers from fraud and manipulation."

However, some crypto advocates argue that the regulations stifle innovation and drive projects offshore. Decentralized finance (DeFi) platforms are grappling with compliance, and some are relocating to jurisdictions with lighter rules.

The SEC has ramped up enforcement against unregistered offerings, with several high-profile settlements. Meanwhile, Congress is considering additional legislation to address gaps, particularly around stablecoins.

Globally, regulatory approaches vary. The EU has implemented MiCA (Markets in Crypto-Assets) regulation, while Asia is seeing a patchwork of rules. International coordination remains a challenge.

The stablecoin market has grown, with USDC and USDT now widely used in payments and remittances. Central bank digital currencies (CBDCs) are also advancing, with China's digital yuan leading pilot programs.

The long-term impact of regulation remains to be seen, but many believe it's a necessary step for mainstream adoption.`,
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop",
    category: "Business",
    author: {
      name: "Caitlin Long",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-27T14:00:00Z",
    readingTime: 7,
    views: 37200,
    tags: ["Cryptocurrency", "Regulation", "SEC"],
  },
  {
    id: "30",
    title: "Social Media Platform 'Vibe' Gains 500 Million Users in First Year",
    slug: "vibe-social-media-platform-growth",
    excerpt: "New app's algorithm-free, ephemeral content model resonates with Gen Z, challenging established giants.",
    content: `A new social media app called Vibe has exploded in popularity, amassing 500 million active users within its first year, making it the fastest-growing platform in history. Vibe's unique selling point: no algorithms, no ads, and content that disappears after 24 hours.

"Users are tired of being manipulated by algorithms and bombarded with ads," said Vibe founder and CEO Maya Patel. "We give them a simple, authentic space to connect with friends."

Vibe's interface resembles a cross between early Instagram and Snapchat, with chronological feeds and ephemeral stories. It also offers group "rooms" for intimate conversations and a "vibe check" feature that lets users share real-time moods.

The app has particularly resonated with Gen Z, who appreciate its privacy focus and lack of public metrics (no likes or followers count). Celebrities and influencers have flocked to the platform, further driving growth.

Critics question how Vibe will eventually monetize, given its ad-free stance. Patel hints at optional premium features like exclusive content and enhanced privacy controls. The company has raised $2 billion at a $50 billion valuation.

Established platforms are taking notice. Meta and Snapchat have reportedly explored copying some of Vibe's features, though analysts say algorithmic feeds are too ingrained in their business models.

Privacy advocates praise Vibe's minimal data collection and encryption. However, concerns about content moderation and illegal activity remain, as ephemeral content can be harder to track. The company says it uses AI and human moderators to enforce rules.

Whether Vibe can sustain its growth remains to be seen, but it has already disrupted the social media landscape, forcing rivals to reconsider their strategies.`,
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop",
    category: "Technology",
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    publishedAt: "2025-01-26T19:45:00Z",
    readingTime: 6,
    views: 88400,
    isFeatured: true,
    tags: ["Social Media", "Vibe", "Tech"],
  },
];

// Utility functions for mock data
export function getArticleById(id: string): Article | undefined {
  return mockArticles.find((article) => article.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return mockArticles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getFeaturedArticles(): Article[] {
  return mockArticles.filter((article) => article.isFeatured);
}

export function getBreakingNews(): Article | undefined {
  return mockArticles.find((article) => article.isBreaking);
}

export function getTrendingArticles(): Article[] {
  return [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

export function getRelatedArticles(
  currentArticleId: string,
  limit: number = 3,
): Article[] {
  const currentArticle = getArticleById(currentArticleId);
  if (!currentArticle) return [];

  // Get articles from same category, excluding current article
  const related = mockArticles.filter(
    (article) =>
      article.id !== currentArticleId &&
      article.category === currentArticle.category,
  );

  return related.slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Format date for featured carousel with full date and time
export function formatDateFull(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day} ${month} ${year} · ${hours}:${minutes} ${ampm}`;
}
