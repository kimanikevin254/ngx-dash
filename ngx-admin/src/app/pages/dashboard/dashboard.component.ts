import { Component } from '@angular/core';
import { Sale } from './Sale'
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  //an array to store the fetched sales data
  sales: any = [];

  //arrays to store data for the Overview section on the dashboard
  totalSalesAmt: any = []
  totalUnitsSold: any = []
  totalRegions: any = []
  totalManagers: any = []
  totalSalesmen: any = []

  //arrays to store data for the Regional Sales section on the dashboard
  eastSales: Sale[] = []
  westSales: Sale[] = []
  centralSales: Sale[] = []

  //arrays to store data for the Manager Sales section on the dashboard
  marthaSales: Sale[] = []
  hermannSales: Sale[] = []
  timothySales: Sale[] = []
  douglasSales: Sale[] = []

  //boolean to control when the dashboard data loads
  isDataAvailable: boolean = false;


  constructor(private apiService: ApiService){
  }

  //method for extracting the sales data and populating the created arrays
  public extract(){

    //loop through the data and populate the Overview section arrays
    this.sales.forEach(sale => {
      this.totalSalesAmt.push(sale.saleAmt)
      this.totalUnitsSold.push(sale.units)
      this.totalRegions.push(sale.region)
      this.totalManagers.push(sale.manager)
      this.totalSalesmen.push(sale.salesman)
    })

    //loop through the data and populate the Regional Sales section arrays
    this.sales.forEach(sale => {
      sale.region === "East" ? this.eastSales.push(sale)
      : sale.region === "West" ? this.westSales.push(sale)
      : this.centralSales.push(sale)  
    })

    //loop through the data and populate the Manager Sales section arrays
    this.sales.forEach(sale => {
      sale.manager === "Martha" ? this.marthaSales.push(sale)
      : sale.manager === "Hermann" ? this.hermannSales.push(sale)
      : sale.manager === "Timothy" ? this.timothySales.push(sale)
      : this.douglasSales.push(sale)  
    })
  }

  //method to perform computations for the Overview section totals
  public overviewComputations(){
    let totalSales:number = this.totalSalesAmt.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    let totalUnitsSold: number = this.totalUnitsSold.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    let totalRegions: number = [...new Set(this.totalRegions)].length
    let totalManagers: number = [...new Set(this.totalManagers)].length
    let totalSalesmen: number = [...new Set(this.totalSalesmen)].length

    return [totalSales, totalUnitsSold, totalRegions, totalManagers, totalSalesmen]
  }

  //method to perform computations for the Regional Sales section totals
  public regionalSalesComputations(){
    // Calculating total sales per region
    const totalSales = (array) => (array.map(elem => elem.saleAmt)).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    // Calculating total units sold per region
    const totalUnits = (array) => (array.map(elem => elem.units)).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    let eastTotalSales: number = totalSales(this.eastSales)
    let eastTotalUnits: number = totalUnits(this.eastSales)

    let westTotalSales: number = totalSales(this.westSales)
    let westTotalUnits: number = totalUnits(this.westSales)

    let centralTotalSales: number = totalSales(this.centralSales)
    let centralTotalUnits: number = totalUnits(this.centralSales)

    return [eastTotalSales, eastTotalUnits, westTotalSales, westTotalUnits, centralTotalSales, centralTotalUnits]
  }

  //method to perform computations for the Manager Sales section totals
  public managerSalesComputations(){
    // Calculating total sales per region
    const totalSales = (array) => (array.map(elem => elem.saleAmt)).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    // Calculating total units sold per region
    const totalUnits = (array) => (array.map(elem => elem.units)).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    let marthaTotalSales: number = totalSales(this.marthaSales)
    let marthaTotalUnits: number = totalUnits(this.marthaSales)

    let hermannTotalSales: number = totalSales(this.hermannSales)
    let hermannTotalUnits: number = totalUnits(this.hermannSales)

    let timothyTotalSales: number = totalSales(this.timothySales)
    let timothyTotalUnits: number = totalUnits(this.timothySales)

    let douglasTotalSales: number = totalSales(this.douglasSales)
    let douglasTotalUnits: number = totalUnits(this.douglasSales)

    return [marthaTotalSales, marthaTotalUnits, hermannTotalSales, hermannTotalUnits, timothyTotalSales, timothyTotalUnits, douglasTotalSales, douglasTotalUnits]
  }

  ngOnInit(): void {
    this.apiService.getSales().subscribe((data:Sale) => {
      this.sales = data;
      this.extract();
      this.isDataAvailable = true;
    })
  }
}

