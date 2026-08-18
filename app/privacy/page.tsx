import {
  LegalPage,
  LegalToc,
  LegalSection,
  LegalBody,
  LegalFine,
  LegalList,
  LegalDefinition,
  LegalNotice,
  LegalTable,
  LegalLink,
} from "../components/legal";

/**
 * /privacy
 *
 * Restyle only. Every string on this page is byte-identical to the previous
 * version: no legal text was edited, reworded, reordered or removed. What
 * changed is the chrome, which moved from local Blobs/Shell/card helpers on the
 * old global variables to the shared primitives in components/legal.tsx.
 *
 * The sections array is kept. Its `id`s already existed but nothing linked to
 * them; a table of contents now does.
 *
 * Factual defects in this text are recorded in legal-audit-2026-08.md and are
 * deliberately NOT fixed here. They need legal review, not a design pass.
 */

const PRIVACY_EMAIL = "privacy@unpackmath.com";

const sections = [
  {
    id: "who-we-are",
    number: "01",
    title: "Who We Are",
    content: (
      <>
        <LegalBody>
          UnpackMath is an adaptive math learning platform designed to help students prepare for college placement
          assessments. The Platform is operated by UnpackMath, a trade name of JDOM LLC, a Texas-based limited
          liability company. We serve two primary audiences:
        </LegalBody>
        <LegalDefinition label="Institutions">
          Schools, community colleges, and testing centers that license our platform for use with their students.
        </LegalDefinition>
        <LegalDefinition label="Individual Users">
          Students and learners who access the platform directly through a personal subscription.
        </LegalDefinition>
        <LegalBody>
          For privacy-related questions, contact us at <LegalLink href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</LegalLink>
        </LegalBody>
      </>
    ),
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <LegalBody>We collect only the information necessary to operate and improve our services.</LegalBody>
        {[
          {
            label: "Information You Provide Directly",
            items: [
              "Account registration: name and email address, via Google OAuth.",
              "Institutional information: school or organization name, district, and point-of-contact details.",
              "Payment information: processed securely through a third-party processor. We do not store your card number.",
              "Communications: messages you send through contact forms or email.",
            ],
          },
          {
            label: "Information Collected Automatically",
            items: [
              "Usage data: pages visited, features used, time spent, and actions taken.",
              "Performance data: quiz scores, question responses, accuracy rates, and learning progress.",
              "Device information: browser type, operating system, IP address, and device identifiers.",
              "Cookies and similar technologies: used to maintain sessions and analyze usage. Analytics are processed through PostHog. Error monitoring is processed through Sentry.",
            ],
          },
          {
            label: "Information from Institutions",
            items: [
              "When we contract with a school, the institution may provide student roster data such as names, grade levels, or student ID numbers for account setup. In this context, the institution acts as the data controller and we act as a service provider.",
            ],
          },
        ].map(({ label, items }) => (
          <LegalDefinition key={label} label={label}>
            <LegalList items={items} />
          </LegalDefinition>
        ))}
      </>
    ),
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Your Information",
    content: (
      <>
        <LegalList
          items={[
            "Create and manage your account and deliver the services you requested.",
            "Personalize your learning experience through our adaptive engine.",
            "Track and display your academic progress and assessment results.",
            "Communicate with you about your account, updates, and support.",
            "Improve our Platform, fix bugs, and develop new features.",
            "Process payments and manage billing.",
            "Comply with legal obligations and enforce our Terms of Service.",
            "Use an algorithmic adaptive engine to adjust question difficulty based on your responses. We do not use third-party AI models to make decisions about individual students.",
          ]}
        />
        <div style={{ height: "22px" }} />
        <LegalNotice label="Important">
          We do not use student data for targeted advertising, and we do not sell student data to third parties under
          any circumstances.
        </LegalNotice>
      </>
    ),
  },
  {
    id: "legal-basis",
    number: "04",
    title: "Legal Basis and Compliance",
    content: (
      <>
        {[
          {
            law: "FERPA",
            full: "Family Educational Rights and Privacy Act",
            desc: 'If we receive student education records from a school, we operate as a "school official" under FERPA, using that information solely for educational purposes as authorized by the institution.',
          },
          {
            law: "COPPA",
            full: "Children's Online Privacy Protection Act",
            desc: "Our Platform is not directed to children under 13. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If a school enrolls students under 13, the school provides consent as permitted by the FTC's school exception to COPPA.",
          },
          {
            law: "TDPSA",
            full: "Texas Data Privacy and Security Act",
            desc: "As a Texas-based business, we comply fully with the TDPSA (effective July 1, 2024). We collect only data adequate and relevant for our stated purposes, honor universal opt-out signals, and treat data from users under 13 as sensitive.",
          },
          {
            law: "Texas Student Privacy Act",
            full: "Ed. Code Section 32.151",
            desc: "When contracting with K-12 institutions in Texas, we comply with prohibitions on targeted advertising using student data, selling student data, and building non-educational profiles of students.",
          },
          {
            law: "Texas SB 1792",
            full: "",
            desc: "We maintain written data security practices, support parental rights to review and request deletion of student data, and do not use student information for any purpose beyond delivering our educational services.",
          },
        ].map(({ law, full, desc }) => (
          <LegalDefinition key={law} label={law} sub={full || undefined}>
            {desc}
          </LegalDefinition>
        ))}
      </>
    ),
  },
  {
    id: "how-we-share",
    number: "05",
    title: "How We Share Your Information",
    content: (
      <>
        <LegalBody>
          We do not sell your personal information. We may share information only in the following limited
          circumstances:
        </LegalBody>
        {[
          ["Service Providers", "Trusted vendors who help us operate the Platform, including Supabase (database and authentication), Vercel (hosting), PostHog (analytics), Sentry (error monitoring), Resend (transactional email), and Upstash (infrastructure). They are contractually bound to protect your data and may only use it to provide services on our behalf."],
          ["Institutional Partners", "If you access the Platform through a school, we may share your performance data with authorized staff at that institution."],
          ["Legal Requirements", "If required by law, court order, or government authority, we may disclose information as necessary."],
          ["Business Transfers", "In a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before it becomes subject to a different privacy policy."],
          ["With Your Consent", "We may share information for any other purpose with your explicit consent."],
        ].map(([label, desc]) => (
          <LegalDefinition key={label} label={label}>
            {desc}
          </LegalDefinition>
        ))}
      </>
    ),
  },
  {
    id: "data-retention",
    number: "06",
    title: "Data Retention",
    content: (
      <>
        {[
          ["Active Accounts", "Data is retained for the duration of your subscription or institutional agreement."],
          ["Inactive Accounts", "Data is deleted or anonymized after 12 months of inactivity, unless a longer period is required by law or requested by an institution."],
          ["Student Data from Institutions", "Returned or deleted upon termination of the institutional agreement, in accordance with the terms of that agreement."],
        ].map(([label, desc]) => (
          <LegalDefinition key={label} label={label}>
            {desc}
          </LegalDefinition>
        ))}
      </>
    ),
  },
  {
    id: "your-rights",
    number: "07",
    title: "Your Privacy Rights",
    content: (
      <>
        <LegalBody>
          Depending on your location and applicable law, you may have the following rights:
        </LegalBody>
        {[
          ["Access", "Request a copy of the personal information we hold about you."],
          ["Correction", "Request that we correct inaccurate or incomplete data."],
          ["Deletion", "Request deletion of your personal information, subject to legal obligations."],
          ["Opt-Out", "Opt out of any data processing not strictly necessary for the service."],
          ["Data Portability", "Request your data in a portable format."],
          ["Parental Rights", "Parents of minor students may review, correct, or request deletion of their child's data."],
        ].map(([label, desc]) => (
          <LegalDefinition key={label} label={label}>
            {desc}
          </LegalDefinition>
        ))}
        <LegalBody>
          To exercise any of these rights, contact us at{" "}
          <LegalLink href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</LegalLink>. We will respond within 45 days as
          required by Texas law.
        </LegalBody>
      </>
    ),
  },
  {
    id: "cookies",
    number: "08",
    title: "Cookies and Tracking",
    content: (
      <>
        <LegalBody>
          We use cookies and similar technologies to keep you logged in during a session, remember your preferences
          and settings, and analyze how users interact with the Platform to improve the experience.
        </LegalBody>
        <LegalNotice>
          You may disable cookies through your browser settings, but doing so may affect some Platform functionality.
          We do not use cookies for targeted advertising.
        </LegalNotice>
      </>
    ),
  },
  {
    id: "data-security",
    number: "09",
    title: "Data Security",
    content: (
      <>
        <LegalBody>
          We implement and maintain reasonable administrative, technical, and physical security measures to protect
          your personal information. These include:
        </LegalBody>
        <LegalList
          items={[
            "Encrypted data transmission (HTTPS/TLS).",
            "Secure password storage using industry-standard hashing.",
            "Access controls limiting who within our organization can view personal data.",
            "Regular security reviews and updates.",
          ]}
        />
        <div style={{ height: "22px" }} />
        <LegalBody>
          No system is 100% secure. In the event of a data breach that affects your rights, we will notify affected
          users and institutions as required by applicable law.
        </LegalBody>
      </>
    ),
  },
  {
    id: "changes",
    number: "10",
    title: "Changes to This Policy",
    content: (
      <>
        <LegalBody>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or
          applicable law. When we make material changes, we will:
        </LegalBody>
        <LegalList
          items={[
            'Update the "Last Updated" date at the top of this policy.',
            "Notify registered users via email or an in-platform notice.",
          ]}
        />
        <div style={{ height: "22px" }} />
        <LegalBody>
          Your continued use of the Platform after any changes constitutes your acceptance of the updated policy.
        </LegalBody>
      </>
    ),
  },
  {
    id: "contact",
    number: "11",
    title: "Contact Us",
    content: (
      <>
        <LegalTable
          rows={[
            ["Platform", "UnpackMath"],
            ["Email", <LegalLink key="e" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</LegalLink>],
            ["Website", <LegalLink key="w" href="https://www.unpackmath.com">www.unpackmath.com</LegalLink>],
          ]}
        />
        <div style={{ height: "18px" }} />
        <LegalBody>
          For complaints related to student data privacy in Texas, you may also contact the Texas Attorney
          General&apos;s Consumer Protection Division at{" "}
          <LegalLink href="https://texasattorneygeneral.gov">texasattorneygeneral.gov</LegalLink>.
        </LegalBody>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy."
      meta={["Effective: May 26, 2026", "Last Updated: June 26, 2026", "UnpackMath · Texas"]}
      intro={
        <>
          <LegalBody>
            UnpackMath (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of
            every person who visits or uses unpackmath.com (the &quot;Platform&quot;). This Privacy Policy explains
            what information we collect, how we use it, who we share it with, and what rights you have.
          </LegalBody>
          <LegalBody>
            By accessing or using our Platform, you agree to the practices described in this policy. If you do not
            agree, please do not use our Platform.
          </LegalBody>
        </>
      }
      toc={<LegalToc items={sections.map(({ id, number, title }) => ({ id, number, title }))} />}
      closing={
        <LegalFine>
          This Privacy Policy was prepared in good faith to reflect current federal and Texas state requirements as of
          the effective date above. UnpackMath recommends periodic legal review as laws and regulations evolve. This
          document does not constitute legal advice.
        </LegalFine>
      }
    >
      {sections.map(({ id, number, title, content }) => (
        <LegalSection key={id} id={id} number={number} title={title}>
          {content}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
