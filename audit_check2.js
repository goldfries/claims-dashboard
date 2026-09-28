// Spot-check all same-eid + same-merch pairs, and verify all day-of-week values

const claims = [
  {id:'CL001',eid:'EMP002',amt:85,  merch:'Petronas',                     dateStr:'2026-09-07'},
  {id:'CL002',eid:'EMP002',amt:85,  merch:'Petronas',                     dateStr:'2026-09-08'},
  {id:'CL003',eid:'EMP003',amt:145, merch:'Nasi Kandar Pelita',            dateStr:'2026-09-03'},
  {id:'CL004',eid:'EMP001',amt:55,  merch:'Village Park Restaurant',       dateStr:'2026-09-12'},
  {id:'CL005',eid:'EMP004',amt:120, merch:'MPH Bookstores',                dateStr:'2026-09-16'},
  {id:'CL006',eid:'EMP005',amt:95,  merch:'Nasi Kandar Pelita',            dateStr:'2026-09-10'},
  {id:'CL007',eid:'EMP005',amt:220, merch:'MPH Bookstores',                dateStr:'2026-09-10'},
  {id:'CL008',eid:'EMP005',amt:240, merch:'TGI Fridays',                   dateStr:'2026-09-10'},
  {id:'CL009',eid:'EMP001',amt:95,  merch:'Grab',                          dateStr:'2026-09-01'},
  {id:'CL010',eid:'EMP001',amt:72,  merch:'Village Park Restaurant',       dateStr:'2026-09-02'},
  {id:'CL011',eid:'EMP001',amt:185, merch:"Lotus's",                       dateStr:'2026-09-04'},
  {id:'CL012',eid:'EMP001',amt:850, merch:'AirAsia',                       dateStr:'2026-09-09'},
  {id:'CL013',eid:'EMP001',amt:380, merch:'Berjaya Hotel',                 dateStr:'2026-09-17'},
  {id:'CL014',eid:'EMP002',amt:48,  merch:"Lotus's",                       dateStr:'2026-09-02'},
  {id:'CL015',eid:'EMP002',amt:260, merch:'MPH Bookstores',                dateStr:'2026-09-11'},
  {id:'CL016',eid:'EMP002',amt:310, merch:'TGI Fridays',                   dateStr:'2026-09-17'},
  {id:'CL017',eid:'EMP002',amt:110, merch:'Grab',                          dateStr:'2026-09-22'},
  {id:'CL018',eid:'EMP003',amt:130, merch:'Grab',                          dateStr:'2026-09-01'},
  {id:'CL019',eid:'EMP003',amt:88,  merch:'Village Park Restaurant',       dateStr:'2026-09-09'},
  {id:'CL020',eid:'EMP003',amt:195, merch:"Lotus's",                       dateStr:'2026-09-15'},
  {id:'CL021',eid:'EMP003',amt:355, merch:'Marriott KL',                   dateStr:'2026-09-23'},
  {id:'CL022',eid:'EMP003',amt:65,  merch:'Nasi Kandar Pelita',            dateStr:'2026-09-29'},
  {id:'CL023',eid:'EMP004',amt:90,  merch:'TGI Fridays',                   dateStr:'2026-09-01'},
  {id:'CL024',eid:'EMP004',amt:140, merch:'Grab',                          dateStr:'2026-09-04'},
  {id:'CL025',eid:'EMP004',amt:275, merch:'MPH Bookstores',                dateStr:'2026-09-14'},
  {id:'CL026',eid:'EMP004',amt:460, merch:'Berjaya Hotel',                 dateStr:'2026-09-24'},
  {id:'CL027',eid:'EMP004',amt:78,  merch:'Village Park Restaurant',       dateStr:'2026-09-30'},
  {id:'CL028',eid:'EMP005',amt:125, merch:'Grab',                          dateStr:'2026-09-03'},
  {id:'CL029',eid:'EMP005',amt:390, merch:'Marriott KL',                   dateStr:'2026-09-18'},
  {id:'CL030',eid:'EMP005',amt:240, merch:"Lotus's",                       dateStr:'2026-09-25'},
];

console.log('--- All same-eid + same-merch combos (potential duplicate candidates) ---');
for (let i=0; i<claims.length; i++) {
  for (let j=i+1; j<claims.length; j++) {
    const a=claims[i], b=claims[j];
    if (a.eid===b.eid && a.merch===b.merch) {
      const diffDays = Math.abs(new Date(a.dateStr) - new Date(b.dateStr)) / 86400000;
      const amtMatch = (a.amt===b.amt);
      const willFlag = amtMatch && diffDays<=3;
      console.log('  '+(willFlag ? '*** FLAG' : 'scan')+': '+a.id+' vs '+b.id+
        ' | eid='+a.eid+' merch='+a.merch+
        ' | amts='+a.amt+'/'+b.amt+(amtMatch?' (MATCH)':' (diff)')+
        ' | date_diff='+diffDays+'d'+(diffDays<=3?' (<=3d)':' (>3d)'));
    }
  }
}

// DOW verification: Sep 1 2026 = Tuesday confirmed
// Sep 2026 calendar:
// 1=Tue 2=Wed 3=Thu 4=Fri 5=SAT 6=SUN
// 7=Mon 8=Tue 9=Wed 10=Thu 11=Fri 12=SAT 13=SUN
// 14=Mon 15=Tue 16=Wed(HOLIDAY) 17=Thu 18=Fri 19=SAT 20=SUN
// 21=Mon 22=Tue 23=Wed 24=Thu 25=Fri 26=SAT 27=SUN
// 28=Mon 29=Tue 30=Wed
const manualDow = {
  '2026-09-01':'Tuesday',   '2026-09-02':'Wednesday', '2026-09-03':'Thursday',
  '2026-09-04':'Friday',    '2026-09-07':'Monday',    '2026-09-08':'Tuesday',
  '2026-09-09':'Wednesday', '2026-09-10':'Thursday',  '2026-09-11':'Friday',
  '2026-09-12':'Saturday',  '2026-09-14':'Monday',    '2026-09-15':'Tuesday',
  '2026-09-16':'Wednesday', '2026-09-17':'Thursday',  '2026-09-18':'Friday',
  '2026-09-22':'Tuesday',   '2026-09-23':'Wednesday', '2026-09-24':'Thursday',
  '2026-09-25':'Friday',    '2026-09-29':'Tuesday',   '2026-09-30':'Wednesday',
};
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const PUBLIC_HOLIDAYS = new Set(['2026-09-16']);

console.log('\n--- Day-of-week verification for all 21 unique dates ---');
const uniqueDates = [...new Set(claims.map(c=>c.dateStr))].sort();
for (const d of uniqueDates) {
  const jsDay = new Date(d).getUTCDay();
  const jsName = DAY_NAMES[jsDay];
  const manual = manualDow[d] || 'NOT IN MANUAL TABLE';
  const isWeekend = (jsDay===0||jsDay===6);
  const isHoliday = PUBLIC_HOLIDAYS.has(d);
  const match = jsName===manual ? 'OK' : 'MISMATCH!';
  const flag = (isWeekend||isHoliday) ? '<-- FLAG' : '';
  console.log('  '+d+' => JS:'+jsName+' Manual:'+manual+' '+match+(isWeekend?' WEEKEND':'')+(isHoliday?' HOLIDAY':'')+' '+flag);
}

// SPLIT check: also verify no other same-day groups exist beyond EMP005|2026-09-10
console.log('\n--- Same-employee same-day groups (only multi-claim days) ---');
const groups = {};
for (const r of claims) {
  const key = r.eid+'|'+r.dateStr;
  if (!groups[key]) groups[key] = [];
  groups[key].push(r);
}
for (const [key, group] of Object.entries(groups).sort()) {
  if (group.length >= 2) {
    const info = group.map(r => r.id+'('+r.amt+')').join(', ');
    const total = group.reduce((s,r)=>s+r.amt,0);
    const belowAll = group.every(r => r.amt < 500);
    console.log('  '+key+': ['+info+'] total='+total+(belowAll&&total>=500?' >>> SPLIT_CLAIM':' (no split: total='+total+')'));
  }
}
