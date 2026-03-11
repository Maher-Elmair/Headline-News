import { motion } from "motion/react";
import {
  Award,
  Users,
  Target,
  Heart,
  Shield,
  TrendingUp,
  Globe,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

// Core Values - now 4 items, each hinting at API-driven content
const values = [
  {
    icon: Shield,
    title: "Editorial Integrity",
    description:
      "We maintain the highest standards of journalistic ethics and fact-checking across all API-sourced content.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Our API integrations prioritize content that serves the interests and needs of our global community.",
  },
  {
    icon: Globe,
    title: "Global Perspectives",
    description:
      "By aggregating news from diverse international APIs, we bring you a wide range of viewpoints and stories.",
  },
  {
    icon: Zap,
    title: "Real-Time Accuracy",
    description:
      "APIs enable us to deliver breaking news with minimal latency, ensuring you get the facts as they happen.",
  },
];

// Editorial Standards - expanded to 4 items, emphasizing API quality control
const editorialStandards = [
  {
    icon: Award,
    title: "Award-Winning Curation",
    description:
      "Our team curates API-fetched content with the same rigor as original reporting, selecting only the most reliable sources.",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description:
      "Automated cross-referencing across multiple APIs helps verify facts and filter out misinformation in real time.",
  },
  {
    icon: Shield,
    title: "Source Transparency",
    description:
      "Every article displays its originating API and publication, so you know exactly where the information comes from.",
  },
  {
    icon: Users,
    title: "Inclusive Coverage",
    description:
      "Our API network is deliberately chosen to represent voices and stories from underrepresented regions and communities.",
  },
];

// API Sources section - now with specific API names
const apiSources = [
  {
    icon: TrendingUp,
    title: "FINNHUB",
    description:
      "Financial market data and business news integrated via dedicated API.",
  },
  {
    icon: Globe,
    title: "NewsData.io",
    description:
      "Comprehensive global news coverage from thousands of sources.",
  },
  {
    icon: Zap,
    title: "Jina AI",
    description: "AI-powered content extraction and readability enhancement.",
  },
];

// Technical Features - expanded to 4 items
const features = [
  {
    icon: Award,
    title: "Premium Experience",
    description:
      "Clean, modern design optimized for readability across all devices with customizable reading preferences.",
  },
  {
    icon: TrendingUp,
    title: "Trending Topics",
    description:
      "Discover what's trending and stay connected with the most discussed stories and emerging news.",
  },
  {
    icon: Heart,
    title: "Reader-Focused",
    description:
      "Every feature is designed with your reading comfort and information needs in mind.",
  },
  {
    icon: Globe,
    title: "API-Powered Content",
    description:
      "All articles are dynamically fetched from trusted third-party APIs, ensuring freshness and variety.",
  },
];

const mission = {
  icon: Target,
  title: "Our Mission",
  description:
    "To deliver credible, timely, and engaging news content that keeps our readers informed about the world around them. We are committed to journalistic excellence, accuracy, and comprehensive coverage across all topics that matter most to our global audience.",
};

const vision = {
  icon: Globe,
  title: "Our Vision",
  description:
    "To become the leading digital news platform recognized for exceptional journalism, innovative storytelling, and an unparalleled reading experience. We envision a future where quality news is accessible, engaging, and empowers our community to make informed decisions.",
};

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge
            className="mb-4 bg-linear-to-r from-primary/20 to-blue-500/20 border-primary/30"
            variant="secondary"
          >
            About Our Platform
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
            About Headline
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Headline is your premier destination for quality journalism,
            breaking news, and in-depth stories from around the world. We
            combine journalistic excellence with cutting-edge technology to
            deliver an unparalleled news experience.
          </p>
        </motion.div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Mission and Vision */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <mission.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    {mission.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <vision.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    {vision.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {vision.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Core Values - now 4 items */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg font-bold">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Editorial Standards - now 4 items */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            Editorial Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editorialStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                        <standard.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-2">
                          {standard.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {standard.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Powered by Real-Time APIs - with API names and id for linking */}
      <section
        id="api-status"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center">
            Powered by Real-Time APIs
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            All articles on Headline are dynamically fetched through trusted
            third-party APIs, ensuring our content is always fresh, diverse, and
            accurate. We leverage the following data sources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apiSources.map((source, index) => (
              <motion.div
                key={source.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <source.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg font-bold">
                        {source.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {source.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Technical Features - now 4 items */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            Technical Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-r from-primary/5 via-blue-500/5 to-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay informed with Headline. Follow us on social media for
              breaking news alerts, exclusive content, and behind-the-scenes
              insights from our newsroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trending">
                <Button size="lg" className="gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Explore Trending Stories
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="gap-2">
                  <Globe className="h-5 w-5" />
                  Browse All Topics
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutPage;
