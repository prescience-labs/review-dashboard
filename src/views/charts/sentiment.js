const colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};

export const sentimentOptions = {
  scales: {
    yAxes: [
      {
        gridLines: {
          color: colors.gray[900],
          zeroLineColor: colors.gray[900]
        },
        ticks: {
          callback: function(value) {
            if (!(value % 10)) {
              return value + "%";
            }
          }
        }
      }
    ]
  }
};

export const sentimentData = data => canvas => {
  return {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: "Percent Positive Reviews",
        data: data.map(d => d.percentPositive)
      }
    ]
  };
};
