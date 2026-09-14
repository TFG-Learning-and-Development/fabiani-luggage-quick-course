export type Provenance = 'supplied-pdf' | 'authored-review' | 'inferred-review';
export interface ReviewMeta { source: Provenance; review?: string }
export interface CasePanel extends ReviewMeta {
  id: string; label: string; suited: string; story: string;
  image: string; imageWidth: number; imageHeight: number; imageAlt: string; imageCaption?: string;
}
export interface ConversationStep extends ReviewMeta { employee: string; customer: string }
export interface Answer { text: string; feedback: string }
export interface Question extends ReviewMeta {
  id: string; scenario?: string; prompt: string; answers: Answer[];
  correct: number; answerSource: Provenance; feedbackSource: Provenance;
}

// All prose in this object is transcribed from the single supplied artboard.
export const course = {
  source: 'supplied-pdf' as const,
  title: 'Fabiani Luggage',
  overview: {
    title: 'Luggage with Purpose',
    paragraphs: [
      'Fabiani luggage is more than something a Customer carries. It helps them prepare for the journey, protect their wardrobe and arrive looking polished and ready for the moment.',
      'In this course, you will practise how to move from a general luggage request to a thoughtful recommendation by asking the right questions, matching the case to the trip and explaining the benefit in a Customer-relevant way.',
    ],
    quote: 'Designed for every departure and arrival.',
  },
  travel: {
    title: 'The Art of Travel',
    introduction: 'Fabiani luggage should feel like a natural continuation of the Fabiani wardrobe. It is crafted for the modern traveller who needs to move with ease, protect their clothing and arrive looking polished.',
    flow: ['Journey', 'Wardrobe', 'Luggage', 'Benefit'],
    quote: "I'm looking for a case that will work for my next trip and I want it to fit in with what I'm wearing.",
    questions: [
      'Where are you travelling to, and how long will you be away?',
      'What will you need to pack for the trip?',
      'How do you want to arrive: light, organised, polished or prepared for different moments?',
    ],
    keyMessage: [
      "Do not sell the case on its own. First understand the Customer's journey, then show how the case supports that journey by protecting clothing, organising essentials and making movement easier.",
      'When a Customer says, "I need a suitcase for a trip," pause before recommending a case. Use the conversation to understand where they are going, what they need to pack and how they want to arrive.',
    ],
  },
  range: {
    title: 'Match the case to the Journey',
    introduction: "Connect each case size to the Customer's travel purpose so the recommendation feels practical and relevant.",
    warning: 'Trip-duration guidance is indicative. Use confirmed product dimensions and capacity from the product team where exact packing or airline guidance is required.',
  },
  features: {
    title: 'Turn features into Customer benefits',
    introduction: 'Connect each feature to what it helps the Customer do during travel.',
    rows: [
      { feature: 'Lightweight construction', benefit: 'Easier to carry and manoeuvre.', connection: 'Useful for Customers moving between airports, transport, hotels and city environments.' },
      { feature: 'Durable construction', benefit: 'Supports repeated use and helps protect the case over time.', connection: 'Relevant to frequent travellers who need luggage for multiple journeys.' },
      { feature: 'Organised interior', benefit: 'Helps separate and secure belongings.', connection: 'Makes packing tailoring, shirts, footwear and accessories more considered.' },
      { feature: 'Protective structure', benefit: 'Helps protect contents during transit.', connection: 'Especially relevant when transporting occasionwear or more valuable garments.' },
      { feature: 'Easy mobility', benefit: 'Makes movement through travel environments simpler.', connection: 'Connect to airport terminals, hotel lobbies, stations and longer walking distances.' },
      { feature: 'Streamlined black design', benefit: "Coordinates easily with the Customer's wardrobe.", connection: 'Positions the case as part of the Fabiani aesthetic rather than an unrelated accessory.' },
    ],
  },
  selling: {
    title: 'Sell it like this: Ask, connect and recommend',
    introduction: "Use this simple framework after you have understood the Customer's journey. It helps you turn what the Customer shares into a short, helpful recommendation that links the right case to the right benefit.",
    steps: [
      { label: 'Ask', action: 'Find out where the Customer is going, how long they will be away and what they need to pack.', benefit: 'This helps you understand the journey before making a recommendation.' },
      { label: 'Connect', action: "Link the Customer's answer to the right case size and product feature.", benefit: 'This shows that the recommendation is based on their travel need.' },
      { label: 'Recommend', action: 'Explain the case direction and benefit in one clear sentence.', benefit: 'This helps the Customer understand why the case suits their trip.' },
    ],
  },
  conversation: {
    title: 'Customer conversation',
    scenario: "A Customer is looking for luggage for a three-day work trip. The store employee does not jump straight to a product. They first understand the journey, connect the Customer's need to the right case and explain the benefit in a clear, Customer-relevant way.",
    why: "The store employee follows the Ask, Connect and Recommend framework. They ask about the journey and packing need, connect the Customer's answers to the cabin case and explain the features as benefits: organised packing, easy movement and a polished Fabiani aesthetic.",
  },
};

export const cases: CasePanel[] = [
  {
    id: 'cabin', label: 'Small / Cabin Case', source: 'supplied-pdf',
    suited: 'Overnight stays, 1-3 day business trips and weekends away.',
    story: 'Use this option for shorter trips where the Customer needs a refined, easy-to-move case for the essentials. The cabin size supports organised packing, while the sleek black finish keeps the look timeless and aligned to the Fabiani wardrobe.',
    image: 'small.png', imageWidth: 608, imageHeight: 760, imageAlt: 'Black Fabiani Small / Cabin Case with its handle extended.',
  },
  {
    id: 'medium', label: 'Medium Case', source: 'authored-review', review: 'Approve qualitative guidance.',
    suited: 'Journeys where the Customer needs to pack more outfit options and essentials than a cabin case can accommodate.',
    story: 'Ask about the clothing, footwear and accessories the Customer needs to take. Explore a medium case when their packing need calls for more room, connecting organised packing and easy movement to their journey. Confirm the actual capacity before recommending.',
    image: 'medium.png', imageWidth: 602, imageHeight: 732, imageAlt: 'Black Fabiani Medium Case with its handle extended.',
  },
  {
    id: 'large', label: 'Large Case', source: 'authored-review', review: 'Approve qualitative guidance.',
    suited: 'Journeys with a fuller wardrobe or clothing for different occasions, where the packing need calls for more space.',
    story: 'Understand what the Customer plans to pack and how they will move between destinations. Explore a large case when the wardrobe requires it, linking an organised interior and protective structure to their garments. Confirm capacity and transport requirements before recommending.',
    image: 'large.png', imageWidth: 594, imageHeight: 752, imageAlt: 'Black Fabiani Large Case with its handle extended.',
  },
  {
    id: 'multiple', label: 'Multiple-Case Travel', source: 'authored-review', review: 'Approve qualitative guidance.',
    suited: 'Journeys where the Customer needs to organise their packing across more than one case.',
    story: 'Ask what needs to travel together and what the Customer wants to keep separate. Discuss a combination of cases only when it serves that packing need. Consider how the Customer will manage the cases on their journey, and confirm each case\'s dimensions and capacity.',
    image: 'multiple case.png', imageWidth: 283, imageHeight: 283, imageAlt: 'Coordinated set of three black Fabiani cases in different sizes.',
  },
];

export const conversation: ConversationStep[] = [
  { source: 'supplied-pdf', employee: 'I can help with that. Where are you travelling to, and how long will you be away?', customer: 'I am going away for three days for work.' },
  { source: 'authored-review', employee: 'What will you need to pack for the trip?', customer: 'Shirts and tailoring for meetings, footwear and a few essentials. I want to keep everything organised.' },
  { source: 'authored-review', employee: 'An organised interior helps separate and secure your belongings, so you can pack your shirts, tailoring and accessories more thoughtfully. Easy mobility also makes moving through the airport and hotel simpler.', customer: 'That sounds useful. I want to travel lighter and arrive looking polished.' },
  { source: 'authored-review', employee: 'The small / cabin case is a good direction for your short work trip: it supports organised packing and easy movement, with a streamlined black design that complements your Fabiani wardrobe. Let us confirm the dimensions and capacity for your packing and airline requirements.', customer: 'That suits what I need. Let us check it against what I am taking.' },
];

export const questions: Question[] = [
  {
    id: 'business-trip', source: 'supplied-pdf', answerSource: 'inferred-review', feedbackSource: 'authored-review', correct: 2,
    review: 'Question and options supplied. C is inferred per brief; confirm with product team and reviewer.',
    scenario: 'I am flying to Cape Town for two nights for meetings, and I need something that looks smart but is easy to travel with.',
    prompt: 'What is the best recommendation for this Customer?',
    answers: [
      { text: 'Recommend the large case because it has the most space.', feedback: 'Start with the travel need, not the most space. The small / cabin case is the best direction for this short business trip, subject to confirmed dimensions, capacity and airline requirements.' },
      { text: 'Recommend multiple cases because the Customer is travelling for work.', feedback: 'Travelling for work does not automatically call for multiple cases. The small / cabin case supports this short trip and a polished look; confirm the packing need and airline requirements.' },
      { text: 'Recommend the small / cabin case because it supports a short business trip, helps the Customer travel lighter and keeps the look polished.', feedback: 'This connects the short business trip to lighter travel and a polished look. Trip-duration guidance is indicative: use confirmed product dimensions and capacity for exact packing or airline guidance.' },
      { text: 'Recommend no case until the Customer chooses their outfits.', feedback: 'Ask about the packing need and use it to guide a helpful recommendation. The small / cabin case is the best direction for this short business trip, with dimensions, capacity and airline requirements still to be confirmed.' },
    ],
  },
  {
    id: 'discovery', source: 'authored-review', answerSource: 'authored-review', feedbackSource: 'authored-review', correct: 1,
    prompt: 'A Customer says, "I need a suitcase for a trip." What should you do first?',
    answers: [
      { text: 'Show the largest case straight away.', feedback: 'Case size follows the travel need. First ask where the Customer is going, how long they will be away and what they need to pack.' },
      { text: 'Ask where they are travelling, how long they will be away and what they need to pack.', feedback: 'Understanding the journey and packing need gives you a relevant starting point before recommending a case.' },
      { text: 'Recommend the black design without asking about the journey.', feedback: 'The streamlined black design is a useful connection, but first understand the journey so the recommendation fits the Customer\'s need.' },
      { text: 'Assume a business trip always needs multiple cases.', feedback: 'The purpose alone does not determine the number of cases. Ask about the journey and packing need before making a recommendation.' },
    ],
  },
  {
    id: 'customer-benefit', source: 'authored-review', answerSource: 'authored-review', feedbackSource: 'authored-review', correct: 3,
    prompt: 'A Customer wants to keep shirts, footwear and accessories organised. Which feature-to-benefit explanation is most relevant?',
    answers: [
      { text: 'The streamlined black design gives the case more packing space.', feedback: 'The black design coordinates with the Customer\'s wardrobe; it does not establish capacity. The organised interior is the relevant feature for separating and securing belongings.' },
      { text: 'Easy mobility means clothing will never crease.', feedback: 'Easy mobility makes movement through travel environments simpler. It does not promise crease-free clothing. Connect the organised interior to the Customer\'s packing need.' },
      { text: 'Lightweight construction guarantees that the case meets airline rules.', feedback: 'Lightweight construction makes carrying and manoeuvring easier; it does not confirm airline compliance. The organised interior addresses this Customer\'s need.' },
      { text: 'The organised interior helps separate and secure belongings, making packing shirts, footwear and accessories more considered.', feedback: 'This links a taught feature to its functional benefit and to the Customer\'s specific packing need.' },
    ],
  },
];

export const authoringMetadata = {
  assetDescriptions: { source: 'authored-review', scope: 'All image alt text and range-image captions.' },
  interface: { source: 'authored-review', scope: 'Local progress, assessment controls, results, answer review, no-JavaScript notices and navigation accessibility labels.' },
  frameworkLabels: { source: 'inferred-review', scope: 'Ask, Connect and Recommend labels assigned in order to the three supplied explanations.' },
  defaults: { source: 'authored-review', scope: 'Local-only persistence; all questions submitted means complete; no pass threshold; fresh full retry.' },
} satisfies Record<string, { source: Provenance; scope: string }>;
