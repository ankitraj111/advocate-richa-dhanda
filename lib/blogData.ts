export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  warningBox?: string;
}

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  cat: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  link?: string;
  tags: string[];
  takeaways: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
}

export const CATEGORIES = [
  "All",
  "Awards & Recognition",
  "Work Visas",
  "Student Visas",
  "PR Updates",
  "Appeals",
  "Immigration Policy",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-get-work-visa-abroad",
    cat: "Work Visas",
    title: "How to Legally Get a Work Visa Abroad: Simple Step-by-Step Guide for Beginners (2026)",
    subtitle:
      "A complete, easy-to-understand legal roadmap covering verified employer job offers, required papers, LMIA/CoS sponsorships, and how to avoid fake visa agent scams.",
    excerpt:
      "Planning to work in Canada, the UK, or Australia? Here is an easy, honest guide in plain English explaining verified job offers, required papers, LMIA/sponsorship, and how to avoid fake visa agent scams.",
    date: "08 Oct 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Work Visa",
      "Canada LMIA",
      "UK Skilled Worker",
      "Australia Subclass 482",
      "Job Offer Abroad",
      "Visa Scams Prevention",
      "Legal Due Diligence",
    ],
    takeaways: [
      "In 90%+ cases, a genuine work visa requires an approved employer sponsor first (e.g., LMIA in Canada, CoS in the UK, Subclass 482 in Australia).",
      "Never travel on a Tourist or Visit Visa expecting to 'convert' it abroad — doing so leads to immediate deportation and 5-year travel bans.",
      "Check that your job offer comes from an official company email and that the employer is registered on official government sponsor lists.",
      "Always have your employment contract and visa papers verified by a licensed High Court immigration advocate before transferring any fee.",
    ],
    sections: [
      {
        heading: "1. What is an Overseas Work Visa in Plain Words?",
        paragraphs: [
          "Moving abroad for a high-paying job is a life goal for thousands of skilled people across India. Countries like Canada, the UK, Australia, Germany, and New Zealand offer high wages, professional growth, and an outstanding quality of life.",
          "A work visa (often called a work permit) is simply legal permission granted by a foreign government that allows a person from another country to enter and work there for a specific employer or time period.",
          "Working abroad without this official permission is strictly illegal under international law. Anyone caught working on an unauthorized visa faces immediate detention, deportation, and multi-year or lifetime travel bans.",
        ],
      },
      {
        heading: "2. Do You Need a Job Offer Before Applying?",
        paragraphs: [
          "In almost 90% of cases: YES. You cannot simply apply for a work permit on your own without an overseas employer who is legally ready and approved to hire you.",
          "Different countries have different legal names for employer permission:",
        ],
        bulletPoints: [
          "Canada: Requires an approved LMIA (Labour Market Impact Assessment) issued by ESDC, or an LMIA-exempt intra-company code.",
          "United Kingdom: Requires a Certificate of Sponsorship (CoS) issued by an employer holding an active UK Home Office Sponsor Licence.",
          "Australia: Requires Standard Business Sponsorship (SBS) and nomination under Subclass 482 (TSS) or Subclass 186.",
          "Germany / EU: Requires an official German employment contract satisfying the EU Blue Card minimum wage threshold.",
        ],
      },
      {
        heading: "3. Essential Documents Checklist for Your Visa Application",
        paragraphs: [
          "Before submitting your biometric files or application at VFS Global / TLScontact or the foreign embassy, make sure you have gathered the following authentic papers:",
        ],
        bulletPoints: [
          "Valid Indian Passport: Must have at least 18 to 24 months validity remaining.",
          "Official Job Offer Letter: Must state your salary, job duties, working hours, and employer business registration details.",
          "Educational Degrees & Transcripts: WES / UK ENIC evaluated where mandatory.",
          "Work Experience Proof: Authentic experience letters, appointment letters, bank salary credits, and Form 16 / ITR tax records.",
          "Recognized English Proficiency: Test Report Form for IELTS General Training or PTE Academic.",
          "Police Clearance Certificate (PCC): Issued directly by the Regional Passport Office (RPO).",
          "Medical Fitness Certificate: Issued only by an embassy-authorized panel physician.",
        ],
      },
      {
        heading: "4. Warning: How to Spot Fake Visa Agents & Red Flags",
        paragraphs: [
          "Every month, thousands of job-seekers from Punjab, Haryana, and across India lose their family savings to unverified consultants. Be alert to these dangerous red flags:",
        ],
        bulletPoints: [
          "Job offers sent from free email accounts like @gmail.com or @yahoo.com instead of official corporate domains.",
          "Guarantees of 100% visa approval within 10–15 days without any interview or verifiable sponsor license number.",
          "Agents asking you to travel on a 'Tourist Visa' with the promise that they will 'convert' it to a work permit on arrival (this is illegal and a trap).",
          "Requests to transfer money into personal savings accounts instead of official corporate firm accounts.",
        ],
        warningBox:
          "CRITICAL STATUTORY WARNING: Entering any foreign country on a tourist or visitor visa with the intention of working is an immigration offense. Never hand over your original passport to unlicensed agents.",
      },
      {
        heading: "5. The Safe & Legal Way Forward",
        paragraphs: [
          "Before you pay any recruitment fee or sign an international contract, obtain an independent legal contract review by an enrolled High Court immigration advocate.",
          "Advocate Dr. Richa Dhanda personally verifies foreign sponsor license registries, labor certification authenticity, and embassy submission compliance to protect candidates from immigration fraud.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I apply for an overseas work visa without a job offer?",
        a: "In over 90% of countries like Canada, the UK, and Australia, you cannot apply independently for a standard work permit without an approved job offer and sponsor letter (such as an approved LMIA in Canada, a valid Certificate of Sponsorship in the UK, or an approved Subclass 482 nomination in Australia). Only specialized programs like Germany's Opportunity Card allow entry to search for work, but actual employment requires employer authorization.",
      },
      {
        q: "How can I verify if an overseas employer's job offer is genuine or fake?",
        a: "First, verify that the offer originated from an official corporate email domain (not free webmail like Gmail or Yahoo). Second, verify that the company is listed on official government registers, such as the UK Home Office Register of Licensed Sponsors or the Canadian business registry. Third, genuine employers never ask candidates to deposit money into personal accounts.",
      },
      {
        q: "Can a tourist or visitor visa be legally converted to a work visa abroad?",
        a: "No. Promising to 'convert' a tourist visa into a work permit on arrival is a common scam run by fraudulent agents. Entering any country on a visitor visa with the intention of working violates international immigration statutes and results in immediate detention, deportation, and a 5-year to lifetime re-entry ban.",
      },
      {
        q: "How much bank balance is required for an overseas work visa?",
        a: "Maintenance fund requirements depend on the destination country and whether your sponsor certifies maintenance on your behalf (such as A-rated sponsors in the UK). For Canada, applicants typically need CAD 3,500 to 5,000 for initial settlement if not exempt. All funds must be clean and backed by authentic banking records.",
      },
      {
        q: "Why should an immigration advocate review my employment contract before filing?",
        a: "International immigration laws vary strictly by jurisdiction. An enrolled High Court advocate conducts due diligence on sponsor license validity, wage compliance under National Occupational Classification (NOC/SOC) codes, and legal terms to protect candidates from recruitment scams and consular refusals.",
      },
    ],
  },
  {
    slug: "how-to-secure-employer-sponsorship",
    cat: "Work Visas",
    title: "How to Secure Verified Employer Sponsorship for Overseas Relocation",
    subtitle:
      "A complete legal guide to finding sponsored roles, understanding labor market tests, verifying sponsor licenses, and fulfilling international compliance requirements.",
    excerpt:
      "A complete legal guide to finding sponsored roles, understanding labor market tests, verifying sponsor licenses, and fulfilling international compliance requirements.",
    date: "15 Sep 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Employer Sponsorship",
      "UK CoS",
      "Canada LMIA",
      "Australia SBS",
      "Skilled Worker Visa",
      "Sponsor Licence Check",
    ],
    takeaways: [
      "Understand labor market testing and shortage occupation lists before applying.",
      "Verify the employer on the official government sponsor license register.",
      "Ensure the offered salary meets statutory median wage requirements.",
    ],
    sections: [
      {
        heading: "The Foundation of Employer-Led Migration",
        paragraphs: [
          "Employer sponsorship forms the statutory foundation of modern skilled migration across major Commonwealth and Western jurisdictions.",
          "Before an overseas company can sponsor an international candidate, immigration departments mandate that they demonstrate domestic labor shortages through formal labor market testing or designated shortage occupation lists.",
          "Before remitting any processing charges to recruiters, applicants should verify whether the prospective sponsor holds an active licence on the official government register (e.g., UK Home Office Register of Licensed Sponsors or Canada LMIA directory).",
        ],
      },
      {
        heading: "Key Statutory Sponsor Requirements",
        paragraphs: [
          "To legally sponsor an overseas worker, an employer must satisfy rigorous statutory obligations:",
        ],
        bulletPoints: [
          "Active Government License: Valid registration with the Home Office (UK), ESDC (Canada), or Home Affairs (Australia).",
          "Genuine Vacancy Test: The role must be authentic and cannot be created solely to facilitate migration.",
          "Statutory Wage Compliance: The salary must meet or exceed the statutory minimum threshold or the designated going rate for the occupation.",
          "Record Keeping & Reporting: The sponsor must track employee attendance and notify immigration authorities of any employment changes.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an LMIA and who is responsible for applying for it?",
        a: "A Labour Market Impact Assessment (LMIA) is an official document issued by Employment and Social Development Canada (ESDC) confirming that hiring a foreign worker will not negatively impact the Canadian labor market. The Canadian employer—not the candidate—is solely responsible for applying and paying the government fee for an LMIA.",
      },
      {
        q: "What is a Certificate of Sponsorship (CoS) in the United Kingdom?",
        a: "A CoS is an electronic record issued by a UK Home Office-licensed sponsor containing a unique reference number. A Defined CoS applies to candidates outside the UK, while an Undefined CoS applies to in-country switchers. You cannot apply for a UK Skilled Worker visa without a valid CoS number.",
      },
      {
        q: "Can an employer deduct sponsorship or visa processing costs from my salary?",
        a: "Under labor laws in the UK, Canada, and Australia, it is strictly illegal for employers or recruitment consultants to force workers to pay for employer-mandated sponsorship fees (such as the Immigration Skills Charge or LMIA fee). Such deductions are severe statutory violations.",
      },
      {
        q: "What minimum salary threshold is required for UK Skilled Worker sponsorship in 2026?",
        a: "The UK Skilled Worker route generally requires the higher of the statutory threshold (currently £38,700 per annum) or the going rate for the specific SOC occupational code, subject to specific health and care or transitional arrangements.",
      },
      {
        q: "How can I check if a UK company is licensed to sponsor visas?",
        a: "You can check the official UK government portal: 'Register of licensed sponsors: workers'. It is updated daily by the UK Home Office and lists all licensed employers along with their rating and visa categories.",
      },
    ],
  },
  {
    slug: "richa-dhanda-business-outreach-award",
    cat: "Awards & Recognition",
    title: "Dr. Richa Dhanda Featured in Business Outreach Magazine: 'Entrepreneur of the Year 2026'",
    subtitle:
      "Business Outreach Magazine honours Advocate Dr. Richa Dhanda under 'Editor's Choice' for legal excellence in international immigration law and anti-fraud advocacy.",
    excerpt:
      "Business Outreach Magazine has honoured Advocate Dr. Richa Dhanda under 'Editor's Choice' for 'Entrepreneur of the Year 2026'. The feature highlights her role in leading the international law sector and spearheading legal advocacy against work permit fraud.",
    date: "22 Sep 2026",
    readTime: "4 min read",
    img: "/images/richa_business_outreach_hd.png",
    link: "https://www.businessoutreach.in/magazine/entrepreneur-of-the-year-2026/?digitalversion=true",
    tags: [
      "Entrepreneur of the Year",
      "Business Outreach Magazine",
      "High Court Advocate",
      "Legal Excellence",
      "Immigration Reform",
      "Kurukshetra Chambers",
    ],
    takeaways: [
      "Recognized in the September 2026 National Digital Edition of Business Outreach Magazine.",
      "Celebrated for providing transparent, High Court-grounded counsel to students and professionals.",
      "Leading public legal awareness against fraudulent work permit schemes across Northern India.",
    ],
    sections: [
      {
        heading: "A National Tribute to Legal Excellence",
        paragraphs: [
          "In its September 2026 Digital Edition, Business Outreach Magazine recognized Advocate Dr. Richa Dhanda under the prestigious 'Editor's Choice' category for 'Entrepreneur of the Year 2026'.",
          "The national publication celebrates her steadfast contribution to reforming immigration advisory standards across Northern India. Through her chambers in Kurukshetra and High Court practice, Advocate Richa Dhanda has provided transparent, legally grounded counsel to hundreds of students, skilled workers, and business investors seeking global opportunities.",
          "A significant portion of the editorial coverage spotlights her ongoing public legal awareness initiatives warning citizens against unauthorized agents and fraudulent work permit schemes.",
        ],
      },
    ],
    faqs: [
      {
        q: "What criteria led to Advocate Dr. Richa Dhanda being named 'Entrepreneur of the Year 2026'?",
        a: "The award recognizes her legal leadership in reforming the international immigration law sector in Northern India, her transparent advocacy for students and skilled workers, and her public awareness campaigns against unlicensed immigration fraud.",
      },
      {
        q: "Where does Advocate Dr. Richa Dhanda practice?",
        a: "Advocate Dr. Richa Dhanda is an enrolled advocate with the Bar Council of Punjab & Haryana, representing clients before the High Court of Punjab & Haryana, appellate tribunals, and through her chambers in Kurukshetra.",
      },
      {
        q: "How can clients book an in-person or online legal consultation?",
        a: "Consultations can be scheduled through the official consultation booking portal at advocaterichadhanda.com/book or by calling the chambers helpline at +91 99960 25550.",
      },
    ],
  },
  {
    slug: "student-permits-critical-checks",
    cat: "Student Visas",
    title: "5 Critical Checks Before Applying for Your Overseas Study Permit",
    subtitle:
      "Financial proof, genuine student intent, Statement of Purpose (SOP) legal standards, and post-graduation work rights (PGWP) to avoid study visa rejections.",
    excerpt:
      "Financial proof, genuine student intent, Statement of Purpose (SOP) legal standards, and post-graduation work rights (PGWP) to avoid study visa rejections.",
    date: "12 May 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Student Visa",
      "Study Permit Canada",
      "UK Student Route",
      "SOP Drafting",
      "Financial Proof",
      "PGWP Eligibility",
    ],
    takeaways: [
      "Unexplained sudden bank deposits trigger automatic refusals under financial sufficiency scrutiny.",
      "Statement of Purpose must be authentic and detail career outcomes in India.",
      "Verify that the chosen program qualifies for Post-Graduation Work Permits (PGWP).",
    ],
    sections: [
      {
        heading: "1. Proving Genuine Intentions & Financial Stability",
        paragraphs: [
          "Embassies strictly scrutinize your source of funds. Having sudden unexplained deposits in bank accounts without clear source history triggers automatic refusals under financial sufficiency clauses.",
          "Ensure that education loans and family savings show documented, clean historical paper trails.",
        ],
      },
      {
        heading: "2. An Authentic Statement of Purpose",
        paragraphs: [
          "Generic or AI-generated SOPs lack personal credibility. Your submission must clearly link your academic background to your future employment trajectory in India.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the biggest reason for student visa refusals from India?",
        a: "The leading causes are financial non-compliance (unexplained recent bulk deposits without clear source history) and generic or copied Statements of Purpose (SOPs) that fail to convince visa officers of genuine student intent to return or progress career-wise.",
      },
      {
        q: "How old should funds and savings be when showing student visa financial proof?",
        a: "Most consulates require savings to be seasoned for at least 3 to 6 months with clear documentary trails (PF, tax returns, sale deeds, or sanctioned education loans from recognized banks).",
      },
      {
        q: "What is the Post-Graduation Work Permit (PGWP) eligibility rule?",
        a: "Not all colleges qualify for post-study work permits. Only programs delivered by Designated Learning Institutions (DLIs) that meet specific degree and curriculum licensing criteria grant open work permits upon graduation.",
      },
    ],
  },
  {
    slug: "australia-pr-pathways-guide",
    cat: "PR Updates",
    title: "Australia PR Pathway: Subclass 189 vs Subclass 190 vs Subclass 491",
    subtitle:
      "Comparing the three main permanent residency pathways for skilled migrants to Australia — eligibility, points calculation, state nominations, and processing times.",
    excerpt:
      "Comparing the three main permanent residency pathways for skilled migrants to Australia — eligibility, points calculation, state nominations, and processing times.",
    date: "02 May 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Australia PR",
      "Subclass 189",
      "Subclass 190",
      "Subclass 491",
      "SkillSelect",
      "Points Calculator",
      "Skills Assessment",
    ],
    takeaways: [
      "Subclass 189 offers unconditional PR anywhere in Australia.",
      "Subclass 190 awards 5 extra points for state government nomination.",
      "Subclass 491 awards 15 extra points for regional designated areas.",
    ],
    sections: [
      {
        heading: "Australia Skilled Migration Framework",
        paragraphs: [
          "Australia's General Skilled Migration operates on a competitive points-based system with a statutory minimum threshold of 65 points to lodge an Expression of Interest (EOI).",
          "• Subclass 189 (Skilled Independent): Grants unconditional PR anywhere in Australia without state or employer sponsorship.",
          "• Subclass 190 (Skilled Nominated): Awards 5 additional points via state or territory government nomination, with a 2-year regional living commitment.",
          "• Subclass 491 (Skilled Work Regional): Awards 15 points for regional living and provides a direct pathway to permanent residence via Subclass 191.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between Subclass 189 and Subclass 190?",
        a: "Subclass 189 is an independent visa allowing permanent residency anywhere in Australia without state sponsorship. Subclass 190 requires a state or territory nomination, awarding 5 additional points with a moral commitment to live and work in the nominating state for 2 years.",
      },
      {
        q: "What is a Skills Assessment and is it compulsory for Australia PR?",
        a: "Yes, a positive Skills Assessment from the relevant assessing authority (such as ACS for IT, VETASSESS for professionals, or Engineers Australia for engineers) is mandatory before you can lodge an Expression of Interest (EOI) on SkillSelect.",
      },
      {
        q: "How many points are realistically needed to receive an Australia PR invitation in 2026?",
        a: "While the statutory minimum is 65 points, competitive occupational rounds typically invite candidates with 85 to 95+ points, highlighting the importance of state nomination (Subclass 190 or 491) and superior English scores (PTE 79+ / IELTS 8.0+).",
      },
    ],
  },
  {
    slug: "visa-refusal-appeals-judicial-review",
    cat: "Appeals",
    title: "Visa Refusal? Legal Steps for Administrative Review & High Court Appeals",
    subtitle:
      "Understanding refusal letters, statutory limitation deadlines, administrative reviews, and when to file formal judicial review before constitutional courts.",
    excerpt:
      "Understanding refusal letters, statutory limitation deadlines, administrative reviews, and when to file formal judicial review before constitutional courts.",
    date: "18 Apr 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Visa Refusal",
      "Judicial Review",
      "Administrative Review",
      "Immigration Appeals",
      "Procedural Fairness",
      "High Court Litigation",
    ],
    takeaways: [
      "Statutory limitation periods for appeals are strict (14 to 30 days).",
      "Re-applying without correcting the legal defect leads to repeat refusals.",
      "Judicial review before federal courts forces immigration officers to justify decisions.",
    ],
    sections: [
      {
        heading: "Legal Recourse After a Visa Rejection",
        paragraphs: [
          "Receiving a visa rejection is distressing, but international administrative law offers formal avenues for legal remedy.",
          "1. Deconstruct the Grounds of Refusal: Identify whether the refusal cites documentation insufficiency, failure to satisfy genuine temporary stay criteria, or adverse allegations such as misrepresentation.",
          "2. Strict Limitation Windows: Statutory appeal deadlines are strict (typically 14 to 30 days depending on the jurisdiction). Missing these deadlines forfeits legal remedy.",
          "3. Re-Application vs. Formal Review: Re-submitting the exact same paperwork without addressing the legal objections leads to consecutive refusals. A structured legal appeal or Judicial Review holds consular officers accountable to statutory guidelines.",
        ],
      },
    ],
    faqs: [
      {
        q: "What should I do immediately after receiving a visa refusal notice?",
        a: "Read the refusal letter thoroughly to understand the statutory grounds cited. Take note of the strict appeal deadline (usually 14 to 30 days). Do not immediately re-apply with the exact same documents, as this almost always triggers consecutive rejections.",
      },
      {
        q: "What is Judicial Review and when is it applicable?",
        a: "Judicial Review is a formal legal petition filed before a constitutional or federal court (e.g., Federal Court of Canada or Upper Tribunal in the UK) challenging the legality and procedural fairness of the visa officer's refusal decision.",
      },
      {
        q: "Does a previous visa refusal permanently damage my chances for future visas?",
        a: "Not necessarily. If the underlying reasons for refusal are systematically rebutted with legal submissions, fresh documentary evidence, or overturned through judicial review, your immigration record is restored.",
      },
    ],
  },
  {
    slug: "canada-immigration-policy-updates-2026",
    cat: "Immigration Policy",
    title: "Global Immigration Policy Updates 2026: Express Entry & Work Permit Norms",
    subtitle:
      "Latest policy changes to Express Entry category draws, LMIA compliance enforcement, and work permit extensions for international professionals.",
    excerpt:
      "Latest policy changes to Express Entry category draws, LMIA compliance enforcement, and work permit extensions for international professionals.",
    date: "10 Jun 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Express Entry 2026",
      "Canada PNP",
      "Category-Based Selection",
      "IRCC Policy",
      "Work Permit Rules",
      "STEM Draws",
    ],
    takeaways: [
      "Category draws prioritize Healthcare, STEM, Trades, and French language proficiency.",
      "Strict enforcement on LMIA compliance and employer audits.",
    ],
    sections: [
      {
        heading: "Economic Immigration Trends in 2026",
        paragraphs: [
          "Immigration systems globally are shifting toward targeted selection based on specific economic labor requirements rather than general quota allocations.",
          "Category-based draws now prioritize candidates in Healthcare, STEM professions, Trades, and certified bilingual proficiency. Staying abreast of changing policy thresholds is vital for successful immigration planning.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do category-based Express Entry draws work?",
        a: "Instead of selecting candidates purely by general CRS points, Immigration, Refugees and Citizenship Canada (IRCC) conducts targeted draws for specific high-demand sectors such as Healthcare, STEM, Trades, Transport, Agriculture, and French language proficiency.",
      },
      {
        q: "How many CRS points does a Provincial Nomination (PNP) provide?",
        a: "A successful provincial nomination awards 600 additional CRS points, virtually guaranteeing an Invitation to Apply (ITA) in the next Express Entry draw.",
      },
    ],
  },
];
