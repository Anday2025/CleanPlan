import test from 'node:test';
import assert from 'node:assert/strict';
import {appFunction} from '../support/app-function.mjs';
// Supabase responses are simulated here: these are NOT login/API integration tests.
const PROFILE_ID='00000000-0000-4000-8000-000000000001';
function fixture(profile,error=null){
 let signedOut=0;const messages=[];const window={location:{href:''}};
 const client={from:()=>({select:()=>({eq:()=>({single:async()=>({data:profile,error})})})}),auth:{signOut:async()=>signedOut++}};
 const run=appFunction('js/auth.js','redirectByRole',{supabaseClient:client,window,showMessage:(message,type)=>messages.push({message,type}),console:{error:()=>{}}});
 return {run,window,messages,signedOut:()=>signedOut};
}
test('actual redirect JS with simulated profile: active roles route correctly',async()=>{
 for(const [role,url] of [['admin','admin.html'],['superadmin','admin.html'],['resident','resident.html']]){const f=fixture({id:PROFILE_ID,role,is_active:true});await f.run(PROFILE_ID);assert.equal(f.window.location.href,url);assert.equal(f.signedOut(),0)}
});
test('actual redirect JS with simulated profile: inactive, missing and unknown roles rejected',async()=>{
 for(const profile of [null,{id:PROFILE_ID,role:'admin',is_active:false},{id:PROFILE_ID,role:'unknown',is_active:true}]){const f=fixture(profile);await f.run(PROFILE_ID);assert.equal(f.window.location.href,'');assert.equal(f.signedOut(),1);assert.equal(f.messages[0].type,'error')}
});
test('actual redirect JS with simulated profile: missing or mismatched profile ID is rejected',async()=>{
 for(const profile of [{role:'admin',is_active:true},{id:'00000000-0000-4000-8000-000000000002',role:'admin',is_active:true}]){
  const f=fixture(profile);await f.run(PROFILE_ID);
  assert.equal(f.window.location.href,'');assert.equal(f.signedOut(),1);
  assert.equal(f.messages[0].message,'Ugyldig svarformat for brukerprofilen. Tilgang er avvist.');
  assert.equal(f.messages[0].type,'error');
 }
});
