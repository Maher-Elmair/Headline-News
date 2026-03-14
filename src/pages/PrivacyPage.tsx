import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: March 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                Headline is committed to protecting your privacy. This platform operates as a 
                demonstration news website and does not collect, store, or process any personal 
                information from visitors. All features are implemented using client-side technologies 
                with data fetched from third‑party APIs for demonstration purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Information We Don't Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is a static demonstration website that does not:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Collect personal information (names, email addresses, phone numbers, etc.)</li>
                <li>Use cookies for tracking or analytics</li>
                <li>Store user data on servers or databases</li>
                <li>Process payments or financial information</li>
                <li>Integrate with third-party analytics services</li>
                <li>Track user behavior across sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                The application uses browser localStorage exclusively for enhancing your experience:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc mt-4">
                <li>
                  <strong>Theme Preference:</strong> Stores your light/dark mode selection
                </li>
                <li>
                  <strong>Reading Settings:</strong> Saves your customized article reading preferences 
                  (font size, colors, layout)
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This data never leaves your browser and can be cleared at any time through your 
                browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">External Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website may contain links to external sites and social media platforms. 
                We are not responsible for the privacy practices or content of these external sites. 
                We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Replaced Mock Data with two new sections */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Data Sources</h2>
              <p className="text-muted-foreground leading-relaxed">
                All articles, headlines, and news content displayed on Headline are dynamically 
                fetched through trusted third‑party APIs. We do not write or generate any of the 
                news content manually. Our platform integrates with the following types of APIs:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc mt-4">
                <li>Financial market data and business news APIs</li>
                <li>Global news aggregation APIs</li>
                <li>AI‑powered content extraction APIs</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This approach ensures that our content is always fresh, diverse, and up‑to‑date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Headline aggregates news from various third‑party API providers. We do not 
                independently verify, endorse, or take responsibility for the accuracy, 
                completeness, or reliability of any article, word, or character published on 
                this website. All content is provided "as is" from the respective sources. 
                By using this site, you acknowledge that Headline shall not be held liable 
                for any errors, omissions, or any losses arising from the use of the information 
                presented.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Since this is a client-side only application with no backend infrastructure, there 
                is no server-side data storage that could be compromised. The application is deployed 
                on secure hosting infrastructure with HTTPS encryption.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This demonstration website does not knowingly collect any information from anyone, 
                including children under the age of 13.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This privacy policy may be updated periodically to reflect changes in our practices 
                or for legal and regulatory reasons. Any updates will be posted on this page 
                with a new "last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or our practices, please visit 
                the About page for contact information or reach out to us at contact@headline.com.
              </p>
            </section>

            <section className="bg-linear-to-r from-primary/5 via-blue-500/5 to-primary/5 rounded-xl p-6 border border-primary/10">
              <h2 className="font-serif text-2xl font-bold mb-4">Demonstration Platform</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Headline operates as a demonstration news platform. 
                While we showcase best practices in web design and user experience, all articles, 
                images, and content are fetched from third‑party APIs to illustrate the platform's 
                capabilities and design principles. We do not claim ownership or editorial control 
                over the displayed content.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PrivacyPage;