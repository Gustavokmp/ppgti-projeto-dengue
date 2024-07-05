import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  totalCases: number = 0;
  startDate: string;
  endDate: string;
  maxDate: string;
  listCasesByCity: Array<any>;
  listChartLine: Array<any>;
  dataScatter: Array<any>;
  constructor(private dataService: DataService, private datePipe: DatePipe, private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    this.getCurrentDate();
    this.getCharts();
  }

  getCharts() {
    this.showLoading();
    this.getTotalCases();
    this.getCasesByCity();
    this.getCasesByMonth();
    this.getDataScatter();
  }


  getCurrentDate() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    this.startDate = this.datePipe.transform(firstDayOfYear, 'yyyy-MM-dd')!;
    this.endDate = this.datePipe.transform(today, 'yyyy-MM-dd')!;
    this.maxDate = this.endDate;
  }

  getTotalCases() {
    this.dataService.getTotalCases(this.startDate, this.endDate).subscribe((data) => {
      this.totalCases = data.totalCases;
      this.closeLoading();
    }, (error) => {
      console.log(error);

    })
  }

  getCasesByCity() {
    this.dataService.getCasesByCity(this.startDate, this.endDate).subscribe((data) => {
      this.listCasesByCity = data;
      this.closeLoading();
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.getCasesByCity();
      }, 1000);
    })
  }

  getCasesByMonth() {
    this.dataService.getCasesByMonth(this.startDate, this.endDate).subscribe((data) => {
      this.listChartLine = data;
      this.closeLoading();
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.getCasesByMonth();
      }, 1000);
    })
  }

  getDataScatter() {
    this.dataService.getScatterTempHumidityCases(this.startDate, this.endDate).subscribe((data) => {
      this.dataScatter = data;
      this.closeLoading();
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.getDataScatter();
      }, 1000);
    })
  }

  applyFilter() {
    this.listCasesByCity = undefined;
    this.listChartLine = undefined;
    this.dataScatter = undefined;
    this.getCharts();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();
  }

  closeLoading() {
    if(this.totalCases && this.listCasesByCity && this.listChartLine && this.dataScatter){
      this.loadingCtrl.dismiss();
    }
    
  }

}
