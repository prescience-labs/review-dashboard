export const totalReviewOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function(value) {
            if (!(value % 10)) {
              //return '$' + value + 'k'
              return value;
            }
          }
        }
      }
    ]
  }
};

export const totalReviewData = data => ({
  labels: data.map(d => d.month),
  datasets: [
    {
      label: "Reviews",
      data: data.map(d => d.total)
    }
  ]
});
