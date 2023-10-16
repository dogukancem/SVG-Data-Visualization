// Data from excel
const data = [
  {"year": 2001, "number_of_suicides": 2584, "crude_suicide_rate": 3.97},
  {"year": 2002, "number_of_suicides": 2301, "crude_suicide_rate": 3.49},
  {"year": 2003, "number_of_suicides": 2705, "crude_suicide_rate": 4.05},
  {"year": 2004, "number_of_suicides": 2707, "crude_suicide_rate": 4.00},
  {"year": 2005, "number_of_suicides": 2703, "crude_suicide_rate": 3.95},
  {"year": 2006, "number_of_suicides": 2829, "crude_suicide_rate": 4.08},
  {"year": 2007, "number_of_suicides": 2793, "crude_suicide_rate": 3.98},
  {"year": 2008, "number_of_suicides": 2816, "crude_suicide_rate": 3.96},
  {"year": 2009, "number_of_suicides": 2898, "crude_suicide_rate": 4.02},
  {"year": 2010, "number_of_suicides": 2933, "crude_suicide_rate": 4.01},
  {"year": 2011, "number_of_suicides": 2677, "crude_suicide_rate": 3.61},
  {"year": 2012, "number_of_suicides": 3287, "crude_suicide_rate": 4.37},
  {"year": 2013, "number_of_suicides": 3252, "crude_suicide_rate": 4.34},
  {"year": 2014, "number_of_suicides": 3169, "crude_suicide_rate": 4.11},
  {"year": 2015, "number_of_suicides": 3246, "crude_suicide_rate": 4.15},
  {"year": 2016, "number_of_suicides": 3246, "crude_suicide_rate": 4.03},
  {"year": 2017, "number_of_suicides": 3168, "crude_suicide_rate": 3.94},
  {"year": 2018, "number_of_suicides": 3342, "crude_suicide_rate": 4.11},
  {"year": 2019, "number_of_suicides": 3476, "crude_suicide_rate": 4.21},
  {"year": 2020, "number_of_suicides": 3710, "crude_suicide_rate": 4.45},
  {"year": 2021, "number_of_suicides": 4194, "crude_suicide_rate": 4.98},
  {"year": 2022, "number_of_suicides": 4196, "crude_suicide_rate": 4.88}
]

// SVG size settings
const svgWidth = 1100;
const svgHeight = 600;
const margin = {top: 50, right: 20, bottom: 50, left: 80};
const chartWidth = svgWidth - margin.left - margin.right - 20;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Create the SVG element
const svg = document.getElementById("chart");

svg.setAttribute("width", svgWidth);
svg.setAttribute("height", svgHeight);

// Draw X-axis line
const xAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxisLine.setAttribute("x1", margin.left);
xAxisLine.setAttribute("y1", chartHeight + margin.top);
xAxisLine.setAttribute("x2", chartWidth + margin.left + 35);
xAxisLine.setAttribute("y2", chartHeight + margin.top);
xAxisLine.setAttribute("stroke", "black");
svg.appendChild(xAxisLine);

// Add "Year" label to X-axis
const xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
xAxisLabel.setAttribute("x", margin.left + chartWidth / 2);
xAxisLabel.setAttribute("y", chartHeight + margin.top + 45);
xAxisLabel.setAttribute("text-anchor", "middle");
xAxisLabel.textContent = "Year";
svg.appendChild(xAxisLabel);

// Add data values to X-axis
const xScale = d => (chartWidth / (2022 - 2001)) * (d - 2001) + margin.left + 10; // Dynamic scaling
data.forEach(d => {
  const xText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xText.setAttribute("x", xScale(d.year));
  xText.setAttribute("y", chartHeight + margin.top + 20);
  xText.setAttribute("text-anchor", "middle");
  xText.textContent = d.year;
  svg.appendChild(xText);
});

// Draw Y-axis line
const yAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxisLine.setAttribute("x1", margin.left);
yAxisLine.setAttribute("y1", margin.top);
yAxisLine.setAttribute("x2", margin.left);
yAxisLine.setAttribute("y2", chartHeight + margin.top);
yAxisLine.setAttribute("stroke", "black");
svg.appendChild(yAxisLine);

// Add "Number of Suicides" label to Y-axis
const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
yAxisLabel.setAttribute("x", -chartHeight / 2 - margin.top);
yAxisLabel.setAttribute("y", margin.left - 55);
yAxisLabel.setAttribute("transform", "rotate(-90)");
yAxisLabel.setAttribute("text-anchor", "middle");
yAxisLabel.textContent = "Number of Suicides";
svg.appendChild(yAxisLabel);

// Determine the maximum and minimum data values
const maxSuicides = Math.max(...data.map(d => d.number_of_suicides));
const minSuicides = Math.min(...data.map(d => d.number_of_suicides));

const yMax = 4500;

const yScale = d => chartHeight + margin.top - (d / yMax) * chartHeight;

// Add data values to Y-axis (0 to 4500, step by 500)
for (let i = 0; i <= 4500; i += 500) {
  // Draw text labels for the y-values
  const yText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yText.setAttribute("x", margin.left - 10);
  yText.setAttribute("y", yScale(i) + 5); // adding 5 for better alignment
  yText.setAttribute("text-anchor", "end");
  yText.textContent = i;
  svg.appendChild(yText);
}

// Draw bars
data.forEach(d => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", xScale(d.year));
  rect.setAttribute("y", yScale(d.number_of_suicides));
  rect.setAttribute("width", 25);
  rect.setAttribute("height", (chartHeight + margin.top) - yScale(d.number_of_suicides)); // the height is now the difference from the y-value to the base
  rect.setAttribute("fill", "#2c7bb6");
  svg.appendChild(rect);

  // Draw text labels inside the bars
  const yTextInsideBar = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yTextInsideBar.setAttribute("x", xScale(d.year) + 12); // Adjusting the x position to be at the center of the bar
  yTextInsideBar.setAttribute("y", yScale(d.number_of_suicides) + ((chartHeight + margin.top) - yScale(d.number_of_suicides)) / 2 + 5); // Positioning at the middle of the bar
  yTextInsideBar.setAttribute("text-anchor", "middle");
  yTextInsideBar.setAttribute("fill", "white");
  yTextInsideBar.setAttribute("transform", `rotate(270, ${xScale(d.year) + 12}, ${yScale(d.number_of_suicides) + ((chartHeight + margin.top) - yScale(d.number_of_suicides)) / 2 + 5})`); // Rotating the text 90 degrees
  yTextInsideBar.textContent = d.number_of_suicides;
  svg.appendChild(yTextInsideBar);
});

// Add chart title
const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
title.setAttribute("x", svgWidth / 2);
title.setAttribute("y", margin.top - 20);
title.setAttribute("text-anchor", "middle");
title.textContent = "Number of suicides and crude suicide rate, 2001-2022";
svg.appendChild(title);