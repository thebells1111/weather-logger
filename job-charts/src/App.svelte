<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';
  import data from './data/data.json';

  let chart;

  let insideTemperature = [];
  let time = [];
  let outsideTemperature = [];
  data.forEach((v) => {
    insideTemperature.push(v.temperature);
    outsideTemperature.push(v.humidity);
    time.push(new Date(v.time).toLocaleString());
  });

  onMount(async () => renderChart());

  function renderChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
            label: 'Inside',
            data: insideTemperature,
            fill: false,
            borderColor: 'blue',
            lineTension: 0.4,
            pointBorderColor: 'blue',
            spanGaps: true,
          },
          {
            label: 'Outside',
            data: outsideTemperature,
            fill: false,
            borderColor: 'red',
            lineTension: 0.4,
            pointBorderColor: 'red',
            spanGaps: true,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 16,
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'black',
              },
              gridLines: {
                display: true,
                color: 'gray',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'black',
              },
              gridLines: {
                display: true,
                color: 'gray',
              },
            },
          ],
        },
      },
    });
  }
</script>

<canvas id="myChart"></canvas>
