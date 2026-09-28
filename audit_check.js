const claims = [
  {id:'CL001',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-07',cat:'Transport',     amt:85,  merch:'Petronas'},
  {id:'CL002',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-08',cat:'Transport',     amt:85,  merch:'Petronas'},
  {id:'CL003',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-03',cat:'Meals',         amt:145, merch:'Nasi Kandar Pelita'},
  {id:'CL004',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-12',cat:'Meals',         amt:55,  merch:'Village Park Restaurant'},
  {id:'CL005',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-16',cat:'Office Supplies',amt:120,merch:'MPH Bookstores'},
  {id:'CL006',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-10',cat:'Meals',         amt:95,  merch:'Nasi Kandar Pelita'},
  {id:'CL007',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-10',cat:'Office Supplies',amt:220,merch:'MPH Bookstores'},
  {id:'CL008',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-10',cat:'Entertainment', amt:240, merch:'TGI Fridays'},
  {id:'CL009',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-01',cat:'Transport',     amt:95,  merch:'Grab'},
  {id:'CL010',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-02',cat:'Meals',         amt:72,  merch:'Village Park Restaurant'},
  {id:'CL011',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-04',cat:'Office Supplies',amt:185,merch:"Lotus's"},
  {id:'CL012',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-09',cat:'Travel',        amt:850, merch:'AirAsia'},
  {id:'CL013',eid:'EMP001',name:'Ahmad Razif',    dateStr:'2026-09-17',cat:'Accommodation', amt:380, merch:'Berjaya Times Square Hotel'},
  {id:'CL014',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-02',cat:'Meals',         amt:48,  merch:"Lotus's"},
  {id:'CL015',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-11',cat:'Office Supplies',amt:260,merch:'MPH Bookstores'},
  {id:'CL016',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-17',cat:'Entertainment', amt:310, merch:'TGI Fridays'},
  {id:'CL017',eid:'EMP002',name:'Siti Nuraini',   dateStr:'2026-09-22',cat:'Transport',     amt:110, merch:'Grab'},
  {id:'CL018',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-01',cat:'Transport',     amt:130, merch:'Grab'},
  {id:'CL019',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-09',cat:'Meals',         amt:88,  merch:'Village Park Restaurant'},
  {id:'CL020',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-15',cat:'Office Supplies',amt:195,merch:"Lotus's"},
  {id:'CL021',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-23',cat:'Accommodation', amt:355, merch:'Marriott KL'},
  {id:'CL022',eid:'EMP003',name:'Rajesh Kumar',   dateStr:'2026-09-29',cat:'Meals',         amt:65,  merch:'Nasi Kandar Pelita'},
  {id:'CL023',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-01',cat:'Meals',         amt:90,  merch:'TGI Fridays'},
  {id:'CL024',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-04',cat:'Transport',     amt:140, merch:'Grab'},
  {id:'CL025',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-14',cat:'Office Supplies',amt:275,merch:'MPH Bookstores'},
  {id:'CL026',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-24',cat:'Entertainment', amt:460, merch:'Berjaya Times Square Hotel'},
  {id:'CL027',eid:'EMP004',name:'Michelle Tan',   dateStr:'2026-09-30',cat:'Meals',         amt:78,  merch:'Village Park Restaurant'},
  {id:'CL028',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-03',cat:'Transport',     amt:125, merch:'Grab'},
  {id:'CL029',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-18',cat:'Accommodation', amt:390, merch:'Marriott KL'},
  {id:'CL030',eid:'EMP005',name:'Hafiz Zulkifli', dateStr:'2026-09-25',cat:'Office Supplies',amt:240,merch:"Lotus's"},
];

const LIMITS = { Meals:100, Travel:1500, Accommodation:400, Transport:150, 'Office Supplies':300, Entertainment:500 };
const THRESHOLD = 500;
const PUBLIC_HOLIDAYS = new Set(['2026-01-01','2026-05-01','2026-08-31','2026-09-16','2026-12-25']);
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const rows = claims.map(r => ({...r, date: new Date(r.dateStr)}));

const flags = {};
function addFlag(id, rule, detail) {
  if (!flags[id]) flags[id] = [];
  flags[id].push({rule, detail});
}

// --- RULE 1: DUPLICATE ---
console.log('=== RULE 1: DUPLICATE ===');
console.log('Checking all pairs for same eid + same amt + same merch + date diff <= 3 days');
let dupeFound = false;
for (let i = 0; i < rows.length; i++) {
  for (let j = i+1; j < rows.length; j++) {
    const a = rows[i], b = rows[j];
    if (a.eid === b.eid && a.amt === b.amt && a.merch === b.merch) {
      const diffDays = Math.abs(b.date - a.date) / 86400000;
      const later = b.date >= a.date ? b : a;
      const earlier = b.date >= a.date ? a : b;
      if (diffDays <= 3) {
        console.log('  >>> DUPLICATE: '+later.id+' (later, '+later.dateStr+') flags as dupe of '+earlier.id+' ('+earlier.dateStr+') | eid='+a.eid+' amt='+a.amt+' merch='+a.merch+' diff='+diffDays+'d');
        addFlag(later.id, 'DUPLICATE', 'vs '+earlier.id);
        dupeFound = true;
      } else {
        console.log('  SAME KEY but '+diffDays+'d apart (>3d, no flag): '+a.id+' vs '+b.id);
      }
    }
  }
}
if (!dupeFound) console.log('  (none found beyond above)');

// --- RULE 2: OVER_LIMIT ---
console.log('\n=== RULE 2: OVER_LIMIT ===');
for (const r of rows) {
  const limit = LIMITS[r.cat];
  if (r.amt > limit) {
    console.log('  >>> OVER_LIMIT: '+r.id+' | '+r.cat+' amt='+r.amt+' limit='+limit+' (over by '+(r.amt-limit)+')');
    addFlag(r.id, 'OVER_LIMIT', r.cat+' '+r.amt+' > '+limit);
  } else {
    console.log('  OK: '+r.id+' | '+r.cat+' amt='+r.amt+' <= '+limit);
  }
}

// --- RULE 3: WEEKEND_HOLIDAY ---
console.log('\n=== RULE 3: WEEKEND_HOLIDAY ===');
for (const r of rows) {
  const dow = r.date.getUTCDay(); // 0=Sun, 6=Sat  (UTC avoids TZ shift)
  const isWeekend = (dow === 0 || dow === 6);
  const isHoliday = PUBLIC_HOLIDAYS.has(r.dateStr);
  if (isWeekend || isHoliday) {
    const reasons = [];
    if (isWeekend) reasons.push(DAY_NAMES[dow]);
    if (isHoliday) reasons.push('Public Holiday');
    console.log('  >>> WEEKEND_HOLIDAY: '+r.id+' | '+r.dateStr+' ('+DAY_NAMES[dow]+', dow='+dow+') | '+reasons.join(' + '));
    addFlag(r.id, 'WEEKEND_HOLIDAY', reasons.join(' + '));
  } else {
    console.log('  OK: '+r.id+' | '+r.dateStr+' ('+DAY_NAMES[dow]+')');
  }
}

// --- RULE 4: SPLIT_CLAIM ---
console.log('\n=== RULE 4: SPLIT_CLAIM ===');
const groups = {};
for (const r of rows) {
  const key = r.eid+'|'+r.dateStr;
  if (!groups[key]) groups[key] = [];
  groups[key].push(r);
}
for (const [key, group] of Object.entries(groups).sort()) {
  if (group.length < 2) { continue; }
  const below = group.filter(r => r.amt < THRESHOLD);
  const combined = below.reduce((s,r) => s+r.amt, 0);
  const allInfo = group.map(r => r.id+'='+r.amt).join(', ');
  const belowInfo = below.map(r => r.id+'='+r.amt).join(', ');
  console.log('  Group ['+key+']: ['+allInfo+']');
  console.log('    Below-threshold (<'+THRESHOLD+'): ['+belowInfo+'] combined='+combined);
  if (below.length >= 2 && combined >= THRESHOLD) {
    console.log('    >>> SPLIT_CLAIM: '+below.map(r=>r.id).join(', ')+' | combined='+combined+' >= '+THRESHOLD);
    for (const r of below) addFlag(r.id, 'SPLIT_CLAIM', 'group combined='+combined);
  } else {
    console.log('    No split: count='+below.length+', combined='+combined);
  }
}

// --- SUMMARY ---
console.log('\n============================================================');
console.log('FINAL AUDIT FLAGS SUMMARY (30 rows)');
console.log('============================================================');
let totalFlags = 0;
for (const r of rows) {
  if (flags[r.id] && flags[r.id].length > 0) {
    for (const {rule, detail} of flags[r.id]) {
      console.log('  FLAGGED  '+r.id+' | '+r.eid+' | '+r.name.padEnd(16)+' | '+r.dateStr+' | '+r.cat.padEnd(15)+' | '+String(r.amt).padStart(6)+' MYR | '+rule+' | '+detail);
      totalFlags++;
    }
  } else {
    console.log('  clean    '+r.id+' | '+r.eid+' | '+r.name.padEnd(16)+' | '+r.dateStr+' | '+r.cat.padEnd(15)+' | '+String(r.amt).padStart(6)+' MYR');
  }
}
console.log('------------------------------------------------------------');
console.log('Total flags: '+totalFlags);
