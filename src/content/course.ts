export type Provenance = 'supplied-pdf' | 'supplied-storyboard' | 'authored-interface';
export interface ContentMeta { source: Provenance }
export interface CasePanel extends ContentMeta {
  id: string; label: string; suited: string; story: string;
  image: string; imageWidth: number; imageHeight: number; imageAlt: string; imageCaption?: string;
}
export interface ConversationTurn { role: 'employee' | 'customer'; text: string }
export interface ConversationStep extends ContentMeta { turns: ConversationTurn[] }
export interface Answer { text: string; feedback: string }
export interface Question extends ContentMeta {
  id: string; scenarioTitle: string; scenario: string; prompt: string; answers: Answer[];
  correct: number;
}

// Instructional copy is transcribed from the supplied PDF and Word storyboard.
export const course = {
  source: 'supplied-storyboard' as const,
  title: 'Fabiani Luggage',
  description: 'This course helps Fabiani store employees recommend the right luggage by connecting each Customer’s travel purpose, wardrobe needs and product benefits.',
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
    quote: 'I’m looking for a case that will work for my next trip and I want it to fit in with what I’m wearing.',
    questions: [
      'Where are you travelling to, and how long will you be away?',
      'What will you need to pack for the trip?',
      'How do you want to arrive: light, organised, polished or prepared for different moments?',
    ],
    keyMessage: [
      'Do not sell the case on its own. First understand the Customer’s journey, then show how the case supports that journey by protecting clothing, organising essentials and making movement easier.',
      'When a Customer says, “I need a suitcase for a trip,” pause before recommending a case. Use the conversation to understand where they are going, what they need to pack and how they want to arrive.',
    ],
  },
  range: {
    title: 'Match the case to the Journey',
    introduction: 'Connect each case size to the Customer’s travel purpose so the recommendation feels practical and relevant.',
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
      { feature: 'Streamlined black design', benefit: 'Coordinates easily with the Customer’s wardrobe.', connection: 'Positions the case as part of the Fabiani aesthetic rather than an unrelated accessory.' },
    ],
  },
  selling: {
    title: 'Sell it like this: Ask, connect and recommend',
    introduction: 'Use this simple framework after you have understood the Customer’s journey. It helps you turn what the Customer shares into a short, helpful recommendation that links the right case to the right benefit.',
    steps: [
      { label: 'Ask', action: 'Find out where the Customer is going, how long they will be away and what they need to pack.', benefit: 'This helps you understand the journey before making a recommendation.' },
      { label: 'Connect', action: 'Link the Customer’s answer to the right case size and product feature.', benefit: 'This shows that the recommendation is based on their travel need.' },
      { label: 'Recommend', action: 'Explain the case direction and benefit in one clear sentence.', benefit: 'This helps the Customer understand why the case suits their trip.' },
    ],
  },
  conversation: {
    title: 'Customer conversation',
    scenario: 'A Customer is looking for luggage for a three-day work trip. The store employee does not jump straight to a product. They first understand the journey, connect the Customer’s need to the right case and explain the benefit in a clear, Customer-relevant way.',
    why: 'The store employee follows the Ask, Connect and Recommend framework. They ask about the journey and packing need, connect the Customer’s answers to the cabin case and explain the features as benefits: organised packing, easy movement and a polished Fabiani aesthetic.',
  },
  assessment: {
    title: 'Assessment',
    subtitle: 'Practice scenario-based assessment',
    introduction: 'Use each scenario to practise moving from a general luggage request to a thoughtful Fabiani recommendation. Choose the best response, then review the feedback to understand why it works.',
  },
};

export const cases: CasePanel[] = [
  {
    id: 'cabin', label: 'Small / Cabin Case', source: 'supplied-pdf',
    suited: 'Overnight stays, 1–3 day business trips and weekends away.',
    story: 'Use this option for shorter trips where the Customer needs a refined, easy-to-move case for the essentials. The cabin size supports organised packing, while the sleek black finish keeps the look timeless and aligned to the Fabiani wardrobe.',
    image: 'small.png', imageWidth: 608, imageHeight: 760, imageAlt: 'Black Fabiani Small / Cabin Case with its handle extended.',
  },
  {
    id: 'medium', label: 'Medium Case', source: 'supplied-storyboard',
    suited: 'Longer domestic trips, approximately 4–7 days, or mixed business and leisure.',
    story: 'Use this option when the Customer needs more space for a trip with several moments, such as business, leisure or an occasion. The medium check-in size supports organised packing and gives the Customer flexibility without moving straight to the largest case.',
    image: 'medium.png', imageWidth: 602, imageHeight: 732, imageAlt: 'Black Fabiani Medium Case with its handle extended.',
  },
  {
    id: 'large', label: 'Large Case', source: 'supplied-storyboard',
    suited: 'Longer holidays, international journeys or extended stays.',
    story: 'Use this option for longer journeys, extended stays or international travel. The large check-in size gives the Customer generous space for a fuller wardrobe, footwear, accessories and travel essentials.',
    image: 'large.png', imageWidth: 594, imageHeight: 752, imageAlt: 'Black Fabiani Large Case with its handle extended.',
  },
  {
    id: 'multiple', label: 'Multiple-Case Travel', source: 'supplied-storyboard',
    suited: 'Long-haul, extended or multi-destination travel.',
    story: 'Use this option when the Customer needs more than one case for a longer, extended or multi-destination journey. A combination of cases gives the Customer space, flexibility and organisation across each stage of the trip.',
    image: 'multiple case.png', imageWidth: 283, imageHeight: 283, imageAlt: 'Coordinated set of three black Fabiani cases in different sizes.',
  },
];

export const conversation: ConversationStep[] = [
  { source: 'supplied-storyboard', turns: [
    { role: 'employee', text: 'I can help with that. Where are you travelling to, and how long will you be away?' },
    { role: 'customer', text: 'I am going away for three days for work.' },
  ] },
  { source: 'supplied-storyboard', turns: [
    { role: 'employee', text: 'Great. Will you mainly be packing workwear, or do you also need space for casual clothing or extra shoes?' },
    { role: 'customer', text: 'Mostly workwear, with one casual outfit and one extra pair of shoes.' },
  ] },
  { source: 'supplied-storyboard', turns: [
    { role: 'employee', text: 'That helps. Because it is a short business trip, you probably do not need a large check-in case. You need something that is easy to move through the airport, keeps your clothing organised and still looks refined when you arrive.' },
  ] },
  { source: 'supplied-storyboard', turns: [
    { role: 'employee', text: 'For this trip, I would recommend the small / cabin case. It is a strong option for a one-to-three-day business trip because it gives you enough space for your essentials without adding unnecessary bulk. The organised interior will help you separate your workwear, casual outfit and shoes, while the lightweight construction and easy mobility will make it simpler to move through the airport and hotel. The streamlined black design also keeps the luggage aligned to the polished Fabiani look.' },
    { role: 'customer', text: 'That sounds like what I need. I want something practical, but still smart enough for work travel.' },
    { role: 'employee', text: 'Exactly. This option supports the way you are travelling and the way you want to arrive: organised, light and polished.' },
  ] },
];

const feedback = {
  businessTrip: {
    correct: 'Correct. A two-night business trip needs a refined, easy-to-move case for essentials. The cabin case supports organised packing and a polished Fabiani look.',
    incorrect: 'Review the Customer’s journey. The trip is short, so the Customer needs a compact, organised and easy-to-move case.',
  },
  wedding: {
    correct: 'Correct. The Customer needs space and organisation for formalwear, casualwear and footwear. The recommendation should support the occasion and help protect the Customer’s wardrobe.',
    incorrect: 'Review what the Customer needs to pack. The recommendation should not focus only on size or price. It should support wardrobe protection, space and organisation for the occasion.',
  },
  international: {
    correct: 'Correct. A two-week international trip needs more capacity than a short-trip option. The large case gives the Customer space for a fuller wardrobe, footwear, accessories and travel essentials.',
    incorrect: 'Review the trip length and packing need. A short-trip case will not give the Customer enough space for a two-week international journey.',
  },
  frequentTraveller: {
    correct: 'Correct. The Customer’s main need is movement. Easy mobility is the strongest benefit because it helps the Customer move through travel environments more easily while keeping a refined look.',
    incorrect: 'Review the Customer’s main need. The scenario focuses on movement through airports, hotels and city meetings, not extra space, occasionwear protection or buying more than one case.',
  },
};

export const questions: Question[] = [
  {
    id: 'business-trip', source: 'supplied-storyboard', correct: 2,
    scenarioTitle: 'Scenario 1: Two-night business trip',
    scenario: 'I am flying to Cape Town for two nights for meetings, and I need something that looks smart but is easy to travel with.',
    prompt: 'What is the best recommendation for this Customer?',
    answers: [
      { text: 'Recommend the large case because it has the most space.', feedback: feedback.businessTrip.incorrect },
      { text: 'Recommend multiple cases because the Customer is travelling for work.', feedback: feedback.businessTrip.incorrect },
      { text: 'Recommend the small / cabin case because it supports a short business trip, helps the Customer travel lighter and keeps the look polished.', feedback: feedback.businessTrip.correct },
      { text: 'Recommend no case until the Customer chooses their outfits.', feedback: feedback.businessTrip.incorrect },
    ],
  },
  {
    id: 'destination-wedding', source: 'supplied-storyboard', correct: 1,
    scenarioTitle: 'Scenario 2: Destination wedding',
    scenario: 'I am going to a destination wedding and need to pack a suit, casual clothes and extra shoes.',
    prompt: 'Which recommendation best supports this Customer’s wardrobe need?',
    answers: [
      { text: 'Recommend the small / cabin case because the Customer only needs one outfit.', feedback: feedback.wedding.incorrect },
      { text: 'Recommend a medium case if the Customer wants flexibility, or a large case if they need more space for formalwear, casualwear and footwear.', feedback: feedback.wedding.correct },
      { text: 'Recommend multiple cases because all occasion wear needs separate luggage.', feedback: feedback.wedding.incorrect },
      { text: 'Recommend the case with the lowest price first.', feedback: feedback.wedding.incorrect },
    ],
  },
  {
    id: 'international-holiday', source: 'supplied-storyboard', correct: 2,
    scenarioTitle: 'Scenario 3: International holiday',
    scenario: 'I am travelling overseas for two weeks and want enough space for different looks.',
    prompt: 'Which case direction should you recommend?',
    answers: [
      { text: 'Recommend the small / cabin case because it keeps the Customer travelling light.', feedback: feedback.international.incorrect },
      { text: 'Recommend the medium case because it works for every trip.', feedback: feedback.international.incorrect },
      { text: 'Recommend the large case because it gives the Customer generous space for a fuller wardrobe, footwear, accessories and travel essentials.', feedback: feedback.international.correct },
      { text: 'Recommend no case until the Customer confirms every outfit.', feedback: feedback.international.incorrect },
    ],
  },
  {
    id: 'frequent-work-traveller', source: 'supplied-storyboard', correct: 0,
    scenarioTitle: 'Scenario 4: Frequent work traveller',
    scenario: 'I travel often for work and move between airports, hotels and city meetings. I need something that is easy to move and still looks refined.',
    prompt: 'Which product feature and Customer benefit should you focus on first?',
    answers: [
      { text: 'Easy mobility, because it helps the Customer move through airports, hotels and city environments more easily.', feedback: feedback.frequentTraveller.correct },
      { text: 'Protective structure, because it is mainly for transporting occasionwear.', feedback: feedback.frequentTraveller.incorrect },
      { text: 'Large capacity, because every work traveller needs the biggest case.', feedback: feedback.frequentTraveller.incorrect },
      { text: 'Multiple-case travel, because frequent travellers should always buy more than one case.', feedback: feedback.frequentTraveller.incorrect },
    ],
  },
];

export const authoringMetadata = {
  instructionalCopy: { source: 'supplied-storyboard', scope: 'PDF copy plus the approved case, conversation and assessment copy in Laggage SB - v1.docx.' },
  assetDescriptions: { source: 'authored-interface', scope: 'Image alternative text and range-image captions.' },
  interface: { source: 'authored-interface', scope: 'Progress, assessment controls, results, answer review, no-JavaScript notices and accessibility labels.' },
} satisfies Record<string, { source: Provenance; scope: string }>;
