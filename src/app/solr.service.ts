import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolrService {

  constructor(private http: HttpClient) { }

  search(term: string,country: string,poi: string,lang:string){
    let query=`${term}%20AND%20poi_name%3A${poi}`;
    if(country){
      query=query+`%20AND%20country%3A${country}`;
    }
    if(lang){
      query=query+`%20AND%20%20tweet_lang%3A${lang}`;
    }
    console.log(country);
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    const url=`/api/solr/IRProject4/select?defType=edismax&q=${query}&qf=text_en^6+text_es+text_hi&wt=json&indent=true&rows=50`
    return this.http.get(url,{headers:header});
  }
  
  getReplies(id:Number){
      // const url1=`solr/IRProject4/select?fl=replied_to_tweet_id&q.op=OR&q=replied_to_user_id:${id}&rows=200`
      // let res= this.http.get(url1);
      // console.log(res['response']['docs']);
      const url=`/api/solr/IRProject4/select?q=replied_to_user_id:${id}&rows=200`;
      return this.http.get(url);
  }

  getSentimentScores(text: string){
        const url = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyA-AGyzTrYnXXBeBAvrk6qMGWyoJ7xYZ1o'
        return this.http.post(url,{
          "document": {
            "type": "PLAIN_TEXT",
            "content": text
            }
        })  
   }

   getArticles(text: string){
     const url=`https://newsapi.org/v2/everything?q=${text}&from=2021-12-01&to=2021-12-11&sortBy=popularity&apiKey=abb056465e9e4cc5a825c482e80903a7`;
     return this.http.get(url);
   }

   getPoIStat(name:string){
       const url=`api/solr/IRProject4/query?q=tweet_text:(quarentena%20OR%20hospital%20OR%20covidresources%20OR%20rt-pcr%20OR%20%E0%A4%B5%E0%A5%88%E0%A4%B6%E0%A5%8D%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%80%20OR%20oxygen%20OR%20%E0%A4%B8%E0%A5%81%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BF%E0%A4%A4%20%E0%A4%B0%E0%A4%B9%E0%A5%87%E0%A4%82%20OR%20stayhomestaysafe%20OR%20covid19%20OR%20quarantine%20OR%20%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%95%20OR%20face%20mask%20OR%20covidsecondwaveinindia%20OR%20flattenthecurve%20OR%20corona%20virus%20OR%20wuhan%20OR%20cierredeemergencia%20OR%20autoaislamiento%20OR%20sintomas%20OR%20covid%20positive%20OR%20casos%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1%20%E0%A4%AE%E0%A5%83%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A5%81%20OR%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%20%E0%A4%9A%E0%A5%81%E0%A4%A8%E0%A4%BE%20%E0%A4%8F%E0%A4%95%E0%A4%BE%E0%A4%82%E0%A4%A4%20OR%20stay%20safe%20OR%20%23deltavariant%20OR%20covid%20symptoms%20OR%20sarscov2%20OR%20covidiots%20OR%20brote%20OR%20alcohol%20en%20gel%20OR%20disease%20OR%20asintom%C3%A1tico%20OR%20%E0%A4%9F%E0%A5%80%E0%A4%95%E0%A4%BE%E0%A4%95%E0%A4%B0%E0%A4%A3%20OR%20encierro%20OR%20covidiot%20OR%20covidappropriatebehaviour%20OR%20fever%20OR%20pandemia%20de%20covid-19%20OR%20wearamask%20OR%20flatten%20the%20curve%20OR%20ox%C3%ADgeno%20OR%20desinfectante%20OR%20super-spreader%20OR%20ventilador%20OR%20coronawarriors%20OR%20quedate%20en%20casa%20OR%20mascaras%20OR%20mascara%20facial%20OR%20trabajar%20desde%20casa%20OR%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A4%B0%E0%A5%8B%E0%A4%A7%20OR%20immunity%20OR%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A4%B0%E0%A5%8B%E0%A4%A7%20OR%20%E0%A4%A1%E0%A5%87%E0%A4%B2%E0%A5%8D%E0%A4%9F%E0%A4%BE%20%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%B0%E0%A4%A3%20OR%20mask%20mandate%20OR%20health%20OR%20dogajkidoori%20OR%20travelban%20OR%20cilindro%20de%20ox%C3%ADgeno%20OR%20covid%20OR%20staysafe%20OR%20variant%20OR%C3%A520yomequedoencasa%20OR%20doctor%20OR%20%E0%A4%8F%E0%A4%82%E0%A4%9F%E0%A5%80%E0%A4%AC%E0%A5%89%E0%A4%A1%E0%A5%80%20OR%20%E0%A4%A6%E0%A5%82%E0%A4%B8%E0%A4%B0%E0%A5%80%20%E0%A4%B2%E0%A4%B9%E0%A4%B0%20OR%20distancia%20social%20OR%20%E0%A4%AE%E0%A5%81%E0%A4%96%E0%A5%8C%E0%A4%9F%E0%A4%BE%20OR%20covid%20test%20OR%20%E0%A4%85%E0%A4%B8%E0%A5%8D%E0%A4%AA%E0%A4%A4%E0%A4%BE%E0%A4%B2%20OR%20covid%20deaths%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A119%20OR%20muvariant%20OR%20susanadistancia%20OR%20personal%20protective%20equipment%20OR%20remdisivir%20OR%20quedateencasa%20OR%20asymptomatic%20OR%20social%20distancing%20OR%20distanciamiento%20social%20OR%20cdc%20OR%20transmission%20OR%20epidemic%20OR%20social%20distance%20OR%20herd%20immunity%20OR%20transmisi%C3%B3n%20OR%20%E0%A4%B8%E0%A5%88%E0%A4%A8%E0%A4%BF%E0%A4%9F%E0%A4%BE%E0%A4%87%E0%A4%9C%E0%A4%BC%E0%A4%B0%20OR%20indiafightscorona%20OR%20surgical%20mask%20OR%20facemask%20OR%20desinfectar%20OR%20%E0%A4%B5%E0%A4%BE%E0%A4%AF%E0%A4%B0%E0%A4%B8%20OR%20%E0%A4%B8%E0%A4%82%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A4%A3%20OR%20symptoms%20OR%20%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BF%E0%A4%95%20%E0%A4%A6%E0%A5%82%E0%A4%B0%E0%A5%80%20OR%20covid%20cases%20OR%20ppe%20OR%20sars%20OR%20autocuarentena%20OR%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BE%E0%A4%B2%E0%A4%95%20OR%20breakthechain%20OR%20stayhomesavelives%20OR%20coronavirusupdates%20OR%20sanitize%20OR%20covidinquirynow%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A5%8B%E0%A4%A8%E0%A4%BE%20OR%20workfromhome%20OR%20outbreak%20OR%20flu%20OR%20sanitizer%20OR%20distanciamientosocial%20OR%20variante%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1%2019%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1-19%20OR%20covid%20pneumonia%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1%20OR%20pandemic%20OR%20icu%20OR%20%E0%A4%B5%E0%A4%BE%E0%A4%87%E0%A4%B0%E0%A4%B8%20OR%20contagios%20OR%20%E0%A4%B5%E0%A5%87%E0%A4%82%E0%A4%9F%E0%A4%BF%E0%A4%B2%E0%A5%87%E0%A4%9F%E0%A4%B0%20OR%20washyourhands%20OR%20n95%20OR%20stayhome%20OR%20lavadodemanos%20OR%20fauci%20OR%20%E0%A4%B0%E0%A5%8B%E0%A4%97%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A4%BF%E0%A4%B0%E0%A5%8B%E0%A4%A7%E0%A4%95%20%E0%A4%B6%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A4%BF%20OR%20maskmandate%20OR%20%E0%A4%A1%E0%A5%87%E0%A4%B2%E0%A5%8D%E0%A4%9F%E0%A4%BE%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%80%20OR%20third%20wave%20OR%20epidemia%20OR%20fiebre%20OR%20%E0%A4%AE%E0%A5%8C%E0%A4%A4%20OR%20travel%20ban%20OR%20%E0%A4%AB%E0%A4%BC%E0%A5%8D%E0%A4%B2%E0%A5%82%20OR%20muerte%20OR%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%9A%E0%A5%8D%E0%A4%9B%20OR%20washhands%20OR%20enfermedad%20OR%20contagio%20OR%20infecci%C3%B3n%20OR%20faceshield%20OR%20self-quarantine%20OR%20remdesivir%20OR%20oxygen%20cylinder%20OR%20mypandemicsurvivalplan%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%A1%20%E0%A4%95%E0%A5%87%20%E0%A4%95%E0%A5%87%E0%A4%B8%20OR%20delta%20variant%20OR%20wuhan%20virus%20OR%20%E0%A4%B2%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%A3%20OR%20corona%20OR%20maskup%20OR%20gocoronago%20OR%20death%20OR%20curfew%20OR%20socialdistance%20OR%20second%20wave%20OR%20m%C3%A1scara%20OR%20stayathome%20OR%20positive%20OR%20lockdown%20OR%20propagaci%C3%B3n%20en%20la%20comunidad%20OR%20%E0%A4%A4%E0%A5%80%E0%A4%B8%E0%A4%B0%E0%A5%80%20%E0%A4%B2%E0%A4%B9%E0%A4%B0%20OR%20aislamiento%20OR%20rtpcr%20OR%20coronavirus%20OR%20variante%20delta%20OR%20distanciasocial%20OR%20cubrebocas%20OR%20%E0%A4%98%E0%A4%B0%20%E0%A4%AA%E0%A4%B0%20%E0%A4%B0%E0%A4%B9%E0%A5%87%E0%A4%82%20OR%20socialdistancing%20OR%20covidwarriors%20OR%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8B%E0%A4%AA%20OR%20covid-19%20OR%20stay%20home%20OR%20%E0%A4%B8%E0%A4%82%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A4%BF%E0%A4%A4%20OR%20jantacurfew%20OR%20cowin%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A5%8B%E0%A4%A8%E0%A4%BE%E0%A4%B5%E0%A4%BE%E0%A4%87%E0%A4%B0%E0%A4%B8%20OR%20virus%20OR%20distanciamiento%20OR%20cuarentena%20OR%20indiafightscovid19%20OR%20healthcare%20OR%20natocorona%20OR%20%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%95%20%E0%A4%AA%E0%A4%B9%E0%A4%A8%E0%A5%87%E0%A4%82%20OR%20delta%20OR%20%E0%A4%91%E0%A4%95%E0%A5%8D%E0%A4%B8%E0%A5%80%E0%A4%9C%E0%A4%A8%20OR%20wearmask%20OR%20%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A5%8B%E0%A4%A8%E0%A4%BE%E0%A4%B5%E0%A4%BE%E0%A4%AF%E0%A4%B0%E0%A4%B8%20OR%20ventilator%20OR%20pneumonia%20OR%20maskupindia%20OR%20ppe%20kit%20OR%20sars-cov-2%20OR%20testing%20OR%20fightagainstcovid19%20OR%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%80%20OR%20%E0%A4%A8%E0%A4%BF%E0%A4%AF%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%A3%20%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A5%87%E0%A4%A4%E0%A5%8D%E0%A4%B0%20OR%20who%20OR%20mask%20OR%20pandemia%20OR%20deltavariant%20OR%20%E0%A4%B5%E0%A5%88%E0%A4%B6%E0%A5%8D%E0%A4%B5%E0%A4%BF%E0%A4%95%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%80%20OR%20%E0%A4%B0%E0%A5%8B%E0%A4%97%20%20)&q.op=OR&wt=json&rows=0&facet=true&facet.range=tweet_date&facet.range.start=2021-01-01T05:00:00.000Z&facet.range.end=2021-09-30T04:00:00.000Z&facet.range.gap=%2B1DAY&fq=tweet_date:%5B2021-01-01T05:00:00.000Z%20TO%202021-09-30T04:00:00.000Z%5D&fq=poi_name:${name}`;
       return this.http.get(url);
   }
}
