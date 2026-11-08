# Lokal publiseringsplan – 2026-11-07

Planen beskriver inventaret før første publiseringscommit. Listen er en gjennomgangsplan, ikke godkjenning til å publisere alle filer. Push krever separat godkjenning.

## Repository og bevaring

GitHub-repository: `Anday2025/CleanPlan` (offentlig). Gammel URL `Anday2025/cleaning-app` peker til samme repository-ID 1352251103. Lokal HEAD og remote main var begge `71c053e96a2638e6fe0dcbb7219c5150f0850ea0`. Tilkoblet konto har push-rettighet. Origin er oppdatert; branch er `codex/launch-foundation-onboarding`. Ingen historikk er overskrevet.

## Første commit – klar for godkjenning

- `.gitignore`
- `PUBLICATION-PLAN.md`

Kun publiseringshygiene og denne planen. Ikke bruk `git add .`. Etter godkjenning skal kun eksplisitte filstier stages, deretter skal staged diff og hemmelighetsskanning kontrolleres på nytt.

## Kandidater for senere funksjonsvise commits

Følgende eksplisitte filsett er inventert. De er ikke endelig publiseringsgodkjent: avhengigheter til hold-listen og testfeilen må avklares før staging.

### Frontend, moduler og stilark

- `area-cleaning.html`
- `area-documentation.html`
- `area-housing.html`
- `css/index.css`
- `css/onboarding.css`
- `css/users.css`
- `index.html`
- `js/area-access.js`
- `js/area-cleaning.js`
- `js/area-documentation.js`
- `js/area-housing.js`
- `js/auth-return.js`
- `js/auth.js`
- `js/camera-capture.js`
- `js/cleaning-time.js`
- `js/config.js`
- `js/language.js`
- `js/onboarding.js`
- `js/password-return.js`
- `js/profile-onboarding.js`
- `js/reset-password.js`
- `js/users.js`
- `onboarding.html`
- `package.json`
- `reset-password.html`

### Edge-kilde (ingen deploy)

- `supabase/functions/admin-create-user/index.ts`
- `supabase/functions/admin-create-user/redirect-policy.mjs`

### Tester og eksisterende backend-pakker

- `tests/README.md`
- `tests/backend/CUSTOMER-ACCESS-MATRIX.md`
- `tests/backend/foundation-package/README.md`
- `tests/backend/housing-package/README.md`
- `tests/backend/identity-package/migration.sql`
- `tests/backend/new-user-package/migration.sql`
- `tests/backend/photo-operations.sql`
- `tests/backend/photo-package/README.md`
- `tests/backend/profile-package/migration.sql`
- `tests/browser/backend/contracts.mjs`
- `tests/browser/backend/diagnostics.mjs`
- `tests/browser/backend/run.mjs`
- `tests/browser/backend/suite.mjs`
- `tests/browser/cleaning-backend/README.md`
- `tests/browser/cleaning-backend/action-diagnostics.mjs`
- `tests/browser/cleaning-backend/cleanup.mjs`
- `tests/browser/cleaning-backend/contracts.mjs`
- `tests/browser/cleaning-backend/run.mjs`
- `tests/browser/cleaning-backend/suite.mjs`
- `tests/browser/cleaning/flows.test.mjs`
- `tests/browser/email/before.mjs`
- `tests/browser/email/contracts.mjs`
- `tests/browser/email/failure-notice.mjs`
- `tests/browser/email/run.mjs`
- `tests/browser/flows.test.mjs`
- `tests/browser/housing-backend/README.md`
- `tests/browser/housing-backend/contracts.mjs`
- `tests/browser/housing-backend/preflight.mjs`
- `tests/browser/housing-backend/run.mjs`
- `tests/browser/housing-backend/suite.mjs`
- `tests/browser/housing/README.md`
- `tests/browser/housing/flows.test.mjs`
- `tests/browser/onboarding/README.md`
- `tests/browser/onboarding/flows.test.mjs`
- `tests/browser/onboarding/mock-sdk.js`
- `tests/browser/onboarding/playwright-loader.mjs`
- `tests/browser/onboarding/server.mjs`
- `tests/browser/photo-backend/MOBILE.md`
- `tests/browser/photo-backend/README.md`
- `tests/browser/photo-backend/attempt.mjs`
- `tests/browser/photo-backend/contracts.mjs`
- `tests/browser/photo-backend/database-prechecks.mjs`
- `tests/browser/photo-backend/evidence.mjs`
- `tests/browser/photo-backend/fixture-diagnostics.mjs`
- `tests/browser/photo-backend/integrity.mjs`
- `tests/browser/photo-backend/manifest-paths.json`
- `tests/browser/photo-backend/mobile.mjs`
- `tests/browser/photo-backend/run.mjs`
- `tests/browser/photo-backend/sdk-lock.json`
- `tests/browser/photo-backend/suite.mjs`
- `tests/browser/photo-backend/vendor/LICENSE.supabase`
- `tests/browser/photo-backend/vendor/supabase-2.49.8.js`
- `tests/browser/photo-backend/verification.mjs`
- `tests/browser/photo/flows.test.mjs`
- `tests/browser/photo/integrity.test.mjs`
- `tests/fixtures/admin-create-user-v10.txt`
- `tests/integration/auth-return/README.md`
- `tests/integration/auth-return/isolation.test.mjs`
- `tests/integration/auth-return/login.html`
- `tests/integration/auth-return/server.mjs`
- `tests/integration/cleaning/README.md`
- `tests/integration/cleaning/api-ready.mjs`
- `tests/integration/cleaning/before-image.mjs`
- `tests/integration/cleaning/run-cleaning.mjs`
- `tests/integration/cleaning/schedule-suite.mjs`
- `tests/integration/cleaning/suite.mjs`
- `tests/integration/foundation/REGRESSION.md`
- `tests/integration/foundation/read-status.mjs`
- `tests/integration/foundation/run-foundation.mjs`
- `tests/integration/foundation/suite.mjs`
- `tests/integration/housing/before-image.mjs`
- `tests/integration/housing/cleanup-report.mjs`
- `tests/integration/housing/cleanup.mjs`
- `tests/integration/housing/legacy-read.mjs`
- `tests/integration/housing/resume-cleanup.mjs`
- `tests/integration/housing/run-housing.mjs`
- `tests/integration/housing/suite.mjs`
- `tests/integration/identity/README.md`
- `tests/integration/identity/package.mjs`
- `tests/integration/identity/run-identity.mjs`
- `tests/integration/identity/suite.mjs`
- `tests/integration/invited-flow/README.md`
- `tests/integration/invited-flow/run-invited-flow.mjs`
- `tests/integration/new-user/README.md`
- `tests/integration/new-user/confirmation.mjs`
- `tests/integration/new-user/package.mjs`
- `tests/integration/new-user/preflight-diagnostics.mjs`
- `tests/integration/new-user/run-new-user.mjs`
- `tests/integration/new-user/suite.mjs`
- `tests/integration/onboarding/README.md`
- `tests/integration/onboarding/run-onboarding.mjs`
- `tests/integration/onboarding/suite.mjs`
- `tests/integration/photo-suite.mjs`
- `tests/integration/photo/adapter.mjs`
- `tests/integration/photo/batch-signing.mjs`
- `tests/integration/photo/cleanup.mjs`
- `tests/integration/photo/edge/README.md`
- `tests/integration/photo/edge/cleanup-edge.mjs`
- `tests/integration/photo/edge/diagnose.mjs`
- `tests/integration/photo/edge/lifecycle.mjs`
- `tests/integration/photo/edge/photo-receipt.mjs`
- `tests/integration/photo/edge/source.mjs`
- `tests/integration/photo/hidden-prompt.mjs`
- `tests/integration/photo/image-handler.mjs`
- `tests/integration/photo/image-response.mjs`
- `tests/integration/photo/inflight/README.md`
- `tests/integration/photo/inflight/periodic.mjs`
- `tests/integration/photo/inflight/scheduler.mjs`
- `tests/integration/photo/inflight/slow-upload.mjs`
- `tests/integration/photo/route-diagnostics.mjs`
- `tests/integration/photo/transport.mjs`
- `tests/integration/preflight.mjs`
- `tests/integration/profile/package.mjs`
- `tests/integration/profile/run-profile.mjs`
- `tests/integration/profile/suite.mjs`
- `tests/integration/scenarios.test.mjs`
- `tests/integration/self-registration/README.md`
- `tests/integration/self-registration/local-callback.mjs`
- `tests/integration/self-registration/login-diagnostics.mjs`
- `tests/integration/self-registration/read-auth-settings.mjs`
- `tests/integration/shared-photo/README.md`
- `tests/integration/shared-photo/SCHEDULER.md`
- `tests/integration/shared-photo/adapter.mjs`
- `tests/integration/shared-photo/api-ready.mjs`
- `tests/integration/shared-photo/before-image.mjs`
- `tests/integration/shared-photo/run-shared-photo.mjs`
- `tests/integration/shared-photo/scheduler.mjs`
- `tests/password-return.test.mjs`
- `tests/support/api-diagnostics.mjs`
- `tests/support/app-function.mjs`
- `tests/support/check-syntax.mjs`
- `tests/support/concurrency.mjs`
- `tests/support/reporter.mjs`
- `tests/support/run-artifacts.mjs`
- `tests/support/sql-diagnostics.mjs`
- `tests/support/target.mjs`
- `tests/unit/area-cleaning.test.mjs`
- `tests/unit/attempt-journal.test.mjs`
- `tests/unit/auth-settings.test.mjs`
- `tests/unit/auth.test.mjs`
- `tests/unit/browser-backend-diagnostics.test.mjs`
- `tests/unit/browser-backend.test.mjs`
- `tests/unit/browser-email-failure.test.mjs`
- `tests/unit/browser-email.test.mjs`
- `tests/unit/cleaning-action-diagnostics.test.mjs`
- `tests/unit/cleaning-package.test.mjs`
- `tests/unit/cleaning-schedule.test.mjs`
- `tests/unit/concurrency.test.mjs`
- `tests/unit/customer-access-matrix.test.mjs`
- `tests/unit/foundation.test.mjs`
- `tests/unit/housing-browser-backend.test.mjs`
- `tests/unit/housing-cleanup-report.test.mjs`
- `tests/unit/housing-package-order.test.mjs`
- `tests/unit/housing-preflight.test.mjs`
- `tests/unit/housing.test.mjs`
- `tests/unit/identity.test.mjs`
- `tests/unit/local-callback.test.mjs`
- `tests/unit/login-diagnostics.test.mjs`
- `tests/unit/mobile-integrity.test.mjs`
- `tests/unit/mobile-login-regression.test.mjs`
- `tests/unit/mobile-runner.test.mjs`
- `tests/unit/new-user.test.mjs`
- `tests/unit/onboarding-server.test.mjs`
- `tests/unit/onboarding.test.mjs`
- `tests/unit/photo-batch-signing.test.mjs`
- `tests/unit/photo-browser.test.mjs`
- `tests/unit/photo-cleanup.test.mjs`
- `tests/unit/photo-contract.test.mjs`
- `tests/unit/photo-edge.test.mjs`
- `tests/unit/photo-fixture-diagnostics.test.mjs`
- `tests/unit/photo-periodic.test.mjs`
- `tests/unit/photo-response.test.mjs`
- `tests/unit/photo-route-diagnostics.test.mjs`
- `tests/unit/photo-runner.test.mjs`
- `tests/unit/photo-sql-result.test.mjs`
- `tests/unit/photo-verification.test.mjs`
- `tests/unit/preflight-diagnostics.test.mjs`
- `tests/unit/profile-package.test.mjs`
- `tests/unit/reporter.test.mjs`
- `tests/unit/resident.test.mjs`
- `tests/unit/shared-photo.test.mjs`
- `tests/unit/shared-scheduler.test.mjs`
- `tests/unit/signed-history-regression.test.mjs`
- `tests/unit/target.test.mjs`

### Foundation v2 og lokal PostgreSQL-adapter

- `tests/drafts/foundation-v2/001-schema.draft.sql`
- `tests/drafts/foundation-v2/002-controls.draft.sql`
- `tests/drafts/foundation-v2/POSTGRES-TEST-PLAN.md`
- `tests/drafts/foundation-v2/README.md`
- `tests/drafts/foundation-v2/postgres/NEXT-SECURITY-TESTS.md`
- `tests/drafts/foundation-v2/postgres/README.md`
- `tests/drafts/foundation-v2/postgres/adapter.mjs`
- `tests/drafts/foundation-v2/postgres/adapter.test.mjs`
- `tests/drafts/foundation-v2/postgres/concurrency-plan.mjs`
- `tests/drafts/foundation-v2/postgres/prepare.mjs`
- `tests/drafts/foundation-v2/postgres/rollback-script.mjs`
- `tests/drafts/foundation-v2/postgres/rollback-script.test.mjs`
- `tests/drafts/foundation-v2/postgres/security-scenarios.mjs`
- `tests/drafts/foundation-v2/postgres/security-scenarios.test.mjs`
- `tests/drafts/foundation-v2/postgres/source-lock.json`
- `tests/drafts/foundation-v2/postgres/synthetic.mjs`
- `tests/drafts/foundation-v2/static.test.mjs`

## Gjennomgang av de 19 tilbakeholdte filene – 2026-11-08

**5 kan publiseres etter innholdskontrollen; 14 er fortsatt HOLD.** Dette er ikke commit-/push- eller backend-godkjenning. Avhengigheter må fortsatt behandles samlet.

| Fil | Status | Vurdering |
| --- | --- | --- |
| `tests/backend/cleaning-package/migration.sql` | HOLD | Beskyttet konto-ID og syntetisk example.com-adresse inngår i oppstartssperren. |
| `tests/backend/current-photo-dependencies.json` | KAN PUBLISERES | Kun skjemametadata: 289 grants, 101 kolonner, 43 policies, 5 triggere, 23 funksjoner og 63 constraints. Ingen brukerdata, e-post, konto-ID eller legitimasjon. PostgreSQL-versjon og standardroller er tekniske miljøopplysninger. Uendret. |
| `tests/backend/foundation-package/migration.sql` | HOLD | Beskyttet konto-ID brukes både i oppstartssperre og protected_identities-register. |
| `tests/backend/housing-package/migration.sql` | HOLD | Beskyttet konto-ID inngår i førkontroll; ikke bare eksempeldata. |
| `tests/backend/observed-schema.json` | KAN PUBLISERES | Kolonne-/funksjonsdefinisjoner og ikke-hemmelig testprosjektreferanse; ingen brukerdata eller legitimasjon. Uendret. |
| `tests/backend/photo-package/migration.sql` | HOLD | Beskyttet konto-ID brukes både i oppstartssperre og tilgangsfunksjon. |
| `tests/backend/shared-photo-package/migration.sql` | HOLD | Beskyttet konto-ID inngår i oppstartssperren. |
| `tests/browser/backend/README.md` | KAN PUBLISERES | Privat innboks i dokumentasjonen erstattet med generell henvisning til løperens kontrollerte mottaker. Ingen kjøreendring. |
| `tests/browser/email/README.md` | KAN PUBLISERES | Privat innboks fjernet fra dokumentasjonsteksten; opprinnelige sikkerhetskrav beholdt. |
| `tests/drafts/foundation-v2/postgres/prepare.test.mjs` | HOLD | Negativ test krever at konkret beskyttet UUID ikke kommer inn i syntetisk SQL. Vilkårlig erstatning ville svekke dette beviset. |
| `tests/integration/foundation/before-image.mjs` | HOLD | Eksportert beskyttet konto-ID og rollback-sperre må samsvare med eksisterende vern. |
| `tests/integration/invited-flow/contracts.mjs` | HOLD | Privat reell mottaker er bundet til journalmatching; beskyttet UUID inngår i oppryddingsvern. |
| `tests/integration/photo/before-image.mjs` | HOLD | Beskyttet konto-ID brukes til å avvise feil rollback-mål. |
| `tests/integration/photo/run-photo.mjs` | HOLD | Beskyttet konto-ID brukes i preflight og som eksplisitt sperre mot sletting. Tilfeldige example.com-prober er syntetiske. |
| `tests/integration/profile/README.md` | KAN PUBLISERES | Privat innboks erstattet med henvisning til løperkontrakten. Ingen konto-/journalendring. |
| `tests/integration/profile/contracts.mjs` | HOLD | Privat reell mottaker og beskyttet UUID brukes i journal-/eierskapskontroller. |
| `tests/integration/self-registration/run-signup.mjs` | HOLD | Fast privat innboks og konkret eksisterende testkonto-ID styrer signup/login-only. Kan ikke anonymiseres uten endring av kjørevilkår. |
| `tests/unit/invited-flow.test.mjs` | HOLD | Beskyttet UUID brukes i negativ slettetest; andre UUID-er/example.com-adresser er syntetiske. Importerer privat mottakerkontrakt. |
| `tests/unit/sql-diagnostics.test.mjs` | HOLD | Beskyttet UUID brukes som lokal mock-parameter. Token-/passord-/database-URL-strenger er tydelige sladdingssentineler, ikke legitimasjon. UUID er ikke endret. |

### Klassifisering og gjenværende godkjenninger

- De beskyttede e-postadressene i SQL er syntetiske example.com-verdier. Den konkrete UUID-en er likevel en miljøbundet sikkerhetsreferanse. Lokal kode beviser ikke at den er uten personkobling. Ingen beskyttede identiteter er endret.
- Ingen faktiske private nøkler, administrative tokens, passord eller private absolutte filstier ble funnet i de 19 filene. Konkrete mottakere og konto-ID-er er klassifisert over. Dette er ikke en full historikkrevisjon.
- JSON-filene er skjema- og tilgangsdefinisjoner, ikke raduttrekk. De beskriver også eldre globale superadmin-regler. Publiserbar kilde er ikke en sikkerhetsgodkjenning av disse reglene eller en bekreftelse av dagens backend.
- De tre README-endringene skjuler bare privat mottaker i teksten; kjørbare kontrakter med adressen står fortsatt på HOLD. Ingen valgfri mottakerfunksjon er innført.
- Krever godkjenning: publisering av konkrete beskyttede testidentiteter, eller en separat fail-closed konfigurasjonsløsning. Ikke erstatt sikkerhetsreferanser med tilfeldige ID-er.
- Krever godkjenning: samlet parameterisering av faktisk testinnboks og forventet testkonto-ID, med fortsatt eksakt journalmatching, eierskapskontroll og eksplisitt mottakerautorisasjon før sending. Gamle kjøringer må fortsatt kunne ryddes.
- Diagnostikktestens parameteriserte mock-ID kan vurderes erstattet med syntetisk UUID i en separat testendring. Tester som eksplisitt verner den eksisterende identiteten må beholde sitt bevis.
- Ingen hashkontrollerte kjørbare kilder, kildehashlåser, SQL-pakker eller historiske rapporter er endret. Senere endringer krever kontrollert oppdatering av avhengigheter og integritetsbevis.

### Kontroller for denne gjennomgangen

- Målrettede lokale regresjonstester: **47/47 bestått**, ingen feil eller uutførte i denne pakken. Dekker blant annet beskyttet opprydding, journalmatching, SQL-diagnostikk, skjemaavhengigheter og Foundation-kildehashkontroll.
- Begge JSON-filer kan parses og er uendret; alle 19 filer er skannet og klassifisert.
- Kontroll av filhash før/etter: bare de tre README-filene og denne planen er endret i gjennomgangen. Tidligere Auth-testretting er bevart.
- Ingen backend-/database-/Supabase-kjøring. Ingen staging, commit eller push.

## Lokale filer som skal bevares, men ikke publiseres

- Lokale IDE-kjørekonfigurasjoner under `.run/`.
- Kjøringsspesifikke testjournaler under `.run/foundation-v2-rollback/`.
- Lokale integritetsmapper under `.run/`, inkludert evidens, manifest, gjennomgangsrapport og testutskrift.

Hele `.run/`, `.env*`, private nøkkelfiler, lokale databasekopier, test-results, playwright-report og tests/.runtime er ignorert. Ingen filer er slettet. Gitignore beskytter ikke allerede sporede filer; ingen sporede nøkkel-/env-/databasefiler ble funnet. SQL-kildeutkast ignoreres ikke.

## Personopplysninger og hemmeligheter

Konkrete beskyttede identiteter er holdt uendret. Syntetiske nøkler/passord i redaksjonstester er testdata, ikke legitimasjon. Offentlige browserkonfigurasjonsverdier er ikke administrative hemmeligheter. Eksisterende kontaktverdier i index.html og js/language.js krever at eier fortsatt ønsker dem offentlige. De to gjennomgåtte skjemaoversiktene er frigitt som kilde; konkrete kontoidentiteter holdes fortsatt tilbake. Skanning av nåværende kandidater fant ingen bekreftet privat nøkkel eller administrativ token; dette er ikke bevis på fravær av alle hemmeligheter eller en full revisjon av Git-historikken.

## Avhengigheter og commit-rekkefølge

1. Publiseringshygiene: .gitignore og dette dokumentet.
2. Først den avgrensede Auth-gruppen beskrevet nedenfor. Deretter lokalt testrammeverk, kontrakter og pakker etter identitetsgjennomgang. Foundation v2-originaler, kildehashlås og adapter må behandles samlet; ikke regenerer sikkerhetskritiske hasher bare for publisering.
3. Auth/onboarding som samlet endring: index.html, auth.js, config.js, auth-return.js, profile-onboarding.js, onboarding-filer og tilhørende tester. Auth-testfixturen er rettet lokalt med syntetisk profil-ID; rettingen er ikke committet.
4. Passordretur samlet: reset-password.html, js/reset-password.js, js/password-return.js og relaterte tester. HTML laster den nye modulen; wrapperen må ikke publiseres alene.
5. Brukeradministrasjon samlet med css/users.css og tilhørende språkressurser. js/users.js bruker fortsatt Supabase-klienten, profiles og admin-create-user; fjerning av duplisert rendering må ikke forveksles med en selvstendig, backendfri modul.
6. Områder, bolig, renhold, kamera og bildedokumentasjon med alle lokale moduler, sider og regresjonstester. Ingen ny deploy eller backendendring er inkludert i denne planen.

## Tidligere lokale kontrollresultater (før Auth-testrettingen)

- npm test: 250 bestått, 2 feil, 14 NOT_RUN i sandbox.
- Callback-feilen var listen EPERM på 127.0.0.1. Isolert ny kjøring uten sandbox-begrensningen: 2/2 bestått.
- Gjenstående auth.test.mjs: forventet admin.html, fikk tom adresse. Aktiv profilfixture mangler id; eksisterende streng profilvalidering avviser id som ikke samsvarer med brukeren. Ingen Auth-/testkode er rettet i publiseringsoppgaven.
- Foundation v2, adapter og kundekontrakt: 109/109 bestått.
- npm run test:syntax bestod. git diff --check bestod.
- Ingen backend-/Docker-/Supabase-tester er kjørt. Utestede scenarioer er ikke markert bestått.

## Neste foreslåtte applikasjonscommit – 2026-11-08

**Klar som avgrenset kildecommit på utviklingsbranchen**, etter separat godkjenning. Ikke en lanserings-, deploy- eller backend-godkjenning. Bare eksisterende lokale endringer velges; ingen applikasjonskode er endret under denne forberedelsen.

Eksakt filutvalg (fire filer):

1. `js/auth.js` — eksisterende profilformat-/ID-validering, sladding av feillogg, melding for ubekreftet e-post og gjenåpning av innloggingsknappen etter avvist profil.
2. `tests/unit/auth.test.mjs` — rettet syntetisk profil-ID og eksplisitt avvisning av manglende/fremmed ID.
3. `tests/support/app-function.mjs` — Node-basert testhjelper som leser den faktiske Auth-funksjonen; ingen tredjepartsavhengigheter.
4. `PUBLICATION-PLAN.md` — oppdatert filklassifisering, utvalg og testgrunnlag.

Forslag til commit-melding: `fix: validate login profiles and cover identity checks`.

### Avhengighetskontroll

- Den allerede committede `index.html` laster `js/config.js`, `js/language.js` og `js/auth.js` i riktig rekkefølge. DOM-elementene, Supabase-klienten, profilfeltene og målsidene finnes allerede i HEAD. Ingen ny HTML, CSS, npm-pakke eller RPC kreves for denne gruppen.
- `window.cleanPlanOnboarding` brukes valgfritt med optional chaining. Uten modulen brukes eksisterende innlogging og rollebasert navigasjon. Gruppen eksponerer ikke registreringsskjema eller aktiverer onboarding.
- `js/profile-onboarding.js`, `js/auth-return.js`, `js/onboarding.js`, `onboarding.html`, den endrede index-siden og konfigurasjonen er utelatt. En senere samlet onboarding-gruppe må håndtere cp_ensure_own_profile, cp_create_customer_area, cp_accept_email_invitation og medlemstabellene. Disse er ikke bekreftet tilgjengelige i produksjon og noen underliggende pakker er HOLD. Foundation v2 er ikke en automatisk erstatning for disse RPC-ene.
- Område-, bolig-, renholds-, kamera- og bildemoduler utsettes sammen med sine sider og backend-avhengigheter. De brukes ikke av valgt Auth-gruppe.
- `js/users.js` og `css/users.css` utsettes. Brukeradministrasjon bruker eksisterende profiles, relasjoner og admin-create-user; publisering av Edge-kilde er ikke deploy eller bekreftelse av faktisk funksjonskontrakt.
- `js/reset-password.js`, `js/password-return.js` og `reset-password.html` utsettes samlet. Passordreturtesten importerer dessuten redirect-policy og leser Edge-kilden. Den skal ikke tas med alene. Auth-gruppens eksisterende resetPasswordForEmail-redirect er uendret.
- `package.json` er utelatt: npm test peker på et bredere testtre som ikke følger denne første gruppen. Den komplette testkommandoen for gruppen er `node --test tests/unit/auth.test.mjs` (kontrollert med Node 23.1.0).
- Ingen av de 14 HOLD-filene inngår, importeres eller leses av gruppens tester. De fem nylig frigitte dokumentasjons-/skjemafilene er heller ikke nødvendige for denne commiten og forblir utenfor.

### Personvern og sikkerhetsgrenser

Kandidatene inneholder ingen konkrete e-postadresser, private filstier, brukerkontoidentiteter, tokens eller private nøkler. To faste UUID-er i Auth-testen er tydelig syntetiske. Publiseringsplanen gjengir ingen private verdier fra HOLD-filene. Allerede committet offentlig klientkonfigurasjon og SDK-CDN er ikke endret eller kopiert inn som nye hemmeligheter. Dette er ikke en full gjennomgang av gammel Git-historikk.

Profilvalideringen er uendret av denne forberedelsen; beskyttede identitetskontroller er ikke rørt. Eksisterende legacy-navigasjon fra profiles.role til admin.html beholdes. Den må ikke fremstilles som ferdigstilt kundeisolasjon eller medarbeider-superadmin-modell.

### Isolert verifikasjon av det eksakte utvalget

Et midlertidig utdrag av HEAD ble laget uten Git-endringer og uten utsjekking over arbeidsmappen. Bare de tre foreslåtte kode-/testfilene ble lagt oppå dette. Dermed kunne ingen andre usporede moduler eller HOLD-filer skjule manglende avhengigheter.

- Permanente Auth-tester i utdraget: **3/3 bestått**.
- Midlertidig full-script-harness med lokale simulerte svar: **9/9 bestått**. Dekker admin/superadmin/resident-innlogging, ubekreftet e-post, profiltransportfeil og sladding, deaktivert profil, fremmed profil-ID, uendret reset-redirect og eksisterende sesjon. Harnesset fikk først en syntaksfeil i egen mock, ble rettet bare i temp og deretter bestod alle scenarioer; ingen applikasjonsfil ble endret.
- Lokale ressursreferanser fra HEAD-versjonene av index.html, users.html og reset-password.html finnes i utdraget.
- `node --check js/auth.js` og `git diff --check` bestått.
- Harnesset er et engangsbevis i temp, ikke en ny permanent test i filutvalget. De tre permanente testene følger commiten.
- Ingen nettverksforespørsler, e-postsending, nettleserstart eller backend-operasjoner. Ekte Auth/SDK, e-postlevering og produksjonsbackend er **IKKE UTFØRT** i denne kontrollen.

### Godkjenningspunkt

Den avgrensede Auth-gruppen er komplett og egnet for neste kildecommit på utviklingsbranchen. Onboarding, kundeisolasjon og øvrige funksjonsgrupper er fortsatt egne oppgaver. Ingen staging, commit eller push er gjort under forberedelsen.

## Stoppunkt

Første hygiene-commit er publisert. Auth-testavviket er rettet lokalt. Ingen samlet app-commit eller push anbefales før gjenstående hold-liste og avhengigheter er avklart. Ingen beskyttet identitet er erstattet, ingen funksjon er endret, og intet lokalt arbeid er slettet.
