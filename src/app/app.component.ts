import { ChartService } from './services/chart.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Chart} from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart = [];
  PieChart = [];
  wetherData = [];

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
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }
      ]
        },
        options: {

          title: {
              text: 'Bar Chart',
              display: false
          },
          scales: {
              // yAxes: [{
              //     ticks: {
              //         beginAtZero: true
              //     }
              // }]

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
  }
}
