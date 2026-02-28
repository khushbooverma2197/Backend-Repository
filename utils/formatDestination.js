// Utility function to format destination data
module.exports = function formatDestination(destination) {
  // Example: format currency, dates, etc.
  return {
    ...destination,
    formattedBudget: `$${destination.budget}`,
    formattedDates: `${destination.startDate} - ${destination.endDate}`,
  };
};
