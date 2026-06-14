const normalizeTerm = (value) => value.trim().toLowerCase();

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const findDictionaryTranslation = ({ entries, term, from, to, kind }) => {
  const normalizedTerm = normalizeTerm(term);

  return entries
    .filter(
      (entry) =>
        entry.from === from &&
        entry.to === to &&
        (!kind || entry.kind === kind) &&
        normalizeTerm(entry.source) === normalizedTerm
    )
    .sort((left, right) => right.priority - left.priority)[0];
};

export const translateTextWithDictionary = ({
  entries,
  text,
  from,
  to,
  allowedKinds,
}) => {
  let translatedText = text;

  const matchingEntries = entries
    .filter(
      (entry) =>
        entry.from === from &&
        entry.to === to &&
        (!allowedKinds || allowedKinds.includes(entry.kind))
    )
    .sort((left, right) => {
      const phraseLengthDiff =
        right.source.split(' ').length - left.source.split(' ').length;

      if (phraseLengthDiff !== 0) {
        return phraseLengthDiff;
      }

      return right.priority - left.priority;
    });

  for (const entry of matchingEntries) {
    const pattern = new RegExp(`\\b${escapeRegExp(entry.source)}\\b`, 'gi');
    translatedText = translatedText.replace(pattern, entry.target);
  }

  return translatedText;
};
