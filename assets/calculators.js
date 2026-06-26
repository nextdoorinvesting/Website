/* ---------- Calculator helpers ---------- */
const $=id=>parseFloat(document.getElementById(id).value)||0;
const usd=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const pct=n=>isFinite(n)?n.toFixed(1)+'%':'—';
function pmt(P,annualRate,years){
 const r=annualRate/100/12,n=years*12;
 if(P<=0||n<=0)return 0;
 if(r===0)return P/n;
 return P*r/(1-Math.pow(1+r,-n));
}
function set(id,v){document.getElementById(id).textContent=v;}

/* 1. Mortgage */
function calcM(){
 const price=$('m_price'),loan=price*(1-$('m_down')/100),p=pmt(loan,$('m_rate'),$('m_term'));
 const total=p*$('m_term')*12;
 set('m_pmt',usd(p));set('m_loan',usd(loan));set('m_int',usd(total-loan));set('m_total',usd(total));
}
/* 2. Rental */
function calcR(){
 const price=$('r_price'),down=price*$('r_down')/100,loan=price-down;
 const p=pmt(loan,$('r_rate'),30),rent=$('r_rent');
 const exp=$('r_tax')+$('r_ins')+rent*($('r_maint')+$('r_vac')+$('r_pm'))/100;
 const cf=rent-exp-p,acf=cf*12;
 set('r_cf',usd(cf));set('r_acf',usd(acf));
 set('r_coc',down>0?pct(acf/down*100):'—');
 set('r_grm',rent>0?(price/(rent*12)).toFixed(1):'—');
 const el=document.getElementById('r_cf');
 el.style.color=cf>=0?'var(--forest)':'#A4452F';
 document.getElementById('r_interp').textContent = cf>=0
   ? "Positive cash flow — the property pays you each month."
   : "Negative cash flow — you'd be subsidizing this property each month.";
}
/* 3. House hack */
function calcH(){
 const piti=$('h_piti'),rent=$('h_rent'),mkt=$('h_mktrent');
 const eff=piti-rent;
 set('h_eff',usd(eff));
 set('h_save',usd((mkt-eff)*12));
 set('h_pct',piti>0?pct(rent/piti*100):'—');
 document.getElementById('h_eff').style.color=eff<=mkt?'var(--forest)':'var(--gold-dark)';
}
/* 4. Affordability */
function calcA(){
 const inc=$('a_inc')/12,debt=$('a_debt'),dp=$('a_dp'),rate=$('a_rate'),term=$('a_term');
 const taxIns=0.0035/12; // rough monthly tax+insurance as fraction of price (Oregon-ish est.)
 function maxPrice(dtiCap){
   const budget=inc*dtiCap-debt;
   if(budget<=0)return 0;
   // solve price: pmt(price-dp)+price*taxIns = budget
   let lo=0,hi=5000000;
   for(let i=0;i<60;i++){
     const mid=(lo+hi)/2;
     const cost=pmt(Math.max(mid-dp,0),rate,term)+mid*taxIns;
     cost>budget?hi=mid:lo=mid;
   }
   return lo;
 }
 const max=maxPrice(0.36),cons=maxPrice(0.28);
 set('a_max',usd(max));set('a_cons',usd(cons));
 set('a_pmt',usd(pmt(Math.max(max-dp,0),rate,term)+max*taxIns));
}
/* 5. Fix and hold */
function calcF(){
 const price=$('f_price'),reno=$('f_reno'),arv=$('f_arv');
 const down=price*$('f_down')/100,inv=down+reno;
 const eq=arv-price-reno;
 const cf=$('f_rent')-$('f_exp'),acf=cf*12;
 set('f_eq',usd(eq));set('f_inv',usd(inv));set('f_cf',usd(cf));
 set('f_coc',inv>0?pct(acf/inv*100):'—');
 document.getElementById('f_eq').style.color=eq>=0?'var(--gold-dark)':'#A4452F';
}

/* 6. Cash to Close */
function calcC2C(){
 const price=$('c2c_price');
 const downPct=$('c2c_down');
 const down=price*downPct/100;
 const loan=price-down;
 const rate=$('c2c_rate'),term=$('c2c_term');

 const origFee=loan*$('c2c_orig')/100;
 const title=$('c2c_title');
 const appr=$('c2c_appr');
 const rec=$('c2c_rec');
 const closingCosts=origFee+title+appr+rec;

 const taxEscrow=($('c2c_tax')/12)*$('c2c_taxmo');
 const insUpfront=$('c2c_ins'); // typically a full year paid at closing
 const dailyInterest=(loan*(rate/100))/365;
 const prepaidInterest=dailyInterest*$('c2c_days');
 const prepaids=taxEscrow+insUpfront+prepaidInterest;

 const credit=$('c2c_credit');

 const total=down+closingCosts+prepaids-credit;
 const monthlyPmt=pmt(loan,rate,term);

 set('c2c_total',usd(Math.max(total,0)));
 set('c2c_dp',usd(down));
 set('c2c_cc',usd(closingCosts));
 set('c2c_pp',usd(prepaids));
 set('c2c_creditout', credit>0 ? '–'+usd(credit) : usd(0));
 set('c2c_loan',usd(loan));
 set('c2c_pmt',usd(monthlyPmt));
}

const calcs={m:calcM,r:calcR,h:calcH,a:calcA,f:calcF,c2c:calcC2C};
document.querySelectorAll('.calc input').forEach(inp=>{
 const prefix = inp.id.startsWith('c2c_') ? 'c2c' : inp.id[0];
 inp.addEventListener('input',()=>calcs[prefix]());
});
calcM();calcR();calcH();calcA();calcF();calcC2C();
