(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const f=[{id:"indian-chieftain-starter-relay",label:"Chieftain · starter relay",vehicle:{year:2022,manufacturer:"Indian",model:"Chieftain",engine:"Thunderstroke 116"},request:"starter relay wiring diagram",results:[{id:"fixture-chieftain-starter-relay",title:"Starter relay wiring overview",description:"A development example showing how a vehicle-specific starter-relay request could be presented with provenance and applicability metadata.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Chieftain",engine:"Thunderstroke 116"},resultType:"wiring diagram",applicability:"exact",confidence:"high",isDevelopmentFixture:!0}]},{id:"indian-challenger-charging-system",label:"Challenger · charging system",vehicle:{year:2022,manufacturer:"Indian",model:"Challenger",engine:"PowerPlus 108"},request:"charging system diagram",results:[{id:"fixture-challenger-charging-system",title:"Charging system diagram",description:"A development example for tracing the major charging-system relationships on the selected motorcycle.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Challenger",engine:"PowerPlus 108"},resultType:"system diagram",applicability:"possible",confidence:"high",isDevelopmentFixture:!0}]},{id:"indian-scout-fuse-box",label:"Scout · fuse box location",vehicle:{year:2022,manufacturer:"Indian",model:"Scout",engine:"1133 cc V-twin"},request:"fuse box location",results:[{id:"fixture-scout-fuse-box",title:"Fuse box location reference",description:"A development example for returning a component-location result without implying that the fixture is a verified service source.",sourceName:"Development fixture",vehicle:{year:2022,manufacturer:"Indian",model:"Scout",engine:"1133 cc V-twin"},resultType:"component location",applicability:"exact",confidence:"medium",isDevelopmentFixture:!0}]}];function v(e){var n;const t=(n=e.engine)!=null&&n.trim()?` · ${e.engine.trim()}`:"";return`${e.year} ${e.manufacturer} ${e.model}${t}`}function m(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function h(e){return e.charAt(0).toUpperCase()+e.slice(1)}function y(e,t){if(t.length===0){e.innerHTML=`
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
        <span class="result-type">${m(n.resultType)}</span>
        ${n.isDevelopmentFixture?'<span class="fixture-warning">Development fixture</span>':""}
      </div>
      <h3>${m(n.title)}</h3>
      <p class="result-description">${m(n.description)}</p>
      <dl class="result-metadata">
        <div>
          <dt>Applicability</dt>
          <dd><span class="status-pill status-pill--${n.applicability}">${h(n.applicability)}</span></dd>
        </div>
        <div>
          <dt>Search confidence</dt>
          <dd><span class="confidence-value">${h(n.confidence)}</span></dd>
        </div>
        <div>
          <dt>Vehicle context</dt>
          <dd>${m(v(n.vehicle))}</dd>
        </div>
      </dl>
      <div class="provenance-warning">
        <strong>DEVELOPMENT FIXTURE — NOT VERIFIED REPAIR INFORMATION</strong>
        <span>${n.sourceUrl?`Source: <a href="${m(n.sourceUrl)}">${m(n.sourceName)}</a>`:"No live source attached."}</span>
      </div>
    </article>
  `).join("")}function o(e){return e.trim().toLowerCase()}function x(e,t){return e.year===t.year&&o(e.manufacturer)===o(t.manufacturer)&&o(e.model)===o(t.model)}function b(e,t){const n=o(e).split(/\s+/).filter(Boolean),c=new Set(o(t).split(/\s+/));return n.filter(r=>c.has(r)).length}class w{async search(t){const n=f.filter(a=>x(t.vehicle,a.vehicle)).map(a=>({scenario:a,matchingTerms:b(t.query,a.request)})).filter(({matchingTerms:a})=>a>0).sort((a,l)=>l.matchingTerms-a.matchingTerms)[0];if(!n)return[];const c=o(t.vehicle.engine??""),r=o(n.scenario.vehicle.engine??""),i=!!c&&c===r;return n.scenario.results.map(a=>({...a,applicability:i?a.applicability:"possible"}))}}function s(e){const t=document.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function C(){const e=Number(s("#vehicle-year").value),t=s("#vehicle-manufacturer").value.trim(),n=s("#vehicle-model").value.trim(),c=s("#vehicle-engine").value.trim();return{year:e,manufacturer:t,model:n,...c?{engine:c}:{}}}function T(e){const t=f.find(n=>n.id===e);t&&(s("#vehicle-year").value=String(t.vehicle.year),s("#vehicle-manufacturer").value=t.vehicle.manufacturer,s("#vehicle-model").value=t.vehicle.model,s("#vehicle-engine").value=t.vehicle.engine??"",s("#technical-request").value=t.request,s("#search-form").requestSubmit())}function $(){const e=new w,t=s("#search-form"),n=s("#results-list"),c=s("#results-title"),r=s("#result-count"),i=s("#form-status"),a=s("#fixture-buttons");a.innerHTML=f.map(l=>`
    <button class="fixture-button" type="button" data-fixture-id="${l.id}">
      <span>${l.label}</span>
      <span aria-hidden="true">↗</span>
    </button>
  `).join(""),a.addEventListener("click",l=>{const u=l.target;if(!(u instanceof Element))return;const d=u.closest("[data-fixture-id]");d!=null&&d.dataset.fixtureId&&T(d.dataset.fixtureId)}),t.addEventListener("submit",async l=>{l.preventDefault(),i.textContent="";const u=C(),d=s("#technical-request").value.trim(),g={vehicle:u,query:d};if(!u.year||!u.manufacturer||!u.model||!d){i.textContent="Enter the year, manufacturer, model, and a technical request.";return}c.textContent="Searching development fixtures…",r.textContent="Working",i.textContent="Checking local development fixtures.";const p=await e.search(g);y(n,p),c.textContent=p.length>0?"Development results":"No matching fixture",r.textContent=`${p.length} result${p.length===1?"":"s"}`,i.textContent=p.length>0?"Development fixture results loaded.":"No local fixture matched this vehicle and request."})}$();
