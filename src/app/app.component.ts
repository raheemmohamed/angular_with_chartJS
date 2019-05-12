import { ChartService } from './services/chart.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Chart} from 'chart.js';
import 'chartjs-plugin-datalabels';

import 'chartjs-plugin-style';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart;
  PieChart;
  wetherData;

  horizontalbarchart;

  title = 'charts';
  constructor(
    private cartserive: ChartService) {

  }

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    const data = [];
    let jsdate;

    const maxData = [];
    const minData = [];


    this.cartserive.getchartData().subscribe(
      result => {
        result.forEach(element => {

          const allLoadData = element.main;

          this.wetherData.push({...element.main});
          console.log(element.main.temp_max);

          jsdate = new Date(allLoadData.dt * 1000);
          data.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));

          maxData.push(element.main.temp_max);
          minData.push(element.main.temp_min);

          console.log(data);
          // chart start here LINE
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: data,
              datasets: [
                {
                  label: ['chart Data 1'],
                  data: maxData,
                  borderColor: '#3cba9f',
                   fill: false
                },
                {
                  label: ['chart Data 2'],
                  data: minData,
                  borderColor: '#ffcc00',
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true

                }],
              }
            }
          });

        });
      }
    );




    const chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    // const effectColors = {
    //   highlight: 'rgba(255, 255, 255, 0.75)',
    //   shadow: 'rgba(0, 0, 0, 0.5)',
    //   glow: 'rgb(255, 255, 0)',
    //   red: 'red'
    // };

    const effectColors = [
      'red',
                'yellow',
                'blue',
                'green',
                'orange',
                'lightgrey'
    ];

    const overlay = [
      'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
    ];
    //
    // pie chart:
      this.PieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
           label: '# of Votes',
            data: [9, 7 , 3, 5, 2, 10],
            backgroundColor: [
              'red',
              'yellow',
              'blue',
              'green',
              'orange',
              'lightgrey'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],


// // shadowBlur: 10,
// // shadowColor: 'white',
// hoverShadowColor: effectColors,
// hoverShadowOffsetX: 20,
// hoverShadowOffsetY: -20,
// bevelHighlightColor: effectColors,
// hoverOuterGlowWidth: 10,
// hoverOuterGlowColor: effectColors
// // hoverBackgroundOverlayColor: overlay
// borderWidth: 1,


      hoverOuterGlowWidth: 40,

      hoverOuterGlowColor: effectColors,

      hoverInnerGlowWidth: 40,
      hoverInnerGlowColor: 'black',


        }
      ]
        },
        options: {
          title: {
              text: 'Bar Chart',
              display: false
          },
          tooltips: {
            shadowOffsetX: 40,
            shadowOffsetY: 3,
            shadowColor: effectColors,
            hoverShadowColor: 'red',
            // bevelHighlightColor: effectColors,
            // bevelShadowColor: effectColors,
          },
          scales: {
              xAxes: [{
                display: false,
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                display: false

              }],
          }
        }
      });


      // basic line chart
      const myLineChart = new Chart('ctx', {
          type: 'line',
          data: {
            labels: ['january', 'feb', 'march', 'apr', 'march'],
            datasets: [{
              labels: 'incident number',
              data: [10, 5, 15, 30, 20],
              fill: false,
              backgroundColor: [
                'red',
            ],
            borderColor: [
                'green',
            ],
            pointBackgroundColor: ['grey'],
            borderWidth: 2

            },
            {
              labels: ['Second Data'],
              data: [8, 10, 2, 1, 50],
              fill: false
            }
          ]
          },
          options: {

            title: {
                text: 'Line Chart',
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
          }
      });




      // horizontalbarchart
      this.horizontalbarchart = new Chart('horizontalbarchart', {
          type: 'horizontalBar',
          data: {
            labels: ['january', 'feb', 'march', 'apr', 'march'],
            datasets: [{
              labels: 'incident',
              data: [11, 12, 15, 17, 18],
              fill: false,
              backgroundColor: [
                'red',
                'blue',
                'green',
                'yellow',
                'orange',
            ],
            borderColor: [
              'red',
              'blue',
              'green',
              'yellow',
              'orange',
            ],
            borderWidth: 2

            }
          ]
          },
          options: {
           legend: {
            display: false
           },
           tooltip: {
             display: false
           },
            scales: {
              xAxes: [{
                stacked: true,
                maxBarThickness: 1,
                pointLabels: {
                  display: false
                },
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                  mirror: true,
                  min: 10,
                  max: 20,
                  stepSize: 1,
                  beginAtZero: true,
                  labelOffset: 24
                },
              }],
                yAxes: [{
                  stacked: true,
                  minor: true,
                  scaleLabel: {
                    display: true,
                    fontColor: '#666',
                    fontSize: 20
                  },
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                      display: false,
                      beginAtZero: true
                  },
                }]
            },

            plugins: {
              datalabels: {
                align: 'end',
                anchor: 'end',
                color: function(context) {
                 return context.dataset.backgroundColor;
                },
                font: function(context) {
                 const w = context.chart.width;
                  return {
                    size: w < 512 ? 12 : 14
                  };
                },
                formatter: function(value, context) {
                  return context.chart.data[context.dataIndex];
                }
              }
          }

          },
      });
  }
}
