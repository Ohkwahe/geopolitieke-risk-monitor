/** Validate feed contract before committing and publishing. Node standard library only. */
import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('data/auto-news.json','utf8'));
if(d.type!=='automated_headline_feed'||!Array.isArray(d.signals)||!Array.isArray(d.history)) throw Error('Nieuwsbestand mist vereiste lijsten');
if(!Number.isFinite(Date.parse(d.generatedAt))||d.sourcesOk<1||d.sourcesOk>d.sourcesTotal) throw Error('Ontbrekende/onjuiste controledatum of bronstatus');
const ids=new Set();
if(d.schemaVersion!=='3.0.0')throw Error('Verkeerde feed-versie: verwacht 3.0.0');
for(const s of d.signals){
 if(!s.id||ids.has(s.id)||!s.title||!Number.isFinite(Date.parse(s.date))) throw Error('Ongeldige/gedupliceerde signal-ID');
 ids.add(s.id);
 if(!['new','updated','related','unchanged'].includes(s.lastActivity)||s.reviewStatus!=='unverified')throw Error('Activiteits- of verificatiestatus ongeldig');
 if(s.verified!==false||s.method!=='rule_based_screening') throw Error('Automatisch nieuws mag niet als geverifieerd worden gepubliceerd');
 if(!s.sourceAudit||s.sourceAudit.verified!==false||!['primary_statement','similar_reporting','single_report'].includes(s.sourceAudit.state)||!Array.isArray(s.sourceAudit.sourceNames)||!s.sourceAudit.sourceNames.length)throw Error('Bronspoor ontbreekt of claimt onafhankelijke verificatie');
 if(!['important','review','below'].includes(s.category)||!Number.isInteger(s.total)||s.total>14||s.total<0) throw Error('Ongeldige risicoscreening');
}
for(const s of d.signals) if(s.duplicateOf&&!ids.has(s.duplicateOf))throw Error('Dubbel bericht zonder referentie');
console.log(`Feed OK: ${d.signals.length} headlines, ${d.sourcesOk}/${d.sourcesTotal} feeds, ${d.quality?.groupedSimilarItems||0} gegroepeerd.`);

if(!d.briefing||d.briefing.verified!==false||d.briefing.kind!=='headline_selection_unverified')throw Error('Briefing ontbreekt of is verkeerd geclassificeerd');
for(const item of d.signals){if(item.aiAnalysis&&(item.aiAnalysis.verified!==false||item.aiAnalysis.status!=='model_summary'))throw Error('AI-duiding mag geen bevestigde feiten claimen');}
