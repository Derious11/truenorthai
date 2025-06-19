import nlp from 'compromise';

// Canonical values list
const valuesList = [
  'honesty', 'growth', 'freedom', 'courage', 'authenticity',
  'compassion', 'connection', 'purpose', 'truth', 'family',
  'learning', 'balance', 'service', 'loyalty', 'innovation',
  'stability', 'peace', 'creativity', 'justice', 'wisdom',
  'alignment', 'empathy', 'trust', 'success', 'achievement'
];

// Optional: synonyms or common alternate word forms
const synonymMap = {
  honesty: ['honest', 'truthful'],
  growth: ['growing', 'evolving'],
  courage: ['bravery', 'bold'],
  authenticity: ['authentic', 'real', 'genuine'],
  connection: ['connected', 'relationships'],
  peace: ['calm', 'stillness'],
  wisdom: ['insight', 'understanding'],
  creativity: ['creative', 'imaginative'],
  purpose: ['meaning', 'direction'],
  freedom: ['independence', 'liberty']
};

// Flatten synonyms into an inverse lookup
const reverseSynonyms = {};
for (const [key, aliases] of Object.entries(synonymMap)) {
  aliases.forEach(word => {
    reverseSynonyms[word] = key;
  });
}

export function extractValuesFromText(text) {
  if (!text || text.trim().length < 3) return [];

  const doc = nlp(text.toLowerCase());
  const words = doc.terms().out('array'); // get all words, not just nouns

  const matched = new Set();

  for (const word of words) {
    if (valuesList.includes(word)) {
      matched.add(word);
    } else if (reverseSynonyms[word]) {
      matched.add(reverseSynonyms[word]);
    } else {
      // Fuzzy match by checking if value is substring (e.g. "authentic" in "authenticity")
      const found = valuesList.find(val => word.includes(val) || val.includes(word));
      if (found) matched.add(found);
    }
  }

  return [...matched].slice(0, 5);
}
