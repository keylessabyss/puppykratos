(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const p=[{id:"indian-chieftain-starter-relay",label:"Chieftain · starter relay",vehicle:{year:2022,manufacturer:"Indian",model:"Chieftain",engine:"Thunderstroke 116"},request:"starter relay wiring diagram",intent:"starting-system-wiring",results:[{id:"fixture-chieftain-starter-relay",title:"Starter relay wiring overview",description:"A development example showing how a vehicle-specific starter-relay request could be presented with provenance and applicability metadata.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Chieftain",engine:"Thunderstroke 116"},resultType:"wiring diagram",applicability:"exact",confidence:"high",isDevelopmentFixture:!0}]},{id:"indian-challenger-charging-system",label:"Challenger · charging system",vehicle:{year:2022,manufacturer:"Indian",model:"Challenger",engine:"PowerPlus 108"},request:"charging system diagram",intent:"charging-system-wiring",results:[{id:"fixture-challenger-charging-system",title:"Charging system diagram",description:"A development example for tracing the major charging-system relationships on the selected motorcycle.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Challenger",engine:"PowerPlus 108"},resultType:"system diagram",applicability:"possible",confidence:"high",isDevelopmentFixture:!0}]},{id:"indian-scout-fuse-box",label:"Scout · fuse box location",vehicle:{year:2022,manufacturer:"Indian",model:"Scout",engine:"1133 cc V-twin"},request:"fuse box location",intent:"fuse-component-location",results:[{id:"fixture-scout-fuse-box",title:"Fuse box location reference",description:"A development example for returning a component-location result without implying that the fixture is a verified service source.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Scout",engine:"1133 cc V-twin"},resultType:"component location",applicability:"exact",confidence:"medium",isDevelopmentFixture:!0}]}];function y(e){var n;const t=(n=e.engine)!=null&&n.trim()?` · ${e.engine.trim()}`:"";return`${e.year} ${e.manufacturer} ${e.model}${t}`}function d(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function g(e){return e.charAt(0).toUpperCase()+e.slice(1)}function v(e,t){if(t.length===0){e.innerHTML=`
      <div class="empty-state empty-state--no-results">
        <span class="empty-icon" aria-hidden="true">⌁</span>
        <h3>No development fixture matched.</h3>
        <p>
          v0.1 only searches its local development scenarios. Try one of the
          quick-start fixtures or adjust the motorcycle context and request.
        </p>
      </div>
    `;return}e.innerHTML=t.map(n=>`
    <article class="result-card">
      <div class="result-card-header">
        <span class="result-type">${d(n.resultType)}</span>
        ${n.isDevelopmentFixture?'<span class="fixture-warning">Development fixture</span>':""}
      </div>
      <h3>${d(n.title)}</h3>
      <p class="result-description">${d(n.description)}</p>
      <dl class="result-metadata">
        <div>
          <dt>Applicability</dt>
          <dd><span class="status-pill status-pill--${n.applicability}">${g(n.applicability)}</span></dd>
        </div>
        <div>
          <dt>Search confidence</dt>
          <dd><span class="confidence-value">${g(n.confidence)}</span></dd>
        </div>
        <div>
          <dt>Vehicle context</dt>
          <dd>${d(y(n.vehicle))}</dd>
        </div>
      </dl>
      <div class="provenance-warning">
        <strong>DEVELOPMENT FIXTURE — NOT VERIFIED REPAIR INFORMATION</strong>
        <span>${n.sourceUrl?`Source: <a href="${d(n.sourceUrl)}">${d(n.sourceName)}</a>`:"No live source attached."}</span>
      </div>
    </article>
  `).join("")}function m(e){return e.trim().toLowerCase()}function x(e,t){return e.year===t.year&&m(e.manufacturer)===m(t.manufacturer)&&m(e.model)===m(t.model)}class w{async search(t){if(!t.query.normalizedText)return[];const n=p.find(o=>x(t.vehicle,o.vehicle)&&o.intent===t.query.intent);if(!n)return[];const s=m(t.vehicle.engine??""),i=m(n.vehicle.engine??""),r=!!s&&s===i;return n.results.map(o=>({...o,applicability:r?o.applicability:"possible"}))}}const b=[{intent:"starting-system-wiring",normalizedText:"starting system wiring diagram",aliases:["starter diagram","starter wiring","starter relay diagram","starter relay wiring","starter relay wiring diagram","starting circuit"]},{intent:"charging-system-wiring",normalizedText:"charging system wiring diagram",aliases:["charging diagram","charging system diagram","charging wiring","stator wiring"]},{intent:"fuse-component-location",normalizedText:"fuse box component location",aliases:["fuse box","fuse box location","fuse location"]}];function T(e){return e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").replace(/\s+/g," ").trim()}function q(e){return b.find(t=>t.aliases.includes(e))}function C(e){const t=e.trim(),n=T(e);if(!n)return{originalRequest:"",normalizedText:"",intent:"unknown"};const s=q(n);return s?{originalRequest:t,normalizedText:s.normalizedText,intent:s.intent}:{originalRequest:t,normalizedText:n,intent:"unknown"}}function a(e){const t=document.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function $(){const e=Number(a("#vehicle-year").value),t=a("#vehicle-manufacturer").value.trim(),n=a("#vehicle-model").value.trim(),s=a("#vehicle-engine").value.trim();return{year:e,manufacturer:t,model:n,...s?{engine:s}:{}}}function N(e){const t=p.find(n=>n.id===e);t&&(a("#vehicle-year").value=String(t.vehicle.year),a("#vehicle-manufacturer").value=t.vehicle.manufacturer,a("#vehicle-model").value=t.vehicle.model,a("#vehicle-engine").value=t.vehicle.engine??"",a("#technical-request").value=t.request,a("#search-form").requestSubmit())}function A(){const e=new w,t=a("#search-form"),n=a("#results-list"),s=a("#results-title"),i=a("#result-count"),r=a("#form-status"),o=a("#fixture-buttons");o.innerHTML=p.map(u=>`
    <button class="fixture-button" type="button" data-fixture-id="${u.id}">
      <span>${u.label}</span>
      <span aria-hidden="true">↗</span>
    </button>
  `).join(""),o.addEventListener("click",u=>{const l=u.target;if(!(l instanceof Element))return;const c=l.closest("[data-fixture-id]");c!=null&&c.dataset.fixtureId&&N(c.dataset.fixtureId)}),t.addEventListener("submit",async u=>{u.preventDefault(),r.textContent="";const l=$(),c=a("#technical-request").value.trim();if(!l.year||!l.manufacturer||!l.model||!c){r.textContent="Enter the year, manufacturer, model, and a technical request.";return}const h={vehicle:l,query:C(c)};s.textContent="Searching development fixtures…",i.textContent="Working",r.textContent="Checking local development fixtures.";const f=await e.search(h);v(n,f),s.textContent=f.length>0?"Development results":"No matching fixture",i.textContent=`${f.length} result${f.length===1?"":"s"}`,r.textContent=f.length>0?"Development fixture results loaded.":"No local fixture matched this vehicle and request."})}A();
