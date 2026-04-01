export const parseSpeechText = (text: string): string[] => {
  let cleaned = text.toLowerCase();
  
  const triggers = ['добавь', 'добавить', 'купи', 'купить', 'надо', 'нужно', 'пожалуйста', 'add', 'buy', 'need', 'to', 'please'];
  triggers.forEach(t => {
    // using unicode flag to correctly support cyrillic boundaries if possible, or simple replace
    const regex = new RegExp(`(^|\\s)${t}(?=\\s|$)`, 'gu');
    cleaned = cleaned.replace(regex, ' ');
  });

  const parsedItems = cleaned.split(/(?:\s+и\s+|\s+да\s+|\s+с\s+|\s+and\s+|\s+plus\s+|,)/);
  
  return parsedItems.map(i => i.trim()).filter(i => i.length > 0);
};
