

'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

 function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Car Audio Expert</title>
        <meta name="description" content="Review the official Terms and Conditions of the Car Audio Expert website." />
      </Head>

      <div className="container mx-auto px-4 py-10 text-black">
        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Terms and Conditions
        </motion.h1>

        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {[
            {
              title: '1. Introduction',
              content:
                `Website Agreement: By using the Car Audio Expert website, you accept and agree to be bound by these terms and conditions.\n\n` +
                `Contractual Relationship: These terms create a binding contract between you and The Trustee for Green Locals Australia Trust, trading as Car Audio Expert (ABN: 51 799 255 761).\n\n` +
                `Non-Acceptance: If you do not agree to these terms, you must not use the website.\n\n` +
                `Updates to website Terms and Conditions: We may modify these terms at any time by updating this page. Your continued use of the website after such updates indicates your acceptance of the new terms.`
            },
            {
              title: '2. Website Access and Use',
              content:
                `You are authorized to use this website solely in accordance with these terms and applicable laws. You must also ensure that your employees, sub-contractors, and other agents using or accessing the website comply with these terms.`
            },
            {
              title: '3. User Obligations',
              content:
                `You are prohibited from engaging in the following activities on the website:\n\n` +
                `• Copying, mirroring, translating, adapting, or modifying any part of the website without authorization;\n` +
                `• Using the website for unauthorized or fraudulent purposes;\n` +
                `• Interfering with, disrupting, or overloading the website operations;\n` +
                `• Using automated scripts or software in conjunction with the website;\n` +
                `• Engaging in behavior that negatively impacts our reputation or security;\n` +
                `• Attempting unauthorized access or conducting security breaches.`
            },
            {
              title: '4. Website Content and Information',
              content:
                `Commitment to Accuracy: We strive to ensure that the information on our website is as current and precise as possible.\n\n` +
                `No Guarantees Provided: Despite our efforts, you acknowledge and agree to the maximum extent permitted by law, that we do not guarantee:\n\n` +
                `• The website will be entirely free from errors or defects.\n` +
                `• The website will be continuously accessible.\n` +
                `• Messages sent through the website will be delivered promptly, or indeed at all.\n` +
                `• Information you receive or provide through the website will be secure or remain confidential.\n` +
                `• Any information available on the website is completely accurate or truthful.\n\n` +
                `Right to Modify Content: We reserve the right to alter any content or functionality on the website, including product descriptions, pricing, and other website content, at any time without prior notification.`
            },
            {
              title: '5. Intellectual Property Rights',
              content:
                `All materials on the website, including designs, text, graphics, logos, and software, are owned by or licensed to us.\n\n` +
                `You may make a temporary electronic copy of parts of the website for personal viewing. Any other use, including reproduction and distribution, requires prior written consent from us.`
            },
            {
              title: '6. External Links',
              content:
                `This website may include links to external websites. These are provided for convenience, and we do not endorse or assume responsibility for the content or practices of these sites.`
            },
            {
              title: '7. Security Measures',
              content:
                `We are committed to maintaining the security of our website; however, we cannot guarantee that our site is immune to cyber threats. We advise taking personal precautions when accessing the website.`
            },
            {
              title: '8. Reporting Misuse',
              content:
                `Please report any misuse of the website, errors, or accessibility issues to the contact information provided on our site.`
            },
            {
              title: '9. Privacy Policy',
              content:
                `Your use of this website is also governed by our Privacy Policy, which is incorporated into these terms by reference and available here: Privacy Policy.`
            },
            {
              title: '10. Limitation of Liability',
              content:
                `We disclaim all liability for any losses or damages you might incur as a result of using this website. You agree to indemnify us against any losses, damages, or claims arising from your use of our website.`
            },
            {
              title: '11. General Legal Provisions',
              content:
                `• Governing Law and Jurisdiction: This agreement is governed by the laws of Victoria, Australia. Each party irrevocably submits to the exclusive jurisdiction of the courts of Victoria, Australia.\n\n` +
                `• Waiver: No party may rely on any conduct as a waiver unless in writing.\n\n` +
                `• Severance: If any term is unenforceable, it will be severed without affecting the rest.\n\n` +
                `• Joint and Several Liability: Obligations bind both parties jointly and severally.\n\n` +
                `• Assignment: You cannot assign your rights without written consent.\n\n` +
                `• Entire Agreement: This is the full agreement and overrides previous understandings.\n\n` +
                `• Interpretation: References to the singular include the plural and vice versa. Terms like "includes" are not limiting. All currency references are in AUD.`
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              {section.content.split('\n').map((line, i) => (
                <p key={i} className="text-gray-700 mb-2 whitespace-pre-wrap">{line.trim()}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default TermsAndConditions