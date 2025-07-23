const samplesData = [
  { id: "1", label: "Sample 1", category: "A", url: "http://example.com/1" },
  { id: "2", label: "Sample 2", category: "B", url: "http://example.com/2" },
];

const getAllSamples = async () => {
  // כאן תוכל להוסיף לוגיקה אמיתית, DB, וכו'
  return samplesData;
};

export default {
  getAllSamples,
};
