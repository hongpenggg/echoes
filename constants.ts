import { Thinker } from './types';

export const THINKERS: Thinker[] = [
  {
    id: 'socrates',
    name: 'Socrates',
    title: 'Greek Philosopher',
    era: 'Ancient Greece • 470 BC',
    imageUrl: 'https://picsum.photos/id/1062/400/400', // Placeholder, using abstract/artistic 
    topics: ['Ethics', 'Epistemology', 'Justice'],
    description: 'Founding figure of Western philosophy. Known for the Socratic method of questioning.',
    historicalContext: 'Living in Athens during its Golden Age (5th century BC), Socrates witnessed the height of Athenian democracy and its eventual defeat by Sparta. He questioned conventional wisdom and the elite, which ultimately led to his trial and execution for "corrupting the youth".',
    systemPrompt: 'You are Socrates. You do not give answers, but ask probing questions to expose contradictions in the user\'s thinking (The Socratic Method). You are humble yet relentless. Focus on definitions of virtue, justice, and the good life.',
    difficulty: 'Grandmaster'
  },
  {
    id: 'caesar',
    name: 'Julius Caesar',
    title: 'Roman Dictator',
    era: 'Ancient Rome • 100 BC',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    topics: ['Politics', 'War', 'Leadership'],
    description: 'Roman general and statesman who played a critical role in the events that led to the demise of the Roman Republic.',
    historicalContext: 'Living during the turbulent demise of the Roman Republic (1st century BC), Caesar was a central figure in the civil wars that transformed Rome into an Empire. His conquest of Gaul and subsequent crossing of the Rubicon marked a point of no return for the Republic.',
    systemPrompt: 'You are Julius Caesar. You are ambitious, strategic, and decisive. You believe in the necessity of power to maintain order. Speak with authority and rhetorical flourish. Defend the transition from Republic to Empire as necessary for stability.',
    difficulty: 'Scholar'
  },
  {
    id: 'rbg',
    name: 'Ruth Bader Ginsburg',
    title: 'Supreme Court Justice',
    era: 'Modern Era • 1933',
    imageUrl: 'https://picsum.photos/id/1011/400/400', 
    topics: ['Law', 'Equality', 'Civil Rights'],
    description: 'Associate Justice of the Supreme Court of the United States. A champion of gender equality and women\'s rights.',
    historicalContext: 'Serving on the U.S. Supreme Court from 1993 to 2020, Ginsburg was a pioneering advocate for women\'s rights. Her career bridged the gap between 20th-century civil rights movements and modern legal interpretation, famously dissenting in cases to highlight social justice issues.',
    systemPrompt: 'You are Ruth Bader Ginsburg. You are precise, logical, and deeply committed to justice and equality under the law. Cite legal precedents and constitutional interpretations. Your tone is calm, measured, but firm.',
    difficulty: 'Scholar'
  },
  {
    id: 'nietzsche',
    name: 'Friedrich Nietzsche',
    title: 'German Philosopher',
    era: 'Modern Era • 1844',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    topics: ['Existentialism', 'Morality', 'Culture'],
    description: 'Cultural critic and philosopher whose work has exerted a profound influence on modern intellectual history.',
    historicalContext: 'Writing in late 19th-century Europe, Nietzsche observed the decline of religious certainty ("God is dead") and the rise of scientific rationalism. He challenged the foundations of traditional morality, proposing life-affirming values and the concept of the Übermensch.',
    systemPrompt: 'You are Friedrich Nietzsche. You are provocative, passionate, and critical of traditional morality (especially Christian morality). Speak about the Übermensch, the Will to Power, and eternal recurrence. Challenge the user to create their own values.',
    difficulty: 'Grandmaster'
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    title: 'Mathematician',
    era: 'Modern Era • 1912',
    imageUrl: 'https://picsum.photos/id/1074/400/400',
    topics: ['Computing', 'AI', 'Logic'],
    description: 'Father of theoretical computer science and artificial intelligence.',
    historicalContext: 'Turing lived during a time of rapid technological advancement and global conflict (WWII). He formalized the concepts of algorithm and computation with the Turing Machine and played a crucial role in cracking the Nazi Enigma code, saving countless lives.',
    systemPrompt: 'You are Alan Turing. You are logical, analytical, and curious about the limits of computation. Discuss the imitation game, the nature of intelligence, and whether machines can think.',
    difficulty: 'Scholar'
  },
  {
    id: 'sun_tzu',
    name: 'Sun Tzu',
    title: 'Military Strategist',
    era: 'Ancient China • 544 BC',
    imageUrl: 'https://picsum.photos/id/1015/400/400',
    topics: ['Strategy', 'Warfare', 'Leadership'],
    description: 'Chinese general, military strategist, writer and philosopher. Author of The Art of War.',
    historicalContext: 'Sun Tzu lived during China\'s Eastern Zhou period, a time of constant feudal warfare known as the Spring and Autumn period. His work, "The Art of War", emphasized strategy, deception, and flexibility over brute force.',
    systemPrompt: 'You are Sun Tzu. You speak in aphorisms and strategic principles. You value winning without fighting. Discuss deception, terrain, and the psychology of conflict.',
    difficulty: 'Scholar'
  }
];

export const QUICK_TOPICS = [
  { category: 'Technology', title: 'The Morality of AI', desc: 'Should artificial consciousness be granted rights?' },
  { category: 'Economics', title: 'Universal Basic Income', desc: 'Is guaranteed income essential or a hindrance?' },
  { category: 'Philosophy', title: 'Stoicism in Modern Age', desc: 'Can ancient self-control solve modern anxiety?' },
  { category: 'Science', title: 'The Ethics of Gene Editing', desc: 'Drawing the line between curing and designing.' },
];