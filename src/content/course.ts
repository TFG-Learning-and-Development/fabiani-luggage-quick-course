export type Provenance = 'supplied-pdf' | 'supplied-storyboard' | 'authored-interface';
export interface ContentMeta { source: Provenance }
export interface CasePanel extends ContentMeta {
  id: string; label: string; dimensions: string[]; suited: string; story: string;
  image: string; imageWidth: number; imageHeight: number; imageAlt: string; imageCaption?: string;
}
export interface FeatureBenefitRow {
  id: string; feature: string; benefit: string; connection: string;
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
    questionsHeading: 'Here are a few examples of questions you could ask to build rapport:',
    questions: [
      'Where are you travelling to?',
      'How long will you be away?',
      'What will you need to pack for the trip?',
      'How do you want to arrive: light, organised, polished or prepared for different moments?',
    ],
    keyMessage: 'Do not sell the case on its own. First understand the Customer’s journey, then show how the case supports that journey by protecting clothing, organising essentials and making movement easier.',
    askIntroduction: 'When a Customer says, “I need a suitcase for a trip,” pause before recommending a case. Start by building rapport. Use the conversation to understand where the Customer is going, what they need to pack and how they want to arrive. This will help you recommend an option that best suits their journey and travel needs.',
  },
  range: {
    title: 'Match the case to the Journey',
    introduction: 'Connect each case size to the Customer’s travel purpose so the recommendation feels practical and relevant.',
    instruction: 'Select each case size to learn what it is best suited to, the confirmed dimensions and capacity, and how to position the selling story.',
    warning: 'The number of days a case is suitable for is only a guide and could be used for more or fewer days. If the Customer has any questions about their airline’s cabin-size rules, advise them to check their airline’s website to confirm the correct sizes.',
  },
  features: {
    title: 'Turn features into Customer benefits',
    introduction: 'Connect each feature to what it helps the Customer do during travel.',
    instruction: 'Use the arrows on each Customer connection card to match it with the Product features and benefits. When every card is in the correct row, select Check matches.',
    rows: [
      { id: 'lightweight', feature: 'Lightweight construction', benefit: 'Easier to carry and manoeuvre.', connection: 'Useful for Customers moving between airports, transport, hotels and city environments.' },
      { id: 'durable', feature: 'Durable construction', benefit: 'Supports repeated use and helps protect the case over time.', connection: 'Relevant to frequent travellers who need luggage for multiple journeys.' },
      { id: 'organised', feature: 'Organised interior', benefit: 'Helps separate and secure belongings.', connection: 'Makes packing tailoring, shirts, footwear and accessories more considered.' },
      { id: 'protective', feature: 'Protective structure', benefit: 'Helps protect contents during transit.', connection: 'Especially relevant when transporting occasionwear or more valuable garments.' },
      { id: 'mobility', feature: 'Easy mobility', benefit: 'Makes movement through travel environments simpler.', connection: 'Connect to airport terminals, hotel lobbies, stations and longer walking distances.' },
      { id: 'design', feature: 'Streamlined black design', benefit: 'Coordinates easily with the Customer’s wardrobe.', connection: 'Positions the case as part of the Fabiani aesthetic rather than an unrelated accessory.' },
      { id: 'tsa-lock', feature: 'Transportation Security Administration (TSA)-approved lock', benefit: 'Helps secure the Customer’s belongings during travel.', connection: 'Useful for Customers who want added security and smoother airport security checks where applicable.' },
      { id: 'phone-stand', feature: 'Phone stand', benefit: 'Gives the Customer a convenient place to rest their phone.', connection: 'Useful when the Customer is waiting, checking travel details or watching content while travelling.' },
      { id: 'usb-port', feature: 'USB port to connect a power bank', benefit: 'Allows the Customer to connect their own power bank inside the case and charge a device through the external port.', connection: 'Useful for Customers who need to keep a phone or device charged while moving through airports, hotels or other travel spaces.' },
      { id: 'luggage-tag', feature: 'Luggage tag', benefit: 'Helps the Customer identify their case more easily.', connection: 'Useful for Customers travelling through busy airports, hotels or transport points where bags may look similar.' },
    ] as FeatureBenefitRow[],
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
    scenario: 'A Customer is looking for a luggage set for their three-day work trip. The Store Associate does not jump straight to a product. They start by building rapport and understanding the journey, then connect the Customer’s need to the right case and explain the benefit in a clear, Customer-relevant way. Let’s look at the example below:',
    instruction: 'Click on the arrows below to see the whole conversation.',
    why: 'The Store Associate follows the Ask, Connect and Recommend framework. They ask about the journey and packing need, connect the Customer’s answers to the cabin case and explain the features as benefits: organised packing, easy movement, a polished Fabiani aesthetic and convenient device charging using the Customer’s own power bank.',
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
    dimensions: ['20" Suitcase', '39 × 24 × 57 cm', '53.3 litres'],
    suited: 'Overnight stays, 1–3 day business trips and weekends away. Cabin friendly.',
    story: 'Use this option for shorter trips where the Customer needs a refined, easy-to-move case for the essentials. The cabin-friendly size supports organised packing, while the sleek black finish keeps the look timeless and aligned to the Fabiani wardrobe.',
    image: 'small.png', imageWidth: 608, imageHeight: 760, imageAlt: 'Black Fabiani Small / Cabin Case with its handle extended.',
  },
  {
    id: 'medium', label: 'Medium Case', source: 'supplied-storyboard',
    dimensions: ['24" Suitcase', '46 × 27 × 66 cm', '81.9 litres'],
    suited: 'Longer domestic trips, approximately 4–7 days, or mixed business and leisure.',
    story: 'Use this option when the Customer needs more space for a trip with several moments, such as business, leisure or an occasion. The medium check-in size supports organised packing and gives the Customer flexibility without moving straight to the largest case.',
    image: 'medium.png', imageWidth: 602, imageHeight: 732, imageAlt: 'Black Fabiani Medium Case with its handle extended.',
  },
  {
    id: 'large', label: 'Large Case', source: 'supplied-storyboard',
    dimensions: ['26" Suitcase', '48 × 29 × 72 cm', '100.2 litres'],
    suited: 'Longer holidays, international journeys or extended stays.',
    story: 'Use this option for longer journeys, extended stays or international travel. The large check-in size gives the Customer generous space for a fuller wardrobe, footwear, accessories and travel essentials.',
    image: 'large.png', imageWidth: 594, imageHeight: 752, imageAlt: 'Black Fabiani Large Case with its handle extended.',
  },
  {
    id: 'multiple', label: 'Multiple-Case Travel', source: 'supplied-storyboard',
    dimensions: ['Combination of selected case sizes'],
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
    { role: 'employee', text: 'For this trip, I would recommend the small / cabin case. It is a strong option for a one-to-three-day business trip because it gives you enough space for your essentials without adding unnecessary bulk. The organised interior will help you separate your workwear, casual outfit and shoes, while the lightweight construction and easy mobility will make it simpler to move through the airport and hotel. The streamlined black design also keeps the luggage aligned to the polished Fabiani look. If you need to keep your phone charged while travelling, you can connect your own power bank inside the case and use the external USB port.' },
    { role: 'customer', text: 'That sounds like what I need. I want something practical, but still smart enough for work travel.' },
    { role: 'employee', text: 'Exactly. This option supports the way you are travelling and the way you want to arrive: organised, light and polished.' },
  ] },
];

const storyboardFeedback = {
  businessTrip: {
    correct: 'Correct. A two-night business trip needs a refined, easy-to-move case for essentials. The cabin case supports organised packing and a polished Fabiani look.',
    incorrect: 'Incorrect. Review the Customer’s journey. The trip is short, so the Customer needs a compact, organised and easy-to-move case.',
  },
  wedding: {
    correct: 'Correct. The Customer needs space and organisation for formalwear, casualwear and footwear. The recommendation should support the occasion and help protect the Customer’s wardrobe.',
    incorrect: 'Incorrect. Review what the Customer needs to pack. The recommendation should not focus only on size or price. It should support wardrobe protection, space and organisation for the occasion.',
  },
  frequentTraveller: {
    correct: 'Correct. Easy mobility is the strongest first focus because the Customer needs practical support while moving between airports, hotels and city meetings. You can also connect the TSA-approved lock to secure travel where applicable, and the USB port to keeping a device charged using the Customer’s own power bank.',
    incorrect: 'Incorrect. Review the Customer’s main needs. The scenario focuses on movement, safe storage and staying connected while travelling, not extra space, occasionwear protection or buying more than one case.',
  },
};

export const questions: Question[] = [
  {
    id: 'business-trip', source: 'supplied-storyboard', correct: 2,
    scenarioTitle: 'Scenario 1: Two-night business trip',
    scenario: 'I am flying to Cape Town for two nights for meetings, and I need something that looks smart but is easy to travel with.',
    prompt: 'What is the best recommendation for this Customer?',
    answers: [
      { text: 'Recommend the large case because it has the most space.', feedback: storyboardFeedback.businessTrip.incorrect },
      { text: 'Recommend multiple cases because the Customer is travelling for work.', feedback: storyboardFeedback.businessTrip.incorrect },
      { text: 'Recommend the small / cabin case because it supports a short business trip, helps the Customer travel lighter and keeps the look polished.', feedback: storyboardFeedback.businessTrip.correct },
      { text: 'Recommend no case until the Customer chooses their outfits.', feedback: storyboardFeedback.businessTrip.incorrect },
    ],
  },
  {
    id: 'destination-wedding', source: 'supplied-storyboard', correct: 1,
    scenarioTitle: 'Scenario 2: Destination wedding',
    scenario: 'I am going to a destination wedding and need to pack a suit, casual clothes and extra shoes.',
    prompt: 'Which recommendation best supports this Customer’s wardrobe need?',
    answers: [
      { text: 'Recommend the small / cabin case because the Customer only needs one outfit.', feedback: storyboardFeedback.wedding.incorrect },
      { text: 'Recommend a medium case if the Customer wants flexibility, or a large case if they need more space for formalwear, casualwear and footwear.', feedback: storyboardFeedback.wedding.correct },
      { text: 'Recommend multiple cases because all occasion wear needs separate luggage.', feedback: storyboardFeedback.wedding.incorrect },
      { text: 'Recommend the case with the lowest price first.', feedback: storyboardFeedback.wedding.incorrect },
    ],
  },
  {
    id: 'frequent-work-traveller', source: 'supplied-storyboard', correct: 0,
    scenarioTitle: 'Scenario 3: Frequent work traveller',
    scenario: 'I travel often for work and move between airports, hotels and city meetings. I need something that is easy to move, helps me keep my belongings secure and lets me keep my phone charged while I travel.',
    prompt: 'Which product feature and Customer benefit should you focus on first?',
    answers: [
      { text: 'Easy mobility, because it helps the Customer move through airports, hotels and city environments more easily.', feedback: storyboardFeedback.frequentTraveller.correct },
      { text: 'Protective structure, because it is mainly for transporting occasionwear.', feedback: storyboardFeedback.frequentTraveller.incorrect },
      { text: 'Large capacity, because every work traveller needs the biggest case.', feedback: storyboardFeedback.frequentTraveller.incorrect },
      { text: 'Multiple-case travel, because frequent travellers should always buy more than one case.', feedback: storyboardFeedback.frequentTraveller.incorrect },
    ],
  },
];

export const authoringMetadata = {
  instructionalCopy: { source: 'supplied-storyboard', scope: 'PDF copy plus the approved case, conversation and assessment copy in Laggage SB - v1.docx.' },
  assetDescriptions: { source: 'authored-interface', scope: 'Image alternative text and range-image captions.' },
  interface: { source: 'authored-interface', scope: 'Progress, assessment controls, instant feedback, no-JavaScript notices and accessibility labels.' },
} satisfies Record<string, { source: Provenance; scope: string }>;
