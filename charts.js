/* ============================================================
   COMPARED TO WHAT? — Chart Configurations (Chart.js)
   ============================================================ */

const ACCENT = '#58a6ff';
const ACCENT_DIM = 'rgba(88, 166, 255, 0.2)';
const ACCENT_BG = 'rgba(88, 166, 255, 0.75)';
const NEGATIVE = '#ff4444';
const NEGATIVE_DIM = 'rgba(255, 68, 68, 0.2)';
const NEGATIVE_BG = 'rgba(255, 68, 68, 0.8)';
const POSITIVE = '#44cc88';
const MUTED = '#8888a0';
const TEXT = '#e8e8f0';
const GRID = 'rgba(255, 255, 255, 0.06)';
const CARD_BG = '#1a1a22';

// Shared chart defaults
Chart.defaults.color = MUTED;
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 12;

const sharedGridOptions = {
  color: GRID,
  drawBorder: false,
};

const sharedTickOptions = {
  padding: 8,
  color: MUTED,
};

/* ============================================================
   CHART 1: Energy Consumption by Industry (TWh/year)
   ============================================================ */
function initEnergyChart() {
  const ctx = document.getElementById('energyChart');
  if (!ctx) return;

  const labels = [
    'Global Aviation',
    'US Air Conditioning',
    'Cryptocurrency (BTC)',
    'Global Data Centers\n(Streaming + Video)',
    'Global AI\n(Training + Inference)',
    'Global Lighting\n(Residential)',
  ];

  const values = [2800, 2000, 130, 200, 340, 2650];

  const colors = values.map((v, i) =>
    i === 4 ? ACCENT_BG : 'rgba(136, 136, 160, 0.4)'
  );

  const borderColors = values.map((v, i) =>
    i === 4 ? ACCENT : 'rgba(136, 136, 160, 0.6)'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.x.toLocaleString()} TWh/year`
          }
        }
      },
      scales: {
        x: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v.toLocaleString()} TWh`
          },
          border: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: {
            ...sharedTickOptions,
            font: { size: 12 }
          },
          border: { display: false }
        }
      }
    }
  });
}

/* ============================================================
   CHART 2: ROI — Energy Cost vs. Researcher Hours
   ============================================================ */
function initRoiChart() {
  const ctx = document.getElementById('roiChart');
  if (!ctx) return;

  const labels = [
    'AlphaFold\n(protein structures)',
    'GPT-4 Training\n(reasoning capability)',
    'Human equivalent:\n50 researcher-years',
    'Transatlantic\nflight (one-way)',
    'Average annual\nUS household energy',
  ];

  const values = [2.8, 50, 0, 120, 10];
  const humanEquiv = [10000, 3000, 50, 0, 0];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Energy Used (MWh equiv.)',
          data: values,
          backgroundColor: ACCENT_BG,
          borderColor: ACCENT,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Human Researcher-Years Equivalent',
          data: humanEquiv,
          backgroundColor: 'rgba(68, 204, 136, 0.5)',
          borderColor: POSITIVE,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: 'y2',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            color: MUTED,
            padding: 16,
            font: { size: 12 },
            usePointStyle: true,
            pointStyle: 'rect',
          }
        },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions, maxRotation: 0, font: { size: 11 } },
          border: { display: false }
        },
        y: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v} MWh`
          },
          border: { display: false },
          title: {
            display: true,
            text: 'Energy (MWh)',
            color: MUTED,
            font: { size: 11 }
          }
        },
        y2: {
          position: 'right',
          grid: { display: false },
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v.toLocaleString()} yrs`
          },
          border: { display: false },
          title: {
            display: true,
            text: 'Researcher-Years',
            color: MUTED,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 3: Deaths per TWh by Energy Source
   ============================================================ */
function initNuclearDeathsChart() {
  const ctx = document.getElementById('nuclearDeathsChart');
  if (!ctx) return;

  const sources = ['Coal', 'Oil', 'Gas', 'Biomass', 'Hydro', 'Wind', 'Solar', 'Nuclear'];
  const deaths = [24.6, 18.4, 2.8, 4.6, 1.3, 0.04, 0.02, 0.03];

  const colors = sources.map(s =>
    s === 'Nuclear' ? ACCENT_BG :
    s === 'Coal' || s === 'Oil' ? NEGATIVE_BG :
    'rgba(136, 136, 160, 0.45)'
  );

  const borders = sources.map(s =>
    s === 'Nuclear' ? ACCENT :
    s === 'Coal' || s === 'Oil' ? NEGATIVE :
    'rgba(136, 136, 160, 0.6)'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sources,
      datasets: [{
        label: 'Deaths per TWh',
        data: deaths,
        backgroundColor: colors,
        borderColor: borders,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} deaths per TWh`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions, font: { size: 12 } },
          border: { display: false }
        },
        y: {
          type: 'logarithmic',
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => v === 0.01 || v === 0.1 || v === 1 || v === 10 || v === 25
              ? v + ' deaths'
              : ''
          },
          border: { display: false },
          title: {
            display: true,
            text: 'Deaths per TWh (log scale)',
            color: MUTED,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 4: CO₂ Emissions per kWh by Energy Source
   ============================================================ */
function initEmissionsChart() {
  const ctx = document.getElementById('emissionsChart');
  if (!ctx) return;

  const sources = ['Coal', 'Oil', 'Gas', 'Biomass', 'Hydro', 'Solar PV', 'Wind', 'Nuclear'];
  const gco2 = [820, 650, 490, 230, 24, 44, 11, 12];

  const colors = sources.map(s =>
    s === 'Nuclear' ? ACCENT_BG :
    s === 'Wind' || s === 'Solar PV' ? 'rgba(68, 204, 136, 0.55)' :
    s === 'Coal' || s === 'Oil' || s === 'Gas' ? NEGATIVE_BG :
    'rgba(136, 136, 160, 0.45)'
  );

  const borders = sources.map(s =>
    s === 'Nuclear' ? ACCENT :
    s === 'Wind' || s === 'Solar PV' ? POSITIVE :
    s === 'Coal' || s === 'Oil' || s === 'Gas' ? NEGATIVE :
    'rgba(136, 136, 160, 0.6)'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sources,
      datasets: [{
        label: 'gCO₂/kWh',
        data: gco2,
        backgroundColor: colors,
        borderColor: borders,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} gCO₂/kWh`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions },
          border: { display: false }
        },
        y: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v} g`
          },
          border: { display: false },
          title: {
            display: true,
            text: 'gCO₂ per kWh (lifecycle)',
            color: MUTED,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 5: Accidents per Million Miles (Driving)
   ============================================================ */
function initDrivingChart() {
  const ctx = document.getElementById('drivingChart');
  if (!ctx) return;

  const categories = [
    'Human average\n(all US drivers)',
    'Human — 16-19\nyear olds',
    'Human — 75+\nyear olds',
    'Human — drunk\ndriving',
    'Waymo AV\n(Chandler AZ)',
    'Waymo AV\n(San Francisco)',
  ];

  const injuryCrashes = [0.41, 0.88, 0.64, 1.6, 0.11, 0.09];
  const propertyCrashes = [1.9, 3.2, 2.8, 4.1, 0.22, 0.19];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Injury crashes per million miles',
          data: injuryCrashes,
          backgroundColor: injuryCrashes.map((v, i) =>
            i >= 4 ? ACCENT_BG : NEGATIVE_BG
          ),
          borderColor: injuryCrashes.map((v, i) =>
            i >= 4 ? ACCENT : NEGATIVE
          ),
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'All crashes (incl. property damage) per million miles',
          data: propertyCrashes,
          backgroundColor: propertyCrashes.map((v, i) =>
            i >= 4 ? ACCENT_DIM : NEGATIVE_DIM
          ),
          borderColor: propertyCrashes.map((v, i) =>
            i >= 4 ? ACCENT : NEGATIVE
          ),
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            color: MUTED,
            padding: 16,
            usePointStyle: true,
            pointStyle: 'rect',
          }
        },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} per million miles`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions, maxRotation: 0, font: { size: 11 } },
          border: { display: false }
        },
        y: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => v + '/M mi'
          },
          border: { display: false }
        }
      }
    }
  });
}

/* ============================================================
   CHART 6: Medical Diagnosis Accuracy
   ============================================================ */
function initMedicalChart() {
  const ctx = document.getElementById('medicalChart');
  if (!ctx) return;

  const conditions = [
    'Breast cancer\n(mammogram)',
    'Diabetic\nretinopathy',
    'Skin cancer\ndetection',
    'Pneumonia\n(chest X-ray)',
    'Sepsis\nearly warning',
  ];

  const humanError = [30, 22, 34, 28, 35];
  const aiError = [6.5, 6.7, 7, 10, 18];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: conditions,
      datasets: [
        {
          label: 'Human physician error rate (%)',
          data: humanError,
          backgroundColor: NEGATIVE_BG,
          borderColor: NEGATIVE,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'AI system error rate (%)',
          data: aiError,
          backgroundColor: ACCENT_BG,
          borderColor: ACCENT,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            color: MUTED,
            padding: 16,
            usePointStyle: true,
            pointStyle: 'rect',
          }
        },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y}% error rate`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions, maxRotation: 0, font: { size: 11 } },
          border: { display: false }
        },
        y: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v}%`
          },
          border: { display: false },
          title: {
            display: true,
            text: 'Error Rate (%)',
            color: MUTED,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 7: Water Usage by Data Center Technology
   ============================================================ */
function initWaterTechChart() {
  const ctx = document.getElementById('waterTechChart');
  if (!ctx) return;

  const techs = [
    'Traditional\n(evaporative)',
    'Closed-Loop\nCooling',
    'Immersion\nCooling',
    'Space\nData Center',
  ];

  const liters = [1.8, 0.03, 0, 0];

  const colors = techs.map((t, i) =>
    i === 0 ? NEGATIVE_BG :
    i >= 2 ? ACCENT_BG :
    'rgba(68, 204, 136, 0.55)'
  );

  const borders = techs.map((t, i) =>
    i === 0 ? NEGATIVE :
    i >= 2 ? ACCENT :
    POSITIVE
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: techs,
      datasets: [{
        label: 'Liters per kWh',
        data: liters,
        backgroundColor: colors,
        borderColor: borders,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: CARD_BG,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} L/kWh`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...sharedTickOptions, maxRotation: 0, font: { size: 11 } },
          border: { display: false }
        },
        y: {
          grid: sharedGridOptions,
          ticks: {
            ...sharedTickOptions,
            callback: (v) => `${v} L`
          },
          border: { display: false },
          title: {
            display: true,
            text: 'Liters per kWh',
            color: MUTED,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   INIT ALL CHARTS
   ============================================================ */
function initAllCharts() {
  initEnergyChart();
  initRoiChart();
  initNuclearDeathsChart();
  initEmissionsChart();
  initDrivingChart();
  initMedicalChart();
  initWaterTechChart();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllCharts);
} else {
  initAllCharts();
}
