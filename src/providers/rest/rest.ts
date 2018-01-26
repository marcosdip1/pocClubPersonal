import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RequestOptions, Request, RequestMethod} from '@angular/http';
/*
 Generated class for the RestProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */

@Injectable()
export class RestProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private clubCatalogTest = 'http://clubtest.personal.com.ar:8090/club/services/catalog/items?$catalogItemType=2&$heading=3&page=0&isForm=true';
  private catalogLocal = 'http://10.15.71.55:8080/app-beneficios/services/catalogo/filtrado?idNivel=&idCategoria=';
  private catalogProd = 'https://neobeneficios.neoris.net/app-beneficios/services/catalogo/filtrado?idNivel=';
  private catalogDummy = 'http://www.json-generator.com/api/json/get/cfubdcxMMO?indent=2';
  private geoCatalogLocal = 'http://10.15.71.79:8080/app-beneficios/services/descuento/descuentosGDTO?longuitud=-34.2015628&latitud=-60.7388666&idNivel=&idCategoria=';
  private geoCatalogProd = 'https://neobeneficios.neoris.net/app-beneficios/services/descuento/descuentosGDTO?longuitud=-34.2015628&latitud=-60.7388666&idNivel=&idCategoria=';
  private clubBenefitDetail = 'https://neobeneficios.neoris.net/app-beneficios/services/descuento/';

  private homeCards = [
    {
      id: 1,
      name: 'fest',
      title: 'UN FEST PARA LA STORY',
      description: 'Este año, tu entrada al Personal Fest es una pulsera. Activala para ingresar al predio, comprar en los puestos de gastronomía y disfrutar de toda la diversión.',
      imgUrl: 'assets/imgs/fest.jpg',
      url: 'http://www.personalfest.com.ar'
    },
    {
      id: 2,
      name: 'netshoes',
      title: 'Netshoes',
      description: 'Disfruta de un 20% de descuento en Netshoes, ingresando el código de descuento en www.personal.bondacom.com/clientes/netshoes.',
      imgUrl: 'assets/imgs/netshoes.png',
      url: ''
    },
    {
      id: 3,
      name: 'freddo',
      title: 'Freddo',
      description: 'Sabemos que tenés un paladar muy exigente y te gusta disfrutar los mejores helados, por eso si sos socio Club Personal aprovechá este 2x1 en cucuruchos de Freddo!',
      imgUrl: 'assets/imgs/freddo.png',
      url: ''
    }
  ];

  constructor(public http:HttpClient) {
  }

  getGeoCatalog():Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.geoCatalogProd)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCountries():Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCatalogDummy():Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.catalogDummy)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCatalogLocal():Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.catalogLocal)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCatalogTest():Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.clubCatalogTest)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCatalogProd(levelId):Observable<string[]> {
    //noinspection TypeScriptValidateTypes
    return this.http.get(this.catalogProd+levelId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBenefitDetail(idBenefit): Observable<string[]> {
    //noinspection TypeScriptUnresolvedVariable
    return this.http.get(this.clubBenefitDetail+idBenefit)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res;
    return body || {};
  }

  private handleError(error:Response | any) {
    let errMsg:string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getHomeCards() {
    return this.homeCards;
  }
}
