function renderChart(jobRole, count) {
  var ctx = document.getElementById('barChart');
  
  new Chart(ctx, {
      type: 'bar',
      data: {
        labels: jobRole,
        datasets: [{
          label: 'No. of Applications',
          data: count,
          backgroundColor:'#0eb5c4',
          borderColor: '#0eb5c4',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
}